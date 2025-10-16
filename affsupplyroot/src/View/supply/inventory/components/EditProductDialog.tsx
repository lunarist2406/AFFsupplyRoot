/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import useProducts from "@/hooks/useProducts";
import { toast } from "sonner";

interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
  productData: any;
  onUpdated: () => void;
}

const regions = ["MIEN_BAC", "MIEN_TRUNG", "MIEN_NAM"];
const conditions = ["FRESH", "PROCESSED", "DRIED"];
const seasons = ["SPRING", "SUMMER", "AUTUMN", "WINTER"];

const EditProductModal: React.FC<EditProductModalProps> = ({
  open,
  onClose,
  productData,
  onUpdated,
}) => {
  const [formData, setFormData] = useState({
    categoryGlobalID: 0,
    categoryShopID: 0,
    title: "",
    description: "",
    origin: "",
    brand: "",
    unit: "",
    region: [] as string[],
    condition: [] as string[],
    season: [] as string[],
    storageInstructions: "",
    usageInstructions: "",
    certifications: "",
    stock: 0,
    minOrderQty: 1,
    basePrice: 0,
    PricingTier: "",
    isActive: true,
  });
  const {updateProduct} = useProducts();
  const [loading, setLoading] = useState(false);
  console.log("🚀 ~ file: EditProductDialog.tsx:57 ~ EditProductModal ~ productData:", productData)
  useEffect(() => {
    if (productData) {
      setFormData({
        ...productData,
        PricingTier: JSON.stringify(
          productData.PricingTier ?? [],
          null,
          2
        ),
      });
    }
  }, [productData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxGroup = (key: string, value: string) => {
    setFormData(prev => {
      const current = prev[key as keyof typeof prev] as string[];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [key]: updated };
    });
  };

const handleSubmit = async () => {
  setLoading(true);
  try {
    // Lọc ra chỉ những trường hợp BE cho phép
    const {
      categoryGlobalID,
      categoryShopID,
      title,
      description,
      origin,
      brand,
      unit,
      region,
      condition,
      season,
      storageInstructions,
      usageInstructions,
      certifications,
      stock,
      minOrderQty,
      basePrice,
      PricingTier,
      isActive,
    } = formData;

    // Chuẩn hoá lại payload gửi đi
    const payload = {
      categoryGlobalID,
      categoryShopID,
      title,
      description,
      origin,
      brand,
      unit,
      region: Array.isArray(region) ? region : [region],
      condition: Array.isArray(condition) ? condition : [condition],
      season: Array.isArray(season) ? season : [season],
      storageInstructions,
      usageInstructions,
      certifications,
      stock: Number(stock),
      minOrderQty: Number(minOrderQty),
      basePrice: Number(basePrice),
      PricingTier: JSON.parse(PricingTier || "[]"),
      isActive: Boolean(isActive),
    };

    console.log("📦 Payload gửi đi:", payload);

    await updateProduct(productData.id, payload);
    toast.success("✅ Cập nhật sản phẩm thành công!");
    onUpdated();
    onClose();
  } catch (err: any) {
    console.error("❌ Lỗi khi cập nhật sản phẩm:", err);
    toast.error(err.response?.data?.toast || "Lỗi khi cập nhật sản phẩm!");
  } finally {
    setLoading(false);
  }
};


  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl font-manuale">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Cập nhật sản phẩm
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Tiêu đề</Label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Thương hiệu</Label>
              <Input
                name="brand"
                value={formData.brand}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Xuất xứ</Label>
              <Input
                name="origin"
                value={formData.origin}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Đơn vị</Label>
              <Input
                name="unit"
                value={formData.unit}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Tồn kho</Label>
              <Input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Giá cơ bản</Label>
              <Input
                type="number"
                name="basePrice"
                value={formData.basePrice}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Số lượng tối thiểu</Label>
              <Input
                type="number"
                name="minOrderQty"
                value={formData.minOrderQty}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Chứng nhận</Label>
              <Input
                name="certifications"
                value={formData.certifications}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <Label>Mô tả</Label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div>
            <Label>Hướng dẫn sử dụng</Label>
            <Textarea
              name="usageInstructions"
              value={formData.usageInstructions}
              onChange={handleChange}
              rows={2}
            />
          </div>

          <div>
            <Label>Bảo quản</Label>
            <Textarea
              name="storageInstructions"
              value={formData.storageInstructions}
              onChange={handleChange}
              rows={2}
            />
          </div>

          {/* Multi-select region, condition, season */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Vùng miền</Label>
              {regions.map(r => (
                <div key={r} className="flex items-center gap-2 mt-1">
                  <Checkbox
                    checked={formData.region.includes(r)}
                    onCheckedChange={() => handleCheckboxGroup("region", r)}
                  />
                  <span>{r}</span>
                </div>
              ))}
            </div>

            <div>
              <Label>Điều kiện</Label>
              {conditions.map(c => (
                <div key={c} className="flex items-center gap-2 mt-1">
                  <Checkbox
                    checked={formData.condition.includes(c)}
                    onCheckedChange={() => handleCheckboxGroup("condition", c)}
                  />
                  <span>{c}</span>
                </div>
              ))}
            </div>

            <div>
              <Label>Mùa vụ</Label>
              {seasons.map(s => (
                <div key={s} className="flex items-center gap-2 mt-1">
                  <Checkbox
                    checked={formData.season.includes(s)}
                    onCheckedChange={() => handleCheckboxGroup("season", s)}
                  />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Bảng giá theo số lượng (JSON)</Label>
            <Textarea
              name="PricingTier"
              value={formData.PricingTier}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Đang lưu..." : "Cập nhật"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
