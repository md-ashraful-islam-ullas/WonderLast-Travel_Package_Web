import FeaturedCarousel, {
  type FeaturedDestination,
} from "@/components/home/FeaturedCarousel";
import Link from "next/link";

type ApiDestination = {
  _id?: string;
  destinationName?: string;
  country?: string;
  price?: string | number;
  duration?: string;
  imageUrl?: string;
};

const fallbackImages = [
  "/images/destinations/image1.png",
  "/images/destinations/image2.png",
  "/images/destinations/image3.png",
  "/images/destinations/image4.png",
  "/images/destinations/image5.png",
  "/images/destinations/image6.png",
];

async function getFeaturedDestinations(): Promise<FeaturedDestination[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured-destinations`);

  if (!response.ok) {
    throw new Error(`Failed to load featured destinations: ${response.status}`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("The featured destinations response must be an array.");
  }

  return data.map((item, index) => {
    const destination = item as ApiDestination;

    return {
      id: destination._id ?? `featured-destination-${index}`,
      name: destination.destinationName ?? "Untitled destination",
      country: destination.country ?? "Unknown location",
      price: destination.price?.toString() ?? "0",
      duration: destination.duration ?? "Flexible duration",
      image:
        destination.imageUrl ||
        fallbackImages[index % fallbackImages.length],
    };
  });
}

export default async function Featured() {
  const destinations = await getFeaturedDestinations();

  return (
    <section
      id="featured-destinations"
      className="bg-white px-6 py-20 sm:px-10 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-350">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-none tracking-[-0.06em] text-slate-950">
              Featured Destinations
            </h2>
            <p className="mt-3 text-sm text-slate-500 sm:text-base">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>
          <Link
            href="/destinations"
            className="hidden shrink-0 items-center gap-8 border border-[#159fbe] px-5 py-3 text-xs font-medium uppercase text-[#159fbe] transition-colors hover:bg-[#159fbe] hover:text-white sm:inline-flex"
          >
            All destinations
            <span aria-hidden="true" className="text-lg leading-none">
              →
            </span>
          </Link>
        </div>

        <FeaturedCarousel destinations={destinations} />
      </div>
    </section>
  );
}
