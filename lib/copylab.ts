/**
 * Copy Lab Core Logic - Ported from CLI
 * Principle-based copywriting system using Claude API
 */

import Anthropic from '@anthropic-ai/sdk'

export enum FunnelStage {
  AWARENESS = 'awareness',
  CONSIDERATION = 'consideration',
  DECISION = 'decision',
  RETENTION = 'retention',
}

export interface CopyResult {
  headline: string
  subhead: string
  body: string
  cta: string
  alt_headline: string
  principles_used: {
    law: string
    play: string
    voice: string
  }
  explanation?: string
}

export interface GenerateParams {
  product: string
  audience: string
  funnel_stage: FunnelStage
  brand_voice?: string
  objective?: string
}

const CLAUDE_SYSTEM_PROMPT = `You are Copy Lab AI, a specialized copywriting system trained on direct response, DTC, and conversion principles.

Your knowledge base includes:
- 10 Laws (timeless persuasion mechanics)
- 10 Plays (repeatable creative angles)
- 10 Voice Moves (tonal techniques)
- 30 Atomic Templates (proven structures)

You generate copy that:
1. Uses specific numbers and timeframes (never rounded)
2. Includes lived details only real users would know
3. Focuses on identity transformation, not features
4. Creates urgency through genuine scarcity or consequence
5. Addresses objections before they form

You NEVER:
- Use corporate jargon or empty superlatives
- Make vague promises without specifics
- Focus on features without identity outcomes
- Generate generic "professional" copy
- Use fake urgency or false scarcity

When generating copy, you follow this process:
1. Analyze context to select appropriate principles
2. Stack 2-3 principles for compound effect
3. Apply voice appropriate to brand and audience
4. Include specific moments, numbers, and outcomes
5. Quality-check against conversion criteria`

const PRINCIPLE_DEFINITIONS = {
  laws: {
    specificity: `
Replace vague benefits with exact moments and numbers.
- Use non-rounded numbers (7 seconds, 23 hours, 91 days - never round to 10, 20, 90)
- Include exact timeframes (Day 3, Week 2, Month 4, 2:14 pm, 9:37 am)
- Describe observable transformation moments
Example: "Day 3: redness fades. Day 7: texture smooths. Day 14: your mother asks what changed."
`,
    identity_projection: `
Sell who they become, not what they get.
- Focus on how others perceive them
- Use identity markers, not features
- Include social validation moments
Example: "Dress like someone whose opinion ends the meeting."
`,
    risk_reversal: `
Remove purchase fear by absorbing the risk.
- Make guarantee process stupid simple
- Extend beyond normal return windows
- Tell them what they keep even if they return
Example: "Use the whole bottle. Still hate it? Text 'refund' to this number."
`,
  },
  plays: {
    enemy_naming: `
Position against a specific villain or broken system.
- Name specific bad practices/ingredients
- Make enemy feel outdated or predatory
- Position buyers as smarter
Example: "Made for people done pretending polyester is a personality."
`,
    transformation_timeline: `
Map exact progression from current to desired state.
- Break into observable checkpoints
- Use before/after moments
- Include social proof moments
Example: "Week 1: Retire the hoodie. Week 3: Someone asks if you hired a stylist."
`,
    future_precedent: `
Show them who they'll be by showing who already did it.
- Use aspirational but attainable examples
- Include unexpected validators
- Make future feel inevitable
Example: "People who started 6 months ago now run it without thinking."
`,
  },
  voice: {
    quiet_part_out_loud: `
Say what everyone thinks but won't admit.
- Voice the unpostable thought
- Make taboo thoughts feel universal
- Stay honest without being cruel
Example: "For when you want to look good but not 'steal your husband' good."
`,
    admission_opener: `
Lead with uncomfortable truth about your category.
- Acknowledge the dirty secret
- Pivot immediately to your difference
- No defensive tone
Example: "Most 'sustainable' brands moved their sweatshops to countries with better PR. We manufacture 12 miles away."
`,
    preemptive_objection: `
Address the doubt before they voice it.
- Name the exact skepticism
- Validate it as reasonable
- Pivot with proof
Example: "Yes, another productivity app. Here's why this one works: it doesn't."
`,
  },
}

