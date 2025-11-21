'use client'

import { useState } from 'react'
import type { CopyResult as CopyResultType } from '@/lib/copylab'

export function CopyResult({ result }: { result: CopyResultType }) {
  const [copied, setCopied] = useState<string | null>(null)

  async function copyToClipboard(text: string, label: string) {
    await navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-light text-light-90 mb-2">Your Copy</h2>
        <p className="text-gray-80 font-light">Generated using proven conversion principles</p>
      </div>

      {/* Headline */}
      <div className="card border-l-2 border-light">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xs font-normal tracking-[1.5px] uppercase text-light-60">
            Primary Headline
          </h3>
          <button
            onClick={() => copyToClipboard(result.headline, 'headline')}
            className="text-xs text-light hover:text-light-90 font-light transition-colors"
          >
            {copied === 'headline' ? '✓ Copied' : 'Copy'}
          </button>
        </div>
        <p className="text-3xl font-light text-light leading-tight">
          {result.headline}
        </p>
      </div>

      {/* Subhead */}
      <div className="card border-l-2 border-light-60">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xs font-normal tracking-[1.5px] uppercase text-light-60">
            Subheadline
          </h3>
          <button
            onClick={() => copyToClipboard(result.subhead, 'subhead')}
            className="text-xs text-light hover:text-light-90 font-light transition-colors"
          >
            {copied === 'subhead' ? '✓ Copied' : 'Copy'}
          </button>
        </div>
        <p className="text-xl font-light text-gray-80 leading-relaxed">
          {result.subhead}
        </p>
      </div>

      {/* Body */}
      <div className="card border-l-2 border-light-60">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xs font-normal tracking-[1.5px] uppercase text-light-60">
            Body Copy
          </h3>
          <button
            onClick={() => copyToClipboard(result.body, 'body')}
            className="text-xs text-light hover:text-light-90 font-light transition-colors"
          >
            {copied === 'body' ? '✓ Copied' : 'Copy'}
          </button>
        </div>
        <p className="text-base font-light text-gray-80 leading-relaxed">
          {result.body}
        </p>
      </div>

      {/* CTA */}
      <div className="card border-l-2 border-light">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xs font-normal tracking-[1.5px] uppercase text-light-60">
            Call to Action
          </h3>
          <button
            onClick={() => copyToClipboard(result.cta, 'cta')}
            className="text-xs text-light hover:text-light-90 font-light transition-colors"
          >
            {copied === 'cta' ? '✓ Copied' : 'Copy'}
          </button>
        </div>
        <button className="btn-primary">
          {result.cta}
        </button>
      </div>

      {/* Alt Headline */}
      <div className="card border-l-2 border-light-60">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xs font-normal tracking-[1.5px] uppercase text-light-60">
            Alternative Headline (A/B Test)
          </h3>
          <button
            onClick={() => copyToClipboard(result.alt_headline, 'alt')}
            className="text-xs text-light hover:text-light-90 font-light transition-colors"
          >
            {copied === 'alt' ? '✓ Copied' : 'Copy'}
          </button>
        </div>
        <p className="text-3xl font-light text-light leading-tight">
          {result.alt_headline}
        </p>
      </div>

      {/* Principles Used */}
      <div className="card bg-light-5">
        <h3 className="text-xs font-normal tracking-[1.5px] uppercase text-light-60 mb-4">
          Conversion Principles Applied
        </h3>
        <div className="flex flex-wrap gap-2">
          <span className="badge">
            Law: {result.principles_used.law}
          </span>
          <span className="badge">
            Play: {result.principles_used.play}
          </span>
          <span className="badge">
            Voice: {result.principles_used.voice}
          </span>
        </div>
      </div>

      {/* Copy All Button */}
      <div className="flex justify-center pt-8">
        <button
          onClick={() => {
            const allCopy = `HEADLINE:\n${result.headline}\n\nSUBHEAD:\n${result.subhead}\n\nBODY:\n${result.body}\n\nCTA:\n${result.cta}\n\nALT HEADLINE:\n${result.alt_headline}`
            copyToClipboard(allCopy, 'all')
          }}
          className="btn-primary px-12"
        >
          {copied === 'all' ? '✓ Copied All' : 'Copy All to Clipboard'}
        </button>
      </div>
    </div>
  )
}
