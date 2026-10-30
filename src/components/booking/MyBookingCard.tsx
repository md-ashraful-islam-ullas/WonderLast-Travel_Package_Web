'use client';
import { CalendarDays, Eye, MapPin, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export type Booking = {
  _id: string;
  userName: string;
  userEmail: string;
  destinationName: string;
  country: string;
  category: string;
  price: string | number;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

function formatDepartureDate(date: string) {
  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
}

const MyBookingCard = ({ booking }: { booking: Booking }) => {

  const route = useRouter();
  const handleCancelBooking = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${booking._id}` ,{
        method: "DELETE",
      }
    );
    const data = await response.json();
    console.log("Cancel booking response:", data);
    if (data.deletedCount > 0) {
      route.refresh();
    }

  };
  return (
    <article className="flex flex-col gap-5 border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.06)] sm:flex-row sm:items-center sm:p-5">
      <Image
        src={booking.imageUrl}
        width={256}
        height={144}
        alt={booking.destinationName}
        className="h-52 w-full shrink-0 object-cover sm:h-36 sm:w-64"
      />

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-5 sm:min-h-36">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h2 className="text-2xl leading-tight tracking-[-0.04em] text-slate-950">
              {booking.destinationName}
            </h2>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <MapPin size={13} strokeWidth={1.7} />
              {booking.country}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
            <p className="flex items-center gap-1.5">
              <CalendarDays size={14} strokeWidth={1.7} />
              Departure: {formatDepartureDate(booking.departureDate)}
            </p>
            <p className="truncate">Booking ID: {booking._id}</p>
          </div>

          <p className="mt-2 text-xs text-slate-500">
            {booking.category} · {booking.duration}
          </p>
        </div>

        <p className="text-3xl font-medium tracking-[-0.04em] text-[#159fbe]">
          ${booking.price}
        </p>
      </div>

      <div className="flex shrink-0 gap-2 sm:self-end">
        <button
          type="button"
          className="inline-flex h-9 items-center justify-center gap-1.5 border border-red-300 px-4 text-xs font-medium text-red-500 transition-colors hover:bg-red-50"
          onClick={handleCancelBooking}
        >
          <Trash2 size={14} />
          Cancel
        </button>
        <button
          type="button"
          className="inline-flex h-9 items-center justify-center gap-1.5 bg-[#159fbe] px-4 text-xs font-medium text-white transition-colors hover:bg-[#118daa]"
        >
          <Eye size={14} />
          View
        </button>
      </div>
    </article>
  );
};

export default MyBookingCard;