function selectPrinciples(funnel_stage: FunnelStage) {
  const principleMap = {
    [FunnelStage.AWARENESS]: {
      law: 'specificity',
      play: 'enemy_naming',
      voice: 'quiet_part_out_loud',
    },
    [FunnelStage.CONSIDERATION]: {
      law: 'identity_projection',
      play: 'transformation_timeline',
      voice: 'admission_opener',
    },
    [FunnelStage.DECISION]: {
      law: 'risk_reversal',
      play: 'enemy_naming',
      voice: 'preemptive_objection',
    },
    [FunnelStage.RETENTION]: {
      law: 'identity_projection',
      play: 'future_precedent',
      voice: 'admission_opener',
    },
  }
  return principleMap[funnel_stage]
}

function getPrincipleDefinition(category: keyof typeof PRINCIPLE_DEFINITIONS, name: string): string {
  const definitions = PRINCIPLE_DEFINITIONS[category] as Record<string, string>
  return definitions[name] || ''
}

function buildPrompt(params: GenerateParams): string {
  const principles = selectPrinciples(params.funnel_stage)
  const brandVoice = params.brand_voice || 'direct, helpful, conversational'
  const objective = params.objective || 'Get them interested'

  return `Generate high-converting copy for this context:

PRODUCT: ${params.product}
AUDIENCE: ${params.audience}
FUNNEL STAGE: ${params.funnel_stage}
BRAND VOICE: ${brandVoice}
OBJECTIVE: ${objective}

APPLY THESE SPECIFIC PRINCIPLES:

1. LAW - ${principles.law.toUpperCase()}
${getPrincipleDefinition('laws', principles.law)}

2. PLAY - ${principles.play.toUpperCase()}
${getPrincipleDefinition('plays', principles.play)}

3. VOICE - ${principles.voice.toUpperCase()}
${getPrincipleDefinition('voice', principles.voice)}

REQUIREMENTS:
- Every benefit must include a specific number or timeframe
- Include at least one "lived detail" (something only a real user would know)
- Reference a specific moment of transformation or relief
- Address the primary objection for this audience
- End with urgency that feels real, not manufactured

GENERATE:

1. PRIMARY HEADLINE (8-12 words)
Apply the LAW principle. Include specific number or timeframe.

2. SUBHEADLINE (15-20 words)
Apply the PLAY principle. Add context or agitation.

3. BODY COPY (3-4 sentences, 40-60 words)
Stack all three principles. Include:
- Specific transformation moment
- Lived detail or physical sensation
- Social proof or identity marker

4. CTA BUTTON (2-5 words)
Apply urgency or micro-commitment.

5. ALTERNATIVE HEADLINE (Testing variant)
Different angle, same principles.

FORMAT OUTPUT AS:
HEADLINE: [text]
SUBHEAD: [text]
BODY: [text]
CTA: [text]
ALT HEADLINE: [text]

Then provide brief explanation of principle application.`
}

function parseResponse(content: any[]): CopyResult {
  let text = ''
  for (const block of content) {
    if (block.type === 'text') {
      text += block.text
    }
  }

  const result: CopyResult = {
    headline: '',
    subhead: '',
    body: '',
    cta: '',
    alt_headline: '',
    principles_used: { law: '', play: '', voice: '' },
    explanation: '',
  }

  const lines = text.split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith('HEADLINE:')) {
      result.headline = trimmed.replace('HEADLINE:', '').trim()
    } else if (trimmed.startsWith('SUBHEAD:')) {
      result.subhead = trimmed.replace('SUBHEAD:', '').trim()
    } else if (trimmed.startsWith('BODY:')) {
      result.body = trimmed.replace('BODY:', '').trim()
    } else if (trimmed.startsWith('CTA:')) {
      result.cta = trimmed.replace('CTA:', '').trim()
    } else if (trimmed.startsWith('ALT HEADLINE:')) {
      result.alt_headline = trimmed.replace('ALT HEADLINE:', '').trim()
    }
  }

  result.explanation = text

  return result
}

