import React from "react";
import { FaTruck, FaCertificate, FaStore, FaUsers } from "react-icons/fa";

export default function SupportService() {
  const services = [
    {
      icon: <FaTruck className="text-green-500 text-3xl" />,
      title: "Logistics nông nghiệp",
      content: ["Vận chuyển lạnh", "Giao nhanh trong ngày", "Theo dõi đơn hàng"],
    },
    {
      icon: <FaCertificate className="text-yellow-400 text-3xl" />,
      title: "Chứng nhận chất lượng",
      content: ["Chứng nhận VietGAP", "Chứng nhận hữu cơ", "Tư vấn quy trình"],
    },
    {
      icon: <FaStore className="text-green-500 text-3xl" />,
      title: "Quản lý cửa hàng",
      content: ["Quản lý đơn hàng", "Phân tích doanh số", "Marketing sản phẩm"],
    },
    {
      icon: <FaUsers className="text-green-500 text-3xl" />,
      title: "Kết nối cộng đồng",
      content: ["Diễn đàn chia sẻ", "Sự kiện kết nối", "Đào tạo kỹ thuật"],
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-center text-2xl font-bold text-yellow-400 mb-6">
        Dịch vụ hỗ trợ
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {services.map((s, idx) => (
          <div
            key={idx}
            className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition text-white"
          >
            <div className="mb-3">{s.icon}</div>
            <h3 className="font-bold text-lg mb-2">{s.title}</h3>
            <ul className="text-sm text-gray-300 list-disc pl-5 space-y-1">
              {s.content.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
