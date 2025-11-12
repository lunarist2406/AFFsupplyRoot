"use client";

import React, { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { getProfile, type ProfileData } from "@/services/profile";
import ProfileSidebar from "./profileSidebar";
import ProfileForm from "./profileForm";
import AddressSection from "./AddressSection";

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Đang tải trang hồ sơ...</div>}>
      <ProfilePageContent />
    </Suspense>
  );
}

function ProfilePageContent() {
  const searchParams = useSearchParams();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "address" | "change-password">("profile");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await getProfile();
        if (mounted) setProfile(res.data);
      } catch {
        if (mounted) setError("Không thể tải hồ sơ");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (searchParams.get("emailChanged") === "true") {
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
    }
  }, [searchParams]);

  if (loading)
    return <div className="flex justify-center items-center h-64 text-yellow-primary">Đang tải hồ sơ...</div>;
  if (error || !profile)
    return <div className="text-red-500 p-8 text-center">{error || "Không có dữ liệu"}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-950 via-gray-600 to-green-950 p-4 md:px-25 font-manuale">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-yellow-secondary mb-1">
          Hồ sơ cá nhân
        </h1>
        <p className="text-sm text-yellow-primary">
          Quản lý thông tin cá nhân và địa chỉ giao hàng của bạn
        </p>
      </motion.div>

      {showSuccessMessage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md"
        >
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-green-500 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-green-700 font-medium">
              Xác thực OTP thành công! Email đã được cập nhật.
            </span>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProfileSidebar
            user={profile}
            activeTab={activeTab}
            onTabChangeAction={setActiveTab}
          />
        </motion.div>

        {/* Content */}
        <motion.div
          className="md:col-span-3 space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === "profile" && (
            <ProfileForm initialData={profile} onUpdatedAction={setProfile} />
          )}

          {activeTab === "address" && (
            <AddressSection onCloseAction={() => setActiveTab("profile")} />
          )}

          {activeTab === "change-password" && (
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Đổi Mật Khẩu
              </h2>
              <p className="text-gray-600 mb-6">
                Nhập mật khẩu hiện tại và mật khẩu mới để thay đổi.
              </p>
              <button
                onClick={() =>
                  (window.location.href = "/account/profile/verify-password")
                }
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md"
              >
                Đổi mật khẩu
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
