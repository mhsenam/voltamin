// Run with: npm run check:site
// Mirrors the API route's validation rules so the two cannot drift apart.
import assert from "node:assert/strict";
import { validateContact, FIELD_LIMITS, MESSAGE_MIN_LENGTH } from "./contact-validate.ts";

// A complete, valid submission normalises cleanly.
const valid = validateContact({
  name: "  Jane  Doe  ",
  email: "Jane.Doe@Example.COM",
  phone: "(949) 555-0123",
  city: "Irvine",
  service: "EV Charger Installation",
  time: "10:00 AM",
  message: "  Need a Level 2 charger in the garage.\nThanks!  ",
});
assert.equal(valid.ok, true);
if (!valid.ok) throw new Error("unreachable");
assert.equal(valid.data.name, "Jane Doe");
assert.equal(valid.data.replyTo, "jane.doe@example.com");
assert.equal(valid.data.phone, "(949) 555-0123");
assert.equal(valid.data.message, "Need a Level 2 charger in the garage.\nThanks!");

// Non-object bodies are rejected wholesale.
assert.equal(validateContact(null).ok, false);
assert.equal(validateContact("boom").ok, false);
assert.equal(validateContact([1]).ok, false);

// Required fields.
const missing = validateContact({});
assert.equal(missing.ok, false);
if (!missing.ok) {
  assert.ok(missing.fieldErrors.name);
  assert.ok(missing.fieldErrors.email);
  assert.ok(missing.fieldErrors.message);
}

// Email formats: reject the dangerous ones, accept the normal ones.
const badEmails = [
  "no-at-sign",
  "spaces in@example.com",
  "line\nbreak@example.com",
  "user@",
  "user@domain",
  "user@domain.",
];
for (const email of badEmails) {
  const result = validateContact({ name: "A", email, message: "hello there" });
  assert.equal(result.ok, false, `email should be rejected: ${JSON.stringify(email)}`);
  if (!result.ok) assert.ok(result.fieldErrors.email, email);
}
assert.equal(validateContact({ name: "A", email: "a@b.co", message: "hello there" }).ok, true);
assert.equal(validateContact({ name: "A", email: "a+b@c.io", message: "hello there" }).ok, true);

// Phone: optional, but wrong when present and unusable.
assert.equal(validateContact({ name: "A", email: "a@b.co", message: "hello there" }).ok, true);
assert.equal(validateContact({ name: "A", email: "a@b.co", message: "hello there", phone: "8186992255" }).ok, true);
assert.equal(validateContact({ name: "A", email: "a@b.co", message: "hello there", phone: "+1 (818) 699-2255" }).ok, true);
const badPhone = validateContact({ name: "A", email: "a@b.co", message: "hello there", phone: "call-me" });
assert.equal(badPhone.ok, false);
const shortPhone = validateContact({ name: "A", email: "a@b.co", message: "hello there", phone: "12345" });
assert.equal(shortPhone.ok, false);

// Control characters are stripped everywhere except newlines/tabs.
const control = validateContact({
  name: "A\u0000B",
  email: "a@b.co",
  message: "line1\u0002line2\nline3",
});
assert.equal(control.ok, true);
if (control.ok) {
  assert.equal(control.data.name, "AB");
  assert.equal(control.data.message.includes("line1line2"), true);
  assert.equal(control.data.message.includes("\n"), true);
}

// Length limits.
const longName = validateContact({ name: "x".repeat(FIELD_LIMITS.name + 1), email: "a@b.co", message: "hello there" });
assert.equal(longName.ok, false);
const shortMessage = validateContact({ name: "A", email: "a@b.co", message: "hi" });
assert.equal(shortMessage.ok, false);
const longMessage = validateContact({ name: "A", email: "a@b.co", message: "x".repeat(FIELD_LIMITS.message + 1) });
assert.equal(longMessage.ok, false);
const minMessage = validateContact({ name: "A", email: "a@b.co", message: "x".repeat(MESSAGE_MIN_LENGTH) });
assert.equal(minMessage.ok, true);

// Non-string values do not crash the validator.
const nonStrings = validateContact({ name: { a: 1 }, email: ["x"], message: 42, city: null });
assert.equal(nonStrings.ok, false);

console.log("contact-validate checks passed");
