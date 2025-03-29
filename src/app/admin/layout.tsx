'use client'

import { AuthProvider } from '@/context/AuthContext'
import { usePathname } from 'next/navigation'
import AdminNavbar from '@/components/admin/AdminNavbar'
import ProtectedRoute from '@/components/admin/ProtectedRoute'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        {!isLoginPage && (
          <>
            <AdminNavbar />
            <ProtectedRoute>
              <main className="container mx-auto px-4 py-8">
                {children}
              </main>
            </ProtectedRoute>
          </>
        )}

        {isLoginPage && children}
      </div>
    </AuthProvider>
  )
}
