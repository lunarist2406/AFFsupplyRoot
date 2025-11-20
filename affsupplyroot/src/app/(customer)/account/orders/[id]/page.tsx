"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getOrderDetail, OrderDetail } from "@/services/order";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import Footer from "@/layout/Footer";
import { ArrowLeft, Package, MapPin, CreditCard, Calendar, Truck, Store } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = parseInt(params.id as string);
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const loadOrderDetail = async () => {
    try {
      setLoading(true);
      const response = await getOrderDetail(orderId);
      if (response.success) {
        setOrder(response.data);
      } else {
        toast.error(response.message || "Không thể tải chi tiết đơn hàng");
      }
    } catch (error) {
      console.error("Error loading order detail:", error);
      toast.error("Có lỗi xảy ra khi tải chi tiết đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      loadOrderDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string }> = {
      PENDING: { label: "Chờ xử lý", className: "bg-amber-100 text-amber-800 border-amber-300" },
      CONFIRMED: { label: "Đã xác nhận", className: "bg-blue-100 text-blue-800 border-blue-300" },
      SHIPPING: { label: "Đang giao", className: "bg-purple-100 text-purple-800 border-purple-300" },
      DELIVERED: { label: "Đã giao", className: "bg-green-100 text-green-800 border-green-300" },
      CANCELLED: { label: "Đã hủy", className: "bg-red-100 text-red-800 border-red-300" },
    };

    const config = statusConfig[status] || { label: status, className: "bg-gray-100 text-gray-800 border-gray-300" };
    return (
      <Badge className={`${config.className} border font-semibold px-4 py-1.5 text-sm`}>
        {config.label}
      </Badge>
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-8 px-4">
          <div className="max-w-5xl mx-auto space-y-6">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-64 w-full rounded-2xl" />
            <Skeleton className="h-96 w-full rounded-2xl" />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-8 px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="border-0 shadow-2xl">
              <CardContent className="flex flex-col items-center justify-center py-20">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 rounded-full mb-6">
                  <Package className="h-20 w-20 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Không tìm thấy đơn hàng
                </h3>
                <p className="text-gray-600 mb-6">Đơn hàng này không tồn tại hoặc đã bị xóa</p>
                <Button 
                  onClick={() => router.back()} 
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-6 rounded-xl shadow-lg"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Quay lại
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-2 hover:bg-white hover:shadow-md transition-all rounded-xl px-4 py-5 text-gray-700 hover:text-green-600 font-medium"
          >
            <ArrowLeft className="h-5 w-5" />
            Quay lại
          </Button>

          {/* Order Header Card */}
          <Card className="mb-6 border-0 shadow-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></div>
            <CardHeader className="bg-gradient-to-br from-white to-gray-50 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-3xl font-bold flex items-center gap-3 text-gray-900 mb-3">
                    <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-3 rounded-xl">
                      <Package className="h-7 w-7 text-green-600" />
                    </div>
                    Đơn hàng #{order.id}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 text-base bg-white px-4 py-2 rounded-lg border border-gray-200 w-fit">
                    <Calendar className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-gray-700">Đặt ngày {formatDate(order.createdAt)}</span>
                  </CardDescription>
                </div>
                <div className="self-start">
                  {getStatusBadge(order.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Shipping Address */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                  <h3 className="font-bold text-lg flex items-center gap-3 mb-4 text-gray-900">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <MapPin className="h-5 w-5 text-green-600" />
                    </div>
                    Địa chỉ giao hàng
                  </h3>
                  <div className="space-y-2 text-sm bg-white rounded-lg p-4 shadow-sm">
                    <p className="font-bold text-gray-900 text-base">{order.address.fullName}</p>
                    <p className="text-gray-700 font-medium">{order.address.phone}</p>
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-gray-600">{order.address.street}</p>
                      <p className="text-gray-600">{order.address.ward}, {order.address.district}</p>
                      <p className="text-gray-600">{order.address.province}</p>
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                  <h3 className="font-bold text-lg flex items-center gap-3 mb-4 text-gray-900">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                    </div>
                    Thông tin thanh toán
                  </h3>
                  <div className="space-y-3 bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Phương thức:</span>
                      <span className="font-bold text-gray-900 uppercase text-sm">{order.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-gray-600 font-medium">Tổng tiền:</span>
                      <span className="font-bold text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        {formatPrice(order.totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card className="border-0 shadow-xl">
            <div className="h-1.5 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></div>
            <CardHeader className="bg-gradient-to-br from-white to-gray-50">
              <CardTitle className="text-2xl font-bold flex items-center gap-3 text-gray-900">
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-2.5 rounded-xl">
                  <Truck className="h-6 w-6 text-green-600" />
                </div>
                Sản phẩm trong đơn hàng
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-5">
                {order.items.map((item, index) => (
                  <div key={item.productID}>
                    <div className="flex gap-5 p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl hover:shadow-md transition-shadow">
                      <div className="relative h-24 w-24 flex-shrink-0 rounded-xl overflow-hidden border-2 border-gray-200 shadow-sm">
                        <Image
                          src={item.product.ProductImage[0]?.url || "/placeholder.png"}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link 
                          href={`/${item.product.slug}`}
                          className="font-bold text-gray-900 hover:text-green-600 line-clamp-2 text-base transition-colors"
                        >
                          {item.product.title}
                        </Link>
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                          <Store className="h-4 w-4 text-green-600" />
                          <span>Shop: <span className="font-medium text-gray-700">{item.product.SellerProfile.companyName}</span></span>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                          <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
                            Số lượng: <span className="text-gray-900 font-bold">{item.quantity}</span>
                          </span>
                          <span className="font-bold text-lg text-green-600">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                    {index < order.items.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                <div className="space-y-3">
                  <div className="flex justify-between text-base">
                    <span className="text-gray-700 font-medium">Tạm tính:</span>
                    <span className="font-semibold text-gray-900">{formatPrice(order.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-gray-700 font-medium">Phí vận chuyển:</span>
                    <span className="font-semibold text-green-600">Miễn phí</span>
                  </div>
                  <Separator className="bg-green-200" />
                  <div className="flex justify-between text-xl pt-2">
                    <span className="font-bold text-gray-900">Tổng cộng:</span>
                    <span className="font-bold text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      {formatPrice(order.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
