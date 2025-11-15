'use client'

import { ProtectedRoute } from '@/components/common/ProtectedRoute'
import { useAuthStore } from '@/lib/auth/store'
import { authApi } from '@/lib/api/endpoints'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    authApi.logout()
    logout()
    router.push('/login')
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center space-x-8">
                <Link href="/dashboard" className="text-2xl font-bold text-primary-green">
                  GREWECO
                </Link>
                <div className="flex space-x-4">
                  <Link
                    href="/dashboard"
                    className="text-gray-700 hover:text-primary-green px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/buildings"
                    className="text-gray-700 hover:text-primary-green px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Buildings
                  </Link>
                  <Link
                    href="/plantations"
                    className="text-gray-700 hover:text-primary-green px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Plantations
                  </Link>
                  <Link
                    href="/analytics"
                    className="text-gray-700 hover:text-primary-green px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Analytics
                  </Link>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">{user?.username}</span>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-primary-green px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  )
}

