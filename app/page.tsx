'use client'

import { useState } from 'react'
import { GeneratorForm } from '@/components/GeneratorForm'
import { HeroExample } from '@/components/HeroExample'

interface FormData {
  product: string
  audience: string
  stage: string
}

export default function Home() {
  const [prefillData, setPrefillData] = useState<FormData | undefined>()

  const handleTryExample = (data: FormData) => {
    setPrefillData(data)
  }

  return (
    <main className="min-h-screen bg-dark">
      {/* Header */}
      <header className="border-b border-light-10">
        <div className="max-w-[664px] mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-light rounded flex items-center justify-center">
                <span className="text-dark font-semibold text-sm">C</span>
              </div>
              <span className="text-lg font-light text-light">Copy Lab</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-[664px] mx-auto px-8 py-32 text-center">
        <span className="badge inline-block mb-6">
          PRINCIPLE-BASED
        </span>

        <h1 className="text-[72px] leading-[72px] font-ultra-light text-light mb-6">
          Copy That Actually Converts
        </h1>

        <p className="text-xl font-light text-gray-80 mb-12 max-w-[500px] mx-auto">
          Generate high-converting copy in 30 seconds using proven DTC principles.
          No guessing. No generic AI fluff.
        </p>

        {/* Live Example Carousel */}
        <HeroExample onTryExample={handleTryExample} />

        {/* Stats */}
        <div className="flex items-center justify-center space-x-8 text-sm font-light text-light-60 mb-16">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-light-60"></div>
            <span>10 Laws</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-light-60"></div>
            <span>10 Plays</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-light-60"></div>
            <span>10 Voice Moves</span>
          </div>
        </div>
      </section>

      {/* Generator Section */}
      <section className="max-w-[800px] mx-auto px-8 pb-32">
        <GeneratorForm prefillData={prefillData} />
      </section>

      {/* Principles Section */}
      <section className="py-32 border-t border-light-10">
        <div className="max-w-[664px] mx-auto px-8">
          <h2 className="text-4xl font-light text-light-90 mb-4 text-center">
            Built on Proven Principles
          </h2>
          <p className="text-center text-gray-80 mb-16 font-light">
            Not generic AI. Copy Lab uses specific conversion frameworks.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card text-center">
              <div className="text-2xl mb-3">🎯</div>
              <h4 className="mb-2">Specificity</h4>
              <p className="text-sm text-gray-80">
                "3 seconds" not "fast". Exact numbers convert.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-2xl mb-3">🎭</div>
              <h4 className="mb-2">Identity Projection</h4>
              <p className="text-sm text-gray-80">
                Sell who they become, not what they get.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-2xl mb-3">⚔️</div>
              <h4 className="mb-2">Enemy Naming</h4>
              <p className="text-sm text-gray-80">
                Position against a specific villain.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-2xl mb-3">🛡️</div>
              <h4 className="mb-2">Risk Reversal</h4>
              <p className="text-sm text-gray-80">
                Remove fear by absorbing risk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-light-10 py-16">
        <div className="max-w-[664px] mx-auto px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-light rounded flex items-center justify-center">
              <span className="text-dark font-semibold text-sm">C</span>
            </div>
            <span className="text-lg font-light text-light">Copy Lab</span>
          </div>
          <p className="text-sm text-gray-80">
            Principle-based copywriting powered by Claude AI
          </p>
          <p className="text-xs text-light-60 mt-4">
            Built with 10 Laws • 10 Plays • 10 Voice Moves
          </p>
        </div>
      </footer>
    </main>
  )
}
