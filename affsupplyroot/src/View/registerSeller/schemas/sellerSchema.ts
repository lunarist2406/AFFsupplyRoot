// schemas/sellerSchema.ts

import * as yup from "yup";

export const sellerSchema = yup.object().shape({
  companyName: yup
    .string()
    .required("Tên công ty là bắt buộc")
    .min(3, "Tên công ty phải có ít nhất 3 ký tự"),
  
  brandName: yup
    .string()
    .required("Thương hiệu là bắt buộc")
    .min(2, "Thương hiệu phải có ít nhất 2 ký tự"),
  
  businessPhone: yup
    .string()
    .required("Số điện thoại là bắt buộc")
    .matches(/^\d{10,11}$/, "Số điện thoại phải có 10-11 chữ số"),
  
  businessAddress: yup
    .string()
    .required("Địa chỉ kinh doanh là bắt buộc")
    .min(10, "Địa chỉ phải có ít nhất 10 ký tự"),
  
  description: yup
    .string()
    .required("Mô tả là bắt buộc")
    .min(20, "Mô tả phải có ít nhất 20 ký tự")
    .max(500, "Mô tả không được quá 500 ký tự"),
  
  idCardFront: yup
    .mixed()
    .required("Vui lòng tải lên mặt trước CMND/CCCD"),
  
  idCardBack: yup
    .mixed()
    .required("Vui lòng tải lên mặt sau CMND/CCCD"),
  
  businessLicense: yup
    .mixed()
    .required("Vui lòng tải lên giấy phép kinh doanh"),
  
  foodSafetyCert: yup
    .mixed()
    .required("Vui lòng tải lên chứng nhận ATTP"),
});