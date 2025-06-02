export interface UnpackagedFood {
  name: string
  confidence: number
  image: string
  nutritionalInfo: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
    sugar: number
  }
  ingredients: {
    name: string
    amount: string
    calories: number
  }[]
  healthScore: number
  portionSize: string
  dietaryInfo: string[]
  healthAnalysis?: {
    benefits: string[]
    disadvantages: string[]
    personAvoid: string[]
    personPrefer: string[]
  }
}

export interface FoodAnalysisResult {
  ingredients: string[]
  protein_sources: string[]
  health_level: number
  benefits: string[]
  disadvantages: string[]
  personAvoid: string[]
  personPrefer: string[]
}
