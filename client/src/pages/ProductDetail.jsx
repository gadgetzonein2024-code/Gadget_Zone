import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { apiRequest } from '../lib/api'
import { useCart } from '../context/CartContext'
import './ProductDetail.css'

export default function ProductDetail() {
  const { slug } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('specifications')
  const [reviewData, setReviewData] = useState({ rating: 5, title: '', comment: '' })
  const [showReviewForm, setShowReviewForm] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await apiRequest(`/products/${slug}`)
        setProduct(response.data)
        if (response.data.heroImage) {
          setSelectedImage(0)
        }
      } catch (err) {
        setError(err.message || 'Product not found')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchProduct()
    }
  }, [slug])

  const handleAddToCart = () => {
    if (product && product.inventory.inStock) {
      addToCart(product, quantity)
    }
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= (product?.inventory.quantity || 10)) {
      setQuantity(newQuantity)
    }
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    // TODO: Implement review submission API
    console.log('Review submitted:', reviewData)
    setShowReviewForm(false)
    setReviewData({ rating: 5, title: '', comment: '' })
  }

  const formatCurrency = (value, currency = 'INR') => {
    try {
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(value)
    } catch (error) {
      return `₹${Number(value || 0).toLocaleString('en-IN')}`
    }
  }

  const renderStars = (rating, size = 'small') => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className={`star filled ${size}`}>★</span>)
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className={`star half ${size}`}>★</span>)
      } else {
        stars.push(<span key={i} className={`star empty ${size}`}>★</span>)
      }
    }
    return stars
  }

  if (loading) {
    return (
      <div className="product-detail-loading">
        <div className="skeleton-container">
          <div className="skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-price"></div>
            <div className="skeleton-buttons"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="product-detail-error">
        <div className="error-container">
          <h2>Product Not Found</h2>
          <p>{error || 'The product you\'re looking for doesn\'t exist.'}</p>
          <Link to="/" className="back-to-products">
            ← Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const discountPercentage = product.originalPrice && product.originalPrice > product.price 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="product-detail">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span className="separator">/</span>
        <Link to="/">{product.brand}</Link>
        <span className="separator">/</span>
        <span className="current">{product.name}</span>
      </div>

      <div className="product-container">
        {/* Product Images Section */}
        <div className="product-images">
          <div className="main-image">
            <img 
              src={product.gallery?.[selectedImage]?.url || product.heroImage} 
              alt={product.gallery?.[selectedImage]?.alt || product.name}
            />
            {product.badge && (
              <span className="product-badge">{product.badge}</span>
            )}
          </div>
          
          {product.gallery && product.gallery.length > 1 && (
            <div className="image-thumbnails">
              {product.gallery.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image.url} alt={image.alt} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info Section */}
        <div className="product-info">
          <div className="product-header">
            <h1 className="product-title">{product.name}</h1>
            <div className="product-meta">
              <div className="brand-info">
                <span className="brand">Brand: {product.brand}</span>
                {product.inventory.sku && <span className="sku">SKU: {product.inventory.sku}</span>}
              </div>
              
              <div className="rating-section">
                <div className="rating-stars">
                  {renderStars(product.rating, 'medium')}
                  <span className="rating-value">{product.rating.toFixed(1)}</span>
                  <span className="reviews-count">({product.reviewsCount} reviews)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="price-section">
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

          <div className="purchase-section">
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
                max={product.inventory.quantity || 10}
              />
              <button 
                className="quantity-btn" 
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= (product.inventory.quantity || 10)}
              >
                +
              </button>
            </div>

            <button 
              className={`add-to-cart-btn ${!product.inventory.inStock ? 'disabled' : ''}`}
              onClick={handleAddToCart}
              disabled={!product.inventory.inStock}
            >
              {product.inventory.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>

          <div className="delivery-info">
            {product.shipping?.free && (
              <div className="delivery-item">
                <span className="icon">🚚</span>
                <span>Free Delivery</span>
              </div>
            )}
            {product.shipping?.deliveryTime && (
              <div className="delivery-item">
                <span className="icon">⏰</span>
                <span>{product.shipping.deliveryTime}</span>
              </div>
            )}
            {product.warranty?.period && (
              <div className="delivery-item">
                <span className="icon">🛡️</span>
                <span>{product.warranty.period} Warranty</span>
              </div>
            )}
            {product.shipping?.returnPolicy && (
              <div className="delivery-item">
                <span className="icon">↩️</span>
                <span>{product.shipping.returnPolicy}</span>
              </div>
            )}
          </div>

          {product.highlights && product.highlights.length > 0 && (
            <div className="highlights-section">
              <h3>Key Features</h3>
              <ul className="highlights-list">
                {product.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="product-tabs">
        <div className="tab-buttons">
          <button 
            className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('specifications')}
          >
            Specifications
          </button>
          <button 
            className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button 
            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({product.reviews?.length || 0})
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'specifications' && (
            <div className="specifications-content">
              {product.specifications && product.specifications.length > 0 ? (
                product.specifications.map((specGroup, index) => (
                  <div key={index} className="spec-group">
                    <h4>{specGroup.category}</h4>
                    <div className="spec-table">
                      {specGroup.specs.map((spec, specIndex) => (
                        <div key={specIndex} className="spec-row">
                          <div className="spec-name">{spec.name}</div>
                          <div className="spec-value">{spec.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p>No specifications available for this product.</p>
              )}
            </div>
          )}

          {activeTab === 'description' && (
            <div className="description-content">
              <div className="description-text">
                {product.fullDescription ? (
                  <div dangerouslySetInnerHTML={{ __html: product.fullDescription.replace(/\n/g, '<br>') }} />
                ) : (
                  <p>{product.shortDescription || 'No detailed description available.'}</p>
                )}
              </div>
              
              {product.inventory && (
                <div className="inventory-details">
                  <h4>Product Details</h4>
                  <div className="details-grid">
                    {product.inventory.weight && (
                      <div className="detail-item">
                        <span className="label">Weight:</span>
                        <span className="value">{product.inventory.weight}g</span>
                      </div>
                    )}
                    {product.inventory.dimensions && (
                      <div className="detail-item">
                        <span className="label">Dimensions:</span>
                        <span className="value">
                          {product.inventory.dimensions.length} × {product.inventory.dimensions.width} × {product.inventory.dimensions.height} {product.inventory.dimensions.unit}
                        </span>
                      </div>
                    )}
                    <div className="detail-item">
                      <span className="label">In Stock:</span>
                      <span className={`value ${product.inventory.inStock ? 'in-stock' : 'out-of-stock'}`}>
                        {product.inventory.inStock ? `Yes (${product.inventory.quantity} units)` : 'No'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="reviews-content">
              <div className="reviews-header">
                <div className="reviews-summary">
                  <div className="average-rating">
                    <span className="rating-number">{product.rating.toFixed(1)}</span>
                    <div className="rating-stars-large">
                      {renderStars(product.rating, 'large')}
                    </div>
                    <span className="total-reviews">{product.reviewsCount} Reviews</span>
                  </div>
                  
                  <div className="rating-distribution">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const percentage = product.reviews?.length > 0 
                        ? (product.reviews.filter(r => r.rating === star).length / product.reviews.length) * 100
                        : 0
                      return (
                        <div key={star} className="rating-bar">
                          <span className="star-label">{star}★</span>
                          <div className="bar-container">
                            <div className="bar-fill" style={{ width: `${percentage}%` }}></div>
                          </div>
                          <span className="percentage">{Math.round(percentage)}%</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
                
                <button 
                  className="write-review-btn"
                  onClick={() => setShowReviewForm(!showReviewForm)}
                >
                  Write a Review
                </button>
              </div>

              {showReviewForm && (
                <form className="review-form" onSubmit={handleReviewSubmit}>
                  <h4>Write Your Review</h4>
                  <div className="form-group">
                    <label>Rating</label>
                    <div className="rating-input">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className={`rating-star ${reviewData.rating >= star ? 'selected' : ''}`}
                          onClick={() => setReviewData({...reviewData, rating: star})}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Review Title"
                      value={reviewData.title}
                      onChange={(e) => setReviewData({...reviewData, title: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      placeholder="Write your review..."
                      value={reviewData.comment}
                      onChange={(e) => setReviewData({...reviewData, comment: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-actions">
                    <button type="button" onClick={() => setShowReviewForm(false)}>Cancel</button>
                    <button type="submit">Submit Review</button>
                  </div>
                </form>
              )}

              <div className="reviews-list">
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((review, index) => (
                    <div key={index} className="review-item">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <span className="reviewer-name">User {review.user}</span>
                          <div className="review-rating">
                            {renderStars(review.rating, 'small')}
                          </div>
                        </div>
                        <span className="review-date">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 className="review-title">{review.title}</h4>
                      <p className="review-comment">{review.comment}</p>
                      <div className="review-actions">
                        <button className="helpful-btn">
                          Helpful ({review.helpful || 0})
                        </button>
                        {review.verified && (
                          <span className="verified-badge">✓ Verified Purchase</span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-reviews">
                    <p>No reviews yet. Be the first to review this product!</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
