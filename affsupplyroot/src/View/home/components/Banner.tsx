"use client"

import { Button } from "@/components/ui/button"
import { services } from "../variable"
import { useRouter } from "next/navigation"

export function BannerSection() {
  const router = useRouter();

  return (
    <section className="relative text-white font-manuale overflow-hidden">
      <div className="relative container mx-auto px-5 lg:px-10 py-16">
        <div className="grid lg:grid-cols-10 gap-12 items-center">
          {/* Left content 70% */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold">
              AFF supplyRoot kết nối giá trị{" "}
              <span className="text-yellow-400">Nông Nghiệp Việt Nam</span>
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-5 mt-8">
              {services.map((service, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="flex flex-row items-center justify-center space-x-2 p-3 rounded-lg border border-white/20 hover:bg-white/10 transition-colors cursor-pointer text-yellow-primary"
                  onClick={() => router.push(service.links)}
                >
                  <service.icon className="w-[1rem] h-[1rem] text-yellow-400" />
                  <span className="text-[0.875rem]">{service.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Video 30% */}
          <div className="lg:col-span-4 relative">
            <div className="aspect-video w-full rounded-lg shadow-2xl overflow-hidden">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/3BmWOERYOxg?si=w3Yh9gpvEo2-wRqy"
                title="YouTube video player"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
