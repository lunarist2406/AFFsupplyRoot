"use client"

import { FaTruck, FaShieldAlt, FaAward, FaMoneyBillWave } from "react-icons/fa"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Policies {
  shipping?: string
  return?: string
  warranty?: string
  payment?: string
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
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {policies.shipping && (
            <div className="flex items-start gap-3">
              <FaTruck className="text-green-600 text-lg mt-1" />
              <div>
                <p className="text-sm font-medium">Giao hàng</p>
                <p className="text-xs text-muted-foreground">{policies.shipping}</p>
              </div>
            </div>
          )}

          {policies.return && (
            <div className="flex items-start gap-3">
              <FaShieldAlt className="text-blue-600 text-lg mt-1" />
              <div>
                <p className="text-sm font-medium">Đổi trả</p>
                <p className="text-xs text-muted-foreground">{policies.return}</p>
              </div>
            </div>
          )}

          {policies.warranty && (
            <div className="flex items-start gap-3">
              <FaAward className="text-purple-600 text-lg mt-1" />
              <div>
                <p className="text-sm font-medium">Bảo hành</p>
                <p className="text-xs text-muted-foreground">{policies.warranty}</p>
              </div>
            </div>
          )}

          {policies.payment && (
            <div className="flex items-start gap-3">
              <FaMoneyBillWave className="text-orange-600 text-lg mt-1" />
              <div>
                <p className="text-sm font-medium">Thanh toán</p>
                <p className="text-xs text-muted-foreground">{policies.payment}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// 🔹 Fake data demo
const fakePolicies: Policies = {
  shipping: "Miễn phí vận chuyển toàn quốc cho đơn hàng từ 500k.",
  return: "Hỗ trợ đổi trả trong vòng 7 ngày nếu sản phẩm lỗi.",
  warranty: "Bảo hành 12 tháng cho tất cả sản phẩm điện tử.",
  payment: "Chấp nhận thanh toán qua COD, chuyển khoản, và ví điện tử.",
}

// ✅ Demo render
export default function DemoPolicies() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <StorePolicies policies={fakePolicies} />
    </div>
  )
}
