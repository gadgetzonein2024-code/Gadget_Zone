import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom'
import './App.css'
import { apiRequest } from './lib/api'
import { loginCustomer, registerCustomer } from './lib/auth'
import { useAuth } from './context/AuthContext'
import { useCart } from './context/CartContext'
import AdminDashboard from './pages/AdminDashboard'
import ProductDetail from './pages/ProductDetail'
import CartSidebar from './components/CartSidebar'
import RegistrationForm from './components/RegistrationForm'
import Footer from './components/Footer'
import AboutUs from './pages/AboutUs'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ForgotPassword from './components/ForgotPassword'
import './pages/ProductDetail.css'
import './components/CartSidebar.css'
import './components/RegistrationForm.css'
import './components/AuthTop.css'
import './components/SearchSuggestions.css'
import './components/Footer.css'
import './components/ForgotPassword.css'

const navigation = ['Home', 'Shop', 'Deals', 'Support']

const categoryChips = [
  'Smartphones',
  'Wearables',
  'Gaming',
  'Audio',
  'Smart Home',
  'Accessories',
]

const highlightCards = [
  {
    title: 'Gaming Gear',
    copy: 'Elevate every ranked match with pro peripherals.',
    cta: 'Shop Now',
  },
  {
    title: 'Creator Essentials',
    copy: 'Lights, audio, action — ready out of the box.',
    cta: 'Shop Now',
  },
]

const formatCurrency = (value, currency = 'INR') => {
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(value)
  } catch (error) {
    return `₹${Number(value || 0).toLocaleString('en-IN')}`
  }
}

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  
  const handleAddToCart = (e) => {
    e.stopPropagation()
    addToCart(product, 1)
  }
  
  return (
    <article className="product-card">
      <div className="product-media">
        <img src={product.heroImage} alt={product.name} loading="lazy" />
        <Link to={`/product/${product.slug}`} className="product-overlay">
          <span>View Details</span>
        </Link>
        {product.badge && <span className="product-tag">{product.badge}</span>}
      </div>
      <div className="product-body">
        <p className="product-title">{product.name}</p>
        <div className="product-meta">
          <span className="product-price">{formatCurrency(product.price, product.currency)}</span>
          <span className="product-rating">★ {product.rating?.toFixed(1) || '0.0'}</span>
        </div>
      </div>
      <button className="ghost-button" onClick={handleAddToCart}>Add to Cart</button>
    </article>
  )
}

