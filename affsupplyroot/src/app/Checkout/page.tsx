/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import { createAddress, getProfile } from "@/services/profile";
import { createOrderFromCart } from "@/services/order";
import { createVnpayUrl } from "@/services/payment";
import { syncCartToBackend } from "@/services/cart";
import { toast } from "sonner";

// Import components
import EmptyCart from "./components/EmptyCart";
import OrderSummary from "./components/OrderSummary";
import CheckoutHeader from "./components/CheckoutHeader";
import ContactInfo from "./components/ContactInfo";
import ShippingAddress from "./components/ShippingAddress";
import PaymentMethod from "./components/PaymentMethod";
import BillingAddress from "./components/BillingAddress";

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart, getItemPrice } = useCart();

  const [billingAddress, setBillingAddress] = useState<"same" | "different">(
    "same"
  );
  const [paymentMethod, setPaymentMethod] = useState<"vnpay">("vnpay");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);

  const [billingAddressForm, setBillingAddressForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: ""
  });

  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: ""
  });

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
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

  const handleSaveAddress = async () => {
    try {
      // Validate all fields before saving
      const { fullName, phone, address, city, district, ward } = billingAddressForm;
      
      if (!fullName || !phone || !address || !city || !district || !ward) {
        toast.error("Vui lòng điền đầy đủ thông tin địa chỉ trước khi lưu!");
        return;
      }

      const phoneRegex = /^[0-9]{10,11}$/;
      if (!phoneRegex.test(phone)) {
        toast.error("Số điện thoại không hợp lệ! Vui lòng nhập 10-11 chữ số.");
        return;
      }

      const payload = {
        fullName: billingAddressForm.fullName.trim(),
        phone: billingAddressForm.phone.trim(),
        province: billingAddressForm.city.trim(),
        district: billingAddressForm.district.trim(),
        ward: billingAddressForm.ward.trim(),
        street: billingAddressForm.address.trim(),
        isDefault: false
      };


      const response = await createAddress(payload);
      
      if (response.success) {
        toast.success("Đã lưu địa chỉ thành công!");
        
        if (response.data && response.data.id) {
          if (!selectedAddressId) {
            setSelectedAddressId(response.data.id);
            setShippingAddress({
              fullName: billingAddressForm.fullName,
              phone: billingAddressForm.phone,
              address: billingAddressForm.address,
              city: billingAddressForm.city,
              district: billingAddressForm.district,
              ward: billingAddressForm.ward
            });
            setBillingAddress("same");
          }
        }
      } else {
        toast.error("Lỗi khi lưu địa chỉ: " + response.message);
      }
    } catch (error: any) {
      console.error("Save address error:", error);
      console.error("Error response:", error?.response?.data);
      
      if (error?.response?.status === 401) {
        toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!");
      } else if (error?.response?.status === 400) {
        const errorMsg = error?.response?.data?.message || "Dữ liệu không hợp lệ";
        toast.error("Lỗi: " + errorMsg);
      } else {
        const errorMessage = error?.response?.data?.message || error?.message || "Lỗi khi lưu địa chỉ!";
        toast.error(errorMessage);
      }
    }
  };

  useEffect(() => {
    const loadProfileAndAddresses = async () => {
      try {
        const profileRes = await getProfile();
        if (profileRes.success && profileRes.data) {
          setContactInfo({
            email: profileRes.data.email || "",
            phone: profileRes.data.phone || ""
          });
          const defaultAddr = Array.isArray(profileRes.data.Address)
            ? (profileRes.data.Address.find((addr: any) => addr.isDefault) as any)
            : null;
          if (defaultAddr) {
            setShippingAddress({
              fullName: defaultAddr.fullName,
              phone: defaultAddr.phone,
              address: defaultAddr.street,
              city: defaultAddr.province,
              district: defaultAddr.district,
              ward: defaultAddr.ward
            });
            setContactInfo((prev) => ({ ...prev, phone: defaultAddr.phone || prev.phone }));
            setSelectedAddressId(defaultAddr.id);
          } else {
            setBillingAddress("different");
          }
        }
        const savedShippingAddress = localStorage.getItem('shippingAddress');
        if (savedShippingAddress) {
          const address = JSON.parse(savedShippingAddress);
          setShippingAddress(address);
        }
        const savedBillingAddress = localStorage.getItem('billingAddress');
        if (savedBillingAddress) {
          const address = JSON.parse(savedBillingAddress);
          setBillingAddressForm(address);
        }
      } catch (err) {
        console.error("Lỗi khi tải profile/địa chỉ:", err);
        toast.error("Không thể tải thông tin hồ sơ hoặc địa chỉ");
      }
    };
    loadProfileAndAddresses();
  }, []);

  useEffect(() => {
    if (billingAddress === "different") {
      setBillingAddressForm({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        district: "",
        ward: ""
      });
    }
  }, [billingAddress]);

  const subtotal = getTotalPrice();
  const shipping = 30000; 
  const total = subtotal + shipping;

  // Debug: Log cart items
  useEffect(() => {
    console.log("Checkout page - Cart items:", items);
    console.log("Checkout page - Total items:", items.length);
  }, [items]);

  const handleCheckout = async () => {
    try {
      setIsProcessing(true);

      // Validate cart
      if (items.length === 0) {
        toast.error("Giỏ hàng của bạn đang trống!");
        setIsProcessing(false);
        return;
      }

      // Validate shipping address
      if (!selectedAddressId) {
        toast.error("Vui lòng chọn địa chỉ giao hàng!");
        setIsProcessing(false);
        return;
      }

      // Validate billing address if different from shipping
      if (billingAddress === "different") {
        const { fullName, phone, address, city, district, ward } = billingAddressForm;
        
        if (!fullName || !phone || !address || !city || !district || !ward) {
          toast.error("Vui lòng điền đầy đủ thông tin địa chỉ thanh toán!");
          setIsProcessing(false);
          return;
        }

        // Validate phone number format
        const phoneRegex = /^[0-9]{10,11}$/;
        if (!phoneRegex.test(phone)) {
          toast.error("Số điện thoại không hợp lệ! Vui lòng nhập 10-11 chữ số.");
          setIsProcessing(false);
          return;
        }
      }

      toast.info("Đang đồng bộ giỏ hàng...");
      const cartItems = items.map(item => ({
        id: item.id,
        quantity: item.quantity
      }));
      
      const syncSuccess = await syncCartToBackend(cartItems);
      
      if (!syncSuccess) {
        toast.error("Không thể đồng bộ giỏ hàng. Vui lòng thử lại!");
        setIsProcessing(false);
        return;
      }

      // Step 1: Create order from cart
      console.log("Creating order with addressId:", selectedAddressId);
      const orderResponse = await createOrderFromCart({
        addressId: selectedAddressId
      });

      console.log("Order response:", orderResponse);

      if (!orderResponse.success) {
        toast.error(orderResponse.message || "Không thể tạo đơn hàng!");
        return;
      }

      const orderId = orderResponse.data.id;
      toast.success("Đơn hàng đã được tạo thành công!");

      // Step 2: Create VNPAY payment URL
      console.log("Creating VNPAY URL for order:", orderId);
      const paymentResponse = await createVnpayUrl({ orderId });
      
      console.log("Payment response:", paymentResponse);

      if (paymentResponse.success && paymentResponse.message) {
        // Clear cart before redirect
        clearCart();
        // Redirect to VNPAY payment page
        window.location.href = paymentResponse.message;
      } else {
        toast.error("Không thể tạo liên kết thanh toán VNPAY!");
      }

    } catch (error: any) {
      console.error("Lỗi khi thanh toán:", error);
      console.error("Error details:", error?.response?.data);
      
      const errorMessage = error?.response?.data?.message || error?.message || "Có lỗi xảy ra!";
      
      if (error?.response?.status === 400) {
        toast.error("Lỗi: " + errorMessage + " - Kiểm tra giỏ hàng và địa chỉ!");
      } else if (error?.response?.status === 401) {
        toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <>
      <Header />
      <div className="w-full relative min-h-screen font-manuale">
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-green-primary/20 via-green-primary/30 to-green-primary/20" />
        <div className="w-full px-2 sm:px-4 py-2 md:px-6 md:py-3">

          <div className="flex flex-col gap-3 xl:flex-row items-start p-1 sm:p-2">
            <OrderSummary
              items={items}
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              formatPrice={formatPrice}
              getItemPrice={getItemPrice}
            />

            <div className="rounded-lg bg-white shadow-sm w-full xl:basis-[55%] xl:order-1 border border-gray-200 p-3 sm:p-4">
              <CheckoutHeader />

              <ContactInfo
                email={contactInfo.email}
                onEmailChange={(email) => setContactInfo({ ...contactInfo, email })}
              />

              <ShippingAddress
                address={shippingAddress}
                onAddressChange={setShippingAddress}
              />

              <PaymentMethod
                paymentMethod={paymentMethod}
                onPaymentMethodChange={setPaymentMethod}
              />

              <BillingAddress
                billingAddress={billingAddress}
                billingAddressForm={billingAddressForm}
                onBillingAddressChange={setBillingAddress}
                onBillingFormChange={setBillingAddressForm}
                onSaveAddress={handleSaveAddress}
              />

              <div className="mt-3 flex items-center justify-between">
                <Link href="/cart">
                  <Button className="h-9 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 cursor-pointer">
                    Quay lại
                  </Button>
                </Link>
                <Button 
                  onClick={handleCheckout}
                  disabled={isProcessing || !selectedAddressId}
                  className="h-9 text-sm font-semibold text-black bg-yellow-primary hover:bg-yellow-600 px-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? "Đang xử lý..." : "Hoàn tất"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}