// This script creates a simple endpoint to seed products via API call
// Use this if you can't access Render environment variables directly

import fetch from 'node-fetch'

const API_BASE = 'https://gadget-zone-7r8e.onrender.com/api'

const sampleProducts = [
  {
    name: 'A latest Smartphone 12.0 Graphene',
    slug: 'a-latest-smartphone-12-graphene',
    brand: 'Astra',
    price: 39566,
    badge: 'Hot Drop',
    rating: 4.9,
    reviewsCount: 842,
    tags: ['trending', 'hero'],
    shortDescription: 'Graphene-cooled flagship with adaptive LTPO display.',
    highlights: ['6.8" AMOLED 120Hz', '512GB NVMe storage', 'Graphene cooling'],
    heroImage: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
        alt: 'Graphene flagship phone',
      },
    ],
    inventory: { inStock: true, quantity: 42 },
  },
  {
    name: 'Apple iPince Smartwatch',
    slug: 'apple-ipince-smartwatch',
    brand: 'Apple',
    price: 29990,
    badge: 'Bestseller',
    rating: 4.7,
    reviewsCount: 541,
    tags: ['trending'],
    shortDescription: 'Dual-tone titanium chassis with health-grade sensors.',
    highlights: ['SpO2 + ECG', 'Dual-frequency GPS', 'Up to 72h battery'],
    heroImage: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=800&q=80',
    inventory: { inStock: true, quantity: 120 },
  },
  {
    name: 'Samsung Galaxy A1 ProLens',
    slug: 'samsung-galaxy-a1-prolens',
    brand: 'Samsung',
    price: 34390,
    badge: 'New Colorway',
    rating: 4.8,
    reviewsCount: 312,
    tags: ['trending'],
    shortDescription: 'AI-enhanced triple camera with adaptive nightography.',
    heroImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    inventory: { inStock: true, quantity: 75 },
  },
  {
    name: 'Apple iDivine SmartCover',
    slug: 'apple-idivine-smartcover',
    brand: 'Apple',
    price: 13890,
    badge: 'Bundle Deal',
    rating: 4.6,
    reviewsCount: 218,
    tags: ['trending'],
    shortDescription: 'MagSafe tri-fold cover with integrated battery pack.',
    heroImage: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=800&q=80',
    inventory: { inStock: true, quantity: 90 },
  },
  {
    name: 'Samsung iPhone 12 Pro Watch',
    slug: 'samsung-iphone-12-pro-watch',
    brand: 'Samsung',
    price: 33999,
    badge: 'Pre-order',
    rating: 4.8,
    reviewsCount: 654,
    tags: ['new', 'wearable'],
    shortDescription: 'Hybrid wearable that switches between watchOS and WearOS.',
    heroImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    inventory: { inStock: true, quantity: 150 },
  },
  {
    name: 'Sony Pulse Gaming Headset',
    slug: 'sony-pulse-gaming-headset',
    brand: 'Sony',
    price: 12499,
    badge: 'Limited',
    rating: 4.5,
    reviewsCount: 289,
    tags: ['new', 'gaming'],
    shortDescription: 'Tempest 3D audio with graphene drivers for esports accuracy.',
    heroImage: 'https://images.unsplash.com/photo-1515175061531-8a06ea610a53?auto=format&fit=crop&w=800&q=80',
    inventory: { inStock: true, quantity: 210 },
  },
  {
    name: 'Hyperion Portable Console',
    slug: 'hyperion-portable-console',
    brand: 'Hyperion',
    price: 24990,
    badge: 'Fresh Drop',
    rating: 4.4,
    reviewsCount: 192,
    tags: ['new', 'gaming'],
    shortDescription: 'OLED handheld console with desktop-class cooling.',
    heroImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    inventory: { inStock: true, quantity: 64 },
  },
  {
    name: 'PixelDrive VR Starter Kit',
    slug: 'pixeldrive-vr-starter-kit',
    brand: 'PixelDrive',
    price: 42800,
    badge: 'Trending',
    rating: 4.7,
    reviewsCount: 304,
    tags: ['new', 'vr'],
    shortDescription: 'Wireless VR system with inside-out tracking and haptics.',
    heroImage: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=800&q=80',
    inventory: { inStock: true, quantity: 58 },
  },
]

// This would require an admin endpoint to create products
// For now, let's create a simple admin seeding endpoint in the backend

console.log('To fix the product issue, you need to:')
console.log('1. Go to your Render dashboard')
console.log('2. Find your backend service')
console.log('3. Add environment variable MONGO_URI with your MongoDB Atlas connection string')
console.log('4. Redeploy the service')
console.log('5. Run the seed script against the production database')

console.log('\nOr add this seeding endpoint to your backend:')
console.log(`
// Add to your backend routes
app.post('/api/admin/seed-products', async (req, res) => {
  try {
    await Product.deleteMany({})
    const inserted = await Product.insertMany(sampleProducts)
    res.json({ message: \`Seeded \${inserted.length} products\` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
`)
