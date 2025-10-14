"use client"

import type { ProfileData } from "@/services/profile"

interface Props { 
  user: ProfileData
  activeTab: "profile" | "address" | "change-password"
  onTabChangeAction: (tab: "profile" | "address" | "change-password") => void
}

export default function ProfileSidebar({ user, activeTab, onTabChangeAction }: Props) {
  const menuItems = [
    { key: "profile" as const, label: "Hồ Sơ" },
    { key: "address" as const, label: "Địa Chỉ" },
    { key: "change-password" as const, label: "Đổi Mật Khẩu" }
  ]

  return (
    <aside className="bg-white rounded-md shadow-sm p-4 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={user.avatar || "/logo.png"} alt={user.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="font-semibold">{user.name}</div>
          <div className="text-xs text-gray-500">{user.email}</div>
          <div className="text-[11px] text-green-700 mt-1 inline-block bg-green-50 border border-green-200 px-2 py-0.5 rounded">
            {user.Role?.name || "User"} • {user.status}
          </div>
        </div>
      </div>
      <nav className="text-sm space-y-3">
        <div className="font-semibold text-gray-500">Tài Khoản Của Tôi</div>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => onTabChangeAction(item.key)}
                    className={`w-full text-left block py-1 px-2 rounded transition-colors ${
                      activeTab === item.key
                        ? "text-orange-600 font-medium bg-orange-50"
                        : "text-gray-600 hover:text-orange-600 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
      </nav>
    </aside>
  )
}

