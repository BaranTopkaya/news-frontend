"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import type { News } from "../types"
import { addToHistory } from "../store/historySlice"
import "./NewsSlider.css"

const NewsSlider: React.FC = () => {
  const [news, setNews] = useState<News[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    fetch("http://localhost:8080/api/news")
      .then((response) => response.json())
      .then((data) => setNews(data))
      .catch((error) => console.error("Error fetching news:", error))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % (news.length || 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [news.length])

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.preventDefault()
    setCurrentSlide((prev) => (prev === 0 ? news.length - 1 : prev - 1))
  }

  const handleNextSlide = (e: React.MouseEvent) => {
    e.preventDefault()
    setCurrentSlide((prev) => (prev + 1) % news.length)
  }

  const handleNewsClick = (newsItem: News) => {
    dispatch(addToHistory(newsItem.title))

    // Also send to backend
    fetch("http://localhost:8080/api/history/add?title=" + encodeURIComponent(newsItem.title), {
      method: "POST",
    }).catch((error) => console.error("Error adding to history:", error))
  }

  if (news.length === 0) {
    return <div className="loading">Haberler yükleniyor...</div>
  }

  return (
    <div className="news-slider">
      <button className="slider-nav prev" onClick={handlePrevSlide}>
        &#10094;
      </button>
      <button className="slider-nav next" onClick={handleNextSlide}>
        &#10095;
      </button>

      <div className="slider-container">
        {news.map((item, index) => (
          <div
            key={item.id}
            className={`slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${item.imageUrl})` }}
          >
            <Link to={`/news/${item.id}`} className="slide-content" onClick={() => handleNewsClick(item)}>
              <div className="slide-overlay"></div>
              <div className="slide-text-container">
                <h2 className="slide-title">{item.title}</h2>
                <p className="slide-description">{item.content}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="slider-dots">
        {news.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  )
}

export default NewsSlider
