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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <Card>
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg shrink-0">
              <Package className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-muted-foreground truncate">Tổng sản phẩm</p>
              <p className="text-xl sm:text-2xl font-bold">{stats.totalProducts}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-yellow-100 rounded-lg shrink-0">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-muted-foreground truncate">Sắp hết hàng</p>
              <p className="text-xl sm:text-2xl font-bold text-yellow-600">{stats.lowStock}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-red-100 rounded-lg shrink-0">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-muted-foreground truncate">Sắp hết hạn</p>
              <p className="text-xl sm:text-2xl font-bold text-red-600">{stats.expiringSoon}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg shrink-0">
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-muted-foreground truncate">Giá trị kho</p>
              <p className="text-xl sm:text-2xl font-bold">₫{(stats.totalValue / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
