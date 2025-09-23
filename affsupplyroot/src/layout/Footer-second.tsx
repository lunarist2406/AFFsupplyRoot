import React from 'react'

import { motion } from "framer-motion"


export default function Footersecond() {
  return (
<motion.div
  className="border-t border-yellow-primary mt-5 mb-5 sm:mt-5 pt-4 px-5 flex flex-col sm:flex-row items-center justify-center sm:justify-between text-xs sm:text-sm text-yellow-primary gap-3 text-center font-manuale"
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
)
}
  

