"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { sendContactEmail } from "../utils/email-sender.js"

const ContactForm = () => {
  const [toast, setToast] = useState<null | { type: "success" | "error"; message: string }>(null)

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message })
    setTimeout(() => setToast(null), 4000)
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formEl = e.currentTarget
    const formData = new FormData(formEl)
    const data = Object.fromEntries(formData.entries())

    try {
      await sendContactEmail(data)
      console.log("Email sent successfully")
      showToast("success", "Votre message a bien été envoyé !")
      formEl?.reset()
    } catch (err) {
      console.error(err)
      showToast("error", "Erreur lors de l'envoi, veuillez réessayer.")
    }
  }

  return (
    <Card className="rounded-none border-0 shadow-lg">
      <CardContent className="p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Demande d'information</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="hidden" name="formType" value="contact" />

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
              <input
                type="text"
                name="firstName"
                required
                placeholder="Prénom"
                className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
              <input
                type="text"
                name="lastName"
                required
                placeholder="Nom"
                className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Isbimmobiliere@gmail.com"
              className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="+216 58 666 963"
              className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type de logement souhaité</label>
            <select
              name="unitType"
              className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
            >
              <option>Sélectionnez un type</option>
              <option>Appartement S+1</option>
              <option>Appartement S+2</option>
              <option>Appartement S+3</option>
              <option>Duplex</option>
              <option>Villa</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              rows={4}
              name="message"
              required
              minLength={5}
              placeholder="Message..."
              className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full rounded-none bg-transparent text-custom-beige border-2 border-custom-beige hover:bg-custom-beige hover:text-white transition-colors duration-300"
          >
            Envoyer la demande
          </Button>
        </form>
        {toast && (
          <div
            className={`fixed bottom-6 right-6 z-50 px-4 py-3 shadow-lg border text-white ${
              toast.type === "success" ? "bg-green-600 border-green-700" : "bg-red-600 border-red-700"
            }`}
            role="status"
            aria-live="polite"
          >
            {toast.message}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ContactForm
