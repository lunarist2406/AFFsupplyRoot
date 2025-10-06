"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useRequireAuth() {
  const router = useRouter();

  useEffect(() => {
    const authUser = localStorage.getItem("authUser");
    if (!authUser) {
      router.replace("/authentication");
    }
  }, [router]);
}
