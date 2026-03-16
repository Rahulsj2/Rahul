import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-content-wide px-xs py-lg lg:px-sm">
        <div className="flex flex-col gap-md sm:flex-row sm:items-center sm:justify-between">
          <p className="text-caption text-foreground-secondary m-0">
            © {new Date().getFullYear()} Portfolio. Built with care.
          </p>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-lg list-none m-0 p-0">
              <li>
                <Link
                  href="/work"
                  className="text-caption text-foreground-secondary hover:text-foreground-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm"
                >
                  Work
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-caption text-foreground-secondary hover:text-foreground-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-caption text-foreground-secondary hover:text-foreground-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
