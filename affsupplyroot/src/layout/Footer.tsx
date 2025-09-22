"use client"
import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { FaFacebookMessenger,FaFacebook } from "react-icons/fa"
import { SiZalo } from "react-icons/si"
import footerCard from "../../public/FooterCard.jpg"
import logo from "../../public/logo.png"

export default function Footer() {
  return (
<footer className="w-full bg-gradient-to-r from-green-950 via-gray-600 to-green-950 text-white px-6 sm:px-10 py-8 sm:py-12 font-manuale">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10">
    {/* Cột trái: Logo + mô tả + mạng xã hội */}
    <motion.div
      initial={{ x: -40, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center sm:items-start text-center sm:text-left "
    >
      <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
        <Image src={logo} alt="logo" width={35} height={35} />
        <span className="text-yellow-400 font-bold text-base sm:text-lg">
          AFF supplyRoot
        </span>
      </div>
      <p className="text-xs text-gray-200 mb-4 leading-relaxed">
        Nền tảng thương mại nông nghiệp hiện đại, <br />
        kết nối nông dân và người mua một cách minh bạch. <br />
        Giao dịch an toàn, nhanh chóng và hiệu quả. <br />
        Tham gia ngay để mở rộng cơ hội kinh doanh.
      </p>

      <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-10 text-yellow-primary">
        {[FaFacebook, FaFacebookMessenger, SiZalo].map((Icon, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="w-[2.5rem] h-[2.5rem] flex items-center justify-center border-2 rounded-lg hover:border-yellow-400 hover:text-yellow-400 cursor-pointer">
              <Icon className="w-[1rem] h-[1rem] sm:w-[1.25rem] sm:h-[1.25rem]" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>

    {/* Cột Công ty + Chính sách */}
    <div className="grid grid-cols-2 gap-5 sm:gap-10 col-span-1 sm:col-span-1 lg:col-span-2 text-center sm:text-left">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h3 className="text-yellow-primary font-semibold mb-3 text-base sm:text-lg">
          Công ty
        </h3>
        <ul className="space-y-2 text-xs sm:text-sm">
          {[
            "Về chúng tôi",
            "Tuyển dụng",
            "Báo chí",
            "Đối tác",
            "Chương trình liên kết",
            "Liên hệ",
          ].map((item, i) => (
            <motion.li
              key={i}
              className="hover:text-yellow-300 cursor-pointer"
              whileHover={{ x: 5 }}
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h3 className="text-yellow-400 font-semibold mb-3 text-base sm:text-lg">
          Chính sách
        </h3>
        <ul className="space-y-2 text-xs sm:text-sm">
          {[
            "Hướng dẫn",
            "FAQ",
            "Cộng đồng",
            "Hỗ trợ",
            "Điều khoản dịch vụ",
            "Chính sách bảo mật",
          ].map((item, i) => (
            <motion.li
              key={i}
              className="hover:text-yellow-300 cursor-pointer"
              whileHover={{ x: 5 }}
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>

    <motion.div
      className="flex justify-center lg:justify-end"
      initial={{ x: 40, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.6 }}
    >
      <Image
        src={footerCard}
        alt="card"
        width={360}
        height={160}
        className="rounded-lg shadow-lg w-full max-w-[280px] sm:max-w-[320px] object-cover"
      />
    </motion.div>
  </div>

  <motion.div
    className="border-t border-yellow-primary mt-8 sm:mt-10 pt-4 flex flex-col sm:flex-row items-center justify-center sm:justify-between text-xs sm:text-sm text-yellow-primary gap-3 text-center"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: 0.8, duration: 0.6 }}
  >
    <p>© 2025 AFF supplyRoot. Tất cả các quyền được bảo lưu.</p>
    <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
      {["Điều khoản", "Quyền riêng tư", "Cookies"].map((item, i) => (
        <a key={i} href="#" className="hover:text-green-300">
          {item}
        </a>
      ))}
    </div>
  </motion.div>
</footer>

  )
}
