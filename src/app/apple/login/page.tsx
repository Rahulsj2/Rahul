import { redirect } from "next/navigation";

/** Old URL — everything is gated on `/apple` now. */
export default function AppleLoginRedirectPage() {
  redirect("/apple");
}
