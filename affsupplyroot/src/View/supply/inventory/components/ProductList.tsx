"use client";

import React, { useEffect, useState, useCallback } from "react";
import useProducts from "@/hooks/useProducts";
import useCategory from "@/hooks/useCategory";
import useCategoryGlobal from "@/hooks/useCategoryGlobal";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter, X, Package, Loader2, MapPin, Box, Eye, Star, ShoppingCart } from "lucide-react";
import Image from "next/image";

// Hàm format vùng miền
const formatRegion = (regions: string[]) => {
  const regionMap: Record<string, string> = {
    MIEN_NAM: "Miền Nam",
    MIEN_BAC: "Miền Bắc",
    MIEN_TRUNG: "Miền Trung",
  };
  return regions.map(r => regionMap[r] || r).join(", ");
};

export default function ProductList() {
  const { products, fetchProducts, loading } = useProducts();
  const { categories, fetchCategories } = useCategory();
  const { categoriesGlobal, fetchCategoriesGlobal } = useCategoryGlobal();

  const [selectedGlobal, setSelectedGlobal] = useState<number | null>(null);
  const [selectedShop, setSelectedShop] = useState<number | null>(null);

  const loadProducts = useCallback(() => {
    const params: Record<string, number | boolean> = {
      page: 1,
      limit: 20,
      isActive: true,
    };

    if (selectedGlobal) params.categoryGlobalID = selectedGlobal;
    if (selectedShop) params.categoryShopID = selectedShop;

    console.log("🟩 Fetching products with params:", params);
    fetchProducts(params);
  }, [fetchProducts, selectedGlobal, selectedShop]);

  useEffect(() => {
    console.log("🟢 Fetch initial data");
    fetchCategories();
    fetchCategoriesGlobal();
    loadProducts();
  }, [fetchCategories, fetchCategoriesGlobal, loadProducts]);

  const handleResetFilter = () => {
    console.log("🧹 Reset filter");
    setSelectedGlobal(null);
    setSelectedShop(null);
  };

  useEffect(() => {
    loadProducts();
  }, [selectedGlobal, selectedShop, loadProducts]);

  const hasActiveFilters = selectedGlobal !== null || selectedShop !== null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Danh sách sản phẩm
            </h1>
          </div>
          <p className="text-gray-600 ml-14">
            Khám phá và quản lý sản phẩm của bạn
          </p>
        </div>

        {/* Filter Section */}
        <Card className="mb-8 border-none shadow-xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Bộ lọc sản phẩm
              </h2>
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-2">
                  {(selectedGlobal ? 1 : 0) + (selectedShop ? 1 : 0)} đang áp dụng
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Global Category Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  Danh mục toàn hệ thống
                  {selectedGlobal && (
                    <Badge variant="outline" className="text-xs">
                      Đã chọn
                    </Badge>
                  )}
                </label>
                <Select
                  value={selectedGlobal ? String(selectedGlobal) : ""}
                  onValueChange={(val) => setSelectedGlobal(Number(val))}
                >
                  <SelectTrigger className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Chọn danh mục toàn hệ thống" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoriesGlobal.map((cat) => (
                      <SelectItem key={cat.id} value={String(cat.id)}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Shop Category Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  Danh mục cửa hàng
                  {selectedShop && (
                    <Badge variant="outline" className="text-xs">
                      Đã chọn
                    </Badge>
                  )}
                </label>
                <Select
                  value={selectedShop ? String(selectedShop) : ""}
                  onValueChange={(val) => setSelectedShop(Number(val))}
                >
                  <SelectTrigger className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Chọn danh mục cửa hàng" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={String(cat.id)}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Reset Button */}
              <div className="flex items-end">
                <Button
                  onClick={handleResetFilter}
                  variant="outline"
                  className="w-full hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all"
                  disabled={!hasActiveFilters}
                >
                  <X className="w-4 h-4 mr-2" />
                  Xóa tất cả bộ lọc
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-600 font-medium">Đang tải sản phẩm...</p>
          </div>
        ) : products.length === 0 ? (
          <Card className="border-dashed border-2 border-gray-300 bg-white/50">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Package className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Không tìm thấy sản phẩm
              </h3>
              <p className="text-gray-500 text-center max-w-md">
                Không có sản phẩm nào phù hợp với bộ lọc của bạn. Thử điều chỉnh bộ lọc hoặc xóa bộ lọc để xem tất cả sản phẩm.
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">
                Hiển thị <span className="font-semibold text-gray-900">{products.length}</span> sản phẩm
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((p) => (
                <Card
                  key={p.id}
                  className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white"
                >
                  {/* Product Image */}
                  <div className="relative overflow-hidden aspect-square bg-gradient-to-br from-gray-100 to-gray-200">
                    <Image
                      src={p.ProductImage?.[0]?.url || "/placeholder.png"}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      height={400}
                      width={400}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Status Badge */}
                    {p.stock > 0 ? (
                      <Badge className="absolute top-3 right-3 bg-green-500 text-white border-none">
                        Còn hàng
                      </Badge>
                    ) : (
                      <Badge className="absolute top-3 right-3 bg-red-500 text-white border-none">
                        Hết hàng
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-4 space-y-3">
                    {/* Product Title */}
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors min-h-[3rem]">
                      {p.title}
                    </h3>
                    
                    {/* Price */}
                    <div className="flex items-baseline gap-2 pb-3 border-b border-gray-100">
                      <span className="text-2xl font-bold text-blue-600">
                        {new Intl.NumberFormat('vi-VN').format(p.basePrice * 1000)}
                      </span>
                      <span className="text-sm text-gray-500">₫</span>
                      <span className="text-xs text-gray-400">/ {p.unit}</span>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-2">
                      {/* Stock */}
                      <div className="flex items-center gap-2 text-sm">
                        <Box className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Kho:</span>
                        <span className="font-semibold text-gray-900">{p.stock} {p.unit}</span>
                      </div>

                      {/* Region */}
                      {p.region && p.region.length > 0 && (
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Vùng:</span>
                          <span className="font-medium text-gray-900">{formatRegion(p.region)}</span>
                        </div>
                      )}

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-xs text-gray-500 pt-2">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{p.viewCount}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>{p.soldCount} đã bán</span>
                        </div>
                        {p.avgRating > 0 && (
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                            <span>{p.avgRating.toFixed(1)}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white">
                      Xem chi tiết
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}