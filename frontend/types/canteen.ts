export interface CanteenMeal {
    id: string
    name: string
    description: string
    image: string
    healthScore: number
    nutritionalInfo: {
      calories: number
      protein: number
      carbs: number
      fat: number
    }
    allergens: string[]
    dietaryInfo: string[]
    mealType: string
  }
  
  export interface CanteenStats {
    averageHealthScore: number
    healthyChoicesPercentage: number
    nutritionalQualityGrade: string
    improvementAreas: string[]
  }
  