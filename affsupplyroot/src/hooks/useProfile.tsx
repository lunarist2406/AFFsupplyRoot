import { useState, useEffect } from "react";
import api from "@/lib/Axios/axios";
import useAuth from "./useAuth";

export default function useProfile() {
  const { state } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- GET Profile ---
  const fetchProfile = async () => {
    if (!state?.token) return;
    setLoading(true);
    try {
      const res = await api.get("/api/v1/profile", {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      setProfile(res.data.data);
    } catch (err:any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- PATCH Update Profile ---
  const updateProfile = async (payload:any) => {
    if (!state?.token) return;
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (typeof value === "object" && !(value instanceof Blob)) {
            formData.append(key, JSON.stringify(value));
          } else if (typeof value === "string" || value instanceof Blob) {
            formData.append(key, value);
          } else {
            formData.append(key, String(value));
          }
        }
      });
      const res = await api.patch("/api/v1/profile", formData, {
        headers: {
          Authorization: `Bearer ${state.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setProfile(res.data.data);
      return res.data.data;
    } catch (err:any) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // --- Change Password ---
  const changePassword = async (userID:any, payload:any) => {
    if (!state?.token) return;
    setLoading(true);
    try {
      const res = await api.patch(`/api/v1/profile/change-password/${userID}`, payload, {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      return res.data;
    } catch (err:any) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // --- GET Change Email ---
  const fetchEmail = async () => {
    if (!state?.token) return;
    setLoading(true);
    try {
      const res = await api.get("/api/v1/profile/change-email", {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      return res.data;
    } catch (err:any) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // --- Verify OTP Email ---
  const verifyOtpEmail = async (payload:any) => {
    if (!state?.token) return;
    setLoading(true);
    try {
      const res = await api.post("/api/v1/profile/verify-otp-email", payload, {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      return res.data;
    } catch (err:any) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // --- Resend OTP Email ---
  const resendOtpEmail = async () => {
    if (!state?.token) return;
    setLoading(true);
    try {
      const res = await api.post("/api/v1/profile/resend-otp-email", null, {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      return res.data;
    } catch (err:any) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // --- Reset Email ---
  const resetEmail = async (payload:any) => {
    if (!state?.token) return;
    setLoading(true);
    try {
      const res = await api.post("/api/v1/profile/reset-email", payload, {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      return res.data;
    } catch (err:any) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [state?.token]);

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile,
    changePassword,
    fetchEmail,
    verifyOtpEmail,
    resendOtpEmail,
    resetEmail,
  };
}
