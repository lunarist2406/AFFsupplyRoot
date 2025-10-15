"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AiFillHome } from "react-icons/ai";
import { FaBox, FaRegCommentDots, FaRegImage, FaAward } from "react-icons/fa";
import { achievements, farmImages, featuredProducts, reviews, storeInfo as fallbackStoreInfo } from "./variable"
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
import useShopProfile from "@/hooks/useShopProfile";

export default function SupplyProfile() {
  const [isFollowing, setIsFollowing] = useState(false)
  const { shopProfile } = useShopProfile();
  console.log(shopProfile) // <-- dùng hook của bạn
  const storeData = shopProfile || fallbackStoreInfo; // nếu API chưa về dùng fallback
  // console.log("storeData:", storeData)
  const handleChangeCover = () => console.log("Change cover image")
  const handleShare = () => console.log("Share store")
  const handleChangeAvatar = () => console.log("Change avatar")
  const handleMessage = () => console.log("Send message")
  const handleSettings = () => console.log("Open settings")

  return (
    <div className="min-h-screen flex-1 bg-gradient-to-r from-green-950 via-gray-600 to-green-950 font-manuale">
      <StoreCover 
        coverImage={shopProfile?.shopBanner ?? ""} 
        onChangeCover={handleChangeCover} 
        onShare={handleShare} 
      />

      <div className="relative -mt-20 px-6 max-w-[83rem] mx-auto">
        <Card className="p-6 rounded-2xl shadow-lg">
          <div className="flex flex-col md:flex-row gap-6">
          {shopProfile && (
            <StoreHeaderInfo
              storeInfo={{
                name: shopProfile.brandName,
                slogan: shopProfile.description,
                avatar: shopProfile.shopAvatar || "/placeholder.svg",
                address: { full: shopProfile.businessAddress },
                contact: { phone: shopProfile.businessPhone, email: shopProfile.user?.email },
                stats: { joinDate: shopProfile.createdAt },
              }}
              onChangeAvatar={handleChangeAvatar}
            />
          )}

        {shopProfile ? (
          <StoreStatsActions
            stats={{
              followers: shopProfile.totalFollowers ?? 0,
              totalProducts: 0,
              totalOrders: 0,
              rating: shopProfile.avgRating ?? 0,
              reviewCount: shopProfile.totalReviews ?? 0,
              joinDate: shopProfile.createdAt ?? new Date().toISOString(),
              responseRate: 0,
              responseTime: "0 giờ",
            }}
            isFollowing={isFollowing}
            setIsFollowing={setIsFollowing}
            onMessage={handleMessage}
            onSettings={handleSettings}
          />
        ) : (
          <p>Đang tải dữ liệu cửa hàng...</p>
        )}





          </div>
        </Card>
      </div>

      <div className="relative max-w-[84rem] mx-auto px-6 sm:px-6 lg:px-8 py-6">
        <Tabs defaultValue="overview" className="space-y-2">
          <TabsList className="grid grid-cols-5 sm:grid-cols-5 lg:grid-cols-5 w-full gap-2 sm:gap- lg:gap-0">
            <TabsTrigger value="overview" className="flex items-center justify-center gap-2">
              <span className="lg:hidden"><AiFillHome className="w-5 h-5" /></span>
              <span className="hidden lg:inline">Tổng quan</span>
            </TabsTrigger>

            <TabsTrigger value="products" className="flex items-center justify-center gap-2">
              <span className="lg:hidden"><FaBox className="w-5 h-5" /></span>
              <span className="hidden lg:inline">Sản phẩm</span>
            </TabsTrigger>

            <TabsTrigger value="reviews" className="flex items-center justify-center gap-2">
              <span className="lg:hidden"><FaRegCommentDots className="w-5 h-5" /></span>
              <span className="hidden lg:inline">Đánh giá</span>
            </TabsTrigger>

            <TabsTrigger value="farm" className="flex items-center justify-center gap-2">
              <span className="lg:hidden"><FaRegImage className="w-5 h-5" /></span>
              <span className="hidden lg:inline">Hình ảnh</span>
            </TabsTrigger>

            <TabsTrigger value="certificates" className="flex items-center justify-center gap-2">
              <span className="lg:hidden"><FaAward className="w-5 h-5" /></span>
              <span className="hidden lg:inline">Chứng nhận</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <StoreDescription description={shopProfile?.description} />
                {/* <StoreActivityStats stats={storeData.stats} /> */}
                        {shopProfile ? (
                <StoreActivityStats
                  stats={{
                    // followers: shopProfile.totalFollowers ?? 0,
                    totalProducts: 0,
                    totalOrders: 0,
                    // rating: shopProfile.avgRating ?? 0,
                    // reviewCount: shopProfile.totalReviews ?? 0,
                    // joinDate: shopProfile.createdAt ?? new Date().toISOString(),
                    responseRate: 0,
                    responseTime: "0 giờ",
                  }}
                  // isFollowing={isFollowing}
                  // setIsFollowing={setIsFollowing}
                  // onMessage={handleMessage}
                  // onSettings={handleSettings}
                />
              ) : (
                <p>Đang tải dữ liệu cửa hàng...</p>
              )}
                <StoreAchievements achievements={achievements} />
              </div>

              <div className="space-y-6">
                {/* <StoreContactInfo contact={storeData.contact} /> */}
                {/* <StorePolicies policies={storeData.policies} /> */}
                <FeaturedProductsSidebar
                  products={featuredProducts.map(p => ({ ...p, id: String(p.id) }))}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <ProductsGrid
              products={featuredProducts.map(p => ({ ...p, id: String(p.id) }))}
            />
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <ReviewsList
              reviews={reviews.map(r => ({ ...r, id: String(r.id) }))}
            />
          </TabsContent>

          <TabsContent value="farm" className="space-y-6">
            <FarmImagesGallery
              images={farmImages.map(img => ({ ...img, id: String(img.id) }))}
            />
          </TabsContent>

          <TabsContent value="certificates" className="space-y-6">
           <CertificationsGrid documents={shopProfile?.sellerKycDocument} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
