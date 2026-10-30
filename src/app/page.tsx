import { Banner } from "@/components/home/Banner"
import Featured from "@/components/home/Featured"
import { JourneyCta } from "@/components/home/JourneyCta"
import { Testimonials } from "@/components/home/Testimonials"
import { WhyChooseUs } from "@/components/home/WhyChooseUs"

export default function Home() {
  return (
    <>
      <Banner />
      <Featured />
      <WhyChooseUs />
      <Testimonials />
      <JourneyCta />
    </>
  )
}
