"use client"
import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Facebook, Instagram, Github } from "lucide-react"
import { FaFacebookMessenger } from "react-icons/fa"
import { SiZalo } from "react-icons/si"
import footerCard from '../../public/FooterCard.jpg'
import logo from '../../public/logo.svg'

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-green-900 to-green-700 text-white px-10 py-10 font-manuale">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Cột trái: Logo + mô tả + mạng xã hội */}
        <motion.div 
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Image src={logo} alt="logo" width={35} height={35} />
            <span className="text-yellow-400 font-bold text-lg">AFF supplyRoot</span>
          </div>
          <p className="text-sm text-gray-200 mb-4">
            Trao quyền cho thế hệ nhà phát triển tiếp theo với giáo dục chất lượng và kỹ năng thực tế. 
            Tham gia cộng đồng học tập của chúng tôi và thay đổi sự nghiệp của bạn.
          </p>
          <div className="flex gap-4 text-yellow-primary">
            {[Facebook, FaFacebookMessenger, Instagram, Github, SiZalo].map((Icon, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="w-6 h-6 cursor-pointer hover:text-yellow-400" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Cột Công ty */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h3 className="text-yellow-primary font-semibold mb-3">Công ty</h3>
          <ul className="space-y-2 text-sm">
            {["Về chúng tôi","Tuyển dụng","Báo chí","Đối tác","Chương trình liên kết","Liên hệ"].map((item, i) => (
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

        {/* Cột Chính sách */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="text-yellow-400 font-semibold mb-3">Chính sách</h3>
          <ul className="space-y-2 text-sm">
            {["Hướng dẫn","FAQ","Cộng đồng","Hỗ trợ","Điều khoản dịch vụ","Chính sách bảo mật"].map((item, i) => (
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

        {/* Card bên phải */}
        <motion.div 
          className="flex justify-center"
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Image src={footerCard} alt="card" width={320} height={160} className="rounded-lg shadow-lg" />
        </motion.div>
      </div>

      {/* Bottom line */}
      <motion.div 
        className="border-t border-gray-500 mt-10 pt-4 flex flex-col md:flex-row items-center justify-between text-sm text-yellow-primary"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <p>© 2025 AFF supplyRoot. Tất cả các quyền được bảo lưu.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          {["Điều khoản","Quyền riêng tư","Cookies"].map((item, i) => (
            <a key={i} href="#" className="hover:text-green-300">{item}</a>
          ))}
        </div>
      </motion.div>
    </footer>
  )
}
