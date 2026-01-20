"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  step1Schema,
  step2Schema,
  step3Schema,
} from "@/validations/organizerValidation.js";
import { api } from "@/utils/api";
import StepIndicator from "@/components/StepIndicator";
import Link from "next/link";
import { Eye, EyeClosed } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function OrganizerSignup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()

  const schema =
    step === 1 ? step1Schema : step === 2 ? step2Schema : step3Schema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const mergedData = { ...formData, ...data };
      setFormData(mergedData);

      if (step < 3) return setStep(step + 1);

      await api.post("/organizer/signup", mergedData);
      toast.success("Account registered successfully!", {
        onClose: router.push(`/verify-otp?email=${data.email}&type=organiser`)
      })
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-yellow-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl w-[420px]"
      >
        <Link href={"/"}>
          <h1 className="text-3xl font-bold text-center mb-2">
            <span className="text-teal-500">uni</span>firo
          </h1>
        </Link>

        <h2 className="text-xl font-semibold text-center text-[#20B3BC] mb-2">
          Become an Organizer
        </h2>

        <p className="text-md text-center text-black mb-4">
          Start hosting events on Unifiro
        </p>

        <StepIndicator currentStep={step} />

        {step === 1 && (
          <>
            <Input
              label="Organizer Name"
              {...register("organizerName")}
              error={errors.organizerName}
            />
            <Input
              label="Organizer Type"
              {...register("organizerType")}
              error={errors.organizerType}
            />
            <Input label="Email" {...register("email")} error={errors.email} />
            <Input
              label="Mobile"
              {...register("mobile")}
              error={errors.mobile}
            />
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              error={errors.password}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-gray-500"
                >
                  {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
                </button>
              }
            />
          </>
        )}

        {step === 2 && (
          <>
            <Input
              label="About Your Organization"
              {...register("about")}
              error={errors.about}
            />
            <Input
              label="City / Location"
              {...register("location")}
              error={errors.location}
            />
            <Input
              label="ID Proof (PAN / Aadhaar)"
              {...register("idProof")}
              error={errors.idProof}
            />
          </>
        )}

        {step === 3 && (
          <>
            <Input
              label="Bank Account Number"
              {...register("bankAccount")}
              error={errors.bankAccount}
            />
            <Input
              label="IFSC Code"
              {...register("ifsc")}
              error={errors.ifsc}
            />
            <label className="text-sm">
              <input type="checkbox" {...register("terms")} /> I accept terms
            </label>
            {errors.terms && (
              <p className="text-red-500 text-xs">{errors.terms.message}</p>
            )}
          </>
        )}

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="border-2 text-[#20B3BC] px-6 cursor-pointer py-2 rounded-lg"
            >
              Back
            </button>
          )}
          <button className="bg-gradient-to-r from-teal-400 to-lime-400 px-6 py-2 rounded-lg text-white cursor-pointer">
            {step === 3 ? "Submit Application" : "Continue"}
          </button>
        </div>
        <p className="text-center mt-2 text-[#101010] text-md">
          Already an organizer? <Link href={"/organiser-login"}>Sign in</Link>
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
