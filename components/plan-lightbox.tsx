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
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <div className="relative w-full h-full max-w-6xl max-h-[90vh] bg-white rounded-none overflow-hidden">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-white/95 backdrop-blur-sm p-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{currentPlan?.title}</h3>
            {plans.length > 1 && (
              <p className="text-sm text-gray-600">
                {currentIndex + 1} sur {plans.length}
              </p>
            )}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={onClose}
            className="rounded-none border-gray-300 hover:bg-gray-100 bg-transparent"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Image */}
        <div className="relative w-full h-full pt-20 pb-4">
          <Image
            src={currentPlan?.src || "/placeholder.svg"}
            alt={currentPlan?.alt || "Plan"}
            fill
            className="object-contain p-4"
          />
        </div>

        {/* Navigation */}
        {plans.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={prevPlan}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 border-gray-300 hover:bg-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextPlan}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 border-gray-300 hover:bg-white"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {plans.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-custom-beige" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
