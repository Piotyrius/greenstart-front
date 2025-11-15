'use client'

import { use } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { apartmentApi, certificateApi, buildingApi } from '@/lib/api/endpoints'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { CO2Display } from '@/components/common/CO2Display'
import Link from 'next/link'

export default function ApartmentsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const buildingId = parseInt(id)

  const { data: building, isLoading: buildingLoading } = useQuery({
    queryKey: ['building', buildingId],
    queryFn: () => buildingApi.get(buildingId),
  })

  const { data: apartments, isLoading: apartmentsLoading } = useQuery({
    queryKey: ['apartments', buildingId],
    queryFn: () => apartmentApi.list(buildingId),
  })

  const { data: certificates } = useQuery({
    queryKey: ['certificates'],
    queryFn: () => certificateApi.list(),
  })

  const generatePdfMutation = useMutation({
    mutationFn: (certId: number) => certificateApi.generatePdf(certId),
  })

  if (buildingLoading || apartmentsLoading) {
    return <LoadingSpinner />
  }

  const getCertificateForApartment = (apartmentId: number) => {
    return certificates?.find((c) => c.apartment === apartmentId)
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/buildings" className="text-primary-green hover:underline mb-2 inline-block">
          ← Back to Buildings
        </Link>
        <h1 className="text-3xl font-bold text-primary-green">
          {building?.name} - Apartments
        </h1>
        <p className="text-gray-600 mt-2">{building?.address}</p>
      </div>

      {apartments && apartments.length > 0 ? (
        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Apartment</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Size (m²)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Owner</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">CO₂ Absorbed</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apartments.map((apartment) => {
                const certificate = getCertificateForApartment(apartment.id)
                return (
                  <tr key={apartment.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">{apartment.apartment_number}</td>
                    <td className="py-3 px-4">{apartment.size_sqm}</td>
                    <td className="py-3 px-4">{apartment.owner_name || 'N/A'}</td>
                    <td className="py-3 px-4">
                      {certificate ? (
                        <CO2Display value={certificate.co2_absorbed_kg} size="sm" showLabel={false} />
                      ) : (
                        <span className="text-gray-400">No certificate</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {certificate ? (
                        <div className="flex gap-2">
                          <Link
                            href={`/certificate/${certificate.id}`}
                            className="text-primary-green hover:underline text-sm"
                          >
                            View
                          </Link>
                          {certificate.pdf_url && (
                            <a
                              href={certificate.pdf_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-green hover:underline text-sm"
                            >
                              PDF
                            </a>
                          )}
                          {!certificate.pdf_url && (
                            <button
                              onClick={() => generatePdfMutation.mutate(certificate.id)}
                              disabled={generatePdfMutation.isPending}
                              className="text-primary-green hover:underline text-sm"
                            >
                              Generate PDF
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">No certificate</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card text-center py-12">
          <p className="text-gray-500">No apartments registered for this building</p>
        </div>
      )}
    </div>
  )
}

