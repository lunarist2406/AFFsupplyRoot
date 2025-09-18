import React from "react";

export default function CatalogProduct() {
  const catalogs = [
    { title: "Lương Thực", img: "/rice.jpg" },
    { title: "Rau Củ Quả", img: "/vegetable.jpg" },
    { title: "Thịt Tươi Sống", img: "/meat.jpg" },
    { title: "Công nghiệp", img: "/coffee.jpg" },
    { title: "Dược liệu", img: "/medicine.jpg" },
    { title: "Trà & Thảo Mộc", img: "/tea.jpg" },
    { title: "Đặc sản", img: "/special.jpg" },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-yellow-400">Danh Mục Nông Sản</h2>
        <a href="#" className="text-yellow-300 hover:underline">
          Xem tất cả
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {catalogs.map((item, idx) => (
          <div
            key={idx}
            className="border border-yellow-300 rounded-lg p-3 bg-brown-900 text-white shadow hover:shadow-lg transition"
          >
            <img src={item.img} alt={item.title} className="rounded-md mb-2" />
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-300">100 sản phẩm</p>
          </div>
        ))}
      </div>
    </div>
  );
}
