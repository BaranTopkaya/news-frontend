"use client"

import type React from "react"
import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./store"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import NewsDetailPage from "./pages/NewsDetailPage"
import "./App.css"

const App: React.FC = () => {
  useEffect(() => {
    // Set document title only on the client side
    document.title = "News"
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/news/:id" element={<NewsDetailPage />} />
            {/* Redirect /HomePage to / */}
            <Route path="/HomePage" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}

export default App
