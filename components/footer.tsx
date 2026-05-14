"use client"

import { useState } from "react"

export function Footer() {
  const [showHidden, setShowHidden] = useState(false)

  return (
    <footer className="border-t border-border py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground">
          README no Mi — Built with AI
        </p>
        <p 
          className="mt-2 text-[10px] text-muted-foreground/30 cursor-default select-none transition-colors hover:text-muted-foreground/60"
          onMouseEnter={() => setShowHidden(true)}
          onMouseLeave={() => setShowHidden(false)}
        >
          {showHidden ? "Monkey D. Developer approved" : "・・・"}
        </p>
      </div>
    </footer>
  )
}
