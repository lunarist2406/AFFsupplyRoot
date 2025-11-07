"use client";

import { useEffect, useState } from "react";
import { getMyOrders, Order } from "@/services/order";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import { Package, Calendar, CreditCard, Eye } from "lucide-react";
import { toast } from "sonner";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await getMyOrders();
      if (response.success) {
        setOrders(response.data);
      } else {
        toast.error(response.message || "Không thể tải danh sách đơn hàng");
      }
    } catch (error) {
      console.error("Error loading orders:", error);
      toast.error("Có lỗi xảy ra khi tải đơn hàng");
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-green-primary/20 via-green-primary/30 to-green-primary/20 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Đơn hàng của tôi</h1>
            <p className="text-gray-600 mt-2">Quản lý và theo dõi đơn hàng của bạn</p>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-32 mt-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : orders.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Package className="h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Chưa có đơn hàng nào
                </h3>
                <p className="text-gray-600 mb-6">
                  Bạn chưa có đơn hàng nào. Hãy bắt đầu mua sắm ngay!
                </p>
                <Link href="/">
                  <Button className="bg-green-primary hover:bg-green-600">
                    Khám phá sản phẩm
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Package className="h-5 w-5" />
                          Đơn hàng #{order.id}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(order.createdAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <CreditCard className="h-4 w-4" />
                            {order.paymentMethod}
                          </span>
                        </CardDescription>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Tổng tiền</p>
                        <p className="text-xl font-bold text-green-primary">
                          {formatPrice(order.totalAmount)}
                        </p>
                      </div>
                      <Link href={`/account/orders/${order.id}`}>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          Chi tiết
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
