import { useState } from 'react'
import { useCart } from '../context/CartContext'
import './ProductPreviewModal.css'

export default function ProductPreviewModal({ product, isOpen, onClose }) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  if (!isOpen || !product) return null

  const handleAddToCart = () => {
    addToCart(product, quantity)
    onClose()
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= (product.inventory?.quantity || 10)) {
      setQuantity(newQuantity)
    }
  }

  const formatCurrency = (value, currency = 'INR') => {
    try {
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(value)
    } catch (error) {
      return `₹${Number(value || 0).toLocaleString('en-IN')}`
    }
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="star filled">★</span>)
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="star half">★</span>)
      } else {
        stars.push(<span key={i} className="star empty">★</span>)
      }
    }
    return stars
  }

  const discountPercentage = product.originalPrice && product.originalPrice > product.price 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="preview-container">
          {/* Product Images */}
          <div className="preview-images">
            <div className="preview-main-image">
              <img 
                src={product.gallery?.[selectedImage]?.url || product.heroImage} 
                alt={product.gallery?.[selectedImage]?.alt || product.name}
              />
              {product.badge && (
                <span className="product-badge">{product.badge}</span>
              )}
            </div>
            
            {product.gallery && product.gallery.length > 1 && (
              <div className="preview-thumbnails">
                {product.gallery.map((image, index) => (
                  <button
                    key={index}
                    className={`preview-thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image.url} alt={image.alt} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="preview-info">
            <h2 className="preview-title">{product.name}</h2>
            
            <div className="preview-brand">
              <span className="brand">Brand: {product.brand}</span>
            </div>
            
            <div className="preview-rating">
              <div className="rating-stars">
                {renderStars(product.rating)}
                <span className="rating-value">{product.rating?.toFixed(1) || '0.0'}</span>
                <span className="reviews-count">({product.reviewsCount || 0} reviews)</span>
              </div>
            </div>

            <div className="preview-price">
              <div className="current-price">
                <span className="price">{formatCurrency(product.price)}</span>
                {discountPercentage > 0 && (
                  <span className="discount-badge">{discountPercentage}% OFF</span>
                )}
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="original-price">
                  <span className="price-strikethrough">{formatCurrency(product.originalPrice)}</span>
                  <span className="savings">Save {formatCurrency(product.originalPrice - product.price)}</span>
                </div>
              )}
            </div>

            <div className="preview-description">
              <p>{product.shortDescription || 'No description available.'}</p>
            </div>

            {product.highlights && product.highlights.length > 0 && (
              <div className="preview-highlights">
                <h4>Key Features</h4>
                <ul>
                  {product.highlights.slice(0, 3).map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="preview-purchase">
              <div className="quantity-selector">
                <button 
                  className="quantity-btn" 
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  min="1" 
                  max={product.inventory?.quantity || 10}
                />
                <button 
                  className="quantity-btn" 
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= (product.inventory?.quantity || 10)}
                >
                  +
                </button>
              </div>

              <button 
                className={`add-to-cart-btn ${!product.inventory?.inStock ? 'disabled' : ''}`}
                onClick={handleAddToCart}
                disabled={!product.inventory?.inStock}
              >
                {product.inventory?.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>

            <div className="preview-meta">
              <div className="stock-status">
                <span className={`status ${product.inventory?.inStock ? 'in-stock' : 'out-of-stock'}`}>
                  {product.inventory?.inStock ? `In Stock (${product.inventory?.quantity} units)` : 'Out of Stock'}
                </span>
              </div>
              
              {product.shipping?.free && (
                <div className="shipping-info">
                  <span className="icon">🚚</span>
                  <span>Free Delivery</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="preview-actions">
          <button className="view-details-btn" onClick={onClose}>
            View Full Details
          </button>
        </div>
      </div>
    </div>
  )
}
