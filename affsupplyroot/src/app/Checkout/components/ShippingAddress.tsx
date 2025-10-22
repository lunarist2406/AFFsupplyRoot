import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FaBox } from "react-icons/fa";

interface AddressData {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
}

interface ShippingAddressProps {
  address: AddressData;
  onAddressChange: (address: AddressData) => void;
}

export default function ShippingAddress({ address, onAddressChange }: ShippingAddressProps) {
  return (
    <div className="mb-4">
      <h3 className="text-base font-semibold text-green-primary mb-2 flex items-center gap-2">
        <FaBox className="text-green-primary h-4 w-4" />
        Địa chỉ giao hàng
      </h3>
      <div className="grid gap-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label htmlFor="fullName" className="text-xs font-medium text-gray-700 mb-1">
              Họ và tên
            </Label>
            <Input
              id="fullName"
              value={address.fullName}
              onChange={(e) => onAddressChange({ ...address, fullName: e.target.value })}
              disabled
              className="h-9 px-3 bg-gray-50 border-gray-300 text-gray-600 cursor-not-allowed text-sm"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-xs font-medium text-gray-700 mb-1">
              Số điện thoại
            </Label>
            <Input
              id="phone"
              value={address.phone || ""}
              onChange={(e) => onAddressChange({ ...address, phone: e.target.value })}
              disabled
              className="h-9 px-3 bg-gray-50 border-gray-300 text-gray-600 cursor-not-allowed text-sm"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="address" className="text-xs font-medium text-gray-700 mb-1">
            Địa chỉ chi tiết
          </Label>
          <Textarea
            id="address"
            value={address.address}
            onChange={(e) => onAddressChange({ ...address, address: e.target.value })}
            placeholder="Số nhà, tên đường, tên khu phố..."
            rows={1}
            disabled
            className="px-3 py-2 bg-gray-50 border-gray-300 text-gray-600 cursor-not-allowed resize-none text-sm"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <Label htmlFor="city" className="text-xs font-medium text-gray-700 mb-1">
              Tỉnh/Thành phố
            </Label>
            <Input
              id="city"
              value={address.city}
              onChange={(e) => onAddressChange({ ...address, city: e.target.value })}
              disabled
              className="h-9 px-3 bg-gray-50 border-gray-300 text-gray-600 cursor-not-allowed text-sm"
              placeholder="Tỉnh/TP"
            />
          </div>
          <div>
            <Label htmlFor="district" className="text-xs font-medium text-gray-700 mb-1">
              Quận/Huyện
            </Label>
            <Input
              id="district"
              value={address.district}
              onChange={(e) => onAddressChange({ ...address, district: e.target.value })}
              disabled
              className="h-9 px-3 bg-gray-50 border-gray-300 text-gray-600 cursor-not-allowed text-sm"
              placeholder="Quận/Huyện"
            />
          </div>
          <div>
            <Label htmlFor="ward" className="text-xs font-medium text-gray-700 mb-1">
              Phường/Xã
            </Label>
            <Input
              id="ward"
              value={address.ward}
              onChange={(e) => onAddressChange({ ...address, ward: e.target.value })}
              disabled
              className="h-9 px-3 bg-gray-50 border-gray-300 text-gray-600 cursor-not-allowed text-sm"
              placeholder="Phường/Xã"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
