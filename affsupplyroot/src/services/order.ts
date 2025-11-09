import api from "@/lib/Axios/axios";

export interface BaseResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface CreateOrderFromCartPayload {
  addressId: number;
}

export interface OrderItem {
  productID: number;
  quantity: number;
  price: number;
  product: {
    title: string;
    slug: string;
    ProductImage: Array<{ url: string }>;
    SellerProfile: {
      companyName: string;
      slug: string;
      shopAvatar: string | null;
    };
  };
}

export interface OrderAddress {
  id: number;
  userID: number;
  fullName: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  street: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderDetail {
  id: number;
  userID: number;
  addressID: number;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  address: OrderAddress;
  items: OrderItem[];
}

export interface Order {
  id: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  paymentMethod: string;
  user?: {
    name: string;
    email: string;
    phone: string | null;
    avatar: string | null;
  };
}

/**
 * Tạo đơn hàng từ giỏ hàng
 */
export const createOrderFromCart = async (payload: CreateOrderFromCartPayload) => {
  const res = await api.post<BaseResponse<OrderDetail>>("/api/v1/orders/from-cart", payload);
  return res.data;
};

/**
 * Lấy tất cả đơn hàng của tôi
 */
export const getMyOrders = async () => {
  const res = await api.get<BaseResponse<Order[]>>("/api/v1/orders");
  return res.data;
};

/**
 * Lấy chi tiết đơn hàng
 */
export const getOrderDetail = async (id: number) => {
  const res = await api.get<BaseResponse<OrderDetail>>(`/api/v1/orders/${id}`);
  return res.data;
};

/**
 * Xóa đơn hàng (Soft delete)
 */
export const deleteOrder = async (id: number) => {
  const res = await api.delete<BaseResponse<null>>(`/api/v1/orders/${id}`);
  return res.data;
};

/**
 * [Admin] Lấy tất cả đơn hàng trên hệ thống
 */
export const getAllOrdersForAdmin = async () => {
  const res = await api.get<BaseResponse<Order[]>>("/api/v1/orders/admin/all");
  return res.data;
};

/**
 * [Admin] Lấy chi tiết đơn hàng bất kỳ
 */
export const getOrderDetailForAdmin = async (id: number) => {
  const res = await api.get<BaseResponse<OrderDetail>>(`/api/v1/orders/admin/${id}`);
  return res.data;
};
