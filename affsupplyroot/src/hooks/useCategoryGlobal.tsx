import { useState, useEffect } from 'react';
import api from '@/lib/Axios/axios';

const API_BASE = '/api/v1/categories-global';
const API_PUBLIC_BASE = '/api/v1/public/categories-global';

export default function useCategoryGlobal() {
  const [categoriesGlobal, setCategoriesGlobal] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  // 📦 GET: danh sách Category Global (có thể có search, page, limit)
  const fetchCategoriesGlobal = async (params?: { page?: number; limit?: number; search?: string }) => {
    setLoading(true);
    try {
      const res = await api.get(API_PUBLIC_BASE, { params });
      // ✅ API trả về data.data.items
      const items = res.data?.data?.items;
      if (Array.isArray(items)) {
        setCategoriesGlobal(items);
      } else {
        console.warn('⚠️ Dữ liệu trả về không phải là mảng:', res.data);
        setCategoriesGlobal([]);
      }
    } catch (err) {
      console.error('❌ Lỗi khi fetch category global:', err);
      setCategoriesGlobal([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 GET: chi tiết Category Global + danh sách sản phẩm
  const fetchCategoryGlobalById = async (id: number, params?: { page?: number; limit?: number; search?: string }) => {
    setLoading(true);
    try {
      const res = await api.get(`${API_PUBLIC_BASE}/${id}`, { params });
      return res.data.data;
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // 🆕 POST: tạo Category Global
  const createCategoryGlobal = async (data: { name: string; description?: string; image?: File | null }) => {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.description) formData.append('description', data.description);
    if (data.image) formData.append('image', data.image);

    try {
      const res = await api.post(API_BASE, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    } catch (err: any) {
      setError(err);
      throw err;
    }
  };

  // ✏️ PATCH: cập nhật Category Global
  const updateCategoryGlobal = async (id: string | number, data: { name?: string; description?: string; image?: File | null }) => {
    const formData = new FormData();
    if (data.name) formData.append('name', data.name);
    if (data.description) formData.append('description', data.description);
    if (data.image) formData.append('image', data.image);

    try {
      const res = await api.patch(`${API_BASE}/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    } catch (err: any) {
      setError(err);
      throw err;
    }
  };

  // 🗑 DELETE: xóa Category Global
  const deleteCategoryGlobal = async (id: string | number) => {
    try {
      const res = await api.delete(`${API_BASE}/${id}`);
      return res.data;
    } catch (err: any) {
      setError(err);
      throw err;
    }
  };

  // 🔁 Lần đầu load danh sách
  useEffect(() => {
    fetchCategoriesGlobal({ page: 1, limit: 10 });
  }, []);

  return {
    categoriesGlobal,
    loading,
    error,
    fetchCategoriesGlobal,
    fetchCategoryGlobalById,
    createCategoryGlobal,
    updateCategoryGlobal,
    deleteCategoryGlobal,
  };
}
