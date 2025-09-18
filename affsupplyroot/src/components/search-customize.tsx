"use client"
import React from "react"
import { FaTractor } from "react-icons/fa" // icon nông nghiệp
import { FaSearch } from "react-icons/fa"  // icon search trong nút

export default function SearchCustomize() {
  return (
    <form className="flex items-center max-w-lg mx-auto w-full">
      <label htmlFor="agri-search" className="sr-only">
        Search
      </label>

      {/* Ô input có icon tractor bên trái */}
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-yellow-400">
          <FaTractor className="w-4 h-4" />
        </div>
        <input
          type="text"
          id="agri-search"
          className="bg-green-800 border border-green-600 text-white text-xs rounded-lg 
                     focus:ring-yellow-400 focus:border-yellow-400 
                     block w-full pl-9 py-1.5 placeholder-yellow-300"
          placeholder="Tìm kiếm nông sản, sản phẩm..."
          required
        />
      </div>

      {/* Button search */}
      <button
        type="submit"
        className="p-1.5 ml-2 text-xs font-medium text-yellow-primary bg-green-700 rounded-lg 
                   border border-green-600 hover:bg-green-600 
                   focus:ring-2 focus:outline-none focus:ring-yellow-400 transition"
      >
        <FaSearch className="w-[0.875rem ] h-[0.875rem] text-yellow-primary" />
        <span className="sr-only">Search</span>
      </button>
    </form>
  )
}
