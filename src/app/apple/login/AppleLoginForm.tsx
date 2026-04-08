"use client";

import { useActionState } from "react";

import { unlockApple, type AppleUnlockState } from "../actions";

const initial: AppleUnlockState = { error: null };

export function AppleLoginForm() {
  const [state, formAction, pending] = useActionState(unlockApple, initial);

  return (
    <div
      className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-[420px] flex-col justify-center px-[24px] py-[48px]"
      style={{ color: "#1a1a18" }}
    >
      <h1 className="text-[1.25rem] font-medium tracking-tight text-[#1a1a18]">Apple experience</h1>
      <p className="mt-2 text-[13px] leading-relaxed text-[#9a9992]">
        This experience is private. Enter the password to continue.
      </p>

      <form action={formAction} className="mt-8 flex flex-col gap-4">
        <label className="sr-only" htmlFor="apple-password">
          Password
        </label>
        <input
          id="apple-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded-[12px] border border-black/10 bg-[#f5f4f0] px-4 py-3 text-[14px] text-[#1a1a18] outline-none ring-0 placeholder:text-[#9a9992] focus:border-black/20"
          placeholder="Password"
        />
        {state.error ? (
          <p className="text-[13px] text-red-600" role="alert">
            {state.error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-[#1a1a18] px-5 py-3 text-[13px] font-medium text-white transition-opacity disabled:opacity-50"
        >
          {pending ? "Checking…" : "Continue"}
        </button>
      </form>
    </div>
  );
}
