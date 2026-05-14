"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface InputFormProps {
  onGenerate: (username: string, repo: string, fileName: string) => void
  isLoading: boolean
}

export function InputForm({ onGenerate, isLoading }: InputFormProps) {
  const [username, setUsername] = useState("")
  const [repo, setRepo] = useState("")
  const [fileName, setFileName] = useState("")
  const [showButtonTooltip, setShowButtonTooltip] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username && repo && fileName) {
      onGenerate(username, repo, fileName)
    }
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm p-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="peer w-full px-4 pt-5 pb-2 bg-background border border-input rounded-md text-foreground placeholder-transparent focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
            placeholder="GitHub Username"
            required
          />
          <label
            htmlFor="username"
            className="absolute left-4 top-2 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent"
          >
            GitHub Username
          </label>
        </div>

        <div className="relative">
          <input
            type="text"
            id="repo"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            className="peer w-full px-4 pt-5 pb-2 bg-background border border-input rounded-md text-foreground placeholder-transparent focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
            placeholder="Repository Name"
            required
          />
          <label
            htmlFor="repo"
            className="absolute left-4 top-2 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent"
          >
            Repository Name
          </label>
        </div>

        <div className="relative">
          <input
            type="text"
            id="fileName"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="peer w-full px-4 pt-5 pb-2 bg-background border border-input rounded-md text-foreground placeholder-transparent focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
            placeholder="File Name"
            required
          />
          <label
            htmlFor="fileName"
            className="absolute left-4 top-2 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent"
          >
            File Name
          </label>
          <p className="mt-1.5 text-xs text-muted-foreground">
            e.g. index.js, app.py
          </p>
        </div>

        <div className="relative pt-2">
          <Button
            type="submit"
            disabled={isLoading || !username || !repo || !fileName}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            onMouseEnter={() => setShowButtonTooltip(true)}
            onMouseLeave={() => setShowButtonTooltip(false)}
          >
            {isLoading ? "Generating..." : "Generate README"}
          </Button>
          {showButtonTooltip && !isLoading && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-popover text-popover-foreground text-xs rounded-md shadow-lg border border-border whitespace-nowrap z-50 animate-in fade-in-0 zoom-in-95 duration-200">
              Gomu Gomu no Generate!
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
