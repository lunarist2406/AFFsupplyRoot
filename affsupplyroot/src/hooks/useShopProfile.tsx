/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react'
import useAuth from './useAuth'
import api from '@/lib/Axios/axios'

interface User {
  id: number
  name: string
  email: string
  phone: string | null
  avatar: string | null
}

export interface ShopProfile {
  id: number
  companyName: string
  brandName: string
  businessPhone: string
  businessAddress: string
  description: string
  shopAvatar: string | null
  shopBanner: string | null
  slug: string
  status: string
  createdAt: string
  updatedAt: string
  totalFollowers: number
  totalReviews: number
  avgRating: number
  rejectionReason: string | null
  sellerKycDocument?: any[]
  user: User
}

interface UpdateProfilePayload {
  companyName?: string
  brandName?: string
  businessPhone?: string
  businessAddress?: string
  description?: string
  shopAvatar?: File
  shopBanner?: File
}

const API_BASE = "api/v1/shop/profile"
export default function useShopProfile() {
  const { state } = useAuth()
  const [shopProfile, setShopProfile] = useState<ShopProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

    // --- GET profile ---
  const fetchProfile = useCallback(async () => {
    if (!state?.token) return;

    setLoading(true);
    try {
      const res = await api.get(API_BASE, {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      setShopProfile(res.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, [state?.token]); // chỉ thay đổi khi token thay đổi

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // --- PATCH update profile ---
  const updateProfile = async (payload: UpdateProfilePayload) => {
    if (!state?.token) return
    setLoading(true)
    try {
      const formData = new FormData()
      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value as any)
        }
      })

      const res = await api.patch(API_BASE, formData, {
        headers: {
          Authorization: `Bearer ${state.token}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      setShopProfile(res.data.data)
      return res.data.data
    } catch (err: any) {
      setError(err.response?.data?.message || err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }


  return { shopProfile, loading, error, fetchProfile, updateProfile }
}
