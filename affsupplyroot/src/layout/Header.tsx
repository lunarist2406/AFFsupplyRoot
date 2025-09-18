"use client"
import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  FaShoppingBag,
  FaBell,
  FaRegCommentDots,
  FaCreditCard,
  FaUserCircle,
} from "react-icons/fa"
import { ChevronDown, ChevronUp, Menu } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import logo from "../../public/logo.png"
import SearchCustomize from "@/components/search-customize"

export default function Header() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      {/* HEADER */}
  <header className="w-full h-[5rem] bg-green-950 text-yellow-400 font-manuale px-10 flex items-center justify-between shadow-md">

      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-2 cursor-pointer"
      >
        <Image
          src={logo}
          alt="logo"
          width={40}
          height={40}
          className="rounded-md"
        />
        <span className="text-lg font-bold hidden sm:inline">
          AFF supplyRoot
        </span>
      </motion.div>

    {/* Search Mobile (chiếm giữa) */}
    <div className="flex-1 px-3 md:hidden">
      <SearchCustomize />
    </div>

    {/* Desktop: search + account */}
    <div className="hidden md:flex items-center gap-6">
      <div className="w-[300px]">
        <SearchCustomize />
      </div>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 cursor-pointer hover:text-green-400 transition"
          >
            <FaUserCircle className="w-6 h-6" />
            {open ? (
              <ChevronUp className="w-4 h-4 text-yellow-primary" />
            ) : (
              <ChevronDown className="w-4 h-4 text-yellow-primary" />
            )}
          </motion.div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 bg-green-950 text-yellow-400 rounded-md shadow-lg"
          side="bottom"
          align="end"
          sideOffset={20}
          alignOffset={-12}
        >
          <DropdownMenuLabel className="font-bold">Tài khoản</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-yellow-primary data-[highlighted]:bg-green-800 data-[highlighted]:text-yellow-300">
            <FaShoppingBag className="w-4 h-4 text-yellow-primary" />
            <span>Giỏ hàng</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-yellow-400 data-[highlighted]:bg-green-800 data-[highlighted]:text-yellow-300">
            <FaBell className="w-4 h-4 text-yellow-primary" />
            <span>Thông báo</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-yellow-400 data-[highlighted]:bg-green-800 data-[highlighted]:text-yellow-300">
            <FaRegCommentDots className="w-4 h-4 text-yellow-primary" />
            <span>Tin nhắn</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-yellow-400 data-[highlighted]:bg-green-800 data-[highlighted]:text-yellow-300">
            <FaCreditCard className="w-4 h-4 text-yellow-primary" />
            <span>Thanh toán</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer text-yellow-400 data-[highlighted]:bg-green-800 data-[highlighted]:text-yellow-300">
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

        {/* Mobile: menu icon */}
      <div className="flex md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button className="text-yellow-400 hover:text-green-400">
              <Menu className="w-7 h-7" />
            </button>
          </SheetTrigger>

          <SheetContent side="right" className="bg-green-950 text-yellow-400 p-0">
            {/* Header */}
            <SheetHeader className="p-4 border-b border-green-800">
              <SheetTitle className="text-yellow-300 text-lg font-semibold">
                Menu
              </SheetTitle>
            </SheetHeader>

            {/* User info */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-green-800">
              <FaUserCircle className="w-10 h-10 text-yellow-400" />
              <div className="flex flex-col">
                <span className="font-bold text-yellow-300">Xin chào, Mỹ</span>
                <span className="text-sm text-yellow-500">Người dùng</span>
              </div>
            </div>

            {/* Menu items */}
            <div className="flex flex-col gap-4 p-4">
              <button className="flex items-center gap-3 hover:text-yellow-300 transition">
                <FaShoppingBag className="w-5 h-5" /> Giỏ hàng
              </button>
              <button className="flex items-center gap-3 hover:text-yellow-300 transition">
                <FaBell className="w-5 h-5" /> Thông báo
              </button>
              <button className="flex items-center gap-3 hover:text-yellow-300 transition">
                <FaRegCommentDots className="w-5 h-5" /> Tin nhắn
              </button>
              <button className="flex items-center gap-3 hover:text-yellow-300 transition">
                <FaCreditCard className="w-5 h-5" /> Thanh toán
              </button>
              <button className="flex items-center gap-3 text-red-400 hover:text-red-500 transition mt-2">
                Đăng xuất
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

  </header>


    </>
  )
}
