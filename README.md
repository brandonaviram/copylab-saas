# Copy Lab SaaS

**Copy That Actually Converts**

Generate high-converting copy in 30 seconds using proven DTC principles. Built with Next.js 14, TypeScript, and Claude AI.

## Features

- 🎯 Principle-based copy generation (10 Laws, 10 Plays, 10 Voice Moves)
- ⚡ 30-second generation time
- 🚀 Multiple variants for A/B testing
- 📋 Copy to clipboard functionality
- 🎨 Clean, modern UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+
- Anthropic API key

### Installation

1. Clone and navigate to the project:
```bash
cd projects/copylab-saas
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Add your Anthropic API key to `.env`:
```
ANTHROPIC_API_KEY=your_api_key_here
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Build for Production

```bash
npm run build
npm start
```

## How It Works

1. **Input** - User describes product, audience, and funnel stage
2. **Generate** - Claude AI applies conversion principles
3. **Output** - Get headline, subhead, body, CTA, and alternative headline

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Anthropic Claude Sonnet 4
- **Deployment**: Ready for Vercel

## Core Principles

Copy Lab uses 30+ proven conversion principles:

- **Laws**: Specificity, Identity Projection, Risk Reversal
- **Plays**: Enemy Naming, Transformation Timeline, Future Precedent
- **Voice Moves**: Quiet Part Out Loud, Admission Opener, Preemptive Objection

## Project Structure

```
copylab-saas/
├── app/
│   ├── actions.ts          # Server actions
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/
│   ├── GeneratorForm.tsx   # Main form component
│   └── CopyResult.tsx      # Results display
├── lib/
│   └── copylab.ts          # Core logic (ported from CLI)
└── public/
```

## Roadmap

### MVP (Current)
- [x] Core copy generation
- [x] Results display with copy buttons
- [x] Principle badges
- [ ] Deploy to Vercel

### v0.2 (Next)
- [ ] Supabase authentication
- [ ] Save copies to database
- [ ] Project folders
- [ ] Stripe integration ($29/mo Pro plan)

### v0.3 (Future)
- [ ] Copy scoring
- [ ] Template library
- [ ] Export to formats (HTML, Figma)
- [ ] Chrome extension

## License

MIT

## Credits

Based on Copy Lab CLI - Principle-based copywriting system by Brandon Aviram.
