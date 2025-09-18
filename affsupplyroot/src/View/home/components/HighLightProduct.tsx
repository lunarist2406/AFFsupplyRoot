import React from "react";

export default function HighLightProduct() {
  const products = [
    { title: "Gạo thơm", price: "45,000", old: "55,000", sale: "-18%", img: "/rice.jpg" },
    { title: "Rau củ sạch", price: "35,000", old: "45,000", sale: "-22%", img: "/vegetable.jpg" },
    { title: "Trái cây", price: "65,000", old: "80,000", sale: "-19%", img: "/fruit.jpg" },
    { title: "Dưa hấu", price: "180,000", old: "220,000", sale: "-18%", img: "/melon.jpg" },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-yellow-400">Sản Phẩm Nổi Bật</h2>
        <a href="#" className="text-yellow-300 hover:underline">
          Xem tất cả
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p, idx) => (
          <div
            key={idx}
            className="bg-gray-800 rounded-lg shadow p-3 relative hover:shadow-lg transition"
          >
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              {p.sale}
            </span>
            <img src={p.img} alt={p.title} className="rounded-md mb-2 w-full h-32 object-cover" />
            <p className="font-bold text-white">{p.price}₫</p>
            <p className="line-through text-gray-400 text-sm">{p.old}₫</p>
            <p className="text-sm text-gray-300">⭐ 4.9 | Đã bán: 1247</p>
          </div>
        ))}
      </div>
    </div>
  );
}
