"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Certification {
  name: string
  issuer: string
  image: string
  validUntil: string
}

interface CertificationsGridProps {
  certifications: Certification[]
}

export function CertificationsGrid({ certifications }: CertificationsGridProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg md:text-xl">
          Chứng nhận và giấy phép
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 sm:p-6 text-center flex flex-col items-center hover:shadow-md transition-shadow"
            >
              <Image
                src={cert.image || "/placeholder.svg"}
                alt={cert.name}
                width={100}
                height={100}
                className="mx-auto mb-3 sm:mb-4 rounded object-cover w-20 h-20 sm:w-24 sm:h-24"
              />
              <h3 className="font-semibold text-sm sm:text-base mb-1">
                {cert.name}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                {cert.issuer}
              </p>
              <Badge
                variant="outline"
                className="text-[10px] sm:text-xs whitespace-nowrap"
              >
                Có hiệu lực đến{" "}
                {new Date(cert.validUntil).toLocaleDateString("vi-VN")}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
