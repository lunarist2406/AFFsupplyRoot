"use client";
import React, { useState } from "react";
import { FaSignInAlt, FaUserPlus, FaArrowLeft } from "react-icons/fa";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import MarketBoard from "./MarketBoard";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Authen() {
  const [form, setForm] = useState<"signin" | "signup">("signin");
  const router = useRouter();

  const renderForm = () => {
    switch (form) {
      case "signin":
        return <SignIn />;
      case "signup":
        return <SignUp />;
      default:
        return <SignIn />;
    }
  };

  return (
    <div className="flex flex-col h-screen text-primary-green">
      {/* Nội dung chính */}
      <div className="grid grid-cols-1 lg:grid-cols-10 flex-1 overflow-hidden">
        {/* Bảng giá nông sản */}
        <div className="lg:col-span-7 relative p-6">
          {/* Nút quay về */}
          <button
            onClick={() => router.push("/")}
            className="absolute top-4 left-4 p-2 rounded-full bg-green-600 text-yellow-primary hover:bg-green-700 transition"
          >
            <FaArrowLeft size={18} />
          </button>

          <MarketBoard />
        </div>

        {/* Form bên phải */}
        <div className="lg:col-span-3 flex items-center justify-center p-6">
          <div className="w-full max-w-md rounded-2xl border border-green-400 shadow-lg p-6">
            {/* Thanh chuyển đổi */}
            <div className="flex mb-6 border border-green-primary rounded-lg overflow-hidden">
              <button
                className={`flex-1 flex items-center justify-center gap-2 py-2 transition-all duration-300 ${
                  form === "signin"
                    ? "bg-green-primary text-yellow-primary font-bold"
                    : "bg-transparent text-yellow-primary hover:bg-green-primary hover:text-yellow-primary"
                }`}
                onClick={() => setForm("signin")}
              >
                <FaSignInAlt size={15} />
                <span className="text-sm">Đăng nhập</span>
              </button>

              <Button
                className={`flex-1 flex items-center justify-center gap-2 py-2 transition-all duration-300 ${
                  form === "signup"
                    ? "bg-green-primary text-yellow-primary font-bold"
                    : "bg-transparent text-yellow-primary hover:bg-green-primary hover:text-yellow-primary"
                }`}
                onClick={() => setForm("signup")}
              >
                <FaUserPlus size={15} />
                <span className="text-sm">Đăng ký</span>
              </Button>
            </div>

            {/* Form hiển thị */}
            {renderForm()}
          </div>
        </div>
      </div>
    </div>
  );
}
