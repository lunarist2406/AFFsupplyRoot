"use client"; // Bắt buộc để thành Client Component

import React from 'react';
import Authen from './components/Authen';
import dynamic from 'next/dynamic';

// dynamic client-only component
const AuthenToast = dynamic(() => import("./components/AuthenToast"), { ssr: false });

export default function AuthenticationView() {
  return (
    <div className='bg-gradient-to-r from-green-950 via-gray-600 to-green-950'>
      <AuthenToast /> 
      <Authen/>
    </div>
  );
}
