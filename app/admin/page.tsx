"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api, type DayName, type ScheduleEntry, type Testimonial } from "@/lib/api";

const ADMIN_TOKEN_KEY = "nikansha_admin_token";
const days: DayName[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const colorOptions = ["border-l-teal", "border-l-saffron", "border-l-lavender", "border-l-earth"];

type ScheduleFormState = Omit<ScheduleEntry, "_id">;

const initialScheduleForm: ScheduleFormState = {
  day: "Monday",
  time: "",
  className: "",
  instructor: "",
  room: "",
  level: "All Levels",
  color: "border-l-teal",
};

const initialLogin = {
  username: "",
  password: "",
};

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [login, setLogin] = useState(initialLogin);
  const [loggingIn, setLoggingIn] = useState(false);

  const [scheduleEntries, setScheduleEntries] = useState<ScheduleEntry[]>([]);
  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const [scheduleError, setScheduleError] = useState<string | null>(null);
  const [scheduleForm, setScheduleForm] = useState<ScheduleFormState>(initialScheduleForm);
  const [editingScheduleId, setEditingScheduleId] = useState<string | null>(null);
  const [savingSchedule, setSavingSchedule] = useState(false);

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(false);
  const [testimonialError, setTestimonialError] = useState<string | null>(null);
  const [reviewNote, setReviewNote] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);

  const pendingTestimonials = useMemo(
    () => testimonials.filter((item) => item.status === "pending"),
    [testimonials]
  );

  useEffect(() => {
    async function restoreSession() {
      const storedToken = window.localStorage.getItem(ADMIN_TOKEN_KEY);
      if (!storedToken) {
        setCheckingAuth(false);
        return;
      }

      try {
        await api.verifyAdminToken(storedToken);
        setToken(storedToken);
      } catch {
        window.localStorage.removeItem(ADMIN_TOKEN_KEY);
      } finally {
        setCheckingAuth(false);
      }
    }

    restoreSession();
  }, []);

  useEffect(() => {
    if (!token) return;
    refreshAll(token);
  }, [token]);

  async function refreshAll(adminToken: string) {
    setRefreshing(true);
    try {
      await Promise.all([loadSchedule(), loadTestimonials(adminToken)]);
      setLastSyncedAt(new Date().toLocaleTimeString());
    } finally {
      setRefreshing(false);
    }
  }

  async function loadSchedule() {
    setLoadingSchedule(true);
    setScheduleError(null);
    try {
      const data = await api.getSchedule();
      setScheduleEntries(data);
    } catch (error) {
      setScheduleError(error instanceof Error ? error.message : "Failed to load schedule.");
    } finally {
      setLoadingSchedule(false);
    }
  }

  async function loadTestimonials(adminToken: string) {
    setLoadingTestimonials(true);
    setTestimonialError(null);
    try {
      const data = await api.getAllTestimonialsForAdmin(adminToken);
      setTestimonials(data);
    } catch (error) {
      setTestimonialError(error instanceof Error ? error.message : "Failed to load testimonials.");
    } finally {
      setLoadingTestimonials(false);
    }
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoggingIn(true);
    setAuthError(null);

    try {
      const result = await api.adminLogin(login);
      setToken(result.token);
      window.localStorage.setItem(ADMIN_TOKEN_KEY, result.token);
      setLogin(initialLogin);
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setLoggingIn(false);
    }
  }

  async function handleScheduleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) return;

    setSavingSchedule(true);
    setScheduleError(null);

    try {
      if (editingScheduleId) {
        await api.updateScheduleEntry(editingScheduleId, scheduleForm, token);
      } else {
        await api.createScheduleEntry(scheduleForm, token);
      }
      setScheduleForm(initialScheduleForm);
      setEditingScheduleId(null);
      await refreshAll(token);
    } catch (error) {
      setScheduleError(error instanceof Error ? error.message : "Failed to save schedule entry.");
    } finally {
      setSavingSchedule(false);
    }
  }

  function startScheduleEdit(entry: ScheduleEntry) {
    setEditingScheduleId(entry._id);
    setScheduleForm({
      day: entry.day,
      time: entry.time,
      className: entry.className,
      instructor: entry.instructor,
      room: entry.room,
      level: entry.level,
      color: entry.color,
    });
  }

  async function deleteScheduleEntry(id: string) {
    if (!token) return;
    setScheduleError(null);
    try {
      await api.deleteScheduleEntry(id, token);
      if (editingScheduleId === id) {
        setEditingScheduleId(null);
        setScheduleForm(initialScheduleForm);
      }
      await refreshAll(token);
    } catch (error) {
      setScheduleError(error instanceof Error ? error.message : "Failed to delete schedule entry.");
    }
  }

  async function handleTestimonialStatus(id: string, status: "approved" | "rejected") {
    if (!token) return;
    setTestimonialError(null);
    try {
      await api.updateTestimonialStatus(id, status, token);
      await refreshAll(token);
    } catch (error) {
      setTestimonialError(error instanceof Error ? error.message : "Failed to update testimonial.");
    }
  }

  async function handleDeleteTestimonial(id: string) {
    if (!token) return;
    setTestimonialError(null);
    try {
      await api.deleteTestimonial(id, token);
      await refreshAll(token);
    } catch (error) {
      setTestimonialError(error instanceof Error ? error.message : "Failed to delete testimonial.");
    }
  }

  function logout() {
    setToken(null);
    window.localStorage.removeItem(ADMIN_TOKEN_KEY);
  }

  if (checkingAuth) {
    return <div className="min-h-screen grid place-items-center text-muted-foreground">Checking admin session...</div>;
  }

  if (!token) {
    return (
      <main className="min-h-screen bg-cream px-6 py-12">
        <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-lg border border-earth/20 p-8">
          <h1 className="font-serif text-4xl mb-2">Admin Login</h1>
          <p className="text-muted-foreground mb-6">Sign in to manage timetable routines and testimonial approvals.</p>

          {authError ? <p className="text-destructive text-sm mb-4">{authError}</p> : null}

          <form onSubmit={handleLogin} className="space-y-4">
            <label className="text-sm flex flex-col gap-1">
              Username
              <Input
                required
                value={login.username}
                onChange={(event) => setLogin((prev) => ({ ...prev, username: event.target.value }))}
              />
            </label>
            <label className="text-sm flex flex-col gap-1">
              Password
              <Input
                required
                type="password"
                value={login.password}
                onChange={(event) => setLogin((prev) => ({ ...prev, password: event.target.value }))}
              />
            </label>
            <Button type="submit" className="w-full rounded-full" disabled={loggingIn}>
              {loggingIn ? "Signing in..." : "Login"}
            </Button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-4xl">Admin Panel</h1>
            <p className="text-muted-foreground">Manage routine timetable and approve testimonials.</p>
            {lastSyncedAt ? <p className="text-xs text-muted-foreground mt-1">Last synced: {lastSyncedAt}</p> : null}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-full" onClick={() => refreshAll(token)} disabled={refreshing}>
              {refreshing ? "Refreshing..." : "Refresh Data"}
            </Button>
            <Button variant="outline" className="rounded-full" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="schedule" className="w-full flex flex-col">
          <TabsList className="mb-6 rounded-full">
            <TabsTrigger value="schedule">Timetable Routine</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials ({pendingTestimonials.length} Pending)</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl border border-earth/20 p-6">
                <h2 className="font-serif text-2xl mb-2">{editingScheduleId ? "Edit Routine" : "Add Routine"}</h2>
                <p className="text-sm text-muted-foreground mb-5">Create and maintain timetable entries from this panel.</p>
                {scheduleError ? <p className="text-sm text-destructive mb-4">{scheduleError}</p> : null}

                <form onSubmit={handleScheduleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label className="text-sm flex flex-col gap-1">
                    Day
                    <select
                      className="h-10 rounded-lg border border-input bg-transparent px-3"
                      value={scheduleForm.day}
                      onChange={(event) => setScheduleForm((prev) => ({ ...prev, day: event.target.value as DayName }))}
                    >
                      {days.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="text-sm flex flex-col gap-1">
                    Time
                    <Input required value={scheduleForm.time} onChange={(event) => setScheduleForm((prev) => ({ ...prev, time: event.target.value }))} />
                  </label>

                  <label className="text-sm flex flex-col gap-1">
                    Class Name
                    <Input required value={scheduleForm.className} onChange={(event) => setScheduleForm((prev) => ({ ...prev, className: event.target.value }))} />
                  </label>

                  <label className="text-sm flex flex-col gap-1">
                    Instructor
                    <Input required value={scheduleForm.instructor} onChange={(event) => setScheduleForm((prev) => ({ ...prev, instructor: event.target.value }))} />
                  </label>

                  <label className="text-sm flex flex-col gap-1">
                    Room
                    <Input required value={scheduleForm.room} onChange={(event) => setScheduleForm((prev) => ({ ...prev, room: event.target.value }))} />
                  </label>

                  <label className="text-sm flex flex-col gap-1">
                    Level
                    <Input value={scheduleForm.level} onChange={(event) => setScheduleForm((prev) => ({ ...prev, level: event.target.value }))} />
                  </label>

                  <label className="text-sm flex flex-col gap-1 md:col-span-2">
                    Accent Color
                    <select
                      className="h-10 rounded-lg border border-input bg-transparent px-3"
                      value={scheduleForm.color}
                      onChange={(event) => setScheduleForm((prev) => ({ ...prev, color: event.target.value }))}
                    >
                      {colorOptions.map((color) => (
                        <option key={color} value={color}>
                          {color}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="md:col-span-2 flex gap-3">
                    <Button type="submit" className="rounded-full" disabled={savingSchedule}>
                      {savingSchedule ? "Saving..." : editingScheduleId ? "Update Routine" : "Add Routine"}
                    </Button>
                    {editingScheduleId ? (
                      <Button
                        type="button"
                        variant="outline"
                        className="rounded-full"
                        onClick={() => {
                          setEditingScheduleId(null);
                          setScheduleForm(initialScheduleForm);
                        }}
                      >
                        Cancel
                      </Button>
                    ) : null}
                  </div>
                </form>
              </div>

              <div className="bg-white rounded-3xl border border-earth/20 p-6">
                <h2 className="font-serif text-2xl mb-5">Current Timetable</h2>
                {loadingSchedule ? <p className="text-muted-foreground">Loading schedule...</p> : null}
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {scheduleEntries.map((entry) => (
                    <div key={entry._id} className={`p-4 rounded-xl border border-earth/20 border-l-4 ${entry.color}`}>
                      <p className="font-semibold">{entry.className}</p>
                      <p className="text-sm text-muted-foreground">
                        {entry.day} | {entry.time}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {entry.instructor} | {entry.room} | {entry.level}
                      </p>
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" className="rounded-full h-8 px-4" onClick={() => startScheduleEdit(entry)}>
                          Edit
                        </Button>
                        <Button variant="destructive" className="rounded-full h-8 px-4" onClick={() => deleteScheduleEntry(entry._id)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                  {!loadingSchedule && scheduleEntries.length === 0 ? <p className="text-muted-foreground">No routines added yet.</p> : null}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="testimonials">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl border border-earth/20 p-6">
                <h2 className="font-serif text-2xl mb-2">Pending Approvals</h2>
                <p className="text-sm text-muted-foreground mb-5">Approve to publish testimonial on website instantly.</p>
                {testimonialError ? <p className="text-sm text-destructive mb-4">{testimonialError}</p> : null}
                {loadingTestimonials ? <p className="text-muted-foreground">Loading testimonials...</p> : null}

                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {pendingTestimonials.map((item) => (
                    <div key={item._id} className="p-4 rounded-xl border border-earth/20 bg-cream">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-xs uppercase tracking-wide text-primary">{item.role}</p>
                      <p className="text-sm mt-2 text-muted-foreground">{item.message}</p>
                      <div className="flex gap-2 mt-4">
                        <Button className="h-8 rounded-full px-4" onClick={() => handleTestimonialStatus(item._id, "approved")}>
                          Approve
                        </Button>
                        <Button variant="secondary" className="h-8 rounded-full px-4" onClick={() => handleTestimonialStatus(item._id, "rejected")}>
                          Reject
                        </Button>
                        <Button variant="destructive" className="h-8 rounded-full px-4" onClick={() => handleDeleteTestimonial(item._id)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                  {!loadingTestimonials && pendingTestimonials.length === 0 ? (
                    <p className="text-muted-foreground">No testimonials pending approval.</p>
                  ) : null}
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-earth/20 p-6">
                <h2 className="font-serif text-2xl mb-5">All Testimonials</h2>
                <Textarea
                  value={reviewNote}
                  onChange={(event) => setReviewNote(event.target.value)}
                  placeholder="Optional admin notes for your internal tracking..."
                  className="mb-4"
                />
                <div className="space-y-3 max-h-[560px] overflow-y-auto pr-2">
                  {testimonials.map((item) => (
                    <div key={item._id} className="p-4 rounded-xl border border-earth/20">
                      <div className="flex justify-between items-center gap-4">
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">{item.role}</p>
                        </div>
                        <span
                          className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                            item.status === "approved"
                              ? "bg-secondary/15 text-secondary"
                              : item.status === "pending"
                                ? "bg-primary/15 text-primary"
                                : "bg-destructive/15 text-destructive"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{item.message}</p>
                    </div>
                  ))}
                  {!loadingTestimonials && testimonials.length === 0 ? <p className="text-muted-foreground">No testimonials found.</p> : null}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
