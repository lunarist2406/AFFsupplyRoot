 import {
  FaShoppingBag,
  FaChartLine,
  FaBox,
  FaTruck,
  FaVideo,
  FaNewspaper,
  FaHeadphones,
  FaShieldAlt,
  FaStore,
  FaUsers,
} from "react-icons/fa"
import luongthuc from '../../../../public/Lua.jpg'
import raucuqua from '../../../../public/raucuqua.jpg'
import thit from '../../../../public/meat.jpg'
import caycongnghiep from '../../../../public/caycongnghiep.jpg'
import duoclieu from '../../../../public/cayduoclieu.jpg'
import dacsanvungmien from '../../../../public/nongsanviet.webp'
export const services = [
    { icon: FaShoppingBag, label: "Sản Phẩm" },
    { icon: FaBox, label: "Nhà Cung Cấp" },
    { icon: FaNewspaper, label: "Tin tức" },
    { icon: FaVideo, label: "Livestream" },

  ]
 export const categories = [
    {
      id: 1,
      name: "Lương Thực",
      description: "Gạo tám xoan, lúa mì, ngô và các loại hạt dinh dưỡng cao",
      image: luongthuc,
      products: "120 sản phẩm",
    },
    {
      id: 2,
      name: "Rau Củ Quả",
      description: "Rau xanh tươi ngon, củ quả sạch và các loại rau gia vị thơm ngon",
      image: raucuqua,
      products: "450 sản phẩm",
    },
    {
      id: 3,
      name: "Thịt Tươi Sống",
      description: "Thịt tươi sống đảm bảo vệ sinh an toàn thực phẩm",
      image: thit,
      products: "180 sản phẩm",
    },
    {
      id: 4,
      name: "Cây Công nghiệp",
      description: "Cây công nghiệp như cà phê, cao su, điều và các loại cây khác",
      image: caycongnghiep,
      products: "280 sản phẩm",
    },
    {
      id: 5,
      name: "Dược liệu",
      description: "Các loại dược liệu quý hiếm và gia vị thảo dược tự nhiên",
      image: duoclieu,
      products: "320 sản phẩm",
    },
    {
      id: 6,
      name: "Đặc sản theo khu vực",
      description: "Những đặc sản nổi tiếng của từng vùng miền trên cả nước",
      image: dacsanvungmien,
      products: "220 sản phẩm",
    },
  ]
  export const supportServices = [
    {
      id: 1,
      icon: FaTruck,
      title: "Logistics nông nghiệp",
      description:
        "Dịch vụ vận chuyển chuyên biệt cho nông sản, đảm bảo tươi ngon từ vườn đến bàn ăn của người tiêu dùng.",
      features: ["Vận chuyển lạnh", "Giao hàng nhanh trong ngày", "Theo dõi đơn hàng thời gian thực"],
    },
    {
      id: 2,
      icon: FaShieldAlt,
      title: "Chứng nhận chất lượng",
      description: "Hệ thống chứng nhận và kiểm định chất lượng sản phẩm theo tiêu chuẩn quốc tế.",
      features: ["Chứng nhận VietGAP", "Chứng nhận hữu cơ", "Tư vấn quy trình sản xuất"],
    },
    {
      id: 3,
      icon: FaStore,
      title: "Quản lý cửa hàng",
      description: "Công cụ quản lý cửa hàng trực tuyến hiệu quả, giúp nông dân bán hàng dễ dàng.",
      features: ["Quản lý đơn hàng", "Phân tích doanh số", "Marketing sản phẩm"],
    },
    {
      id: 4,
      icon: FaUsers,
      title: "Kết nối cộng đồng",
      description: "Xây dựng mạng lưới kết nối giữa nông dân, nhà phân phối và người tiêu dùng.",
      features: ["Diễn đàn chia sẻ kinh nghiệm", "Sự kiện kết nối", "Đào tạo kỹ thuật nông nghiệp"],
    },
  ]
 export const products = [
    {
      id: 1,
      name: "Gạo Thơm",
      image: "/premium-rice-grains.jpg",
      price: 45000,
      originalPrice: 55000,
      rating: 4.9,
      sold: 1247,
      discount: 18,
    },
    {
      id: 2,
      name: "Rau Củ Tươi",
      image: "/fresh-mixed-vegetables-colorful.jpg",
      price: 35000,
      originalPrice: 45000,
      rating: 4.8,
      sold: 856,
      discount: 22,
    },
    {
      id: 3,
      name: "Trái Cây Tươi",
      image: "/fresh-tropical-fruits-mixed.jpg",
      price: 65000,
      originalPrice: 80000,
      rating: 4.9,
      sold: 634,
      discount: 19,
    },
    {
      id: 4,
      name: "Dưa Hấu",
      image: "/fresh-watermelon-sliced.jpg",
      price: 180000,
      originalPrice: 220000,
      rating: 5,
      sold: 423,
      discount: 18,
    },
        {
      id: 5,
      name: "Khô",
      image: "/fresh-watermelon-sliced.jpg",
      price: 180000,
      originalPrice: 220000,
      rating: 5,
      sold: 423,
      discount: 18,
    },
  ]