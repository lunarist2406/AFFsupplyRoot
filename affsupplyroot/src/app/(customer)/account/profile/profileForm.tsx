"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { editProfile, type ProfileData } from "@/services/profile"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

interface Props {
  initialData: ProfileData
  onUpdatedAction: (p: ProfileData) => void
}

export default function ProfileForm({ initialData, onUpdatedAction }: Props) {
  const router = useRouter()
  const [name, setName] = useState(initialData.name)
  const [phone, setPhone] = useState(initialData.phone || "")
  const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    try {
      await editProfile({ name, phone, avatar: avatarFile })
      onUpdatedAction({ ...initialData, name, phone, avatar: avatarPreview || initialData.avatar })
      toast.success("Cập nhật hồ sơ thành công!")
    } finally {
      setSubmitting(false)
    }
  }

  const handleChangeEmail = () => {
    router.push("/account/profile/change-email")
  }

  return (
    <section className="bg-white rounded-md shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-6">Hồ Sơ Của Tôi</h2>
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div>
            <div className="text-sm text-gray-600 mb-1">Email</div>
            <div className="flex gap-2">
              <Input value={initialData.email} disabled readOnly className="flex-1" />
              <Button
                type="button"
                variant="outline"
                onClick={handleChangeEmail}
                className="px-4 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
              >
                Đổi email
              </Button>
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Tên</div>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nhập tên hiển thị" />
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Số điện thoại</div>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Thêm số điện thoại" />
          </div>
          <Button type="submit" disabled={submitting} className="w-32">{submitting ? "Đang lưu..." : "Lưu"}</Button>
        </div>
        <div className="md:col-span-1">
          <div className="text-sm text-gray-600 mb-2">Ảnh đại diện</div>
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 mb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatarPreview || initialData.avatar || "/logo.png"} alt="avatar" className="w-full h-full object-cover" />
          </div>
          <input
            id="avatar-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              setAvatarFile(file)
              if (file) {
                const reader = new FileReader()
                reader.onload = () => setAvatarPreview(reader.result as string)
                reader.readAsDataURL(file)
              }
            }}
          />
          <button
            type="button"
            onClick={() => document.getElementById("avatar-input")?.click()}
            className="px-3 py-2 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white"
          >
            Chọn ảnh
          </button>
          <p className="text-xs text-gray-500 mt-2">Dung lượng tối đa 1MB. Định dạng: JPEG, PNG</p>
        </div>
      </form>
    </section>
  )
}

