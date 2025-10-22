import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaInfoCircle } from "react-icons/fa";

interface ContactInfoProps {
  email: string;
  onEmailChange: (email: string) => void;
}

export default function ContactInfo({ email, onEmailChange }: ContactInfoProps) {
  return (
    <div className="mb-4">
      <h3 className="text-base font-semibold text-green-primary mb-2 flex items-center gap-2">
        <FaInfoCircle className="text-green-primary h-4 w-4" />
        Thông tin liên hệ
      </h3>
      <div>
        <Label htmlFor="email" className="text-xs font-medium text-gray-700 mb-1">
          Email
        </Label>
        <Input
          id="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="email@example.com"
          disabled
          className="h-9 px-3 bg-gray-50 border-gray-300 text-gray-600 cursor-not-allowed text-sm"
        />
      </div>
    </div>
  );
}
