import type { Metadata } from "next";
import "./globals.css";
import { Montserrat, Manuale } from "next/font/google";
import ToastProvider from "@/components/ToastProvider";
import { CartProvider } from "@/hooks/useCart";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const manuale = Manuale({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manuale",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://affsupplyroot.vercel.app'), // domain chính thức
  title: {
    default: 'AFF Supply Root',
    template: '%s | AFF Supply Root',
  },
  description:
    'Nền tảng thương mại điện tử chuyên cung cấp hàng hóa chất lượng cao cho nhà bán sỉ & lẻ.',
  keywords: [
    'AFF Supply Root',
    'E-commerce',
    'B2B',
    'Supply chain',
    'Jewelry',
    'Marketplace',
  ],
  authors: [
    {
      name: 'AFF Dev Team',
      url: 'https://github.com/lunarist2406/AFFsupplyRoot',
    },
  ],
  creator: 'AFF Team',
  publisher: 'AFF Supply Root',
  openGraph: {
    title: 'AFF Supply Root',
    description:
      'Kết nối nhà cung cấp và khách hàng nhanh chóng, đáng tin cậy.',
    url: 'https://affsupplyroot.vercel.app',
    siteName: 'AFF Supply Root',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'AFF Supply Root - Trang thương mại điện tử B2B hàng đầu',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://affsupplyroot.vercel.app',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${manuale.variable}`}>
        <ToastProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
