"use client"

import { Truck, Shield, Award, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Policies {
  shipping: string
  return: string
  warranty: string
  payment: string
}

interface StorePoliciesProps {
  policies: Policies
}

export function StorePolicies({ policies }: StorePoliciesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chính sách cửa hàng</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Truck className="w-4 h-4 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Giao hàng</p>
              <p className="text-xs text-muted-foreground">{policies.shipping}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Đổi trả</p>
              <p className="text-xs text-muted-foreground">{policies.return}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Award className="w-4 h-4 text-purple-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Bảo hành</p>
              <p className="text-xs text-muted-foreground">{policies.warranty}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <DollarSign className="w-4 h-4 text-orange-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Thanh toán</p>
              <p className="text-xs text-muted-foreground">{policies.payment}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
