"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, Bell, Shield, Database, Mail, Palette } from "lucide-react"

export function SettingsPage() {
  return (
    <div className="p-8 space-y-6">
      {/* Settings Categories */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* General Settings */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-primary/10">
                <Settings className="h-5 w-5 text-green-primary" />
              </div>
              <div>
                <CardTitle className="text-card-foreground">Cài đặt chung</CardTitle>
                <CardDescription className="text-muted-foreground">Cấu hình cơ bản hệ thống</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-card-foreground">Tên hệ thống</p>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
              <button className="text-sm text-green-primary hover:underline">Chỉnh sửa</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-card-foreground">Múi giờ</p>
                <p className="text-xs text-muted-foreground">GMT+7 (Hà Nội)</p>
              </div>
              <button className="text-sm text-green-primary hover:underline">Chỉnh sửa</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-card-foreground">Ngôn ngữ</p>
                <p className="text-xs text-muted-foreground">Tiếng Việt</p>
              </div>
              <button className="text-sm text-green-primary hover:underline">Chỉnh sửa</button>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-secondary/10">
                <Palette className="h-5 w-5 text-yellow-secondary" />
              </div>
              <div>
                <CardTitle className="text-card-foreground">Giao diện</CardTitle>
                <CardDescription className="text-muted-foreground">Tùy chỉnh giao diện hệ thống</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-card-foreground">Chế độ tối</p>
                <p className="text-xs text-muted-foreground">Bật chế độ tối cho giao diện</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-card-foreground">Màu chủ đạo</p>
                <p className="text-xs text-muted-foreground">Xanh lá</p>
              </div>
              <button className="text-sm text-green-primary hover:underline">Chỉnh sửa</button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-secondary/10">
                <Bell className="h-5 w-5 text-green-secondary" />
              </div>
              <div>
                <CardTitle className="text-card-foreground">Thông báo</CardTitle>
                <CardDescription className="text-muted-foreground">Quản lý thông báo hệ thống</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-card-foreground">Thông báo email</p>
                <p className="text-xs text-muted-foreground">Nhận thông báo qua email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-card-foreground">Thông báo push</p>
                <p className="text-xs text-muted-foreground">Nhận thông báo trên trình duyệt</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-primary"></div>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-primary/10">
                <Shield className="h-5 w-5 text-yellow-primary" />
              </div>
              <div>
                <CardTitle className="text-card-foreground">Bảo mật</CardTitle>
                <CardDescription className="text-muted-foreground">Cài đặt bảo mật hệ thống</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-card-foreground">Xác thực 2 yếu tố</p>
                <p className="text-xs text-muted-foreground">Bật xác thực 2 lớp</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-card-foreground">Đổi mật khẩu</p>
                <p className="text-xs text-muted-foreground">Cập nhật mật khẩu</p>
              </div>
              <button className="text-sm text-green-primary hover:underline">Thay đổi</button>
            </div>
          </CardContent>
        </Card>

        {/* Database */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-primary/10">
                <Database className="h-5 w-5 text-green-primary" />
              </div>
              <div>
                <CardTitle className="text-card-foreground">Cơ sở dữ liệu</CardTitle>
                <CardDescription className="text-muted-foreground">Quản lý dữ liệu hệ thống</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-card-foreground">Sao lưu tự động</p>
                <p className="text-xs text-muted-foreground">Hàng ngày lúc 2:00 AM</p>
              </div>
              <button className="text-sm text-green-primary hover:underline">Cấu hình</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-card-foreground">Sao lưu thủ công</p>
                <p className="text-xs text-muted-foreground">Tạo bản sao lưu ngay</p>
              </div>
              <button className="rounded-lg bg-green-primary px-4 py-2 text-sm font-medium text-white hover:bg-green-primary/90">
                Sao lưu
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Email */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-secondary/10">
                <Mail className="h-5 w-5 text-yellow-secondary" />
              </div>
              <div>
                <CardTitle className="text-card-foreground">Email</CardTitle>
                <CardDescription className="text-muted-foreground">Cấu hình email hệ thống</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-card-foreground">SMTP Server</p>
                <p className="text-xs text-muted-foreground">smtp.gmail.com</p>
              </div>
              <button className="text-sm text-green-primary hover:underline">Chỉnh sửa</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-card-foreground">Email gửi</p>
                <p className="text-xs text-muted-foreground">noreply@admin.com</p>
              </div>
              <button className="text-sm text-green-primary hover:underline">Chỉnh sửa</button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
