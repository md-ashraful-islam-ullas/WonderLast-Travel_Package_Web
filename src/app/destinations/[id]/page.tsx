import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  MapPin,
  Star,
} from "lucide-react";
import EditDestinationDialog from "@/components/destination/EditDestinationDialog";
import DeleteDestinationDialog from "@/components/destination/DeleteDestinationDialog";

type ApiDestination = {
  _id?: string;
  destinationName?: string;
  country?: string;
  price?: string | number;
  duration?: string;
  departureDate?: string;
  imageUrl?: string;
  description?: string;
};

const fallbackImage = "/images/destinations/image1.png";

const highlights = [
  "Luxury beachfront accommodation",
  "Visit Uluwatu Temple at sunset",
  "Traditional Balinese spa treatment",
  "Private beach dinner experience",
  "Sunrise trek to Mount Batur",
];

function formatDepartureDate(value?: string) {
  if (!value) {
    return "Flexible departure";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US").format(date);
}

async function getDestination(id: string): Promise<ApiDestination> {
  const response = await fetch(`http://localhost:5000/destinations/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to load destination: ${response.status}`);
  }

  const data: unknown = await response.json();

  if (!data || typeof data !== "object") {
    throw new Error("The destination response must be an object.");
  }

  return data as ApiDestination;
}

export default async function DestinationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const destination = await getDestination(id);
  const name = destination.destinationName ?? "Untitled destination";
  const country = destination.country ?? "Unknown location";
  const price = destination.price?.toString() ?? "0";
  const duration = destination.duration ?? "Flexible duration";
  const description =
    destination.description ||
    `Discover the magic of ${name} with unforgettable landscapes, local culture, and memorable experiences.`;

  return (
    <section className="px-4 pb-20 pt-32 sm:px-8 sm:pt-36 lg:px-12 lg:pb-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-950"
          >
            <ArrowLeft size={16} />
            Back to Destinations
          </Link>

          <div className="flex items-center gap-2">
            
            <EditDestinationDialog destination={destination} />
            
            <DeleteDestinationDialog destination={destination} />
          </div>
        </div>

        <div
          role="img"
          aria-label={name}
          className="mt-7 aspect-[2.4] min-h-56 bg-slate-100 bg-cover bg-center sm:min-h-72 lg:min-h-0"
          style={{
            backgroundImage: `url("${destination.imageUrl || fallbackImage}")`,
          }}
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_244px] lg:gap-16">
          <div>
            <p className="flex items-center gap-1.5 text-xs text-slate-500">
              <MapPin size={14} />
              {country}
            </p>

            <h1 className="mt-2 text-[clamp(2rem,4vw,3rem)] leading-tight tracking-[-0.06em] text-slate-950">
              {name}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-950">
              <span className="inline-flex items-center gap-1.5">
                <Star size={15} fill="#16a34a" color="#16a34a" />
                <strong>4.9</strong>
                <span className="text-slate-500">(234 reviews)</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={14} className="text-slate-500" />
                {duration}
              </span>
            </div>

            <div className="mt-8">
              <h2 className="text-xl tracking-[-0.04em] text-slate-950">
                Overview
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                {description}
              </p>
            </div>

            <div className="mt-7">
              <h2 className="text-xl tracking-[-0.04em] text-slate-950">
                Highlights
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                Experience luxury resorts, local culture, tropical landscapes,
                and unforgettable moments during your stay.
              </p>
              <ul className="mt-3 grid gap-x-8 gap-y-3 text-xs text-slate-500 sm:grid-cols-2">
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <Check size={14} className="mt-0.5 shrink-0 text-green-600" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>

                {/* Right side section */}
          <aside className="h-fit border border-[#e8ebed] bg-white p-3 shadow-[0_2px_5px_rgba(15,23,42,0.12)] sm:p-4">
            <p className="text-xs text-slate-500">Starting from</p>
            <p className="mt-1 text-2xl font-semibold text-[#159fbe]">
              ${price}
            </p>
            <p className="text-xs text-slate-500">per person</p>

            <div className="mt-7 flex h-10 items-center border border-[#e8ebed] bg-[#f7f8f9] px-3 text-xs text-slate-700">
              {formatDepartureDate(destination.departureDate)}
            </div>

            <Link
              href={`/destinations/${id}/book`}
              className="mt-3 flex h-10 items-center justify-center gap-2 bg-[#159fbe] text-xs text-white transition-colors hover:bg-[#118daa]"
            >
              Book Now
              <ArrowRight size={15} />
            </Link>

            <ul className="mt-3 space-y-2 text-xs text-slate-500">
              {[
                "Free cancellation up to 7 days",
                "Travel insurance included",
                "24/7 customer support",
              ].map((benefit) => (
                <li key={benefit} className="flex items-start gap-2">
                  <Check size={14} className="mt-0.5 shrink-0 text-green-600" />
                  {benefit}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
