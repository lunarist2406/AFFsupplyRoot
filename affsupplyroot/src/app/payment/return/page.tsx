/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { handleVnpayReturn } from "@/services/payment";
import { toast } from "sonner";

export default function PaymentReturnPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"success" | "failed" | "processing">("processing");
  const [message, setMessage] = useState("Đang xử lý kết quả thanh toán...");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Lấy tất cả parameters từ VNPAY
        const params = {
          vnp_Amount: searchParams.get("vnp_Amount") || undefined,
          vnp_BankCode: searchParams.get("vnp_BankCode") || undefined,
          vnp_BankTranNo: searchParams.get("vnp_BankTranNo") || undefined,
          vnp_CardType: searchParams.get("vnp_CardType") || undefined,
          vnp_OrderInfo: searchParams.get("vnp_OrderInfo") || undefined,
          vnp_PayDate: searchParams.get("vnp_PayDate") || undefined,
          vnp_ResponseCode: searchParams.get("vnp_ResponseCode") || undefined,
          vnp_TmnCode: searchParams.get("vnp_TmnCode") || undefined,
          vnp_TransactionNo: searchParams.get("vnp_TransactionNo") || undefined,
          vnp_TransactionStatus: searchParams.get("vnp_TransactionStatus") || undefined,
          vnp_TxnRef: searchParams.get("vnp_TxnRef") || undefined,
          vnp_SecureHash: searchParams.get("vnp_SecureHash") || undefined,
        };

        // Gọi API backend để xác thực thanh toán
        const response = await handleVnpayReturn(params);
        
        setIsVerified(true);

        if (response.success) {
          setStatus("success");
          setMessage(response.data.message || "Thanh toán thành công!");
          toast.success("Thanh toán đã được xác nhận!");
        } else {
          setStatus("failed");
          setMessage(response.message || "Giao dịch không thành công!");
          toast.error("Xác thực thanh toán thất bại!");
        }

      } catch (error: any) {
        console.error("Lỗi khi xác thực thanh toán:", error);
        setIsVerified(true);
        setStatus("failed");
        
        // Map error codes to messages
        const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
        const errorMessages: Record<string, string> = {
          "07": "Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).",
          "09": "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.",
          "10": "Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần",
          "11": "Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.",
          "12": "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.",
          "13": "Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP).",
          "24": "Giao dịch không thành công do: Khách hàng hủy giao dịch",
          "51": "Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.",
          "65": "Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.",
          "75": "Ngân hàng thanh toán đang bảo trì.",
          "79": "Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định.",
          "99": "Các lỗi khác"
        };

        setMessage(
          error?.response?.data?.message || 
          errorMessages[vnp_ResponseCode || "99"] || 
          "Không thể xác thực giao dịch!"
        );
        toast.error("Có lỗi xảy ra khi xác thực thanh toán!");
      }
    };

    // Chỉ verify một lần
    if (!isVerified && searchParams.toString()) {
      verifyPayment();
    }
  }, [searchParams, isVerified]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-green-primary/20 via-green-primary/30 to-green-primary/20 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                {status === "processing" && (
                  <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />
                )}
                {status === "success" && (
                  <CheckCircle2 className="h-16 w-16 text-green-500" />
                )}
                {status === "failed" && (
                  <XCircle className="h-16 w-16 text-red-500" />
                )}
              </div>
              <CardTitle className="text-2xl font-bold">
                {status === "processing" && "Đang xử lý"}
                {status === "success" && "Thanh toán thành công"}
                {status === "failed" && "Thanh toán thất bại"}
              </CardTitle>
              <CardDescription className="text-base mt-2">
                {message}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {searchParams.get("vnp_TxnRef") && (
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Mã giao dịch:</span>
                      <span className="font-medium">{searchParams.get("vnp_TxnRef")}</span>
                    </div>
                    {searchParams.get("vnp_Amount") && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Số tiền:</span>
                        <span className="font-medium">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(parseInt(searchParams.get("vnp_Amount") || "0") / 100)}
                        </span>
                      </div>
                    )}
                    {searchParams.get("vnp_BankCode") && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Ngân hàng:</span>
                        <span className="font-medium">{searchParams.get("vnp_BankCode")}</span>
                      </div>
                    )}
                    {searchParams.get("vnp_PayDate") && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Thời gian:</span>
                        <span className="font-medium">
                          {searchParams.get("vnp_PayDate")?.replace(
                            /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
                            "$3/$2/$1 $4:$5:$6"
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                  {status === "success" && (
                    <>
                      <Link href="/account/orders">
                        <Button className="w-full sm:w-auto bg-green-primary hover:bg-green-600">
                          Xem đơn hàng
                        </Button>
                      </Link>
                      <Link href="/">
                        <Button variant="outline" className="w-full sm:w-auto">
                          Về trang chủ
                        </Button>
                      </Link>
                    </>
                  )}
                  {status === "failed" && (
                    <>
                      <Link href="/Checkout">
                        <Button className="w-full sm:w-auto bg-yellow-primary hover:bg-yellow-600 text-black">
                          Thử lại
                        </Button>
                      </Link>
                      <Link href="/">
                        <Button variant="outline" className="w-full sm:w-auto">
                          Về trang chủ
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
