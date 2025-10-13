import Header from "@/layout/Header"
import Footer from "@/layout/Footer"

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}


