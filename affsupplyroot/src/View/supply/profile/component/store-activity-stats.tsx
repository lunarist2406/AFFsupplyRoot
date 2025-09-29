"use client"

import { FaBox, FaShoppingCart, FaClock, FaChartLine } from "react-icons/fa"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ActivityStats {
  totalProducts: number
  totalOrders: number
  responseTime: string
  responseRate: number
}

interface StoreActivityStatsProps {
  stats: ActivityStats
}

export function StoreActivityStats({ stats }: StoreActivityStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thống kê hoạt động</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 sm:p-6 bg-green-50 rounded-lg">
            <FaBox className="mx-auto mb-2 text-green-600 text-2xl sm:text-3xl md:text-4xl" />
            <p className="text-xl sm:text-2xl font-bold">{stats.totalProducts}</p>
            <p className="text-sm text-muted-foreground">Sản phẩm</p>
          </div>

          <div className="text-center p-4 sm:p-6 bg-blue-50 rounded-lg">
            <FaShoppingCart className="mx-auto mb-2 text-blue-600 text-2xl sm:text-3xl md:text-4xl" />
            <p className="text-xl sm:text-2xl font-bold">{stats.totalOrders.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Đơn hàng</p>
          </div>

          <div className="text-center p-4 sm:p-6 bg-purple-50 rounded-lg">
            <FaClock className="mx-auto mb-2 text-purple-600 text-2xl sm:text-3xl md:text-4xl" />
            <p className="text-xl sm:text-2xl font-bold">{stats.responseTime}</p>
            <p className="text-sm text-muted-foreground">Phản hồi</p>
          </div>

          <div className="text-center p-4 sm:p-6 bg-orange-50 rounded-lg">
            <FaChartLine className="mx-auto mb-2 text-orange-600 text-2xl sm:text-3xl md:text-4xl" />
            <p className="text-xl sm:text-2xl font-bold">{stats.responseRate}%</p>
            <p className="text-sm text-muted-foreground">Tỷ lệ phản hồi</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
