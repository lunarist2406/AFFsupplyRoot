import Footer from "@/layout/Footer";
import Header from "@/layout/Header";

export default function SupplyNoLayout({ children }: { children: React.ReactNode }) {
  return <>
    <Header/>
      {children}
  </>;
}
