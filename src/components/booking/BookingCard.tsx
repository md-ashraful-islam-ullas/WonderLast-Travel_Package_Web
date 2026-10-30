"use client";
import { authClient } from "@/lib/auth-client";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

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

const BookingCard = ({ destination }: { destination: ApiDestination }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
//   console.log("BookingCard destination:", destination); // Log the destination prop to check its value
//   console.log("BookingCard user:", user); // Log the user to check its value

const handleBooking = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const departureDate = (e.target as HTMLFormElement).departureDate.value;
    // console.log("Booking details:", {
    //   userId: user?.id,
    //   destinationId: destination._id,
    //   departureDate,
    // });
    const data = {
        userName: user?.name,
        userEmail: user?.email,
        ...destination,
        departureDate: departureDate,
    }

    const response = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const bookingData = await response.json();
    console.log("Booking response:", bookingData);
    
};

  

  return (
    <aside className="h-fit border border-[#e8ebed] bg-white p-3 shadow-[0_2px_5px_rgba(15,23,42,0.12)] sm:p-4">
      <p className="text-xs text-slate-500">Starting from</p>
      <p className="mt-1 text-2xl font-semibold text-[#159fbe]">
        ${destination.price}
      </p>
      <p className="text-xs text-slate-500">per person</p>

      <form onSubmit={handleBooking}>
        <input
          type="date"
          name="departureDate"
          defaultValue={destination.departureDate}
          className="mt-7 h-10 w-full border border-[#e8ebed] bg-[#f7f8f9] px-3 text-xs text-slate-700 outline-none focus:border-[#159fbe]"
        />

        <Button type="submit" className="mt-3 flex h-10 items-center justify-center gap-2 bg-[#159fbe] text-xs text-white transition-colors hover:bg-[#118daa]">
          Book Now
          <ArrowRight size={15} />
        </Button>
      </form>

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
  );
};

export default BookingCard;
