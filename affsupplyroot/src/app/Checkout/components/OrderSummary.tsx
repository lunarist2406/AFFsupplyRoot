import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaSync, FaUndoAlt, FaTools, FaBox } from "react-icons/fa";
import { CartItem } from "@/hooks/useCart";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  formatPrice: (price: number) => string;
}

const CustomDivider = () => (
  <div className="h-px w-full bg-gray-300 my-0"></div>
);

export default function OrderSummary({
  items,
  subtotal,
  shipping,
  total,
  formatPrice,
}: OrderSummaryProps) {
  return (
    <div className="rounded-lg bg-white p-5 shadow-sm w-full xl:basis-[45%] xl:order-2 border border-gray-200 xl:sticky xl:top-18 xl:max-h-[calc(100vh - 10px)] xl:overflow-y-auto">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-green-primary">
          Danh sách sản phẩm ({items.length})
        </h3>
        <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50">
          <FaSync className="h-4 w-4 text-gray-600" />
        </button>
      </div>
      
      <div className="space-y-4 mb-4">
        {items.map((item, index) => (
          <div key={item.id}>
            <Link 
              href={`/${item.slug}`}
              className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
            >
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
                <div className="line-clamp-1 text-[15px] text-green-primary hover:text-green-secondary transition-colors">
                  {item.title}
                </div>
                <div className="text-xs text-gray-500">
                  Shop: {item.shopName}
                </div>
              </div>
              <div className="text-[15px] font-semibold text-yellow-secondary">
                {formatPrice(item.basePrice * item.quantity)}
              </div>
            </Link>
            {index < items.length - 1 && <CustomDivider />}
          </div>
        ))}
      </div>

      <CustomDivider />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm p-2 px-0">
        <Button
          variant="outline"
          className="h-9 justify-start border-gray-300 text-gray-600 gap-2 p-1 text-xs sm:text-sm"
        >
          <FaUndoAlt className="text-gray-500" /> 
          <span className="hidden sm:inline">Chính sách hoàn trả</span>
          <span className="sm:hidden">Hoàn trả</span>
        </Button>
        <Button
          variant="outline"
          className="h-9 justify-start border-gray-300 text-gray-600 gap-2 p-1 text-xs sm:text-sm"
        >
          <FaTools className="text-gray-500" /> 
          <span className="hidden sm:inline">Phí định vụ</span>
          <span className="sm:hidden">Định vụ</span>
        </Button>
      </div>

      <div className="flex gap-2 p-2 px-0">
        <Input placeholder="Mã giảm giá" className="h-10 flex-1 p-1 text-sm" />
        <Button className="h-10 px-3 sm:px-5 text-xs sm:text-sm font-semibold text-white p-1 bg-green-primary">
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

      <div className="space-y-2 text-sm my-4">
        <h3 className="font-semibold text-green-primary mb-3 flex items-center gap-2">
          <FaBox className="text-green-primary" />
          Tóm tắt đơn hàng
        </h3>
        
        <div className="flex justify-between text-gray-700">
          <span>Số lượng sản phẩm:</span>
          <span className="font-medium text-gray-900">
            {items.length} loại ({items.reduce((sum, item) => sum + item.quantity, 0)} món)
          </span>
        </div>
        
        <div className="flex justify-between text-gray-700">
          <span>Số shop:</span>
          <span className="font-medium text-gray-900">
            {new Set(items.map(item => item.shopId)).size} shop
          </span>
        </div>
        
        <div className="flex justify-between text-gray-700">
          <span>Dự kiến giao:</span>
          <span className="font-medium text-green-600">2-3 ngày</span>
        </div>
      </div>

      <CustomDivider />

      <div className="flex items-center justify-between text-lg font-semibold mt-4 text-green-primary">
        <span>Tổng tiền:</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
}
