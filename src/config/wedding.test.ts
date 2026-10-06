import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import { wedding } from "./wedding";

describe("wedding event rules", () => {
  test("church starts at 6 PM", () => {
    assert.equal(wedding.church.startTime.en, "6:00 PM");
    assert.equal(wedding.church.startTime.ar, "٦:٠٠ مساءً");
  });
  test("hall starts at 8 PM", () => {
    assert.equal(wedding.hall.startTime.en, "8:00 PM");
    assert.equal(wedding.hall.startTime.ar, "٨:٠٠ مساءً");
  });
  test("calendar remains at 6 PM on October 17", () => {
    assert.equal(wedding.startTime.en, "6:00 PM");
    assert.equal(wedding.dateISO, "2026-10-17T18:00:00+03:00");
  });
  test("acceptance uses the existing church location", () => {
    assert.equal(wedding.rsvp.location, "church");
    assert.equal(wedding[wedding.rsvp.location].mapUrl, "https://maps.app.goo.gl/NRQLWFqKXJstjLiK6");
  });
});