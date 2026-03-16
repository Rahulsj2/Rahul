import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return { title: `${title} | Work` };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="mx-auto max-w-content-wide px-xs py-2xl lg:px-sm">
      <Link
        href="/work"
        className="inline-flex min-h-touch min-w-touch items-center gap-sm text-body text-foreground-secondary hover:text-foreground-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm"
      >
        <ArrowLeft className="size-5 shrink-0" aria-hidden />
        Back to work
      </Link>
      <h1 className="mt-lg text-h1 font-semibold text-foreground-primary">
        {title}
      </h1>
      <p className="mt-md text-body text-foreground-secondary max-w-content">
        Add your case study content here. Use this page as the template for each
        project under <code className="rounded bg-border/50 px-1 py-0.5 text-caption">src/app/work/[slug]</code>.
      </p>
    </div>
  );
}
