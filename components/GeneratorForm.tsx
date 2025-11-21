'use client'

import { useState } from 'react'
import { generateCopy } from '@/app/actions'
import { CopyResult } from '@/components/CopyResult'
import type { CopyResult as CopyResultType } from '@/lib/copylab'

export function GeneratorForm() {
  const [result, setResult] = useState<CopyResultType | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      const response = await generateCopy(formData)

      if (response.success && response.data) {
        setResult(response.data)
      } else {
        setError(response.error || 'Failed to generate copy')
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
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
          {loading ? 'Generating...' : 'Generate Copy'}
        </button>

        <p className="text-xs text-light-60 text-center font-light">
          Uses 10 Laws • 10 Plays • 10 Voice Moves
        </p>
      </form>

      {result && (
        <div className="mt-16">
          <CopyResult result={result} />
        </div>
      )}
    </div>
  )
}
