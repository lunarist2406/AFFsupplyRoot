"use client"

import { TrendingUp, TrendingDown, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Activity {
  id: number
  type: string
  product: string
  quantity?: number
  unit?: string
  user: string
  time: string
  status?: string
  daysLeft?: number
}

interface RecentActivitiesProps {
  activities: Activity[]
}

export function RecentActivities({ activities }: RecentActivitiesProps) {
  return (
    <Card>
      <CardHeader className="p-3 sm:p-6">
        <CardTitle className="text-base sm:text-lg">Hoạt động gần đây</CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-6 pt-0">
        <ScrollArea className="h-48 sm:h-64">
          <div className="space-y-2 sm:space-y-3">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm">
                <div className="p-0.5 sm:p-1 bg-gray-100 rounded-full mt-0.5 sm:mt-1 shrink-0">
                  {activity.type === "stock_in" && <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-600" />}
                  {activity.type === "stock_out" && <TrendingDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-600" />}
                  {activity.type === "quality_check" && (
                    <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-600" />
                  )}
                  {activity.type === "expiry_alert" && (
                    <AlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{activity.product}</p>
                  <p className="text-muted-foreground text-[10px] sm:text-xs break-words">
                    {activity.type === "stock_in" && `Nhập ${activity.quantity} ${activity.unit}`}
                    {activity.type === "stock_out" && `Xuất ${activity.quantity} ${activity.unit}`}
                    {activity.type === "quality_check" &&
                      `Kiểm tra chất lượng: ${activity.status === "passed" ? "Đạt" : "Không đạt"}`}
                    {activity.type === "expiry_alert" && `Còn ${activity.daysLeft} ngày hết hạn`}
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
