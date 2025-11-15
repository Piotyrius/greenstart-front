'use client'

import { use } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { certificateApi } from '@/lib/api/endpoints'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { CO2Display } from '@/components/common/CO2Display'
import { QRCodeSVG } from 'qrcode.react'

export default function CertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const certificateId = parseInt(id)

  const { data: certificate, isLoading } = useQuery({
    queryKey: ['certificate', certificateId],
    queryFn: () => certificateApi.get(certificateId),
  })

  const generatePdfMutation = useMutation({
    mutationFn: () => certificateApi.generatePdf(certificateId),
    onSuccess: () => {
      window.location.reload()
    },
  })

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!certificate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card text-center">
          <p className="text-gray-500">Certificate not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12">
      <div className="max-w-4xl mx-auto">
        <div className="card">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary-green mb-2">
              CO₂ Removal Certificate
            </h1>
            <p className="text-gray-600">Certificate #{certificate.id}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold text-primary-green mb-4">
                Apartment Details
              </h2>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-medium">Building:</span>{' '}
                  {certificate.apartment_info?.building_name}
                </p>
                <p>
                  <span className="font-medium">Apartment:</span>{' '}
                  {certificate.apartment_info?.apartment_number}
                </p>
                <p>
                  <span className="font-medium">Size:</span>{' '}
                  {certificate.apartment_info?.size_sqm} m²
                </p>
                <p>
                  <span className="font-medium">Owner:</span>{' '}
                  {certificate.apartment_info?.owner_name || 'N/A'}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary-green mb-4">
                Plantation Details
              </h2>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-medium">Plantation:</span>{' '}
                  {certificate.hectare_lot_info?.plantation_name}
                </p>
                <p>
                  <span className="font-medium">Hectare Lot:</span>{' '}
                  {certificate.hectare_lot_info?.lot_number}
                </p>
                <p>
                  <span className="font-medium">Area:</span>{' '}
                  {certificate.hectare_lot_info?.area_hectares} hectares
                </p>
                <p>
                  <span className="font-medium">Issued:</span>{' '}
                  {new Date(certificate.issued_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary-green text-white p-8 rounded-lg mb-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">CO₂ Absorption</h2>
            <CO2Display value={certificate.co2_absorbed_kg} size="lg" showLabel={false} />
            <p className="text-sm mt-4 opacity-90">
              This certificate represents the CO₂ absorption contribution of this apartment
              through the allocated paulownia plantation hectares.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-primary-green mb-4">
                Certificate Verification
              </h3>
              {certificate.qr_code && (
                <div className="flex justify-center">
                  <QRCodeSVG value={certificate.qr_code} size={200} />
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center items-center space-y-4">
              {certificate.pdf_url ? (
                <a
                  href={certificate.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Download PDF Certificate
                </a>
              ) : (
                <button
                  onClick={() => generatePdfMutation.mutate()}
                  disabled={generatePdfMutation.isPending}
                  className="btn-primary"
                >
                  {generatePdfMutation.isPending ? 'Generating...' : 'Generate PDF'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

