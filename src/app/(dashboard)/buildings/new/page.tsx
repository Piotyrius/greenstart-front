'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useQuery } from '@tanstack/react-query'
import { buildingApi, developerApi } from '@/lib/api/endpoints'

export default function NewBuildingPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    developer: '',
    name: '',
    address: '',
    floors: '',
    total_apartments: '',
    total_area_sqm: '',
  })

  const { data: developers } = useQuery({
    queryKey: ['developers'],
    queryFn: () => developerApi.list(),
  })

  const createMutation = useMutation({
    mutationFn: () =>
      buildingApi.create({
        developer: parseInt(formData.developer),
        name: formData.name,
        address: formData.address,
        floors: parseInt(formData.floors),
        total_apartments: parseInt(formData.total_apartments),
        total_area_sqm: parseFloat(formData.total_area_sqm),
      }),
    onSuccess: () => {
      router.push('/buildings')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createMutation.mutate()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary-green mb-8">
        Register New Building
      </h1>

      <div className="card max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Developer
            </label>
            <select
              value={formData.developer}
              onChange={(e) => setFormData({ ...formData, developer: e.target.value })}
              required
              className="input"
            >
              <option value="">Select a developer</option>
              {developers?.map((dev) => (
                <option key={dev.id} value={dev.id}>
                  {dev.company_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Building Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
              className="input"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Floors
              </label>
              <input
                type="number"
                min="1"
                value={formData.floors}
                onChange={(e) => setFormData({ ...formData, floors: e.target.value })}
                required
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Apartments
              </label>
              <input
                type="number"
                min="1"
                value={formData.total_apartments}
                onChange={(e) =>
                  setFormData({ ...formData, total_apartments: e.target.value })
                }
                required
                className="input"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Area (m²)
            </label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={formData.total_area_sqm}
              onChange={(e) =>
                setFormData({ ...formData, total_area_sqm: e.target.value })
              }
              required
              className="input"
            />
          </div>

          <div className="flex gap-4">
            <button type="submit" className="btn-primary" disabled={createMutation.isPending}>
              {createMutation.isPending ? 'Creating...' : 'Create Building'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

