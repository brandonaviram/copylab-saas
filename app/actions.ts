'use server'

import { generateVariations, FunnelStage, type GenerateParams } from '@/lib/copylab'

export async function generateCopy(formData: FormData) {
  const product = formData.get('product') as string
  const audience = formData.get('audience') as string
  const stage = formData.get('stage') as string
  const brandVoice = formData.get('brand_voice') as string
  const objective = formData.get('objective') as string

  // Validate non-empty
  if (!product?.trim() || !audience?.trim() || !stage) {
    throw new Error('Missing required fields')
  }

  // Validate stage
  const validStages = ['awareness', 'consideration', 'decision', 'retention']
  if (!validStages.includes(stage)) {
    throw new Error('Invalid funnel stage')
  }

  const params: GenerateParams = {
    product: product.trim(),
    audience: audience.trim(),
    funnel_stage: stage as FunnelStage,
    brand_voice: brandVoice?.trim() || undefined,
    objective: objective?.trim() || undefined,
  }

  try {
    const results = await generateVariations(params, 3) // Generate 3 variants

    // Check if partial success (fewer than requested)
    const isPartial = results.length < 3

    return {
      success: true,
      data: results,
      partial: isPartial,
      message: isPartial
        ? `Generated ${results.length} of 3 variants. Some requests failed.`
        : undefined,
    }
  } catch (error: any) {
    // More helpful error messages
    let userMessage = 'Failed to generate copy'

    if (error.message?.includes('authentication')) {
      userMessage = 'API configuration error. Please contact support.'
    } else if (error.message?.includes('Rate limit')) {
      userMessage = 'Too many requests. Please wait 60 seconds and try again.'
    } else if (error.message?.includes('All') && error.message?.includes('failed')) {
      userMessage = 'All variants failed to generate. Please try again.'
    } else if (error.message) {
      userMessage = error.message
    }

    return { success: false, error: userMessage }
  }
}
