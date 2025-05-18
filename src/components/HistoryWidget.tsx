"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../store"
import { addToHistory } from "../store/historySlice"
import "./HistoryWidget.css"

const HistoryWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const dispatch = useDispatch()
  // Only use selector on the client side
  const historyItems = useSelector((state: RootState) => state.history.items)

  useEffect(() => {
    // Fetch history data from the backend
    setIsLoading(true)
    fetch("https://news-backend-q17r.onrender.com/api/history")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch history data")
        }
        return response.json()
      })
      .then((data) => {
        // Update Redux store with history from backend
        data.forEach((item: { title: string }) => {
          dispatch(addToHistory(item.title))
        })
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching history data:", error)
        setError("Geçmiş verileri yüklenirken bir hata oluştu")
        setIsLoading(false)
      })
  }, [dispatch])

  return (
    <div className="history-widget">
      <button className="history-toggle" onClick={() => setIsOpen(!isOpen)}>
        Geçmiş
      </button>

      {isOpen && (
        <div className="history-dropdown">
          <h3>Son Ziyaret Edilen Haberler</h3>
          {isLoading ? (
            <p className="loading-history">Geçmiş yükleniyor...</p>
          ) : error ? (
            <p className="error-history">{error}</p>
          ) : historyItems.length > 0 ? (
            <ul className="history-list">
              {historyItems.slice(0, 10).map((item, index) => (
                <li key={index} className="history-item">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-history">Henüz ziyaret edilen haber yok.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default HistoryWidget
