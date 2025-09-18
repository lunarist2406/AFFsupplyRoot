"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FaLock,
  FaInfoCircle,
  FaUndoAlt,
  FaTools,
  FaSync,
  FaLeaf,
  FaCreditCard,
} from "react-icons/fa";
import { SiVisa, SiMastercard } from "react-icons/si";
// import { Divider } from "antd";

const GREEN = "#647849";

const CustomDivider = () => (
  <div className="h-px w-full bg-gray-300 my-0"></div>
);

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  qty: number;
};

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Thịt bò tươi chất lượng cao",
      price: 45000,
      image: "/Gao-ST25.png",
      qty: 1,
    },
    {
      id: 2,
      name: "Thịt bò tươi chất lượng cao",
      price: 45000,
      image: "/Gao-ST25.png",
      qty: 1,
    },
    {
      id: 3,
      name: "Thịt bò tươi chất lượng cao",
      price: 45000,
      image: "/Gao-ST25.png",
      qty: 1,
    },
    {
      id: 4,
      name: "Thịt bò tươi chất lượng cao",
      price: 45000,
      image: "/Gao-ST25.png",
      qty: 1,
    },
  ]);

  const [billingAddress, setBillingAddress] = useState<"same" | "different">(
    "same"
  );
  const [paymentMethod, setPaymentMethod] = useState<"credit" | "momo">(
    "credit"
  );

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const shipping = Math.round(subtotal * 0.1);
  const total = subtotal + shipping;

  return (
    <div className="w-full relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#353D39] via-[#7E8C7C] to-[#353D39]" />
      <div className="w-full px-4 py-3 md:px-6 md:py-4 mb-3">
        <div className="mb-3" />

        <div className="flex flex-col gap-4 lg:flex-row items-stretch p-2">
          <div className="rounded-lg bg-white shadow-sm w-full lg:basis-[65%] border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FaLeaf className="text-green-500 h-7 w-7" />
                <span className="text-2xl md:text-3xl font-bold text-orange-400">
                  Thanh toán
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: GREEN }}
                  >
                    1
                  </span>
                  <span className="font-medium" style={{ color: GREEN }}>
                    Thông tin
                  </span>
                </div>
                <span className="text-gray-400">-</span>
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: GREEN }}
                  >
                    2
                  </span>
                  <span className="font-medium" style={{ color: GREEN }}>
                    Vận chuyển
                  </span>
                </div>
                <span className="text-gray-400">-</span>
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: GREEN }}
                  >
                    3
                  </span>
                  <span className="font-semibold" style={{ color: GREEN }}>
                    Thanh toán
                  </span>
                </div>
              </div>
            </div>

            <div>
              <Row label="Liên hệ" value="affSupplyRoot@gmail.com" />
              <CustomDivider />
              <Row label="Gửi đến" value="AFF SUPPLY ROOT" />
              <CustomDivider />
              <Row label="Phương thức" value="30.000đ" />
            </div>

            <div className="py-4">
              <h3 className=" text-base font-semibold" style={{ color: GREEN }}>
                Thanh toán
              </h3>
              <p className="text-sm text-gray-600">
                Tất cả giao dịch đều an toàn và được mã hóa.
              </p>

              <div className=" rounded-lg border border-gray-200 p-1">
                <div className="flex items-center justify-between px-3 py-3 bg-orange-50">
                  <label
                    className="flex items-center gap-2 text-sm font-medium"
                    onClick={() => setPaymentMethod("credit")}
                  >
                    <input
                      type="radio"
                      name="pm"
                      checked={paymentMethod === "credit"}
                      onChange={() => setPaymentMethod("credit")}
                    />
                    <FaCreditCard className="text-gray-600" />
                    Credit Card
                  </label>
                  <div className="flex items-center gap-2">
                    <SiVisa className="h-6 w-8 text-blue-600" />
                    <SiMastercard className="h-6 w-8 text-red-500" />
                    <div className="h-6 w-8 bg-gray-300 rounded text-xs flex items-center justify-center text-white">
                      JCB
                    </div>
                  </div>
                </div>
                {paymentMethod === "credit" && (
                  <div className="grid gap-4 p-2">
                    <div className="relative">
                      <Input placeholder="Số thẻ" className="h-11 pl-4 pr-10" />
                      <FaLock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                    <Input placeholder="Tên trên thẻ" className="h-11 px-4" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input
                        placeholder="Ngày hết hạn (YY / MM)"
                        className="h-11 px-4"
                      />
                      <div className="relative">
                        <Input
                          placeholder="Mã bảo mật"
                          className="h-11 pl-4 pr-10"
                        />
                        <FaInfoCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-lg border border-gray-200 px-4 py-3 mt-2 my-3 p-1">
                <label
                  className="flex items-center justify-between text-sm font-medium cursor-pointer"
                  onClick={() => setPaymentMethod("momo")}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="pm"
                      checked={paymentMethod === "momo"}
                      onChange={() => setPaymentMethod("momo")}
                    />
                    <span>Momo</span>
                  </div>
                  <div className="w-12 h-8 bg-pink-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">MoMo</span>
                  </div>
                </label>
              </div>

              <div className="mt-6">
                <h4
                  className="text-base font-semibold"
                  style={{ color: GREEN }}
                >
                  Địa chỉ thanh toán
                </h4>
                <p className="mb-4 text-sm text-gray-600">
                  Chọn địa chỉ khớp với thẻ hoặc phương thức thanh toán của bạn.
                </p>
                <div className="rounded-lg border border-gray-200 mb-4">
                  <label
                    className="flex items-center gap-3 text-sm cursor-pointer px-4 py-3 p-1"
                    onClick={() => setBillingAddress("same")}
                  >
                    <input
                      type="radio"
                      name="addr"
                      checked={billingAddress === "same"}
                      onChange={() => setBillingAddress("same")}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        billingAddress === "same"
                          ? "border-orange-300 bg-orange-100"
                          : "border-gray-300"
                      }`}
                    >
                      {billingAddress === "same" && (
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      )}
                    </div>
                    <span>Giống với địa chỉ giao hàng</span>
                  </label>
                  <CustomDivider />
                  <label
                    className="flex items-center gap-3 text-sm cursor-pointer px-4 py-3 p-1"
                    onClick={() => setBillingAddress("different")}
                  >
                    <input
                      type="radio"
                      name="addr"
                      checked={billingAddress === "different"}
                      onChange={() => setBillingAddress("different")}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        billingAddress === "different"
                          ? "border-orange-300 bg-orange-100"
                          : "border-gray-300"
                      }`}
                    ></div>
                    <span>Sử dụng địa chỉ thanh toán khác</span>
                  </label>
                </div>

                {billingAddress === "different" && (
                  <div className="grid gap-3 mb-4">
                    <Input placeholder="Họ và tên" className="h-11 px-4 p-1" />
                    <Input
                      placeholder="Số điện thoại"
                      className="h-11 px-4 p-1"
                    />
                    <Input placeholder="Địa chỉ" className="h-11 px-4 p-1" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <Input
                        placeholder="Tỉnh/Thành"
                        className="h-11 px-4 p-1"
                      />
                      <Input
                        placeholder="Quận/Huyện"
                        className="h-11 px-4 p-1"
                      />
                      <Input
                        placeholder="Phường/Xã"
                        className="h-11 px-4 p-1"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <Button variant="ghost" className="h-11 px-5 text-sm">
                  Quay lại
                </Button>
                <Button className="h-11 px-7 text-sm font-semibold text-black bg-[#FFD54F] p-1">
                  Hoàn tất
                </Button>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-5 shadow-sm w-full lg:basis-[35%] border border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold" style={{ color: GREEN }}>
                Danh sách sản phẩm ({items.length})
              </h3>
              <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50">
                <FaSync className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            <div className="space-y-4 mb-4">
              {items.map((it) => (
                <div key={it.id} className="flex items-center gap-4 p-2">
                  <div className="relative h-14 w-14 overflow-hidden rounded">
                    <img
                      src={it.image}
                      alt={it.name}
                      className="h-full w-full object-contain bg-gray-50"
                    />
                    <span
                      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white"
                      style={{ backgroundColor: GREEN }}
                    >
                      +{it.qty}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div
                      className="line-clamp-1 text-[15px]"
                      style={{ color: GREEN }}
                    >
                      {it.name}
                    </div>
                  </div>
                  <div className="text-[15px] font-semibold text-[#F4A100]">
                    {it.price.toLocaleString("vi-VN")} Vnd / kg
                  </div>
                </div>
              ))}
            </div>

            <CustomDivider />

            <div className="grid grid-cols-2 gap-3 text-sm p-2 px-0">
              <Button
                variant="outline"
                className="h-9 justify-start border-gray-300 text-gray-600 gap-2 p-1"
              >
                <FaUndoAlt className="text-gray-500" /> Chính sách hoàn trả
              </Button>
              <Button
                variant="outline"
                className="h-9 justify-start border-gray-300 text-gray-600 gap-2 p-1"
              >
                <FaTools className="text-gray-500" /> Phí định vụ
              </Button>
            </div>

            <div className="flex gap-2 p-2 px-0">
              <Input placeholder="Mã giảm giá" className="h-10 flex-1 p-1" />
              <Button
                className="h-10 px-5 text-sm font-semibold text-white p-1"
                style={{ backgroundColor: GREEN }}
              >
                Áp dụng
              </Button>
            </div>

            <div className="space-y-2 text-[15px] p-2 px-0">
              <div className="flex items-center justify-between">
                <span>Tổng giá trị sản phẩm:</span>
                <span className="font-semibold">
                  {subtotal.toLocaleString("vi-VN")} vnd
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Phí giao hàng : 10%</span>
                <span className="font-semibold">
                  {shipping.toLocaleString("vi-VN")} vnd
                </span>
              </div>
            </div>

                  <CustomDivider />

            <div
              className="flex items-center justify-between text-lg font-semibold mt-4"
              style={{ color: GREEN }}
            >
              <span>Tổng tiền:</span>
              <span>{total.toLocaleString("vi-VN")} vnd</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-4 text-sm p-2">
      <div className="text-gray-600">{label}</div>
      <div className="flex items-center gap-3">
        <span className="font-medium text-gray-800">{value}</span>
        <button
          className="text-sm flex items-center gap-1 hover:underline"
          style={{ color: "#647849" }}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
