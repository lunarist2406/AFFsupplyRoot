"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  Users,
  Building2,
  Bell,
  Settings,
  FileText,
  UserCircle,
  Activity,
} from "lucide-react"


// Import các component pages
import { AdminDashboard } from "./components/admin-dashboard"
import { UsersPage } from "./components/users-page"
import { SuppliersPage } from "./components/suppliers-page"
import { ReportsPage } from "./components/reports-page"
import { NotificationsPage } from "./components/notifications-page"
import { SettingsPage } from "./components/settings-page"
import { AccountPage } from "./components/account-page"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "Người dùng", active: false },
  { icon: Building2, label: "Nhà cung cấp", active: false },
  { icon: FileText, label: "Báo cáo", active: false },
  { icon: Bell, label: "Thông báo", active: false },
  { icon: Settings, label: "Cài đặt", active: false },
  { icon: UserCircle, label: "Tài khoản", active: false },
]

export default function AdminPage() {
  const [activeNav, setActiveNav] = useState("Dashboard")
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-sidebar-border bg-sidebar">
        <div className="flex h-16 items-center border-b border-sidebar-border px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-primary">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-sidebar-foreground">Admin Panel</span>
          </div>
        </div>

        <nav className="space-y-1 p-4">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveNav(item.label)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                activeNav === item.label
                  ? "bg-green-primary/10 text-green-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <div className="flex h-16 items-center justify-between px-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {activeNav === "Dashboard" && "Dashboard"}
                {activeNav === "Người dùng" && "Quản lý người dùng"}
                {activeNav === "Nhà cung cấp" && "Quản lý nhà cung cấp"}
                {activeNav === "Báo cáo" && "Báo cáo & Thống kê"}
                {activeNav === "Thông báo" && "Quản lý thông báo"}
                {activeNav === "Cài đặt" && "Cài đặt hệ thống"}
                {activeNav === "Tài khoản" && "Tài khoản"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {activeNav === "Dashboard" && "Tổng quan hệ thống quản trị"}
                {activeNav === "Người dùng" && "Quản lý và theo dõi người dùng"}
                {activeNav === "Nhà cung cấp" && "Quản lý nhà cung cấp và sản phẩm"}
                {activeNav === "Báo cáo" && "Phân tích hiệu suất và doanh thu"}
                {activeNav === "Thông báo" && "Gửi và quản lý thông báo"}
                {activeNav === "Cài đặt" && "Cấu hình hệ thống"}
                {activeNav === "Tài khoản" && "Quản lý tài khoản admin"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative rounded-lg p-2 hover:bg-accent">
                <Bell className="h-5 w-5 text-foreground" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-primary"></span>
              </button>
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-green-primary/20 flex items-center justify-center">
                  <UserCircle className="h-6 w-6 text-green-primary" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="p-8 space-y-8">
          {activeNav === "Dashboard" && <AdminDashboard />}
          {activeNav === "Người dùng" && <UsersPage />}
          {activeNav === "Nhà cung cấp" && <SuppliersPage />}
          {activeNav === "Báo cáo" && <ReportsPage />}
          {activeNav === "Thông báo" && <NotificationsPage />}
          {activeNav === "Cài đặt" && <SettingsPage />}
          {activeNav === "Tài khoản" && <AccountPage />}
        </div>
      </main>
    </div>
  )
}
