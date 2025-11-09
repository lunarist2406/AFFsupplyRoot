import { FaBox, FaSignOutAlt, FaTachometerAlt, FaUsers, FaShieldAlt, FaSpellCheck } from "react-icons/fa"


export const roleMap: Record<number, string> = {
  1: "admin",
  2: "manager",
  3: "staff",
  4: "seller",
  5: "shopstaff",
  6: "customer",
}

export const roleAccessMap = [
  { path: "/admin", roles: [1] }, 
  { path: "/profile", roles: [4] },
]
export const redirectMap: Record<number, string> = {
        1: "/admin",
        2: "/manager",
        3: "/staff",
        4: "/",
        5: "/",
        6: "/",
};
export const roleMenus: Record<
  string,
  { label: string; href?: string; icon: React.ReactNode }[]
> = {
  6: [
    { label: "Đơn hàng", href: "/orders", icon: <FaBox className="text-yellow-secondary w-4 h-4" /> },
    { label: "Đăng xuất", href: "/", icon: <FaSignOutAlt className="text-yellow-secondary w-4 h-4" /> },
  ],
  1: [
    { label: "Dashboard", href: "/admin", icon: <FaTachometerAlt className="text-yellow-secondary w-4 h-4" /> },
    { label: "Quản lý người dùng", href: "/admin/users", icon: <FaUsers className="text-yellow-secondary w-4 h-4" /> },
    { label: "Quản lý phân quyền", href: "/admin/permissions", icon: <FaShieldAlt className="text-yellow-secondary w-4 h-4" /> },
    { label: "Quản lý người bán", href: "/admin/registerseller", icon: <FaSpellCheck className="text-yellow-secondary w-4 h-4" /> },
    {  label: "Đăng xuất",href: "/", icon: <FaSignOutAlt className="text-yellow-secondary w-4 h-4" /> },
  ],
  3: [
    { label: "Dashboard", href: "/staff", icon: <FaTachometerAlt className="text-yellow-secondary w-4 h-4" /> },
    { label: "Đăng xuất", href: "/", icon: <FaSignOutAlt className="text-yellow-secondary w-4 h-4" /> },
  ],
  2: [
    { label: "Dashboard", href: "/manager", icon: <FaTachometerAlt className="text-yellow-secondary w-4 h-4" /> },
    { label: "Đăng xuất", href: "/", icon: <FaSignOutAlt className="text-yellow-secondary w-4 h-4" /> },
  ],
  5: [
    { label: "Dashboard", href: "/shopstaff", icon: <FaTachometerAlt className="text-yellow-secondary w-4 h-4" /> },
    { label: "Đăng xuất", href: "/", icon: <FaSignOutAlt className="text-yellow-secondary w-4 h-4" /> },
  ],
}
