"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function SignIn({ setForm }: { setForm: React.Dispatch<React.SetStateAction<"signin" | "signup" | "reset">> }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const remember = formData.get("remember") ? true : false;
    console.log({ email, password, remember });
    // TODO: Call API login
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
      <p className="text-yellow-primary text-sm">
        Đăng Nhập Tài Khoản Của Bạn Để Giao Dịch
      </p>
    </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
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

        {/* Options */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="remember"
              className="accent-green-500"
            />
            <span className="text-gray-300">Duy trì đăng nhập</span>
          </label>
            <p
            className="text-yellow-400 hover:underline cursor-pointer"
            onClick={() => setForm("reset")}
            >
            Quên mật khẩu?
            </p>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full py-2 rounded-lg font-bold text-yellow-primary bg-gradient-to-r from-green-800 to-green-600 hover:opacity-90 transition"
        >
          Đăng nhập
        </Button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-600" />
          <span className="px-2 text-gray-400 text-sm">
            hoặc Đăng nhập với
          </span>
          <div className="flex-grow h-px bg-gray-600" />
        </div>

        {/* Google Button */}
        <Button
          type="button"
          className="w-full flex items-center justify-center gap-2 py-2 border border-yellow-primary rounded-lg text-yellow-primary hover:bg-green-800 hover:text-green-800 transition"
        >
          <FaGoogle /> Google
        </Button>
      </form>
    </motion.div>
  );
}
