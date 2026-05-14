"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { InputForm } from "@/components/input-form"
import { OutputSection } from "@/components/output-section"
import { Footer } from "@/components/footer"

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [readme, setReadme] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async (username: string, repo: string, fileName: string) => {
    setIsLoading(true)
    setError(null)
    setReadme(null)

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_WEBHOOK_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          repo,
          file_name: fileName,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate README")
      }

      const data = await response.text()
      setReadme(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-2xl">
        <InputForm onGenerate={handleGenerate} isLoading={isLoading} />
        <OutputSection
          readme={readme}
          error={error}
          isLoading={isLoading}
        />
      </main>
      <Footer />
    </div>
  )
}
