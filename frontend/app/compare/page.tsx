"use client"

import { useState } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import ProductComparison from "@/components/product/product-comparison"
import type { Product } from "@/types/types"
import { searchProducts } from "@/lib/api"
import SearchBar from "@/components/ui/search-bar"
import Loading from "@/components/ui/loading"

export default function ComparePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (query: string) => {
    if (!query.trim()) return

    setIsLoading(true)
    try {
      const results = await searchProducts(query)
      setProducts(results)
    } catch (error) {
      console.error("Error searching products:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Compare Products</h1>

        <div className="max-w-2xl mx-auto mb-8">
          <SearchBar onSearch={handleSearch} placeholder="Search products to compare..." />
        </div>

        {isLoading ? (
          <Loading />
        ) : products.length > 0 ? (
          <ProductComparison products={products} />
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>Search for products to compare their nutritional values and ingredients</p>
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}
