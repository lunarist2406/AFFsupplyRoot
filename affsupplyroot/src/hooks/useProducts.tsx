import { useState, useCallback, useEffect } from "react";
import useAuth from "./useAuth";
import api from "@/lib/Axios/axios";

const API_BASE = "api/v1/shop/seller/product";

export default function useProducts() {
  const { state } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const headers = {
    Authorization: `Bearer ${state?.token}`,
    "Content-Type": "application/json",
    
  };

  // 🟢 Fetch sản phẩm
  const fetchProducts = useCallback(
    async (params?: {
      page?: number;
      limit?: number;
      search?: string;
      categoryGlobalID?: number;
      categoryShopID?: number;
      isActive?: boolean;
    }) => {
      if (!state?.token) return [];
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(API_BASE, { headers, params });
        console.log("API response:", response.data);
        const items = response.data?.data?.products || [];
        setProducts(items);
        return items;
      } catch (err: any) {
        console.error("❌ Lỗi fetch products:", err);
        setError(err.response?.data?.message || err.message);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [state?.token]
  );

  // 🟢 Lấy chi tiết sản phẩm
  const getProductById = useCallback(
    async (id: number) => {
      if (!state?.token) return null;
      try {
        const response = await api.get(`${API_BASE}/${id}`, { headers });
            console.log("GetProductById response:", response.data);

        return response.data?.data;
        
      } catch (err) {
        console.error("❌ Lỗi lấy chi tiết sản phẩm:", err);
        throw err;
      }
    },
    [state?.token]
  );

  // 🟢 Tạo sản phẩm mới
const createProduct = useCallback(
  async (formData: any, fileList: File[]) => {
    const form = new FormData();

    // 📝 String fields
    [
      "title",
      "description",
      "origin",
      "brand",
      "unit",
      "certifications",
      "storageInstructions",
      "usageInstructions",
    ].forEach((key) => {
      if (formData[key]) form.append(key, String(formData[key]));
    });

    // 🔢 Number fields
    [
      "basePrice",
      "stock",
      "minOrderQty",
      "categoryGlobalID",
      "categoryShopID",
    ].forEach((key) => {
      if (formData[key] !== undefined && formData[key] !== null)
        form.append(key, String(Number(formData[key])));
    });

    // ✅ Boolean
    form.append("isActive", String(Boolean(formData.isActive)));

    // 🧩 Array fields
    ["region", "condition", "season"].forEach((key) => {
      let value = formData[key] ?? [];
      if (!Array.isArray(value)) value = [value];
      value
        .flat(Infinity)
        .map(String)
        .map((v: any) => v.trim())
        .filter(Boolean)
        .forEach((v: any) => form.append(key, v));
    });

    // 🖼️ Images
        fileList.forEach((file) => form.append("images", file));

    // 👀 Debug log
    console.log("FormData entries:", [...form.entries()]);

    // 🧠 Quan trọng: override header JSON cũ
    const response = await api.post(API_BASE, form, {
      headers: {
        Authorization: `Bearer ${state?.token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },
  [state?.token]
);


  // 🟢 Cập nhật sản phẩm
  const updateProduct = useCallback(
    async (id: number, data: any) => {
      try {
        const response = await api.patch(`${API_BASE}/${id}`, data, { headers });
        return response.data;
      } catch (err) {
        console.error("❌ Lỗi cập nhật sản phẩm:", err);
        throw err;
      }
    },
    [state?.token]
  );

  // 🟢 Xóa sản phẩm
  const deleteProduct = useCallback(
    async (id: number) => {
      try {
        const response = await api.delete(`${API_BASE}/${id}`, { headers });
        return response.data;
      } catch (err) {
        console.error("❌ Lỗi xóa sản phẩm:", err);
        throw err;
      }
    },
    [state?.token]
  );

  // 🟢 Upload ảnh sản phẩm
  const addProductImage = useCallback(
    async (id: number, images: File[]) => {
      const form = new FormData();
      images.forEach((img) => form.append("images", img));

      const response = await api.post(`${API_BASE}/${id}/images`, form, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    [state?.token]
  );

  // 🟢 Đặt ảnh chính
  const setMainImage = useCallback(
    async (id: number, imageId: number) => {
      const response = await api.patch(
        `${API_BASE}/${id}/images/${imageId}/set-main`,
        {},
        { headers }
      );
      return response.data;
    },
    [state?.token]
  );

  // 🟢 Xóa ảnh
  const deleteProductImage = useCallback(
    async (id: number, imageId: number) => {
      const response = await api.delete(
        `${API_BASE}/${id}/images/${imageId}`,
        { headers }
      );
      return response.data;
    },
    [state?.token]
  );

  // 🟢 Cập nhật thông tin sản phẩm


  // 🟢 Cập nhật trạng thái (ẩn / kích hoạt)
  const changeStatus = useCallback(
    async (id: number) => {
      const response = await api.patch(`${API_BASE}/${id}/change-status`, {}, { headers });
      return response.data;
    },
    [state?.token]
  );

  // --- Auto fetch khi token có sẵn ---
  useEffect(() => {
    if (state?.token) fetchProducts({ page: 1, limit: 20, isActive: true });
  }, [state?.token, fetchProducts]);

  return {
    products,
    loading,
    error,
    fetchProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    addProductImage,
    deleteProductImage,
    setMainImage,
    changeStatus,
  };
}
