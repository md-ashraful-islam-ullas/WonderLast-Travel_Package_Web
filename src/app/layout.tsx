import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import { Footer } from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import "./globals.css";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wonderlast - Explore the World with Us",
  description: "Discover your next adventure with Wonderlast. Explore breathtaking destinations, book unforgettable experiences, and create memories that last a lifetime.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={` ${josefinSans.className} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
