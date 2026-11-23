import { createHmac, timingSafeEqual } from "node:crypto";

export const PASSCODE = process.env.ADMIN_PASSCODE || "sabuur123";
export const passcodeConfigured = Boolean(process.env.ADMIN_PASSCODE);

const secret = process.env.ADMIN_SECRET || `${PASSCODE}::as-sabuur.com::session-salt`;
const TTL_MS = 1000 * 60 * 60 * 8; // 8 hours
export const COOKIE_NAME = "sabuur_admin";

function sign(payload: string) {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function createToken() {
  const payload = `admin:${Date.now() + TTL_MS}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
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
