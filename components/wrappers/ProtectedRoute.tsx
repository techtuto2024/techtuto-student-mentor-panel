'use client'

import { useAuth } from '@/hooks/useAuth'
import { ReactNode } from 'react'
import Loading from '@/components/utils/Loading'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <Loading />
  }

  if (!isAuthenticated) {
    return null // The middleware will handle the redirect
  }

  return <>{children}</>
}