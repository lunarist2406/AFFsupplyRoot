"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Users,
  Building2,
  Bell,
  TrendingUp,
  TrendingDown,
  Activity,
  FileText,
  Settings,
} from "lucide-react"
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Fake data cho biểu đồ người dùng theo tháng
const monthlyUserData = [
  { month: "T1", users: 1200, suppliers: 45 },
  { month: "T2", users: 1450, suppliers: 52 },
  { month: "T3", users: 1680, suppliers: 58 },
  { month: "T4", users: 1920, suppliers: 65 },
  { month: "T5", users: 2150, suppliers: 71 },
  { month: "T6", users: 2480, suppliers: 78 },
  { month: "T7", users: 2750, suppliers: 85 },
  { month: "T8", users: 3020, suppliers: 92 },
  { month: "T9", users: 3350, suppliers: 98 },
  { month: "T10", users: 3680, suppliers: 105 },
  { month: "T11", users: 4020, suppliers: 112 },
  { month: "T12", users: 4500, suppliers: 120 },
]

// Fake data cho biểu đồ người dùng theo ngày (30 ngày gần nhất)
const dailyUserData = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  users: Math.floor(Math.random() * 200) + 100,
  active: Math.floor(Math.random() * 150) + 50,
}))

export function AdminDashboard() {
  return (
    <>
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Tổng người dùng</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-card-foreground">4,500</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-primary" />
              <span className="text-green-primary">+12.5%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Tổng nhà cung cấp</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-card-foreground">120</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-primary" />
              <span className="text-green-primary">+7.1%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Người dùng hoạt động</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-card-foreground">3,240</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-primary" />
              <span className="text-green-primary">+18.2%</span> so với tuần trước
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Thông báo mới</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-card-foreground">24</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingDown className="h-3 w-3 text-red-primary" />
              <span className="text-red-primary">-5.4%</span> so với hôm qua
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Users Chart */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Người dùng theo tháng</CardTitle>
            <CardDescription className="text-muted-foreground">
              Thống kê người dùng và nhà cung cấp trong 12 tháng
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                users: {
                  label: "Người dùng",
                  color: "#1F8505",
                },
                suppliers: {
                  label: "Nhà cung cấp",
                  color: "#EFB008",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyUserData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#1F8505"
                    strokeWidth={2}
                    dot={{ fill: "#1F8505", r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="suppliers"
                    stroke="#EFB008"
                    strokeWidth={2}
                    dot={{ fill: "#EFB008", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Daily Active Users Chart */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Hoạt động hàng ngày</CardTitle>
            <CardDescription className="text-muted-foreground">
              Người dùng mới và người dùng hoạt động trong 30 ngày
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                users: {
                  label: "Người dùng mới",
                  color: "#12825F",
                },
                active: {
                  label: "Đang hoạt động",
                  color: "#FFD54F",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyUserData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="users" fill="#12825F" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="active" fill="#FFD54F" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Hoạt động gần đây</CardTitle>
          <CardDescription className="text-muted-foreground">Các hoạt động mới nhất trong hệ thống</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { user: "Nguyễn Văn A", action: "đã đăng ký tài khoản mới", time: "5 phút trước", type: "user" },
              {
                user: "Công ty ABC",
                action: "đã cập nhật thông tin nhà cung cấp",
                time: "15 phút trước",
                type: "supplier",
              },
              { user: "Trần Thị B", action: "đã tạo báo cáo mới", time: "1 giờ trước", type: "report" },
              { user: "Admin", action: "đã thay đổi cài đặt hệ thống", time: "2 giờ trước", type: "settings" },
              {
                user: "Lê Văn C",
                action: "đã gửi thông báo đến 120 người dùng",
                time: "3 giờ trước",
                type: "notification",
              },
            ].map((activity, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-lg border border-border p-4 hover:bg-accent/50 transition-colors"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    activity.type === "user"
                      ? "bg-green-primary/20"
                      : activity.type === "supplier"
                        ? "bg-yellow-secondary/20"
                        : activity.type === "report"
                          ? "bg-green-secondary/20"
                          : activity.type === "settings"
                            ? "bg-yellow-primary/20"
                            : "bg-green-primary/20"
                  }`}
                >
                  {activity.type === "user" && <Users className="h-5 w-5 text-green-primary" />}
                  {activity.type === "supplier" && <Building2 className="h-5 w-5 text-yellow-secondary" />}
                  {activity.type === "report" && <FileText className="h-5 w-5 text-green-secondary" />}
                  {activity.type === "settings" && <Settings className="h-5 w-5 text-yellow-primary" />}
                  {activity.type === "notification" && <Bell className="h-5 w-5 text-green-primary" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-card-foreground">
                    <span className="font-semibold">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}