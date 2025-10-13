"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserCircle, Mail, Phone, MapPin, Calendar, Shield, Key, LogOut } from "lucide-react"

export function AccountPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="bg-card border-border lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-primary/10 mb-4">
                <UserCircle className="h-16 w-16 text-green-primary" />
              </div>
              <h2 className="text-2xl font-bold text-card-foreground">Admin User</h2>
              <p className="text-sm text-muted-foreground mt-1">admin@system.com</p>
              <div className="mt-4 flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-green-primary/10 px-3 py-1 text-xs font-medium text-green-primary">
                  Super Admin
                </span>
              </div>
              <button className="mt-6 w-full rounded-lg bg-green-primary px-4 py-2 text-sm font-medium text-white hover:bg-green-primary/90">
                Chỉnh sửa hồ sơ
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-card-foreground">Thông tin tài khoản</CardTitle>
            <CardDescription className="text-muted-foreground">Thông tin chi tiết về tài khoản của bạn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">Họ và tên</label>
                <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
                  <UserCircle className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-foreground">Admin User</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">Email</label>
                <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-foreground">admin@system.com</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">Số điện thoại</label>
                <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-foreground">+84 901 234 567</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">Địa chỉ</label>
                <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-foreground">Hà Nội, Việt Nam</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">Ngày tham gia</label>
                <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-foreground">01/01/2024</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">Vai trò</label>
                <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-foreground">Super Admin</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Settings */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Bảo mật</CardTitle>
          <CardDescription className="text-muted-foreground">Quản lý cài đặt bảo mật tài khoản</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-primary/10">
                <Key className="h-6 w-6 text-green-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-card-foreground">Mật khẩu</p>
                <p className="text-xs text-muted-foreground">Thay đổi mật khẩu của bạn</p>
              </div>
            </div>
            <button className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">
              Đổi mật khẩu
            </button>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-secondary/10">
                <Shield className="h-6 w-6 text-yellow-secondary" />
              </div>
              <div>
                <p className="text-sm font-medium text-card-foreground">Xác thực 2 yếu tố</p>
                <p className="text-xs text-muted-foreground">Bảo vệ tài khoản với xác thực 2 lớp</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-primary/10">
                <LogOut className="h-6 w-6 text-red-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-card-foreground">Đăng xuất khỏi tất cả thiết bị</p>
                <p className="text-xs text-muted-foreground">Đăng xuất khỏi tất cả các phiên đăng nhập</p>
              </div>
            </div>
            <button className="rounded-lg border border-red-primary bg-red-primary/10 px-4 py-2 text-sm font-medium text-red-primary hover:bg-red-primary/20">
              Đăng xuất
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Activity Log */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Hoạt động gần đây</CardTitle>
          <CardDescription className="text-muted-foreground">Lịch sử hoạt động của tài khoản</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "Đăng nhập", device: "Chrome on Windows", time: "5 phút trước", location: "Hà Nội, VN" },
              { action: "Thay đổi cài đặt", device: "Chrome on Windows", time: "2 giờ trước", location: "Hà Nội, VN" },
              { action: "Đăng nhập", device: "Safari on iPhone", time: "1 ngày trước", location: "Hà Nội, VN" },
              { action: "Đổi mật khẩu", device: "Chrome on Windows", time: "3 ngày trước", location: "Hà Nội, VN" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="text-sm font-medium text-card-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.device} • {activity.location}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
