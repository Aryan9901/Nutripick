import Image from "next/image"
import Link from "next/link"
import { AlertTriangle, Check, ChevronRight } from "lucide-react"
import type { Product, Ingredient } from "@/types/types"
import HealthScore from "@/components/product/health-score"
import NutritionalInfo from "@/components/product/nutritional-info"

interface ProductInfoProps {
  product: Product
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <HealthScore score={product.healthScore} />
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Brand: {product.brand}</p>

            <div className="relative aspect-square mb-6">
              <Image
                src={product.image || "/placeholder.svg?height=300&width=300"}
                alt={product.name}
                fill
                className="object-contain rounded-lg"
              />
            </div>

            <NutritionalInfo nutritionalInfo={product.nutritionalInfo} />
          </div>
        </div>

        <div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
            <ul className="divide-y divide-gray-100 dark:divide-gray-700">
              {product.ingredients.map((ingredient, index) => (
                <IngredientItem key={index} ingredient={ingredient} />
              ))}
            </ul>
          </div>

          {product.alternatives && product.alternatives.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">Healthier Alternatives</h3>
              <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                {product.alternatives.map((alternative, index) => (
                  <li key={index} className="py-3">
                    <Link
                      href={`/product/${alternative.id}`}
                      className="flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
                    >
                      <div>
                        <span className="font-medium">{alternative.name}</span>
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Health Score:</span>
                          <span
                            className={`text-sm font-medium ${
                              alternative.healthScore > 80
                                ? "text-green-500"
                                : alternative.healthScore > 60
                                  ? "text-yellow-500"
                                  : "text-red-500"
                            }`}
                          >
                            {alternative.healthScore}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function IngredientItem({ ingredient }: { ingredient: Ingredient }) {
  return (
    <li className="py-3">
      <div className="flex items-start">
        <div
          className={`mt-1 mr-3 p-1 rounded-full ${
            ingredient.harmful ? "bg-red-100 dark:bg-red-900/20" : "bg-green-100 dark:bg-green-900/20"
          }`}
        >
          {ingredient.harmful ? (
            <AlertTriangle className="w-4 h-4 text-red-500" />
          ) : (
            <Check className="w-4 h-4 text-green-500" />
          )}
        </div>
        <div>
          <div className="flex items-center">
            <span className="font-medium">{ingredient.name}</span>
            {ingredient.harmful && (
              <span className="ml-2 px-2 py-0.5 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs rounded-full">
                Caution
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{ingredient.description}</p>
        </div>
      </div>
    </li>
  )
}
