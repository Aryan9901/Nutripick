"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import ProductInfo from "@/components/product/product-info"
import type { Product } from "@/types/types"
import Loading from "@/components/ui/loading"
import { getProductById } from "@/lib/api"

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string

  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        const data = await getProductById(productId)
        setProduct(data)
      } catch (err) {
        setError("Failed to load product information")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId])

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-red-500">{error}</h2>
            <p className="mt-4">Please try again later or scan another product.</p>
          </div>
        ) : product ? (
          <ProductInfo product={product} />
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold">Product not found</h2>
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}
