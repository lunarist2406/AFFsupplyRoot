import api from "@/lib/Axios/axios"

export interface ProfileRole {
  id: number
  name: string
}

export interface ProfileData {
  id: number
  name: string
  email: string
  avatar: string | null
  phone: string | null
  status: string
  Role: ProfileRole
  SellerProfile: unknown | null
  Address: unknown[]
}

export interface BaseResponse<T> {
  success: boolean
  statusCode: number
  message: string
  data: T
}

export const getProfile = async () => {
  const res = await api.get<BaseResponse<ProfileData>>("/api/v1/profile")
  return res.data
}

export interface EditProfilePayload {
  name?: string
  phone?: string
  avatar?: File
}

export const editProfile = async (payload: EditProfilePayload) => {
  const form = new FormData()
  if (payload.name) form.append("name", payload.name)
  if (payload.phone) form.append("phone", payload.phone)
  if (payload.avatar) form.append("avatar", payload.avatar)
  const res = await api.patch<BaseResponse<ProfileData>>("/api/v1/profile", form)
  return res.data
}

// Address
export interface AddressData {
  id: number
  userID: number
  fullName: string
  phone: string
  province: string
  district: string
  ward: string
  street: string
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

export const getDefaultAddress = async () => {
  const res = await api.get<BaseResponse<AddressData>>("/api/v1/adddress/default")
  return res.data
}

export const getAddresses = async () => {
  const res = await api.get<BaseResponse<AddressData[]>>("/api/v1/adddress")
  return res.data
}

export interface CreateAddressPayload {
  fullName: string
  phone: string
  province: string
  district: string
  ward: string
  street: string
  isDefault?: boolean
}

export const createAddress = async (payload: CreateAddressPayload) => {
  const res = await api.post<BaseResponse<AddressData>>("/api/v1/adddress", payload)
  return res.data
}

export const updateAddress = async (id: number, payload: Partial<CreateAddressPayload>) => {
  const res = await api.put<BaseResponse<AddressData>>(`/api/v1/adddress/${id}`, payload)
  return res.data
}

export const deleteAddress = async (id: number) => {
  const res = await api.delete<BaseResponse<null>>(`/api/v1/adddress/${id}`)
  return res.data
}

export const getAddressDetail = async (id: number) => {
  const res = await api.get<BaseResponse<AddressData>>(`/api/v1/adddress/${id}`)
  return res.data
}

export const setDefaultAddress = async (id: number) => {
  const res = await api.patch<BaseResponse<AddressData>>(`/api/v1/adddress/${id}/default`)
  return res.data
}

export interface VerifyOtpPayload {
  email: string
  otp: string
}

export interface ResendOtpPayload {
  email: string
}

export interface ResetPasswordPayload {
  email: string
  newPassword: string
}

export const verifyOtp = async (payload: VerifyOtpPayload) => {
  const res = await api.post<BaseResponse<{ success: boolean }>>("/api/v1/auth/verify-otp", payload)
  return res.data
}

export const resendOtp = async (payload: ResendOtpPayload) => {
  const res = await api.post<BaseResponse<{ success: boolean }>>("/api/v1/auth/resend-otp", payload)
  return res.data
}

export const resetPassword = async (payload: ResetPasswordPayload) => {
  const res = await api.post<BaseResponse<{ success: boolean }>>("/api/v1/auth/reset-password", payload)
  return res.data
}

export interface ChangePasswordPayload {
  currentPassword: string
  newPassword: string
}

export const changePassword = async (userId: number, payload: ChangePasswordPayload) => {
  const res = await api.patch<BaseResponse<{ success: boolean }>>(`/api/v1/profile/change-password/${userId}`, payload)
  return res.data
}


