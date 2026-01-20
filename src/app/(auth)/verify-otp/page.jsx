"use client";

import { useRef, useState, Suspense } from "react";
import { api } from "@/utils/api";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

function Page() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const router = useRouter();

  const params = useSearchParams();
  const email = params.get("email");
  const userType = params.get("type");

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      return toast.error("Enter a valid 6-digit OTP");
    }

    if (!["user", "organiser"].includes(userType)) {
      return toast.error("Invalid verification type");
    }

    try {
      if (userType === "user") {
        await api.post("/users/verify-email", {
          email,
          otp: otpValue,
        });
      } else {
        await api.post("/organizer/verify-email", {
          email,
          otp: otpValue,
        });
      }

      const redirectPath =
        userType === "user" ? "/user-login" : "/organiser-login";

      toast.success("Email verified successfully!", {
        onClose: () => router.push(redirectPath),
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    }
  };

  const handleResend = async () => {
    try {
      
      if (!["user", "organizer"].includes(userType)) {
        return toast.error("Invalid verification type");
      }

      if (userType === "user") {
        await api.post("/users/resend-emailOtp", { email });
      } else {
        await api.post("/organizer/resend-emailOtp", { email });
      }
      toast.success("OTP resent successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-teal-100 via-white to-yellow-100 px-4">
      <div className="relative p-0.5 rounded-3xl bg-linear-to-r from-cyan-400 to-orange-400 w-full max-w-md">
        <div className="bg-white rounded-3xl px-8 py-10 text-center">
          <h1 className="text-3xl font-semibold mb-1">
            <span className="text-green-500">uni</span>
            <span className="text-black">firo</span>
          </h1>

          <h2 className="text-xl font-medium text-cyan-500 mt-4">
            Verify Your Account
          </h2>

          <p className="text-sm text-gray-600 mt-2">
            Enter the OTP sent to your email address.
          </p>

          <div className="mt-6">
            <div className="flex justify-center gap-1 md:gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-14 h-14 rounded-lg border shadow-sm text-center text-xl focus:ring-2 focus:ring-cyan-400"
                />
              ))}
            </div>
          </div>

          <button
            onClick={handleVerify}
            className="mt-6 w-full py-3 cursor-pointer rounded-lg text-white font-medium bg-gradient-to-r from-cyan-500 to-lime-400 hover:opacity-90"
          >
            Verify OTP
          </button>

          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <span>Didn’t receive the OTP?</span>
            <button
              onClick={handleResend}
              className="font-medium hover:underline cursor-pointer"
            >
              Resend OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
}
