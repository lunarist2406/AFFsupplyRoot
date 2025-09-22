"use client"
import React from "react"
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
import logo from "../../public/logo.png"
import SearchCustomize from "@/components/search-customize"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const getUser = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("user")
    return saved ? JSON.parse(saved) : null
  }
  return null
}

export default function Header() {
  const [open, setOpen] = React.useState(false)
  const [user, setUser] = React.useState<any>(null)
  const router = useRouter()

  React.useEffect(() => {
    setUser(getUser())
  }, [])

  return (
    <header className="w-full h-[5rem] bg-green-950 text-yellow-400 font-manuale lg:px-25 flex items-center shadow-md px-3">
      {/* Mobile grid */}
      <div className="grid grid-cols-[auto_1fr_auto] items-center w-full md:hidden gap-2">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 cursor-pointer">
          <Image src={logo} alt="logo" width={40} height={40} className="rounded-md" />
          <span className="text-lg font-bold hidden sm:inline">AFF supplyRoot</span>
        </motion.div>

        {/* Search */}
        <div className="w-full max-w-[12rem] justify-self-center">
          <SearchCustomize />
        </div>

        {/* Login/User */}
        <div className="justify-self-end">
          {!user ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                onClick={() => router.push("/authentication")}
                className="px-3 py-2 bg-green-primary text-yellow-primary rounded-lg shadow-md hover:bg-green-800 hover:text-yellow-300 transition-colors duration-300 font-bold text-sm"
              >
                Đăng nhập
              </Button>
            </motion.div>
          ) : (
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
              <DropdownMenuContent className="w-56 bg-green-950 text-yellow-400 rounded-md shadow-lg">
                <DropdownMenuLabel className="font-bold">Tài khoản</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex items-center justify-between w-full">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 cursor-pointer">
          <Image src={logo} alt="logo" width={40} height={40} className="rounded-md" />
          <span className="text-lg font-bold hidden sm:inline">AFF supplyRoot</span>
        </motion.div>

        <div className="flex items-center gap-6">
          <div className="w-[300px]">
            <SearchCustomize />
          </div>

          {!user ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                onClick={() => router.push("/authentication")}
                className="px-4 py-3 bg-green-primary text-yellow-primary rounded-lg shadow-md hover:bg-green-800 hover:text-yellow-300 transition-colors duration-300 font-bold"
              >
                Đăng nhập
              </Button>
            </motion.div>
          ) : (
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
              <DropdownMenuContent className="w-56 bg-green-950 text-yellow-400 rounded-md shadow-lg">
                <DropdownMenuLabel className="font-bold">Tài khoản</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}
