"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword");
    console.log({ newPassword, confirmPassword });
    // TODO: Call API reset password
  };

  return (
    <motion.div
      className="w-full h-[30rem] max-w-md mx-auto p-6 rounded-2xl shadow-2xl text-yellow-primary font-manuale"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo */}
      <div className="text-center mb-6">
        <Image
          src="/logo.png"
          alt="logo"
          width={48}
          height={48}
          className="mx-auto w-12 h-12"
        />
        <h2 className="text-2xl font-bold text-yellow-secondary mt-2">
          AFF supplyRoot
        </h2>

      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <p className="text-yellow-secondary font-bold text-sm text-center mb-6">
            Thiết lập lại mật khẩu của bạn
          </p>
          <p className="text-gray-400 text-sm text-center">
            Nhập mật khẩu mới của bạn và xác nhận lại.
          </p>
        </div>

        {/* Mật khẩu mới */}
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            name="newPassword"
            placeholder="Mật khẩu mới"
            required
            className="w-full px-4 py-2 rounded-lg border border-yellow-primary bg-transparent text-yellow-primary placeholder-green-secondary focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="button"
            className="absolute right-3 top-2.5 text-yellow-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Xác nhận mật khẩu */}
        <div className="relative">
          <Input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            placeholder="Xác nhận mật khẩu"
            required
            className="w-full px-4 py-2 rounded-lg border border-yellow-primary bg-transparent text-yellow-primary placeholder-green-secondary focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="button"
            className="absolute right-3 top-2.5 text-yellow-400"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full py-2 rounded-lg font-bold text-yellow-primary bg-gradient-to-r from-green-800 to-green-600 hover:opacity-90 transition"
        >
          Xác nhận
        </Button>
      </form>
    </motion.div>
  );
}
