"use client";

import React from "react";
import { motion } from "framer-motion";
import FormRegistration from "./components/FormRegistration";
import Content from "./components/Content";

export default function RegisterSellerView() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-950 via-gray-600 to-green-950 relative overflow-hidden font-manuale">
        
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-green-900/20 via-transparent to-transparent" />
      
      {/* Animated Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-20 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"
      />

      {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center p-6 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-7xl">
            {/* Scale FormRegistration xuống 70% */}
            <motion.div
            initial={{ scale: 0.9 }} 
            animate={{ scale: 0.9 }}
            className="w-full"
            >
            <FormRegistration />
            </motion.div>

            {/* Scale Content xuống 70% */}
            <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 0.9 }}
            className="w-full"
            >
            <Content />
            </motion.div>
        </div>
        </div>

    </div>
  );
}