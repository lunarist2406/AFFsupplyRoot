"use client"

import { useState, useEffect } from "react"
import { 
  getAddresses, 
  createAddress, 
  updateAddress, 
  deleteAddress, 
  setDefaultAddress,
  type AddressData,
  type CreateAddressPayload 
} from "@/services/profile"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

interface Props {
  onCloseAction: () => void
}

export default function AddressSection({ onCloseAction }: Props) {
  const [addresses, setAddresses] = useState<AddressData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<AddressData | null>(null)
  const [formData, setFormData] = useState<CreateAddressPayload>({
    fullName: "",
    phone: "",
    province: "",
    district: "",
    ward: "",
    street: "",
    isDefault: false
  })

  useEffect(() => {
    fetchAddresses()
  }, [])

  const fetchAddresses = async () => {
    try {
      const res = await getAddresses()
      setAddresses(res.data)
    } catch {
      setError("Không thể tải danh sách địa chỉ")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.fullName || !formData.phone || !formData.province || !formData.district || !formData.ward || !formData.street) {
      setError("Vui lòng điền đầy đủ thông tin")
      return
    }

    try {
      if (editingAddress) {
        await updateAddress(editingAddress.id, formData)
        toast.success("Cập nhật địa chỉ thành công!")
      } else {
        await createAddress(formData)
        toast.success("Thêm địa chỉ thành công!")
      }
      
      await fetchAddresses()
      setShowAddForm(false)
      setEditingAddress(null)
      setFormData({
        fullName: "",
        phone: "",
        province: "",
        district: "",
        ward: "",
        street: "",
        isDefault: false
      })
      setError(null)
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as { response: { data: { message: string } } }).response?.data?.message 
        : "Không thể lưu địa chỉ"
      setError(errorMessage)
    }
  }

  const handleEdit = (address: AddressData) => {
    setEditingAddress(address)
    setFormData({
      fullName: address.fullName,
      phone: address.phone,
      province: address.province,
      district: address.district,
      ward: address.ward,
      street: address.street,
      isDefault: address.isDefault
    })
    setShowAddForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa địa chỉ này?")) return
    
    try {
      await deleteAddress(id)
      await fetchAddresses()
      toast.success("Xóa địa chỉ thành công!")
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as { response: { data: { message: string } } }).response?.data?.message 
        : "Không thể xóa địa chỉ"
      setError(errorMessage)
    }
  }

  const handleSetDefault = async (id: number) => {
    try {
      await setDefaultAddress(id)
      await fetchAddresses()
      toast.success("Đặt địa chỉ mặc định thành công!")
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as { response: { data: { message: string } } }).response?.data?.message 
        : "Không thể đặt làm mặc định"
      setError(errorMessage)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-md shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="bg-white rounded-md shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Địa Chỉ Của Tôi</h2>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            Thêm địa chỉ
          </Button>
          <Button
            onClick={onCloseAction}
            variant="outline"
          >
            Đóng
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
          {error}
        </div>
      )}

      {showAddForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 border border-gray-200 rounded-md">
          <h3 className="font-medium mb-4">
            {editingAddress ? "Sửa địa chỉ" : "Thêm địa chỉ mới"}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
              <Input
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Nhập họ và tên"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                  setFormData({ ...formData, phone: value });
                }}
                placeholder="Nhập số điện thoại"
                required
                pattern="[0-9]{10}"
                maxLength={10}
                inputMode="numeric"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tỉnh/Thành phố</label>
              <Input
                value={formData.province}
                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                placeholder="Nhập tỉnh/thành phố"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quận/Huyện</label>
              <Input
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                placeholder="Nhập quận/huyện"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phường/Xã</label>
              <Input
                value={formData.ward}
                onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                placeholder="Nhập phường/xã"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ chi tiết</label>
              <Input
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                placeholder="Nhập địa chỉ chi tiết"
                required
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isDefault}
                onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Đặt làm địa chỉ mặc định</span>
            </label>
          </div>
          
          <div className="mt-4 flex gap-2">
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
              {editingAddress ? "Cập nhật" : "Thêm"}
            </Button>
            <Button
              type="button"
              onClick={() => {
                setShowAddForm(false)
                setEditingAddress(null)
                setFormData({
                  fullName: "",
                  phone: "",
                  province: "",
                  district: "",
                  ward: "",
                  street: "",
                  isDefault: false
                })
              }}
              variant="outline"
            >
              Hủy
            </Button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {addresses.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Bạn chưa có địa chỉ nào.</p>
            <Button
              onClick={() => setShowAddForm(true)}
              className="mt-2 bg-orange-500 hover:bg-orange-600 text-white"
            >
              Thêm địa chỉ đầu tiên
            </Button>
          </div>
        ) : (
          addresses.map((address) => (
            <div
              key={address.id}
              className="border border-gray-200 rounded-md p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium">{address.fullName}</h3>
                    {address.isDefault && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">
                        Mặc định
                      </span>
                    )}
                  </div>
                  <div className="mb-1">
                    <span className="font-medium text-xs text-gray-500 mr-1">Họ và tên:</span>
                    <span className="text-sm text-gray-700">{address.fullName}</span>
                  </div>
                  <div className="mb-1">
                    <span className="font-medium text-xs text-gray-500 mr-1">Số điện thoại:</span>
                    <span className="text-sm text-gray-700">{address.phone}</span>
                  </div>
                  <div>
                    <span className="font-medium text-xs text-gray-500 mr-1">Địa chỉ:</span>
                    <span className="text-sm text-gray-700">{address.street}, {address.ward}, {address.district}, {address.province}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  {!address.isDefault && (
                    <Button
                      onClick={() => handleSetDefault(address.id)}
                      variant="outline"
                      size="sm"
                      className="text-orange-600 border-orange-300 hover:bg-orange-50"
                    >
                      Đặt mặc định
                    </Button>
                  )}
                  <Button
                    onClick={() => handleEdit(address)}
                    variant="outline"
                    size="sm"
                  >
                    Sửa
                  </Button>
                  <Button
                    onClick={() => handleDelete(address.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    Xóa
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
