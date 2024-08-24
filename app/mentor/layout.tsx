import ProtectedRoute from '@/components/wrappers/ProtectedRoute'

export default function MentorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>
}