export async function generateCopy(params: GenerateParams): Promise<CopyResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable not set')
  }

  const anthropic = new Anthropic({ apiKey })
  const principles = selectPrinciples(params.funnel_stage)
  const prompt = buildPrompt(params)

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1500,
    temperature: 0.7,
    system: CLAUDE_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  })

  const result = parseResponse(message.content)
  result.principles_used = principles

  return result
}

export async function generateVariations(params: GenerateParams, count: number = 3): Promise<CopyResult[]> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable not set')
  }

  const anthropic = new Anthropic({ apiKey })

  // Define different principle combinations for variations
  const principleSets = [
    // Variant 1: Default for funnel stage
    selectPrinciples(params.funnel_stage),

    // Variant 2: Specificity + Enemy Naming + Quiet Part Out Loud
    { law: 'specificity', play: 'enemy_naming', voice: 'quiet_part_out_loud' },

    // Variant 3: Identity Projection + Transformation Timeline + Admission Opener
    { law: 'identity_projection', play: 'transformation_timeline', voice: 'admission_opener' },

    // Variant 4: Risk Reversal + Future Precedent + Preemptive Objection
    { law: 'risk_reversal', play: 'future_precedent', voice: 'preemptive_objection' },

    // Variant 5: Identity + Enemy Naming + Preemptive
    { law: 'identity_projection', play: 'enemy_naming', voice: 'preemptive_objection' },
  ]

  const results: CopyResult[] = []

  for (let i = 0; i < Math.min(count, principleSets.length); i++) {
    const principles = principleSets[i]

    // Build custom prompt with specific principles
    const customPrompt = buildCustomPrompt(params, principles)

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      temperature: 0.7 + (i * 0.1), // Slight temperature variation for diversity
      system: CLAUDE_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: customPrompt }],
    })

    const result = parseResponse(message.content)
    result.principles_used = principles
    results.push(result)
  }

  return results
}

function buildCustomPrompt(params: GenerateParams, principles: { law: string; play: string; voice: string }): string {
  const brandVoice = params.brand_voice || 'direct, helpful, conversational'
  const objective = params.objective || 'Get them interested'

  return `Generate high-converting copy for this context:

PRODUCT: ${params.product}
AUDIENCE: ${params.audience}
FUNNEL STAGE: ${params.funnel_stage}
BRAND VOICE: ${brandVoice}
OBJECTIVE: ${objective}

APPLY THESE SPECIFIC PRINCIPLES:

1. LAW - ${principles.law.toUpperCase()}
${getPrincipleDefinition('laws', principles.law)}

2. PLAY - ${principles.play.toUpperCase()}
${getPrincipleDefinition('plays', principles.play)}

3. VOICE - ${principles.voice.toUpperCase()}
${getPrincipleDefinition('voice', principles.voice)}

REQUIREMENTS:
- Every benefit must include a specific number or timeframe
- Include at least one "lived detail" (something only a real user would know)
- Reference a specific moment of transformation or relief
- Address the primary objection for this audience
- End with urgency that feels real, not manufactured

GENERATE:

1. PRIMARY HEADLINE (8-12 words)
Apply the LAW principle. Include specific number or timeframe.

2. SUBHEADLINE (15-20 words)
Apply the PLAY principle. Add context or agitation.

3. BODY COPY (3-4 sentences, 40-60 words)
Stack all three principles. Include:
- Specific transformation moment
- Lived detail or physical sensation
- Social proof or identity marker

4. CTA BUTTON (2-5 words)
Apply urgency or micro-commitment.

5. ALTERNATIVE HEADLINE (Testing variant)
Different angle, same principles.

FORMAT OUTPUT AS:
HEADLINE: [text]
SUBHEAD: [text]
BODY: [text]
CTA: [text]
ALT HEADLINE: [text]

Then provide brief explanation of principle application.`
}
