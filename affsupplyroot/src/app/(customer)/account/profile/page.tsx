"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getProfile, type ProfileData } from "@/services/profile";
import ProfileSidebar from "./profileSidebar";
import ProfileForm from "./profileForm";
import AddressSection from "./AddressSection";

// Tách logic dùng useSearchParams() ra component riêng
function ProfilePageContent() {
  const searchParams = useSearchParams();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "profile" | "address" | "change-password"
  >("profile");

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
    return <div className="container mx-auto px-4 py-8">Đang tải...</div>;
  if (error || !profile)
    return (
      <div className="container mx-auto px-4 py-8 text-red-500">
        {error || "Không có dữ liệu"}
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
      {showSuccessMessage && (
        <div className="md:col-span-4 mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
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
        </div>
      )}

      <div className="md:col-span-1">
        <ProfileSidebar
          user={profile}
          activeTab={activeTab}
          onTabChangeAction={setActiveTab}
        />
      </div>
      <div className="md:col-span-3">
        {activeTab === "profile" && (
          <ProfileForm initialData={profile} onUpdatedAction={setProfile} />
        )}
        {activeTab === "address" && (
          <AddressSection onCloseAction={() => setActiveTab("profile")} />
        )}
        {activeTab === "change-password" && (
          <div className="bg-white rounded-md shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6">Đổi Mật Khẩu</h2>
            <p className="text-gray-600 mb-4">
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
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<div>Đang tải trang hồ sơ...</div>}>
      <ProfilePageContent />
    </Suspense>
  );
}
