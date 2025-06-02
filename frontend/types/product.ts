export interface Ingredient {
  name: string
  harmful: boolean
  description: string
}

export interface NutritionalInfo {
  calories: number
  fat: number
  carbs: number
  protein: number
  sugar: number
  sodium: number
}

export interface Alternative {
  id: string
  name: string
  healthScore: number
}

export interface Product {
  id: string
  name: string
  brand: string
  image: string
  ingredients: Ingredient[]
  nutritionalInfo: NutritionalInfo
  healthScore: number
  alternatives?: Alternative[]
}
