"use client"

import Link from "next/link"
import { LogOut, Menu, UserRound, X } from "lucide-react"
import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"

const navigation = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Add Destinations", href: "/add-destinations" },
  { label: "My Bookings", href: "/my-bookings" },
]

const profileLink = { label: "Profile", href: "/profile" }
const authLinks = [
  { label: "Login", href: "/sign-in" },
  { label: "Sign Up", href: "/sign-up" },
]

export function Navbar() {
  const pathName = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const { data: session } = authClient.useSession()
  const rightNavigation = session?.user ? [profileLink] : [profileLink, ...authLinks]

  function isActive(href: string) {
    return href.startsWith("/") && pathName === href
  }

  function linkClassName(href: string, additionalClassName = "") {
    return `transition-colors hover:text-[#159fbe] ${
      isActive(href) ? "text-[#159fbe] underline underline-offset-4" : ""
    } ${additionalClassName}`
  }

  async function handleSignOut() {
    const result = await authClient.signOut()
    if (result.error) {
      console.error("Unable to sign out:", result.error.message)
      return
    }

    setIsOpen(false)
    router.push("/sign-in")
  }

  return (
    <header className="absolute inset-x-0 top-0 z-20 px-4 pt-4 sm:px-6 lg:px-8">
      <nav className="mx-auto flex max-w-350 items-center justify-between bg-white px-5 py-4 text-sm text-slate-950 shadow-sm sm:px-7">
        <div className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={linkClassName(item.href)}
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
          {rightNavigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={linkClassName(
                item.href,
                item.label === "Profile" ? "flex items-center gap-1.5" : ""
              )}
            >
              {item.label === "Profile" && <UserRound size={16} strokeWidth={1.8} />}
              {item.label}
            </Link>
          ))}
          {session?.user && (
            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center gap-1.5 transition-colors hover:text-[#159fbe]"
            >
              <LogOut size={16} strokeWidth={1.8} />
              Sign Out
            </button>
          )}
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
          {[...navigation, ...rightNavigation].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={linkClassName(
                item.href,
                `px-2 py-2 ${isActive(item.href) ? "" : "hover:bg-slate-100"}`
              )}
            >
              {item.label}
            </Link>
          ))}
          {session?.user && (
            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center gap-2 px-2 py-2 text-left transition-colors hover:bg-slate-100 hover:text-[#159fbe]"
            >
              <LogOut size={16} strokeWidth={1.8} />
              Sign Out
            </button>
          )}
        </div>
      )}
    </header>
  )
}
