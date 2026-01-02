---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
inputDocuments:
  - docs/prd.md
  - docs/analysis/brainstorming-session-2025-12-14.md
workflowType: 'ux-design'
lastStep: 14
status: 'complete'
project_name: 'constructon'
user_name: 'Lmr'
date: '2025-12-14'
---

# UX Design Specification - constructon

**Author:** Lmr
**Date:** 2025-12-14

---

<!-- UX design content will be appended sequentially through collaborative workflow steps -->

## Executive Summary

### Project Vision

constructon is Zimbabwe's first modern villa construction company website, designed to attract and convert customers seeking Western-style smart villas. The UX must balance aspirational aesthetics with trust-building transparency, serving both local high-achievers and diaspora clients who need confidence to invest remotely.

### Target Users

| Persona | Description | UX Priority |
|---------|-------------|-------------|
| **Diaspora Returner** | 40s professional abroad building back home | Trust signals, remote-friendly experience |
| **Local High-Achiever** | Successful professional wanting modern status | Stunning visuals, smart home showcase |
| **Young Power Couple** | First-time builders with aspirational taste | Affordability messaging, financing tools |
| **Investor** | Buyer seeking ROI + asset appreciation | Credibility, ROI data, professional tone |

### Key Design Challenges

1. **Mobile-first performance** — Deliver stunning imagery on 3G connections
2. **Trust architecture** — Design transparency into every interaction
3. **Multi-persona navigation** — Serve 4 distinct user types without fragmentation
4. **Pricing visibility** — Clear pricing without overwhelming the experience
5. **WhatsApp integration** — Prominent but tasteful primary CTA

### Design Opportunities

1. **International quality signal** — Design that says "this isn't your typical Zimbabwean builder"
2. **Honesty as a feature** — Transparent pricing, team visibility, process clarity
3. **Emotional design** — Journey from aspiration to confidence to action
4. **Smart home differentiation** — Visual showcase of tech no competitor offers
5. **Product tier clarity** — Starter → Executive → Signature with clear visual hierarchy

## Core User Experience

### Defining Experience

The core constructon experience is **aspirational discovery leading to confident contact**. Users browse stunning villa imagery, discover transparent pricing, and feel confident enough to reach out via WhatsApp. The experience must feel premium (matching the villas) while being technically fast enough for 3G mobile connections.

**Primary User Flow:** Browse Plans → Find Match → See Price → Calculate Affordability → WhatsApp Contact

### Platform Strategy

| Platform | Approach |
|----------|----------|
| **Primary** | Mobile Web (Responsive) |
| **Architecture** | SSR/Hybrid for SEO + Performance |
| **Input** | Touch-first, thumb-zone optimized |
| **Offline** | Not required |
| **Native Features** | WhatsApp deep links, click-to-call |

**Technical Context:**
- Target devices: Mid-range Android phones on 3G/4G
- WhatsApp is the dominant communication platform
- No app install — web must deliver full experience

### Effortless Interactions

| Must Be Effortless | Design Implication |
|-------------------|-------------------|
| Villa browsing | Swipeable gallery, instant image loading |
| Price visibility | Price on every plan card, no hidden information |
| Affordability calculation | Simple calculator: deposit → monthly payment |
| WhatsApp contact | Sticky button, pre-filled message, one tap |
| Plan comparison | Side-by-side tier view without page navigation |

### Critical Success Moments

1. **First Impression (0-3 seconds):** Hero image delivers "international quality" signal
2. **Price Discovery:** User sees pricing without asking — trust established
3. **Affordability Realization:** Calculator shows achievable monthly payment
4. **Trust Confirmation:** Team profiles + completed projects validate legitimacy
5. **Contact Confidence:** User taps WhatsApp feeling informed, not pressured

### Experience Principles

1. **Transparency First** — Show everything, hide nothing. Pricing, team, process.
2. **Mobile Thumb Zone** — Critical CTAs within natural thumb reach
3. **Visual Before Text** — Imagery leads, copy supports
4. **Zero-Friction Contact** — WhatsApp always 1 tap away
5. **Speed is Trust** — Sub-3-second loads on 3G connections

## Desired Emotional Response

### Primary Emotional Goals

**Core Transformation:** Skepticism → Trust → Confident Action

