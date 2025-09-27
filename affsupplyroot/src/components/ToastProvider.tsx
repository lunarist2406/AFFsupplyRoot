"use client";

import { Toaster } from "sonner";

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "green",
            color: "yellow",
          },
        }}
      />
    </>
  );
}
