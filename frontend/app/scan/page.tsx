"use client"

import { useState } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Scanner from "@/components/scanner/scanner"
import ProductInfo from "@/components/product/product-info"
import type { Product } from "@/types/product"
import Loading from "@/components/ui/loading"

export default function ScanPage() {
  const [isScanning, setIsScanning] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null)

  const handleScan = async (barcode: string) => {
    setIsLoading(true)
    setIsScanning(false)

    try {
      // In a real app, this would be an API call to get product data
      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock product data
      const product: Product = {
        id: barcode,
        name: "Organic Granola Bar",
        brand: "Nature's Path",
        image: "/images/granola-bar.png",
        ingredients: [
          { name: "Rolled Oats", harmful: false, description: "Whole grain cereal" },
          { name: "Honey", harmful: false, description: "Natural sweetener" },
          { name: "Palm Oil", harmful: true, description: "High in saturated fats" },
          { name: "Natural Flavors", harmful: false, description: "Derived from natural sources" },
          { name: "Soy Lecithin", harmful: false, description: "Emulsifier" },
        ],
        nutritionalInfo: {
          calories: 180,
          fat: 8,
          carbs: 24,
          protein: 4,
          sugar: 12,
          sodium: 95,
        },
        healthScore: 68,
        alternatives: [
          { id: "alt1", name: "KIND Bars", healthScore: 82 },
          { id: "alt2", name: "RXBAR", healthScore: 88 },
        ],
      }

      setScannedProduct(product)
    } catch (error) {
      console.error("Error fetching product data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetScan = () => {
    setIsScanning(true)
    setScannedProduct(null)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Scan Product</h1>

        {isLoading && <Loading />}

        {isScanning && !isLoading && <Scanner onScan={handleScan} />}

        {scannedProduct && !isLoading && (
          <div className="animate-fade-in">
            <ProductInfo product={scannedProduct} />
            <div className="mt-8 flex justify-center">
              <button
                onClick={resetScan}
                className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300 flex items-center justify-center"
              >
                Scan Another Product
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}
