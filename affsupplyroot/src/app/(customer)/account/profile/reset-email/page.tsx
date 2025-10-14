/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getProfile } from "@/services/profile"
import { toast } from "sonner"
import { ArrowLeft, Mail, CheckCircle } from "lucide-react"
import api from "@/lib/Axios/axios"

export default function ResetEmailPage() {
  const router = useRouter()
  const [newEmail, setNewEmail] = useState("")
  const [confirmEmail, setConfirmEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [currentEmail, setCurrentEmail] = useState("")
  const [pageLoading, setPageLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile()
        setCurrentEmail(res.data.email)
      } catch (error) {
        console.error("Error fetching profile:", error)
        toast.error("Không thể tải thông tin profile")
      } finally {
        setPageLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleResetEmail = async () => {
    // Validation
    if (!newEmail || !confirmEmail) {
      toast.error("Vui lòng nhập đầy đủ thông tin")
      return
    }

    if (!validateEmail(newEmail)) {
      toast.error("Email không hợp lệ")
      return
    }

    if (newEmail !== confirmEmail) {
      toast.error("Email xác nhận không khớp")
      return
    }

    if (newEmail === currentEmail) {
      toast.error("Email mới phải khác email hiện tại")
      return
    }

    setLoading(true)
    try {
      await api.post("/api/v1/profile/reset-email", { email: newEmail })
      toast.success("Đổi email thành công!")
      router.push("/account/profile?emailChanged=true")
    } catch (error: any) {
      console.error("Error resetting email:", error)
      toast.error(error.response?.data?.message || "Có lỗi xảy ra khi đổi email")
    } finally {
      setLoading(false)
    }
  }

  if (pageLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Đang tải...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Nhập email mới</h1>
        <p className="text-gray-600 mt-2">Nhập email mới mà bạn muốn sử dụng</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-orange-500" />
            Thông tin email
          </CardTitle>
          <CardDescription>
            Email hiện tại: <strong>{currentEmail}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="newEmail" className="block text-sm font-medium text-gray-700 mb-2">
              Email mới
            </label>
            <Input
              id="newEmail"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Nhập email mới"
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="confirmEmail" className="block text-sm font-medium text-gray-700 mb-2">
              Xác nhận email mới
            </label>
            <Input
              id="confirmEmail"
              type="email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              placeholder="Nhập lại email mới"
              className="w-full"
            />
          </div>

          {newEmail && confirmEmail && newEmail === confirmEmail && validateEmail(newEmail) && newEmail !== currentEmail && (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <CheckCircle className="h-4 w-4" />
              Email hợp lệ và sẵn sàng để cập nhật
            </div>
          )}

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Lưu ý:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
              <li>Email mới sẽ được sử dụng để đăng nhập vào tài khoản</li>
              <li>Bạn sẽ cần xác thực email mới khi đăng nhập lần đầu</li>
              <li>Email cũ sẽ không còn được sử dụng cho tài khoản này</li>
            </ul>
          </div>

          <Button
            onClick={handleResetEmail}
            disabled={loading || !newEmail || !confirmEmail || newEmail !== confirmEmail || !validateEmail(newEmail) || newEmail === currentEmail}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Đang cập nhật...
              </div>
            ) : (
              "Cập nhật email"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
