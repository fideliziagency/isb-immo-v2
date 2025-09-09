"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface Plan {
  src: string
  alt: string
  title: string
}

interface PlanLightboxProps {
  isOpen: boolean
  onClose: () => void
  plans: Plan[]
  initialIndex?: number
}

export default function PlanLightbox({ isOpen, onClose, plans, initialIndex = 0 }: PlanLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const nextPlan = () => {
    setCurrentIndex((prev) => (prev + 1) % plans.length)
  }

  const prevPlan = () => {
    setCurrentIndex((prev) => (prev - 1 + plans.length) % plans.length)
  }

  if (!isOpen) return null

  const currentPlan = plans[currentIndex]

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <div className="relative w-full h-full max-w-7xl mx-auto flex flex-col bg-white overflow-hidden">
        {/* Header */}
        <div className="flex-shrink-0 bg-white/95 backdrop-blur-sm p-3 md:p-4 flex items-center justify-between border-b border-gray-200">
          <div className="min-w-0 flex-1">
            <h3 className="text-base md:text-lg font-bold text-gray-900 truncate">{currentPlan?.title}</h3>
            {plans.length > 1 && (
              <p className="text-xs md:text-sm text-gray-600">
                {currentIndex + 1} sur {plans.length}
              </p>
            )}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={onClose}
            className="flex-shrink-0 ml-4 rounded-none border-gray-300 hover:bg-gray-100 bg-transparent"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 relative overflow-hidden bg-gray-50 flex items-center justify-center p-2 md:p-4">
          <div className="relative w-full h-full max-w-full max-h-full flex items-center justify-center">
            <Image
              src={currentPlan?.src || "/placeholder.svg"}
              alt={currentPlan?.alt || "Plan"}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
              priority
            />
          </div>
        </div>

        {/* Navigation */}
        {plans.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={prevPlan}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/95 border-gray-300 hover:bg-white shadow-lg z-10"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextPlan}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/95 border-gray-300 hover:bg-white shadow-lg z-10"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            <div className="flex-shrink-0 bg-white/95 backdrop-blur-sm p-3 md:p-4 flex justify-center border-t border-gray-200">
              <div className="flex space-x-1 md:space-x-2 overflow-x-auto max-w-full">
                {plans.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors flex-shrink-0 ${
                      index === currentIndex ? "bg-custom-beige" : "bg-gray-400 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
