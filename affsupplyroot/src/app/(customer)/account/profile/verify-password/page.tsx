"use client"

import { useRouter } from "next/navigation"
import { getProfile } from "@/services/profile"
import { useState, useEffect } from "react"

export default function VerifyPasswordPage() {
  const router = useRouter()
  const [currentEmail, setCurrentEmail] = useState("")
  const [pageLoading, setPageLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile()
        setCurrentEmail(res.data.email)
      } catch {
        console.error("Không thể tải thông tin profile")
      } finally {
        setPageLoading(false)
      }
    }
    
    fetchProfile()
  }, [])

  const handleVerifyPassword = () => {
    router.push("/account/profile/change-password")
  }

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
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="text-center mb-8">
          <p className="text-gray-700">
            Để đổi mật khẩu, bạn cần xác minh danh tính bằng mật khẩu hiện tại.
          </p>
        </div>

        <div className="text-center mb-6">
          <p className="text-sm text-gray-600">
            Tài khoản: <span className="font-medium">{currentEmail}</span>
          </p>
        </div>

        <button
          onClick={handleVerifyPassword}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-md flex items-center justify-center gap-3 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Xác minh bằng mật khẩu
        </button>

        <div className="mt-6 text-center">
          <button
            onClick={() => router.back()}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            ← Quay lại
          </button>
        </div>
      </div>
    </div>
  )
}
