export const metadata = {
  title: "Contact",
  description: "Get in touch.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-content-wide px-xs py-2xl lg:px-sm">
      <h1 className="text-h1 font-semibold text-foreground-primary">Contact</h1>
      <p className="mt-md text-body text-foreground-secondary max-w-content">
        Reach out at{" "}
        <a
          href="mailto:design@rahulsrinivas.com"
          className="text-foreground-primary underline underline-offset-2 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent rounded-sm"
        >
          design@rahulsrinivas.com
        </a>
        .
      </p>
    </div>
  );
}
