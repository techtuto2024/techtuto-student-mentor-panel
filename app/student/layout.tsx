import ProtectedRoute from '@/components/wrappers/ProtectedRoute'

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>
}