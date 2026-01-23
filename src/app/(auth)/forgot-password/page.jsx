"use client";

import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "@/utils/api";
import Link from "next/link";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

const schema = yup.object({
  email: yup.string().email().required("Email required"),
});

function Page() {

  const params = useSearchParams();
  const userType = params.get("type");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      if (!["user", "organiser"].includes(userType)) {
        return toast.error("Invalid verification type");
      }
      if (userType === "user") {
        await api.post("/users/forgot-password", data);
      } else {
        await api.post("/organizer/forgot-password", data);
      }

      toast.success("Email sent successfully!");
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
        <h1 className="text-xl font-bold text-center mb-4">Forgot Password</h1>

        <Input
          label="Email Address"
          {...register("email")}
          error={errors.email}
        />

        <button
          disabled={isSubmitting}
          className="w-full mt-4 py-2 rounded-lg text-white font-semibold
                     bg-gradient-to-r from-teal-500 to-lime-400 cursor-pointer"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}

function Input({ label, error, ...props }) {
  return (
    <div className="mb-4">
      <input
        {...props}
        placeholder={label}
        className="w-full border-b py-2 focus:outline-none"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
}

export default function ForgotPassword() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
}
