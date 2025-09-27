"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner"; // 👈 import toast

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirm = formData.get("confirm");
    const agree = formData.get("agree") ? true : false;

    if (password !== confirm) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      // TODO: Gọi API đăng ký
      // Ví dụ mock
      const success = true; // đổi thành response từ API

      if (success) {
        toast.success("Đăng ký thành công 🎉");
        // có thể redirect login
      } else {
        toast.error("Đăng ký thất bại. Vui lòng thử lại!");
      }
    } catch (error: any) {
      toast.error(error?.message || "Có lỗi xảy ra khi đăng ký!");
    }
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
        <Image src="/logo.png" alt="logo" width={48} height={48} className="mx-auto w-12 h-12" />
        <h2 className="text-2xl font-bold text-yellow-secondary mt-2">AFF supplyRoot</h2>
        <p className="text-xs sm:text-sm md:text-sm text-yellow-primary">
          Đăng Ký Tài Khoản Để Giao Dịch
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <Input
            type="text"
            name="fullName"
            placeholder="Họ và tên"
            required
            className="w-full px-4 py-2 rounded-lg border border-yellow-primary bg-transparent text-yellow-primary placeholder-green-secondary focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Email */}
        <div>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2 rounded-lg border border-yellow-primary bg-transparent text-yellow-primary placeholder-green-secondary focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Mật khẩu"
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

        {/* Confirm Password */}
        <div className="relative">
          <Input
            type={showConfirm ? "text" : "password"}
            name="confirm"
            placeholder="Xác nhận"
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

        {/* Agree */}
        <div className="flex items-center space-x-2">
          <input type="checkbox" name="agree" className="accent-green-500" required />
          <span className="text-gray-300 text-sm">
            Tôi đồng ý với{" "}
            <a href="/terms" className="text-yellow-400 hover:underline">
              Điều khoản sử dụng
            </a>{" "}
            và{" "}
            <a href="/privacy" className="text-yellow-400 hover:underline">
              Chính sách bảo mật
            </a>
          </span>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full py-2 rounded-lg font-bold text-yellow-primary bg-gradient-to-r from-green-800 to-green-600 hover:opacity-90 transition"
        >
          Đăng ký
        </Button>
      </form>
    </motion.div>
  );
}
