"use client"

import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const testimonials = [
  {
    quote:
      "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/destinations/image1.png",
    alt: "Traveler viewing a destination",
  },
  {
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/destinations/image2.png",
    alt: "Traveler enjoying a destination",
  },
  {
    quote:
      "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    name: "Jhon Terry",
    location: "England",
    image: "/images/destinations/image1.png",
    alt: "Traveler viewing a destination",
  }
]

export function Testimonials() {
  return (
    <section className="bg-white px-6 py-20 sm:px-10 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-272">
        <Carousel
          opts={{ align: "start" }}
          aria-label="Traveler testimonials"
        >
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl font-light tracking-[-0.06em] text-slate-950 sm:text-5xl lg:text-6xl">
                What Travelers Say
              </h2>
              <p className="mt-3 text-sm text-slate-500 sm:text-base">
                Real experiences from our happy travelers
              </p>
            </div>
            <div className="hidden shrink-0 sm:block">
              <CarouselPrevious className="static inline-flex translate-y-0" />
              <CarouselNext className="static ml-3 inline-flex translate-y-0" />
            </div>
          </div>

          <CarouselContent className="mt-10 -ml-5">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.name}
                className="pl-5 md:basis-1/2"
              >
                <article className="flex min-h-66.25 border border-slate-200 p-5 sm:p-6">
                  <div className="flex min-w-0 flex-1 flex-col justify-between pr-4 sm:pr-6">
                    <p className="text-lg font-light leading-[1.08] tracking-[-0.035em] text-slate-950 sm:text-xl">
                      &quot;{testimonial.quote}&quot;
                    </p>
                    <div className="mt-6">
                      <p className="text-sm text-[#159fbe]">
                        <span aria-hidden="true">—</span>
                        {testimonial.name}
                      </p>
                      <p className="pl-5 text-xs text-slate-500">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <div className="relative w-[38%] shrink-0 sm:w-[40%]">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.alt}
                      fill
                      sizes="(min-width: 768px) 20vw, 38vw"
                      className="object-cover"
                    />
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 flex justify-center sm:hidden">
            <CarouselPrevious className="static inline-flex translate-y-0" />
            <CarouselNext className="static ml-3 inline-flex translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
