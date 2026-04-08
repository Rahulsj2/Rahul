import { createHmac } from "crypto";

const COOKIE_NAME = "apple_unlock";
const PEPPER = "portfolio-apple-gate-v1";
const MAX_AGE_S = 60 * 60 * 24 * 30;

export function appleGateCookieName() {
  return COOKIE_NAME;
}

/** Deterministic token from password — only the server can set the httpOnly cookie after a correct guess. */
export function appleGateExpectedToken(envPassword: string): string {
  return createHmac("sha256", envPassword).update(PEPPER).digest("hex");
}

export function appleGateCookieOptions() {
  return {
    httpOnly: true as const,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/" as const,
    maxAge: MAX_AGE_S,
  };
}

export function isAppleGateUnlocked(
  envPassword: string | undefined,
  cookieValue: string | undefined
): boolean {
  if (!envPassword || !cookieValue) return false;
  return cookieValue === appleGateExpectedToken(envPassword);
}
