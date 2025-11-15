import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-white">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-primary-green">
          GREWECO
        </h1>
        <p className="text-xl text-gray-700">
          Green Web3 CO₂ Removal Platform
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Link
            href="/login"
            className="btn-primary"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="btn-secondary"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}

