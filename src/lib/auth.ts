import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Admin authentication.
 *
 * The previous version fell back to a hard-coded passcode and derived the
 * signing secret from it, which meant anyone reading the repository could sign
 * in to a deployment that had not set the environment variables. Both values
 * are now required. If they are missing the portal fails closed and the login
 * page explains what to configure.
 */

export const PASSCODE = process.env.ADMIN_PASSCODE ?? "";
export const passcodeConfigured = PASSCODE.length > 0;

const secret = process.env.ADMIN_SECRET ?? "";
export const sessionConfigured = PASSCODE.length > 0 && secret.length >= 16;

const TTL_MS = 1000 * 60 * 60 * 8; // 8 hours
export const COOKIE_NAME = "sabuur_admin";

function sign(payload: string) {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function createToken() {
  if (!sessionConfigured) return "";
  const payload = `admin:${Date.now() + TTL_MS}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(token: string | undefined): boolean {
  if (!token || !sessionConfigured) return false;
  const dot = token.lastIndexOf(".");
  if (dot < 0) return false;
  const payload = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  const expires = Number(payload.split(":")[1]);
  return Number.isFinite(expires) && Date.now() < expires;
}
