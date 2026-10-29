import { Banner } from "@/components/home/Banner"
import { JourneyCta } from "@/components/home/JourneyCta"
import { Testimonials } from "@/components/home/Testimonials"
import { WhyChooseUs } from "@/components/home/WhyChooseUs"

export default function Home() {
  return (
    <>
      <Banner />
      <WhyChooseUs />
      <Testimonials />
      <JourneyCta />
    </>
  )
}
