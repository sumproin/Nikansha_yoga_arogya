"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { ImagePlus, LogOut, MessageSquareQuote, RefreshCw, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api, type DayName, type GalleryItem, type ScheduleEntry, type Testimonial } from "@/lib/api";

const ADMIN_TOKEN_KEY = "nikansha_admin_token";
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
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

const initialLogin = { username: "", password: "" };

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
  const [deletingTestimonialId, setDeletingTestimonialId] = useState<string | null>(null);

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [galleryError, setGalleryError] = useState<string | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [deletingGalleryId, setDeletingGalleryId] = useState<string | null>(null);

  const [refreshing, setRefreshing] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);

  const pendingTestimonials = useMemo(() => testimonials.filter((item) => item.status === "pending"), [testimonials]);

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
      await Promise.all([loadSchedule(), loadTestimonials(adminToken), loadGallery()]);
      setLastSyncedAt(new Date().toLocaleTimeString());
    } finally {
      setRefreshing(false);
    }
  }

  async function loadSchedule() {
    setLoadingSchedule(true);
    setScheduleError(null);
    try {
      setScheduleEntries(await api.getSchedule());
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
      setTestimonials(await api.getAllTestimonialsForAdmin(adminToken));
    } catch (error) {
      setTestimonialError(error instanceof Error ? error.message : "Failed to load testimonials.");
    } finally {
      setLoadingTestimonials(false);
    }
  }

  async function loadGallery() {
    setLoadingGallery(true);
    setGalleryError(null);
    try {
      setGalleryItems(await api.getGalleryItems());
    } catch (error) {
      setGalleryError(error instanceof Error ? error.message : "Failed to load gallery.");
    } finally {
      setLoadingGallery(false);
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
    try {
      await api.updateTestimonialStatus(id, status, token);
      await refreshAll(token);
    } catch (error) {
      setTestimonialError(error instanceof Error ? error.message : "Failed to update testimonial.");
    }
  }

  async function handleDeleteTestimonial(id: string) {
    if (!token || !window.confirm("Delete this testimonial permanently?")) return;

    setDeletingTestimonialId(id);
    try {
      await api.deleteTestimonial(id, token);
      await refreshAll(token);
    } catch (error) {
      setTestimonialError(error instanceof Error ? error.message : "Failed to delete testimonial.");
    } finally {
      setDeletingTestimonialId(null);
    }
  }

  async function handleGalleryUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) return;
    if (galleryFiles.length === 0) {
      setGalleryError("At least one media file is required.");
      return;
    }

    setUploadingGallery(true);
    setGalleryError(null);
    try {
      if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
        throw new Error("Missing Cloudinary config. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET.");
      }

      const uploadedMedia = [];
      for (const file of galleryFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        formData.append("resource_type", file.type.startsWith("video/") ? "video" : "image");

        const cloudinaryResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${file.type.startsWith("video/") ? "video" : "image"}/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!cloudinaryResponse.ok) {
          const cloudinaryError = await cloudinaryResponse.json().catch(() => ({}));
          throw new Error(cloudinaryError?.error?.message || "Cloudinary upload failed.");
        }

        const cloudinaryData = await cloudinaryResponse.json();
        uploadedMedia.push({
          mediaType: file.type.startsWith("video/") ? "video" as const : "image" as const,
          mediaUrl: cloudinaryData.secure_url as string,
          cloudinaryPublicId: cloudinaryData.public_id as string,
        });
      }

      await api.createGalleryItems(
        {
          mediaItems: uploadedMedia,
        },
        token
      );
      setGalleryFiles([]);
      await refreshAll(token);
    } catch (error) {
      setGalleryError(error instanceof Error ? error.message : "Failed to upload gallery media.");
    } finally {
      setUploadingGallery(false);
    }
  }

  async function handleDeleteGalleryItem(id: string) {
    if (!token || !window.confirm("Delete this gallery item permanently?")) return;

    setDeletingGalleryId(id);
    try {
      await api.deleteGalleryItem(id, token);
      await refreshAll(token);
    } catch (error) {
      setGalleryError(error instanceof Error ? error.message : "Failed to delete gallery item.");
    } finally {
      setDeletingGalleryId(null);
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
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fff7e8,transparent_55%),linear-gradient(135deg,#f6eee2_0%,#fef9f1_100%)] px-6 py-12">
        <div className="mx-auto max-w-lg rounded-3xl border border-earth/20 bg-card/95 p-8 shadow-2xl">
          <h1 className="mb-2 font-serif text-4xl">Admin Login</h1>
          <p className="mb-6 text-muted-foreground">Sign in to manage schedule, testimonials, and gallery uploads.</p>

          {authError ? <p className="mb-4 text-sm text-destructive">{authError}</p> : null}

          <form onSubmit={handleLogin} className="space-y-4">
            <label className="flex flex-col gap-1 text-sm">
              Username
              <Input required value={login.username} onChange={(event) => setLogin((prev) => ({ ...prev, username: event.target.value }))} />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Password
              <Input required type="password" value={login.password} onChange={(event) => setLogin((prev) => ({ ...prev, password: event.target.value }))} />
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
    <main className="min-h-screen bg-gradient-to-br from-amber-50/40 via-white to-orange-50/30 px-4 py-8 md:px-6 md:py-10">
      <div className="mx-auto max-w-7xl">
        {/* Header Card - Redesigned with glass morphism */}
        <div className="group relative mb-10 overflow-hidden rounded-3xl bg-white/80 backdrop-blur-md shadow-xl shadow-amber-900/5 transition-all duration-300 hover:shadow-2xl border border-amber-100/50">
          {/* Decorative gradient bar */}
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#d9b173] via-orange-400 to-rose-400"></div>

          <div className="relative p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <div className="inline-flex">
                  <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#d9b173]/10 to-[#d9b173]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 border border-amber-200/30 backdrop-blur-sm">
                    <Sparkles size={14} className="text-[#d9b173]" />
                    Admin Workspace
                  </span>
                </div>
                <h1 className="font-serif text-5xl font-bold tracking-tight bg-gradient-to-r from-amber-900 to-amber-700 bg-clip-text text-transparent">
                  Nikansha Control
                </h1>
                <p className="text-amber-700/70 max-w-md">
                  Manage schedule, testimonials, and media gallery from one unified dashboard.
                </p>
                {lastSyncedAt && (
                  <div className="flex items-center gap-2 text-xs text-[#d9b173]/70">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                    Last synced: {lastSyncedAt}
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="rounded-full border-amber-200 bg-white/60 hover:bg-amber-50 hover:border-amber-300 transition-all duration-200 shadow-sm"
                  onClick={() => refreshAll(token)}
                  disabled={refreshing}
                >
                  <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
                  {refreshing ? "Refreshing..." : "Refresh Data"}
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 transition-all duration-200"
                  onClick={logout}
                >
                  <LogOut size={16} /> Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="testimonials" className="w-full flex flex-col">
          <TabsList className="w-full mb-8 h-auto rounded-2xl bg-white/60 backdrop-blur-sm border border-amber-100 p-1.5 shadow-sm">
            <TabsTrigger
              value="testimonials"
              className="gap-2 data-active:bg-gradient-to-r data-active:from-[#d9b173] data-active:to-[#d9b173] data-active:text-white transition-all duration-200"
            >
              <MessageSquareQuote size={16} />
              Testimonials
              {pendingTestimonials.length > 0 && (
                <span className="ml-1 rounded-full bg-rose-500 px-2 py-0.5 text-xs text-white">
                  {pendingTestimonials.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="gallery"
              className="gap-2 data-active:bg-gradient-to-r data-active:from-[#d9b173] data-active:to-[#d9b173] data-active:text-white transition-all duration-200"
            >
              <ImagePlus size={16} /> Gallery
            </TabsTrigger>
          </TabsList>

          {/* Schedule tab hidden per QA request. */}

          {/* Testimonials Tab */}
          <TabsContent value="testimonials">
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
              {/* Pending Approvals */}
              <section className="rounded-3xl bg-white/80 backdrop-blur-sm p-8 shadow-lg shadow-amber-900/5 border border-amber-100 transition-all duration-300 hover:shadow-xl">
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-serif text-3xl font-semibold text-amber-900">Pending Reviews</h2>
                      <p className="text-amber-600/70 text-sm mt-1">Approve or reject testimonials from students</p>
                    </div>
                    {pendingTestimonials.length > 0 && (
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
                        {pendingTestimonials.length} pending
                      </span>
                    )}
                  </div>
                </div>

                {testimonialError && (
                  <div className="mb-6 rounded-xl bg-rose-50 border border-rose-200 p-4">
                    <p className="text-sm text-rose-600">{testimonialError}</p>
                  </div>
                )}

                {loadingTestimonials ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-200 border-t-[#d9b173]"></div>
                  </div>
                ) : (
                  <div className="max-h-[600px] space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                    {pendingTestimonials.map((item) => (
                      <article key={item._id} className="group rounded-xl border border-amber-100 bg-gradient-to-br from-amber-50/30 to-white p-5 transition-all duration-200 hover:shadow-md">
                        <div className="flex items-start gap-4">
                          {item.profileImageUrl ? (
                            <img
                              src={item.profileImageUrl}
                              alt={`${item.name} profile`}
                              className="h-14 w-14 rounded-full border-2 border-amber-200 object-cover shadow-sm"
                            />
                          ) : (
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-400 text-lg font-semibold text-white shadow-sm">
                              {item.name.slice(0, 1).toUpperCase()}
                            </div>
                          )}

                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold text-amber-900">{item.name}</h3>
                                <p className="text-xs font-medium uppercase tracking-wide text-amber-600">{item.role}</p>
                              </div>
                            </div>
                            <p className="mt-3 text-sm text-amber-700/80 leading-relaxed">"{item.message}"</p>

                            <div className="mt-4 flex gap-2">
                              <Button
                                className="h-9 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm px-5 text-sm"
                                onClick={() => handleTestimonialStatus(item._id, "approved")}
                              >
                                ✓ Approve
                              </Button>
                              <Button
                                variant="secondary"
                                className="h-9 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-700 px-5 text-sm"
                                onClick={() => handleTestimonialStatus(item._id, "rejected")}
                              >
                                ✗ Reject
                              </Button>
                              <Button
                                variant="destructive"
                                className="h-9 rounded-full bg-rose-500 hover:bg-rose-600 text-white px-5 text-sm"
                                onClick={() => handleDeleteTestimonial(item._id)}
                                disabled={deletingTestimonialId === item._id}
                              >
                                {deletingTestimonialId === item._id ? "..." : "Delete"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}

                    {!loadingTestimonials && pendingTestimonials.length === 0 && (
                      <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-8 text-center">
                        <p className="text-emerald-600">✨ All caught up! No testimonials waiting for review.</p>
                      </div>
                    )}
                  </div>
                )}
              </section>

              {/* All Testimonials */}
              <section className="rounded-3xl bg-white/80 backdrop-blur-sm p-8 shadow-lg shadow-amber-900/5 border border-amber-100 transition-all duration-300 hover:shadow-xl">
                <div className="mb-6">
                  <h2 className="font-serif text-3xl font-semibold text-amber-900">History</h2>
                  <p className="text-amber-600/70 text-sm mt-1">All submitted testimonials and their status</p>
                </div>

                <div className="max-h-[600px] space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                  {testimonials.map((item) => (
                    <article key={item._id} className="rounded-xl border border-amber-100 bg-white p-4 transition-all duration-200 hover:shadow-sm">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          {item.profileImageUrl ? (
                            <img
                              src={item.profileImageUrl}
                              alt={`${item.name} profile`}
                              className="h-10 w-10 rounded-full border border-amber-200 object-cover"
                            />
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-sm font-semibold text-amber-600">
                              {item.name.slice(0, 1).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-amber-900">{item.name}</p>
                            <p className="text-xs uppercase tracking-wide text-[#d9b173]">{item.role}</p>
                          </div>
                        </div>

                        <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider shadow-sm ${item.status === "approved"
                            ? "bg-emerald-100 text-emerald-700"
                            : item.status === "pending"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-rose-100 text-rose-700"
                          }`}>
                          {item.status}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-amber-700/80 line-clamp-2">{item.message}</p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.status !== "approved" && (
                          <Button
                            className="h-8 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white px-4 text-xs"
                            onClick={() => handleTestimonialStatus(item._id, "approved")}
                          >
                            Approve
                          </Button>
                        )}
                        {item.status !== "rejected" && (
                          <Button
                            variant="secondary"
                            className="h-8 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-700 px-4 text-xs"
                            onClick={() => handleTestimonialStatus(item._id, "rejected")}
                          >
                            Reject
                          </Button>
                        )}
                        <Button
                          variant="destructive"
                          className="h-8 rounded-full bg-rose-500 hover:bg-rose-600 text-white px-4 text-xs"
                          onClick={() => handleDeleteTestimonial(item._id)}
                          disabled={deletingTestimonialId === item._id}
                        >
                          {deletingTestimonialId === item._id ? "..." : "Delete"}
                        </Button>
                      </div>
                    </article>
                  ))}

                  {!loadingTestimonials && testimonials.length === 0 && (
                    <div className="rounded-xl bg-amber-50 border border-amber-100 p-8 text-center">
                      <p className="text-amber-600">No testimonials found.</p>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery">
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
              {/* Upload Form */}
              <section className="rounded-3xl bg-white/80 backdrop-blur-sm p-8 shadow-lg shadow-amber-900/5 border border-amber-100 transition-all duration-300 hover:shadow-xl">
                <div className="mb-6">
                  <h2 className="font-serif text-3xl font-semibold text-amber-900">Add Media</h2>
                  <p className="text-amber-600/70 text-sm mt-1">Upload photos or videos to showcase your studio</p>
                </div>

                {galleryError && (
                  <div className="mb-6 rounded-xl bg-rose-50 border border-rose-200 p-4">
                    <p className="text-sm text-rose-600">{galleryError}</p>
                  </div>
                )}

                <form onSubmit={handleGalleryUpload} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-amber-800">Media File</label>
                    <div className="rounded-xl border-2 flex flex-col items-center justify-center border-dashed border-amber-200 bg-amber-50/30 p-6 transition-all duration-200 hover:border-amber-300 hover:bg-amber-50/50">
                      <input
                        id="gallery-media-input"
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        required
                        onChange={(event) => setGalleryFiles(Array.from(event.target.files || []))}
                        className="sr-only"
                      />
                      <label
                        htmlFor="gallery-media-input"
                        className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[#d9b173] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-600"
                      >
                        Choose Files
                      </label>
                      <p className="mt-3 text-sm text-amber-700">
                        {galleryFiles.length > 0
                          ? `${galleryFiles.length} file${galleryFiles.length === 1 ? "" : "s"} selected`
                          : "No file chosen"}
                      </p>
                      <p className="mt-2 text-amber-500 font-bold">Supports JPG, PNG, GIF, MP4. You can select multiple files at once. <span className="text-amber-500 font-bold">Note:</span> Large files may take longer to upload (limited by Cloudinary upload preset and plan).</p>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-[#d9b173] to-[#d9b173] hover:from-amber-600 hover:to-orange-600 shadow-md hover:shadow-lg transition-all duration-200 py-6 text-base"
                    disabled={uploadingGallery}
                  >
                    {uploadingGallery ? "Uploading..." : `Upload ${galleryFiles.length || ""} File${galleryFiles.length === 1 ? "" : "s"} to Gallery`}
                  </Button>
                </form>
              </section>

              {/* Gallery Grid */}
              <section className="rounded-3xl bg-white/80 backdrop-blur-sm p-8 shadow-lg shadow-amber-900/5 border border-amber-100 transition-all duration-300 hover:shadow-xl">
                <div className="mb-6">
                  <h2 className="font-serif text-3xl font-semibold text-amber-900">Media Gallery</h2>
                  <p className="text-amber-600/70 text-sm mt-1">
                    {galleryItems.length} item{galleryItems.length !== 1 ? 's' : ''} in collection
                  </p>
                </div>

                {loadingGallery ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-200 border-t-[#d9b173]"></div>
                  </div>
                ) : (
                  <div className="max-h-[620px] space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                    <div className="grid grid-cols-1 gap-4">
                      {galleryItems.map((item) => (
                        <article key={item._id} className="group rounded-xl border border-amber-100 bg-white overflow-hidden transition-all duration-200 hover:shadow-md">
                          <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100">
                            {item.mediaType === "image" ? (
                              <img
                                src={item.mediaUrl}
                                alt="Gallery media"
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            ) : (
                              <video
                                src={item.mediaUrl}
                                controls
                                className="h-full w-full object-cover"
                                preload="metadata"
                              />
                            )}
                          </div>
                          <div className="p-4">
                            <div className="mt-1">
                              <Button
                                variant="destructive"
                                className="h-9 rounded-full bg-rose-500 hover:bg-rose-600 text-white px-5 text-sm"
                                onClick={() => handleDeleteGalleryItem(item._id)}
                                disabled={deletingGalleryId === item._id}
                              >
                                {deletingGalleryId === item._id ? "Deleting..." : "Delete"}
                              </Button>
                            </div>
                          </div>
                        </article>
                      ))}

                      {!loadingGallery && galleryItems.length === 0 && (
                        <div className="rounded-xl bg-amber-50 border border-amber-100 p-12 text-center">
                          <p className="text-amber-600">Your gallery is empty. Start by uploading some photos!</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </section>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <style jsx>{`
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #fef3c7;
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #fbbf24;
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #f59e0b;
    }
  `}</style>
    </main>
  );
}
