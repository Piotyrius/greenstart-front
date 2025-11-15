'use client'

import { useQuery } from '@tanstack/react-query'
import { growthDataApi, plantationApi, certificateApi } from '@/lib/api/endpoints'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

export default function AnalyticsPage() {
  const { data: plantations, isLoading: plantationsLoading } = useQuery({
    queryKey: ['plantations'],
    queryFn: () => plantationApi.list(),
  })

  const { data: certificates, isLoading: certificatesLoading } = useQuery({
    queryKey: ['certificates'],
    queryFn: () => certificateApi.list(),
  })

  const { data: growthData } = useQuery({
    queryKey: ['growth-data'],
    queryFn: () => growthDataApi.list(),
  })

  if (plantationsLoading || certificatesLoading) {
    return <LoadingSpinner />
  }

  // Prepare CO₂ absorption over time data
  const co2OverTime = growthData
    ?.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    .map((data) => ({
      date: new Date(data.timestamp).toLocaleDateString(),
      co2: parseFloat(data.co2_absorbed_kg.toString()),
    })) || []

  // Prepare plantation performance data
  const plantationPerformance =
    plantations?.map((p) => ({
      name: p.name,
      co2: p.yearly_co2_absorbed || 0,
      hectares: parseFloat(p.total_hectares.toString()),
    })) || []

  // Calculate totals
  const totalCo2 = certificates?.reduce((sum, c) => sum + c.co2_absorbed_kg, 0) || 0
  const totalCertificates = certificates?.length || 0
  const totalPlantations = plantations?.length || 0

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary-green mb-8">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total CO₂ Absorbed</h3>
          <p className="text-3xl font-bold text-primary-green">
            {(totalCo2 / 1000).toFixed(2)}K kg
          </p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Active Certificates</h3>
          <p className="text-3xl font-bold text-primary-green">{totalCertificates}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Plantations</h3>
          <p className="text-3xl font-bold text-primary-green">{totalPlantations}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h2 className="text-xl font-semibold text-primary-green mb-4">
            CO₂ Absorption Over Time
          </h2>
          {co2OverTime.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={co2OverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="co2"
                  stroke="#2D5016"
                  strokeWidth={2}
                  name="CO₂ (kg)"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-12">No growth data available</p>
          )}
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold text-primary-green mb-4">
            Plantation Performance
          </h2>
          {plantationPerformance.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={plantationPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="co2" fill="#2D5016" name="CO₂ (kg/year)" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-12">No plantation data available</p>
          )}
        </div>
      </div>
    </div>
  )
}

