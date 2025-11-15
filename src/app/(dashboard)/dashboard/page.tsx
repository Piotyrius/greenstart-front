'use client'

import { useQuery } from '@tanstack/react-query'
import { buildingApi, certificateApi } from '@/lib/api/endpoints'
import { CO2Display } from '@/components/common/CO2Display'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import Link from 'next/link'

export default function DashboardPage() {
  const { data: buildings, isLoading: buildingsLoading } = useQuery({
    queryKey: ['buildings'],
    queryFn: () => buildingApi.list(),
  })

  const { data: certificates, isLoading: certificatesLoading } = useQuery({
    queryKey: ['certificates'],
    queryFn: () => certificateApi.list(),
  })

  if (buildingsLoading || certificatesLoading) {
    return <LoadingSpinner />
  }

  const totalBuildings = buildings?.length || 0
  const totalCertificates = certificates?.length || 0
  const totalApartments = buildings?.reduce((sum, b) => sum + (b.apartments_count || 0), 0) || 0
  const totalCo2 = certificates?.reduce((sum, c) => sum + c.co2_absorbed_kg, 0) || 0

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary-green mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Buildings</h3>
          <p className="text-3xl font-bold text-primary-green">{totalBuildings}</p>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Apartments</h3>
          <p className="text-3xl font-bold text-primary-green">{totalApartments}</p>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Certificates</h3>
          <p className="text-3xl font-bold text-primary-green">{totalCertificates}</p>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total CO₂ Absorbed</h3>
          <CO2Display value={totalCo2} size="lg" showLabel={false} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold text-primary-green mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/buildings/new"
              className="block btn-primary text-center"
            >
              Register New Building
            </Link>
            <Link
              href="/plantations"
              className="block btn-secondary text-center"
            >
              View Plantations
            </Link>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold text-primary-green mb-4">Recent Certificates</h2>
          {certificates && certificates.length > 0 ? (
            <div className="space-y-2">
              {certificates.slice(0, 5).map((cert) => (
                <Link
                  key={cert.id}
                  href={`/certificate/${cert.id}`}
                  className="block p-3 border border-gray-200 rounded hover:bg-gray-50"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      {cert.apartment_info?.building_name} - Apt {cert.apartment_info?.apartment_number}
                    </span>
                    <CO2Display value={cert.co2_absorbed_kg} size="sm" showLabel={false} />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No certificates yet</p>
          )}
        </div>
      </div>
    </div>
  )
}

