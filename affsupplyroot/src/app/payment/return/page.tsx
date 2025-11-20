/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

function PaymentReturnContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"success" | "failed" | "processing">("processing");
  const [message, setMessage] = useState("Đang xử lý kết quả thanh toán...");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const processPaymentResult = () => {
      if (!searchParams.toString()) {
        setStatus("failed");
        setMessage("Không tìm thấy thông tin giao dịch!");
        setIsVerified(true);
        return;
      }

      // Map error codes to messages
      const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
      const vnp_TransactionStatus = searchParams.get("vnp_TransactionStatus");
      
      const errorMessages: Record<string, string> = {
        "00": "Giao dịch thành công",
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

      // VNPAY trả về 00 là thành công
      if (vnp_ResponseCode === "00") {
        setStatus("success");
        setMessage(errorMessages["00"] || "Thanh toán thành công!");
        toast.success("Thanh toán đã được xác nhận!", { id: 'payment-success' });
      } else {
        setStatus("failed");
        setMessage(
          errorMessages[vnp_ResponseCode || "99"] || 
          "Giao dịch không thành công!"
        );
        toast.error("Thanh toán thất bại!", { id: 'payment-failed' });
      }
      
      setIsVerified(true);
    };

    if (!isVerified) {
      processPaymentResult();
    }
  }, [searchParams, isVerified]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-8 sm:py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-2xl border-0 overflow-hidden">
            {/* Header với màu sắc theo status */}
            <div className={`${
              status === "success" ? "bg-gradient-to-r from-green-500 to-emerald-600" :
              status === "failed" ? "bg-gradient-to-r from-red-500 to-rose-600" :
              "bg-gradient-to-r from-blue-500 to-indigo-600"
            } py-8 px-6`}>
              <div className="flex flex-col items-center text-white">
                <div className="mb-4 bg-white/20 backdrop-blur-sm rounded-full p-6">
                  {status === "processing" && (
                    <Loader2 className="h-16 w-16 animate-spin" />
                  )}
                  {status === "success" && (
                    <CheckCircle2 className="h-16 w-16" />
                  )}
                  {status === "failed" && (
                    <XCircle className="h-16 w-16" />
                  )}
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center">
                  {status === "processing" && "Đang xử lý"}
                  {status === "success" && "Thanh toán thành công"}
                  {status === "failed" && "Thanh toán thất bại"}
                </h1>
                <p className="text-white/90 text-lg text-center max-w-md">
                  {message}
                </p>
              </div>
            </div>

            <CardContent className="p-6 sm:p-8">
              {searchParams.get("vnp_TxnRef") && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <div className="h-1 w-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded"></div>
                    Thông tin giao dịch
                  </h3>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-5 space-y-4 border border-gray-200">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Mã giao dịch:</span>
                      <span className="font-bold text-gray-900 text-lg">{searchParams.get("vnp_TxnRef")}</span>
                    </div>
                    {searchParams.get("vnp_Amount") && (
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                        <span className="text-gray-600 font-medium">Số tiền:</span>
                        <span className="font-bold text-green-600 text-xl">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(parseInt(searchParams.get("vnp_Amount") || "0") / 100)}
                        </span>
                      </div>
                    )}
                    {searchParams.get("vnp_BankCode") && (
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                        <span className="text-gray-600 font-medium">Ngân hàng:</span>
                        <span className="font-semibold text-gray-900 uppercase">{searchParams.get("vnp_BankCode")}</span>
                      </div>
                    )}
                    {searchParams.get("vnp_PayDate") && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Thời gian:</span>
                        <span className="font-semibold text-gray-900">
                          {searchParams.get("vnp_PayDate")?.replace(
                            /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
                            "$3/$2/$1 $4:$5:$6"
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
                {status === "success" && (
                  <>
                    <Link href="/account/orders" className="flex-1 sm:flex-none">
                      <Button className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-6 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-base">
                        Xem đơn hàng
                      </Button>
                    </Link>
                    <Link href="/" className="flex-1 sm:flex-none">
                      <Button variant="outline" className="w-full sm:w-auto border-2 border-gray-300 hover:border-green-600 hover:bg-green-50 text-gray-700 hover:text-green-700 font-semibold py-6 px-8 rounded-lg transition-all duration-200 text-base">
                        Về trang chủ
                      </Button>
                    </Link>
                  </>
                )}
                {status === "failed" && (
                  <>
                    <Link href="/Checkout" className="flex-1 sm:flex-none">
                      <Button className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-semibold py-6 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-base">
                        Thử lại
                      </Button>
                    </Link>
                    <Link href="/" className="flex-1 sm:flex-none">
                      <Button variant="outline" className="w-full sm:w-auto border-2 border-gray-300 hover:border-red-600 hover:bg-red-50 text-gray-700 hover:text-red-700 font-semibold py-6 px-8 rounded-lg transition-all duration-200 text-base">
                        Về trang chủ
                      </Button>
                    </Link>
                  </>
                )}
              </div>

              {/* Footer note */}
              {status === "success" && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-green-800 text-center">
                      ✓ Đơn hàng của bạn đang được xử lý. Chúng tôi sẽ gửi thông báo khi đơn hàng được giao.
                    </p>
                  </div>
                </div>
              )}
              
              {status === "failed" && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-red-800 text-center">
                      ✗ Đơn hàng đã bị hủy do thanh toán không thành công. Vui lòng thử lại hoặc liên hệ hỗ trợ nếu cần.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function PaymentReturnPage() {
  return (
    <Suspense fallback={
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-12 px-4 flex items-center justify-center">
          <Card className="shadow-2xl max-w-3xl w-full border-0 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-8 px-6">
              <div className="flex flex-col items-center text-white">
                <div className="mb-4 bg-white/20 backdrop-blur-sm rounded-full p-6">
                  <Loader2 className="h-16 w-16 animate-spin" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">Đang tải...</h1>
                <p className="text-white/90 text-lg">Vui lòng đợi trong giây lát</p>
              </div>
            </div>
          </Card>
        </div>
        <Footer />
      </>
    }>
      <PaymentReturnContent />
    </Suspense>
  );
}