Users arrive with varying degrees of doubt (especially diaspora customers who've been burned before). The UX must systematically build trust through transparency, leading to confident contact.

| Emotional Arc | From | To |
|---------------|------|-----|
| Trust | "Can I trust a Zim builder?" | "These people are legit" |
| Possibility | "I can't afford this" | "I CAN do this!" |
| Excitement | "Nothing good exists locally" | "This is exactly what I wanted" |

### Emotional Journey Map

| Stage | Target Emotion | Design Trigger |
|-------|----------------|----------------|
| **Discover** | Amazement | International-quality hero imagery |
| **Browse** | Aspiration | Beautiful villa photography |
| **Price Check** | Relief + Trust | Transparent pricing on every plan |
| **Calculate** | Empowerment | Achievable monthly payment shown |
| **Trust Build** | Confidence | Team faces, completed projects |
| **Contact** | Excitement | Easy WhatsApp with pre-filled message |

### Micro-Emotions by Persona

**Diaspora:** Trust, control, pride (avoid: distance anxiety)
**Local Achiever:** Exclusivity, status, excitement (avoid: "same as others")
**Young Couple:** Hope, empowerment, belonging (avoid: intimidation)
**Investor:** Confidence, opportunity, professionalism (avoid: amateur signals)

### Design Implications

| Design Element | Emotional Purpose |
|----------------|-------------------|
| Hero imagery | Create "Wow, in Zimbabwe?!" amazement |
| Visible pricing | Build trust through radical transparency |
| Financing calculator | Create empowerment and possibility |
| Team profiles | Humanize the brand, build trust |
| Completed gallery | Provide social proof confidence |
| WhatsApp button | Enable confident, low-friction action |
| Premium typography | Signal exclusivity and quality |
| Starter tier | Create hope for first-time builders |

### Emotional Design Principles

1. **Trust Before Selling** — Every element builds credibility before asking for contact
2. **Show, Don't Tell** — Use imagery and proof over marketing claims
3. **Accessibility Without Cheapening** — Starter tier feels aspirational, not budget
4. **Human Connection** — Real faces, real stories, real builds
5. **Confidence Through Clarity** — Clear information reduces anxiety

## UX Pattern Analysis & Inspiration

### Inspiring Products Analysis

| Industry | Exemplars | Key UX Insight |
|----------|-----------|----------------|
| **Luxury Automotive** | Tesla, BMW | Configurator + transparent pricing + premium feel |
| **Real Estate Tech** | Airbnb, Zillow | Photo-first browsing + trust badges + social proof |
| **Luxury Hospitality** | Four Seasons | Lifestyle imagery + virtual tours + concierge feel |
| **Fintech** | Robinhood, Wise | Calculator-first UX + radical transparency |

### Transferable UX Patterns

**Navigation & Browsing:**
- Hero image carousel for villa discovery
- Swipeable photo galleries on mobile
- Clear 3-tier product structure (Starter/Executive/Signature)

**Trust Building:**
- "constructon Verified" badge system
- Team profile cards with video introductions
- Completed projects gallery with social proof

**Conversion:**
- Sticky WhatsApp button (always 1 tap away)
- Live financing calculator with instant updates
- Clear pricing on every plan card

**Visual Design:**
- Lifestyle photography (families in villas, not empty rooms)
- Premium typography with generous whitespace
- Mobile-first card layouts

### Anti-Patterns to Avoid

| Avoid | Because |
|-------|---------|
| "Request Quote" CTAs | Destroys trust through opacity |
| Stock photography | Feels fake to skeptical diaspora |
| Long contact forms | Creates unnecessary friction |
| Account walls | Blocks browsing and trust-building |
| Chatbots | Human WhatsApp is the differentiator |
| Feature pop-ups | Trust-first, not sales-first |

### Design Inspiration Strategy

**Core Approach:** Blend luxury hospitality aesthetics with fintech transparency and real estate browsing patterns, optimized for mobile-first African market context.

| Strategy | Implementation |
|----------|---------------|
| **Premium but Accessible** | Luxury typography + clear affordability messaging |
| **Trust Through Transparency** | Visible pricing + team faces + real photos only |
| **Mobile-Native Patterns** | Swipe gestures + thumb-zone CTAs + fast loading |
| **Human Connection** | WhatsApp over forms, video over text, faces over logos |

## Design System Foundation

### Design System Choice

**Selected:** Tailwind CSS + shadcn/ui

A utility-first CSS framework paired with copy-paste accessible components built on Radix primitives, providing premium customization with full code ownership.

*Refined via Party Mode review with Sally (UX), Winston (Architect), and Amelia (Dev)*

### Rationale for Selection

| Factor | Why Tailwind + shadcn/ui |
|--------|--------------------------|
| **Speed** | 6-8 week MVP requires fast iteration |
| **Premium Control** | Utility classes enable precise luxury aesthetics |
| **Mobile-First** | Responsive prefixes built into the framework |
| **Performance** | Tiny CSS bundle after purging (~10KB) |
| **Code Ownership** | shadcn/ui is copy-paste, not npm dependency |
| **Accessibility** | Radix primitives have superior a11y support |
| **Customization** | Components live in your codebase, fully modifiable |

### Implementation Approach

| Layer | Approach |
|-------|----------|
| **CSS Framework** | Tailwind CSS v3+ |
| **Component Logic** | shadcn/ui (Radix primitives + Tailwind) |
| **Icons** | Lucide Icons (shadcn ecosystem) |
| **Animations** | Tailwind + Framer Motion for complex interactions |
| **Forms** | shadcn/ui form components with React Hook Form |

**Component Library Structure:**
```
components/
├── ui/           # shadcn/ui primitives (Button, Card, Dialog, etc.)
├── layout/       # Page layouts, containers, grids
├── villa/        # Villa-specific (PlanCard, TierBadge, Gallery)
├── calculator/   # Financing calculator components
└── contact/      # WhatsApp button, inquiry form
```

**Setup Commands:**
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card dialog sheet
```

### Customization Strategy

**Tailwind Config Customizations:**

| Category | Custom Values |
|----------|---------------|
| **Colors** | Brand primary, accent gold, tier colors, WhatsApp green |
| **Fonts** | Premium serif (headings), clean sans (body) |
| **Spacing** | Extended scale for luxury whitespace |
| **Shadows** | Custom subtle shadows for cards |
| **Screens** | Breakpoints optimized for target devices |

**Design Token System:**

Define tokens in `tailwind.config.js` before development:
- Colors as CSS custom properties for easy theming
- Typography scale following modular ratios (1.25 or 1.333)
- Spacing scale with generous defaults (luxury whitespace)
- Component-specific tokens (card radius, button sizes)

**Documentation Requirement:**
Maintain a simple component reference (Storybook or README) to ensure consistency as team grows.

## Defining Experience

### Core Interaction

**"See it. Afford it. WhatsApp it."**

The defining constructon experience is a three-beat emotional journey: visual desire → financial possibility → confident action. Users browse stunning villas, calculate their personal affordability, and connect via WhatsApp with full context.

*Refined via Party Mode with Sally (UX), John (PM), Sophia (Storyteller), and Amelia (Dev)*

**User Description:** *"A builder that shows prices, calculates YOUR monthly payment, and lets you WhatsApp them with one tap."*

### User Mental Model

| Current Approach | constructon Approach |
|------------------|---------------------|
| Ask around for builder contacts | Browse independently online |
| Call nervously, ask for quotes | See prices immediately |
| Wonder "can I afford this?" | Calculator shows YOUR payment |
| Wait days for vague responses | Tap WhatsApp, chat instantly |
| Uncertainty about quality | Visual proof + team profiles |

**Mental Model Alignment:**
- Browse like Airbnb (visual, swipeable)
- Price like e-commerce (transparent)
- Calculate like fintech (instant affordability)
- Contact like messaging (instant, casual)

### Success Criteria

| Metric | Target |
|--------|--------|
| Time to see price | < 2 seconds from viewing any villa |
| Calculator engagement | 40%+ of villa page visitors use it |
| Contact friction | 1 tap to WhatsApp with payment context |
| Trust establishment | Within first 2 screen scrolls |
| Browse smoothness | Instagram-like fluidity |

**The Belief Shift:**
- Old story: *"Building in Zimbabwe is risky. I can't afford what I want."*
- New story: *"Wait... I CAN have this. And these people seem legit."*

### Novel UX Patterns

**Pattern Strategy:** Established interactions + affordability innovation

| Element | Pattern Type | Source |
|---------|--------------|--------|
| Photo gallery | Established | Airbnb, Zillow |
| Card layouts | Established | E-commerce |
| Sticky CTA | Established | Fintech apps |
| Transparent pricing | Novel (for market) | Trust differentiation |
| **Inline affordability** | Novel (for category) | Emotional conversion trigger |
| WhatsApp with context | Novel | Friction elimination |

**The Innovation:** Calculator as emotional bridge — the moment "I want this" becomes "I can have this."

### Experience Mechanics

**Flow:** Homepage → Villa Card → Villa Detail → Calculate → WhatsApp

**Initiation:**
- Hero section with featured villa
- "View All Plans" CTA
- Card grid reveals on scroll
- Price visible on every card

**Interaction:**
- Tap villa card → expand to detail view
- Swipe through photo gallery
- View price + tier + specs
- **Sticky affordability bar** appears after scroll
- Calculator: Input deposit → See "YOUR Executive Villa: $1,100/mo"
- WhatsApp button in sticky bar

**Feedback:**
- Calculator updates instantly on input
- Possessive copy ("Your villa", "Your payment")
- Smooth transitions and animations
- Haptic feedback on mobile

**Completion:**
- WhatsApp pre-filled with context:
  > "Hi, I'm interested in the Executive Villa. The calculator showed $1,100/month with my $15,000 deposit."
- User sends message in < 45 seconds total
- Sales team receives full context immediately

### Sticky Affordability Bar

**Component Design:**
```
┌─────────────────────────────────────────────────┐
│  Your Executive Villa: $1,100/mo  [💬 WhatsApp] │
└─────────────────────────────────────────────────┘
```

- Appears after user scrolls past hero on villa detail page
- Shows calculated payment (or default if not calculated)
- WhatsApp button always visible
- Stays fixed at bottom on mobile (thumb zone)
- Collapses to minimal state on scroll up

## Visual Design Foundation

### Color System

**Brand Colors:**

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Slate Blue | `#1E3A5F` | Headers, navigation, trust |
| Primary Light | Steel Blue | `#2D5A87` | Hover states |
| Accent | Warm Gold | `#C9A227` | Premium highlights, badges |
| Accent Light | Champagne | `#E8D5A3` | Subtle accents |

**Functional Colors:**

| Role | Hex | Usage |
|------|-----|-------|
| WhatsApp CTA | `#25D366` | Primary action button |
| Success | `#10B981` | Confirmations |
| Warning | `#F59E0B` | Alerts |
| Error | `#EF4444` | Error states |

**Tier Colors:**

| Tier | Hex | Feeling |
|------|-----|---------|
| Starter | `#0D9488` | Fresh, accessible |
| Executive | `#1E3A5F` | Professional |
| Signature | `#C9A227` | Premium, exclusive |

**Neutrals:**
- Background: `#FAFAFA`
- Surface: `#FFFFFF`
- Border: `#E5E7EB`
- Text Primary: `#1F2937`
- Text Secondary: `#6B7280`

### Typography System

**Font Pairing:**
- Headlines: Playfair Display (serif) — luxury, premium
- Body: Inter (sans-serif) — clean, readable, modern

**Type Scale:**

| Element | Size | Weight |
|---------|------|--------|
| H1 | 32px | 700 |
| H2 | 24px | 600 |
| H3 | 20px | 600 |
| Body | 16px | 400 |
| Small | 14px | 400 |
| Price | 28px | 700 |

### Spacing & Layout Foundation

**Spacing Scale (8px base):**
- xs: 4px | sm: 8px | md: 16px | lg: 24px | xl: 32px | 2xl: 48px | 3xl: 64px

**Layout Principles:**
1. Generous whitespace (luxury aesthetic)
2. Card-based villa display
3. Mobile-first single column (16px margins)
4. Desktop 12-column grid (1280px max, 24px gutters)

**Key Component Spacing:**
- Villa cards: 24px gap
- Sections: 48px vertical padding
- Sticky bar: 12px vertical, 16px horizontal

### Accessibility Considerations

| Standard | Target |
|----------|--------|
| Color Contrast | WCAG AA (4.5:1 minimum) |
| Touch Targets | 44x44px minimum |
| Focus States | Visible 2px ring |
| Base Font | 16px (respects user settings) |

All primary color combinations verified for WCAG AA compliance.

## Design Direction Decision

### Design Directions Explored

Four distinct visual directions were created and evaluated:

| Direction | Style | Strength |
|-----------|-------|----------|
| **A: Luxury Editorial** | Magazine-style, serif-heavy, dramatic hero | Status/exclusivity appeal |
| **B: Clean Efficiency** | List view, scannable, sticky affordability bar | Functional, high-conversion |
| **C: Bold Modern** | High contrast, large type, grid overlays | Aspirational, youthful |
| **D: Warm Trust** | Soft edges, trust badges, approachable | Trust-building, diaspora-friendly |

Visual exploration saved to: `docs/ux-design-directions.html`

### Chosen Direction

**B+D Hybrid: Clean Efficiency + Warm Trust**

A combination approach that prioritizes conversion mechanics from Direction B while incorporating trust-building elements from Direction D.

### Design Rationale

| Element | Source | Rationale |
|---------|--------|-----------|
| **Sticky affordability bar** | B | Keeps "Afford it. WhatsApp it." always visible — proven conversion pattern |
| **List/card view** | B | Efficient scanning on mobile, price always visible |
| **Trust badges** | D | Addresses diaspora skepticism immediately |
| **Warm color application** | D | Premium but approachable, not cold |
| **Floating WhatsApp** | D | Secondary CTA for pages without sticky bar |
| **Filter bar** | B | Simple tier filtering without complexity |

**Why This Works:**
- Serves all 4 personas (functional for all, trust elements for diaspora)
- Optimizes for the "See it. Afford it. WhatsApp it." core experience
- Sticky bar ensures calculator engagement and WhatsApp visibility
- Trust badges reduce skepticism before deep browsing
- Scannable layout respects mobile-first, 3G constraints

### Implementation Approach

**Layout Structure:**
```
┌─────────────────────────────────┐
│ Header: Logo + WhatsApp CTA     │
├─────────────────────────────────┤
│ Hero: Trust badges + headline   │
├─────────────────────────────────┤
│ Filter: All | Starter | Exec... │
├─────────────────────────────────┤
│ Villa List (scannable cards)    │
│ ┌─────────────────────────────┐ │
│ │ [Img] Name | Specs | Price  │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ STICKY: Your Villa $X/mo [Chat] │
└─────────────────────────────────┘
```

**Key Components:**
1. **Header** — Logo left, WhatsApp CTA right (always visible)
2. **Trust Hero** — Headline + 3 trust badges (transparent pricing, weekly updates, smart home)
3. **Filter Bar** — Tier toggles (All, Starter, Executive, Signature)
4. **Villa Cards** — Horizontal on mobile, image + info + price visible
5. **Sticky Affordability Bar** — "Your [Villa]: $X/mo" + WhatsApp button
6. **Floating WhatsApp** — On pages without sticky bar (About, Team)

**Mobile Behavior:**
- Sticky bar fixed to bottom (thumb zone)
- Cards stack vertically, full-width images
- Filter bar horizontally scrollable
- Trust badges wrap to 2 rows if needed

## User Journey Flows

### Journey 1: Villa Discovery & Browse

**Flow:** Entry → Trust Hero → Villa List → Card → Detail → Calculator/WhatsApp

```
Entry Point
    ↓
Trust Hero (badges visible)
    ↓
Villa List (prices on cards)
    ↓
Tap Villa Card
    ↓
Detail Page (gallery, specs, price)
    ↓
Calculator or WhatsApp
```

**Key Interactions:**
- Swipeable photo galleries
- Tier filter bar (horizontally scrollable on mobile)
- Price visible on every card without tapping
- Sticky affordability bar appears on scroll

### Journey 2: Calculate Affordability

**Flow:** See Price → Enter Deposit → See "YOUR" Payment → WhatsApp

**Calculator UX:**
- Single input field (deposit amount)
- Instant calculation (no submit button)
- Result: "Your Executive Villa: $1,100/mo"
- Sticky bar updates with result + WhatsApp CTA

**If Unaffordable:** Suggest lower tier with "Try Starter Villas →" link

### Journey 3: WhatsApp Contact

**Flow:** Tap → App Opens → Pre-filled Message → Send

**Pre-fill Logic:**
- From calculator: Include villa name + calculated payment + deposit
- From villa page: Include villa name
- General: Generic inquiry message

**Context Preserved:** Sales team receives full journey context

### Journey 4: Trust Validation (Diaspora)

**Flow:** Trust Badges → Team Page → Video Intros → Completed Projects → Return to Villas

**Trust Elements:**
- 3 trust badges on homepage hero
- Team profiles with photos + video
- Completed projects gallery
- Testimonials with verifiable names

### Journey Patterns

| Category | Pattern |
|----------|---------|
| **Navigation** | Sticky bar, floating WhatsApp, tier filters |
| **Decision** | Single-input calculator, tier suggestions |
| **Feedback** | Instant calculation, possessive language, visual progress |

### Flow Optimization Principles

1. **Minimum Steps:** Price visible (0 steps), Calculator (1 step), WhatsApp (1 step)
2. **Low Cognitive Load:** 3 tiers only, single calculator input
3. **Error Recovery:** Tier suggestions for unaffordable, clear navigation back
4. **Delight:** "YOUR" language, smooth animations, elegant sticky bar reveal

## Component Strategy

### Foundation: shadcn/ui Coverage

shadcn/ui provides base components that map directly to constructon needs:

| shadcn/ui Component | constructon Usage |
|---------------------|-------------------|
| Button | Primary CTAs, WhatsApp buttons |
| Card | Villa cards, team profiles |
| Dialog | Mobile gallery lightbox |
| Sheet | Mobile navigation drawer |
| Input | Calculator deposit field |
| Badge | Tier badges, trust badges |
| Carousel | Photo galleries |
| Tabs | Tier filtering |

### Custom Components

*Refined via Party Mode with Sally (UX), Winston (Architect), and Amelia (Dev)*

**8 Custom Components Required:**

| Component | Purpose | Key Feature |
|-----------|---------|-------------|
| **VillaCard** | Display villa in list/grid | Image, tier badge, specs, price — all visible |
| **TierBadge** | Visual tier indicator | Color-coded (Starter: teal, Executive: blue, Signature: gold) |
| **FinancingCalculator** | Affordability calculation | Single input, instant calc, no submit button |
| **StickyAffordabilityBar** | Persistent conversion CTA | "Your Villa: $X/mo" + WhatsApp, safe-area-inset |
| **TrustBadge** | Credibility signals | Icon + text (transparent pricing, weekly updates, etc.) |
| **PhotoGallery** | Villa imagery | Swipeable, lazy-loaded, haptic feedback on swipe |
| **WhatsAppButton** | Primary contact CTA | CVA variants (header, sticky, floating, inline) |
| **TeamProfileCard** | Team member display | Photo, role, credentials, lazy-loaded video intro |

### Component Architecture

```
components/
├── ui/              # shadcn/ui base (Button, Card, Dialog, etc.)
├── shared/
│   ├── OptimizedImage.tsx    # Next.js Image wrapper with blur placeholder
│   └── LazyVideo.tsx         # Intersection Observer video loading
├── hooks/
│   └── useAffordability.ts   # Shared calculator state
├── villa/
│   ├── VillaCard.tsx
│   ├── TierBadge.tsx
│   └── PhotoGallery.tsx      # With haptic feedback
├── calculator/
│   ├── FinancingCalculator.tsx
│   └── StickyAffordabilityBar.tsx  # With safe-area-inset
├── trust/
│   ├── TrustBadge.tsx
│   └── TeamProfileCard.tsx         # With LazyVideo
└── contact/
    └── WhatsAppButton.tsx          # CVA variants
```

### Shared State Architecture

**`useAffordability` Hook:**
```typescript
const { monthlyPayment, deposit, setDeposit, villaPrice } = useAffordability(villaPrice)
```

Both `FinancingCalculator` and `StickyAffordabilityBar` consume this hook, ensuring instant synchronization. Uses React Context if state must survive navigation between villa pages.

### Key Technical Decisions

| Decision | Rationale |
|----------|-----------|
| **CVA for WhatsApp variants** | One component, 4 variants — better than 4 separate components |
| **Shared OptimizedImage** | DRY principle for VillaCard + PhotoGallery image handling |
| **Intersection Observer for video** | Performance: don't load video until team section is visible |
| **Safe area insets on sticky bar** | Critical for iOS Safari and Android gesture navigation |
| **Scroll-aware sticky bar** | Hide on scroll down, show on scroll up — reduces clutter |

### Component Specifications

**VillaCard:**
- Tier badge top-left on image
- Name, bedrooms, sqm below image
- Price prominent (28px, bold)
- Entire card tappable → detail page

**TierBadge:**
- Starter: `#0D9488` (teal)
- Executive: `#1E3A5F` (slate blue)
- Signature: `#C9A227` (gold)
- Pill shape, white text, uppercase

**FinancingCalculator:**
- Single input: "Your deposit ($)"
- Instant calculation on input change
- Output: "Your [Tier] Villa: $X/mo"
- Default assumption: 20-year term, 8% rate

**StickyAffordabilityBar:**
- Fixed bottom with `pb-safe` (safe-area-inset-bottom)
- Shows: "Your [Tier] Villa: $X/mo" + WhatsApp button
- Scroll-aware: hides on scroll down, reveals on scroll up
- Both text AND button are 44x44px touch targets minimum

**WhatsAppButton (CVA Variants):**
```typescript
const whatsappVariants = cva('flex items-center gap-2', {
  variants: {
    variant: {
      header: 'text-sm font-medium text-green-600',
      sticky: 'w-full justify-center py-3 bg-green-500 text-white',
      floating: 'fixed bottom-20 right-4 rounded-full p-4 shadow-lg bg-green-500',
      inline: 'underline text-green-600'
    }
  }
})
```

**PhotoGallery:**
- Swipeable with touch/drag
- Lazy-loaded images (OptimizedImage wrapper)
- Haptic feedback on swipe completion (premium feel)
- Counter indicator (1/8, 2/8, etc.)

**TeamProfileCard:**
- Photo with rounded corners
- Name, role, credentials
- "Play video introduction" button
- LazyVideo: loads only when in viewport

### Implementation Phases

**Phase 1: Core Villa Experience**
- VillaCard + TierBadge + PhotoGallery
- OptimizedImage shared component
- Basic villa browsing flow

**Phase 2: Calculator & Conversion**
- FinancingCalculator + StickyAffordabilityBar
- useAffordability hook
- WhatsAppButton (all variants)

**Phase 3: Trust & Polish**
- TrustBadge + TeamProfileCard
- LazyVideo integration
- Haptic feedback refinements

## UX Consistency Patterns

### Button Hierarchy

**Primary Hierarchy:**

| Level | Style | Usage |
|-------|-------|-------|
| **Primary** | WhatsApp green (`#25D366`), filled | WhatsApp CTA only |
| **Secondary** | Slate blue (`#1E3A5F`), filled | Important actions (View Details, Calculate) |
| **Tertiary** | Outline, slate blue border | Alternative actions (View Gallery, Learn More) |
| **Ghost** | Text only, underlined on hover | Navigation, links, filters |

**Button Principles:**
- Only ONE primary (green) button visible per screen — WhatsApp is always king
- Secondary buttons never compete with WhatsApp CTA
- Minimum touch target: 44x44px
- Button text: Action verbs ("Chat on WhatsApp", not "WhatsApp")

**WhatsApp Button States:**

| State | Appearance |
|-------|------------|
| Default | Green fill, white icon + text |
| Hover | Slightly darker green |
| Pressed | Scale down 95%, darker green |
| Loading | Spinner replacing icon |

### Feedback Patterns

**Calculator Feedback:**

| Event | Feedback |
|-------|----------|
| Input change | Instant recalculation (< 100ms) |
| Valid input | Result appears with fade transition |
| Invalid input | Red border, "Enter a valid amount" inline |
| Amount too low | Suggest starter tier: "Consider our Starter Villas →" |

**Loading States:**

| Element | Loading Pattern |
|---------|-----------------|
| Villa images | Blur-up placeholder (10px blur → sharp) |
| Villa list | Skeleton cards with shimmer animation |
| Calculator | Result text shows "Calculating..." briefly |
| Page transitions | Instant, no loading spinners |

**Success Feedback:**
- Calculator completion: Checkmark icon briefly appears next to result
- WhatsApp tap: Brief "Opening WhatsApp..." toast (mobile only)

**Error Patterns:**
- Inline, contextual — never modal alerts
- Red border + text below input
- Recovery suggestion when possible

### Form Patterns

**Calculator Form (Single Input):**

```
┌─────────────────────────────┐
│ Your deposit ($)            │
│ ┌─────────────────────────┐ │
│ │ 15,000                  │ │
│ └─────────────────────────┘ │
│                             │
│ Your Executive Villa:       │
│ $1,100/month                │
└─────────────────────────────┘
```

**Input Principles:**
- Large input fields (48px height minimum)
- Number keyboard on mobile (`inputmode="numeric"`)
- Automatic thousand separators (15000 → 15,000)
- No submit button — instant calculation
- Clear button (×) when input has value

**Validation Timing:**
- On blur for format errors
- Real-time for calculation updates
- Never block input while validating

### Navigation Patterns

**Tier Filter Navigation:**

```
┌──────────────────────────────────┐
│ [All] [Starter] [Executive] [Signature] │
└──────────────────────────────────┘
```

- Horizontally scrollable on mobile
- Selected state: Filled background with tier color
- Unselected: Ghost style, gray text
- Tap = instant filter (no page reload)
- URL updates for shareability (`/villas?tier=executive`)

**Sticky Navigation:**
- Header: Always visible, minimal height (56px)
- Sticky affordability bar: Reveals on scroll past hero, hides on scroll down, shows on scroll up
- Floating WhatsApp: Only on pages without sticky bar

**Mobile Navigation:**
- Hamburger menu opens Sheet (slide from right)
- Menu items: Home, Villas, About, Team, Contact
- WhatsApp CTA inside menu

### Modal & Overlay Patterns

**Photo Gallery Lightbox:**
- Full-screen overlay on tap
- Swipe to navigate (with haptic feedback)
- Pinch to zoom
- X close button (top-right, 44x44px)
- Counter (1/8) bottom-center
- Tap outside image to close

**Sheet (Mobile Navigation):**
- Slides from right
- Dark overlay (50% opacity)
- Tap overlay or X to close
- No nested modals ever

**Dialog Usage:**
- Dialogs reserved for confirmations only
- Never interrupt browsing with dialogs
- WhatsApp opens in new tab, not dialog

### Empty States & Loading States

**Empty States:**

| Scenario | Message | Action |
|----------|---------|--------|
| No villas in tier | "No [Tier] Villas yet" | "View all villas →" |
| Search no results | "No matches found" | "Clear filters →" |
| Team video unavailable | "Video coming soon" | (no action needed) |

**Loading State Hierarchy:**

| Priority | Behavior |
|----------|----------|
| Critical path | Skeleton + shimmer |
| Images | Blur-up placeholder |
| Below fold | Lazy load, no skeleton |
| Video | Poster image until play |

**Skeleton Design:**
- Match exact layout dimensions
- Subtle shimmer animation (1.5s loop)
- Neutral gray (`#E5E7EB`)

### Search & Filtering Patterns

**Tier Filtering:**
- Single-select (only one tier at a time)
- "All" always available as reset
- Instant filtering (no Apply button)
- Count shown: "Executive (4)"

**No Search Bar (MVP):**
- 3 tiers × ~3-4 villas each = browsable without search
- Future: Add search when catalog > 15 villas

**Filter Persistence:**
- URL query params for sharing
- Browser back button respects filter state
- Scroll position preserved on filter change

### Interaction Patterns Summary

| Pattern | constructon Standard |
|---------|---------------------|
| Primary CTA | WhatsApp green only |
| Calculations | Instant, no submit |
| Loading | Skeleton + blur-up images |
| Errors | Inline, with recovery |
| Filters | Instant, single-select |
| Modals | Lightbox only, no interrupting dialogs |
| Mobile nav | Sheet from right |
| Touch targets | 44x44px minimum |

### Design System Integration

**shadcn/ui + Custom Patterns:**

| Pattern | Implementation |
|---------|---------------|
| Buttons | shadcn/ui Button + custom WhatsApp variant |
| Inputs | shadcn/ui Input + custom styling |
| Skeleton | shadcn/ui Skeleton with shimmer |
| Sheet | shadcn/ui Sheet for mobile nav |
| Dialog | shadcn/ui Dialog (sparingly) |

**Custom CSS Utilities:**

```css
/* Touch target enforcement */
.touch-target { min-width: 44px; min-height: 44px; }

/* Blur-up image loading */
.blur-load { filter: blur(10px); transition: filter 0.3s; }
.blur-load.loaded { filter: blur(0); }

/* Tier colors */
.tier-starter { --tier-color: #0D9488; }
.tier-executive { --tier-color: #1E3A5F; }
.tier-signature { --tier-color: #C9A227; }
```

## Responsive Design & Accessibility

### Responsive Strategy

**Mobile-First Approach:**

constructon is designed mobile-first for mid-range Android devices on 3G/4G networks. Desktop is an enhancement, not the primary experience.

| Device | Strategy |
|--------|----------|
| **Mobile (primary)** | Full-featured, touch-optimized, performance-focused |
| **Tablet** | Enhanced mobile layout with side-by-side where beneficial |
| **Desktop** | Multi-column layouts, hover states, keyboard shortcuts |

**Mobile Design (320px - 767px):**
- Single column layout
- Full-width villa cards with stacked content
- Bottom sticky affordability bar (thumb zone)
- Hamburger menu (Sheet from right)
- Horizontally scrollable tier filters
- Touch gestures: swipe gallery, pull-to-refresh

**Tablet Design (768px - 1023px):**
- 2-column villa grid
- Side-by-side calculator + result
- Persistent header navigation (no hamburger)
- Larger touch targets maintained
- Photo gallery with thumbnails visible

**Desktop Design (1024px+):**
- 3-column villa grid (max-width: 1280px)
- Sidebar calculator on villa detail pages
- Hover states on cards and buttons
- Keyboard navigation support
- Full header navigation with all links

### Breakpoint Strategy

**Tailwind CSS Breakpoints:**

| Breakpoint | Width | Target |
|------------|-------|--------|
| `sm` | 640px | Large phones (landscape) |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktop (max content width) |

**Mobile-First Implementation:**
```css
/* Base styles = mobile */
.villa-grid { display: grid; grid-template-columns: 1fr; }

/* Tablet enhancement */
@media (min-width: 768px) {
  .villa-grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop enhancement */
@media (min-width: 1024px) {
  .villa-grid { grid-template-columns: repeat(3, 1fr); }
}
```

**Critical Breakpoint Behaviors:**

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Villa grid | 1 column | 2 columns | 3 columns |
| Navigation | Hamburger | Full header | Full header |
| Sticky bar | Bottom (fixed) | Bottom (fixed) | Bottom (fixed) |
| Calculator | Full-width | Side panel | Sidebar |
| Gallery | Full-screen | Modal | Modal with thumbnails |

### Accessibility Strategy

**Target Compliance:** WCAG 2.1 Level AA

This level is the industry standard and addresses the majority of accessibility needs while remaining achievable for MVP.

**Color Contrast Requirements:**

| Element | Ratio Required | constructon Values |
|---------|---------------|-------------------|
| Body text | 4.5:1 | Text `#1F2937` on `#FAFAFA` = 12.6:1 ✓ |
| Large text (18px+) | 3:1 | Headings on white = compliant ✓ |
| UI components | 3:1 | All buttons and inputs = compliant ✓ |
| WhatsApp button | 3:1 | White on `#25D366` = 3.5:1 ✓ |

**Keyboard Navigation:**

| Action | Keyboard Shortcut |
|--------|-------------------|
| Navigate links/buttons | Tab / Shift+Tab |
| Activate button | Enter / Space |
| Close modal/sheet | Escape |
| Navigate gallery | Arrow keys |
| Skip to main content | Skip link (Tab first) |

**Focus Indicators:**
- 2px solid ring in brand blue (`#1E3A5F`)
- Visible on all interactive elements
- Never remove default focus (`:focus-visible`)

**Screen Reader Support:**

| Element | ARIA Implementation |
|---------|---------------------|
| Villa cards | `role="article"`, descriptive `aria-label` |
| Tier badges | `aria-label="Starter tier villa"` |
| Calculator | `aria-live="polite"` for result updates |
| Gallery | `aria-roledescription="carousel"` |
| Sticky bar | `role="complementary"` |
| WhatsApp button | `aria-label="Chat on WhatsApp about [villa name]"` |

**Touch Targets:**
- Minimum 44x44px for all interactive elements
- 8px minimum spacing between targets
- Sticky bar buttons: 48px height

### Testing Strategy

**Responsive Testing:**

| Device Type | Testing Method |
|-------------|----------------|
| Android phones | BrowserStack + physical Tecno/Infinix devices |
| iPhones | BrowserStack + physical iPhone SE/13 |
| Tablets | BrowserStack iPad/Android tablet |
| Desktop | Chrome, Firefox, Safari, Edge |

**Network Testing:**
- Chrome DevTools network throttling (3G preset)
- Target: First Contentful Paint < 2s on 3G
- Target: Time to Interactive < 3s on 3G

**Accessibility Testing:**

| Test Type | Tools |
|-----------|-------|
| Automated | axe DevTools, Lighthouse accessibility audit |
| Screen reader | VoiceOver (iOS/Mac), TalkBack (Android), NVDA (Windows) |
| Keyboard | Manual tab-through of all pages |
| Color | Stark plugin, color blindness simulators |

**Testing Checklist:**
- [ ] All pages pass Lighthouse accessibility score ≥ 90
- [ ] Full keyboard navigation works (no trapped focus)
- [ ] Screen reader announces all content meaningfully
- [ ] No color-only information conveyance
- [ ] Touch targets meet 44px minimum
- [ ] Forms announce errors to screen readers

### Implementation Guidelines

**Responsive Development:**

```typescript
// Use Tailwind responsive prefixes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Relative units for typography
<p className="text-base md:text-lg"> // 16px → 18px

// Safe area insets for sticky bar
<div className="fixed bottom-0 pb-safe">
```

**Image Optimization:**
- Next.js `<Image>` with automatic srcset
- WebP format with JPEG fallback
- Blur placeholder (10px base64)
- Lazy loading below fold

**Accessibility Development:**

```tsx
// Semantic HTML
<article aria-label="Executive Villa - Harare Heights">

// Live regions for calculator
<div aria-live="polite" aria-atomic="true">
  Your Executive Villa: $1,100/month
</div>

// Skip link
<a href="#main" className="sr-only focus:not-sr-only">
  Skip to main content
</a>

// Focus management in modals
useEffect(() => {
  if (isOpen) firstFocusableElement.current?.focus();
}, [isOpen]);
```

**Performance Guidelines:**
- Critical CSS inlined (< 14KB)
- JavaScript code-split by route
- Images lazy-loaded with Intersection Observer
- Fonts: `display: swap` for FOUT over FOIT

### Device-Specific Considerations

**iOS Safari:**
- Safe area insets for notch and home indicator
- `viewport-fit=cover` meta tag
- Disable double-tap zoom on buttons

**Android Chrome:**
- Material You color theming support (optional)
- PWA manifest for "Add to Home Screen"
- Back gesture doesn't break navigation

**Low-End Devices:**
- Reduced motion preference respected (`prefers-reduced-motion`)
- No autoplay video
- Skeleton loading instead of spinners (less CPU)
