"use client";
import React, { useState } from "react";
import { FaSignInAlt, FaUserPlus, FaArrowLeft } from "react-icons/fa";
import SignUp from "./SignUp";
import MarketBoard from "./MarketBoard";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ResetPassword from "./ResetPassword";
import SignIn from "./SignIn";
import VerifyAccount from "./VerifyAccount";

export default function Authen() {
  const [form, setForm] = useState<"signin" | "signup" | "verify"|"reset">("signin");
  const router = useRouter();

  const renderForm = () => {
    switch (form) {
      case "signin":
        return <SignIn setForm={setForm} />;
      case "signup":
        return <SignUp />;
      case "verify":
        return <VerifyAccount />;
      default:
        return <SignIn setForm={setForm} />;
    }
  };

  return (
    <div className="flex flex-col h-screen text-primary-green">
      {/* Nút quay về cho mobile (ngoài form) */}
      <div className="block lg:hidden p-4">
        <button
          onClick={() => router.push("/")}
          className="p-2 rounded-full bg-green-600 text-yellow-primary hover:bg-green-700 transition"
        >
          <FaArrowLeft size={18} />
        </button>
        <div className="block lg:hidden px-4 sm:px-6 text-center text-yellow-primary mt-4">
          <h1 className="text-sm sm:text-base md:text-lg font-bold leading-snug">
            Chào mừng bạn đến sàn thương mại Nông Nghiệp của Việt Nam
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-10 flex-1 overflow-hidden">
        {/* MarketBoard chỉ hiển thị desktop */}
        <div className="hidden lg:block lg:col-span-7 relative p-6">
          {/* Nút quay về desktop */}
          <button
            onClick={() => router.push("/")}
            className="absolute top-4 left-4 p-2 rounded-full bg-green-600 text-yellow-primary hover:bg-green-700 transition"
          >
            <FaArrowLeft size={18} />
          </button>

          <MarketBoard />
        </div>

        {/* Form bên phải */}
        <div className="col-span-1 lg:col-span-3 flex items-center justify-center p-4 sm:p-6">
          <div
            className="
              w-full max-w-md rounded-2xl border border-green-400 shadow-lg 
              p-4 sm:p-6 bg-black/20 flex flex-col
              min-h-[420px] sm:min-h-[480px] md:min-h-[520px]
              max-h-[calc(100vh-100px)] overflow-y-hidden
            "
          >
            {/* Thanh chuyển đổi */}
            <div className="flex mb-4 sm:mb-6 border border-green-primary rounded-lg overflow-hidden text-sm sm:text-base">
              <button
                className={`flex-1 flex items-center justify-center gap-2 py-2 transition-all duration-300 ${
                  form === "signin"
                    ? "bg-green-primary text-yellow-primary font-bold"
                    : "bg-transparent text-yellow-primary hover:bg-green-primary hover:text-yellow-primary"
                }`}
                onClick={() => setForm("signin")}
              >
                <FaSignInAlt size={14} />
                <span className="text-xs sm:text-sm md:text-sm text-yellow-primary">Đăng nhập</span>
              </button>

              <Button
                className={`flex-1 flex items-center justify-center gap-2 py-2 transition-all duration-300 ${
                  form === "signup"
                    ? "bg-green-primary text-yellow-primary font-bold"
                    : "bg-transparent text-yellow-primary hover:bg-green-primary hover:text-yellow-primary"
                }`}
                onClick={() => setForm("signup")}
              >
                <FaUserPlus size={14} />
                <span className="text-xs sm:text-sm md:text-sm text-yellow-primary">Đăng ký</span>
              </Button>
            </div>

            {/* Form hiển thị */}
            <div className="flex-1 flex items-center justify-center">
              {renderForm()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
