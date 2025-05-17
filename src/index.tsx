import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

// Only run this code in the browser
if (typeof document !== "undefined") {
  const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
