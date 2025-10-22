import { FaShoppingCart, FaCheckCircle } from "react-icons/fa";

export default function CheckoutHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
      <div className="flex items-center gap-2">
        <FaShoppingCart className="text-green-primary h-5 w-5" />
        <span className="text-lg sm:text-xl font-bold text-yellow-primary">
          Thanh toán
        </span>
      </div>
      <div className="flex items-center gap-3 text-xs w-full sm:w-auto justify-center">
        <div className="flex items-center gap-1">
          <FaCheckCircle className="text-green-500 h-3 w-3" />
          <span className="font-medium text-green-primary text-xs">Thông tin</span>
        </div>
        <span className="text-gray-400">-</span>
        <div className="flex items-center gap-1">
          <FaCheckCircle className="text-green-500 h-3 w-3" />
          <span className="font-medium text-green-primary text-xs">Vận chuyển</span>
        </div>
        <span className="text-gray-400">-</span>
        <div className="flex items-center gap-1">
          <FaCheckCircle className="text-green-500 h-3 w-3" />
          <span className="font-semibold text-green-primary text-xs">Thanh toán</span>
        </div>
      </div>
    </div>
  );
}
