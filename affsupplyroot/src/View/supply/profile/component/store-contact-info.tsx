"use client"

import { Phone, Mail, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface ContactInfo {
  phone: string
  email: string
  website: string
}

interface StoreContactInfoProps {
  contact: ContactInfo
}

export function StoreContactInfo({ contact }: StoreContactInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin liên hệ</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3">
          <Phone className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm">{contact.phone}</span>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm">{contact.email}</span>
        </div>
        <div className="flex items-center gap-3">
          <Globe className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm">{contact.website}</span>
        </div>
        <Separator />
        <div className="space-y-2">
          <p className="text-sm font-medium">Mạng xã hội:</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              📘 Facebook
            </Button>
            <Button variant="outline" size="sm">
              💬 Zalo
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
