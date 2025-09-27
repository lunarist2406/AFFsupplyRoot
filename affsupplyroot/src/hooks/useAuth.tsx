"use client";
import { useReducer, useEffect } from "react";
import axios from "axios";
import api from "@/lib/Axios/axios";

const initialState = {
  email: "",
  password: "",
  response: null,
  loading: false,
  error: null,
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "LOGIN_START":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return { ...state, loading: false, response: action.payload };
    case "LOGIN_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "LOGOUT":
      return { ...initialState }; // reset state khi logout
    default:
      return state;
  }
}

export default function useAuth() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load user từ localStorage khi component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      dispatch({ type: "LOGIN_SUCCESS", payload: JSON.parse(savedUser) });
    }
  }, []);

  const handleLogin = async () => {
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await api.post("/api/auth", {
        email: state.email,
        password: state.password,
      });

      localStorage.setItem("user", JSON.stringify(res.data));
        console.log("User stored:", JSON.parse(localStorage.getItem("user")!));

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err: any) {
      dispatch({
        type: "LOGIN_ERROR",
        payload: err.response?.data?.message || err.message,
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  return { state, dispatch, handleLogin, handleLogout };
}
