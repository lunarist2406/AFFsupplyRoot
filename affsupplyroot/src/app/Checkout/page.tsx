"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import Image from "next/image";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import { getDefaultAddress, getAddresses } from "@/services/profile";
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

const CustomDivider = () => (
  <div className="h-px w-full bg-gray-300 my-0"></div>
);

export default function CheckoutPage() {
  const { items, getTotalPrice } = useCart();

  const [billingAddress, setBillingAddress] = useState<"same" | "different">(
    "same"
  );
  const [paymentMethod, setPaymentMethod] = useState<"credit" | "momo">(
    "credit"
  );

  const [billingAddressForm, setBillingAddressForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: ""
  });

  // Form states
  const [contactInfo, setContactInfo] = useState({
    email: "affSupplyRoot@gmail.com",
    phone: ""
  });
  
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "AFF SUPPLY ROOT",
    address: "",
    city: "",
    district: "",
    ward: ""
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Load saved addresses from API
  useEffect(() => {
    const loadAddresses = async () => {
      try {
        // Load default address for shipping
        const defaultAddressResponse = await getDefaultAddress();
        if (defaultAddressResponse.success && defaultAddressResponse.data) {
          const address = defaultAddressResponse.data;
          setShippingAddress({
            fullName: address.fullName,
            address: address.street,
            city: address.province,
            district: address.district,
            ward: address.ward
          });
          
          // Set contact info from address
          setContactInfo(prev => ({
            ...prev,
            phone: address.phone
          }));
        }

        // Load all addresses for billing options
        const addressesResponse = await getAddresses();
        if (addressesResponse.success && addressesResponse.data.length > 0) {
          // Set first address as default billing if no specific billing address
          const firstAddress = addressesResponse.data[0];
          setBillingAddressForm({
            fullName: firstAddress.fullName,
            phone: firstAddress.phone,
            address: firstAddress.street,
            city: firstAddress.province,
            district: firstAddress.district,
            ward: firstAddress.ward
          });
        }
      } catch (error) {
        console.error("Lỗi khi tải địa chỉ:", error);
        // Fallback to localStorage if API fails
        const savedShippingAddress = localStorage.getItem('shippingAddress');
        if (savedShippingAddress) {
          setShippingAddress(JSON.parse(savedShippingAddress));
        }
      }
    };

    loadAddresses();
  }, []);

  const subtotal = getTotalPrice();
  const shipping = 30000; // Fixed shipping fee
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <>
        <Header />
        <div className="w-full relative min-h-screen font-manuale">
          <div className="fixed inset-0 -z-10 bg-gradient-to-b from-green-primary/20 via-green-primary/30 to-green-primary/20" />
          <div className="w-full px-2 sm:px-4 py-3 md:px-6 md:py-4 mb-3">
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <div className="bg-white rounded-full p-8 shadow-lg mb-6 inline-block">
                  <FaCreditCard className="w-24 h-24 text-gray-300" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Giỏ hàng trống
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán
                </p>
                <Link href="/products/trai-cay-tuoi">
                  <Button className="bg-green-primary hover:bg-green-secondary text-white px-8 py-6 text-lg rounded-lg shadow-lg">
                    Tiếp tục mua sắm
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="w-full relative min-h-screen font-manuale">
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-green-primary/20 via-green-primary/30 to-green-primary/20" />
        <div className="w-full px-2 sm:px-4 py-3 md:px-6 md:py-4 mb-3">
          <div className="mb-3" />

          <div className="flex flex-col gap-4 xl:flex-row items-stretch p-1 sm:p-2">
            <div className="rounded-lg bg-white shadow-sm w-full xl:basis-[65%] border border-gray-200 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                <div className="flex items-center gap-2">
                  <FaLeaf className="text-green-primary h-6 w-6 sm:h-7 sm:w-7" />
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-primary">
                    Thanh toán
                  </span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full text-white bg-green-primary text-xs"
                    >
                      1
                    </span>
                    <span className="font-medium text-green-primary">
                      Thông tin
                    </span>
                  </div>
                  <span className="text-gray-400">-</span>
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full text-white bg-green-primary text-xs"
                    >
                      2
                    </span>
                    <span className="font-medium text-green-primary">
                      Vận chuyển
                    </span>
                  </div>
                  <span className="text-gray-400">-</span>
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full text-white bg-green-primary text-xs"
                    >
                      3
                    </span>
                    <span className="font-semibold text-green-primary">
                      Thanh toán
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <Row label="Liên hệ" value={contactInfo.email} />
                <CustomDivider />
                <Row label="Gửi đến" value={shippingAddress.fullName} />
                <CustomDivider />
                <Row label="Phương thức" value={formatPrice(shipping)} />
              </div>

              {/* Contact Information Form */}
              <div className="py-4">
                <h3 className="text-base font-semibold text-green-primary mb-4">
                  Thông tin liên hệ
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                      className="h-11 px-4"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                      id="phone"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                      placeholder="Nhập số điện thoại"
                      className="h-11 px-4"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address Form */}
              <div className="py-4">
                <h3 className="text-base font-semibold text-green-primary mb-4">
                  Địa chỉ giao hàng
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Họ và tên</Label>
                    <Input
                      id="fullName"
                      value={shippingAddress.fullName}
                      onChange={(e) => setShippingAddress({...shippingAddress, fullName: e.target.value})}
                      className="h-11 px-4"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                      id="phone"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                      className="h-11 px-4"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Địa chỉ chi tiết</Label>
                    <Textarea
                      id="address"
                      value={shippingAddress.address}
                      onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                      placeholder="Số nhà, tên đường, tên khu phố..."
                      rows={3}
                      className="px-4"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">Tỉnh/Thành phố</Label>
                    <Select>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Chọn tỉnh/thành phố" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hcm">TP. Hồ Chí Minh</SelectItem>
                        <SelectItem value="hn">Hà Nội</SelectItem>
                        <SelectItem value="dn">Đà Nẵng</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="district">Quận/Huyện</Label>
                    <Select>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Chọn quận/huyện" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="q1">Quận 1</SelectItem>
                        <SelectItem value="q2">Quận 2</SelectItem>
                        <SelectItem value="q3">Quận 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="py-4">
                <h3 className="text-base font-semibold text-green-primary">
                  Thanh toán
                </h3>
                <p className="text-sm text-gray-600">
                  Tất cả giao dịch đều an toàn và được mã hóa.
                </p>

                <div className=" rounded-lg border border-gray-200 p-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-3 py-3 bg-yellow-primary/10 gap-3">
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
                      <SiMastercard className="h-6 w-8 text-red-primary" />
                      <div className="h-6 w-8 bg-gray-300 rounded text-xs flex items-center justify-center text-white">
                        JCB
                      </div>
                    </div>
                  </div>
                  {paymentMethod === "credit" && (
                    <div className="grid gap-3 sm:gap-4 p-2">
                      <div className="relative">
                        <Input placeholder="Số thẻ" className="h-11 pl-4 pr-10" />
                        <FaLock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                      <Input placeholder="Tên trên thẻ" className="h-11 px-4" />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  <h4 className="text-base font-semibold text-green-primary">
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
                            ? "border-yellow-primary bg-yellow-primary/20"
                            : "border-gray-300"
                        }`}
                      >
                        {billingAddress === "same" && (
                          <div className="w-2 h-2 rounded-full bg-yellow-primary"></div>
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
                            ? "border-yellow-primary bg-yellow-primary/20"
                            : "border-gray-300"
                        }`}
                      ></div>
                      <span>Sử dụng địa chỉ thanh toán khác</span>
                    </label>
                  </div>

                  {billingAddress === "same" && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">Địa chỉ thanh toán (giống địa chỉ giao hàng):</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><strong>Họ tên:</strong> {shippingAddress.fullName}</p>
                        <p><strong>Số điện thoại:</strong> {contactInfo.phone}</p>
                        <p><strong>Địa chỉ:</strong> {shippingAddress.address}</p>
                        <p><strong>Tỉnh/Thành:</strong> {shippingAddress.city}</p>
                        <p><strong>Quận/Huyện:</strong> {shippingAddress.district}</p>
                        <p><strong>Phường/Xã:</strong> {shippingAddress.ward}</p>
                      </div>
                    </div>
                  )}

                  {billingAddress === "different" && (
                    <div className="grid gap-3 mb-4">
                      <Input 
                        placeholder="Họ và tên" 
                        className="h-11 px-4 p-1"
                        value={billingAddressForm.fullName}
                        onChange={(e) => setBillingAddressForm({...billingAddressForm, fullName: e.target.value})}
                      />
                      <Input
                        placeholder="Số điện thoại"
                        className="h-11 px-4 p-1"
                        value={billingAddressForm.phone}
                        onChange={(e) => setBillingAddressForm({...billingAddressForm, phone: e.target.value})}
                      />
                      <Input 
                        placeholder="Địa chỉ" 
                        className="h-11 px-4 p-1"
                        value={billingAddressForm.address}
                        onChange={(e) => setBillingAddressForm({...billingAddressForm, address: e.target.value})}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Input
                          placeholder="Tỉnh/Thành"
                          className="h-11 px-4 p-1"
                          value={billingAddressForm.city}
                          onChange={(e) => setBillingAddressForm({...billingAddressForm, city: e.target.value})}
                        />
                        <Input
                          placeholder="Quận/Huyện"
                          className="h-11 px-4 p-1"
                          value={billingAddressForm.district}
                          onChange={(e) => setBillingAddressForm({...billingAddressForm, district: e.target.value})}
                        />
                        <Input
                          placeholder="Phường/Xã"
                          className="h-11 px-4 p-1"
                          value={billingAddressForm.ward}
                          onChange={(e) => setBillingAddressForm({...billingAddressForm, ward: e.target.value})}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <Link href="/cart">
                    <Button variant="ghost" className="h-11 px-5 text-sm">
                      Quay lại
                    </Button>
                  </Link>
                  <Button className="h-11 px-7 text-sm font-semibold text-black bg-yellow-primary p-1">
                    Hoàn tất
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-5 shadow-sm w-full lg:basis-[35%] border border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-green-primary">
                  Danh sách sản phẩm ({items.length})
                </h3>
                <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50">
                  <FaSync className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              <div className="space-y-4 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-2">
                    <div className="relative h-14 w-14 overflow-hidden rounded">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover bg-gray-50"
                      />
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white bg-green-primary">
                        +{item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="line-clamp-1 text-[15px] text-green-primary">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        Shop: {item.shopName}
                      </div>
                    </div>
                    <div className="text-[15px] font-semibold text-yellow-secondary">
                      {formatPrice(item.basePrice * item.quantity)}
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
                <Button className="h-10 px-5 text-sm font-semibold text-white p-1 bg-green-primary">
                  Áp dụng
                </Button>
              </div>

              <div className="space-y-2 text-[15px] p-2 px-0">
                <div className="flex items-center justify-between">
                  <span>Tổng giá trị sản phẩm:</span>
                  <span className="font-semibold">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Phí giao hàng:</span>
                  <span className="font-semibold">
                    {formatPrice(shipping)}
                  </span>
                </div>
              </div>

              <CustomDivider />

              <div className="flex items-center justify-between text-lg font-semibold mt-4 text-green-primary">
                <span>Tổng tiền:</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-4 text-sm p-2">
      <div className="text-gray-600">{label}</div>
      <div className="flex items-center gap-3">
        <span className="font-medium text-gray-800">{value}</span>
        <button className="text-sm flex items-center gap-1 hover:underline text-green-primary">
          Edit
        </button>
      </div>
    </div>
  );
}