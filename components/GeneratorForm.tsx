'use client'

import { useState, useEffect } from 'react'
import { generateCopy } from '@/app/actions'
import { CopyResult } from '@/components/CopyResult'
import { GenerationProgress } from '@/components/GenerationProgress'
import type { CopyResult as CopyResultType } from '@/lib/copylab'

interface FormData {
  product: string
  audience: string
  stage: string
}

interface GeneratorFormProps {
  prefillData?: FormData
}

export function GeneratorForm({ prefillData }: GeneratorFormProps) {
  const [results, setResults] = useState<CopyResultType[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showProgress, setShowProgress] = useState(false)

  // Pre-fill form when prefillData changes
  useEffect(() => {
    if (prefillData) {
      const productInput = document.getElementById('product') as HTMLInputElement
      const audienceInput = document.getElementById('audience') as HTMLInputElement
      const stageSelect = document.getElementById('stage') as HTMLSelectElement

      if (productInput) productInput.value = prefillData.product
      if (audienceInput) audienceInput.value = prefillData.audience
      if (stageSelect) stageSelect.value = prefillData.stage
    }
  }, [prefillData])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setShowProgress(true)

    const formData = new FormData(e.currentTarget)

    try {
      const response = await generateCopy(formData)

      if (response.success && response.data) {
        setResults(response.data)
      } else {
        setError(response.error || 'Failed to generate copy')
        setShowProgress(false)
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
      setShowProgress(false)
    } finally {
      setLoading(false)
    }
  }

  function handleProgressComplete() {
    setShowProgress(false)
  }

  return (
    <div className="w-full" id="generator-form">
      <form onSubmit={handleSubmit} className="space-y-6 card">
        <div>
          <label htmlFor="product" className="block text-sm font-light text-light-60 mb-2">
            What's your product or service?
          </label>
          <input
            type="text"
            id="product"
            name="product"
            required
            placeholder="AI note-taking app for busy founders"
            className="input-field w-full"
          />
        </div>

        <div>
          <label htmlFor="audience" className="block text-sm font-light text-light-60 mb-2">
            Who's your target audience?
          </label>
          <input
            type="text"
            id="audience"
            name="audience"
            required
            placeholder="Founders who lose ideas between meetings"
            className="input-field w-full"
          />
        </div>

        <div>
          <label htmlFor="stage" className="block text-sm font-light text-light-60 mb-2">
            Marketing funnel stage
          </label>
          <select
            id="stage"
            name="stage"
            required
            className="input-field w-full"
          >
            <option value="awareness">Awareness</option>
            <option value="consideration" defaultChecked>Consideration</option>
            <option value="decision">Decision</option>
            <option value="retention">Retention</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="brand_voice" className="block text-sm font-light text-light-60 mb-2">
              Brand voice (optional)
            </label>
            <input
              type="text"
              id="brand_voice"
              name="brand_voice"
              placeholder="Direct, slightly sassy"
              className="input-field w-full"
            />
          </div>

          <div>
            <label htmlFor="objective" className="block text-sm font-light text-light-60 mb-2">
              What action? (optional)
            </label>
            <input
              type="text"
              id="objective"
              name="objective"
              placeholder="Sign up for free trial"
              className="input-field w-full"
            />
          </div>
        </div>

        {error && (
          <div className="p-4 bg-light-5 border border-light-20 rounded-md text-light-90 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Generating 3 Variants...' : 'Generate Copy Variants'}
        </button>

        <p className="text-xs text-light-60 text-center font-light">
          Generates 3 variations • Different principle combinations
        </p>
      </form>

      {/* Progress Display */}
      {loading && showProgress && (
        <div className="mt-16">
          <GenerationProgress variantCount={3} onComplete={handleProgressComplete} />
        </div>
      )}

      {results.length > 0 && !loading && (
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-light-90 mb-2">Your Copy Variants</h2>
            <p className="text-gray-80 font-light">3 variations with different conversion principles</p>
          </div>

          <div className="space-y-16">
            {results.map((result, index) => (
              <div key={index}>
                <div className="flex items-center justify-center mb-8">
                  <span className="badge">Variant {index + 1}</span>
                </div>
                <CopyResult result={result} variantNumber={index + 1} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
