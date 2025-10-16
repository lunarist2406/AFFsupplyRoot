"use client"

// import { usePathname } from "next/navigation"
import Header from "@/layout/Header"
import Footer from "@/layout/Footer"

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  // const pathname = usePathname()
  
  // Luôn hiển thị header để người dùng có thể truy cập giỏ hàng
  // const shouldHideHeaderFooter = 
  //   pathname === '/products' || 
  //   pathname === '/products/' ||
  //   (pathname.startsWith('/products/') && pathname.split('/').length <= 3)
  
  return (
    <>
      <Header />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  )
}


