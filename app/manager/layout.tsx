import ProtectedRoute from '@/components/wrappers/ProtectedRoute'

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>
}