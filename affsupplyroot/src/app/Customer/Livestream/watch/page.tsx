"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ProductSidebar } from "@/app/Customer/Product/ProductSidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { 
  Heart, 
  ThumbsUp, 
  Send,
  ShoppingBag,
  Bell,
  MessageCircle,
  Folder,
  User,
  ChevronRight,
  Plus,
  Minus
} from "lucide-react"
import { FaUserPlus, FaComments, FaFire, FaCalendarAlt } from "react-icons/fa"
import ReactPlayer from 'react-player'

export default function LivestreamWatchPage() {
  const [message, setMessage] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isFollowing, setIsFollowing] = useState(false)
  const [playing, setPlaying] = useState(false)

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage("")
    }
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta))
  }

  return (
    <SidebarProvider>
      <ProductSidebar />
      
      <SidebarInset>
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <div style={{ 
            background: 'linear-gradient(180deg, #353D39 100%, #7E8C7C 100%, #353D39 5%)',
            padding: '12px' 
          }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Link href="/" className="text-yellow-300 text-sm hover:text-yellow-200">Trang chủ</Link>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <Link href="/Customer/Livestream" className="text-yellow-300 text-sm hover:text-yellow-200">Livestreams</Link>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span className="text-yellow-300 text-sm">Xem</span>
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
          
          {/* Main Content */}
          <div style={{ 
            flex: 1, 
            padding: '20px', 
            backgroundColor: '#353D39', 
            display: 'flex', 
            gap: '24px' 
          }}>
            {/* Left Side - Video Player */}
            <div style={{ flex: 1 }}>
              {/* Video Player */}
              <div style={{ 
                position: 'relative', 
                backgroundColor: '#374151', 
                borderRadius: '12px', 
                overflow: 'hidden', 
                marginBottom: '24px',
                aspectRatio: '16/9'
              }}>
                <ReactPlayer
                  src="https://www.youtube.com/watch?v=Mt2huL2TCR8"
                  width="100%"
                  height="100%"
                  playing={playing}
                  controls={true}
                  light="/Gao-ST25.png"
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  config={{
                    youtube: {
                      color: 'white'
                    }
                  }}
                />
                
                {/* LIVE Badges - Only show when not playing */}
                {!playing && (
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    display: 'flex',
                    gap: '8px',
                    zIndex: 10
                  }}>
                    <div style={{
                      backgroundColor: '#ef4444',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        animation: 'pulse 2s infinite'
                      }}></div>
                      LIVE
                    </div>
                    <div style={{
                      backgroundColor: '#10b981',
                      color: 'white',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      padding: '4px 8px',
                      borderRadius: '4px'
                    }}>
                      5K đang xem
                    </div>
                  </div>
                )}
              </div>

              {/* Streamer Info */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      border: '2px solid #FFD54F',
                      overflow: 'hidden'
                    }}>
                      <Image 
                        src="/Gao-ST25.png" 
                        alt="Streamer Avatar"
                        width={48}
                        height={48}
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      />
                    </div>
                    <div>
                      <h3 style={{ fontWeight: 'bold', fontSize: '18px', margin: 0 }}>AFFSHOP</h3>
                      <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>1.2K người theo dõi</p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button 
                      onClick={() => setIsFollowing(!isFollowing)}
                      style={{
                        padding: '8px 24px',
                        backgroundColor: isFollowing ? '#6b7280' : '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <FaUserPlus style={{ fontSize: '14px' }} />
                      {isFollowing ? 'Đã theo dõi' : 'Theo dõi'}
                    </Button>
                    <Button style={{
                      backgroundColor: '#22c55e',
                      color: 'white',
                      padding: '8px 24px',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <FaComments style={{ fontSize: '14px' }} />
                      Nhắn Tin
                    </Button>
                  </div>
                </div>
                
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ fontWeight: '600', marginBottom: '8px', margin: 0 }}>Tiêu đề livestream</h4>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaFire style={{ color: '#ef4444' }} />
                    SALE SỐC - Kho Lúa AFF supplyRoot
                  </p>
                </div>
                
                <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px' }}>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937', margin: '0 0 4px 0' }}>Sắp diễn ra 2 tiếng nữa</p>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaCalendarAlt style={{ color: '#3b82f6' }} />
                    Mở tài
                  </p>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Xem thêm (3)</p>
                </div>
              </div>
            </div>

            {/* Right Side - Chat & Products */}
            <div style={{ width: '320px', display: 'flex', flexDirection: 'column' }}>
              
              {/* Product Info - First */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ 
                    position: 'relative', 
                    width: '64px', 
                    height: '64px',
                    borderRadius: '8px',
                    overflow: 'hidden'
                  }}>
                    <Image src="/Gao-ST25.png" alt="Product" fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontWeight: '600', fontSize: '14px', margin: '0 0 4px 0' }}>Gạo ST 25</h4>
                    <p style={{ color: '#dc2626', fontWeight: 'bold', fontSize: '16px', margin: '0 0 2px 0' }}>150.000đ/5kg <span style={{ color: '#6b7280', fontSize: '12px', textDecoration: 'line-through', fontWeight: 'normal' }}>200.000đ</span></p>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Khô: 200.000đ Đã bán: 100000</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '14px', width: '100%', marginBottom: '8px' }}>Số lượng</span>
                  <div style={{ display: 'flex', alignItems: 'center', border: '2px solid #e5e7eb', borderRadius: '6px', backgroundColor: 'white' }}>
                    <Button 
                      onClick={() => handleQuantityChange(-1)}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        padding: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#374151',
                        minWidth: '32px',
                        height: '32px'
                      }}
                    >
                      <Minus style={{ width: '16px', height: '16px', color: '#374151' }} />
                    </Button>
                    <span style={{ padding: '8px 12px', fontSize: '14px', fontWeight: '500', color: '#1f2937', minWidth: '40px', textAlign: 'center' }}>{quantity}</span>
                    <Button 
                      onClick={() => handleQuantityChange(1)}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        padding: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#374151',
                        minWidth: '32px',
                        height: '32px'
                      }}
                    >
                      <Plus style={{ width: '16px', height: '16px', color: '#374151' }} />
                    </Button>
                  </div>
                  <Button style={{
                    backgroundColor: '#FFD54F',
                    color: 'black',
                    fontSize: '12px',
                    padding: '6px 12px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}>
                    Thêm vào giỏ
                  </Button>
                </div>
              </div>

              {/* Chat - Second */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '16px',
                flex: 1,
                minHeight: '350px',
                maxHeight: '450px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '12px'
                }}>
                  <h4 style={{ fontWeight: '600', margin: 0 }}>Khung chat</h4>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>1.2K</span>
                </div>
                
                {/* Chat Messages */}
                <div style={{
                  flex: 1,
                  overflowY: 'auto',
                  marginBottom: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      backgroundColor: '#22c55e',
                      borderRadius: '50%',
                      color: 'white',
                      fontSize: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>K</div>
                    <div>
                      <div>
                        <span style={{ fontSize: '12px', fontWeight: '500', color: '#2563eb' }}>Khoa Phạm</span>
                        <span style={{ fontSize: '10px', color: '#6b7280', marginLeft: '4px' }}>1 phút</span>
                      </div>
                      <p style={{ fontSize: '12px', margin: 0 }}>Gạo gì ngon dữ</p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      backgroundColor: '#3b82f6',
                      borderRadius: '50%',
                      color: 'white',
                      fontSize: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>T</div>
                    <div>
                      <div>
                        <span style={{ fontSize: '12px', fontWeight: '500', color: '#2563eb' }}>Thiên bảo</span>
                        <span style={{ fontSize: '10px', color: '#6b7280', marginLeft: '4px' }}>2 phút</span>
                      </div>
                      <p style={{ fontSize: '12px', margin: 0 }}>WOW</p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      backgroundColor: '#8b5cf6',
                      borderRadius: '50%',
                      color: 'white',
                      fontSize: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>B</div>
                    <div>
                      <div>
                        <span style={{ fontSize: '12px', fontWeight: '500', color: '#2563eb' }}>Bill</span>
                        <span style={{ fontSize: '10px', color: '#6b7280', marginLeft: '4px' }}>3 phút</span>
                      </div>
                      <p style={{ fontSize: '12px', margin: 0 }}>So good</p>
                    </div>
                  </div>
                </div>
                
                {/* Chat Input */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Input 
                    placeholder="Viết bình luận tại đây"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    style={{
                      flex: 1,
                      fontSize: '12px',
                      padding: '6px 10px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      height: '32px'
                    }}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    style={{
                      backgroundColor: '#22c55e',
                      color: 'white',
                      padding: '6px',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px'
                    }}
                  >
                    <Send style={{ width: '14px', height: '14px' }} />
                  </Button>
                </div>
                
                {/* Chat Actions */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: '16px',
                  paddingTop: '8px',
                  borderTop: '1px solid #e5e7eb'
                }}>
                  <Button style={{
                    backgroundColor: 'transparent',
                    color: '#6b7280',
                    border: 'none',
                    fontSize: '12px',
                    padding: '4px 0',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <ThumbsUp style={{ width: '14px', height: '14px' }} />
                    Like
                  </Button>
                  <Button style={{
                    backgroundColor: 'transparent',
                    color: '#6b7280',
                    border: 'none',
                    fontSize: '12px',
                    padding: '4px 0',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Heart style={{ width: '14px', height: '14px' }} />
                    Tim
                  </Button>
                </div>
              </div>

              {/* Related Products - Third (Compact) */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '16px',
                maxHeight: '270px',
                overflowY: 'auto'
              }}>
                <h4 style={{ 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  color: 'black', 
                  marginBottom: '12px',
                  margin: '0 0 12px 0'
                }}>
                  Sản phẩm liên quan
                </h4>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  {[...Array(3)].map((_, i) => (
                    <div key={i} style={{
                      backgroundColor: '#f9fafb',
                      borderRadius: '6px',
                      padding: '8px',
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'center',
                      fontSize: '13px',
                      minHeight: '56px',
                      border: '1px solid #e5e7eb'
                    }}>
                    <div style={{ 
                      position: 'relative', 
                      width: '40px', 
                      height: '40px',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      flexShrink: 0
                    }}>
                      <Image src="/Gao-ST25.png" alt="Product" fill style={{ objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h5 style={{ fontWeight: '500', fontSize: '13px', margin: '0 0 2px 0', lineHeight: '1.2' }}>Gạo ST 25</h5>
                      <p style={{ color: '#dc2626', fontWeight: 'bold', fontSize: '13px', margin: '0 0 1px 0', lineHeight: '1.2' }}>
                        150.000đ/5kg <span style={{ color: '#6b7280', fontSize: '11px', textDecoration: 'line-through', fontWeight: 'normal' }}>200.000đ</span>
                      </p>
                      <p style={{ fontSize: '11px', color: '#6b7280', margin: 0, lineHeight: '1.2' }}>Khô: 200.000đ Đã bán: 100000</p>
                    </div>
                    <div style={{
                      backgroundColor: '#FFD54F',
                      color: 'black',
                      fontSize: '10px',
                      padding: '3px 6px',
                      borderRadius: '3px',
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}>
                      Chuẩn bị ghim
                    </div>
                  </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
