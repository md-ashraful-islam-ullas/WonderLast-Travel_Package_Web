"use client";

import { type FormEvent, useState } from "react";
import { Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import getTokenFromClient from "@/lib/getTokenFromClient";

type DestinationFormValues = {
  destinationName: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

const initialValues: DestinationFormValues = {
  destinationName: "",
  country: "",
  category: "",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

const fieldClassName =
  "h-10 rounded-none border-[#e6eaed] bg-[#f7f8f9] px-3 text-sm text-slate-700 shadow-none placeholder:text-slate-400 focus-visible:border-[#159fbe] focus-visible:ring-2 focus-visible:ring-[#159fbe]/20";

const labelClassName = "text-xs font-medium text-slate-800";

export default function AddDestinationPage() {
  const [values, setValues] = useState<DestinationFormValues>(initialValues);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function updateField(field: keyof DestinationFormValues, value: string) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
    setIsSubmitted(false);
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      return;
    }

    setIsSubmitted(true);

    const token = await getTokenFromClient(); // Get the JWT token from the client

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-destination`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
      },
      body: JSON.stringify(values),
    });

    const result = await res.json();
    console.log("Response from server:", result);

    console.log("Form submitted with values:", values);
  };

  function handleReset() {
    setValues(initialValues);
    setIsSubmitted(false);
  }

  return (
    <section className="px-4 pb-20 pt-32 sm:px-8 sm:pt-36 lg:px-12 lg:pb-28">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-[clamp(2rem,4vw,3rem)] leading-tight tracking-[-0.06em] text-slate-950">
          Add New Travel Package
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-12 max-w-xl border border-[#e8ebed] bg-white p-5 shadow-[0_2px_4px_rgba(15,23,42,0.12)] sm:mt-14 sm:p-7"
        >
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="destination-name" className={labelClassName}>
                Destination Name
              </label>
              <Input
                id="destination-name"
                name="destinationName"
                value={values.destinationName}
                onChange={(event) =>
                  updateField("destinationName", event.target.value)
                }
                placeholder="Bali Paradise"
                className={fieldClassName}
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="country" className={labelClassName}>
                  Country
                </label>
                <Input
                  id="country"
                  name="country"
                  value={values.country}
                  onChange={(event) =>
                    updateField("country", event.target.value)
                  }
                  placeholder="Indonesia"
                  className={fieldClassName}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="category" className={labelClassName}>
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={values.category}
                  onChange={(event) =>
                    updateField("category", event.target.value)
                  }
                  className={`${fieldClassName} w-full appearance-auto outline-none`}
                  required
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  <option value="Beach">Beach</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Nature">Nature</option>
                  <option value="City">City</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="price" className={labelClassName}>
                  Price (USD)
                </label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={values.price}
                  onChange={(event) => updateField("price", event.target.value)}
                  placeholder="e.g., 1299"
                  className={fieldClassName}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="duration" className={labelClassName}>
                  Duration
                </label>
                <Input
                  id="duration"
                  name="duration"
                  value={values.duration}
                  onChange={(event) =>
                    updateField("duration", event.target.value)
                  }
                  placeholder="e.g. 7 Days/6 Nights"
                  className={fieldClassName}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="departure-date" className={labelClassName}>
                Departure Date
              </label>
              <Input
                id="departure-date"
                name="departureDate"
                type="date"
                value={values.departureDate}
                onChange={(event) =>
                  updateField("departureDate", event.target.value)
                }
                className={`${fieldClassName} text-slate-500`}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="image-url" className={labelClassName}>
                Image URL
              </label>
              <Input
                id="image-url"
                name="imageUrl"
                type="url"
                value={values.imageUrl}
                onChange={(event) =>
                  updateField("imageUrl", event.target.value)
                }
                placeholder="https://example.com/image.jpg"
                className={fieldClassName}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="description" className={labelClassName}>
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={values.description}
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
                placeholder="Describe the travel experience..."
                className="min-h-28 resize-y rounded-none border-[#e6eaed] bg-[#f7f8f9] px-3 text-sm text-slate-700 shadow-none placeholder:text-slate-400 focus-visible:border-[#159fbe] focus-visible:ring-2 focus-visible:ring-[#159fbe]/20"
                required
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col-reverse justify-end gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="h-10 rounded-none border-[#ff6b6b] px-4 text-xs font-normal text-[#ff5555] hover:border-[#ff5555] hover:bg-[#fff5f5] hover:text-[#ff5555]"
            >
              <Trash2 size={13} />
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-10 rounded-none bg-[#159fbe] px-4 text-xs font-normal text-white hover:bg-[#118daa]"
            >
              <Save size={13} />
              Add Travel Package
            </Button>
          </div>

          {isSubmitted && (
            <p
              className="mt-4 text-right text-xs text-[#159fbe]"
              role="status"
              aria-live="polite"
            >
              Travel package ready to be added.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
