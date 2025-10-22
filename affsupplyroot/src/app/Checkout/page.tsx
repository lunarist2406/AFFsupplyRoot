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
      const payload = {
        fullName: billingAddressForm.fullName,
        phone: billingAddressForm.phone,
        province: billingAddressForm.city,
        district: billingAddressForm.district,
        ward: billingAddressForm.ward,
        street: billingAddressForm.address,
        isDefault: false
      };

      const response = await createAddress(payload);
      
      if (response.success) {
        toast.success("Đã lưu địa chỉ thành công!");
      } else {
        toast.error("Lỗi khi lưu địa chỉ: " + response.message);
      }
    } catch (error) {
      toast.error("Lỗi khi lưu địa chỉ!");
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
                <Button className="h-9 text-sm font-semibold text-black bg-yellow-primary hover:bg-yellow-600 px-4 cursor-pointer">
                  Hoàn tất
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