import { FaBox, FaSignOutAlt, FaTachometerAlt, FaUsers, FaWarehouse,  FaStore, FaShieldAlt, FaSpellCheck } from "react-icons/fa"


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
  4 : [
  { label: "Cửa hàng", href: "/profile", icon: <FaStore className="text-yellow-secondary w-4 h-4" /> },

  // { label: "Livestream", href: "/livestream", icon: <FaTv className="text-yellow-secondary w-4 h-4" /> },
  // { label: "Đơn hàng", href: "/orders", icon: <FaShoppingCart className="text-yellow-secondary w-4 h-4" /> },
    // { label: "Thanh toán", href: "/payments", icon: <FaCreditCard className="text-yellow-secondary w-4 h-4" /> },
  // { label: "Tin nhắn", href: "/messages", icon: <FaComments className="text-yellow-secondary w-4 h-4" /> },

  // { label: "Dashboard", href: "/dashboard", icon: <FaChartBar className="text-yellow-secondary w-4 h-4" /> },
  { label: "Quản lý kho", href: "/inventory", icon: <FaWarehouse className="text-yellow-secondary w-4 h-4" /> },
  // { label: "Doanh thu", href: "/revenue", icon: <FaDollarSign className="text-yellow-secondary w-4 h-4" /> },
  // { label: "Thị trường", href: "/market", icon: <FaChartLine className="text-yellow-secondary w-4 h-4" /> },
  // { label: "Vận chuyển", href: "/shipping", icon: <FaTruck className="text-yellow-secondary w-4 h-4" /> },
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
    {  label: "Đăng xuất",href: "/",  icon: <FaSignOutAlt className="text-yellow-secondary w-4 h-4" /> },
  ],
}