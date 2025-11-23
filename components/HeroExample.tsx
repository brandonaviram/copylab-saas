'use client'

import { useState, useEffect } from 'react'

interface Example {
  id: string
  before: string
  after: string
  principles: string[]
  formData: {
    product: string
    audience: string
    stage: string
  }
}

const EXAMPLES: Example[] = [
  {
    id: 'specificity',
    before: 'Fast task management for busy professionals. Get organized quickly with our powerful app.',
    after: 'Clear your inbox in 3 minutes. Task management that actually saves 52 minutes per day for founders juggling 8+ projects.',
    principles: ['Specificity Law', 'Transformation Timeline'],
    formData: {
      product: 'AI task management app',
      audience: 'Founders managing 10+ projects',
      stage: 'awareness'
    }
  },
  {
    id: 'identity',
    before: 'Learn to code and build amazing apps. Join our bootcamp to gain new skills and advance your career.',
    after: 'Stop being the idea person who needs a developer. Become the founder who ships. 143 non-technical founders built their MVP in 9 weeks.',
    principles: ['Identity Projection', 'Proof Velocity'],
    formData: {
      product: 'No-code bootcamp for founders',
      audience: 'Non-technical founders with product ideas',
      stage: 'consideration'
    }
  },
  {
    id: 'enemy',
    before: 'Better email marketing that actually works. Improve your open rates and engagement with our platform.',
    after: 'Mailchimp templates make you look like everyone else. Stand out with emails that feel handwritten. 4.3x higher reply rates without the spam folder.',
    principles: ['Enemy Naming', 'Contrarian Framing'],
    formData: {
      product: 'Personal email automation tool',
      audience: 'Sales teams drowning in automation',
      stage: 'decision'
    }
  },
  {
    id: 'risk',
    before: 'Try our service free for 14 days. Cancel anytime if you\'re not satisfied.',
    after: 'We\'ll write your first 7 emails for you. If you don\'t get 3+ qualified meetings in 28 days, we refund you AND pay you $500 for wasting your time.',
    principles: ['Risk Reversal', 'Absurd Specificity'],
    formData: {
      product: 'B2B cold email service',
      audience: 'Founders who hate cold outreach',
      stage: 'decision'
    }
  }
]

interface HeroExampleProps {
  onTryExample?: (formData: Example['formData']) => void
}

export function HeroExample({ onTryExample }: HeroExampleProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % EXAMPLES.length)
        setIsTransitioning(false)
      }, 300)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const currentExample = EXAMPLES[currentIndex]

  const handleTryExample = () => {
    onTryExample?.(currentExample.formData)
    // Smooth scroll to form
    document.getElementById('generator-form')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <div className="max-w-[664px] mx-auto mb-16">
      <div
        className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
      >
        {/* Example Container */}
        <div className="card space-y-6">
          {/* Before Example */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-light-60 text-xs font-normal uppercase tracking-[1.5px]">
                Generic AI Copy
              </span>
              <span className="text-light-60">❌</span>
            </div>
            <p className="text-sm font-light text-gray-80 leading-relaxed">
              {currentExample.before}
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-light-10"></div>

          {/* After Example */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-light-60 text-xs font-normal uppercase tracking-[1.5px]">
                Copy Lab Output
              </span>
              <span className="text-light-90">✅</span>
            </div>
            <p className="text-sm font-light text-light-90 leading-relaxed">
              {currentExample.after}
            </p>
          </div>

          {/* Principles Used */}
          <div className="flex flex-wrap gap-2 pt-2">
            {currentExample.principles.map((principle) => (
              <span key={principle} className="badge">
                {principle}
              </span>
            ))}
          </div>

          {/* Try Example Button */}
          <button
            onClick={handleTryExample}
            className="w-full bg-light-5 border border-light-20 text-light-90 px-4 py-2.5 rounded-md font-light text-sm hover:bg-light-10 transition-colors"
            aria-label={`Try this example: ${currentExample.formData.product}`}
          >
            Try This Example →
          </button>
        </div>

        {/* Progress Indicators */}
        <div className="flex items-center justify-center space-x-2 mt-6">
          {EXAMPLES.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsTransitioning(true)
                setTimeout(() => {
                  setCurrentIndex(index)
                  setIsTransitioning(false)
                }, 300)
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-light-90 w-6'
                  : 'bg-light-20 hover:bg-light-60'
              }`}
              aria-label={`View example ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
