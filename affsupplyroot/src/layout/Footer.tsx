"use client"
import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"

import footerCard from "../../public/FooterCard.jpg"
import logo from "../../public/logo.png"
import { socialLinks } from "@/variable/SocialLinks"

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-green-950 via-gray-600 to-green-950 text-white font-manuale">
      <div className="container mx-auto px-6 sm:px-10 lg:px-2 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
          
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center sm:items-start text-center sm:text-left"
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
              {socialLinks.map(({ icon: Icon, url }, idx) => (
                <motion.a
                  key={idx}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="w-[2.5rem] h-[2.5rem] flex items-center justify-center border-2 rounded-lg hover:border-yellow-400 hover:text-yellow-400 cursor-pointer">
                    <Icon className="w-[1rem] h-[1rem] sm:w-[1.25rem] sm:h-[1.25rem]" />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Cột Công ty + Chính sách */}
          <div className="grid grid-cols-2 gap-5 sm:gap-10 col-span-1 lg:col-span-2 text-center sm:text-left">
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

          {/* Tablet: Google Map */}
          <motion.div
            className="hidden md:flex justify-center"
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.132582202034!2d106.82243537474594!3d10.801454689347728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175275e9c63f8ab%3A0x5d65f8c1c8b9b52b!2zNyDEkC4gRDEsIExvbmcgVGjDoG5oIE3hu7ksIFRo4bunIMSQ4bupYywgSOG7kyBDaMOtbmggNzAwMDAwLCBWaWV0IE5hbQ!5e0!3m2!1svi!2s!4v1695625360000!5m2!1svi!2s"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="rounded-lg shadow-lg w-full max-w-[360px]"
            ></iframe>
          </motion.div>

          {/* Desktop: Image */}
          <motion.div
            className="flex justify-center lg:justify-end lg:hidden"
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Image
              src={footerCard}
              alt="card"
              width={360}
              height={160}
              className="rounded-lg shadow-lg w-full max-w-[360px] h-auto object-contain"
            />
          </motion.div>
        </div>

        {/* Footer bottom */}
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
      </div>
    </footer>
  )
}
