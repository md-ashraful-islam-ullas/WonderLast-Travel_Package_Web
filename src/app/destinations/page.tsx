import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";

type ApiDestination = {
  _id?: string;
  destinationName?: string;
  country?: string;
  price?: string | number;
  duration?: string;
  imageUrl?: string;
};

type Destination = {
  id: string;
  name: string;
  country: string;
  price: string;
  duration: string;
  image: string;
};

const fallbackImages = [
  "/images/destinations/image1.png",
  "/images/destinations/image2.png",
  "/images/destinations/image3.png",
  "/images/destinations/image4.png",
  "/images/destinations/image5.png",
  "/images/destinations/image6.png",
];

async function getDestinations(): Promise<Destination[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations`);

  if (!response.ok) {
    throw new Error(`Failed to load destinations: ${response.status}`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("The destinations response must be an array.");
  }

  return data.map((item, index) => {
    const destination = item as ApiDestination;

    return {
      id: destination._id ?? `destination-${index}`,
      name: destination.destinationName ?? "Untitled destination",
      country: destination.country ?? "Unknown location",
      price: destination.price?.toString() ?? "0",
      duration: destination.duration ?? "Flexible duration",
      image: destination.imageUrl || fallbackImages[index % fallbackImages.length],
    };
  });
}

export default async function AllDestinationPage() {
  const destinations = await getDestinations();

  return (
    <section className="px-4 pb-20 pt-32 sm:px-8 sm:pt-36 lg:px-12 lg:pb-28">
      <div className="mx-auto max-w-7xl">
        <div>
          <h1 className="text-[clamp(2rem,4vw,3.2rem)] leading-tight tracking-[-0.06em] text-slate-950">
            Explore All Destinations
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Find your perfect travel experience from our curated collection
          </p>
        </div>

        <p className="mt-10 text-sm text-slate-500">
          Showing {destinations.length} destination
          {destinations.length === 1 ? "" : "s"}
        </p>

        <div className="mt-6 grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <article key={destination.id} className="min-w-0">
              <div
                role="img"
                aria-label={destination.name}
                className="relative aspect-[1.65] overflow-hidden bg-slate-100 bg-cover bg-center"
                style={{ backgroundImage: `url("${destination.image}")` }}
              >
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 bg-white/90 px-2.5 py-1 text-xs text-slate-950 shadow-sm">
                  4.5
                  <Star size={12} fill="currentColor" strokeWidth={1.5} />
                </span>
              </div>

              <div className="mt-3 space-y-1">
                <p className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin size={13} strokeWidth={1.7} />
                  {destination.country}
                </p>

                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="truncate text-base text-slate-950">
                    {destination.name}
                  </h2>
                  <p className="shrink-0 text-sm text-slate-950">
                    <span className="font-medium">${destination.price}</span>
                    <span className="text-xs text-slate-500">/Person</span>
                  </p>
                </div>

                <p className="flex items-center gap-1.5 text-xs text-slate-500">
                  <CalendarDays size={13} strokeWidth={1.7} />
                  {destination.duration}
                </p>

                <a
                  href={`/destinations/${destination.id}`}
                  className="inline-flex items-center gap-1 pt-2 text-xs font-medium uppercase tracking-wide text-[#159fbe] transition-colors hover:text-[#0d7890]"
                >
                  Book now
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
