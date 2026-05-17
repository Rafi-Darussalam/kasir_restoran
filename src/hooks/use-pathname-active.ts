"use client"

import { usePathname } from "next/navigation"

export function usePathnameActive(path: string, exact = false) {
  const pathname = usePathname()
  
  if (!pathname) return false
  
  if (path === '/') {
    return pathname === '/'
  }
  
  if (exact) {
    return pathname === path
  }
  
  return pathname.startsWith(path)
}