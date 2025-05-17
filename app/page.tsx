"use client"

import type React from "react"
import dynamic from "next/dynamic"

// Dynamically import the App component with no server-side rendering
const AppWithNoSSR = dynamic(() => import("../src/App"), {
  ssr: false,
})

const Page: React.FC = () => {
  return <AppWithNoSSR />
}

export default Page
