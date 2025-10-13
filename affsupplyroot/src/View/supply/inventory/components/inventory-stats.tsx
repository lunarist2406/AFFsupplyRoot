"use client"

import { Package, AlertTriangle, Clock, BarChart3 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface InventoryStatsProps {
  stats: {
    totalProducts: number
    lowStock: number
    expiringSoon: number
    totalValue: number
  }
}

export function InventoryStats({ stats }: InventoryStatsProps) {
  return (
    <div className="grid md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tổng sản phẩm</p>
              <p className="text-2xl font-bold">{stats.totalProducts}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sắp hết hàng</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.lowStock}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Clock className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sắp hết hạn</p>
              <p className="text-2xl font-bold text-red-600">{stats.expiringSoon}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <BarChart3 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Giá trị kho</p>
              <p className="text-2xl font-bold">₫{(stats.totalValue / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
