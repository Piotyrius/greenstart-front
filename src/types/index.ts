export interface Developer {
  id: number
  name: string
  email: string
  company_name: string
  created_at: string
  buildings_count?: number
}

export interface Building {
  id: number
  developer: number
  developer_name?: string
  name: string
  address: string
  floors: number
  total_apartments: number
  total_area_sqm: number
  created_at: string
  apartments_count?: number
}

export interface Apartment {
  id: number
  building: number
  building_name?: string
  apartment_number: string
  size_sqm: number
  owner_name: string
  owner_email: string
  created_at: string
  certificates_count?: number
}

export interface Plantation {
  id: number
  name: string
  polygon_coordinates: {
    type: string
    coordinates: number[][][]
  }
  planting_date: string
  expected_harvest_date: string
  species: string
  total_hectares: number
  created_at: string
  yearly_co2_absorbed?: number
  hectare_lots_count?: number
}

export interface HectareLot {
  id: number
  plantation: number
  plantation_name?: string
  lot_number: string
  area_polygon: {
    type: string
    coordinates: number[][][]
  }
  area_hectares: number
  assigned_to_building?: number | null
  assigned_building_name?: string | null
  created_at: string
}

export interface Certificate {
  id: number
  apartment: number
  hectare_lot: number
  apartment_info?: {
    id: number
    apartment_number: string
    building_name: string
    size_sqm: number
    owner_name: string
  }
  hectare_lot_info?: {
    id: number
    lot_number: string
    plantation_name: string
    area_hectares: number
  }
  pdf_url?: string | null
  nft_token_id?: string | null
  issued_at: string
  qr_code: string
  co2_absorbed_kg: number
}

export interface GrowthData {
  id: number
  plantation: number
  plantation_name?: string
  ndvi_value?: number | null
  timestamp: string
  co2_absorbed_kg: number
  notes: string
}

export interface AuthTokens {
  access: string
  refresh: string
}

export interface User {
  id: number
  username: string
  email: string
}

