import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Mail, MessageCircle, Facebook, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et informations principales */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo-isb-immobiliere.png"
                alt="ISB Immobilière Sodaprim Bouaziz"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <div>
                <h3 className="text-lg font-bold">The Life Residence</h3>
                <p className="text-sm text-gray-400">ISB immobilière</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">L'art de vivre au cœur de la modernité à La Soukra</p>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens Rapides</h4>
            <nav className="space-y-2">
              <Link href="/" className="block text-gray-400 hover:text-custom-beige transition-colors">
                Accueil
              </Link>
              <Link href="#projet" className="block text-gray-400 hover:text-custom-beige transition-colors">
                Le Projet
              </Link>
              <Link href="#logements" className="block text-gray-400 hover:text-custom-beige transition-colors">
                Les Logements
              </Link>
              <Link href="#contact" className="block text-gray-400 hover:text-custom-beige transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Informations de contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-custom-beige mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Téléphone</p>
                  <p className="text-white">+216 58 666 963</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-custom-beige mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white">contact@isbimmobiliere.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-custom-beige mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Adresse</p>
                  <p className="text-white">Chotrana 3, La Soukra, Tunis</p>
                </div>
              </div>
            </div>
          </div>

          {/* Réseaux sociaux et WhatsApp */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Suivez-nous</h4>
            <div className="space-y-4">
              {/* Réseaux sociaux */}
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/isbimmobiliere"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-custom-beige p-2 rounded-none transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/isbimmobiliere/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-custom-beige p-2 rounded-none transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/isb-immobili%C3%A8re/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-custom-beige p-2 rounded-none transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>

              {/* Bouton WhatsApp */}
              <a
                href="https://wa.me/21658666963"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-custom-beige hover:bg-custom-beige-hover text-white px-4 py-2 rounded-none flex items-center space-x-2 transition-colors duration-200 font-medium w-fit"
                aria-label="Contactez-nous sur WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Ligne de séparation et copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 The Life Residence - ISB Immobilière Sodaprim Bouaziz. Tous droits réservés.
            </p>
            <p className="text-gray-400 text-sm">Livraison prévue : 2027</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
