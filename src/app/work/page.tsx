export const metadata = {
  title: "Work",
  description: "Selected projects and case studies.",
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-content-wide px-xs py-2xl lg:px-sm">
      <h1 className="text-h1 font-semibold text-foreground-primary">Work</h1>
      <p className="mt-md text-body text-foreground-secondary max-w-content">
        Add your projects here. Use Markdown or MDX in{" "}
        <code className="rounded bg-border/50 px-1 py-0.5 text-caption">
          content/projects
        </code>{" "}
        or build project pages under{" "}
        <code className="rounded bg-border/50 px-1 py-0.5 text-caption">
          src/app/work
        </code>
        .
      </p>
    </div>
  );
}
