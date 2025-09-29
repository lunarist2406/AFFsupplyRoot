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
    <Card>
      <CardHeader>
        <CardTitle>Chứng nhận và giấy phép</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div key={index} className="border rounded-lg p-4 text-center">
              <Image
                src={cert.image || "/placeholder.svg"}
                alt={cert.name}
                width={80}
                height={80}
                className="mx-auto mb-4 rounded"
              />
              <h3 className="font-semibold mb-2">{cert.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{cert.issuer}</p>
              <Badge variant="outline" className="text-xs">
                Có hiệu lực đến {new Date(cert.validUntil).toLocaleDateString("vi-VN")}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
