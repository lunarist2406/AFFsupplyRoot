"use client"

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaCalendarAlt,
  FaCamera,
  FaCheckCircle,
  FaLeaf,
} from "react-icons/fa"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface StoreInfo {
  name: string
  slogan: string
  avatar: string
  address: { full: string }
  contact: { phone: string; email: string }
  stats: { joinDate: string }
}

interface StoreHeaderInfoProps {
  storeInfo: StoreInfo
  onChangeAvatar?: () => void
}

export function StoreHeaderInfo({ storeInfo, onChangeAvatar }: StoreHeaderInfoProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 flex-1">
      {/* Avatar */}
      <div className="flex flex-col items-center md:items-center">
        <Avatar className="w-28 h-28 sm:w-32 sm:h-32 border-4 border-white shadow-lg">
          <AvatarImage src={storeInfo.avatar || "/placeholder.svg"} />
          <AvatarFallback className="text-2xl">NS</AvatarFallback>
        </Avatar>
        <Button
          size="sm"
          className="mt-3 rounded-full px-3 py-1 bg-green-600 hover:bg-green-700 text-white flex items-center gap-1"
          onClick={onChangeAvatar}
        >
          <FaCamera className=" w-4 h-4" />
          <span className="hidden sm:inline">Đổi ảnh</span>
        </Button>
      </div>

      {/* Store info */}
      <div className="flex-1 space-y-4 text-center md:text-left">
        {/* Name + badges */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold">{storeInfo.name}</h1>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-2 sm:mt-0">
              <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                <FaCheckCircle className="w-3 h-3" />
                Đã xác minh
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1">
                <FaLeaf className="w-3 h-3" />
                Hữu cơ
              </Badge>
            </div>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground italic">{storeInfo.slogan}</p>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="flex items-center gap-2 text-sm">
            <FaMapMarkerAlt className="text-muted-foreground" />
            <span>{storeInfo.address.full}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FaCalendarAlt className="text-muted-foreground" />
            <span>
              Tham gia từ {new Date(storeInfo.stats.joinDate).toLocaleDateString("vi-VN")}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FaPhoneAlt className="text-muted-foreground" />
            <span>{storeInfo.contact.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FaEnvelope className="text-muted-foreground" />
            <span>{storeInfo.contact.email}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
