import Link from "next/link";
import { siteConfig } from "@/config/site.config";

const footerSections = [
  {
    title: "Wikendia",
    links: [
      { label: "About us", href: "/about" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Stays", href: "/listings" },
      { label: "Experiences", href: "#" },
      { label: "Destinations", href: "#" },
      { label: "Special offers", href: "#" },
    ],
  },
  {
    title: "Hosting",
    links: [
      { label: "Become a host", href: "/hosting" },
      { label: "Host resources", href: "#" },
      { label: "Community", href: "#" },
      { label: "Host support", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Contact us", href: "/contact" },
      { label: "Terms & Conditions", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

        {/* Main footer */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-ink-900">
                {section.title}
              </h3>

              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-600 transition hover:text-brand-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>


        {/* Bottom section */}
        <div className="mt-12 flex flex-col gap-4 border-t border-ink-200 pt-6 text-sm text-ink-500 md:flex-row md:items-center md:justify-between">

          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>


          <div className="flex gap-5">
            <Link
              href="#"
              className="hover:text-brand-600"
            >
              Facebook
            </Link>

            <Link
              href="#"
              className="hover:text-brand-600"
            >
              Instagram
            </Link>

            <Link
              href="#"
              className="hover:text-brand-600"
            >
              X
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}