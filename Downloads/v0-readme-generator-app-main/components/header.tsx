"use client"

import { useState } from "react"

export function Header() {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="relative">
          <h1 
            className="text-lg font-semibold tracking-tight cursor-default"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            README no Mi
          </h1>
          {showTooltip && (
            <div className="absolute top-full left-0 mt-2 px-3 py-1.5 bg-popover text-popover-foreground text-xs rounded-md shadow-lg border border-border whitespace-nowrap z-50 animate-in fade-in-0 zoom-in-95 duration-200">
              A Devil Fruit that generates READMEs
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  )
}
