
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
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        name: "Chứng nhận Organic",
        issuer: "Control Union Vietnam",
        validUntil: "2025-06-30",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        name: "ATTP Cấp A",
        issuer: "Sở Y tế Tiền Giang",
        validUntil: "2025-03-15",
        image: "/placeholder.svg?height=60&width=60",
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
    { id: 1, url: "/images/rice-premium.jpg", title: "Ruộng lúa ST25", type: "farm" },
    { id: 2, url: "/images/vegetables-fresh.jpg", title: "Vườn rau hữu cơ", type: "farm" },
    { id: 3, url: "/images/fruits-organic.jpg", title: "Vườn cam sành", type: "farm" },
    { id: 4, url: "/images/honey-pure.jpg", title: "Trang trại ong", type: "farm" },
    { id: 5, url: "/images/tea-green.jpg", title: "Đồi chè xanh", type: "farm" },
    { id: 6, url: "/images/farm-background.jpg", title: "Toàn cảnh nông trại", type: "overview" },
  ]

  const featuredProducts = [
    {
      id: 1,
      name: "Gạo ST25 Cao Cấp",
      price: 45000,
      originalPrice: 55000,
      image: "/images/rice-premium.jpg",
      sold: 1247,
      rating: 4.9,
      discount: 18,
    },
    {
      id: 2,
      name: "Rau Cải Xanh Hữu Cơ",
      price: 35000,
      originalPrice: 45000,
      image: "/images/vegetables-fresh.jpg",
      sold: 856,
      rating: 4.8,
      discount: 22,
    },
    {
      id: 3,
      name: "Cam Sành Vĩnh Long",
      price: 65000,
      originalPrice: 80000,
      image: "/images/fruits-organic.jpg",
      sold: 634,
      rating: 4.9,
      discount: 19,
    },
    {
      id: 4,
      name: "Mật Ong Rừng U Minh",
      price: 180000,
      originalPrice: 220000,
      image: "/images/honey-pure.jpg",
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
      images: ["/images/rice-premium.jpg"],
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
      images: [],
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
      images: ["/images/fruits-organic.jpg"],
    },
  ]

  const achievements = [
    {
      title: "Top Seller 2023",
      description: "Cửa hàng bán chạy nhất danh mục nông sản",
      icon: "🏆",
      date: "2023-12-31",
    },
    {
      title: "Chất lượng xuất sắc",
      description: "Đạt 4.9/5 sao từ hơn 2000 đánh giá",
      icon: "⭐",
      date: "2023-11-15",
    },
    {
      title: "Giao hàng nhanh",
      description: "98% đơn hàng giao đúng hẹn",
      icon: "🚚",
      date: "2023-10-20",
    },
    {
      title: "Khách hàng tin tưởng",
      description: "Hơn 45K người theo dõi",
      icon: "❤️",
      date: "2023-09-10",
    },
  ]
export {storeInfo,farmImages,featuredProducts,reviews,achievements}