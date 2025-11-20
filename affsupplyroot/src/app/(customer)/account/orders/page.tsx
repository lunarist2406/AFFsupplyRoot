"use client";

import { useEffect, useState } from "react";
import { getMyOrders, Order } from "@/services/order";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
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
    const statusConfig: Record<string, { label: string; className: string }> = {
      PENDING: { label: "Chờ xử lý", className: "bg-amber-100 text-amber-800 border-amber-300" },
      CONFIRMED: { label: "Đã xác nhận", className: "bg-blue-100 text-blue-800 border-blue-300" },
      SHIPPING: { label: "Đang giao", className: "bg-purple-100 text-purple-800 border-purple-300" },
      DELIVERED: { label: "Đã giao", className: "bg-green-100 text-green-800 border-green-300" },
      CANCELLED: { label: "Đã hủy", className: "bg-red-100 text-red-800 border-red-300" },
    };

    const config = statusConfig[status] || { label: status, className: "bg-gray-100 text-gray-800 border-gray-300" };
    return (
      <Badge className={`${config.className} border font-semibold px-3 py-1`}>
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

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-8 sm:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-emerald-100">
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-xl">
                <Package className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                  Đơn hàng của tôi
                </h1>
                <p className="text-gray-600 mt-1">Quản lý và theo dõi đơn hàng của bạn</p>
              </div>
            </div>
            {!loading && orders.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-gray-600">Tổng đơn hàng: <span className="font-bold text-gray-900">{orders.length}</span></span>
                </div>
              </div>
            )}
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-0 shadow-lg">
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
            <Card className="border-0 shadow-2xl">
              <CardContent className="flex flex-col items-center justify-center py-16 sm:py-20">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 rounded-full mb-6">
                  <Package className="h-20 w-20 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Chưa có đơn hàng nào
                </h3>
                <p className="text-gray-600 mb-8 text-center max-w-md">
                  Bạn chưa có đơn hàng nào. Hãy khám phá các sản phẩm tuyệt vời và bắt đầu mua sắm ngay!
                </p>
                <Link href="/">
                  <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
                    Khám phá sản phẩm
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-5">
              {orders.map((order) => (
                <Card key={order.id} className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                  {/* Header gradient line */}
                  <div className="h-1.5 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></div>
                  
                  <CardHeader className="bg-gradient-to-br from-white to-gray-50 pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl font-bold flex items-center gap-3 text-gray-900 mb-3">
                          <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-2 rounded-lg">
                            <Package className="h-5 w-5 text-green-600" />
                          </div>
                          Đơn hàng #{order.id}
                        </CardTitle>
                        <CardDescription className="flex flex-wrap items-center gap-4">
                          <span className="flex items-center gap-2 text-gray-600 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
                            <Calendar className="h-4 w-4 text-green-600" />
                            <span className="font-medium">{formatDate(order.createdAt)}</span>
                          </span>
                          <span className="flex items-center gap-2 text-gray-600 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
                            <CreditCard className="h-4 w-4 text-green-600" />
                            <span className="font-medium">{order.paymentMethod}</span>
                          </span>
                        </CardDescription>
                      </div>
                      <div className="self-start">
                        {getStatusBadge(order.status)}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100 flex-1">
                        <p className="text-sm text-gray-600 mb-1 font-medium">Tổng tiền</p>
                        <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                          {formatPrice(order.totalAmount)}
                        </p>
                      </div>
                      <Link href={`/account/orders/${order.id}`} className="sm:self-end">
                        <Button className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-6 py-5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 group">
                          <Eye className="h-4 w-4 group-hover:scale-110 transition-transform" />
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
