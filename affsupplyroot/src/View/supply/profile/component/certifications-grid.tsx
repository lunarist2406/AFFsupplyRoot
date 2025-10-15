"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SellerKycDocument {
  id: number
  type: string
  url: string
}

interface CertificationsGridProps {
  documents?: SellerKycDocument[]
}

export function CertificationsGrid({ documents }: CertificationsGridProps) {
  if (!documents || documents.length === 0) return null

  const typeDisplayMap: Record<string, string> = {
    ID_CARD_FRONT: "ID Card Front",
    ID_CARD_BACK: "ID Card Back",
    BUSINESS_LICENSE: "Business License",
    FOOD_SAFETY_CERT: "Food Safety Certificate",
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg md:text-xl">
          Chứng nhận và giấy phép
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="border rounded-lg p-4 sm:p-6 text-center flex flex-col items-center hover:shadow-md transition-shadow"
            >
              <Image
                src={doc.url || "/placeholder.svg"}
                alt={typeDisplayMap[doc.type] || doc.type}
                width={100}
                height={100}
                className="mx-auto mb-3 sm:mb-4 rounded object-cover w-20 h-20 sm:w-24 sm:h-24"
              />
              <h3 className="font-semibold text-sm sm:text-base mb-1">
                {typeDisplayMap[doc.type] || doc.type}
              </h3>
              <Badge
                variant="outline"
                className="text-[10px] sm:text-xs whitespace-nowrap"
              >
                {/* tạm thời nếu chưa có ngày hết hạn */}
                Có hiệu lực đến {new Date().toLocaleDateString("vi-VN")}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
