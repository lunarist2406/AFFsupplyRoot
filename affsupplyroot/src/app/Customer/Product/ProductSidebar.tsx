"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { 
  Home, 
  List, 
  FileText, 
  Package, 
  Eye, 
  CreditCard, 
  Star, 
  User,
  ChevronDown,
  Leaf
} from "lucide-react"

const menuItems = [
  {
    title: "Trang chủ",
    url: "/",
    icon: Home,
    active: true,
  },
  {
    title: "Danh mục sản phẩm",
    url: "/categories",
    icon: List,
    hasSubmenu: true,
  },
  {
    title: "Chính sách",
    url: "/policies",
    icon: FileText,
    hasSubmenu: true,
  },
  {
    title: "Đơn hàng của tôi",
    url: "/orders",
    icon: Package,
  },
  {
    title: "Theo dõi giao hàng",
    url: "/tracking",
    icon: Eye,
  },
  {
    title: "Thanh toán",
    url: "/payment",
    icon: CreditCard,
  },
  {
    title: "Đánh giá & phản hồi",
    url: "/reviews",
    icon: Star,
  },
  {
    title: "Thông tin cá nhân",
    url: "/profile",
    icon: User,
  },
]

export function ProductSidebar() {
  const { state } = useSidebar()
  
  return (
    <Sidebar 
      side="left"
      variant="sidebar"
      collapsible="icon"
      className="border-r-0 h-screen [&>*]:!bg-transparent [&>*]:!text-white"
      style={{ 
        background: 'linear-gradient(180deg, #353D39 4%, #7E8C7C 55%, #353D39 95%)',
      } as React.CSSProperties}
    >
      <SidebarHeader className="p-4">
        {state === "expanded" ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Leaf className="h-5 w-5 text-green-300" />
              <span className="font-semibold text-lg text-yellow-400">AFF supplyRoot</span>
            </div>
            <SidebarTrigger 
              className="text-white hover:bg-white/10"
              variant="ghost"
              size="icon"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Leaf className="h-8 w-8 text-green-300" />
            <SidebarTrigger 
              className="text-white hover:bg-white/10"
              variant="ghost"
              size="icon"
            />
          </div>
        )}
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={item.active}
                    variant="default"
                    size="default"
                    className="text-white hover:bg-white/10 data-[active=true]:bg-white/20 data-[active=true]:text-yellow-400"
                    tooltip={state === "collapsed" ? {
                      children: item.title,
                      className: "bg-gray-800 text-white text-sm px-4 py-2"
                    } : undefined}
                  >
                    <a href={item.url} className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5 text-white" />
                        {state === "expanded" && (
                          <span className="text-sm font-medium text-white">{item.title}</span>
                        )}
                      </div>
                      {state === "expanded" && item.hasSubmenu && (
                        <ChevronDown className="h-4 w-4 text-white" />
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    
    </Sidebar>
  )
}