function LandingPage() {
  const { toggleCart, getTotalItems } = useCart()
  const [heroProduct, setHeroProduct] = useState(null)
  const [trendingProducts, setTrendingProducts] = useState([])
  const [newArrivals, setNewArrivals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAuthSection, setShowAuthSection] = useState(false)
  const [customerMode, setCustomerMode] = useState('login')
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [customerForm, setCustomerForm] = useState({ email: '', password: '' })
  const [customerStatus, setCustomerStatus] = useState(null)
  const [isCustomerSubmitting, setIsCustomerSubmitting] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchSuggestions, setSearchSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const { setCustomerSession } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    let isSubscribed = true

    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const [heroResponse, trendingResponse, newResponse] = await Promise.all([
          apiRequest('/products?tag=hero&limit=1'),
          apiRequest('/products?tag=trending&limit=4'),
          apiRequest('/products?tag=new&limit=4'),
        ])

        if (!isSubscribed) return

        setHeroProduct(heroResponse.data?.[0] || null)
        setTrendingProducts(trendingResponse.data || [])
        setNewArrivals(newResponse.data || [])
        setError(null)
      } catch (err) {
        if (!isSubscribed) return
        console.error(err)
        setError(err.message || 'Unable to load products')
      } finally {
        if (isSubscribed) {
          setIsLoading(false)
        }
      }
    }

    fetchProducts()

    return () => {
      isSubscribed = false
    }
  }, [])

  const heroTitle = heroProduct?.name || 'Latest Smartphones & Smart Watches'
  const heroCopy =
    heroProduct?.shortDescription ||
    'Curated drops from Apple, Samsung, Hyperion, and more. Get watched twice as fast — deliveries in every zone.'

  const handleSearchChange = (value) => {
    setSearchQuery(value)
    if (value.length > 0) {
      generateSuggestions(value)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }

  const generateSuggestions = (query) => {
    const allProducts = [...trendingProducts, ...newArrivals]
    const categories = ['Smartphones', 'Wearables', 'Gaming', 'Audio', 'Smart Home', 'Accessories']
    const popularSearches = ['iPhone', 'Samsung', 'Apple Watch', 'Gaming Headset', 'VR Headset', 'Smartphone']
    
    const productMatches = allProducts
      .filter(product => product.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 3)
      .map(product => ({
        type: 'product',
        name: product.name,
        slug: product.slug,
        image: product.heroImage
      }))
    
    const categoryMatches = categories
      .filter(cat => cat.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 2)
      .map(cat => ({
        type: 'category',
        name: cat
      }))
    
    const popularMatches = popularSearches
      .filter(search => search.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 2)
      .map(search => ({
        type: 'popular',
        name: search
      }))
    
    setSearchSuggestions([...productMatches, ...categoryMatches, ...popularMatches])
  }

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === 'product') {
      navigate(`/product/${suggestion.slug}`)
    } else if (suggestion.type === 'category') {
      setSearchQuery(suggestion.name)
      // Could navigate to category page
    } else {
      setSearchQuery(suggestion.name)
    }
    setShowSuggestions(false)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Handle search submission
      console.log('Searching for:', searchQuery)
      setShowSuggestions(false)
    }
  }

  const scrollToAuth = () => {
    setShowAuthSection(true)
    const authElement = document.getElementById('auth')
    if (authElement) {
      authElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleCustomerInput = (field, value) => {
    setCustomerForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleCustomerSubmit = async (formData) => {
    setCustomerStatus(null)
    setIsCustomerSubmitting(true)

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        phone: formData.phone.trim(),
        address: formData.address,
        preferences: formData.preferences,
        profileCompleted: true
      }

      const response = await registerCustomer(payload)
      setCustomerSession({ token: response.token, user: response.user })
      
      // Redirect based on user role
      if (response.user.role === 'admin') {
        navigate('/admin')
      } else {
        setCustomerStatus({
          type: 'success',
          message: `Welcome to Gadget Zone, ${response.user.name}! Your account has been created successfully.`
        })
        // Switch to login mode after successful registration
        setCustomerMode('login')
      }
    } catch (err) {
      setCustomerStatus({ type: 'error', message: err.message || 'Unable to create account.' })
    } finally {
      setIsCustomerSubmitting(false)
    }
  }

  const handleLoginSubmit = async (event) => {
    event.preventDefault()
    setCustomerStatus(null)

    if (!customerForm.email || !customerForm.password) {
      setCustomerStatus({ type: 'error', message: 'Please enter your email and password.' })
      return
    }

    setIsCustomerSubmitting(true)
    try {
      const payload = {
        email: customerForm.email.trim().toLowerCase(),
        password: customerForm.password,
      }

      const response = await loginCustomer(payload)
      setCustomerSession({ token: response.token, user: response.user })
      
      // Redirect based on user role
      if (response.user.role === 'admin') {
        navigate('/admin')
      } else {
        setCustomerStatus({
          type: 'success',
          message: `Welcome back, ${response.user.name}!`
        })
      }
    } catch (err) {
      setCustomerStatus({ type: 'error', message: err.message || 'Invalid credentials.' })
    } finally {
      setIsCustomerSubmitting(false)
    }
  }

  const handleForgotPassword = () => {
    setShowForgotPassword(true)
    setCustomerStatus(null)
  }

  const handleBackToLogin = () => {
    setShowForgotPassword(false)
    setCustomerMode('login')
  }

  return (
    <div className="page-shell">
      <header className="top-nav">
        <div className="nav-left">
          <div className="logo-mark">
            <img 
              src="/gadget_zone_logo.png" 
              alt="Gadget Zone" 
              className="logo-image"
            />
          </div>
          <div className="brand-meta">
            <p className="brand-name">Gadget Zone</p>
            <p className="brand-tagline">Latest smartphones, smart wearables & gaming rigs</p>
          </div>
        </div>
        <nav className="nav-links">
          {navigation.map((link) => (
            <a href=" ." key={link} className={link === 'Home' ? 'active' : ''}>
              {link}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <div className="search-container">
            <div className="search-bar">
              <form onSubmit={handleSearchSubmit}>
                <input 
                  placeholder="Search gadgets, categories, collections" 
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                <button type="submit">⌕</button>
              </form>
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="search-suggestions">
                  {searchSuggestions.map((suggestion, index) => (
                    <div 
                      key={index} 
                      className={`suggestion-item ${suggestion.type}`}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion.type === 'product' && (
                        <>
                          <img src={suggestion.image} alt={suggestion.name} className="suggestion-image" />
                          <span>{suggestion.name}</span>
                          <span className="suggestion-type">Product</span>
                        </>
                      )}
                      {suggestion.type === 'category' && (
                        <>
                          <span className="suggestion-icon">📁</span>
                          <span>{suggestion.name}</span>
                          <span className="suggestion-type">Category</span>
                        </>
                      )}
                      {suggestion.type === 'popular' && (
                        <>
                          <span className="suggestion-icon">🔥</span>
                          <span>{suggestion.name}</span>
                          <span className="suggestion-type">Popular</span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="search-actions">
              <button className="icon-button" aria-label="Wishlist">
                ♡
              </button>
              <button className="icon-button" aria-label="Cart" onClick={toggleCart}>
                🛒
                {getTotalItems() > 0 && (
                  <span className="cart-badge">{getTotalItems()}</span>
                )}
              </button>
              <button type="button" className="ghost-button condensed" onClick={() => setShowAuthSection(!showAuthSection)}>
                {showAuthSection ? 'Close' : 'Sign In'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="page-content">
        {/* Prominent Login Section at Top */}
        <section className={`auth-portal-top ${showAuthSection ? 'expanded' : 'collapsed'}`} id="auth">
          <div className="auth-top-container">
            <div className="auth-top-content">
              <div className="auth-top-info">
                <h2>Welcome to Gadget Zone</h2>
                <p>Sign in to access exclusive deals, track orders, and save your favorite products</p>
                <div className="auth-benefits">
                  <span>✓ Exclusive Member Deals</span>
                  <span>✓ Fast Checkout</span>
                  <span>✓ Order Tracking</span>
                </div>
              </div>
              
              <div className="auth-top-form">
                <div className="auth-toggle">
                  <button
                    type="button"
                    className={customerMode === 'login' ? 'active' : ''}
                    onClick={() => setCustomerMode('login')}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    className={customerMode === 'register' ? 'active' : ''}
                    onClick={() => setCustomerMode('register')}
                  >
                    Register
                  </button>
                </div>
                
                {customerMode === 'login' ? (
                  <form onSubmit={handleLoginSubmit} className="auth-form">
                    <div className="form-group">
                      <label htmlFor="customer-email">Email</label>
                      <input
                        id="customer-email"
                        type="email"
                        placeholder="you@example.com"
                        value={customerForm.email}
                        onChange={(event) => handleCustomerInput('email', event.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="customer-password">Password</label>
                      <input
                        id="customer-password"
                        type="password"
                        placeholder="••••••••"
                        value={customerForm.password}
                        onChange={(event) => handleCustomerInput('password', event.target.value)}
                      />
                    </div>
                    <button className="primary-button" type="submit" disabled={isCustomerSubmitting}>
                      {isCustomerSubmitting ? 'Processing…' : 'Sign In'}
                    </button>
                    <button 
                      type="button" 
                      className="forgot-password-link"
                      onClick={handleForgotPassword}
                    >
                      Forgot Password?
                    </button>
                    {customerStatus && (
                      <p className={`status-chip ${customerStatus.type}`}>{customerStatus.message}</p>
                    )}
                  </form>
                ) : (
                  <RegistrationForm 
                    onSubmit={handleCustomerSubmit}
                    isSubmitting={isCustomerSubmitting}
                    status={customerStatus}
                  />
                )}
                {showForgotPassword && (
                  <ForgotPassword 
                    onClose={() => setShowForgotPassword(false)}
                    onBackToLogin={handleBackToLogin}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="category-chips">
          {categoryChips.map((chip) => (
            <button key={chip} type="button">
              {chip}
            </button>
          ))}
        </div>

        <section className="hero">
          <div className="hero-primary">
            <p className="eyebrow">New Smartphone</p>
            <h1>{heroTitle}</h1>
            <p className="lead">{heroCopy}</p>
            <div className="hero-ctas">
              <button className="primary-button">Shop Now</button>
              <button className="ghost-button">Browse Catalog</button>
            </div>
            <div className="hero-stats">
              <div>
                <span>{trendingProducts.length}</span>
                <p>Trending drops</p>
              </div>
              <div>
                <span>{newArrivals.length}</span>
                <p>New arrivals</p>
              </div>
              <div>
                <span>{heroProduct?.rating ? `${heroProduct.rating.toFixed(1)}★` : '4.9★'}</span>
                <p>Community rating</p>
              </div>
            </div>
          </div>

          <div className="hero-secondary">
            {highlightCards.map((card) => (
              <article key={card.title} className="highlight-card">
                <p className="card-title">{card.title}</p>
                <p className="card-copy">{card.copy}</p>
                <button className="text-link">{card.cta}</button>
              </article>
            ))}
          </div>
        </section>

        {error && <div className="status-banner error">{error}</div>}
        {isLoading && !error && <div className="status-banner">Loading the latest hardware…</div>}

        <section className="product-section">
          <header className="section-header">
            <div>
              <p className="eyebrow">Curated Picks</p>
              <h2>Trending Products</h2>
            </div>
            <button className="ghost-button">View All</button>
          </header>
          <div className={`product-grid ${isLoading ? 'loading' : ''}`}>
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div key={`trend-skeleton-${index}`} className="product-card skeleton" />
                ))
              : trendingProducts.map((product) => (
                  <ProductCard key={product._id || product.slug} product={product} />
                ))}
          </div>
        </section>

        <section className="product-section">
          <header className="section-header">
            <div>
              <p className="eyebrow">Fresh Inventory</p>
              <h2>New Arrivals</h2>
            </div>
            <div className="section-controls">
              <button className="icon-button">◀</button>
              <button className="icon-button">▶</button>
            </div>
          </header>
          <div className={`product-grid ${isLoading ? 'loading' : ''}`}>
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div key={`new-skeleton-${index}`} className="product-card skeleton" />
                ))
              : newArrivals.map((product) => (
                  <ProductCard key={product._id || product.slug} product={product} />
                ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  const isAdminAuthenticated = Boolean(localStorage.getItem('gz_admin_token'))

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/admin" element={isAdminAuthenticated ? <AdminDashboard /> : <Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <CartSidebar />
    </>
  )
}

export default App
