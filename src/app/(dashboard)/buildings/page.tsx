'use client'

import { useQuery } from '@tanstack/react-query'
import { buildingApi } from '@/lib/api/endpoints'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import Link from 'next/link'

export default function BuildingsPage() {
  const { data: buildings, isLoading } = useQuery({
    queryKey: ['buildings'],
    queryFn: () => buildingApi.list(),
  })

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary-green">Buildings</h1>
        <Link href="/buildings/new" className="btn-primary">
          Register New Building
        </Link>
      </div>

      {buildings && buildings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buildings.map((building) => (
            <Link
              key={building.id}
              href={`/buildings/${building.id}/apartments`}
              className="card hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-primary-green mb-2">
                {building.name}
              </h3>
              <p className="text-gray-600 mb-4">{building.address}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{building.floors} floors</span>
                <span>{building.total_apartments} apartments</span>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Total Area: {building.total_area_sqm} m²
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <p className="text-gray-500 mb-4">No buildings registered yet</p>
          <Link href="/buildings/new" className="btn-primary inline-block">
            Register Your First Building
          </Link>
        </div>
      )}
    </div>
  )
}

