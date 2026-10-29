"use client"

import Link from "next/link"
import { ArrowUpRight, Send } from "lucide-react"
import { type FormEvent, useState } from "react"

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "#destinations" },
  { label: "My Bookings", href: "#bookings" },
  { label: "My Profile", href: "#profile" },
]

const supportLinks = [
  { label: "Help Center", href: "#help" },
  { label: "Terms of Service", href: "#terms" },
  { label: "Privacy Policy", href: "#privacy" },
]

export function Footer() {
  const [isSubscribed, setIsSubscribed] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubscribed(true)
  }

  return (
    <footer className="bg-[#0d0b0b] px-6 pb-5 pt-16 text-white sm:px-10 sm:pt-20 lg:px-16 lg:pt-24">
      <div className="mx-auto max-w-272">
        <div className="grid gap-12 lg:grid-cols-[1.7fr_1fr_1fr_1fr] lg:gap-16">
          <div>
            <Link
              href="/"
              className="text-5xl font-bold tracking-[-0.06em] sm:text-6xl"
            >
              Wanderlast
            </Link>
            <p className="mt-3 max-w-md text-sm text-white/70 sm:text-base">
              Your gateway to extraordinary travel experiences around the world.
            </p>

            <div className="mt-12 max-w-sm">
              <p className="text-sm font-light uppercase">Newsletter</p>
              <p className="mt-2 text-xs text-white/65">
                Subscribe for exclusive travel deals and inspiration.
              </p>
              <form
                onSubmit={handleSubmit}
                className="mt-4 flex bg-white/15 focus-within:ring-1 focus-within:ring-white/70"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter email"
                  className="min-w-0 flex-1 bg-transparent px-3.5 py-3 text-sm text-white outline-none placeholder:text-white/60"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="px-4 text-white transition-colors hover:bg-white/10"
                >
                  <Send size={18} />
                </button>
              </form>
              {isSubscribed && (
                <p className="mt-2 text-xs text-[#8bd8e8]" role="status">
                  Thanks for subscribing!
                </p>
              )}
            </div>
          </div>

          <FooterLinkGroup title="Quick Links" links={quickLinks} />
          <FooterLinkGroup title="Support" links={supportLinks} />

          <div>
            <h2 className="text-sm font-light uppercase">Contact Us</h2>
            <div className="mt-5 space-y-3 text-sm text-white/70">
              <a href="tel:+7869011622" className="block hover:text-white">
                786 901 1622
              </a>
              <a
                href="mailto:info@wanderland.com"
                className="block wrap-break-word hover:text-white"
              >
                info@wanderland.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-white/10 pt-5 text-xs text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Wanderlust. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#x" aria-label="X" className="hover:text-white">
              <span className="text-lg leading-none">𝕏</span>
            </a>
            <a href="#linkedin" aria-label="LinkedIn" className="hover:text-white">
              <span className="text-sm font-bold">in</span>
            </a>
            <a href="#instagram" aria-label="Instagram" className="hover:text-white">
              <span className="text-lg leading-none">◎</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterLinkGroup({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div>
      <h2 className="text-sm font-light uppercase">{title}</h2>
      <nav className="mt-5 space-y-3" aria-label={title}>
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="flex items-center gap-1 text-sm text-white/70 hover:text-white"
          >
            {link.label}
            <ArrowUpRight size={12} />
          </Link>
        ))}
      </nav>
    </div>
  )
}
