import { apiClient } from './client'
import type {
  Developer,
  Building,
  Apartment,
  Plantation,
  HectareLot,
  Certificate,
  GrowthData,
  AuthTokens,
  User,
} from '@/types'

// Auth endpoints
export const authApi = {
  register: async (username: string, email: string, password: string) => {
    const response = await apiClient.getClient().post('/auth/register/', {
      username,
      email,
      password,
    })
    return response.data as { message: string; user: User; tokens: AuthTokens }
  },

  login: async (username: string, password: string) => {
    const response = await apiClient.getClient().post('/auth/login/', {
      username,
      password,
    })
    const data = response.data as { message: string; user: User; tokens: AuthTokens }
    apiClient.setTokens(data.tokens.access, data.tokens.refresh)
    return data
  },

  logout: () => {
    apiClient.clearAuth()
  },
}

// Developer endpoints
export const developerApi = {
  list: async () => {
    const response = await apiClient.getClient().get('/developers/')
    return response.data.results as Developer[]
  },

  get: async (id: number) => {
    const response = await apiClient.getClient().get(`/developers/${id}/`)
    return response.data as Developer
  },
}

// Building endpoints
export const buildingApi = {
  list: async (developerId?: number) => {
    const params = developerId ? { developer: developerId } : {}
    const response = await apiClient.getClient().get('/buildings/', { params })
    return response.data.results as Building[]
  },

  get: async (id: number) => {
    const response = await apiClient.getClient().get(`/buildings/${id}/`)
    return response.data as Building
  },

  create: async (data: Partial<Building>) => {
    const response = await apiClient.getClient().post('/buildings/', data)
    return response.data as Building
  },
}

// Apartment endpoints
export const apartmentApi = {
  list: async (buildingId?: number) => {
    const params = buildingId ? { building: buildingId } : {}
    const response = await apiClient.getClient().get('/apartments/', { params })
    return response.data.results as Apartment[]
  },

  get: async (id: number) => {
    const response = await apiClient.getClient().get(`/apartments/${id}/`)
    return response.data as Apartment
  },

  create: async (data: Partial<Apartment>) => {
    const response = await apiClient.getClient().post('/apartments/', data)
    return response.data as Apartment
  },
}

// Plantation endpoints
export const plantationApi = {
  list: async () => {
    const response = await apiClient.getClient().get('/plantations/')
    return response.data.results as Plantation[]
  },

  get: async (id: number) => {
    const response = await apiClient.getClient().get(`/plantations/${id}/`)
    return response.data as Plantation
  },

  getCo2Calculation: async (id: number) => {
    const response = await apiClient.getClient().get(`/plantations/${id}/co2_calculation/`)
    return response.data
  },

  assignHectare: async (plantationId: number, buildingId: number) => {
    const response = await apiClient.getClient().post(
      `/plantations/${plantationId}/assign_hectare/${buildingId}/`
    )
    return response.data as HectareLot
  },
}

// Certificate endpoints
export const certificateApi = {
  list: async (apartmentId?: number) => {
    const params = apartmentId ? { apartment: apartmentId } : {}
    const response = await apiClient.getClient().get('/certificates/', { params })
    return response.data.results as Certificate[]
  },

  get: async (id: number) => {
    const response = await apiClient.getClient().get(`/certificates/${id}/`)
    return response.data as Certificate
  },

  create: async (data: { apartment: number; hectare_lot: number }) => {
    const response = await apiClient.getClient().post('/certificates/', data)
    return response.data as Certificate
  },

  generatePdf: async (id: number) => {
    const response = await apiClient.getClient().post(`/certificates/${id}/generate_pdf/`)
    return response.data as { message: string; pdf_url: string }
  },
}

// Growth Data endpoints
export const growthDataApi = {
  list: async (plantationId?: number) => {
    const params = plantationId ? { plantation: plantationId } : {}
    const response = await apiClient.getClient().get('/growth-data/', { params })
    return response.data.results as GrowthData[]
  },
}

