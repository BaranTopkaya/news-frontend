"use client"

import type React from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../store"
import "./HistoryWidget.css"

const HistoryWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const historyItems = useSelector((state: RootState) => state.history.items)

  return (
    <div className="history-widget">
      <button className="history-toggle" onClick={() => setIsOpen(!isOpen)}>
        Geçmiş
      </button>

      {isOpen && (
        <div className="history-dropdown">
          <h3>Son Ziyaret Edilen Haberler</h3>
          {historyItems.length > 0 ? (
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
