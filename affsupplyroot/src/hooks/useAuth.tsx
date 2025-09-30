"use client";
import { useReducer, useEffect } from "react";
import api from "@/lib/Axios/axios";

interface User {
  id: number;
  roleID: number;
  email: string;
  name: string;
  avatar?: string;
  permissions: string[];
}

interface BackendToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

interface AuthState {
  email: string;
  password: string;
  roleId: number | null;
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: "SET_FIELD"; field: string; value: any }
  | { type: "START" }
  | { type: "SUCCESS"; payload: any }
  | { type: "ERROR"; payload: string }
  | { type: "LOGOUT" };

const initialState: AuthState = {
  email: "",
  password: "",
  roleId: null,
  token: null,
  refreshToken: null,
  user: null,
  loading: false,
  error: null,
};

function reducer(state: AuthState, action: Action): AuthState {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "START":
      return { ...state, loading: true, error: null };
    case "SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload.data.user,
        roleId: action.payload.data.user.roleID,
        token: action.payload.data.backendToken.accessToken,
        refreshToken: action.payload.data.backendToken.refreshToken,
      };
    case "ERROR":
      return { ...state, loading: false, error: action.payload };
    case "LOGOUT":
      localStorage.removeItem("authUser");
      return { ...initialState };
    default:
      return state;
  }
}

export default function useAuth() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load user từ localStorage khi mount
  useEffect(() => {
    const saved = localStorage.getItem("authUser");
    if (saved) {
      const parsed = JSON.parse(saved);
      dispatch({ type: "SUCCESS", payload: parsed });
    }
  }, []);

  const setField = (field: string, value: any) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

const login = async (email: string, password: string) => {
  dispatch({ type: "START" });
  try {
    const res = await api.post("/api/v1/auth/login", { email, password });
    localStorage.setItem("authUser", JSON.stringify(res.data));
    dispatch({ type: "SUCCESS", payload: res.data });
    return res.data;
  } catch (err: any) {
    dispatch({ type: "ERROR", payload: err.response?.data?.message || err.message });
    throw err;
  }
};



  const loginFacebook = async (accessToken: string) => {
    dispatch({ type: "START" });
    try {
      const res = await api.post("/api/v1/auth/login-facebook", { accessToken });
      localStorage.setItem("authUser", JSON.stringify(res.data));
      dispatch({ type: "SUCCESS", payload: res.data });
    } catch (err: any) {
      dispatch({
        type: "ERROR",
        payload: err.response?.data?.message || err.message,
      });
    }
  };

    const signup = async (payload: any) => {
      dispatch({ type: "START" });
      try {
        const res = await api.post("/api/v1/auth/signup", payload);
        // Không gọi SUCCESS vì signup chưa có user/token
        dispatch({ type: "SET_FIELD", field: "loading", value: false });
        return res.data; // chỉ trả message
      } catch (err: any) {
        dispatch({
          type: "ERROR",
          payload: err.response?.data?.message || err.message,
        });
      }
    };


  const refreshToken = async () => {
    if (!state.refreshToken) return;
    try {
      const res = await api.post("/api/v1/auth/refresh-token", {
        refreshToken: state.refreshToken,
      });
      localStorage.setItem("authUser", JSON.stringify(res.data));
      dispatch({ type: "SUCCESS", payload: res.data });
    } catch (err: any) {
      console.error("Refresh token failed:", err);
    }
  };

  const forgotPassword = async (email: string) => {
    return api.post("/api/v1/auth/forgot-password", { email });
  };

  const verifyOtp = async (payload: { email: string; otp: string }) => {
    return api.post("/api/v1/auth/verify-otp", payload);
  };

  const resetPassword = async (payload: { email: string; newPassword: string }) => {
    return api.post("/api/v1/auth/reset-password", payload);
  };

  const resendOtp = async (email: string) => {
    return api.post("/api/v1/auth/resend-otp", { email });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return {
    state, 
    setField,
    login,
    loginFacebook,
    signup,
    refreshToken,
    forgotPassword,
    verifyOtp,
    resetPassword,
    resendOtp,
    logout,
  };
}
