"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Download, Phone, MessageCircle, User, Mail, PhoneCall, Home, CheckCircle, Star } from "lucide-react"

interface ReservationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    unitType: "",
    message: "",
    requestCallback: false,
    downloadBrochure: false,
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      onClose()
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        unitType: "",
        message: "",
        requestCallback: false,
        downloadBrochure: false,
      })
    }, 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-custom-beige p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Réservez Votre Appartement</h2>
            <p className="text-custom-beige-light">Profitez des offres de lancement exclusives</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-custom-beige-light transition-colors"
            aria-label="Fermer"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {isSubmitted ? (
          /* Success State */
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Demande Envoyée avec Succès !</h3>
            <p className="text-gray-600 mb-6">
              Merci pour votre intérêt. Notre équipe commerciale vous contactera dans les plus brefs délais pour
              finaliser votre réservation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="rounded-none bg-custom-beige bg-custom-beige-hover">
                <Download className="h-4 w-4 mr-2" />
                Télécharger la Brochure
              </Button>
              <Button
                variant="outline"
                className="rounded-none border-custom-beige text-custom-beige hover:bg-custom-beige hover:text-white bg-transparent"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp Direct
              </Button>
            </div>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="p-8">
            <div className="mb-6">
              <Badge className="bg-custom-beige-light text-custom-beige rounded-none mb-4">
                Offres de Lancement Limitées
              </Badge>
              <p className="text-gray-600">
                Réservez dès maintenant et bénéficiez d'avantages exclusifs : prix préférentiels, choix prioritaire des
                étages et personnalisation des finitions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 inline mr-1" />
                  Prénom *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
                  placeholder="Votre prénom"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 inline mr-1" />
                  Nom *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
                  placeholder="Votre nom"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="h-4 w-4 inline mr-1" />
                  Email *
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <PhoneCall className="h-4 w-4 inline mr-1" />
                  Téléphone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
                  placeholder="22 322 468"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Home className="h-4 w-4 inline mr-1" />
                Type d'appartement souhaité *
              </label>
              <select
                name="unitType"
                value={formData.unitType}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
              >
                <option value="">Sélectionnez un type</option>
                <option value="s1">Appartement S+1 (65-75 m²)</option>
                <option value="s2">Appartement S+2 (85-95 m²)</option>
                <option value="s3">Appartement S+3 (110-125 m²)</option>
                <option value="duplex">Duplex Prestige (150-180 m²)</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Message (optionnel)</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
                placeholder="Questions spécifiques, préférences d'étage, etc..."
              />
            </div>

            {/* Options */}
            <div className="mb-6 space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="requestCallback"
                  checked={formData.requestCallback}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-custom-beige border-gray-300 rounded focus:ring-custom-beige"
                />
                <span className="text-gray-700">
                  <Phone className="h-4 w-4 inline mr-1" />
                  Demander un rappel téléphonique
                </span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="downloadBrochure"
                  checked={formData.downloadBrochure}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-custom-beige border-gray-300 rounded focus:ring-custom-beige"
                />
                <span className="text-gray-700">
                  <Download className="h-4 w-4 inline mr-1" />
                  Recevoir la brochure PDF complète
                </span>
              </label>
            </div>

            {/* Urgency Banner */}
            <div className="bg-red-50 border border-red-200 p-4 mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="h-5 w-5 text-red-600" />
                <span className="font-semibold text-red-800">Offre Limitée</span>
              </div>
              <p className="text-red-700 text-sm">
                Seulement les 20 premiers réservations bénéficient de 5% de remise et du choix prioritaire des étages.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button type="submit" size="lg" className="flex-1 rounded-none bg-custom-beige bg-custom-beige-hover">
                Confirmer ma Réservation
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={onClose}
                className="rounded-none border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
              >
                Annuler
              </Button>
            </div>

            <p className="text-xs text-gray-500 mt-4 text-center">
              En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe commerciale concernant votre
              projet d'achat.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
