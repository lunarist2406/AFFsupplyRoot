"use client"

import { MapPin, Phone, Mail, Calendar, Camera, CheckCircle, Leaf } from "lucide-react"
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
      <div className="relative">
        <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
          <AvatarImage src={storeInfo.avatar || "/placeholder.svg"} />
          <AvatarFallback className="text-2xl">NS</AvatarFallback>
        </Avatar>
        <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0" onClick={onChangeAvatar}>
          <Camera className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 space-y-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">{storeInfo.name}</h1>
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              Đã xác minh
            </Badge>
            <Badge className="bg-blue-100 text-blue-800">
              <Leaf className="w-3 h-3 mr-1" />
              Hữu cơ
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground italic">{storeInfo.slogan}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{storeInfo.address.full}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>Tham gia từ {new Date(storeInfo.stats.joinDate).toLocaleDateString("vi-VN")}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <span>{storeInfo.contact.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span>{storeInfo.contact.email}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
