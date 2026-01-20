"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "@/utils/api";
import { Eye, EyeClosed } from "lucide-react";
import { useState, Suspense } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

const schema = yup.object({
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/,
      "Password must be 6-10 chars with uppercase, lowercase, number & special character",
    )
    .required(),
});

function ResetPasswordForm() {
  const params = useSearchParams();
  const token = params.get("token");
  const userType = params.get("type");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      if (!["user", "organiser"].includes(userType)) {
        return toast.error("Invalid verification type");
      }
      if (userType === "user") {
        await api.post("/users/reset-password", {
          token,
          password: data.password,
        });
      } else {
        await api.post("/organizer/reset-password", {
          token,
          password: data.password,
        });
      }

      const redirectPath =
        userType === "user" ? "/user-login" : "/organiser-login";

      toast.success("Password changed successfully!", {
        onClose: () => router.push(redirectPath),
      });
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-200 via-yellow-100 to-orange-200">
      <Link href={"/"}>
        <h1 className="text-2xl font-bold text-center mb-2">
          <span className="text-teal-500">uni</span>firo
        </h1>
      </Link>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-xl font-bold text-center mb-4">Reset Password</h1>

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
        <button
          className="w-full mt-4 py-2 rounded-lg text-white font-semibold
                     bg-gradient-to-r from-teal-500 to-lime-400 cursor-pointer"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-200 via-yellow-100 to-orange-200">
          <div className="text-teal-600">Loading...</div>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
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
