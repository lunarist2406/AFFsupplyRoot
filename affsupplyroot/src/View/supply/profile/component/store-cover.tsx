"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FaCamera, FaShareAlt } from "react-icons/fa"

interface StoreCoverProps {
  coverImage: string
  onChangeCover?: () => void
  onShare?: () => void
}

export function StoreCover({ coverImage, onChangeCover, onShare }: StoreCoverProps) {
  return (
<div className="relative h-64 sm:h-72 md:h-80 bg-green-primary mx-auto px-4 md:px-8 lg:px-12 font-manuale 
                max-w-[80rem] rounded-2xl border overflow-hidden">
      <Image
        src={coverImage || "/placeholder.svg"}
        alt="Farm Cover"
        fill
        className="object-cover opacity-80 rounded-b-2xl"
        priority
      />
      <div className="absolute inset-0 bg-black/20 rounded-b-2xl" />

      {/* Cover Actions */}
      <div className="absolute top-4 right-4 flex flex-wrap gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={onChangeCover}
          className="flex items-center gap-2 bg-white/20 text-yellow-secondary hover:bg-green-500/60"
        >
          <FaCamera className="w-4 h-4" />
          <span className="hidden sm:inline">Đổi ảnh bìa</span>
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={onShare}
          className="flex items-center gap-2 bg-white/30 text-yellow-secondary hover:bg-green-500/60"
        >
          <FaShareAlt className="w-4 h-4" />
          <span className="hidden sm:inline">Chia sẻ</span>
        </Button>
      </div>
    </div>
  )
}
