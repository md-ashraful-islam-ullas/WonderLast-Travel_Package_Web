import Image from "next/image"

const features = [
  {
    icon: "/images/ShieldCheck.png",
    alt: "Shield with a check mark",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/images/MapTrifold.png",
    alt: "Folded map",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/images/Headset.png",
    alt: "Customer support headset",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="bg-[#effcff] px-6 py-20 sm:px-10 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-272">
        <div className="text-center">
          <h2 className="text-4xl font-light tracking-[-0.06em] text-slate-950 sm:text-5xl lg:text-6xl">
            Why Choose Wanderlust
          </h2>
          <p className="mt-3 text-sm text-slate-500 sm:text-base">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-10 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="flex min-h-53 flex-col bg-white px-8 py-9 shadow-sm sm:px-9"
            >
              <Image
                src={feature.icon}
                alt={feature.alt}
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
              <h3 className="mt-7 text-2xl font-light tracking-[-0.04em] text-slate-950">
                {feature.title}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
