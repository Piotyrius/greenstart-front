'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { authApi } from '@/lib/api/endpoints'
import { useAuthStore } from '@/lib/auth/store'
import Link from 'next/link'

export default function SignupPage() {
  const router = useRouter()
  const setUser = useAuthStore((state) => state.setUser)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const signupMutation = useMutation({
    mutationFn: () => authApi.register(username, email, password),
    onSuccess: (data) => {
      setUser(data.user)
      router.push('/dashboard')
    },
    onError: (err: any) => {
      setError(err.response?.data?.error || 'Signup failed')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    signupMutation.mutate()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
      <div className="card w-full max-w-md">
        <h1 className="text-3xl font-bold text-primary-green text-center mb-6">
          GREWECO
        </h1>
        <h2 className="text-xl font-semibold text-center mb-8">Sign Up</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
          </div>

          <button
            type="submit"
            disabled={signupMutation.isPending}
            className="btn-primary w-full"
          >
            {signupMutation.isPending ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-primary-green hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

