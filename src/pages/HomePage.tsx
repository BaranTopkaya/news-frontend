"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import NewsSlider from "../components/NewsSlider"
import WeatherWidget from "../components/WeatherWidget"
import ClientOnly from "../components/ClientOnly"
import HistoryWidget from "../components/HistoryWidget"
import Advertisement from "../components/Advertisement"
import type { News } from "../types"
import "./HomePage.css"

const HomePage: React.FC = () => {
  const [secondaryNews, setSecondaryNews] = useState<News | null>(null)

  useEffect(() => {
    fetch("https://news-backend-q17r.onrender.com/api/news")
      .then((response) => response.json())
      .then((data) => {
        // Get a random news item for the secondary news section
        const randomIndex = Math.floor(Math.random() * data.length)
        setSecondaryNews(data[randomIndex])
      })
      .catch((error) => console.error("Error fetching news:", error))
  }, [])

  const handleNewsClick = (title: string) => {
    // We'll handle this in the NewsSlider component
  }

  return (
    <div className="home-page">
      <Advertisement position="left" />
      <Advertisement position="right" />

      <div className="main-content">
        <div className="top-section">
          <ClientOnly>
            <HistoryWidget />
          </ClientOnly>
        </div>

        <div className="content-layout">
          <div className="main-news-container">
            <ClientOnly>
              <NewsSlider />
            </ClientOnly>
          </div>

          <div className="side-content">
            {secondaryNews && (
              <div className="secondary-news">
                <Link to={`/news/${secondaryNews.id}`} onClick={() => handleNewsClick(secondaryNews.title)}>
                  <div className="secondary-news-image">
                    <img src={secondaryNews.imageUrl || "/placeholder.svg"} alt={secondaryNews.title} />
                  </div>
                  <div className="secondary-news-content">
                    <h3 className="secondary-news-title">{secondaryNews.title}</h3>
                    <p className="secondary-news-excerpt">{secondaryNews.content}</p>
                  </div>
                </Link>
              </div>
            )}

            <div className="weather-container">
              <WeatherWidget />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
