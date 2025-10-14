import { ShopReviewsPage } from "@/components/shop/ShopReviewsPage"

interface ShopReviewsPageProps {
  params: {
    slug: string
  }
}

export default function ShopReviewsRoute({ params }: ShopReviewsPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <ShopReviewsPage shopSlug={params.slug} />
    </div>
  )
}
