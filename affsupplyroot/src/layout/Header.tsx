"use client"
import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { FaUserCircle } from "react-icons/fa"
import { ChevronDown, ChevronUp } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import logo from "../../public/logo.png"
import SearchCustomize from "@/components/search-customize"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

// Giả sử lấy user từ localStorage hoặc context
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
    <header className="w-full h-[5rem] bg-green-950 text-yellow-400 font-manuale lg:px-25 flex items-center justify-between shadow-md">
      {/* Logo */}
      <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 cursor-pointer">
        <Image src={logo} alt="logo" width={40} height={40} className="rounded-md" />
        <span className="text-lg font-bold hidden sm:inline">AFF supplyRoot</span>
      </motion.div>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-6">
        <div className="w-[300px]">
          <SearchCustomize />
        </div>

        {!user ? (
          <Button
            onClick={() => router.push("/authentication")}
            className="px-4 py-2 bg-yellow-secondary text-green-secondary rounded-lg hover:bg-white transition font-bold"
          >
            Đăng nhập
          </Button>
        ) : (
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <motion.div className="flex items-center gap-2 cursor-pointer hover:text-green-400 transition">
                <FaUserCircle className="w-6 h-6" />
                {open ? <ChevronUp className="w-4 h-4 text-yellow-primary" /> : <ChevronDown className="w-4 h-4 text-yellow-primary" />}
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
    </header>
  )
}
