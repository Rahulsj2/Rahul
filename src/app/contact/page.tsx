export const metadata = {
  title: "Contact",
  description: "Get in touch.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-content-wide px-xs py-2xl lg:px-sm">
      <h1 className="text-h1 font-semibold text-foreground-primary">Contact</h1>
      <p className="mt-md text-body text-foreground-secondary max-w-content">
        Add a contact form or email link. Use explicit CTAs (e.g. “Email me,”
        “Download résumé”) per the design document.
      </p>
    </div>
  );
}
