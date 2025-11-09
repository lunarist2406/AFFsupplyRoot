"use client"

import { useEffect, useState, ChangeEvent } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import useShopProfile, { UpdateProfilePayload } from "@/hooks/useShopProfile"
import { toast } from "sonner"
import ProductList from "../inventory/components/ProductList"
import { 
  Store, 
  Phone, 
  MapPin, 
  Edit2, 
  Users, 
  Star, 
  FileText,
  Upload,
  Loader2
} from "lucide-react"

export default function ShopProfilePage() {
  const { shopProfile, loading, fetchProfile, updateProfile } = useShopProfile()
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<UpdateProfilePayload>({})
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null)
  const [previewBanner, setPreviewBanner] = useState<string | null>(null)

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  useEffect(() => {
    if (shopProfile) {
      setFormData({
        companyName: shopProfile.companyName || "",
        brandName: shopProfile.brandName || "",
        businessPhone: shopProfile.businessPhone || "",
        businessAddress: shopProfile.businessAddress || "",
        description: shopProfile.description || "",
      })
    }
  }, [shopProfile])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, files } = e.target
    if (files && files[0]) {
      const file = files[0]
      setFormData((prev) => ({ ...prev, [id]: file }))
      const previewUrl = URL.createObjectURL(file)
      if (id === "shopAvatar") setPreviewAvatar(previewUrl)
      if (id === "shopBanner") setPreviewBanner(previewUrl)
    }
  }

  const handleUpdate = async () => {
    try {
      await updateProfile(formData)
      toast.success("🎉 Cập nhật hồ sơ thành công!")
      setOpen(false)
      setPreviewAvatar(null)
      setPreviewBanner(null)
      fetchProfile()
    } catch {
      toast.error("😢 Cập nhật thất bại!")
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600">Đang tải thông tin cửa hàng...</p>
      </div>
    )
  }

  if (!shopProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Store className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Không có dữ liệu cửa hàng</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-manuale ">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header with Banner & Avatar */}
        <Card className="mb-8 border-none shadow-xl overflow-hidden bg-white">
          {/* Banner */}
          <div className="relative w-full h-64 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            <Image
              src={shopProfile.shopBanner || "/placeholder-banner.jpg"}
              alt="Shop Banner"
              fill
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            
            {/* Edit Button */}
            <Button
              onClick={() => setOpen(true)}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-900 shadow-lg"
              size="sm"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Chỉnh sửa
            </Button>
          </div>

          {/* Profile Info */}
          <CardContent className="relative pt-0 pb-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              {/* Avatar & Name */}
              <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16">
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-white">
                  <Image
                    src={shopProfile.shopAvatar || "/placeholder-avatar.png"}
                    alt="Shop Avatar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center md:text-left mb-4">
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">
                    {shopProfile.brandName}
                  </h1>
                  <p className="text-gray-600 mb-2">{shopProfile.companyName}</p>
                  <Badge 
                    variant={shopProfile.status === "ACTIVE" ? "default" : "secondary"}
                    className="uppercase"
                  >
                    {shopProfile.status}
                  </Badge>
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-8 justify-center md:justify-end">
                <StatItem 
                  icon={<Users className="w-5 h-5" />}
                  label="Người theo dõi" 
                  value={shopProfile.totalFollowers} 
                />
                <StatItem 
                  icon={<FileText className="w-5 h-5" />}
                  label="Đánh giá" 
                  value={shopProfile.totalReviews} 
                />
                <StatItem 
                  icon={<Star className="w-5 h-5" />}
                  label="Điểm TB" 
                  value={shopProfile.avgRating} 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="info" className="space-y-6">
          <TabsList className="bg-white shadow-lg border-none p-1 h-auto">
            <TabsTrigger value="info" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-6 py-3">
              <Store className="w-4 h-4 mr-2" />
              Thông tin
            </TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-6 py-3">
              <FileText className="w-4 h-4 mr-2" />
              Sản phẩm
            </TabsTrigger>
          </TabsList>

          {/* Tab: Shop Info */}
          <TabsContent value="info" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Business Details */}
              <Card className="border-none shadow-xl bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Store className="w-5 h-5 text-blue-600" />
                    </div>
                    Thông tin kinh doanh
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <InfoRow 
                    icon={<Store className="w-5 h-5 text-gray-400" />}
                    label="Tên công ty" 
                    value={shopProfile.companyName} 
                  />
                  <InfoRow 
                    icon={<Store className="w-5 h-5 text-gray-400" />}
                    label="Thương hiệu" 
                    value={shopProfile.brandName} 
                  />
                  <InfoRow 
                    icon={<Phone className="w-5 h-5 text-gray-400" />}
                    label="Số điện thoại" 
                    value={shopProfile.businessPhone} 
                  />
                  <InfoRow 
                    icon={<MapPin className="w-5 h-5 text-gray-400" />}
                    label="Địa chỉ" 
                    value={shopProfile.businessAddress} 
                  />
                </CardContent>
              </Card>

              {/* Description */}
              <Card className="border-none shadow-xl bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <FileText className="w-5 h-5 text-purple-600" />
                    </div>
                    Mô tả cửa hàng
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    {shopProfile.description || "Chưa có mô tả"}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* KYC Documents */}
          {shopProfile?.sellerKycDocument?.length ? (
            <Card className="border-none shadow-xl bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FileText className="w-5 h-5 text-green-600" />
                  </div>
                  Tài liệu KYC
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {shopProfile.sellerKycDocument!.map((doc, i) => (
                    <div
                      key={i}
                      className="group relative rounded-xl overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-all"
                    >
                      <div className="aspect-video relative">
                        <Image
                          src={doc.url}
                          alt={doc.type}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3 bg-white">
                        <p className="text-xs font-medium text-gray-700 text-center">
                          {doc.type}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : null}

          </TabsContent>

          {/* Tab: Products */}
          <TabsContent value="products">
            <ProductList />
          </TabsContent>
        </Tabs>

        {/* UPDATE DIALOG */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Edit2 className="w-5 h-5" />
                Cập nhật hồ sơ cửa hàng
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Upload Images Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <UploadField
                  id="shopBanner"
                  label="Ảnh banner"
                  preview={previewBanner || shopProfile.shopBanner}
                  onChange={handleFileChange}
                  aspectRatio="aspect-video"
                />
                <UploadField
                  id="shopAvatar"
                  label="Ảnh đại diện"
                  preview={previewAvatar || shopProfile.shopAvatar}
                  onChange={handleFileChange}
                  aspectRatio="aspect-square"
                />
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput 
                  id="companyName" 
                  label="Tên công ty" 
                  value={formData.companyName ?? ""} 
                  onChange={handleChange}
                  icon={<Store className="w-4 h-4" />}
                />
                <FormInput 
                  id="brandName" 
                  label="Thương hiệu" 
                  value={formData.brandName ?? ""} 
                  onChange={handleChange}
                  icon={<Store className="w-4 h-4" />}
                />
                <FormInput 
                  id="businessPhone" 
                  label="Số điện thoại" 
                  value={formData.businessPhone ?? ""} 
                  onChange={handleChange}
                  icon={<Phone className="w-4 h-4" />}
                />
                <FormInput 
                  id="businessAddress" 
                  label="Địa chỉ kinh doanh" 
                  value={formData.businessAddress ?? ""} 
                  onChange={handleChange}
                  icon={<MapPin className="w-4 h-4" />}
                />
              </div>

              <FormTextarea 
                id="description" 
                label="Mô tả cửa hàng" 
                value={formData.description ?? ""} 
                onChange={handleChange}
              />
            </div>

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Hủy
              </Button>
              <Button onClick={handleUpdate} className="bg-blue-600 hover:bg-blue-700">
                <Edit2 className="w-4 h-4 mr-2" />
                Lưu thay đổi
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

/* Subcomponents */
const InfoRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
    <div className="mt-0.5">{icon}</div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-sm font-medium text-gray-900 break-words">{value || "—"}</p>
    </div>
  </div>
)

const FormInput = ({
  id,
  label,
  value,
  onChange,
  icon,
}: {
  id: keyof UpdateProfilePayload
  label: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  icon?: React.ReactNode
}) => (
  <div>
    <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
    <div className="relative mt-1.5">
      {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
      <Input 
        id={id} 
        value={value} 
        onChange={onChange} 
        className={icon ? "pl-10" : ""}
      />
    </div>
  </div>
)

const FormTextarea = ({
  id,
  label,
  value,
  onChange,
}: {
  id: keyof UpdateProfilePayload
  label: string
  value: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}) => (
  <div>
    <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
    <Textarea 
      id={id} 
      value={value} 
      onChange={onChange} 
      className="mt-1.5 min-h-[100px]"
    />
  </div>
)

const UploadField = ({
  id,
  label,
  preview,
  onChange,
  aspectRatio,
}: {
  id: string
  label: string
  preview?: string | null
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  aspectRatio: string
}) => (
  <div>
    <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
    <div className={`relative ${aspectRatio} mt-1.5 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors group cursor-pointer`}>
      {preview ? (
        <Image src={preview} alt={label} fill className="object-cover" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
          <Upload className="w-8 h-8 text-gray-400 mb-2" />
          <p className="text-xs text-gray-500">Click để tải ảnh</p>
        </div>
      )}
      <Input
        id={id}
        type="file"
        accept="image/*"
        onChange={onChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
    </div>
  </div>
)

const StatItem = ({ 
  icon, 
  label, 
  value 
}: { 
  icon: React.ReactNode
  label: string
  value: number | string 
}) => (
  <div className="text-center">
    <div className="flex items-center justify-center gap-2 mb-1">
      <div className="text-blue-600">{icon}</div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
    <p className="text-xs text-gray-500">{label}</p>
  </div>
)