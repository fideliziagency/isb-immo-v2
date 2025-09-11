"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Home, Phone, MessageCircle, CheckCircle } from "lucide-react"

interface ReservationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [selectedUnit, setSelectedUnit] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const units = [
    { id: "s1", name: "Appartement S+1", surface: "65-75 m²", available: 28 },
    { id: "s2", name: "Appartement S+2", surface: "85-95 m²", available: 32 },
    { id: "s3", name: "Appartement S+3", surface: "139-208 m²", available: 22 },
    { id: "duplex", name: "Duplex Premium", surface: "150-180 m²", available: 2 },
    { id: "villa", name: "Villa Premium", surface: "200-250 m²", available: 6 },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("https://formspree.io/f/meoldjwl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          unitType: selectedUnit,
          message: formData.message,
          formType: "reservation",
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setTimeout(() => {
          setIsSubmitted(false)
          onClose()
          // Reset form
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            message: "",
          })
          setSelectedUnit("")
        }, 2000)
      } else {
        throw new Error("Erreur lors de l'envoi")
      }
    } catch (error) {
      console.error("Erreur:", error)
      alert("Erreur lors de l'envoi du formulaire. Veuillez réessayer.")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-none border-0 shadow-2xl">
        <CardHeader className="relative bg-custom-beige text-black">
          <button onClick={onClose} className="absolute right-4 top-4 text-black hover:text-gray-700 transition-colors">
            <X className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-3">
            <Home className="h-6 w-6" />
            <div>
              <CardTitle className="text-2xl">Réservation sur Plan</CardTitle>
              <p className="text-gray-700 mt-1">Sécurisez votre futur logement dès aujourd'hui</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8 bg-gray-50">
          {isSubmitted ? (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Demande Envoyée !</h3>
              <p className="text-gray-600 mb-6">
                Merci pour votre intérêt. Notre équipe vous contactera dans les plus brefs délais pour finaliser votre
                réservation.
              </p>
              <div className="bg-custom-beige-light p-4 rounded-none">
                <p className="text-sm text-gray-700">
                  <strong>Prochaines étapes :</strong>
                  <br />
                  1. Appel de confirmation sous 24h
                  <br />
                  2. Rendez-vous pour visite du showroom
                  <br />
                  3. Signature du contrat de réservation
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Choisissez votre logement</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {units.map((unit) => (
                    <label
                      key={unit.id}
                      className={`flex items-center justify-between p-4 border-2 cursor-pointer transition-colors ${
                        selectedUnit === unit.id
                          ? "border-custom-beige bg-custom-beige-light"
                          : "border-gray-200 hover:border-custom-beige"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="unit"
                          value={unit.id}
                          checked={selectedUnit === unit.id}
                          onChange={(e) => setSelectedUnit(e.target.value)}
                          className="text-custom-beige focus:ring-custom-beige"
                        />
                        <div>
                          <div className="font-semibold text-gray-900">{unit.name}</div>
                          <div className="text-sm text-gray-600">{unit.surface}</div>
                        </div>
                      </div>
                      <Badge
                        className={`rounded-none ${
                          unit.available <= 5 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                        }`}
                      >
                        {unit.available} dispo.
                      </Badge>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
                    placeholder="prénom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
                    placeholder="nom"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
                  placeholder="58 666 963"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message (optionnel)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
                  placeholder="Questions spécifiques, préférences d'étage, etc."
                />
              </div>

              <div className="bg-custom-beige-light p-4 rounded-none">
                <h4 className="font-semibold text-gray-900 mb-2">Avantages de la réservation sur plan :</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Prix préférentiels avant livraison</li>
                  <li>• Choix prioritaire de l'étage et de l'orientation</li>
                  <li>• Possibilité de personnalisation des finitions</li>
                  <li>• Facilités de paiement étalé</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1 rounded-none bg-custom-beige hover:bg-custom-beige-hover"
                  disabled={!selectedUnit}
                >
                  <Home className="h-5 w-5 mr-2" />
                  Confirmer ma Réservation
                </Button>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="lg"
                    variant="outline"
                    className="rounded-none border-custom-beige text-custom-beige hover:bg-custom-beige hover:text-white bg-transparent"
                  >
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    variant="outline"
                    className="rounded-none border-custom-beige text-custom-beige hover:bg-custom-beige hover:text-white bg-transparent"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <p className="text-xs text-gray-500 text-center">
                En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe commerciale concernant votre
                projet immobilier.
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
