import { CredoBlock } from "@/components/CredoBlock";

export const metadata = {
  title: "Design credo",
  description: "Design credo — clarity, simplicity, and what we believe.",
};

export default function CredoPage() {
  return (
    <div className="w-full bg-background-primary pb-16 md:pb-20">
      <CredoBlock as="h1" id="credo-page-heading" />
    </div>
  );
}
