"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";
import Cookies from "js-cookie"
import { redirectMap } from "@/variable/menuHeader";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: Yup.string().min(6, "Mật khẩu ít nhất 6 ký tự").required("Mật khẩu là bắt buộc"),
});

export default function SignIn({
  setForm,
}: {
  setForm: React.Dispatch<React.SetStateAction<"signin" | "signup" | "verify" | "reset">>;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { state, setField, login } = useAuth();

  useEffect(() => {
    if (state.user) {
      router.push("/");
    }
  }, [state.user, router]);

const handleSubmit = async (values: { email: string; password: string }) => {
  try {
    const res = await login(values.email, values.password);
    console.log("login response:", res);

    if (res?.data?.user && res?.data?.backendToken) {
      const { backendToken, user } = res.data;

      // ✅ Set cookies để middleware đọc được
      Cookies.set("backendToken", backendToken.accessToken, {
        expires: 1,
        path: "/",
      });

      Cookies.set("role", user.roleID.toString(), {
        expires: 1,
        path: "/",
      });

      // ✅ Cập nhật context
      setField("user", user);
      setField("token", backendToken.accessToken);

      toast.success("Đăng nhập thành công ");
      const target = redirectMap[user.roleID] || "/";
      setTimeout(() => router.push(target), 1000);
    } else {
      toast.error(res?.data?.message || "Không lấy được thông tin người dùng!");
    }
  } catch (error: any) {
    toast.error(error?.message || state.error || "Đăng nhập thất bại 😢");
    console.error("Login error:", error);
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
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-secondary mt-2">
          AFF supplyRoot
        </h2>
        <p className="text-xs sm:text-sm md:text-sm text-yellow-primary">
          Đăng Nhập Tài Khoản Của Bạn Để Giao Dịch
        </p>
      </div>

      {/* Formik Form */}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignInSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {/* Email */}
            <div>
              <Field
                as={Input}
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-2 rounded-lg border border-yellow-primary bg-transparent text-yellow-primary placeholder-green-secondary focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            {/* Password */}
            <div className="relative">
              <Field
                as={Input}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Mật khẩu"
                className="w-full px-4 py-2 rounded-lg border border-yellow-primary bg-transparent text-yellow-primary placeholder-green-secondary focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-yellow-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" name="remember" className="accent-green-500" />
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
              disabled={isSubmitting || state.loading}
            >
              {state.loading ? "Đang đăng nhập..." : "Đăng nhập"}
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

            {/* Error toast sẽ hiển thị tự động qua sonner */}
          </Form>
        )}
      </Formik>
    </motion.div>
  );
}
