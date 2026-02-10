# The Life Residence - Frontend
#06/02/2026

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/fideliziagency-7126s-projects/v0-high-end-real-estate-website)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/uti2hfslrRi)

A modern Next.js application for The Life Residence, a luxury residential project in La Soukra, Tunisia by ISB Immobilière Sodaprim Bouaziz.

## 🏗️ Project Overview

The Life Residence is a premium residential development featuring:
- 82 high-end apartments
- 2 luxury duplexes
- 6 exclusive villas
- Expected delivery: 2027

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Image Handling**: Next.js Image Optimization
- **Icons**: Lucide React

## 📦 Installation

```bash
# Install dependencies
npm install
# or
pnpm install

# Run development server
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🌐 Environment Variables

Create a `.env.production` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=https://isb-immo-backend-latest.onrender.com
```

## 📁 Project Structure

```
v0-isb-immo/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   ├── faq/               # FAQ page
│   ├── logements/         # Property listings
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   └── ...               # Feature components
├── lib/                  # Utilities and helpers
├── public/              # Static assets
└── styles/              # Global styles
```

## 🎨 Features

- **Responsive Design**: Mobile-first approach with optimized layouts
- **Image Galleries**: Interactive lightbox with touch gestures
- **3D Gallery**: Immersive property visualization
- **Floor Plans**: Interactive floor plan viewer
- **Reservation System**: Modal-based property reservation
- **Contact Forms**: Integrated contact and inquiry forms
- **Admin Dashboard**: Property management interface
- **Blog Section**: Content management for updates
- **SEO Optimized**: Complete metadata and Open Graph tags

## 🔧 Recent Updates

### Fixed: HierarchyRequestError (Feb 6, 2026)
- Removed manual `<head>` tag from layout.tsx
- Migrated all meta tags to Next.js metadata API
- Ensures proper React component hierarchy in production

## 🚢 Deployment

The application is configured for production deployment with environment-specific settings.

**Live Site**: [https://vercel.com/fideliziagency-7126s-projects/v0-high-end-real-estate-website](https://vercel.com/fideliziagency-7126s-projects/v0-high-end-real-estate-website)

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📄 License

© 2027 ISB Immobilière Sodaprim Bouaziz. All rights reserved.

## 🤝 Contact

For inquiries about The Life Residence project:
- **Website**: [theliferesidence.com](https://theliferesidence.com)
- **Location**: Chotrana 3, La Soukra, Tunisia
