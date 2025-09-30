"use client"
import React, { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { FaUserCircle } from "react-icons/fa"
import { ChevronDown, ChevronUp } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import logo from "../../public/logo.png"
import SearchCustomize from "@/components/search-customize"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"
import useAuth from "@/hooks/useAuth"
import { roleMenus } from "@/variable/menuHeader"

export default function Header() {
  const [desktopOpen, setDesktopOpen] = useState(false)
  const { state, logout } = useAuth()
  const router = useRouter()

  // ✅ Destructure user từ state
  const { user } = state

  // ✅ Lấy menu dựa theo role
  const menus = user ? roleMenus[user.roleID] || [{ label: "Đăng xuất" }] : []

  // 👉 Gom logic click menu
  const handleMenuClick = (item: any) => {
    if (item.label === "Đăng xuất") {
      logout()
      router.push("/authentication")
    } else if (item.href) {
      router.push(item.href)
    }
  }

  // ✅ Render menu items cho desktop
  const renderMenuItems = () =>
    menus.map((item, idx) => (
      <DropdownMenuItem
        key={idx}
        onClick={() => handleMenuClick(item)}
        className="flex items-center gap-3 px-3 py-2 text-yellow-400 hover:bg-green-800 hover:text-yellow-300 cursor-pointer rounded-md transition-colors duration-300"
      >
        <span className="text-lg">{item.icon}</span>
        <span className="font-medium">{item.label}</span>
      </DropdownMenuItem>
    ))

  return (
    <header className="sticky top-0 z-30 w-full h-[5rem] bg-green-950 text-yellow-400 font-manuale lg:px-25 flex items-center shadow-md px-5 ">
      
      {/* Mobile */}
      <div className="grid grid-cols-[auto_1fr_auto] items-center w-full md:hidden gap-2">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
            <Image src={logo} alt="logo" width={40} height={40} className="rounded-md" />
            <span className="text-lg font-bold hidden sm:inline">AFF supplyRoot</span>
          </motion.div>
        </Link>

        <div className="w-full max-w-[16rem] justify-self-center">
          <SearchCustomize />
        </div>

        <div className="justify-self-end">
          {!user ? (
            <Button
              onClick={() => router.push("/authentication")}
              className="px-3 py-2 bg-green-primary text-yellow-primary rounded-lg shadow-md hover:bg-green-800 hover:text-yellow-300 transition-colors duration-300 font-bold text-sm"
            >
              Đăng nhập
            </Button>
          ) : (
            <Sheet>
              <SheetTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 cursor-pointer hover:text-green-400 transition">
                  <FaUserCircle className="w-6 h-6" />
                </motion.div>
              </SheetTrigger>
              <SheetContent side="right" className="bg-green-950 text-yellow-400 w-[260px] p-0">
                <SheetHeader className="border-b border-yellow-700/30 px-6 pt-6 pb-3">
                  <SheetTitle className="text-yellow-300 text-lg font-bold">Tài khoản</SheetTitle>
                </SheetHeader>
                <div className="mt-4 flex flex-col gap-1 px-4">
                  {menus.map((item, idx) => (
                    <Button
                      key={idx}
                      variant="ghost"
                      className="flex items-center gap-3 justify-start text-yellow-400 hover:bg-green-800 hover:text-yellow-300 rounded-lg px-3 py-2 transition-colors duration-200 text-base font-medium"
                      onClick={() => handleMenuClick(item)}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex items-center justify-between w-full">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
            <Image src={logo} alt="logo" width={40} height={40} className="rounded-md" />
            <span className="text-lg font-bold hidden sm:inline">AFF supplyRoot</span>
          </motion.div>
        </Link>

        <div className="flex items-center gap-6">
          <div className="w-[300px]">
            <SearchCustomize />
          </div>

          {!user ? (
            <Button
              onClick={() => router.push("/authentication")}
              className="px-4 py-3 bg-green-primary text-yellow-primary rounded-lg shadow-md hover:bg-green-800 hover:text-yellow-300 transition-colors duration-300 font-bold"
            >
              Đăng nhập
            </Button>
          ) : (
            <DropdownMenu open={desktopOpen} onOpenChange={setDesktopOpen} modal={false}>
              <DropdownMenuTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 cursor-pointer hover:text-green-400 transition">
                  <FaUserCircle className="w-6 h-6" />
                  {desktopOpen ? <ChevronUp className="w-4 h-4 text-yellow-primary" /> : <ChevronDown className="w-4 h-4 text-yellow-primary" />}
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={20}
                className="w-60 bg-green-950 text-yellow-400 rounded-xl shadow-2xl border border-yellow-700/40"
              >
                <DropdownMenuLabel className="font-bold text-yellow-300 text-sm px-3 py-2">
                  Tài khoản
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-yellow-700/30" />
                {renderMenuItems()}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}
