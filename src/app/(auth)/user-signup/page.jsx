"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@/utils/api";
import { userSignupSchema } from "@/validations/userValidation";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(userSignupSchema),
  });

  const onSubmit = async (data) => {
    try {
      await api.post("/users/signup", data);
      toast.success("Account created successfully!", {
        onClose: () => router.push(`/verify-otp?email=${data.email}&type=user`),
      });
    } catch (err) {
      toast.error(err.response?.data?.message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-teal-200 via-yellow-100 to-orange-200">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg"
      >
       <Link href={"/"}>
          <h1 className="text-2xl font-bold text-center mb-2">
            <span className="text-teal-500">uni</span>firo
          </h1>
        </Link>
        
        <p className="text-center text-brand-teal text-xl font-semibold mb-6">
          Create Your Account
        </p>
        <p className="text-center text-black mb-6">
          Join thousands of event enthusiasts
        </p>
        <Input
          label="Full Name"
          {...register("fullName")}
          error={errors.fullName}
        />
        <Input
          label="Email Address"
          {...register("email")}
          error={errors.email}
        />
        <Input
          label="Mobile Number"
          {...register("mobile")}
          error={errors.mobile}
        />
        <Input
          label="Password"
          type={isVisible ? "text" : "password"}
          {...register("password")}
          error={errors.password}
          rightIcon={
            <button
              type="button"
              onClick={() => setIsVisible((prev) => !prev)}
              className="text-gray-500"
            >
              {isVisible ? <Eye size={18} /> : <EyeClosed size={18} />}
            </button>
          }
        />
        <div className="flex items-center gap-2 text-sm mt-3">
          <input type="checkbox" {...register("terms")} />
          <span>
            I agree to the <span className="underline">Terms</span> and{" "}
            <span className="underline">Privacy Policy</span>
          </span>
        </div>
        {errors.terms && (
          <p className="text-red-500 text-xs mt-1">{errors.terms.message}</p>
        )}

        <button
          disabled={isSubmitting}
          className="w-full mt-6 py-2 rounded-lg text-white font-semibold
                     bg-linear-to-r from-teal-500 to-lime-400 hover:opacity-90 cursor-pointer"
        >
          Create Account
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link href={"/user-login"}>
            <span className="underline">Sign in</span>
          </Link>
        </p>

        <p className="text-center text-xs text-gray-500 mt-4">
          Want to host events?{" "}
          <Link href={"/organiser-login"}>
            <span className="underline">Become an Organizer</span>
          </Link>
        </p>
      </form>
    </div>
  );
}

function Input({ label, error, rightIcon, ...props }) {
  return (
    <div className="mb-4 relative">
      <input
        {...props}
        placeholder={label}
        className="w-full border-b border-gray-300 focus:outline-none py-2 pr-10"
      />

      {rightIcon && (
        <div className="absolute right-2 top-2.5 cursor-pointer">
          {rightIcon}
        </div>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
}
