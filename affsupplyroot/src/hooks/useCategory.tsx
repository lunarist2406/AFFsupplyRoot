/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/lib/Axios/axios';
import { useState, useEffect, useCallback } from 'react';
import useAuth from './useAuth';

const API_BASE = 'api/v1/categories-shop';

export default function useCategory() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const { state } = useAuth();

    const fetchCategories = useCallback(async () => {
      if (!state?.token) return; 
      setLoading(true);

      try {
        const res = await api.get(API_BASE, {
          headers: { Authorization: `Bearer ${state.token}` },
        });

        const data = res.data;
        if (Array.isArray(data)) setCategories(data);
        else if (data?.data && Array.isArray(data.data)) setCategories(data.data);
        else if (data?.items && Array.isArray(data.items)) setCategories(data.items);
        else {
          console.warn("Unexpected categories format:", data);
          setCategories([]);
        }
      } catch (err: any) {
        console.error("Lỗi fetchCategories:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }, [state?.token]);

    useEffect(() => {
      fetchCategories();
    }, [fetchCategories]);


  const fetchCategoryDetail = async (id: any) => {
    if (!state?.token) return;
    try {
      const res = await api.get(`${API_BASE}/${id}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      return res.data;
    } catch (err: any) {
      setError(err);
    }
  };

  const createCategory = async (data: any) => {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.description) formData.append('description', data.description);
    if (data.categoryGlobalId) formData.append('categoryGlobalId', data.categoryGlobalId);
    if (data.image) formData.append('image', data.image);

    try {
      const res = await api.post(API_BASE, formData, {
        headers: {
          Authorization: `Bearer ${state?.token || ''}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      await fetchCategories(); // tự cập nhật lại list
      return res.data;
    } catch (err: any) {
      setError(err);
    }
  };

  const updateCategory = async (id: any, data: any) => {
    if (!state?.token) return;

    const formData = new FormData();
    if (data.name) formData.append('name', data.name);
    if (data.description) formData.append('description', data.description);
    if (data.categoryGlobalId) formData.append('categoryGlobalId', data.categoryGlobalId);
    if (data.image) formData.append('image', data.image);

    try {
      const res = await api.patch(`${API_BASE}/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      await fetchCategories();
      return res.data;
    } catch (err: any) {
      setError(err);
    }
  };

  const deleteCategory = async (id: any) => {
    if (!state?.token) return;

    try {
      const res = await api.delete(`${API_BASE}/${id}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      await fetchCategories();
      return res.data;
    } catch (err: any) {
      setError(err);
    }
  };



  return {
    categories,
    loading,
    error,
    fetchCategories,
    fetchCategoryDetail,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}
