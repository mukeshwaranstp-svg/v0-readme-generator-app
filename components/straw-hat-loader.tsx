"use client"

import { useState, useEffect } from "react"

const loadingMessages = [
  "Sailing the Grand Line...",
  "Zoro got lost finding your file...",
  "Chopper is reviewing your code...",
  "Sanji is cooking up your README...",
  "Robin is deciphering the poneglyph...",
]

export function StrawHatLoader() {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin mb-6">
        <svg
          width="64"
          height="48"
          viewBox="0 0 64 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-accent"
        >
          {/* Hat top dome */}
          <ellipse cx="32" cy="20" rx="18" ry="14" fill="currentColor" />
          {/* Hat brim */}
          <ellipse cx="32" cy="28" rx="30" ry="8" fill="currentColor" />
          {/* Red band */}
          <rect x="14" y="22" width="36" height="6" rx="3" fill="#c9302c" />
        </svg>
      </div>
      <p className="text-sm text-muted-foreground animate-pulse transition-all duration-300">
        {loadingMessages[messageIndex]}
      </p>
    </div>
  )
}
