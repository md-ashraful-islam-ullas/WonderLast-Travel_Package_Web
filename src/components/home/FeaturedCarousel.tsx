"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export type FeaturedDestination = {
  id: string;
  name: string;
  country: string;
  price: string;
  duration: string;
  image: string;
};

type FeaturedCarouselProps = {
  destinations: FeaturedDestination[];
};

export default function FeaturedCarousel({
  destinations,
}: FeaturedCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap());
    };

    updateCurrent();
    api.on("select", updateCurrent);
    api.on("reInit", updateCurrent);

    return () => {
      api.off("select", updateCurrent);
      api.off("reInit", updateCurrent);
    };
  }, [api]);

  if (destinations.length === 0) {
    return (
      <p className="mt-12 text-sm text-slate-500">
        No featured destinations are available right now.
      </p>
    );
  }

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: "start", containScroll: "trimSnaps" }}
      className="mt-10"
      aria-label="Featured destinations"
    >
      <CarouselContent className="-ml-4">
        {destinations.map((destination) => (
          <CarouselItem
            key={destination.id}
            className="pl-4 sm:basis-1/2 lg:basis-1/3"
          >
            <article className="min-w-0">
              <div
                role="img"
                aria-label={destination.name}
                className="relative aspect-[1.65] overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url("${destination.image}")` }}
              >
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 bg-white/85 px-2.5 py-1 text-xs text-slate-950">
                  4.5
                  <Star size={12} fill="currentColor" strokeWidth={1.5} />
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <p className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin size={14} strokeWidth={1.7} />
                  {destination.country}
                </p>

                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="truncate text-xl font-light tracking-[-0.03em] text-slate-950">
                    {destination.name}
                  </h3>
                  <p className="shrink-0 text-lg text-slate-950">
                    <span className="font-medium">${destination.price}</span>
                    <span className="text-xs text-slate-500">/Person</span>
                  </p>
                </div>

                <p className="flex items-center gap-1.5 text-xs text-slate-500">
                  <CalendarDays size={14} strokeWidth={1.7} />
                  {destination.duration}
                </p>

                <Link
                  href={`/destinations/${destination.id}`}
                  className="inline-flex items-center gap-1 pt-3 text-xs font-medium uppercase tracking-wide text-[#159fbe] transition-colors hover:text-[#0d7890]"
                >
                  Book now
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </article>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="mt-10 flex items-center gap-8">
        <span className="shrink-0 text-lg text-slate-950">
          {current + 1}/{destinations.length}
        </span>
        <div className="h-px flex-1 bg-slate-200" />
        <div className="flex shrink-0 gap-3">
          <CarouselPrevious className="static size-12 translate-y-0 border-slate-300 text-slate-400 hover:text-slate-950" />
          <CarouselNext className="static size-12 translate-y-0 border-slate-300 text-slate-400 hover:text-slate-950" />
        </div>
      </div>
    </Carousel>
  );
}
