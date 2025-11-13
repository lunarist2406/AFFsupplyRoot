
export interface Seller {
  id: string;
  brandName: string;
  companyName: string;
  businessPhone: string;
  businessAddress: string;
  description: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  logoUrl?: string;
  documentUrl?: string;
  rejectionReason?: string;
}

export type SellerStatus = Seller['status'];