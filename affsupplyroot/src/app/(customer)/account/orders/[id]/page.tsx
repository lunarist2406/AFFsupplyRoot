"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getOrderDetail, OrderDetail } from "@/services/order";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import { ArrowLeft, Package, MapPin, CreditCard, Calendar, Truck } from "lucide-react";
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
    const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      PENDING: { label: "Chờ xử lý", variant: "outline" },
      CONFIRMED: { label: "Đã xác nhận", variant: "default" },
      SHIPPING: { label: "Đang giao", variant: "secondary" },
      DELIVERED: { label: "Đã giao", variant: "default" },
      CANCELLED: { label: "Đã hủy", variant: "destructive" },
    };

    const config = statusConfig[status] || { label: status, variant: "outline" as const };
    return <Badge variant={config.variant}>{config.label}</Badge>;
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
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-green-primary/20 via-green-primary/30 to-green-primary/20 py-8 px-4">
          <div className="max-w-4xl mx-auto space-y-4">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-green-primary/20 via-green-primary/30 to-green-primary/20 py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Package className="h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Không tìm thấy đơn hàng
                </h3>
                <Button onClick={() => router.back()} className="mt-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
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
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-green-primary/20 via-green-primary/30 to-green-primary/20 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>

          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Package className="h-6 w-6" />
                    Đơn hàng #{order.id}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-2">
                    <Calendar className="h-4 w-4" />
                    Đặt ngày {formatDate(order.createdAt)}
                  </CardDescription>
                </div>
                {getStatusBadge(order.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Shipping Address */}
                <div>
                  <h3 className="font-semibold flex items-center gap-2 mb-3">
                    <MapPin className="h-5 w-5 text-green-primary" />
                    Địa chỉ giao hàng
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p className="font-medium">{order.address.fullName}</p>
                    <p className="text-gray-600">{order.address.phone}</p>
                    <p className="text-gray-600">
                      {order.address.street}, {order.address.ward}
                    </p>
                    <p className="text-gray-600">
                      {order.address.district}, {order.address.province}
                    </p>
                  </div>
                </div>

                {/* Payment Info */}
                <div>
                  <h3 className="font-semibold flex items-center gap-2 mb-3">
                    <CreditCard className="h-5 w-5 text-green-primary" />
                    Thông tin thanh toán
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phương thức:</span>
                      <span className="font-medium">{order.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tổng tiền:</span>
                      <span className="font-bold text-green-primary text-lg">
                        {formatPrice(order.totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Sản phẩm trong đơn hàng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.productID}>
                    <div className="flex gap-4">
                      <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden border">
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
                          className="font-medium hover:text-green-primary line-clamp-2"
                        >
                          {item.product.title}
                        </Link>
                        <p className="text-sm text-gray-600 mt-1">
                          Shop: {item.product.SellerProfile.companyName}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-gray-600">
                            Số lượng: {item.quantity}
                          </span>
                          <span className="font-semibold text-green-primary">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Separator className="mt-4" />
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span>{formatPrice(order.totalAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span>Miễn phí</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Tổng cộng:</span>
                  <span className="text-green-primary">{formatPrice(order.totalAmount)}</span>
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
