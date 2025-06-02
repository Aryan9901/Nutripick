"use client"

import { useRef, useEffect, useState } from "react"
import { Camera, RefreshCw } from "lucide-react"

interface ScannerProps {
  onScan: (barcode: string) => void
}

export default function Scanner({ onScan }: ScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment")

  const startScanner = async () => {
    setError(null)
    setIsScanning(true)

    try {
      const constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }

      // In a real app, we would use a barcode scanning library here
      // For demo purposes, we'll simulate a scan after 3 seconds
      setTimeout(() => {
        if (isScanning) {
          // Generate a random barcode for demo
          const mockBarcode = Math.floor(Math.random() * 1000000000000).toString()
          onScan(mockBarcode)
        }
      }, 3000)
    } catch (err) {
      console.error("Error accessing camera:", err)
      setError("Could not access camera. Please ensure you've granted camera permissions.")
      setIsScanning(false)
    }
  }

  const stopScanner = () => {
    setIsScanning(false)

    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
  }

  const toggleCamera = () => {
    stopScanner()
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"))
  }

  useEffect(() => {
    startScanner()

    return () => {
      stopScanner()
    }
  }, [facingMode])

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-md mx-auto mb-6 rounded-xl overflow-hidden scanner-overlay">
        {error ? (
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl text-center">
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <button
              onClick={startScanner}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <video ref={videoRef} className="w-full h-auto rounded-xl" playsInline muted />
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full hidden" />
            <div className="absolute inset-0 border-2 border-green-500 border-dashed rounded-xl pointer-events-none"></div>
          </>
        )}
      </div>

      <div className="flex gap-4">
        <button
          onClick={toggleCamera}
          className="flex items-center justify-center p-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          aria-label="Switch camera"
        >
          <RefreshCw className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>

        <button
          onClick={isScanning ? stopScanner : startScanner}
          className="flex items-center justify-center p-4 bg-green-500 rounded-full shadow-md hover:bg-green-600 transition-colors"
          aria-label={isScanning ? "Stop scanning" : "Start scanning"}
        >
          <Camera className="w-8 h-8 text-white" />
        </button>
      </div>

      <p className="mt-6 text-center text-gray-600 dark:text-gray-400">Position the barcode within the frame to scan</p>
    </div>
  )
}
