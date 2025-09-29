"use client"

import { FaPhone, FaEnvelope, FaGlobe, FaFacebook, FaInstagram } from "react-icons/fa"
import { SiZalo, SiTiktok } from "react-icons/si"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface ContactInfo {
  phone?: string
  email?: string
  website?: string
  facebook?: string
  zalo?: string
  instagram?: string
  tiktok?: string
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
      <CardContent className="space-y-4">
        {/* Phone */}
        {contact.phone && (
          <div className="flex items-center gap-3">
            <FaPhone className="text-gray-500 text-lg" />
            <span className="text-sm">{contact.phone}</span>
          </div>
        )}

        {/* Email */}
        {contact.email && (
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-gray-500 text-lg" />
            <span className="text-sm">{contact.email}</span>
          </div>
        )}

        {/* Website */}
        {contact.website && (
          <div className="flex items-center gap-3">
            <FaGlobe className="text-gray-500 text-lg" />
            <span className="text-sm">{contact.website}</span>
          </div>
        )}

        {/* Social */}
        {(contact.facebook || contact.zalo || contact.instagram || contact.tiktok) && (
          <>
            <Separator />
            <div className="space-y-2">
              <p className="text-sm font-medium">Mạng xã hội:</p>
              <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
                {contact.facebook && (
                  <Button asChild variant="outline" size="sm" className="flex items-center gap-2">
                    <a href={contact.facebook} target="_blank" rel="noopener noreferrer">
                      <FaFacebook className="text-blue-600" /> Facebook
                    </a>
                  </Button>
                )}
                {contact.zalo && (
                  <Button asChild variant="outline" size="sm" className="flex items-center gap-2">
                    <a href={contact.zalo} target="_blank" rel="noopener noreferrer">
                      <SiZalo className="text-sky-500" /> Zalo
                    </a>
                  </Button>
                )}
                {contact.instagram && (
                  <Button asChild variant="outline" size="sm" className="flex items-center gap-2">
                    <a href={contact.instagram} target="_blank" rel="noopener noreferrer">
                      <FaInstagram className="text-pink-500" /> Instagram
                    </a>
                  </Button>
                )}
                {contact.tiktok && (
                  <Button asChild variant="outline" size="sm" className="flex items-center gap-2">
                    <a href={contact.tiktok} target="_blank" rel="noopener noreferrer">
                      <SiTiktok className="text-black" /> TikTok
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

// 🔹 Fake data test
const fakeContact: ContactInfo = {
  phone: "0123 456 789",
  email: "store@example.com",
  website: "www.example-store.com",
  facebook: "https://facebook.com/example",
  zalo: "https://zalo.me/example",
  instagram: "https://instagram.com/example",
  // tiktok không có -> sẽ ẩn
}

// ✅ Demo render
export default function DemoContact() {
  return (
    <div className="max-w-md mx-auto p-4">
      <StoreContactInfo contact={fakeContact} />
    </div>
  )
}
