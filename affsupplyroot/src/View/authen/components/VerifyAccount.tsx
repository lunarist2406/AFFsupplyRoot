"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { FaArrowLeft, FaRedoAlt } from "react-icons/fa";

export default function VerifyAccount() {
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [target, setTarget] = useState("");
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOTPSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOTPSent, timer]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isOTPSent) {
      const formData = new FormData(e.currentTarget);
      const method = formData.get("method");
      const value = formData.get("email") as string;

      console.log("Send OTP to:", { method, value });

      setTarget(value);
      setIsOTPSent(true);
      setTimer(10); // reset timer
    } else {
      console.log("Verify OTP:", otp);
      // TODO: API verify OTP
    }
  };

  const handleBack = () => {
    setIsOTPSent(false);
    setOtp("");
    setTimer(0);
  };

  const handleResend = () => {
    console.log("Resend OTP to:", target);
    setTimer(10);
    // TODO: API gửi lại OTP
  };

  return (
    <motion.div
      className="w-full h-[30rem] max-w-md mx-auto p-6 rounded-2xl shadow-2xl text-yellow-primary font-manuale bg-black/20 relative"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Back button */}
      <AnimatePresence>
        {isOTPSent && (
          <motion.button
            key="back"
            type="button"
            onClick={handleBack}
            className="absolute top-4 left-4 text-yellow-primary hover:text-green-400 transition"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FaArrowLeft size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Logo + Title */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Image
          src="/logo.png"
          alt="logo"
          width={48}
          height={48}
          className="mx-auto w-12 h-12"
        />
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-green-500 mt-2">
          AFF supplyRoot
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-yellow-primary">
          {!isOTPSent
            ? "Xác minh tài khoản để thiết lập lại mật khẩu"
            : `Mã xác nhận đã được gửi đến ${target}`}
        </p>
      </motion.div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <AnimatePresence mode="wait">
          {!isOTPSent ? (
            <motion.div
              key="email-phone"
              className="border border-yellow-primary rounded-lg p-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-xs sm:text-sm text-yellow-primary mb-4">
                Nhập email hoặc số điện thoại của bạn để nhận mã OTP
              </p>

              <div className="flex items-center gap-4 mb-3 text-sm sm:text-base">
                <label className="flex items-center gap-2">
                  <input type="radio" name="method" value="email" defaultChecked />
                  Email
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="method" value="phone" />
                  Số điện thoại
                </label>
              </div>

              <Input
                type="text"
                name="email"
                placeholder="example@email.com / 0123456789"
                required
                className="w-full px-4 py-2 rounded-lg border border-yellow-primary bg-transparent text-yellow-primary placeholder-green-secondary focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              />
            </motion.div>
          ) : (
            <motion.div
              key="otp"
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
            >
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(val) => setOtp(val)}
                containerClassName="justify-center"
              >
                <InputOTPGroup>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              <p className="text-xs sm:text-sm text-yellow-secondary">
                Vui lòng nhập mã OTP gồm 6 số
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-3"
        >
          <Button
            type="submit"
            disabled={isOTPSent && timer <= 0}
            className="w-full py-2 rounded-lg font-bold text-yellow-primary bg-gradient-to-r from-green-800 to-green-600 hover:opacity-90 transition text-sm sm:text-base"
          >
            {!isOTPSent ? "Gửi mã OTP" : "Xác minh OTP"}
          </Button>

          {/* Timer / Resend dưới button */}
          {isOTPSent && (
            <>
              {timer > 0 ? (
                <p className="text-xs text-yellow-primary">
                  Mã sẽ hết hạn sau <span className="font-bold">{timer}s</span>
                </p>
              ) : (
                    <Button
                    type="button"
                    variant="link"   // hoặc thử "link"
                    onClick={handleResend}
                    className="flex items-center gap-2 text-yellow-primary"
                    >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                        repeat: Infinity,
                        duration: 1.2,
                        ease: "linear",
                        }}
                    >
                        <FaRedoAlt size={16} />
                    </motion.div>
                    <span>Gửi lại OTP</span>
                    </Button>

              )}
            </>
          )}
        </motion.div>
      </form>
    </motion.div>
  );
}
