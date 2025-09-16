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
import { ChevronDown, ChevronUp } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import logo from "../../public/logo.jpg"
import SearchCustomize from "@/components/search-customize"

export default function Header() {
  const [open, setOpen] = React.useState(false)

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full h-[5rem] bg-green-950 text-yellow-400 font-manuale px-10 flex items-center justify-between shadow-md"
    >
      {/* Logo + Brand */}
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
        <span className="text-lg font-bold">AFF supplyRoot</span>
      </motion.div>

      {/* Search + Account */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="w-[300px]">
          <SearchCustomize />
        </div>

        {/* Account Dropdown */}
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 cursor-pointer  hover:text-green-400 transition"
            >
              <FaUserCircle className="w-6 h-6 " />
              {open ? (
                <ChevronUp className="w-[1rem] h-[1rem] text-yellow-primary" />
              ) : (
                <ChevronDown className="w-[1rem] h-[1rem] text-yellow-primary" />
              )}
            </motion.div>
          </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-green-950 text-yellow-400 rounded-md shadow-lg "
            side="bottom" 
            align="end"
            sideOffset={20}     // đẩy xuống 8px 
            alignOffset={-12} // dịch sang trái 12px 
            >           
            <DropdownMenuLabel className="font-bold">
              Tài khoản
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-yellow-primary data-[highlighted]:bg-green-800 data-[highlighted]:text-yellow-300">
                <FaShoppingBag className=" w-[1rem] h-[1rem] text-yellow-primary" />
                <span>Giỏ hàng</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-yellow-400 data-[highlighted]:bg-green-800 data-[highlighted]:text-yellow-300">
                <FaBell className="w-[1rem] h-[1rem] text-yellow-primary" />
                <span>Thông báo</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-yellow-400 data-[highlighted]:bg-green-800 data-[highlighted]:text-yellow-300">
                <FaRegCommentDots className="w-[1rem] h-[1rem] text-yellow-primary" />
                <span>Tin nhắn</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-yellow-400 data-[highlighted]:bg-green-800 data-[highlighted]:text-yellow-300">
                <FaCreditCard className="w-[1rem] h-[1rem] text-yellow-primary" />
                <span>Thanh toán</span>
                </DropdownMenuItem>


            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-yellow-400 data-[highlighted]:bg-green-800 data-[highlighted]:text-yellow-300">
              <span>Đăng xuất</span>    
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  )
}
