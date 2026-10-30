import { auth } from "@/lib/auth";
import MyBookingCard, { type Booking } from "@/components/booking/MyBookingCard";
import { headers } from "next/headers";
import getTokenFromServer from "@/lib/getTokenFromServer";

async function getBookings(email: string): Promise<Booking[]> {
  const token = await getTokenFromServer(); // Get the JWT token from the server
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${email}`, {
    headers: {
      authorization: `Bearer ${token?.token}`, // Include the JWT token in the Authorization header
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to load bookings: ${response.status}`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("The bookings response must be an array.");
  }

  return data.map((item) => item as Booking);
}

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const email = session?.user?.email;
  const bookings = email ? await getBookings(email) : [];

  return (
    <section className="px-4 pb-20 pt-32 sm:px-8 sm:pt-36 lg:px-12 lg:pb-28">
      <div className="mx-auto max-w-6xl">
        <div>
          <h1 className="text-[clamp(2rem,4vw,3.2rem)] leading-tight tracking-[-0.06em] text-slate-950">
            My Bookings
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Manage and view your upcoming travel plans
          </p>
        </div>

        {bookings.length > 0 ? (
          <div className="mt-8 space-y-4">
            {bookings.map((booking) => (
              <MyBookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        ) : (
          <p className="mt-10 border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500">
            You do not have any bookings yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default MyBookingsPage;
