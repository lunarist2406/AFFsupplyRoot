"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";

// Hàm tính strength password
// Hàm tính strength password chuẩn quốc tế
// const getPasswordStrength = (password: string) => {
//   let strength = 0;

//   if (password.length >= 6) strength++; // có độ dài
//   if (/[A-Z]/.test(password)) strength++; // có chữ hoa
//   if (/[0-9]/.test(password)) strength++; // có số
//   if (/[^A-Za-z0-9]/.test(password)) strength++; // có ký tự đặc biệt
//   if (password.length >= 10) strength++; // đủ dài và đa dạng

//   if (strength <= 1) return { level: "Yếu", color: "bg-red-500", score: 20 };
//   if (strength === 2) return { level: "Trung bình", color: "bg-yellow-500", score: 40 };
//   if (strength === 3) return { level: "Khá", color: "bg-blue-500", score: 60 };
//   if (strength === 4) return { level: "Mạnh", color: "bg-green-500", score: 80 };
//   return { level: "Rất mạnh", color: "bg-emerald-600", score: 100 };
// };

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { signup } = useAuth();

  const refs = {
    fullName: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    confirm: useRef<HTMLInputElement>(null),
    agree: useRef<HTMLInputElement>(null),
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirm: "",
      agree: false,
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(8, "Họ và tên phải có ít nhất 8 ký tự")
        .required("Vui lòng nhập họ và tên"),

        email: Yup.string()
          .required("Vui lòng nhập email")
          .test("is-valid-email", (value, ctx) => {
            if (!value) return ctx.createError({ message: "Vui lòng nhập email" });

            if (!value.includes("@")) {
              return ctx.createError({ message: "Email phải chứa @" });
            }

            const parts = value.split("@");
            if (parts.length !== 2 || !parts[0]) {
              return ctx.createError({ message: "Email thiếu phần tên trước @" });
            }

            if (!parts[1].includes(".")) {
              return ctx.createError({ message: "Email thiếu .com (vd: gmail.com)" });
            }

            const domainParts = parts[1].split(".");
            if (domainParts.some((p) => p.trim() === "")) {
              return ctx.createError({ message: "Email thiếu tên miền hợp lệ" });
            }

            return true;
          }),


      password: Yup.string()
        .min(8, "Mật khẩu phải ít nhất 8 ký tự")
        .required("Vui lòng nhập mật khẩu"),

      confirm: Yup.string()
        .oneOf([Yup.ref("password")], "Mật khẩu xác nhận không khớp")
        .required("Vui lòng nhập xác nhận mật khẩu"),

      agree: Yup.boolean().oneOf([true], "Bạn phải đồng ý với điều khoản"),
    }),

    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const res = await signup({
          name: values.fullName,
          email: values.email,
          password: values.password,
        });

        if (res?.success) {
          toast.success(res.data);
          resetForm();
        } else {
          console.log(res)
          toast.error(res?.message || "Đăng ký thất bại. Vui lòng thử lại!");
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
       catch (error: any) {
        toast.error(error?.message || "Có lỗi xảy ra khi đăng ký!");
      } finally {
        setSubmitting(false);
      }
    },
  });

  // toast lỗi khi submit
  const handleValidateError = () => {
    if (Object.keys(formik.errors).length > 0) {
      const order: (keyof typeof refs)[] = ["fullName", "email", "password", "confirm", "agree"];
      for (const field of order) {
        if (formik.errors[field]) {
          toast.error(formik.errors[field] as string);
          refs[field]?.current?.focus();
          break;
        }
      }
      return true;
    }
    return false;
  };

  // strength cho mật khẩu
  // const strength = getPasswordStrength(formik.values.password);
  // const strengthText = ["Rất yếu", "Yếu", "Trung bình", "Khá mạnh", "Mạnh", "Rất mạnh"];
  // const strengthColor = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"];

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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!handleValidateError()) {
            formik.handleSubmit();
          }
        }}
        className="space-y-4"
      >
        {/* Full Name */}
        <Input
          ref={refs.fullName}
          type="text"
          name="fullName"
          placeholder="Họ và tên"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {/* Email */}
        <Input
          ref={refs.email}
          type="text"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {/* Password */}
        <div className="relative">
          <Input
            ref={refs.password}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Mật khẩu"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <button
            type="button"
            className="absolute right-3 top-2.5 text-yellow-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* {formik.values.password && (
          <div className="w-full mt-1">
            <div className="h-2 rounded bg-gray-700 overflow-hidden">
              <div
                className={`h-2 ${getPasswordStrength(formik.values.password).color}`}
                style={{ width: `${getPasswordStrength(formik.values.password).score}%` }}
              />
            </div>
            <p className="text-xs mt-1 text-gray-300">
              {getPasswordStrength(formik.values.password).level}
            </p>
          </div>
        )} */}


        {/* Confirm Password */}
        <div className="relative">
          <Input
            ref={refs.confirm}
            type={showConfirm ? "text" : "password"}
            name="confirm"
            placeholder="Xác nhận"
            value={formik.values.confirm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
          <input
            ref={refs.agree}
            type="checkbox"
            name="agree"
            checked={formik.values.agree}
            onChange={formik.handleChange}
            className="accent-green-500"
          />
          <span className="text-gray-300 text-[0.7rem]">
            Tôi đồng ý với{" "}
            <Link href="/terms" className="text-yellow-400 hover:underline">
              Điều khoản sử dụng
            </Link>{" "}
            và{" "}
            <Link href="/privacy" className="text-yellow-400 hover:underline">
              Chính sách bảo mật
            </Link>
          </span>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full py-2 rounded-lg font-bold text-yellow-primary bg-gradient-to-r from-green-800 to-green-600 hover:opacity-90 transition"
        >
          {formik.isSubmitting ? "Đang xử lý..." : "Đăng ký"}
        </Button>
      </form>
    </motion.div>
  );
}
