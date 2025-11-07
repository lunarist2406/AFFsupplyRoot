interface PaymentMethodProps {
  paymentMethod: "vnpay";
  onPaymentMethodChange: (method: "vnpay") => void;
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

      <div className="rounded-lg border border-gray-200 px-3 py-2 bg-blue-50">
        <label
          className="flex items-center justify-between text-sm font-medium cursor-pointer"
          onClick={() => onPaymentMethodChange("vnpay")}
        >
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="pm"
              checked={paymentMethod === "vnpay"}
              onChange={() => onPaymentMethodChange("vnpay")}
            />
            <span>Thanh toán qua VNPAY</span>
          </div>
          <div className="w-16 h-7 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">VNPAY</span>
          </div>
        </label>
      </div>
    </div>
  );
}
