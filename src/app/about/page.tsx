export const metadata = {
  title: "About",
  description: "About me.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-content-wide px-xs py-2xl lg:px-sm">
      <h1 className="text-h1 font-semibold text-foreground-primary">About</h1>
      <p className="mt-md text-body text-foreground-secondary max-w-content">
        Replace this with your story. Keep it clear and scannable (§9 Design
        document).
      </p>
    </div>
  );
}
