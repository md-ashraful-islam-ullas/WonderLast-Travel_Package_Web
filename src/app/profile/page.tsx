"use client"

import { Camera, Edit3, Globe2, MapPin, Plane, TrendingUp, WalletCards } from "lucide-react"
import { authClient } from "@/lib/auth-client"

const stats = [
  { label: "Total Bookings", value: "12", icon: Plane, color: "bg-cyan-50 text-cyan-500" },
  { label: "Countries Visited", value: "18", icon: Globe2, color: "bg-green-50 text-green-500" },
  { label: "Upcoming Trips", value: "2", icon: TrendingUp, color: "bg-orange-50 text-orange-500" },
  { label: "Total Spent", value: "$15,750", icon: WalletCards, color: "bg-fuchsia-50 text-fuchsia-500" },
]

export default function MyProfilePage() {
  const { data: session } = authClient.useSession()
  const user = session?.user
  const displayName = user?.name || "Sarah Mitchell"
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <section className="min-h-full bg-white px-6 pb-20 pt-32 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-272">
        <header>
          <h1 className="text-4xl tracking-[-0.06em] text-slate-950 sm:text-5xl">
            My Profile
          </h1>
          <p className="mt-3 text-sm text-slate-500 sm:text-base">
            Manage your account settings and travel preferences
          </p>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[18.75rem_1fr]">
          <div className="border border-slate-100 bg-white p-4 shadow-md">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="flex size-28 items-center justify-center rounded-full bg-[#d7e9ed] text-3xl font-semibold text-[#159fbe]">
                  {initials}
                </div>
                <button
                  type="button"
                  aria-label="Change profile photo"
                  className="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full bg-[#159fbe] text-white"
                >
                  <Camera size={15} />
                </button>
              </div>
              <h2 className="mt-4 text-lg font-semibold text-slate-950">{displayName}</h2>
              <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                <MapPin size={15} />
                San Francisco, CA
              </p>
            </div>

            <div className="my-4 border-t border-slate-100 pt-4 text-sm">
              <ProfileDetail label="Member since" value="Mar 2024" />
              <ProfileDetail label="Nationality" value="United States" />
            </div>

            <button
              type="button"
              className="flex h-11 w-full items-center justify-center gap-2 bg-[#159fbe] text-sm font-medium text-white transition-colors hover:bg-[#128da9]"
            >
              <Edit3 size={15} />
              Edit Profile
            </button>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-950">Travel Statistics</h2>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between border border-slate-100 p-4 shadow-sm"
                  >
                    <div>
                      <p className="text-sm text-slate-500">{stat.label}</p>
                      <p className="mt-2 text-lg text-slate-950">{stat.value}</p>
                    </div>
                    <span className={`flex size-11 items-center justify-center rounded-full ${stat.color}`}>
                      <Icon size={21} />
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProfileDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold text-slate-800">{value}</span>
    </div>
  )
}