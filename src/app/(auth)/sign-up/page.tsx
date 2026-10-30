"use client";
import Link from "next/link";
import { LockKeyhole, Mail, UserRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const SignUpPage = () => {
  const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries()) as {
      "sign-up-name": string;
      "sign-up-email": string;
      "sign-up-password": string;
      "sign-up-confirm-password": string;
    };
    console.log(user);

    // Example: Call the authClient to sign up the user
    const { data, error } = await authClient.signUp.email({
      name: user["sign-up-name"],
      email: user["sign-up-email"],
      password: user["sign-up-password"],
    });

    if (data) {
        console.log("User signed up successfully:", data);
        redirect("/sign-in"); // Redirect to sign-in page after successful sign-up
    }

    if (error) {
        console.error("Error signing up:", error);
    }
  };
  return (
    <section className="flex min-h-full items-center justify-center bg-[#f8fafc] px-4 pb-20 pt-32 sm:px-6">
      <div className="w-full max-w-114">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Create Account
          </h1>
          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Start your adventure with Wanderlust
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-white p-7 shadow-md ring-1 ring-slate-200/70 sm:p-8"
        >
          <div className="space-y-3">
            <FormField
              id="sign-up-name"
              label="Full Name"
              placeholder="Enter your name"
              icon={<UserRound size={16} />}
            />
            <FormField
              id="sign-up-email"
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              icon={<Mail size={16} />}
            />
            <FormField
              id="sign-up-password"
              label="Password"
              type="password"
              placeholder="Create a password"
              icon={<LockKeyhole size={16} />}
            />
            <FormField
              id="sign-up-confirm-password"
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              icon={<LockKeyhole size={16} />}
            />
          </div>

          <button
            type="submit"
            className="mt-3 h-11 w-full bg-[#159fbe] text-sm font-medium text-white transition-colors hover:bg-[#128da9]"
          >
            Create Account
          </button>

          <AuthDivider>Or sign up with</AuthDivider>

          <button
            type="button"
            className="flex h-11 w-full items-center justify-center gap-2 border border-slate-200 bg-white text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50"
          >
            <GoogleIcon />
            Sign Up With Google
          </button>

          <p className="mt-5 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-[#159fbe] hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

function FormField({
  id,
  label,
  type = "text",
  placeholder,
  icon,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  icon: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-slate-900"
      >
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
          {icon}
        </span>
        <Input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          className="h-10 rounded-none border-slate-200 bg-slate-50 pl-9 text-sm shadow-none placeholder:text-slate-500 focus-visible:border-[#159fbe] focus-visible:ring-[#159fbe]/20"
        />
      </div>
    </div>
  );
}

function AuthDivider({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 flex items-center gap-3 text-xs text-slate-500">
      <span className="h-px flex-1 bg-slate-200" />
      <span>{children}</span>
      <span className="h-px flex-1 bg-slate-200" />
    </div>
  );
}

function GoogleIcon() {
  return <span className="text-base font-bold text-[#4285f4]">G</span>;
}

export default SignUpPage;
