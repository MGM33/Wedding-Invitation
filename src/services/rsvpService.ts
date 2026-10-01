/**
 * RSVP service abstraction.
 * The UI only talks to `rsvpService`. Swap `mockRsvpService` for a database-backed
 * implementation (e.g. Lovable Cloud) later without touching any component.
 */

export type AttendanceStatus = "pending" | "attending" | "declined";

/** Future persisted guest record (one per invitation / family group). */
export interface Guest {
  id: string;
  token: string; // private invitation token used in /invite/$token
  name: string;
  phone?: string;
  group?: string; // family / invitation group
  maxGuests: number;
  status: AttendanceStatus;
  attendingCount: number;
  guestNames?: string;
  message?: string;
  respondedAt?: string;
  updatedAt?: string;
}

export interface RsvpSubmission {
  token?: string;
  name: string;
  phone: string;
  attending: boolean;
  attendingCount: number;
  guestNames?: string;
  message?: string;
}

export interface RsvpResult {
  ok: boolean;
  id?: string;
  error?: string;
}

/** Aggregates a future protected /admin dashboard will show. */
export interface RsvpStats {
  totalInvited: number;
  confirmed: number;
  declined: number;
  pending: number;
  totalAttending: number;
}

export interface RsvpService {
  submit(data: RsvpSubmission): Promise<RsvpResult>;
  getGuestByToken(token: string): Promise<Pick<Guest, "name" | "maxGuests" | "token"> | null>;
}

const mockRsvpService: RsvpService = {
  async submit(data) {
    await new Promise((r) => setTimeout(r, 1100));
    const id = `mock_${Date.now()}`;
    try {
      const prev = JSON.parse(sessionStorage.getItem("rsvp_mock") || "[]");
      sessionStorage.setItem(
        "rsvp_mock",
        JSON.stringify([...prev, { ...data, id, respondedAt: new Date().toISOString() }]),
      );
    } catch {
      /* ignore */
    }
    if (import.meta.env.DEV) console.info("[rsvpService:mock] submitted", data);
    return { ok: true, id };
  },
  async getGuestByToken(token) {
    // Mock: derive a readable name from the token. Replace with a DB lookup.
    if (!token) return null;
    const name = decodeURIComponent(token)
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return { name, maxGuests: 4, token };
  },
};

export const rsvpService: RsvpService = mockRsvpService;
