export type DayName =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type ScheduleEntry = {
  _id: string;
  day: DayName;
  time: string;
  className: string;
  instructor: string;
  room: string;
  level: string;
  color: string;
};

export type Testimonial = {
  _id: string;
  name: string;
  role: string;
  message: string;
  status: "pending" | "approved" | "rejected";
  approvedAt?: string | null;
};

export type NewTestimonialPayload = {
  name: string;
  role: string;
  message: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

type RequestOptions = RequestInit & {
  adminToken?: string;
};

async function request<T>(path: string, init?: RequestOptions): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.adminToken ? { Authorization: `Bearer ${init.adminToken}` } : {}),
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    let message = "Request failed";
    try {
      const body = await response.json();
      if (body?.message) message = body.message;
    } catch {
      // no-op
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export const api = {
  adminLogin: (payload: { username: string; password: string }) =>
    request<{ token: string }>("/admin/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  verifyAdminToken: (adminToken: string) =>
    request<{ valid: boolean }>("/admin/verify", {
      method: "GET",
      adminToken,
    }),
  getSchedule: () => request<ScheduleEntry[]>("/schedule"),
  createScheduleEntry: (payload: Omit<ScheduleEntry, "_id">, adminToken: string) =>
    request<ScheduleEntry>("/schedule", {
      method: "POST",
      body: JSON.stringify(payload),
      adminToken,
    }),
  updateScheduleEntry: (id: string, payload: Partial<Omit<ScheduleEntry, "_id">>, adminToken: string) =>
    request<ScheduleEntry>(`/schedule/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      adminToken,
    }),
  deleteScheduleEntry: (id: string, adminToken: string) =>
    request<void>(`/schedule/${id}`, {
      method: "DELETE",
      adminToken,
    }),
  getTestimonials: () => request<Testimonial[]>("/testimonials"),
  getAllTestimonialsForAdmin: (adminToken: string) =>
    request<Testimonial[]>("/testimonials?includePending=true", {
      adminToken,
    }),
  createTestimonial: (payload: NewTestimonialPayload) =>
    request<Testimonial>("/testimonials", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  updateTestimonialStatus: (id: string, status: "approved" | "rejected", adminToken: string) =>
    request<Testimonial>(`/testimonials/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
      adminToken,
    }),
  deleteTestimonial: (id: string, adminToken: string) =>
    request<void>(`/testimonials/${id}`, {
      method: "DELETE",
      adminToken,
    }),
};
