"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"

interface Props {
  value: string
  onChangeAction: (value: string) => void
  length?: number
  disabled?: boolean
}

export default function OtpInput({ value, onChangeAction, length = 6, disabled = false }: Props) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // Cập nhật state khi value prop thay đổi
    const newOtp = value.split("").slice(0, length)
    const paddedOtp = [...newOtp, ...new Array(length - newOtp.length).fill("")]
    setOtp(paddedOtp)
  }, [value, length])

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return

    const newOtp = [...otp]
    newOtp[index] = element.value
    setOtp(newOtp)
    onChangeAction(newOtp.join(""))

    // Focus next input
    if (element.value && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, length)
    const pastedOtp = pastedData.split("")
    const newOtp = [...otp]
    
    pastedOtp.forEach((digit, index) => {
      if (index < length && !isNaN(Number(digit))) {
        newOtp[index] = digit
      }
    })
    
    setOtp(newOtp)
    onChangeAction(newOtp.join(""))
    
    // Focus last filled input or first empty input
    const lastFilledIndex = pastedOtp.length - 1
    const focusIndex = lastFilledIndex < length - 1 ? lastFilledIndex + 1 : length - 1
    inputRefs.current[focusIndex]?.focus()
  }

  return (
    <div className="flex gap-2 justify-center">
      {otp.map((digit, index) => (
        <Input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          disabled={disabled}
          className="w-12 h-12 text-center text-lg font-semibold border-2 focus:border-orange-500 focus:ring-orange-500"
        />
      ))}
    </div>
  )
}
