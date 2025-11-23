'use server'

import { generateVariations, FunnelStage, type GenerateParams } from '@/lib/copylab'

export async function generateCopy(formData: FormData) {
  const product = formData.get('product') as string
  const audience = formData.get('audience') as string
  const stage = formData.get('stage') as string
  const brandVoice = formData.get('brand_voice') as string
  const objective = formData.get('objective') as string

  if (!product || !audience || !stage) {
    throw new Error('Missing required fields')
  }

  const params: GenerateParams = {
    product,
    audience,
    funnel_stage: stage as FunnelStage,
    brand_voice: brandVoice || undefined,
    objective: objective || undefined,
  }

  try {
    const results = await generateVariations(params, 3) // Generate 3 variants
    return { success: true, data: results }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
