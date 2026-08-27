"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Loader, RotateCw, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  ApiError,
  OtpData,
  VerifyOtpRequest,
  UserProfileResponse,
} from "@/src/types/authType";
import { removeOtpData } from "@/src/redux/features/otpSlice";
import { storeUser } from "@/src/redux/features/auth/authSlice";
import {
  useVerifyOTPMutation,
  useResendOTPMutation,
} from "@/src/redux/api/authApi";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 120;

interface OtpCredential {
  email: string;
}

interface RootState {
  otp: {
    otpData: OtpData | null;
  };
}

interface Props {
  credential: OtpCredential | null;
  onSuccess?: () => void;
  redirectPath?: string;
}

const VerifyOtp: React.FC<Props> = ({
  credential,
  onSuccess,
  redirectPath,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { otpData } = useSelector((state: RootState) => state.otp);

  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();
  const [resendOTP, { isLoading: isResending }] = useResendOTPMutation();

  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(RESEND_COOLDOWN_SECONDS);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const displayEmail = credential?.email || "";

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const focusInput = (index: number) => {
    inputRefs.current[Math.min(Math.max(index, 0), OTP_LENGTH - 1)]?.focus();
  };

  const handleChange = (index: number, value: string) => {
    const char = value.replace(/\D/g, "").slice(-1);

    setDigits((prev) => {
      const next = [...prev];
      next[index] = char;
      return next;
    });

    if (char && index < OTP_LENGTH - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      focusInput(index - 1);
    } else if (e.key === "ArrowLeft" && index > 0) {
      focusInput(index - 1);
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pasted) return;

    const next = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((char, i) => {
      next[i] = char;
    });
    setDigits(next);
    focusInput(Math.min(pasted.length, OTP_LENGTH - 1));
  };

  const handleResend = async () => {
    if (!displayEmail || secondsLeft > 0) return;

    try {
      await resendOTP({ email: displayEmail }).unwrap();
      toast.success("A new OTP has been sent to your email.");
      setDigits(Array(OTP_LENGTH).fill(""));
      setSecondsLeft(RESEND_COOLDOWN_SECONDS);
      focusInput(0);
    } catch (err: unknown) {
      const error = err as ApiError;
      toast.error(
        error?.data?.message || error?.message || "Could not resend OTP.",
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const otp_code = digits.join("");

    if (otp_code.length !== OTP_LENGTH) {
      toast.error(`Enter the ${OTP_LENGTH}-digit code.`);
      return;
    }

    if (!otpData?.id) {
      toast.error("OTP session expired. Please request a new OTP.");
      return;
    }

    try {
      const payload: VerifyOtpRequest = {
        user_id: otpData.id,
        otp_code,
      };

      const res = (await verifyOTP(payload).unwrap()) as UserProfileResponse;

      if (res?.success) {
        const user = res?.data?.user;

        toast.success(res?.message || "OTP verified successfully");

        dispatch(removeOtpData());
        if (user) {
          dispatch(storeUser(user));
        }

        onSuccess?.();

        if (user?.role === "super_admin") {
          router.push("/dashboard");
        } else {
          router.push(redirectPath || "/");
        }
      }
    } catch (err: unknown) {
      const error = err as ApiError;
      setDigits(Array(OTP_LENGTH).fill(""));
      focusInput(0);
      toast.error(
        error?.data?.message || error?.message || "Invalid or expired OTP.",
      );
    }
  };

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="p-4 md:min-w-100">
      <div className="flex items-center gap-2 text-emerald-400 mb-1">
        <ShieldCheck className="h-5 w-5" />
        <h3 className="text-xl font-bold text-white">Verify OTP</h3>
      </div>
      <p className="text-gray-400 mb-6 text-sm">
        Enter the {OTP_LENGTH}-digit code sent to{" "}
        <span className="text-emerald-400">{displayEmail}</span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex justify-between gap-2">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              disabled={isLoading}
              className="w-11 h-13 text-center text-lg font-semibold bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all disabled:opacity-50"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            "Confirm Verification"
          )}
        </button>

        <div className="text-center text-sm">
          {secondsLeft > 0 ? (
            <p className="text-gray-400">
              Resend OTP in{" "}
              <span className="text-emerald-400 font-medium">
                {minutes}:{seconds}
              </span>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition disabled:opacity-50"
            >
              <RotateCw
                className={`h-3.5 w-3.5 ${isResending ? "animate-spin" : ""}`}
              />
              {isResending ? "Sending..." : "Resend OTP"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default VerifyOtp;
