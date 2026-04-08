"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  appleGateCookieName,
  appleGateCookieOptions,
  appleGateExpectedToken,
} from "@/lib/apple-gate";

export type AppleUnlockState = { error: string | null };

export async function unlockApple(
  _prev: AppleUnlockState,
  formData: FormData
): Promise<AppleUnlockState> {
  const envPass = process.env.APPLE_CASE_STUDY_PASSWORD;
  if (!envPass) {
    return {
      error: "Missing APPLE_CASE_STUDY_PASSWORD — add it to .env.local and restart the dev server.",
    };
  }

  const password = formData.get("password");
  if (typeof password !== "string" || password.length === 0) {
    return { error: "Enter a password." };
  }

  if (password !== envPass) {
    return { error: "Incorrect password." };
  }

  const token = appleGateExpectedToken(envPass);
  (await cookies()).set(appleGateCookieName(), token, appleGateCookieOptions());

  redirect("/apple");
}
