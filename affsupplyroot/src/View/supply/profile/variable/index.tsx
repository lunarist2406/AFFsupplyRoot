import { FaTrophy, FaStar, FaTruck, FaHeart } from "react-icons/fa"

const storeInfo = {
  name: "Nông Sản Sạch Việt",
  slogan: "Từ nông trại đến bàn ăn - Tươi ngon mỗi ngày",
  avatar: "/placeholder.svg?height=120&width=120",
  coverImage: "/images/farm-background.jpg",
  description:
    "Chúng tôi là nông trại gia đình với hơn 20 năm kinh nghiệm trồng trọt và chăn nuôi theo phương pháp hữu cơ. Cam kết mang đến những sản phẩm nông nghiệp sạch, an toàn và chất lượng cao nhất cho người tiêu dùng.",
  address: {
    street: "Ấp Tân Thành, Xã Tân Phú Đông",
    district: "Huyện Tiền Giang",
    province: "Tỉnh Tiền Giang",
    full: "Ấp Tân Thành, Xã Tân Phú Đông, Huyện Tiền Giang, Tỉnh Tiền Giang",
  },
  contact: {
    phone: "0901234567",
    email: "info@nongsansachviet.com",
    website: "www.nongsansachviet.com",
    facebook: "facebook.com/nongsansachviet",
    zalo: "0901234567",
  },
  stats: {
    followers: 45200,
    totalProducts: 156,
    totalOrders: 12470,
    rating: 4.9,
    reviewCount: 2847,
    joinDate: "2020-03-15",
    responseRate: 98,
    responseTime: "2 giờ",
  },
  certifications: [
    {
      name: "Chứng nhận VietGAP",
      issuer: "Bộ Nông nghiệp và Phát triển Nông thôn",
      validUntil: "2025-12-31",
      image: "https://chungnhanquocgia.com/wp-content/uploads/2023/11/gioi-thieu-vietgap.jpg",
    },
    {
      name: "Chứng nhận Organic",
      issuer: "Control Union Vietnam",
      validUntil: "2025-06-30",
      image: "https://tse2.mm.bing.net/th/id/OIP.4j_KlmsuRNz8xNzcNoFu4gHaKd?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      name: "ATTP Cấp A",
      issuer: "Sở Y tế Tiền Giang",
      validUntil: "2025-03-15",
      image: "https://tse1.mm.bing.net/th/id/OIP.DSeJ4bdNcdMyh5DW-AVEPgHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
  ],
  policies: {
    shipping: "Miễn phí giao hàng đơn từ 300k trong nội thành",
    return: "Đổi trả trong 24h nếu sản phẩm không đạt chất lượng",
    warranty: "Cam kết hoàn tiền 100% nếu không hài lòng",
    payment: "Hỗ trợ COD, chuyển khoản, ví điện tử",
  },
}

const farmImages = [
  { id: 1, url: "https://alltop.vn/backend/media/images/posts/695/Gao_ST25_Vinaseed-132208.jpg", title: "Sản phẩm ST25", type: "farm" },
  { id: 2, url: "https://bizweb.dktcdn.net/thumb/1024x1024/100/457/054/products/cai-xanh-2-1675051487276.png?v=1675051491077", title: "Rau  hữu cơ", type: "farm" },
  { id: 3, url: "https://th.bing.com/th/id/R.1513b4ca2ad5f498538f3aa3ee758b2e?rik=95CAvV7oQA4OTg&pid=ImgRaw&r=0", title: "Cam sành", type: "farm" },
  { id: 4, url: "https://product.hstatic.net/200000557487/product/or-1_940ff04e1e1e43959ce35d73c9da2de2_master.jpg", title: "Mật ong", type: "farm" },
  { id: 5, url: "/images/tea-green.jpg", title: "Đồi chè xanh", type: "farm" },
  { id: 6, url: "/images/farm-background.jpg", title: "Toàn cảnh nông trại", type: "overview" },
]

const featuredProducts = [
  {
    id: 1,
    name: "Gạo ST25 Cao Cấp",
    price: 45000,
    originalPrice: 55000,
    image: "https://alltop.vn/backend/media/images/posts/695/Gao_ST25_Vinaseed-132208.jpg",
    sold: 1247,
    rating: 4.9,
    discount: 18,
  },
  {
    id: 2,
    name: "Rau Cải Xanh Hữu Cơ",
    price: 35000,
    originalPrice: 45000,
    image: "https://bizweb.dktcdn.net/thumb/1024x1024/100/457/054/products/cai-xanh-2-1675051487276.png?v=1675051491077",
    sold: 856,
    rating: 4.8,
    discount: 22,
  },
  {
    id: 3,
    name: "Cam Sành Vĩnh Long",
    price: 65000,
    originalPrice: 80000,
    image: "https://th.bing.com/th/id/R.1513b4ca2ad5f498538f3aa3ee758b2e?rik=95CAvV7oQA4OTg&pid=ImgRaw&r=0",
    sold: 634,
    rating: 4.9,
    discount: 19,
  },
  {
    id: 4,
    name: "Mật Ong Rừng U Minh",
    price: 180000,
    originalPrice: 220000,
    image: "https://product.hstatic.net/200000557487/product/or-1_940ff04e1e1e43959ce35d73c9da2de2_master.jpg",
    sold: 423,
    rating: 5.0,
    discount: 18,
  },
]

const reviews = [
  {
    id: 1,
    customer: {
      name: "Nguyễn Minh Anh",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    rating: 5,
    comment: "Gạo ST25 rất thơm và dẻo, gia đình tôi rất hài lòng. Sẽ ủng hộ shop lâu dài!",
    date: "2024-01-18",
    product: "Gạo ST25 Cao Cấp",
    helpful: 24,
    images: ["https://alltop.vn/backend/media/images/posts/695/Gao_ST25_Vinaseed-132208.jpg"],
  },
  {
    id: 2,
    customer: {
      name: "Trần Thanh Hoa",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    rating: 5,
    comment: "Rau củ tươi ngon, đóng gói cẩn thận. Giao hàng nhanh, nhân viên thân thiện.",
    date: "2024-01-17",
    product: "Rau Cải Xanh Hữu Cơ",
    helpful: 18,
    images: ["https://bizweb.dktcdn.net/thumb/1024x1024/100/457/054/products/cai-xanh-2-1675051487276.png?v=1675051491077"],
  },
  {
    id: 3,
    customer: {
      name: "Lê Đức Mạnh",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    rating: 4,
    comment: "Cam ngọt, nhiều nước. Chỉ có điều hơi nhỏ so với mong đợi.",
    date: "2024-01-16",
    product: "Cam Sành Vĩnh Long",
    helpful: 12,
    images: ["https://th.bing.com/th/id/R.1513b4ca2ad5f498538f3aa3ee758b2e?rik=95CAvV7oQA4OTg&pid=ImgRaw&r=0"],
  },
]

const achievements = [
  {
    title: "Top Seller 2023",
    description: "Cửa hàng bán chạy nhất danh mục nông sản",
    icon: FaTrophy,
    date: "2023-12-31",
  },
  {
    title: "Chất lượng xuất sắc",
    description: "Đạt 4.9/5 sao từ hơn 2000 đánh giá",
    icon: FaStar,
    date: "2023-11-15",
  },
  {
    title: "Giao hàng nhanh",
    description: "98% đơn hàng giao đúng hẹn",
    icon: FaTruck,
    date: "2023-10-20",
  },
  {
    title: "Khách hàng tin tưởng",
    description: "Hơn 45K người theo dõi",
    icon: FaHeart,
    date: "2023-09-10",
  },
]

export { storeInfo, farmImages, featuredProducts, reviews, achievements }
