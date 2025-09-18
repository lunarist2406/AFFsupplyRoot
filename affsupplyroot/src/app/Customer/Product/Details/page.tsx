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
          }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Link href="/" className="text-yellow-300 text-sm hover:text-yellow-200">Trang chủ</Link>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span className="text-yellow-300 text-sm">Lương thực</span>
              </div>
              
              {/* Action Icons */}
              <div className="flex items-center gap-2 border border-yellow-300/30 rounded-lg p-2">
                <Button variant="ghost" size="icon" className="text-yellow-400 hover:bg-yellow-400/10 h-10 w-10">
                  <ShoppingBag className="h-6 w-6 text-yellow-400" />
                </Button>
                <Button variant="ghost" size="icon" className="text-yellow-400 hover:bg-yellow-400/10 h-10 w-10">
                  <Bell className="h-6 w-6 text-yellow-400" />
                </Button>
                <Button variant="ghost" size="icon" className="text-yellow-400 hover:bg-yellow-400/10 h-10 w-10">
                  <MessageCircle className="h-6 w-6 text-yellow-400" />
                </Button>
                <Button variant="ghost" size="icon" className="text-yellow-400 hover:bg-yellow-400/10 h-10 w-10">
                  <Folder className="h-6 w-6 text-yellow-400" />
                </Button>
                <Button variant="ghost" size="icon" className="text-yellow-400 hover:bg-yellow-400/10 h-10 w-10">
                  <User className="h-6 w-6 text-yellow-400" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-4" style={{ 
            background: 'linear-gradient(180deg, #353D39 4%, #7E8C7C 55%, #353D39 95%)',
          }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
              <div>
                <ProductGallery />
              </div>
              
              <div>
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