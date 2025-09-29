"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // 👈 import toast

export default function SignIn({ setForm }: { setForm: React.Dispatch<React.SetStateAction<"signin" | "signup" |"verify" |"reset">> }) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { state, dispatch, handleLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    dispatch({ type: "SET_FIELD", field: "email", value: email });
    dispatch({ type: "SET_FIELD", field: "password", value: password });

    try {
      await handleLogin(); // giả sử handleLogin đã async
      if (state.response?.user) {
        toast.success("Đăng nhập thành công ");
        router.push("/"); // redirect
      } else if (state.error) {
        toast.error(state.error);
      }
    } catch (error: any) {
      toast.error(error?.message || "Đăng nhập thất bại!");
    }
  };

  useEffect(() => {
    if (state.response?.user) {
      router.push("/");
    }
  }, [state.response, router]);

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
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-secondary mt-2">
          AFF supplyRoot
        </h2>
        <p className="text-xs sm:text-sm md:text-sm text-yellow-primary">
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
            className="w-full px-4 py-2 rounded-lg border border-yellow-primary bg-transparent text-yellow-primary placeholder-green-secondary focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Mật khẩu"
            required
            className="w-full px-4 py-2 rounded-lg border border-yellow-primary bg-transparent text-yellow-primary placeholder-green-secondary focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
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
        <div className="flex items-center justify-between text-xs sm:text-sm">
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
            onClick={() => setForm("verify")}
          >
            Quên mật khẩu?
          </p>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full py-2 rounded-lg font-bold text-yellow-primary bg-gradient-to-r from-green-800 to-green-600 hover:opacity-90 transition text-sm sm:text-base"
        >
          Đăng nhập
        </Button>

        {/* Divider */}
        <div className="flex items-center my-4 text-xs sm:text-sm">
          <div className="flex-grow h-px bg-gray-600" />
          <span className="px-2 text-gray-400">hoặc Đăng nhập với</span>
          <div className="flex-grow h-px bg-gray-600" />
        </div>

        {/* Google Button */}
        <Button
          type="button"
          className="w-full flex items-center justify-center gap-2 py-2 border border-yellow-primary rounded-lg text-yellow-primary hover:bg-green-800 hover:text-green-800 transition text-sm sm:text-base"
        >
          <FaGoogle /> Google
        </Button>
      </form>
    </motion.div>
  );
}
