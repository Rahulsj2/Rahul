import { AppleCaseStudyContent } from "./AppleCaseStudyContent";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Apple experience",
  description: "Apple experience — retail leadership, systems, and service design.",
};

export default async function ApplePage() {
  return <AppleCaseStudyContent />;
}
