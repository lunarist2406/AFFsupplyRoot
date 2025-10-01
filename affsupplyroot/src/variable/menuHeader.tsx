import { FaUser, FaBox, FaSignOutAlt, FaTachometerAlt, FaUsers, FaChartBar, FaComments, FaWarehouse, FaShoppingCart, FaCreditCard, FaDollarSign, FaStore, FaChartLine, FaTruck, FaTv, FaShieldAlt } from "react-icons/fa"

export const roleMenus: Record<
  string,
  { label: string; href?: string; icon: React.ReactNode }[]
> = {
  customer: [
    { label: "Profile", href: "/profile", icon: <FaUser className="text-yellow-secondary w-4 h-4" /> },
    { label: "Orders", href: "/orders", icon: <FaBox className="text-yellow-secondary w-4 h-4" /> },
    { label: "Đăng xuất",href: "/", icon: <FaSignOutAlt className="text-yellow-secondary w-4 h-4" /> },
  ],
supply : [
  { label: "Cửa hàng", href: "/profile", icon: <FaStore className="text-yellow-secondary w-4 h-4" /> },

  { label: "Livestream", href: "/livestream", icon: <FaTv className="text-yellow-secondary w-4 h-4" /> },
  { label: "Đơn hàng", href: "/orders", icon: <FaShoppingCart className="text-yellow-secondary w-4 h-4" /> },
  { label: "Thanh toán", href: "/payments", icon: <FaCreditCard className="text-yellow-secondary w-4 h-4" /> },
  { label: "Tin nhắn", href: "/messages", icon: <FaComments className="text-yellow-secondary w-4 h-4" /> },

  { label: "Dashboard", href: "/dashboard", icon: <FaChartBar className="text-yellow-secondary w-4 h-4" /> },
  { label: "Quản lý kho", href: "/warehouse", icon: <FaWarehouse className="text-yellow-secondary w-4 h-4" /> },
  { label: "Doanh thu", href: "/revenue", icon: <FaDollarSign className="text-yellow-secondary w-4 h-4" /> },
  { label: "Thị trường", href: "/market", icon: <FaChartLine className="text-yellow-secondary w-4 h-4" /> },
  { label: "Vận chuyển", href: "/shipping", icon: <FaTruck className="text-yellow-secondary w-4 h-4" /> },
  { label: "Đăng xuất", href: "/", icon: <FaSignOutAlt className="text-yellow-secondary w-4 h-4" /> },
],
  admin: [
    { label: "Dashboard", href: "/admin", icon: <FaTachometerAlt className="text-yellow-secondary w-4 h-4" /> },
    { label: "Quản lý người dùng", href: "/admin/users", icon: <FaUsers className="text-yellow-secondary w-4 h-4" /> },
    { label: "Quản lý phân quyền", href: "/admin/permissions", icon: <FaShieldAlt className="text-yellow-secondary w-4 h-4" /> },
    {  label: "Đăng xuất",href: "/", icon: <FaSignOutAlt className="text-yellow-secondary w-4 h-4" /> },
  ],
  staff: [
    { label: "Dashboard", href: "/staff", icon: <FaTachometerAlt className="text-yellow-secondary w-4 h-4" /> },
    {  label: "Đăng xuất",href: "/",  icon: <FaSignOutAlt className="text-yellow-secondary w-4 h-4" /> },
  ],
}
