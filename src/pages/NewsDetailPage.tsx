"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import type { News } from "../types"
import "./NewsDetailPage.css"

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [news, setNews] = useState<News | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    setLoading(true)
    fetch(`https://news-backend-q17r.onrender.com/api/news`)
      .then((response) => response.json())
      .then((data) => {
        const newsItem = data.find((item: News) => item.id.toString() === id)
        if (newsItem) {
          setNews(newsItem)
        } else {
          setError("Haber bulunamadı")
        }
        setLoading(false)
      })
      .catch((err) => {
        setError("Haber yüklenirken bir hata oluştu")
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <div className="loading">Haber yükleniyor...</div>
  }

  if (error || !news) {
    return <div className="error">{error || "Haber bulunamadı"}</div>
  }

  return (
    <div className="news-detail">
      <h1 className="news-title">{news.title}</h1>

      <div className="news-meta">
        <span className="news-date">{new Date().toLocaleDateString("tr-TR")}</span>
        <span className="news-category">Gündem</span>
      </div>

      <div className="news-image-container">
        <img src={news.imageUrl || "/placeholder.svg"} alt={news.title} className="news-image" />
      </div>

      <div className="news-content">
        <p>{news.content}</p>
      </div>
    </div>
  )
}

export default NewsDetailPage
