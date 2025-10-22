import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaCreditCard } from "react-icons/fa";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";

export default function EmptyCart() {
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
