"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { verifyOtp, resendOtp, getProfile } from "@/services/profile"
import { Button } from "@/components/ui/button"
import OtpInput from "../OtpInput"
import { toast } from "sonner"

export default function VerifyOtpPasswordPage() {
  const router = useRouter()
  const [currentEmail, setCurrentEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [countdown, setCountdown] = useState(0)
  const [pageLoading, setPageLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile()
        setCurrentEmail(res.data.email)
      } catch {
        setError("Không thể tải thông tin profile")
      } finally {
        setPageLoading(false)
      }
    }
    
    fetchProfile()
  }, [])

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setError("Vui lòng nhập đầy đủ mã OTP 6 chữ số")
      return
    }
    
    setLoading(true)
    setError(null)
    
    try {
      // Xác thực OTP
      await verifyOtp({ email: currentEmail, otp })
      toast.success("Xác thực OTP thành công!")
      
      // Thành công - chuyển sang trang đổi mật khẩu
      router.push("/account/profile/change-password")
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as { response: { data: { message: string } } }).response?.data?.message 
        : "Mã OTP không hợp lệ"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async () => {
    if (countdown > 0) return
    
    setLoading(true)
    setError(null)
    
    try {
      await resendOtp({ email: currentEmail })
      toast.success("Đã gửi lại mã OTP!")
      setCountdown(60)
      
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as { response: { data: { message: string } } }).response?.data?.message 
        : "Không thể gửi lại OTP"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const maskedEmail = currentEmail.replace(/(.{3}).*(@.*)/, "$1****$2")

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8">
        

        <button
          onClick={() => router.back()}
          className="mb-6 text-red-500 hover:text-red-600"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-6">Nhập mã xác nhận</h1>

        {/* Email Notification */}
        <div className="text-center mb-8">
          <p className="text-gray-700">
            Mã xác minh đã được gửi đến Email{" "}
            <span className="font-medium">{maskedEmail}</span>
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* OTP Input */}
        <div className="mb-8">
          <OtpInput
            value={otp}
            onChangeAction={setOtp}
            length={6}
            disabled={loading}
          />
        </div>

        {/* Resend Timer */}
        <div className="text-center mb-8">
          {countdown > 0 ? (
            <p className="text-gray-500 text-sm">
              Vui lòng chờ {countdown} giây để gửi lại.
            </p>
          ) : (
            <p className="text-gray-500 text-sm">
              Bạn vẫn chưa nhận được?{" "}
              <button
                onClick={handleResendOtp}
                disabled={loading}
                className="text-red-500 hover:text-red-600 font-medium"
              >
                Gửi lại
              </button>
            </p>
          )}
        </div>

        {/* Next Button */}
        <Button
          onClick={handleVerifyOtp}
          disabled={loading || otp.length !== 6}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-md text-lg"
        >
          {loading ? "Đang xác thực..." : "TIẾP TỤC"}
        </Button>
      </div>
    </div>
  )
}
