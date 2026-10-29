"use client"

import Link from "next/link"
import { Menu, UserRound, X } from "lucide-react"
import { useState } from "react"
import { usePathname } from "next/navigation"

const navigation = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Add Destinations", href: "/add-destinations" },
  { label: "My Bookings", href: "#bookings" },
]

export function Navbar() {
  const pathName = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-20 px-4 pt-4 sm:px-6 lg:px-8">
      <nav className="mx-auto flex max-w-350 items-center justify-between bg-white px-5 py-4 text-sm text-slate-950 shadow-sm sm:px-7">
        <div className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`transition-colors hover:text-[#159fbe] ${
                pathName === item.href ? "text-[#159fbe] underline underline-offset-4" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-[#159fbe] sm:text-3xl"
        >
          Wanderlast
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          <Link href="#profile" className="flex items-center gap-1.5 hover:text-[#159fbe]">
            <UserRound size={16} strokeWidth={1.8} />
            Profile
          </Link>
          <Link href="#login" className="hover:text-[#159fbe]">
            Login
          </Link>
          <Link href="#signup" className="hover:text-[#159fbe]">
            Sign Up
          </Link>
        </div>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsOpen((open) => !open)}
          className="rounded-md p-1 text-slate-950 transition-colors hover:bg-slate-100 lg:hidden"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {isOpen && (
        <div className="mx-auto grid max-w-350 gap-1 bg-white px-5 pb-5 pt-1 text-sm text-slate-950 shadow-sm lg:hidden">
          {[...navigation, { label: "Profile", href: "#profile" }, { label: "Login", href: "#login" }, { label: "Sign Up", href: "#signup" }].map(
            (item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="px-2 py-2 hover:bg-slate-100 hover:text-[#159fbe]"
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      )}
    </header>
  )
}
