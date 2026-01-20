"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { api } from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { organizerLoginSchema } from "@/validations/organizerValidation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(organizerLoginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await api.post("/organizer/login", data);
      toast.success("Login successful!",{
        onClose: () => router.push("/dashboard")
      })
    } catch (err) {
      alert(err.response?.data?.message);
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

        <h2 className="text-xl text-center text-[#20B3BC] font-semibold mb-1">
          Welcome Back
        </h2>
        <p className="text-center text-black mb-6">
          Sign in to continue to your account
        </p>

        <Input
          label="Email or Phone"
          {...register("identifier")}
          error={errors.identifier}
        />

        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          {...register("password")}
          error={errors.password}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
            </button>
          }
        />

        <div className="flex justify-between items-center text-sm mt-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("rememberMe")} />
            Remember me
          </label>
          <Link href={"/forgot-password?type=organiser"}>
            <span className="underline cursor-pointer">Forgot password?</span>
          </Link>
        </div>

        <button
          disabled={isSubmitting}
          className="w-full mt-6 py-2 rounded-lg text-white font-semibold
                     bg-gradient-to-r from-teal-500 to-lime-400 hover:opacity-90 cursor-pointer"
        >
          Sign In
        </button>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link href={"/organiser-signup"}>
            <span className="underline cursor-pointer">Sign up</span>
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
        <div className="absolute right-2 top-2.5 text-gray-500">
          {rightIcon}
        </div>
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
}
