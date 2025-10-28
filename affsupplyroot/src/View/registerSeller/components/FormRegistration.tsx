"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Building2, Phone, MapPin, FileText, ImageIcon, CheckCircle2, Store } from "lucide-react";
import { toast } from "sonner";
import useRegisterSeller from "@/hooks/useRegisterSeller";

const inputFields = [
  { id: "companyName", label: "Tên công ty", icon: Building2, placeholder: "Nhập tên công ty" },
  { id: "brandName", label: "Thương hiệu", icon: Store, placeholder: "Nhập tên thương hiệu" },
  { id: "businessPhone", label: "Số điện thoại", icon: Phone, placeholder: "Nhập số điện thoại" },
  { id: "businessAddress", label: "Địa chỉ kinh doanh", icon: MapPin, placeholder: "Nhập địa chỉ" },
];

const uploadFields = [
  { id: "idCardFront", label: "Mặt trước CMND/CCCD" },
  { id: "idCardBack", label: "Mặt sau CMND/CCCD" },
  { id: "businessLicense", label: "Giấy phép kinh doanh" },
  { id: "foodSafetyCert", label: "Chứng nhận ATTP" },
];

export default function FormRegistration() {
  const { registerSeller, loading, error } = useRegisterSeller();
  
  const [previews, setPreviews] = useState({
    idCardFront: "",
    idCardBack: "",
    businessLicense: "",
    foodSafetyCert: "",
  });
  const [focusedField, setFocusedField] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const fileURL = URL.createObjectURL(files[0]);
      setPreviews((prev) => ({ ...prev, [name]: fileURL }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload: any = {
      companyName: formData.get("companyName") as string,
      brandName: formData.get("brandName") as string,
      businessPhone: formData.get("businessPhone") as string,
      businessAddress: formData.get("businessAddress") as string,
      description: formData.get("description") as string,
      idCardFront: formData.get("idCardFront") as File,
      idCardBack: formData.get("idCardBack") as File,
      businessLicense: formData.get("businessLicense") as File,
      foodSafetyCert: formData.get("foodSafetyCert") as File,
    };

    try {
      await registerSeller(payload);
      toast.success("🎉 Đăng ký seller thành công!");
      form.reset();
      setPreviews({
        idCardFront: "",
        idCardBack: "",
        businessLicense: "",
        foodSafetyCert: "",
      });
    } catch {
      toast.error("❌ Gửi biểu mẫu thất bại. Vui lòng thử lại!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-center"
    >
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-gradient-to-r from-green-950 via-gray-600 to-green-950 backdrop-blur-xl border border-yellow-500/20 shadow-2xl rounded-3xl p-8"
        >
          {/* Header */}
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
            >
              <FileText className="w-8 h-8 text-black" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Đăng ký Seller
            </h2>
            <p className="text-gray-400">Điền thông tin để bắt đầu hành trình kinh doanh</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {inputFields.map((field, index) => {
              const Icon = field.icon;
              return (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  <label htmlFor={field.id} className="block text-sm font-medium text-yellow-300 mb-2">
                    {field.label}
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <Icon className={`w-5 h-5 transition-colors ${
                        focusedField === field.id ? 'text-yellow-400' : 'text-gray-500'
                      }`} />
                    </div>
                    <input
                      id={field.id}
                      name={field.id}
                      placeholder={field.placeholder}
                      className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                      onFocus={() => setFocusedField(field.id)}
                      onBlur={() => setFocusedField("")}
                      required
                    />
                  </div>
                </motion.div>
              );
            })}

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label htmlFor="description" className="block text-sm font-medium text-yellow-300 mb-2">
                Mô tả
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Giới thiệu ngắn về doanh nghiệp..."
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all resize-none"
                rows={3}
                required
              />
            </motion.div>

            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h3 className="text-sm font-medium text-yellow-300 mb-4 flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Tài liệu đính kèm
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {uploadFields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.75 + index * 0.05 }}
                    className="relative group"
                  >
                    <label
                      htmlFor={field.id}
                      className="block text-xs text-gray-400 mb-2"
                    >
                      {field.label}
                    </label>
                    
                    {previews[field.id as keyof typeof previews] ? (
                      <div className="relative">
                        <img
                          src={previews[field.id as keyof typeof previews]}
                          alt={field.label}
                          className="w-full h-32 object-cover rounded-lg border-2 border-yellow-400/30"
                        />
                        <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                        <label
                          htmlFor={field.id}
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer rounded-lg"
                        >
                          <span className="text-white text-sm">Đổi ảnh</span>
                        </label>
                      </div>
                    ) : (
                      <label
                        htmlFor={field.id}
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer bg-gray-800/30 hover:bg-gray-800/50 hover:border-yellow-400/50 transition-all group"
                      >
                        <ImageIcon className="w-8 h-8 text-gray-600 group-hover:text-yellow-400 transition-colors" />
                        <span className="text-xs text-gray-500 mt-2">Tải lên</span>
                      </label>
                    )}
                    
                    <input
                      id={field.id}
                      name={field.id}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      required
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-4 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-lg hover:shadow-yellow-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                  />
                  Đang gửi...
                </span>
              ) : (
                "Gửi đăng ký"
              )}
            </motion.button>

            {error && (
              <p className="text-red-400 text-sm text-center mt-2">{error}</p>
            )}
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}