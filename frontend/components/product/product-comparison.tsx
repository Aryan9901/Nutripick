import type { Product } from "@/types/types"
import HealthScore from "@/components/product/health-score"
import Link from "next/link"
import Image from "next/image"

interface ProductComparisonProps {
  products: Product[]
}

export default function ProductComparison({ products }: ProductComparisonProps) {
  // Get unique ingredients across all products
  const allIngredients = Array.from(
    new Set(products.flatMap((product) => product.ingredients.map((ingredient) => ingredient.name))),
  )

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left p-4 bg-gray-50 dark:bg-gray-800 sticky left-0 z-10">Product</th>
            {products.map((product, index) => (
              <th key={index} className="p-4 min-w-[200px]">
                <div className="flex flex-col items-center">
                  <div className="relative w-24 h-24 mb-2">
                    <Image
                      src={product.image || "/placeholder.svg?height=100&width=100"}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <Link
                    href={`/product/${product.id}`}
                    className="text-center font-medium hover:text-green-500 transition-colors"
                  >
                    {product.name}
                  </Link>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{product.brand}</div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-4 font-medium bg-gray-50 dark:bg-gray-800 sticky left-0 z-10">Health Score</td>
            {products.map((product, index) => (
              <td key={index} className="p-4 text-center">
                <div className="flex justify-center">
                  <HealthScore score={product.healthScore} />
                </div>
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 font-medium bg-gray-50 dark:bg-gray-800 sticky left-0 z-10">Calories</td>
            {products.map((product, index) => (
              <td key={index} className="p-4 text-center">
                {product.nutritionalInfo.calories} kcal
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 font-medium bg-gray-50 dark:bg-gray-800 sticky left-0 z-10">Fat</td>
            {products.map((product, index) => (
              <td key={index} className="p-4 text-center">
                {product.nutritionalInfo.fat}g
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 font-medium bg-gray-50 dark:bg-gray-800 sticky left-0 z-10">Sugar</td>
            {products.map((product, index) => (
              <td key={index} className="p-4 text-center">
                {product.nutritionalInfo.sugar}g
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 font-medium bg-gray-50 dark:bg-gray-800 sticky left-0 z-10">Ingredients</td>
            {products.map((product, index) => (
              <td key={index} className="p-4">
                <ul className="text-sm space-y-1">
                  {product.ingredients.map((ingredient, idx) => (
                    <li key={idx} className="flex items-center">
                      <span
                        className={`w-2 h-2 rounded-full mr-2 ${ingredient.harmful ? "bg-red-500" : "bg-green-500"}`}
                      ></span>
                      {ingredient.name}
                    </li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
