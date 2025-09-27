"use client"

import { useState } from "react"
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Star,
  Users,
  Calendar,
  Award,
  Truck,
  Shield,
  Clock,
  Camera,
  Share2,
  Heart,
  MessageCircle,
  ThumbsUp,
  Eye,
  Package,
  Leaf,
  CheckCircle,
  TrendingUp,
  Settings,
  DollarSign,
} from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SupplyProfile() {
  const [isFollowing, setIsFollowing] = useState(false)

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-80 bg-gradient-to-r from-green-600 to-emerald-600">
        <Image
          src={storeInfo.coverImage || "/placeholder.svg"}
          alt="Farm Cover"
          fill
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black/20" />

        {/* Cover Actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button variant="secondary" size="sm">
            <Camera className="w-4 h-4 mr-2" />
            Đổi ảnh bìa
          </Button>
          <Button variant="secondary" size="sm">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Store Header */}
      <div className="relative -mt-20 px-6">
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col md:flex-row gap-6 flex-1">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarImage src={storeInfo.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">NS</AvatarFallback>
                </Avatar>
                <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                  <Camera className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold">{storeInfo.name}</h1>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Đã xác minh
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800">
                      <Leaf className="w-3 h-3 mr-1" />
                      Hữu cơ
                    </Badge>
                  </div>
                  <p className="text-lg text-muted-foreground italic">{storeInfo.slogan}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{storeInfo.address.full}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Tham gia từ {new Date(storeInfo.stats.joinDate).toLocaleDateString("vi-VN")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{storeInfo.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{storeInfo.contact.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats and Actions */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{storeInfo.stats.followers.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Người theo dõi</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-2xl font-bold">{storeInfo.stats.rating}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{storeInfo.stats.reviewCount} đánh giá</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={
                    isFollowing
                      ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  }
                >
                  <Heart className={`w-4 h-4 mr-2 ${isFollowing ? "fill-current" : ""}`} />
                  {isFollowing ? "Đang theo dõi" : "Theo dõi"}
                </Button>
                <Button variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Nhắn tin
                </Button>
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Cài đặt
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="products">Sản phẩm</TabsTrigger>
            <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
            <TabsTrigger value="farm">Nông trại</TabsTrigger>
            <TabsTrigger value="certificates">Chứng nhận</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Store Description */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Giới thiệu cửa hàng</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{storeInfo.description}</p>
                  </CardContent>
                </Card>

                {/* Store Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Thống kê hoạt động</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <Package className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold">{storeInfo.stats.totalProducts}</p>
                        <p className="text-sm text-muted-foreground">Sản phẩm</p>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold">{storeInfo.stats.totalOrders.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Đơn hàng</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold">{storeInfo.stats.responseTime}</p>
                        <p className="text-sm text-muted-foreground">Phản hồi</p>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold">{storeInfo.stats.responseRate}%</p>
                        <p className="text-sm text-muted-foreground">Tỷ lệ phản hồi</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle>Thành tích nổi bật</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                          <div className="text-3xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{achievement.title}</h4>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(achievement.date).toLocaleDateString("vi-VN")}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Contact Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin liên hệ</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{storeInfo.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{storeInfo.contact.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{storeInfo.contact.website}</span>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Mạng xã hội:</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          📘 Facebook
                        </Button>
                        <Button variant="outline" size="sm">
                          💬 Zalo
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Store Policies */}
                <Card>
                  <CardHeader>
                    <CardTitle>Chính sách cửa hàng</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Truck className="w-4 h-4 text-green-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Giao hàng</p>
                          <p className="text-xs text-muted-foreground">{storeInfo.policies.shipping}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Đổi trả</p>
                          <p className="text-xs text-muted-foreground">{storeInfo.policies.return}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Award className="w-4 h-4 text-purple-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Bảo hành</p>
                          <p className="text-xs text-muted-foreground">{storeInfo.policies.warranty}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <DollarSign className="w-4 h-4 text-orange-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Thanh toán</p>
                          <p className="text-xs text-muted-foreground">{storeInfo.policies.payment}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Featured Products */}
                <Card>
                  <CardHeader>
                    <CardTitle>Sản phẩm nổi bật</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {featuredProducts.slice(0, 3).map((product) => (
                        <div key={product.id} className="flex items-center gap-3">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={50}
                            height={50}
                            className="rounded object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{product.name}</p>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-green-600">₫{product.price.toLocaleString()}</span>
                              <span className="text-xs text-muted-foreground line-through">
                                ₫{product.originalPrice.toLocaleString()}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">Đã bán: {product.sold}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sản phẩm của cửa hàng ({featuredProducts.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featuredProducts.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="relative mb-4">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={200}
                          height={150}
                          className="w-full h-40 object-cover rounded"
                        />
                        <Badge className="absolute top-2 left-2 bg-red-500 text-white">-{product.discount}%</Badge>
                      </div>
                      <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg font-bold text-green-600">₫{product.price.toLocaleString()}</span>
                        <span className="text-sm text-muted-foreground line-through">
                          ₫{product.originalPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{product.rating}</span>
                        </div>
                        <span>Đã bán: {product.sold}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Đánh giá từ khách hàng ({reviews.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={review.customer.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{review.customer.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{review.customer.name}</h4>
                            {review.customer.verified && (
                              <Badge variant="outline" className="text-xs">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Đã mua hàng
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {new Date(review.date).toLocaleDateString("vi-VN")}
                            </span>
                          </div>
                          <p className="text-sm mb-2">{review.comment}</p>
                          <p className="text-xs text-muted-foreground mb-3">Sản phẩm: {review.product}</p>
                          {review.images.length > 0 && (
                            <div className="flex gap-2 mb-3">
                              {review.images.map((image, index) => (
                                <Image
                                  key={index}
                                  src={image || "/placeholder.svg"}
                                  alt="Review image"
                                  width={60}
                                  height={60}
                                  className="rounded object-cover"
                                />
                              ))}
                            </div>
                          )}
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <button className="flex items-center gap-1 hover:text-green-600">
                              <ThumbsUp className="w-3 h-3" />
                              Hữu ích ({review.helpful})
                            </button>
                            <button className="hover:text-green-600">Trả lời</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="farm" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hình ảnh nông trại</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {farmImages.map((image) => (
                    <div key={image.id} className="relative group">
                      <Image
                        src={image.url || "/placeholder.svg"}
                        alt={image.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <div className="text-center text-white">
                          <Eye className="w-6 h-6 mx-auto mb-2" />
                          <p className="text-sm font-medium">{image.title}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Chứng nhận và giấy phép</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {storeInfo.certifications.map((cert, index) => (
                    <div key={index} className="border rounded-lg p-4 text-center">
                      <Image
                        src={cert.image || "/placeholder.svg"}
                        alt={cert.name}
                        width={80}
                        height={80}
                        className="mx-auto mb-4 rounded"
                      />
                      <h3 className="font-semibold mb-2">{cert.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{cert.issuer}</p>
                      <Badge variant="outline" className="text-xs">
                        Có hiệu lực đến {new Date(cert.validUntil).toLocaleDateString("vi-VN")}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
