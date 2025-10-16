/* eslint-disable @typescript-eslint/no-explicit-any */
export const stats = {
    totalProducts: 156,
    lowStock: 12,
    expiringSoon: 8,
    totalValue: 45600000,
  }

  export const categories = [
    { id: "all", name: "Tất cả", count: 156 },
    { id: "rice", name: "Gạo & Ngũ cốc", count: 45 },
    { id: "vegetables", name: "Rau củ", count: 38 },
    { id: "fruits", name: "Trái cây", count: 29 },
    { id: "honey", name: "Mật ong", count: 15 },
    { id: "tea", name: "Trà & Thảo mộc", count: 18 },
    { id: "spices", name: "Gia vị", count: 11 },
  ]

  export const products = [
    {
      id: 1,
      name: "Gạo ST25 Cao Cấp",
      category: "rice",
      image: "/images/rice-premium.jpg",
      sku: "RICE-ST25-001",
      currentStock: 120,
      minStock: 50,
      maxStock: 500,
      unit: "kg",
      costPrice: 38000,
      sellPrice: 45000,
      supplier: "Nông trại An Giang",
      harvestDate: "2024-01-15",
      expiryDate: "2024-07-15",
      location: "Kho A - Kệ 1",
      temperature: "25°C",
      humidity: "60%",
      status: "in_stock",
      quality: "excellent",
      organic: true,
      lastUpdated: "2024-01-20 14:30",
    },
    {
      id: 2,
      name: "Rau Cải Xanh Hữu Cơ",
      category: "vegetables",
      image: "/images/vegetables-fresh.jpg",
      sku: "VEG-CAI-002",
      currentStock: 25,
      minStock: 30,
      maxStock: 100,
      unit: "kg",
      costPrice: 28000,
      sellPrice: 35000,
      supplier: "Nông trại Đà Lạt",
      harvestDate: "2024-01-18",
      expiryDate: "2024-01-25",
      location: "Kho B - Tủ lạnh 1",
      temperature: "4°C",
      humidity: "85%",
      status: "low_stock",
      quality: "good",
      organic: true,
      lastUpdated: "2024-01-20 08:15",
    },
    {
      id: 3,
      name: "Cam Sành Vĩnh Long",
      category: "fruits",
      image: "/images/fruits-organic.jpg",
      sku: "FRUIT-CAM-003",
      currentStock: 80,
      minStock: 40,
      maxStock: 200,
      unit: "kg",
      costPrice: 45000,
      sellPrice: 65000,
      supplier: "Vườn cam Vĩnh Long",
      harvestDate: "2024-01-16",
      expiryDate: "2024-02-01",
      location: "Kho C - Kệ 2",
      temperature: "15°C",
      humidity: "70%",
      status: "in_stock",
      quality: "excellent",
      organic: false,
      lastUpdated: "2024-01-19 16:45",
    },
    {
      id: 4,
      name: "Mật Ong Rừng U Minh",
      category: "honey",
      image: "/images/honey-pure.jpg",
      sku: "HONEY-UM-004",
      currentStock: 15,
      minStock: 10,
      maxStock: 50,
      unit: "hũ",
      costPrice: 150000,
      sellPrice: 180000,
      supplier: "Hợp tác xã U Minh",
      harvestDate: "2023-12-20",
      expiryDate: "2025-12-20",
      location: "Kho A - Kệ 3",
      temperature: "20°C",
      humidity: "45%",
      status: "in_stock",
      quality: "excellent",
      organic: true,
      lastUpdated: "2024-01-18 10:20",
    },
    {
      id: 5,
      name: "Trà Xanh Thái Nguyên",
      category: "tea",
      image: "/images/tea-green.jpg",
      sku: "TEA-TN-005",
      currentStock: 8,
      minStock: 15,
      maxStock: 60,
      unit: "gói",
      costPrice: 85000,
      sellPrice: 120000,
      supplier: "Chè Thái Nguyên",
      harvestDate: "2024-01-10",
      expiryDate: "2025-01-10",
      location: "Kho A - Kệ 4",
      temperature: "22°C",
      humidity: "50%",
      status: "low_stock",
      quality: "good",
      organic: true,
      lastUpdated: "2024-01-17 13:10",
    },
  ]

  export const recentActivities = [
    {
      id: 1,
      type: "stock_in",
      product: "Gạo ST25 Cao Cấp",
      quantity: 50,
      unit: "kg",
      user: "Nguyễn Văn A",
      time: "2 giờ trước",
    },
    {
      id: 2,
      type: "stock_out",
      product: "Rau Cải Xanh",
      quantity: 15,
      unit: "kg",
      user: "Livestream Sale",
      time: "3 giờ trước",
    },
    {
      id: 3,
      type: "quality_check",
      product: "Cam Sành Vĩnh Long",
      status: "passed",
      user: "Trần Thị B",
      time: "5 giờ trước",
    },
    {
      id: 4,
      type: "expiry_alert",
      product: "Rau Cải Xanh",
      daysLeft: 5,
      user: "System",
      time: "1 ngày trước",
    },
  ]
 export const getStatusColor = (status:any) => {
    switch (status) {
      case "in_stock":
        return "bg-green-100 text-green-800"
      case "low_stock":
        return "bg-yellow-100 text-yellow-800"
      case "out_of_stock":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

 export const getStatusText = (status:any) => {
    switch (status) {
      case "in_stock":
        return "Còn hàng"
      case "low_stock":
        return "Sắp hết"
      case "out_of_stock":
        return "Hết hàng"
      default:
        return "Không xác định"
    }
  }

export  const getQualityColor = (quality:any) => {
    switch (quality) {
      case "excellent":
        return "text-green-600"
      case "good":
        return "text-blue-600"
      case "fair":
        return "text-yellow-600"
      case "poor":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

export  const getQualityText = (quality:any) => {
    switch (quality) {
      case "excellent":
        return "Xuất sắc"
      case "good":
        return "Tốt"
      case "fair":
        return "Khá"
      case "poor":
        return "Kém"
      default:
        return "Chưa đánh giá"
    }
  }