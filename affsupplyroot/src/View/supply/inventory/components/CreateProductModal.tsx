/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import type React from "react"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MdUpload,
  MdClose,
  MdWarning,
  MdFolder,
  MdInfo,
  MdAttachMoney,
  MdLabel,
  MdDescription,
  MdImage,
  MdAdd,
  MdDelete,
} from "react-icons/md"
import { message } from "antd"
import useProducts from "@/hooks/useProducts"
import useCategory from "@/hooks/useCategory"
import useCategoryGlobal from "@/hooks/useCategoryGlobal"

// Danh sách options
const REGIONS = [
  { value: "MIEN_BAC", label: "Miền Bắc" },
  { value: "MIEN_TRUNG", label: "Miền Trung" },
  { value: "MIEN_NAM", label: "Miền Nam" },
  { value: "TAY_NGUYEN", label: "Tây Nguyên" },
]

const CONDITIONS = [
  { value: "FRESH", label: "Tươi sống" },
  { value: "DRIED", label: "Sấy khô" },
  { value: "PROCESSED", label: "Chế biến" },
]

const SEASONS = [
  { value: "SPRING", label: "Xuân" },
  { value: "SUMMER", label: "Hạ" },
  { value: "AUTUMN", label: "Thu" },
  { value: "WINTER", label: "Đông" },
]

const UNITS = [
  { value: "kg", label: "Kilogram (kg)" },
  { value: "gram", label: "Gram (g)" },
  { value: "pack", label: "Gói" },
  { value: "box", label: "Hộp" },
  { value: "piece", label: "Cái" },
  { value: "bunch", label: "Bó" },
  { value: "liter", label: "Lít (L)" },
]

interface PricingTier {
  minQty: number
  price: number
}

