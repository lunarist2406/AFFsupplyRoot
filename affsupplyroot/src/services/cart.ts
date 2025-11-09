import api from "@/lib/Axios/axios";

export interface BaseResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface CartItemBackend {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface Cart {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string | null;
  CartItem: CartItemBackend[];
}


export const getCart = async () => {
  const res = await api.get<BaseResponse<Cart>>("/api/v1/cart");
  return res.data;
};

export const addItemToCart = async (productId: number, quantity: number) => {
  const res = await api.post<BaseResponse<CartItemBackend>>("/api/v1/cart/items", {
    productId,
    quantity
  });
  return res.data;
};


export const updateCartItem = async (itemId: number, quantity: number) => {
  const res = await api.put<BaseResponse<CartItemBackend>>(`/api/v1/cart/items/${itemId}`, {
    quantity
  });
  return res.data;
};

export const removeCartItem = async (itemId: number) => {
  const res = await api.delete<BaseResponse<{ message: string }>>(`/api/v1/cart/items/${itemId}`);
  return res.data;
};

export const syncCartToBackend = async (items: Array<{ id: number; quantity: number }>) => {
  try {
    const cartResponse = await getCart();
    const backendItems = cartResponse.data.CartItem || [];
    
    for (const item of backendItems) {
      await removeCartItem(item.id);
    }
    
    for (const item of items) {
      await addItemToCart(item.id, item.quantity);
    }
    
    return true;
  } catch (error) {
    console.error("Error syncing cart to backend:", error);
    return false;
  }
};

