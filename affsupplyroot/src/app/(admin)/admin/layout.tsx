import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import "../../globals.css"


export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Trang quản trị hệ thống",
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  )
}
