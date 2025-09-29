"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import Header from "./Header";
import Footer from "./Footer";

export default function  LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      localStorage.clear();
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) return null;

  // Kiểm tra role
  const isAdmin = user?.role === "admin";
  const isStaff = user?.role === "staff";
  const isUser = user?.role === "user";
    const isSupplyPage = user?.role === "supply" && pathname.startsWith("/profile");
  // Check path để ẩn Header/Footer trong layout riêng
  const isUserPage = isUser && pathname.startsWith(`/${user.userName}`);

  return (
    <>
      {/* Nếu không phải trang user thì render Header */}
      {!isSupplyPage && <Header />}

      {children}

      {!isSupplyPage && <Footer/>}
    </>
  );
}
