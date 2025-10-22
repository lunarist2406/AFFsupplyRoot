"use client"

import { useEffect, useRef } from 'react'
import { preloadProductSlugMappings } from '@/services/product'

export function ProductSlugMapProvider({ children }: { children: React.ReactNode }) {
  const hasPreloaded = useRef(false)

  useEffect(() => {
    if (!hasPreloaded.current) {
      hasPreloaded.current = true
      
      setTimeout(() => {
        preloadProductSlugMappings().catch(error => {
          console.error('Failed to preload product slug mappings:', error)
        })
      }, 1000) 
    }
  }, [])

  return <>{children}</>
}
