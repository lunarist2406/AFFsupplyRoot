import { FaUser, FaBox, FaSignOutAlt, FaTachometerAlt, FaUsers } from "react-icons/fa"

export const roleMenus: Record<
  string,
  { label: string; href?: string; icon: React.ReactNode }[]
> = {
  customer: [
    { label: "Profile", href: "/profile", icon: <FaUser className="w-4 h-4" /> },
    { label: "Orders", href: "/orders", icon: <FaBox className="w-4 h-4" /> },
    { label: "Đăng xuất", icon: <FaSignOutAlt className="w-4 h-4" /> },
  ],
  supply: [
    { label: "Profile", href: "/profile", icon: <FaUser className="w-4 h-4" /> },
    { label: "Orders", href: "/orders", icon: <FaBox className="w-4 h-4" /> },
    { label: "Đăng xuất", icon: <FaSignOutAlt className="w-4 h-4" /> },
  ],
  admin: [
    { label: "Dashboard", href: "/admin", icon: <FaTachometerAlt className="w-4 h-4" /> },
    { label: "Quản lý người dùng", href: "/admin/users", icon: <FaUsers className="w-4 h-4" /> },
    { label: "Đăng xuất", icon: <FaSignOutAlt className="w-4 h-4" /> },
  ],
  staff: [
    { label: "Dashboard", href: "/staff", icon: <FaTachometerAlt className="w-4 h-4" /> },
    { label: "Đăng xuất", icon: <FaSignOutAlt className="w-4 h-4" /> },
  ],
}
