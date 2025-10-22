import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddressData {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
}

interface BillingAddressProps {
  billingAddress: "same" | "different";
  billingAddressForm: AddressData;
  onBillingAddressChange: (type: "same" | "different") => void;
  onBillingFormChange: (form: AddressData) => void;
  onSaveAddress: () => void;
}

const CustomDivider = () => (
  <div className="h-px w-full bg-gray-300 my-0"></div>
);

export default function BillingAddress({
  billingAddress,
  billingAddressForm,
  onBillingAddressChange,
  onBillingFormChange,
  onSaveAddress,
}: BillingAddressProps) {
  return (
    <div className="mt-3">
      <h4 className="text-base font-semibold text-green-primary mb-2">
        Địa chỉ thanh toán
      </h4>
      <p className="mb-2 text-xs text-gray-600">
        Chọn địa chỉ khớp với thẻ hoặc phương thức thanh toán của bạn.
      </p>
      
      <div className="rounded-lg border border-gray-200 mb-3">
        <label
          className="flex items-center gap-2 text-xs cursor-pointer px-3 py-2"
          onClick={() => onBillingAddressChange("same")}
        >
          <input
            type="radio"
            name="addr"
            checked={billingAddress === "same"}
            onChange={() => onBillingAddressChange("same")}
            className="sr-only"
          />
          <div
            className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
              billingAddress === "same"
                ? "border-yellow-primary bg-yellow-primary/20"
                : "border-gray-300"
            }`}
          >
            {billingAddress === "same" && (
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-primary"></div>
            )}
          </div>
          <span>Giống với địa chỉ giao hàng</span>
        </label>
        <CustomDivider />
        <label
          className="flex items-center gap-2 text-xs cursor-pointer px-3 py-2"
          onClick={() => onBillingAddressChange("different")}
        >
          <input
            type="radio"
            name="addr"
            checked={billingAddress === "different"}
            onChange={() => onBillingAddressChange("different")}
            className="sr-only"
          />
          <div
            className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
              billingAddress === "different"
                ? "border-yellow-primary bg-yellow-primary/20"
                : "border-gray-300"
            }`}
          >
            {billingAddress === "different" && (
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-primary"></div>
            )}
          </div>
          <span>Sử dụng địa chỉ thanh toán khác</span>
        </label>
      </div>

      {billingAddress === "different" && (
        <div className="grid gap-3 mb-3">
          <div>
            <Label htmlFor="billing-fullName" className="text-xs">Họ và tên</Label>
            <Input 
              id="billing-fullName"
              placeholder="Nhập họ và tên" 
              className="h-8 text-sm"
              value={billingAddressForm.fullName}
              onChange={(e) => onBillingFormChange({ ...billingAddressForm, fullName: e.target.value })}
            />
          </div>
          
          <div>
            <Label htmlFor="billing-phone" className="text-xs">Số điện thoại</Label>
            <Input
              id="billing-phone"
              placeholder="Nhập số điện thoại"
              className="h-8 text-sm"
              value={billingAddressForm.phone}
              onChange={(e) => onBillingFormChange({ ...billingAddressForm, phone: e.target.value })}
            />
          </div>
          
          <div>
            <Label htmlFor="billing-address" className="text-xs">Địa chỉ chi tiết</Label>
            <Input 
              id="billing-address"
              placeholder="Số nhà, tên đường..." 
              className="h-8 text-sm"
              value={billingAddressForm.address}
              onChange={(e) => onBillingFormChange({ ...billingAddressForm, address: e.target.value })}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div>
              <Label htmlFor="billing-city" className="text-xs">Tỉnh/TP</Label>
              <Input
                id="billing-city"
                placeholder="Tỉnh/TP"
                className="h-8 text-sm"
                value={billingAddressForm.city}
                onChange={(e) => onBillingFormChange({ ...billingAddressForm, city: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="billing-district" className="text-xs">Quận/Huyện</Label>
              <Input
                id="billing-district"
                placeholder="Quận/Huyện"
                className="h-8 text-sm"
                value={billingAddressForm.district}
                onChange={(e) => onBillingFormChange({ ...billingAddressForm, district: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="billing-ward" className="text-xs">Phường/Xã</Label>
              <Input
                id="billing-ward"
                placeholder="Phường/Xã"
                className="h-8 text-sm"
                value={billingAddressForm.ward}
                onChange={(e) => onBillingFormChange({ ...billingAddressForm, ward: e.target.value })}
              />
            </div>
          </div>
          
          <Button 
            onClick={onSaveAddress}
            className="w-full mt-2 h-8 bg-green-primary text-white hover:bg-green-secondary text-sm"
          >
            Lưu địa chỉ
          </Button>
        </div>
      )}
    </div>
  );
}
