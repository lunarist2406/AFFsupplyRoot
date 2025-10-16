"use client"

import { useEffect, useState } from "react"
import { getShopBySlug } from "@/services/shop"
import { ShopInfo } from "@/app/(customer)/products/components/ShopInfo"
import type { ShopDetail } from "@/services/shop"

interface Props {
  slug: string
}

export default function ShopPageClient({ slug }: Props) {
  const [shop, setShop] = useState<ShopDetail | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    ;(async () => {
      setError(null)
      try {
        const res = await getShopBySlug(slug)
        if (isMounted) setShop(res.data as ShopDetail)
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Không thể tải dữ liệu shop"
        if (isMounted) setError(message)
      } finally {
      }
    })()
    return () => {
      isMounted = false
    }
  }, [slug])


  if (error || !shop) {
    return (
      <></>
    )
  }

  return (
    <div className="w-full">
      <div className="w-full bg-white shadow-sm">
        <div className="container mx-auto px-4 py-5">
          <ShopInfo shop={shop} hideViewShop />
          <div className="mt-4 flex items-center gap-6 text-sm font-semibold border-t pt-3">
            <a href="#" className="hover:text-orange-500">Sản phẩm</a>
            <a href="#" className="hover:text-orange-500">Giảm giá</a>
            <a href="#" className="hover:text-orange-500">Hàng mới về</a>
            <a href="#" className="hover:text-orange-500">Thêm</a>
          </div>
        </div>
      </div>
    </div>
  )
}


