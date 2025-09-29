import Footer from '@/layout/Footer'
import Header from '@/layout/Header'
import React from 'react'
import { SupportServices } from './components/SupportService'
import { BannerSection } from './components/Banner'
import { CategoryProduct } from './components/CategoryProduct'
import { FeaturedProducts } from './components/HighLightProduct'

export default function HomePageView() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}

      {/* Nội dung chính chiếm toàn bộ khoảng trống còn lại */}
      <main className="flex-1 bg-gradient-to-r from-green-950 via-gray-600 to-green-950">
        
       <BannerSection/>
       <CategoryProduct/>
       <FeaturedProducts/>
       <SupportServices/>
      </main>

      {/* Footer */}
    </div>
  )
}
