"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import type { Finance } from "../types"
import "./Header.css"

const Header: React.FC = () => {
  const [financeData, setFinanceData] = useState<Finance[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    fetch("https://news-backend-q17r.onrender.com/api/finance")
      .then((response) => response.json())
      .then((data) => setFinanceData(data))
      .catch((error) => console.error("Error fetching finance data:", error))
  }, [])

  // Function to determine if change is positive or negative (randomly for demo)
  const getChangeDirection = (item: Finance) => {
    // Use a deterministic approach based on the item id to keep it consistent
    return item.id % 2 === 0 ? "up" : "down"
  }

  // Function to generate a random percentage change
  const getChangePercentage = (item: Finance) => {
    // Use a deterministic approach based on the item id to keep it consistent
    return ((item.id * 0.5) % 2).toFixed(2)
  }

  return (
    <header className="header">
      <nav className="main-nav">
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
        <ul className={`nav-list ${isMenuOpen ? "open" : ""}`}>
          <li className="nav-item has-submenu">
            <Link to="/">
              SON DAKİKA <span className="dropdown-arrow">▼</span>
            </Link>
            <ul className="submenu">
              <li>
                <Link to="/">Güncel</Link>
              </li>
              <li>
                <Link to="/">Politika</Link>
              </li>
              <li>
                <Link to="/">Ekonomi</Link>
              </li>
            </ul>
          </li>
          <li className="nav-item has-submenu">
            <Link to="/">
              YAZARLAR <span className="dropdown-arrow">▼</span>
            </Link>
            <ul className="submenu">
              <li>
                <Link to="/">Köşe Yazarları</Link>
              </li>
              <li>
                <Link to="/">Konuk Yazarlar</Link>
              </li>
              <li>
                <Link to="/">Yazı Dizileri</Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <Link to="/">GÜNDEM</Link>
          </li>
          <li className="nav-item">
            <Link to="/">EKONOMİ</Link>
          </li>
          <li className="nav-item">
            <Link to="/">DÜNYA</Link>
          </li>
          <li className="nav-item">
            <Link to="/">GÜNÜN İÇİNDEN</Link>
          </li>
          <li className="nav-item">
            <Link to="/">SPOR</Link>
          </li>
          <li className="nav-item">
            <Link to="/">HAYAT</Link>
          </li>
          <li className="nav-item">
            <Link to="/">MAGAZİN</Link>
          </li>
          <li className="nav-item">
            <Link to="/">FİNANS</Link>
          </li>
          <li className="nav-item">
            <Link to="/">RESMİ İLANLAR</Link>
          </li>
        </ul>
      </nav>

      <div className="finance-ticker">
        {financeData.map((item) => (
          <div key={item.id} className="finance-item">
            <span className="finance-name">{item.category}</span>
            <span className="finance-value">{item.price.toFixed(2)}</span>
            <span className={`finance-change ${getChangeDirection(item)}`}>
              {getChangeDirection(item) === "up" ? "↑" : "↓"} {getChangePercentage(item)}%
            </span>
          </div>
        ))}
      </div>
    </header>
  )
}

export default Header
