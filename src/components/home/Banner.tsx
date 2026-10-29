import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

const searchFields = [
  { label: "Location", value: "Address, City Or Zip" },
  { label: "Date/Duration", value: "Anytime/3 Days" },
  { label: "Budget", value: "$0-$3000" },
  { label: "People", value: "5-10" },
];

export function Banner() {
  return (
    <section className="relative isolate flex min-h-screen flex-col items-center overflow-hidden bg-slate-900 text-white lg:items-end">
      {" "}
      <Image
        src="/images/Banner.png"
        alt="A lush coastal travel destination"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-slate-950/45" />
      <div className="relative z-10 mx-auto flex w-full max-w-350 flex-1 flex-col items-center justify-center px-6 py-20 mt-15 text-center sm:px-10 lg:pb-40 lg:pt-36">
        <p className="m-5 text-xs font-medium uppercase tracking-[0.3em] text-white/80 sm:text-sm">
          Travel beyond the ordinary
        </p>
        <h1 className="max-w-3xl text-5xl font-light leading-[0.98] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-7 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="#explore"
            className="inline-flex items-center justify-center gap-7 bg-[#159fbe] px-6 py-4 text-sm font-medium uppercase transition-colors hover:bg-[#108ca8]"
          >
            Explore Now
            <ArrowRight size={20} />
          </Link>
          <Link
            href="#destinations"
            className="inline-flex items-center justify-center bg-white/45 px-6 py-4 text-sm font-medium uppercase backdrop-blur-sm transition-colors hover:bg-white/60"
          >
            View Destination
          </Link>
        </div>
      </div>
      <form className="relative z-10 mx-auto grid w-full max-w-350 shrink-0 grid-cols-1 bg-slate-950/60 backdrop-blur-sm sm:grid-cols-2 lg:absolute lg:inset-x-0 lg:bottom-0 lg:grid-cols-[1.2fr_1.2fr_1.2fr_1.2fr_0.8fr]">
        {searchFields.map((field) => (
          <label
            key={field.label}
            className="flex min-h-20 flex-col justify-center border-b border-white/40 px-6 py-4 text-left last:border-b-0 sm:border-r sm:last:border-b-0 lg:border-b-0"
          >
            <span className="text-lg font-medium">{field.label}</span>
            <input
              aria-label={field.label}
              defaultValue={field.value}
              className="mt-1 w-full bg-transparent text-sm text-white/85 outline-none placeholder:text-white/70"
            />
          </label>
        ))}
        <button
          type="submit"
          className="flex min-h-20 items-center justify-center gap-2 bg-[#159fbe] px-6 text-lg font-semibold transition-colors hover:bg-[#108ca8]"
        >
          <Search size={19} />
          Search
        </button>
      </form>
    </section>
  );
}
