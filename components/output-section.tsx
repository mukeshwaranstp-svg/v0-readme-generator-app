"use client"

import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Button } from "@/components/ui/button"
import { StrawHatLoader } from "@/components/straw-hat-loader"

interface OutputSectionProps {
  readme: string | null
  error: string | null
  isLoading: boolean
}

export function OutputSection({ readme, error, isLoading }: OutputSectionProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (readme) {
      await navigator.clipboard.writeText(readme)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownload = () => {
    if (readme) {
      const blob = new Blob([readme], { type: "text/markdown" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "README.md"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  if (isLoading) {
    return (
      <div className="mt-8">
        <StrawHatLoader />
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-8 bg-destructive/10 border border-destructive/30 rounded-lg p-6 text-center">
        <p className="text-destructive font-medium mb-2">Error</p>
        <p className="text-sm text-destructive/80">{error}</p>
        <p className="mt-4 text-xs text-muted-foreground">
          Even Usopp couldn&apos;t fix this one.
        </p>
      </div>
    )
  }

  if (!readme) {
    return null
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
          <span className="text-sm font-medium text-muted-foreground">README.md</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="text-xs"
          >
            {copied ? (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </span>
            )}
          </Button>
        </div>
        <div className="p-6 prose prose-invert prose-sm max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "")
                const isInline = !match && !className
                return !isInline && match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-md !bg-secondary !my-4"
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className="bg-secondary px-1.5 py-0.5 rounded text-sm" {...props}>
                    {children}
                  </code>
                )
              },
              h1: ({ children }) => <h1 className="text-2xl font-bold text-foreground border-b border-border pb-2 mb-4">{children}</h1>,
              h2: ({ children }) => <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">{children}</h2>,
              h3: ({ children }) => <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">{children}</h3>,
              p: ({ children }) => <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>,
              ul: ({ children }) => <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside text-muted-foreground mb-4 space-y-1">{children}</ol>,
              a: ({ href, children }) => <a href={href} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>,
              blockquote: ({ children }) => <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground my-4">{children}</blockquote>,
            }}
          >
            {readme}
          </ReactMarkdown>
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-4">
        <Button
          onClick={handleDownload}
          variant="outline"
          className="w-full"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download as .md
        </Button>
        <p className="text-xs text-muted-foreground/60">
          Nami approved. No debt required.
        </p>
      </div>
    </div>
  )
}
