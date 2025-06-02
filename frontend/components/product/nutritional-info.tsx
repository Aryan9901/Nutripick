import type { NutritionalInfo as NutritionalInfoType } from "@/types/types"

interface NutritionalInfoProps {
  nutritionalInfo: NutritionalInfoType
}

export default function NutritionalInfo({ nutritionalInfo }: NutritionalInfoProps) {
  const items = [
    { label: "Calories", value: nutritionalInfo.calories, unit: "kcal" },
    { label: "Fat", value: nutritionalInfo.fat, unit: "g" },
    { label: "Carbs", value: nutritionalInfo.carbs, unit: "g" },
    { label: "Protein", value: nutritionalInfo.protein, unit: "g" },
    { label: "Sugar", value: nutritionalInfo.sugar, unit: "g" },
    { label: "Sodium", value: nutritionalInfo.sodium, unit: "mg" },
  ]

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Nutritional Information</h3>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item, index) => (
          <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">{item.label}</div>
            <div className="font-semibold">
              {item.value} {item.unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
