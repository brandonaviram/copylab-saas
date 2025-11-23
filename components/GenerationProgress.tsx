'use client'

import { useEffect, useState } from 'react'

interface ProgressStep {
  id: string
  label: string
  description?: string
  status: 'pending' | 'active' | 'complete'
  duration: number // seconds
}

interface Principle {
  law: string
  play: string
  voice: string
}

interface GenerationProgressProps {
  variantCount?: number
  onComplete?: () => void
}

// Educational micro-lessons about principles
const PRINCIPLE_LESSONS = [
  { principle: 'Specificity', lesson: 'Replace vague benefits with exact numbers' },
  { principle: 'Identity Projection', lesson: 'Sell who they become, not what they get' },
  { principle: 'Risk Reversal', lesson: 'Remove purchase fear by absorbing the risk' },
  { principle: 'Enemy Naming', lesson: 'Position against a specific villain or broken system' },
  { principle: 'Transformation Timeline', lesson: 'Map exact progression from current to desired state' },
  { principle: 'Future Precedent', lesson: 'Show them who they\'ll be by showing who already did it' },
  { principle: 'Quiet Part Out Loud', lesson: 'Say what everyone thinks but won\'t admit' },
  { principle: 'Admission Opener', lesson: 'Lead with uncomfortable truth about your category' },
  { principle: 'Preemptive Objection', lesson: 'Address the doubt before they voice it' },
]

// Principle combinations for each variant
const VARIANT_PRINCIPLES: Principle[] = [
  { law: 'specificity', play: 'enemy_naming', voice: 'quiet_part_out_loud' },
  { law: 'identity_projection', play: 'transformation_timeline', voice: 'admission_opener' },
  { law: 'risk_reversal', play: 'future_precedent', voice: 'preemptive_objection' },
]

export function GenerationProgress({ variantCount = 3, onComplete }: GenerationProgressProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [currentLesson, setCurrentLesson] = useState(0)

  // Build progress steps
  const steps: ProgressStep[] = [
    {
      id: 'analyze',
      label: 'Analyzing your product and audience',
      description: 'Understanding context and pain points',
      status: 'pending',
      duration: 2,
    },
    {
      id: 'principles',
      label: 'Selecting optimal conversion principles',
      description: 'Matching principles to your funnel stage',
      status: 'pending',
      duration: 2,
    },
    ...Array.from({ length: variantCount }, (_, i) => {
      const principles = VARIANT_PRINCIPLES[i % VARIANT_PRINCIPLES.length]
      return {
        id: `variant-${i}`,
        label: `Generating Variant ${i + 1}`,
        description: `${formatPrincipleName(principles.law)} + ${formatPrincipleName(principles.play)} + ${formatPrincipleName(principles.voice)}`,
        status: 'pending' as const,
        duration: 8,
      }
    }),
    {
      id: 'finalize',
      label: 'Finalizing your copy variants',
      description: 'Quality check and formatting',
      status: 'pending',
      duration: 2,
    },
  ]

  // Calculate total duration
  const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0)

  // Update step statuses based on current index
  const updatedSteps = steps.map((step, index) => ({
    ...step,
    status:
      index < currentStepIndex
        ? ('complete' as const)
        : index === currentStepIndex
        ? ('active' as const)
        : ('pending' as const),
  }))

  // Progress through steps
  useEffect(() => {
    const stepDuration = steps[currentStepIndex]?.duration * 1000 || 1000

    const stepTimer = setTimeout(() => {
      if (currentStepIndex < steps.length - 1) {
        setCurrentStepIndex(currentStepIndex + 1)
      } else {
        onComplete?.()
      }
    }, stepDuration)

    return () => clearTimeout(stepTimer)
  }, [currentStepIndex, steps.length, onComplete])

  // Update progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prev) => {
        const next = prev + 0.1
        const newProgress = Math.min((next / totalDuration) * 100, 100)
        setProgress(newProgress)
        return next
      })
    }, 100)

    return () => clearInterval(interval)
  }, [totalDuration])

  // Rotate educational lessons
  useEffect(() => {
    const lessonInterval = setInterval(() => {
      setCurrentLesson((prev) => (prev + 1) % PRINCIPLE_LESSONS.length)
    }, 4000)

    return () => clearInterval(lessonInterval)
  }, [])

  const currentStep = updatedSteps[currentStepIndex]
  const estimatedTimeRemaining = Math.max(0, Math.ceil(totalDuration - elapsedTime))

  return (
    <div className="w-full space-y-6">
      {/* Main Progress Card */}
      <div className="card">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-1 bg-light-10 rounded-full overflow-hidden">
            <div
              className="h-full bg-light transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Current Step */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-light flex items-center justify-center animate-pulse">
                <div className="w-2 h-2 rounded-full bg-dark" />
              </div>
              <h3 className="text-lg font-light text-light-90">{currentStep?.label}</h3>
            </div>
            <span className="text-xs text-light-60 font-light">
              {estimatedTimeRemaining}s remaining
            </span>
          </div>
          {currentStep?.description && (
            <p className="text-sm font-light text-gray-80 ml-8">{currentStep.description}</p>
          )}
        </div>

        {/* Step List */}
        <div className="space-y-3">
          {updatedSteps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-start gap-3 transition-opacity duration-300 ${
                step.status === 'pending' ? 'opacity-40' : 'opacity-100'
              }`}
            >
              {/* Status Icon */}
              <div className="flex-shrink-0 mt-0.5">
                {step.status === 'complete' && (
                  <svg
                    className="w-4 h-4 text-light"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
                {step.status === 'active' && (
                  <div className="w-4 h-4 rounded-full border-2 border-light border-t-transparent animate-spin" />
                )}
                {step.status === 'pending' && (
                  <div className="w-4 h-4 rounded-full border border-light-20" />
                )}
              </div>

              {/* Step Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-light text-light-60">{step.label}</p>
                {step.description && step.status === 'active' && (
                  <p className="text-xs font-light text-gray-50 mt-1">{step.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Micro-Lesson */}
      <div className="card bg-light-5 border-light-5">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-light-10 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-light-60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-normal tracking-[1.5px] uppercase text-light-60 mb-2">
              Conversion Principle
            </h4>
            <div className="transition-opacity duration-500">
              <p className="text-sm font-light text-light-90 mb-1">
                {PRINCIPLE_LESSONS[currentLesson].principle}
              </p>
              <p className="text-xs font-light text-gray-80">
                {PRINCIPLE_LESSONS[currentLesson].lesson}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper function to format principle names
function formatPrincipleName(name: string): string {
  return name
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
