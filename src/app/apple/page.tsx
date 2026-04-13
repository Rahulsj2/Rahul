import { cookies } from "next/headers";

import { appleGateCookieName, isAppleGateUnlocked } from "@/lib/apple-gate";

import { AppleCaseStudyContent } from "./AppleCaseStudyContent";
import { AppleLoginForm } from "./login/AppleLoginForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Apple experience",
  description: "Apple experience — retail leadership, systems, and service design.",
};

export default async function ApplePage() {
  const envPass = process.env.APPLE_CASE_STUDY_PASSWORD;
  const cookie = (await cookies()).get(appleGateCookieName())?.value;

  if (!envPass) {
    return (
      <div
        className="mx-auto max-w-md px-6 py-20 text-center text-[14px] leading-relaxed text-[#4a4a46]"
        style={{ color: "#1a1a18" }}
      >
        <p className="font-medium text-[#1a1a18]">Apple experience isn’t configured yet</p>
        <p className="mt-3">
          Add one line to{" "}
          <code className="rounded bg-[#f5f4f0] px-1.5 py-0.5 font-mono text-[13px]">.env.local</code>{" "}
          (this file is gitignored):
        </p>
        <pre className="mt-4 overflow-x-auto rounded-[12px] bg-[#f5f4f0] p-4 text-left font-mono text-[12px] text-[#1a1a18]">
          APPLE_CASE_STUDY_PASSWORD=your-password-here
        </pre>
        <p className="mt-4 text-[13px] text-[#9a9992]">
          Then restart <code className="font-mono">npm run dev</code>.
        </p>
      </div>
    );
  }

  if (!isAppleGateUnlocked(envPass, cookie)) {
    return <AppleLoginForm />;
  }

  return <AppleCaseStudyContent />;
}
