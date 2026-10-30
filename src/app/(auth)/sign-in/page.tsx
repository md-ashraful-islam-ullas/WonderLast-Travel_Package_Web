'use client'
import Link from "next/link"
import { LockKeyhole, Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const SignInPage = () => {
    const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault();
        // Handle form submission logic here
        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData.entries()) as {
            "sign-in-email": string;
            "sign-in-password": string;
        };
        console.log(user);

        const { data, error } = await authClient.signIn.email({
            email: user["sign-in-email"],
            password: user["sign-in-password"],
        });

        if (data) {
            console.log("User signed in successfully:", data);
            redirect("/"); // Redirect to dashboard or any other page after successful sign-in
        }
        if (error) {
            console.error("Error signing in:", error);
        }
    };

  return (
    <section className="flex min-h-full items-center justify-center bg-[#f8fafc] px-4 pb-20 pt-32 sm:px-6">
      <div className="w-full max-w-118">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Welcome Back
          </h1>
          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Resume your adventure with Wanderlust
          </p>
        </div>

        <form onSubmit={onSubmit} className="bg-white p-7 shadow-md ring-1 ring-slate-200/70 sm:p-8">
          <div className="space-y-3">
            <FormField
              id="sign-in-email"
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              icon={<Mail size={16} />}
            />
            <FormField
              id="sign-in-password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              icon={<LockKeyhole size={16} />}
            />
          </div>

          <div className="mt-2 flex items-center justify-between gap-4 text-sm">
            <label className="flex items-center gap-2 text-slate-600">
              <input
                type="checkbox"
                name="remember"
                className="size-4 accent-[#159fbe]"
              />
              Remember me
            </label>
            <Link href="#forgot-password" className="font-medium text-[#159fbe] hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="mt-3 h-11 w-full bg-[#159fbe] text-sm font-medium text-white transition-colors hover:bg-[#128da9]"
          >
            Sign In
          </button>

          <AuthDivider>Or continue with</AuthDivider>

          <button
            type="button"
            className="flex h-11 w-full items-center justify-center gap-2 border border-slate-200 bg-white text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50"
          >
            <GoogleIcon />
            Sign Up With Google
          </button>

          <p className="mt-5 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="font-semibold text-[#159fbe] hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </section>
  )
}

function FormField({
  id,
  label,
  type = "text",
  placeholder,
  icon,
}: {
  id: string
  label: string
  type?: string
  placeholder: string
  icon: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-900">
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
  )
}

function AuthDivider({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 flex items-center gap-3 text-xs text-slate-500">
      <span className="h-px flex-1 bg-slate-200" />
      <span>{children}</span>
      <span className="h-px flex-1 bg-slate-200" />
    </div>
  )
}

function GoogleIcon() {
  return <span className="text-base font-bold text-[#4285f4]">G</span>
}

export default SignInPage;