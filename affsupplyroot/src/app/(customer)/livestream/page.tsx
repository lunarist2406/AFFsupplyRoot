"use client"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { LivestreamContent } from "./LivestreamContent"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"
import { 
  Search, 
  Filter, 
  ShoppingBag, 
  Bell, 
  MessageCircle, 
  Folder, 
  User,
  ChevronRight,
  ChevronDown,
  Menu
} from "lucide-react"
import { ProductSidebar } from "../products/ProductSidebar"

export default function LivestreamPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("all")
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const sortOptions = [
    { value: "all", label: "Tất cả" },
    { value: "rice", label: "Gạo" },
    { value: "vegetables", label: "Rau củ" },
    { value: "fruits", label: "Trái cây" },
    { value: "meat", label: "Thịt cá" },
    { value: "dairy", label: "Sữa & trứng" }
  ]

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const handleSortSelect = (value: string) => {
    setSortBy(value)
    setShowSortDropdown(false)
  }

  const getSortText = () => {
    const option = sortOptions.find(opt => opt.value === sortBy)
    return option ? option.label : "Tất cả"
  }

  return (
    <SidebarProvider>
      <ProductSidebar 
        isMobileMenuOpen={isMobileSidebarOpen}
        setIsMobileMenuOpen={setIsMobileSidebarOpen}
      />
      
      <SidebarInset>
        <div className="flex flex-1 flex-col font-manuale">
          <div style={{ 
            background: 'linear-gradient(180deg, #353D39 4%, #7E8C7C 55%, #353D39 95%)',
            padding: '12px' 
          }} className="p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-5 gap-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <Button
                  onClick={() => setIsMobileSidebarOpen(true)}
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-yellow-300 hover:bg-yellow-300/10 h-8 w-8 mr-2"
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <Link href="/" className="text-yellow-300 text-sm hover:text-yellow-200">Trang chủ</Link>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span className="text-yellow-300 text-sm">Livestreams</span>
              </div>
              
              <div className="flex items-center gap-1 sm:gap-2 border border-yellow-300/30 rounded-lg p-1 sm:p-2">
                <Button variant="ghost" size="icon" className="text-yellow-400 hover:bg-yellow-400/10 h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10">
                  <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6 text-yellow-400" />
                </Button>
                <Button variant="ghost" size="icon" className="text-yellow-400 hover:bg-yellow-400/10 h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10">
                  <Bell className="h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6 text-yellow-400" />
                </Button>
                <Button variant="ghost" size="icon" className="text-yellow-400 hover:bg-yellow-400/10 h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10">
                  <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6 text-yellow-400" />
                </Button>
                <Button variant="ghost" size="icon" className="text-yellow-400 hover:bg-yellow-400/10 h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10">
                  <Folder className="h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6 text-yellow-400" />
                </Button>
                <Button variant="ghost" size="icon" className="text-yellow-400 hover:bg-yellow-400/10 h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10">
                  <User className="h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6 text-yellow-400" />
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="w-full sm:flex-1 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="Tìm kiếm livestream"
                  className="pr-12 pl-4 bg-white/95 border border-gray-200 rounded-lg h-9 text-gray-700 placeholder:text-gray-500 text-sm focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              
              <div className="relative w-full sm:w-auto">
                <Button 
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="bg-[#FFD54F] hover:bg-[#FACC15] text-black rounded-lg h-9 px-3 sm:px-4 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <Filter className="h-4 w-4" />
                  {getSortText()}
                  <ChevronDown className="h-4 w-4" />
                </Button>
                
                {showSortDropdown && (
                  <div className="absolute top-full right-0 mt-1 w-full sm:w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSortSelect(option.value)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                          sortBy === option.value ? 'bg-yellow-50 text-yellow-600' : 'text-gray-700'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <LivestreamContent searchTerm={searchTerm} sortBy={sortBy} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
