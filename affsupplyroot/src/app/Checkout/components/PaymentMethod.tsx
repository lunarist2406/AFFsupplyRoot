import { Input } from "@/components/ui/input";
import { FaLock, FaInfoCircle, FaCreditCard } from "react-icons/fa";
import { SiVisa, SiMastercard } from "react-icons/si";

interface PaymentMethodProps {
  paymentMethod: "credit" | "momo";
  onPaymentMethodChange: (method: "credit" | "momo") => void;
}

export default function PaymentMethod({ paymentMethod, onPaymentMethodChange }: PaymentMethodProps) {
  return (
    <div className="mb-4">
      <h3 className="text-base font-semibold text-green-primary mb-2">
        Thanh toán
      </h3>
      <p className="text-xs text-gray-600 mb-2">
        Tất cả giao dịch đều an toàn và được mã hóa.
      </p>

      <div className="rounded-lg border border-gray-200 p-1 mb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-2 py-2 bg-yellow-primary/10 gap-2">
          <label
            className="flex items-center gap-2 text-xs font-medium cursor-pointer"
            onClick={() => onPaymentMethodChange("credit")}
          >
            <input
              type="radio"
              name="pm"
              checked={paymentMethod === "credit"}
              onChange={() => onPaymentMethodChange("credit")}
            />
            <FaCreditCard className="text-gray-600 h-3 w-3" />
            Credit Card
          </label>
          <div className="flex items-center gap-1">
            <SiVisa className="h-4 w-6 text-blue-600" />
            <SiMastercard className="h-4 w-6 text-red-primary" />
            <div className="h-4 w-6 bg-gray-300 rounded text-xs flex items-center justify-center text-white">
              JCB
            </div>
          </div>
        </div>
        {paymentMethod === "credit" && (
          <div className="grid gap-2 p-2">
            <div className="relative">
              <Input placeholder="Số thẻ" className="h-8 pl-3 pr-8 text-sm" />
              <FaLock className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 h-3 w-3" />
            </div>
            <Input placeholder="Tên trên thẻ" className="h-8 px-3 text-sm" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Input
                placeholder="MM/YY"
                className="h-8 px-3 text-sm"
              />
              <div className="relative">
                <Input
                  placeholder="CVV"
                  className="h-8 pl-3 pr-8 text-sm"
                />
                <FaInfoCircle className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 h-3 w-3" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-lg border border-gray-200 px-3 py-2">
        <label
          className="flex items-center justify-between text-xs font-medium cursor-pointer"
          onClick={() => onPaymentMethodChange("momo")}
        >
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="pm"
              checked={paymentMethod === "momo"}
              onChange={() => onPaymentMethodChange("momo")}
            />
            <span>Momo</span>
          </div>
          <div className="w-10 h-6 bg-pink-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">MoMo</span>
          </div>
        </label>
      </div>
    </div>
  );
}
