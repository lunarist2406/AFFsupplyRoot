/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getProfile } from "@/services/profile"
import { toast } from "sonner"
import { ArrowLeft, Mail, AlertTriangle } from "lucide-react"
import api from "@/lib/Axios/axios"

export default function ChangeEmailPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [pageLoading, setPageLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile()
        setProfile(res.data)
      } catch (error) {
        console.error("Error fetching profile:", error)
        toast.error("Không thể tải thông tin profile")
      } finally {
        setPageLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleStartChangeEmail = async () => {
    setLoading(true)
    try {
      await api.get("/api/v1/profile/change-email")
      toast.success("Đã gửi mã OTP đến email của bạn!")
      router.push("/account/profile/verify-otp-email")
    } catch (error: any) {
      console.error("Error sending OTP:", error)
      toast.error(error.response?.data?.message || "Có lỗi xảy ra khi gửi OTP")
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

  // Kiểm tra tài khoản liên kết
  if (profile?.oauthProvider && profile.oauthProvider !== "local") {
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
          <h1 className="text-2xl font-bold text-gray-900">Đổi Email</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-orange-500" />
              Không thể đổi email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <p className="font-medium mb-2">Tài khoản của bạn được liên kết với {profile.oauthProvider}</p>
                <p>
                  Để đổi email, bạn cần thực hiện thao tác này trực tiếp trên tài khoản {profile.oauthProvider} của mình.
                  Sau khi đổi email trên {profile.oauthProvider}, email mới sẽ tự động cập nhật trên hệ thống.
                </p>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
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
        <h1 className="text-2xl font-bold text-gray-900">Đổi Email</h1>
        <p className="text-gray-600 mt-2">Để đổi email, chúng tôi cần xác minh danh tính của bạn</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-orange-500" />
            Xác thực email hiện tại
          </CardTitle>
          <CardDescription>
            Chúng tôi sẽ gửi mã OTP đến email hiện tại của bạn: <strong>{profile?.email}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Quy trình đổi email:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
              <li>Nhận mã OTP tại email hiện tại</li>
              <li>Xác thực OTP để xác minh danh tính</li>
              <li>Nhập email mới và xác nhận</li>
            </ol>
          </div>

          <Button
            onClick={handleStartChangeEmail}
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Đang gửi OTP...
              </div>
            ) : (
              "Gửi mã OTP"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
