"use client";
import { useState, useEffect } from "react";

export default function useResetEmail() {
  const [resetEmail, setResetEmailState] = useState<string>("");

  // Lấy từ localStorage khi load lại
  useEffect(() => {
    const saved = localStorage.getItem("resetEmail");
    if (saved) setResetEmailState(saved);
  }, []);

  // Lưu vào localStorage mỗi khi thay đổi
  const setResetEmail = (email: string) => {
    setResetEmailState(email);
    localStorage.setItem("resetEmail", email);
  };

  return { resetEmail, setResetEmail };
}
