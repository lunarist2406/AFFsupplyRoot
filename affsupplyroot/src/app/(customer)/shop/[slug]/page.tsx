import { Metadata } from "next"
import { getShopBySlug } from "@/services/shop"
import ShopAllProducts from "./shop-all-products"
import ShopPageClient from "./ShopPageClient"

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const res = await getShopBySlug(params.slug)
    const shop = res.data
    return {
      title: `${shop.brandName} | Cửa hàng`,
      description: shop.description || shop.companyName
    }
  } catch {
    return {
      title: "Shop",
      description: "Trang cửa hàng"
    }
  }
}

export default async function ShopPage({ params }: PageProps) {
  return (
    <div className="w-full">
      <ShopPageClient slug={params.slug} />
      <div className="container mx-auto px-4 py-6">
        <ShopAllProducts shopSlug={params.slug} />
      </div>
    </div>
  )
}


