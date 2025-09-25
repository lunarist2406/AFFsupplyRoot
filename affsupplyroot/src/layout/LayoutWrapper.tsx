"use client";

import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useAuth();
  useEffect(() => {
    if (!isLoading && !user) {
      localStorage.clear();
      router.push("/");
    }
  }, [user, isLoading, router]);
  // Check path, ví dụ: nếu đường dẫn bắt đầu bằng "/user"
  if (isLoading) return null;
  const isUserPage = user && pathname.startsWith(`/${user.userName}`);

  return (
    <>
      {/* Nếu KHÔNG phải trang user thì render Header */}
      {!isUserPage && <Header />}

      {/* Nội dung trang */}
      {children}

      {/* Nếu KHÔNG phải trang user thì render Footer */}
      {!isUserPage && <Footer />}
    </>
  );
}