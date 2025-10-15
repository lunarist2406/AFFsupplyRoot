"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StoreDescriptionProps {
  description: string | undefined;
}

export function StoreDescription({ description }: StoreDescriptionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Giới thiệu cửa hàng</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}
