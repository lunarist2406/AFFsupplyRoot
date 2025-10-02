"use client"

import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

interface SwitchProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

export function Switch({ 
  checked, 
  onCheckedChange, 
  disabled = false,
  className 
}: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      className={cn("SwitchRoot", className)}
    >
      <SwitchPrimitive.Thumb className="SwitchThumb" />
    </SwitchPrimitive.Root>
  )
}