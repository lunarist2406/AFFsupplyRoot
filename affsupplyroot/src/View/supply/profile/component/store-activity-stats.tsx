"use client"

import { Package, Users, Clock, TrendingUp } from "lucide-react"
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
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Package className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.totalProducts}</p>
            <p className="text-sm text-muted-foreground">Sản phẩm</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Đơn hàng</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.responseTime}</p>
            <p className="text-sm text-muted-foreground">Phản hồi</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.responseRate}%</p>
            <p className="text-sm text-muted-foreground">Tỷ lệ phản hồi</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