export default function CreateProductModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { createProduct } = useProducts()
  const { categories, fetchCategories } = useCategory()
  const { categoriesGlobal, fetchCategoriesGlobal } = useCategoryGlobal()

  const [loading, setLoading] = useState(false)
  const [fileList, setFileList] = useState<File[]>([])
  const [preview, setPreview] = useState<string[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([])

  const [form, setForm] = useState({
    title: "",
    brand: "",
    origin: "",
    unit: "",
    stock: 0,
    minOrderQty: 1,
    basePrice: 0,
    categoryGlobalID: "",
    categoryShopID: "",
    region: [] as string[],
    condition: [] as string[],
    season: [] as string[],
    certifications: "",
    storageInstructions: "",
    usageInstructions: "",
    description: "",
    isActive: true,
    pricingTier: "", // Added pricingTier field
  })

  useEffect(() => {
    fetchCategories()
    fetchCategoriesGlobal()
  }, [fetchCategories, fetchCategoriesGlobal])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const files = Array.from(e.target.files)

    // Lọc file >5MB
    const validFiles = files.filter((f) => {
      if (f.size > 5 * 1024 * 1024) {
        message.warning(`File ${f.name} quá lớn. Tối đa 5MB.`)
        return false
      }
      return true
    })

    setFileList((prev) => [...prev, ...validFiles])
    setPreview((prev) => [...prev, ...validFiles.map((f) => URL.createObjectURL(f))])
    setErrors((prev) => ({ ...prev, images: "" }))
  }

  const removeImage = (index: number) => {
    setFileList((prev) => prev.filter((_, i) => i !== index))
    setPreview((prev) => prev.filter((_, i) => i !== index))
  }

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [key]: "" }))
  }

  const toggleArrayValue = (key: "region" | "condition" | "season", value: string) => {
    setForm((prev) => {
      // flatten state trước để chắc chắn không lồng array
      let current: string[] = (prev[key] ?? []).flat(Number.POSITIVE_INFINITY).map(String)

      if (current.includes(value)) {
        // nếu đã có -> bỏ
        current = current.filter((v) => v !== value)
      } else {
        // nếu chưa có -> thêm
        current.push(value)
      }

      return { ...prev, [key]: current }
    })
  }

  const formatPrice = (value: string) => {
    const numValue = value.replace(/\D/g, "")
    return numValue ? new Intl.NumberFormat("vi-VN").format(Number(numValue)) : ""
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "")
    handleChange("basePrice", Number(rawValue) / 1000) // Lưu theo đơn vị 1000đ
  }

  const addPricingTier = () => {
    setPricingTiers((prev) => [...prev, { minQty: 0, price: 0 }])
  }

  const removePricingTier = (index: number) => {
    setPricingTiers((prev) => prev.filter((_, i) => i !== index))
  }

  const updatePricingTier = (index: number, field: keyof PricingTier, value: number) => {
    setPricingTiers((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  useEffect(() => {
    if (pricingTiers.length > 0) {
      const validTiers = pricingTiers.filter((tier) => tier.minQty > 0 && tier.price > 0)
      setForm((prev) => ({ ...prev, pricingTier: JSON.stringify(validTiers) }))
    } else {
      setForm((prev) => ({ ...prev, pricingTier: "" }))
    }
  }, [pricingTiers])

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!form.title.trim()) newErrors.title = "Vui lòng nhập tên sản phẩm"
    if (!form.categoryGlobalID) newErrors.categoryGlobalID = "Vui lòng chọn danh mục chung"
    if (!form.categoryShopID) newErrors.categoryShopID = "Vui lòng chọn danh mục cửa hàng"
    if (!form.unit) newErrors.unit = "Vui lòng chọn đơn vị tính"
    if (form.stock < 0) newErrors.stock = "Tồn kho không được âm"
    if (form.minOrderQty < 1) newErrors.minOrderQty = "Số lượng tối thiểu phải >= 1"
    if (form.basePrice <= 0) newErrors.basePrice = "Vui lòng nhập giá sản phẩm"
    if (preview.length === 0) newErrors.images = "Vui lòng tải lên ít nhất 1 ảnh"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCreate = async () => {
    if (!validate()) {
      message.error("Vui lòng điền đầy đủ thông tin bắt buộc")
      return
    }

    try {
      setLoading(true)

      const payload = {
        ...form,
        // Không gửi preview mà gửi fileList thật
      }

      const res = await createProduct(payload, fileList)

      if (res) {
        message.success("Tạo sản phẩm thành công 🎉")
        onClose()
        resetForm()
        setFileList([])
        setPreview([])
      }
    } catch (err) {
      console.error(err)
      message.error("Tạo sản phẩm thất bại 😭")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setForm({
      title: "",
      brand: "",
      origin: "",
      unit: "",
      stock: 0,
      minOrderQty: 1,
      basePrice: 0,
      categoryGlobalID: "",
      categoryShopID: "",
      region: [],
      condition: [],
      season: [],
      certifications: "",
      storageInstructions: "",
      usageInstructions: "",
      description: "",
      isActive: true,
      pricingTier: "", // Reset pricingTier
    })
    setPreview([])
    setFileList([])
    setErrors({})
    setPricingTiers([]) // Reset pricing tiers
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto font-manuale">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-700">🧺 Thêm sản phẩm mới</DialogTitle>
          <p className="text-sm text-gray-500 mt-1">
            Điền đầy đủ thông tin sản phẩm để khách hàng dễ dàng tìm kiếm và đặt hàng
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Danh mục */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <MdFolder className="text-xl" /> Phân loại sản phẩm
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Danh mục chung <span className="text-red-500">*</span>
                </label>
                <Select value={form.categoryGlobalID} onValueChange={(v) => handleChange("categoryGlobalID", v)}>
                  <SelectTrigger className={errors.categoryGlobalID ? "border-red-500" : ""}>
                    <SelectValue placeholder="Chọn danh mục chung (VD: Rau củ, Trái cây...)" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoriesGlobal?.map((cat: any) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.categoryGlobalID && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <MdWarning className="text-sm" /> {errors.categoryGlobalID}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Danh mục cửa hàng <span className="text-red-500">*</span>
                </label>
                <Select value={form.categoryShopID} onValueChange={(v) => handleChange("categoryShopID", v)}>
                  <SelectTrigger className={errors.categoryShopID ? "border-red-500" : ""}>
                    <SelectValue placeholder="Chọn danh mục cửa hàng của bạn" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((cat: any) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.categoryShopID && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <MdWarning className="text-sm" /> {errors.categoryShopID}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Thông tin cơ bản */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <MdInfo className="text-xl" /> Thông tin cơ bản
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Tên sản phẩm <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="VD: Cà chua bi hữu cơ Đà Lạt"
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <MdWarning className="text-sm" /> {errors.title}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Thương hiệu</label>
                <Input
                  placeholder="VD: Dalat Hasfarm, VinEco..."
                  value={form.brand}
                  onChange={(e) => handleChange("brand", e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Xuất xứ</label>
                <Input
                  placeholder="VD: Đà Lạt, Việt Nam"
                  value={form.origin}
                  onChange={(e) => handleChange("origin", e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Đơn vị tính <span className="text-red-500">*</span>
                </label>
                <Select value={form.unit} onValueChange={(v) => handleChange("unit", v)}>
                  <SelectTrigger className={errors.unit ? "border-red-500" : ""}>
                    <SelectValue placeholder="Chọn đơn vị" />
                  </SelectTrigger>
                  <SelectContent>
                    {UNITS.map((unit) => (
                      <SelectItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.unit && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <MdWarning className="text-sm" /> {errors.unit}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Chứng nhận chất lượng</label>
                <Input
                  placeholder="VD: VietGAP, GlobalGAP, Organic..."
                  value={form.certifications}
                  onChange={(e) => handleChange("certifications", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Giá và số lượng */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <MdAttachMoney className="text-xl" /> Giá và tồn kho
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Giá bán <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    placeholder="VD: 25000"
                    value={formatPrice(String(form.basePrice * 1000))}
                    onChange={handlePriceChange}
                    className={`pr-16 ${errors.basePrice ? "border-red-500" : ""}`}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium">
                    VNĐ
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Đơn vị tính: 1.000đ</p>
                {errors.basePrice && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <MdWarning className="text-sm" /> {errors.basePrice}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Tồn kho</label>
                <Input
                  type="number"
                  min="0"
                  placeholder="VD: 100"
                  value={form.stock}
                  onChange={(e) => handleChange("stock", Math.max(0, Number(e.target.value)))}
                  className={errors.stock ? "border-red-500" : ""}
                />
                {errors.stock && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <MdWarning className="text-sm" /> {errors.stock}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Số lượng tối thiểu</label>
                <Input
                  type="number"
                  min="1"
                  placeholder="VD: 1"
                  value={form.minOrderQty}
                  onChange={(e) => handleChange("minOrderQty", Math.max(1, Number(e.target.value)))}
                  className={errors.minOrderQty ? "border-red-500" : ""}
                />
                {errors.minOrderQty && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <MdWarning className="text-sm" /> {errors.minOrderQty}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-800">Bảng giá theo số lượng</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Thiết lập giá ưu đãi khi khách hàng mua số lượng lớn</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addPricingTier}
                  className="flex items-center gap-1 bg-transparent"
                >
                  <MdAdd className="text-lg" />
                  Thêm mức giá
                </Button>
              </div>

              {pricingTiers.length > 0 && (
                <div className="space-y-3">
                  {pricingTiers.map((tier, index) => (
                    <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200">
                      <div className="flex-1">
                        <label className="text-xs text-gray-600 mb-1 block">Số lượng tối thiểu</label>
                        <Input
                          type="number"
                          min="1"
                          placeholder="VD: 10"
                          value={tier.minQty || ""}
                          onChange={(e) => updatePricingTier(index, "minQty", Number(e.target.value))}
                          className="h-9"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs text-gray-600 mb-1 block">Giá (VNĐ)</label>
                        <div className="relative">
                          <Input
                            placeholder="VD: 115000"
                            value={formatPrice(String(tier.price))}
                            onChange={(e) => {
                              const rawValue = e.target.value.replace(/\D/g, "")
                              updatePricingTier(index, "price", Number(rawValue))
                            }}
                            className="h-9 pr-14"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">VNĐ</span>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removePricingTier(index)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 mt-5"
                      >
                        <MdDelete className="text-lg" />
                      </Button>
                    </div>
                  ))}

                  {pricingTiers.length > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-xs text-blue-700 font-medium mb-1">📊 Xem trước bảng giá:</p>
                      <div className="text-xs text-blue-600 space-y-1">
                        {pricingTiers
                          .filter((t) => t.minQty > 0 && t.price > 0)
                          .sort((a, b) => a.minQty - b.minQty)
                          .map((tier, idx) => (
                            <div key={idx}>
                              • Từ {tier.minQty} {form.unit || "đơn vị"}: {formatPrice(String(tier.price))} VNĐ
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {pricingTiers.length === 0 && (
                <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                  <p className="text-sm text-gray-500">
                    Chưa có mức giá nào. Nhấn thêm mức giá để tạo bảng giá theo số lượng.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Thuộc tính sản phẩm */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <MdLabel className="text-xl" /> Thuộc tính sản phẩm
            </h3>

            <div className="space-y-4">
              {/* Vùng miền */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Vùng miền phù hợp</label>
                <div className="flex flex-wrap gap-2">
                  {REGIONS.map((region) => (
                    <button
                      key={region.value}
                      type="button"
                      onClick={() => toggleArrayValue("region", region.value)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        form.region.includes(region.value)
                          ? "bg-green-600 text-white"
                          : "bg-white border border-gray-300 text-gray-700 hover:border-green-500"
                      }`}
                    >
                      {region.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tình trạng */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Tình trạng sản phẩm</label>
                <div className="flex flex-wrap gap-2">
                  {CONDITIONS.map((condition) => (
                    <button
                      key={condition.value}
                      type="button"
                      onClick={() => toggleArrayValue("condition", condition.value)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        form.condition.includes(condition.value)
                          ? "bg-blue-600 text-white"
                          : "bg-white border border-gray-300 text-gray-700 hover:border-blue-500"
                      }`}
                    >
                      {condition.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mùa vụ */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Mùa vụ</label>
                <div className="flex flex-wrap gap-2">
                  {SEASONS.map((season) => (
                    <button
                      key={season.value}
                      type="button"
                      onClick={() => toggleArrayValue("season", season.value)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        form.season.includes(season.value)
                          ? "bg-orange-600 text-white"
                          : "bg-white border border-gray-300 text-gray-700 hover:border-orange-500"
                      }`}
                    >
                      {season.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hướng dẫn */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <MdDescription className="text-xl" /> Hướng dẫn & Mô tả
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Hướng dẫn bảo quản</label>
                <Textarea
                  placeholder="VD: Bảo quản trong ngăn mát tủ lạnh từ 4-8°C, sử dụng trong vòng 3-5 ngày"
                  value={form.storageInstructions}
                  onChange={(e) => handleChange("storageInstructions", e.target.value)}
                  rows={2}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Hướng dẫn sử dụng</label>
                <Textarea
                  placeholder="VD: Rửa sạch trước khi sử dụng. Có thể ăn sống hoặc chế biến thành salad, nước ép..."
                  value={form.usageInstructions}
                  onChange={(e) => handleChange("usageInstructions", e.target.value)}
                  rows={2}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Mô tả chi tiết sản phẩm</label>
                <Textarea
                  placeholder="Mô tả đặc điểm, lợi ích, nguồn gốc sản phẩm để thu hút khách hàng..."
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Upload ảnh */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <MdImage className="text-xl" /> Hình ảnh sản phẩm <span className="text-red-500">*</span>
            </h3>

            <div className="space-y-3">
              <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 hover:bg-green-50 transition-colors">
                <div className="text-center">
                  <MdUpload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-green-600">Nhấn để tải ảnh</span> hoặc kéo thả
                  </p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG tối đa 5MB</p>
                </div>
                <input type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>

              {preview.length > 0 && (
                <div className="grid grid-cols-6 gap-3">
                  {preview.map((src, idx) => (
                    <div key={idx} className="relative group">
                      <Image
                        src={src || "/placeholder.svg"}
                        alt={`preview ${idx + 1}`}
                        width={120}
                        height={120}
                        className="rounded-lg object-cover border-2 border-gray-200 w-full h-24"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MdClose className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {errors.images && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <MdWarning className="text-sm" /> {errors.images}
                </p>
              )}
            </div>
          </div>

          {/* Kích hoạt */}
          <div className="flex items-center justify-between bg-green-50 p-4 rounded-lg border border-green-200">
            <div>
              <label className="font-medium text-gray-800">Kích hoạt sản phẩm ngay</label>
              <p className="text-sm text-gray-600 mt-1">Sản phẩm sẽ hiển thị công khai trên cửa hàng</p>
            </div>
            <Switch checked={form.isActive} onCheckedChange={(v) => handleChange("isActive", v)} />
          </div>
        </div>

        <DialogFooter className="mt-6 gap-2">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Hủy bỏ
          </Button>
          <Button onClick={handleCreate} disabled={loading} className="bg-green-600 hover:bg-green-700">
            {loading ? "Đang tạo..." : "✨ Tạo sản phẩm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
