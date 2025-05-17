"use client"

import type React from "react"
import { useState } from "react"
import "./Advertisement.css"

interface AdvertisementProps {
  position: "left" | "right"
}

const Advertisement: React.FC<AdvertisementProps> = ({ position }) => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) {
    return null
  }

  return (
    <div className={`ad-container ${position}`}>
      <button className="ad-close" onClick={() => setIsVisible(false)}>
        ✕
      </button>
      <a href="https://example.com" target="_blank" rel="noopener noreferrer">
        <div className="ad-content">
          <div className="ad-brand">
            <span>LACOSTE</span>
          </div>

          <div className="ad-products">
            <div className="ad-product">
              <div className="ad-product-image">
                <img
                  src="https://akn-lacoste.a-cdn.akinoncloud.com/products/2022/04/29/180910/fa719fca-f25d-4414-b5f6-3c3214b1c698_size2000_cropCenter.jpg"
                  alt="Lacoste Product"
                />
              </div>
              <div className="ad-product-price">
                <span className="discount">%25</span>
                <span>3.599 TL</span>
              </div>
            </div>

            <div className="ad-product">
              <div className="ad-product-image">
                <img
                  src="https://akn-lacoste.a-cdn.akinoncloud.com/products/2022/04/29/180910/fa719fca-f25d-4414-b5f6-3c3214b1c698_size2000_cropCenter.jpg"
                  alt="Lacoste Product"
                />
              </div>
              <div className="ad-product-price">
                <span className="discount">%25</span>
                <span>3.599 TL</span>
              </div>
            </div>

            <div className="ad-product">
              <div className="ad-product-image">
                <img
                  src="https://akn-lacoste.a-cdn.akinoncloud.com/products/2022/04/29/180910/fa719fca-f25d-4414-b5f6-3c3214b1c698_size2000_cropCenter.jpg"
                  alt="Lacoste Product"
                />
              </div>
              <div className="ad-product-price">
                <span className="discount">%25</span>
                <span>3.599 TL</span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}

export default Advertisement
