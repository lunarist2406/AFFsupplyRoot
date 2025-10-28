import { useState, useMemo } from "react";
import api from "@/lib/Axios/axios";
import useAuth from "./useAuth";
import { toast } from "sonner";

export interface SellerPayload {
  companyName: string;
  brandName: string;
  businessPhone: string;
  businessAddress: string;
  description: string;
  taxCode?: string;
  logo?: File | Blob;
  document?: File | Blob;
}

export interface SellerProfile {
  id: string;
  userId: string;
  companyName: string;
  brandName: string;
  businessPhone: string;
  businessAddress: string;
  description: string;
  taxCode?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
  logoUrl?: string;
  documentUrl?: string;
}

export interface Seller extends SellerProfile {
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
  };
}

interface APIResponse<T> {
  data: T;
  message?: string;
  status?: number;
}

export default function useRegisterSeller() {
  const { state } = useAuth();
  const token = state?.token;
  const [loading, setLoading] = useState(false);

  // 🔑 Tạo header động có token
  const headers = useMemo(() => ({
    Authorization: `Bearer ${state?.token}`,
    "Content-Type": "application/json",
  }), [state?.token]);

  // ==============================
  // 🟢 1️⃣ Đăng ký Seller
  // ==============================
  const registerSeller = async (payload: SellerPayload) => {
    if (!token) {
      toast.error("⚠️ Vui lòng đăng nhập trước khi thực hiện hành động này!");
      return;
    }

    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value) formData.append(key, value instanceof Blob ? value : String(value));
    });

    try {
      setLoading(true);
      const { data } = await api.post<APIResponse<SellerProfile>>(
        "/api/v1/seller/register",
        formData,
        { headers: { ...headers, "Content-Type": "multipart/form-data" } }
      );
      toast.success("🎉 Đăng ký seller thành công!");
      return data.data;
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Lỗi khi đăng ký seller");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // 🟡 2️⃣ Lấy profile seller
  // ==============================
  const fetchSellerProfile = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const { data } = await api.get<APIResponse<SellerProfile>>(
        "/api/v1/seller/register/profile",
        { headers }
      );
      return data.data;
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Không thể tải profile seller");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // 🟠 3️⃣ Lấy danh sách seller (admin)
  // ==============================
  const fetchSellers = async (status?: string) => {
    if (!token) return [];
    setLoading(true);
    try {
      const { data } = await api.get<APIResponse<Seller[]>>("/api/v1/sellers", {
        headers,
        params: status ? { status } : {},
      });
      return data.data;
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Không thể tải danh sách seller");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // 🔵 4️⃣ Lấy chi tiết seller
  // ==============================
  const fetchSellerDetail = async (id: string) => {
    if (!token) return null;
    setLoading(true);
    try {
      const { data } = await api.get<APIResponse<Seller>>(`/api/v1/sellers/${id}`, { headers });
      return data.data;
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Không thể tải chi tiết seller");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // 🟣 5️⃣ Duyệt seller
  // ==============================
  const approveSeller = async (id: string) => {
    if (!token) return;
    try {
      setLoading(true);
      await api.patch(`/api/v1/sellers/${id}/approve`, { headers });
      toast.success("✅ Seller đã được duyệt!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Lỗi khi duyệt seller");
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // 🔻 6️⃣ Từ chối seller
  // ==============================
  const rejectSeller = async (id: string, reason: string) => {
    if (!token) return;
    try {
      setLoading(true);
      await api.patch(`/api/v1/sellers/${id}/reject`, { rejectionReason: reason }, { headers });
      toast.success("🚫 Đã từ chối hồ sơ seller.");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Lỗi khi từ chối seller");
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // 🔁 7️⃣ Gửi lại hồ sơ seller
  // ==============================
  const resubmitSeller = async (payload: SellerPayload) => {
    if (!token) return;

    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value) formData.append(key, value instanceof Blob ? value : String(value));
    });

    try {
      setLoading(true);
      const { data } = await api.patch<APIResponse<SellerProfile>>(
        "/api/v1/seller/register/resubmit",
        formData,
        { headers: { ...headers, "Content-Type": "multipart/form-data" } }
      );
      toast.success("🔄 Gửi lại hồ sơ thành công!");
      return data.data;
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Lỗi khi gửi lại hồ sơ seller");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    registerSeller,
    fetchSellerProfile,
    fetchSellers,
    fetchSellerDetail,
    approveSeller,
    rejectSeller,
    resubmitSeller,
  };
}
