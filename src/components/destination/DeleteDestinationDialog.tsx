'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
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

const DeleteDestinationDialog = ({
  destination,
}: {
  destination: ApiDestination;
}) => {
    const router = useRouter();

    const handleDelete = async () => {
        const res = await fetch(`http://localhost:5000/destinations/${destination._id}`, {
            method: "DELETE",
        });
        const data = await res.json();
        console.log(data);
        router.push("/destinations"); // Redirect to the destinations page after deletion
        router.refresh();
        // Optionally, you can refresh the page or update the state to reflect the deletion
    };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
              className="inline-flex h-9 items-center gap-2 border border-[#ff6b6b] px-4 text-xs text-[#ff5555] transition-colors hover:bg-[#fff5f5]"
            >
              <Trash2 size={13} />
              Delete
            </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white border-none shadow-xl ring-0">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Travel Package</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <span className="font-bold">{destination.destinationName} ?</span> travel package? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDestinationDialog;
