"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download, Calendar, TrendingUp, DollarSign, Users, Package } from "lucide-react"

const reports = [
  {
    id: 1,
    title: "Báo cáo doanh thu tháng 12",
    type: "Tài chính",
    date: "15/12/2024",
    status: "completed",
    size: "2.4 MB",
  },
  {
    id: 2,
    title: "Báo cáo người dùng Q4 2024",
    type: "Người dùng",
    date: "10/12/2024",
    status: "completed",
    size: "1.8 MB",
  },
  {
    id: 3,
    title: "Báo cáo nhà cung cấp",
    type: "Nhà cung cấp",
    date: "05/12/2024",
    status: "processing",
    size: "3.2 MB",
  },
  {
    id: 4,
    title: "Báo cáo tồn kho",
    type: "Kho hàng",
    date: "01/12/2024",
    status: "completed",
    size: "1.5 MB",
  },
]

export function ReportsPage() {
  return (
    <div className="p-8 space-y-6">
      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Tổng báo cáo</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-card-foreground">156</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Tháng này</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-card-foreground">24</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Đang xử lý</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-card-foreground">8</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Hoàn thành</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-card-foreground">148</div>
          </CardContent>
        </Card>
      </div>

      {/* Report Types */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: DollarSign, title: "Báo cáo tài chính", count: 45, color: "green-primary" },
          { icon: Users, title: "Báo cáo người dùng", count: 38, color: "yellow-secondary" },
          { icon: Package, title: "Báo cáo kho hàng", count: 52, color: "green-secondary" },
          { icon: TrendingUp, title: "Báo cáo phân tích", count: 21, color: "yellow-primary" },
        ].map((type, i) => (
          <Card key={i} className="bg-card border-border hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-${type.color}/10`}>
                  <type.icon className={`h-6 w-6 text-${type.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">{type.title}</p>
                  <p className="text-2xl font-bold text-card-foreground">{type.count}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Reports */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-card-foreground">Báo cáo gần đây</CardTitle>
            <button className="flex h-9 items-center gap-2 rounded-lg bg-green-primary px-4 text-sm font-medium text-white hover:bg-green-primary/90">
              <FileText className="h-4 w-4" />
              Tạo báo cáo mới
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-primary/10">
                    <FileText className="h-6 w-6 text-green-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">{report.title}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-muted-foreground">{report.type}</span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{report.date}</span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{report.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      report.status === "completed"
                        ? "bg-green-primary/10 text-green-primary"
                        : "bg-yellow-primary/10 text-yellow-secondary"
                    }`}
                  >
                    {report.status === "completed" ? "Hoàn thành" : "Đang xử lý"}
                  </span>
                  {report.status === "completed" && (
                    <button className="flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-4 text-sm font-medium text-foreground hover:bg-accent">
                      <Download className="h-4 w-4" />
                      Tải xuống
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
