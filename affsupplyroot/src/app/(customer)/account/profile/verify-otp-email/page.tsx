/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getProfile } from "@/services/profile"
import { toast } from "sonner"
import { ArrowLeft, Mail, Clock } from "lucide-react"
import api from "@/lib/Axios/axios"

export default function VerifyOtpEmailPage() {
  const router = useRouter()
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [countdown, setCountdown] = useState(60)
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

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Vui lòng nhập đầy đủ 6 số OTP")
      return
    }

    setLoading(true)
    try {
      await api.post("/api/v1/profile/verify-otp-email", { otp })
      toast.success("Xác thực OTP thành công!")
      router.push("/account/profile/reset-email")
    } catch (error: any) {
      console.error("Error verifying OTP:", error)
      toast.error(error.response?.data?.message || "Mã OTP không đúng")
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async () => {
    if (countdown > 0) {
      toast.error(`Vui lòng chờ ${countdown} giây trước khi gửi lại`)
      return
    }

    setResendLoading(true)
    try {
      await api.post("/api/v1/profile/resend-otp-email")
      toast.success("Đã gửi lại mã OTP!")
      setCountdown(60)
    } catch (error: any) {
      console.error("Error resending OTP:", error)
      toast.error(error.response?.data?.message || "Có lỗi xảy ra khi gửi lại OTP")
    } finally {
      setResendLoading(false)
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
        <h1 className="text-2xl font-bold text-gray-900">Xác thực OTP</h1>
        <p className="text-gray-600 mt-2">Nhập mã OTP đã gửi đến email của bạn</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-orange-500" />
            Nhập mã OTP
          </CardTitle>
          <CardDescription>
            Mã OTP đã được gửi đến: <strong>{currentEmail}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
              Mã OTP (6 số)
            </label>
            <Input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="Nhập mã OTP"
              className="text-center text-lg tracking-widest"
              maxLength={6}
            />
          </div>

          <Button
            onClick={handleVerifyOtp}
            disabled={loading || otp.length !== 6}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Đang xác thực...
              </div>
            ) : (
              "Xác thực OTP"
            )}
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              Không nhận được mã OTP?
            </p>
            <Button
              onClick={handleResendOtp}
              disabled={resendLoading || countdown > 0}
              variant="outline"
              className="text-orange-600 border-orange-300 hover:bg-orange-50"
            >
              {resendLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
                  Đang gửi...
                </div>
              ) : countdown > 0 ? (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Gửi lại sau {countdown}s
                </div>
              ) : (
                "Gửi lại mã OTP"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
