"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { achievements, farmImages, featuredProducts, reviews, storeInfo } from "./variable"
import { StoreCover } from "./component/store-cover"
import { StoreHeaderInfo } from "./component/store-header-info"
import { StoreStatsActions } from "./component/store-stats-actions"
import { StoreDescription } from "./component/store-description"
import { StoreActivityStats } from "./component/store-activity-stats"
import { StoreAchievements } from "./component/store-achievements"
import { StoreContactInfo } from "./component/store-contact-info"
import { StorePolicies } from "./component/store-policies"
import { FeaturedProductsSidebar } from "./component/featured-products-sidebar"
import { ProductsGrid } from "./component/products-grid"
import { ReviewsList } from "./component/reviews-list"
import { FarmImagesGallery } from "./component/farm-images-gallery"
import { CertificationsGrid } from "./component/certifications-grid"

export default function SupplyProfile() {
  const [isFollowing, setIsFollowing] = useState(false)

  const handleChangeCover = () => {
    console.log("Change cover image")
  }

  const handleShare = () => {
    console.log("Share store")
  }

  const handleChangeAvatar = () => {
    console.log("Change avatar")
  }

  const handleMessage = () => {
    console.log("Send message")
  }

  const handleSettings = () => {
    console.log("Open settings")
  }

  return (
    <div className="min-h-screen flex-1 bg-gradient-to-r from-green-950 via-gray-600 to-green-950 font-manuale">
      {/* Cover Image */}
      <StoreCover coverImage={storeInfo.coverImage} onChangeCover={handleChangeCover} onShare={handleShare} />

      {/* Store Header */}
      <div className="relative -mt-20 px-6 max-w-[83rem] mx-auto">
        <Card className="p-6 rounded-2xl shadow-lg">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar and Basic Info */}
            <StoreHeaderInfo storeInfo={storeInfo} onChangeAvatar={handleChangeAvatar} />

            {/* Stats and Actions */}
            <StoreStatsActions
              stats={storeInfo.stats}
              isFollowing={isFollowing}
              setIsFollowing={setIsFollowing}
              onMessage={handleMessage}
              onSettings={handleSettings}
            />
          </div>
        </Card>
      </div>


      {/* Main Content */}
      <div className="relative max-w-[83rem] mx-auto px-6 py-6 ">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="products">Sản phẩm</TabsTrigger>
            <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
            <TabsTrigger value="farm">Nông trại</TabsTrigger>
            <TabsTrigger value="certificates">Chứng nhận</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Store Description */}
              <div className="lg:col-span-2 space-y-6">
                <StoreDescription description={storeInfo.description} />
                <StoreActivityStats stats={storeInfo.stats} />
                <StoreAchievements achievements={achievements} />
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <StoreContactInfo contact={storeInfo.contact} />
                <StorePolicies policies={storeInfo.policies} />
                <FeaturedProductsSidebar products={featuredProducts.map(product => ({ ...product, id: String(product.id) }))} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <ProductsGrid products={featuredProducts.map(product => ({ ...product, id: String(product.id) }))} />
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <ReviewsList reviews={reviews.map(review => ({ ...review, id: String(review.id) }))} />
          </TabsContent>

          <TabsContent value="farm" className="space-y-6">
            <FarmImagesGallery images={farmImages.map(image => ({ ...image, id: String(image.id) }))} />
          </TabsContent>

          <TabsContent value="certificates" className="space-y-6">
            <CertificationsGrid certifications={storeInfo.certifications} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
