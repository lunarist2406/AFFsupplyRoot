"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function AuthenToast() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const message = searchParams.get("message");
    if (message === "login_required") {
      toast.error("Vui lòng đăng nhập để tiếp tục.");
    }
  }, [searchParams]);

  return null; 
}
