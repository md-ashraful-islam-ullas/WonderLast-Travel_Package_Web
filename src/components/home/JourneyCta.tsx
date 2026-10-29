import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function JourneyCta() {
  return (
    <section className="relative isolate flex min-h-[360px] items-center justify-center overflow-hidden px-6 py-20 text-center text-white sm:min-h-[400px] sm:px-10 lg:min-h-[440px]">
      <Image
        src="/images/CTA.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-slate-950/60" />

      <div className="relative z-10 flex max-w-3xl flex-col items-center">
        <h2 className="text-4xl font-light leading-tight tracking-[-0.06em] sm:text-5xl lg:text-6xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 text-sm text-white/90 sm:text-base lg:text-lg">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Link
          href="#destinations"
          className="mt-9 inline-flex items-center gap-8 bg-white px-6 py-4 text-sm font-medium text-slate-950 transition-colors hover:bg-white/85 sm:px-7"
        >
          BOOK YOUR TRIP TODAY
          <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  )
}
