import Footer from '@/layout/Footer'
import Header from '@/layout/Header'
import React from 'react'

export default function HomePageView() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Nội dung chính chiếm toàn bộ khoảng trống còn lại */}
      <main className="flex-1">
        {/* Content của bạn để ở đây */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
