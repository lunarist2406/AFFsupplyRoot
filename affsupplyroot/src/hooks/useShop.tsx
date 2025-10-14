import { useState, useEffect } from 'react';
import api from '@/lib/Axios/axios';

const API_BASE = '/api/v1/shop/profile';

export default function useShop() {
  const [shop, setShop] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  // Lấy profile shop
  const fetchShopProfile = async () => {
    setLoading(true);
    try {
      const res = await api.get(API_BASE);
      setShop(res.data.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật shop
  const updateShopProfile = async (data: {
    companyName?: string;
    brandName?: string;
    businessPhone?: string;
    businessAddress?: string;
    description?: string;
    shopAvatar?: File | null;
    shopBanner?: File | null;
  }) => {
    const formData = new FormData();
    if (data.companyName) formData.append('companyName', data.companyName);
    if (data.brandName) formData.append('brandName', data.brandName);
    if (data.businessPhone) formData.append('businessPhone', data.businessPhone);
    if (data.businessAddress) formData.append('businessAddress', data.businessAddress);
    if (data.description) formData.append('description', data.description);
    if (data.shopAvatar) formData.append('shopAvatar', data.shopAvatar);
    if (data.shopBanner) formData.append('shopBanner', data.shopBanner);

    setLoading(true);
    try {
      const res = await api.patch(API_BASE, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setShop(res.data.data);
      return res.data;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShopProfile();
  }, []);

  return {
    shop,
    loading,
    error,
    fetchShopProfile,
    updateShopProfile,
  };
}
