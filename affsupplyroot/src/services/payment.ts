import api from "@/lib/Axios/axios";

export interface BaseResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface CreateVnpayUrlPayload {
  orderId: number;
}

export interface Transaction {
  id: number;
  orderID: number;
  amount: number;
  status: string;
  paymentMethod: string;
  vnp_Amount: string | null;
  vnp_BankCode: string | null;
  vnp_BankTranNo: string | null;
  vnp_CardType: string | null;
  vnp_OrderInfo: string | null;
  vnp_PayDate: string | null;
  vnp_ResponseCode: string | null;
  vnp_TmnCode: string | null;
  vnp_TransactionNo: string | null;
  vnp_TxnRef: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionListResponse {
  data: Transaction[];
  total: number;
}

export interface VnpayReturnParams {
  vnp_Amount?: string;
  vnp_BankCode?: string;
  vnp_BankTranNo?: string;
  vnp_CardType?: string;
  vnp_OrderInfo?: string;
  vnp_PayDate?: string;
  vnp_ResponseCode?: string;
  vnp_TmnCode?: string;
  vnp_TransactionNo?: string;
  vnp_TransactionStatus?: string;
  vnp_TxnRef?: string;
  vnp_SecureHash?: string;
}


export const createVnpayUrl = async (payload: CreateVnpayUrlPayload) => {
  const res = await api.post<BaseResponse<string>>("/api/v1/payment/create-vnpay-url", payload);
  return res.data;
};

export const handleVnpayReturn = async (params: VnpayReturnParams) => {
  const queryString = new URLSearchParams(params as Record<string, string>).toString();
  const res = await api.get<BaseResponse<{ success: boolean; message: string }>>(`/api/v1/payment/vnpay-return?${queryString}`);
  return res.data;
};

export const getMyTransactions = async (skip: number = 0, take: number = 10) => {
  const res = await api.get<BaseResponse<TransactionListResponse>>(
    `/api/v1/payment/transactions/me?skip=${skip}&take=${take}`
  );
  return res.data;
};


export const getAllTransactions = async (skip: number = 0, take: number = 10) => {
  const res = await api.get<BaseResponse<TransactionListResponse>>(
    `/api/v1/payment/transactions/all?skip=${skip}&take=${take}`
  );
  return res.data;
};
