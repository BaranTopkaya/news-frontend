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
    fetch(`http://localhost:8080/api/news`)
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

        {/* Generate some random paragraphs for the article */}
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl
          nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl
          aliquam nisl, eget ultricies nisl nisl eget nisl.
        </p>
        <p>
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
          in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
          aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>
      </div>
    </div>
  )
}

export default NewsDetailPage
