
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Check, Trash2, AlertCircle, Info, CheckCircle, XCircle } from "lucide-react"

const notifications = [
  {
    id: 1,
    type: "success",
    title: "Người dùng mới đăng ký",
    message: "Nguyễn Văn A đã đăng ký tài khoản thành công",
    time: "5 phút trước",
    read: false,
  },
  {
    id: 2,
    type: "warning",
    title: "Cảnh báo hệ thống",
    message: "Dung lượng lưu trữ sắp đầy, vui lòng kiểm tra",
    time: "15 phút trước",
    read: false,
  },
  {
    id: 3,
    type: "info",
    title: "Cập nhật hệ thống",
    message: "Phiên bản mới 2.5.0 đã được phát hành",
    time: "1 giờ trước",
    read: true,
  },
  {
    id: 4,
    type: "error",
    title: "Lỗi thanh toán",
    message: "Giao dịch #12345 thất bại, vui lòng kiểm tra",
    time: "2 giờ trước",
    read: false,
  },
  {
    id: 5,
    type: "success",
    title: "Báo cáo hoàn thành",
    message: "Báo cáo doanh thu tháng 12 đã được tạo",
    time: "3 giờ trước",
    read: true,
  },
  {
    id: 6,
    type: "info",
    title: "Nhà cung cấp mới",
    message: "Công ty ABC đã đăng ký làm nhà cung cấp",
    time: "5 giờ trước",
    read: true,
  },
]

export function NotificationsPage() {
  return (
    <div className="p-8 space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Tổng thông báo</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-card-foreground">248</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Chưa đọc</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-card-foreground">24</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Hôm nay</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-card-foreground">12</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Quan trọng</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-card-foreground">5</div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-card-foreground">Tất cả thông báo</CardTitle>
            <div className="flex items-center gap-2">
              <button className="flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-4 text-sm font-medium text-foreground hover:bg-accent">
                <Check className="h-4 w-4" />
                Đánh dấu đã đọc
              </button>
              <button className="flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-4 text-sm font-medium text-foreground hover:bg-accent">
                <Trash2 className="h-4 w-4" />
                Xóa tất cả
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-4 rounded-lg border border-border p-4 transition-colors ${
                  notification.read ? "bg-card" : "bg-accent/30"
                }`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    notification.type === "success"
                      ? "bg-green-primary/10"
                      : notification.type === "warning"
                        ? "bg-yellow-primary/10"
                        : notification.type === "error"
                          ? "bg-red-primary/10"
                          : "bg-green-secondary/10"
                  }`}
                >
                  {notification.type === "success" && <CheckCircle className="h-5 w-5 text-green-primary" />}
                  {notification.type === "warning" && <AlertCircle className="h-5 w-5 text-yellow-primary" />}
                  {notification.type === "error" && <XCircle className="h-5 w-5 text-red-primary" />}
                  {notification.type === "info" && <Info className="h-5 w-5 text-green-secondary" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-card-foreground">{notification.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <button className="rounded-lg p-2 hover:bg-accent">
                          <Check className="h-4 w-4 text-muted-foreground" />
                        </button>
                      )}
                      <button className="rounded-lg p-2 hover:bg-accent">
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
