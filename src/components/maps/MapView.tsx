'use client'

import { useMemo } from 'react'
import { GoogleMap, useLoadScript, Polygon, InfoWindow } from '@react-google-maps/api'
import type { Plantation } from '@/types'

interface MapViewProps {
  plantations: Plantation[]
  selectedPlantation?: Plantation | null
  onPlantationClick?: (plantation: Plantation) => void
}

const mapContainerStyle = {
  width: '100%',
  height: '600px',
}

const defaultCenter = {
  lat: 41.6168,
  lng: 41.6367,
}

export function MapView({ plantations, selectedPlantation, onPlantationClick }: MapViewProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  })

  const polygonOptions = useMemo(
    () => ({
      fillColor: '#2D5016',
      fillOpacity: 0.35,
      strokeColor: '#2D5016',
      strokeOpacity: 0.8,
      strokeWeight: 2,
    }),
    []
  )

  const convertCoordinates = (coords: number[][][]) => {
    return coords[0].map(([lng, lat]) => ({ lat, lng }))
  }

  if (!apiKey) {
    return (
      <div className="card p-8 text-center">
        <p className="text-gray-500">Google Maps API key not configured</p>
        <p className="text-sm text-gray-400 mt-2">
          Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment variables
        </p>
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="card p-8 text-center">
        <p className="text-red-600">Error loading maps</p>
        <p className="text-sm text-gray-400 mt-2">{loadError.message}</p>
      </div>
    )
  }

  if (!isLoaded) {
    return <div className="card p-8 text-center">Loading maps...</div>
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={defaultCenter}
      options={{
        mapTypeControl: true,
        streetViewControl: false,
      }}
    >
      {plantations.map((plantation) => {
        const coordinates = convertCoordinates(plantation.polygon_coordinates.coordinates)
        return (
          <Polygon
            key={plantation.id}
            paths={coordinates}
            options={polygonOptions}
            onClick={() => onPlantationClick?.(plantation)}
          />
        )
      })}

      {selectedPlantation && (
        <InfoWindow
          position={convertCoordinates(selectedPlantation.polygon_coordinates.coordinates)[0]}
          onCloseClick={() => onPlantationClick?.(null as any)}
        >
          <div className="p-2">
            <h3 className="font-semibold text-primary-green mb-1">
              {selectedPlantation.name}
            </h3>
            <p className="text-sm text-gray-600">
              Species: {selectedPlantation.species}
            </p>
            <p className="text-sm text-gray-600">
              Area: {selectedPlantation.total_hectares} hectares
            </p>
            {selectedPlantation.yearly_co2_absorbed && (
              <p className="text-sm font-semibold text-primary-green mt-1">
                CO₂: {selectedPlantation.yearly_co2_absorbed.toLocaleString()} kg/year
              </p>
            )}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  )
}

