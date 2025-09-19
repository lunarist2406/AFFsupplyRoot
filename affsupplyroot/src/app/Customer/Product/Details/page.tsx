"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ProductSidebar } from "../ProductSidebar"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  ShoppingBag, 
  Bell,
  MessageCircle, 
  Folder, 
  User,
  ChevronRight
} from "lucide-react"

// Ant Design CSS
import 'antd/dist/reset.css'
import { ProductGallery } from "./ProductGallery"
import { ProductInfo } from "./ProductInfo"
import { RelatedProducts } from "./RelatedProducts"

export default function ProductDetailsPage() {
  return (
    <SidebarProvider>
      <ProductSidebar />
      
      <SidebarInset>
        <div className="flex flex-1 flex-col">
          <div style={{ 
            background: 'linear-gradient(180deg, #353D39 100%, #7E8C7C 100%, #353D39 5%)',
            padding: '12px' 
          }} className="p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <Link href="/" className="text-yellow-primary text-sm hover:text-yellow-secondary">Trang chủ</Link>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span className="text-yellow-primary text-sm">Lương thực</span>
              </div>
              
              {/* Action Icons */}
              <div className="flex items-center gap-1 sm:gap-2 border border-yellow-primary/30 rounded-lg p-1 sm:p-2">
                <Button variant="ghost" size="icon" className="text-yellow-primary hover:bg-yellow-primary/10 h-8 w-8 sm:h-10 sm:w-10">
                  <ShoppingBag className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-primary" />
                </Button>
                <Button variant="ghost" size="icon" className="text-yellow-primary hover:bg-yellow-primary/10 h-8 w-8 sm:h-10 sm:w-10">
                  <Bell className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-primary" />
                </Button>
                <Button variant="ghost" size="icon" className="text-yellow-primary hover:bg-yellow-primary/10 h-8 w-8 sm:h-10 sm:w-10">
                  <MessageCircle className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-primary" />
                </Button>
                <Button variant="ghost" size="icon" className="text-yellow-primary hover:bg-yellow-primary/10 h-8 w-8 sm:h-10 sm:w-10">
                  <Folder className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-primary" />
                </Button>
                <Button variant="ghost" size="icon" className="text-yellow-primary hover:bg-yellow-primary/10 h-8 w-8 sm:h-10 sm:w-10">
                  <User className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-primary" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-3 sm:p-2 lg:p-4" style={{ 
            background: 'linear-gradient(180deg, #353D39 4%, #7E8C7C 55%, #353D39 95%)',
          }}>
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-3 lg:gap-3 mb-6">
              <div className="lg:col-span-4">
                <ProductGallery />
              </div>
              
              <div className="lg:col-span-6">
                <ProductInfo />
              </div>
            </div>
            
            <RelatedProducts />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}