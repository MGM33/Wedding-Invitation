import { describe, expect, test } from "bun:test";
import { wedding } from "./wedding";

describe("wedding event rules", () => {
  test("church starts at 6 PM", () => {
    expect(wedding.church.startTime.en).toBe("6:00 PM");
    expect(wedding.church.startTime.ar).toBe("٦:٠٠ مساءً");
  });
  test("hall starts at 8 PM", () => {
    expect(wedding.hall.startTime.en).toBe("8:00 PM");
    expect(wedding.hall.startTime.ar).toBe("٨:٠٠ مساءً");
  });
  test("calendar remains at 6 PM on October 17", () => {
    expect(wedding.startTime.en).toBe("6:00 PM");
    expect(wedding.dateISO).toBe("2026-10-17T18:00:00+03:00");
  });
  test("acceptance uses the existing church location", () => {
    expect(wedding.rsvp.location).toBe("church");
    expect(wedding[wedding.rsvp.location].mapUrl).toBe("https://maps.app.goo.gl/NRQLWFqKXJstjLiK6");
  });
});