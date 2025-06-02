export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  healthScore: number
  category: string
  image?: string
  allergens: string[]
  dietaryInfo: string[]
  isHealthyOption: boolean
}

export interface Eatery {
  id: string
  name: string
  type: string
  description: string
  image: string
  address: string
  location: string
  distance?: string
  openingHours: string
  phone: string
  website: string
  priceRange: string
  healthScore: number
  tags: string[]
  menuItems: MenuItem[]
  healthyOptions?: string[] // Added for healthy dish recommendations
  lessHealthyOptions?: string[] // Added for less healthy dish warnings
}

export interface MenuAnalysisResult {
  menu_items: {
    name: string
    health_score: number
  }[]
  overall_health_score: number
  summary: string
}
