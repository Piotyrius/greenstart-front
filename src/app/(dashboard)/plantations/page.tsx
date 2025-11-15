'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { plantationApi } from '@/lib/api/endpoints'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { MapView } from '@/components/maps/MapView'
import { CO2Display } from '@/components/common/CO2Display'
import type { Plantation } from '@/types'

export default function PlantationsPage() {
  const [selectedPlantation, setSelectedPlantation] = useState<Plantation | null>(null)

  const { data: plantations, isLoading } = useQuery({
    queryKey: ['plantations'],
    queryFn: () => plantationApi.list(),
  })

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary-green mb-8">Plantations</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {plantations?.map((plantation) => (
          <div
            key={plantation.id}
            className="card cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedPlantation(plantation)}
          >
            <h3 className="text-xl font-semibold text-primary-green mb-2">
              {plantation.name}
            </h3>
            <p className="text-gray-600 mb-2">Species: {plantation.species}</p>
            <p className="text-gray-600 mb-2">
              Area: {plantation.total_hectares} hectares
            </p>
            {plantation.yearly_co2_absorbed && (
              <div className="mt-4">
                <CO2Display
                  value={plantation.yearly_co2_absorbed}
                  size="md"
                  showLabel={true}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {plantations && plantations.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-semibold text-primary-green mb-4">Plantation Map</h2>
          <MapView
            plantations={plantations}
            selectedPlantation={selectedPlantation}
            onPlantationClick={setSelectedPlantation}
          />
        </div>
      )}
    </div>
  )
}

