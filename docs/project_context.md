---
project_name: 'constructon'
user_name: 'Lmr'
date: '2025-12-14'
sections_completed:
  - technology_stack
  - naming_conventions
  - server_actions
  - sanity_validation
  - formatting
  - whatsapp_urls
  - image_handling
  - loading_states
  - error_handling
  - analytics
  - folder_structure
  - anti_patterns
  - state_management
status: 'complete'
rule_count: 45
optimized_for_llm: true
source_document: 'docs/architecture.md'
---

# Project Context: constructon

_Critical rules for AI agents implementing this codebase. Keep this file lean._

---

## Technology Stack (Exact Versions)

| Technology | Version | Notes |
|------------|---------|-------|
| Next.js | 16.x | Use `create-next-app@latest`, verify 16.0.4+ (CVE-2025-67779) |
| React | 19 | Server Components default |
| TypeScript | 5.x | Strict mode enabled |
| Tailwind CSS | 4.x | CSS variables, no separate CSS files |
| shadcn/ui | Latest | Copy-paste components in `src/components/ui/` |
| Sanity | Latest | Headless CMS, GROQ queries |
| Zod | Latest | All data validation |
| Node.js | 20+ | Required for Next.js 16 |

---

## Critical Implementation Rules

### Naming Conventions (Enforced)

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `VillaCard.tsx` |
| Pages | lowercase | `page.tsx`, `layout.tsx` |
| Hooks | `use` prefix | `useAffordability.ts` |
| Server Actions | `Action` suffix | `submitInquiryAction.ts` |
| Constants | SCREAMING_SNAKE | `DEFAULT_INTEREST_RATE` |
| Booleans | `is`/`has`/`should` prefix | `isLoading`, `hasError` |
| Handlers | `handle` prefix | `handleSubmit` |
| Sanity documents | camelCase | `villa`, `teamMember` |

### Server Action Response Format (Mandatory)

```typescript
// ALWAYS use this exact structure
type ActionResponse<T> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    field?: string;
  };
};
```

### Sanity Data Validation (Required)

```typescript
// ALWAYS validate Sanity responses with Zod
import { z } from 'zod';

const VillaSchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.object({ current: z.string() }),
  tier: z.enum(['starter', 'executive', 'signature']),
  price: z.number(),
});

export type Villa = z.infer<typeof VillaSchema>;

// In queries - ALWAYS validate
export async function getVillas(): Promise<Villa[]> {
  const data = await client.fetch(villasQuery);
  return z.array(VillaSchema).parse(data);
}
```

### Formatting Functions (Single Source of Truth)

```typescript
// ALL formatting MUST go through lib/utils.ts - NEVER inline
import { formatCurrency, formatMonthlyPayment } from '@/lib/utils';

// ✅ CORRECT
<p>{formatCurrency(villa.price)}</p>

// ❌ WRONG - never inline formatting
<p>${villa.price.toLocaleString()}</p>
```

### WhatsApp URLs (Single Source of Truth)

```typescript
// ALL WhatsApp links MUST use lib/whatsapp.ts - NEVER hardcode
import { buildWhatsAppUrl } from '@/lib/whatsapp';

// ✅ CORRECT
const url = buildWhatsAppUrl({ villaName: 'Signature', source: 'sticky' });

// ❌ WRONG - never hardcode
<a href="https://wa.me/263...">
```

### Image Handling (Required Pattern)

```typescript
// ALWAYS use Next.js Image with blur placeholder
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/client';

<Image
  src={urlFor(villa.mainImage).width(800).url()}
  alt={villa.name}
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL={villa.mainImage.asset.metadata.lqip}
  className="object-cover"
/>

// ❌ WRONG - never use direct Sanity URLs
<img src={villa.mainImage.asset.url} />
```

### Loading State Pattern (Required)

```typescript
// ALWAYS use this pattern for async operations
const [state, setState] = useState<{
  status: 'idle' | 'loading' | 'success' | 'error';
  data?: Data;
  error?: string;
}>({ status: 'idle' });

// In JSX
{state.status === 'loading' && <Skeleton />}
{state.status === 'error' && <ErrorMessage message={state.error} />}
{state.status === 'success' && <Content data={state.data} />}
```

### Error Handling Pattern (Required)

```typescript
// Server-side (Server Actions)
try {
  // operation
} catch (error) {
  console.error('[submitInquiry]', error); // ALWAYS log with context prefix
  return { success: false, error: { message: "User-friendly message" } };
}

// Client-side
<ErrorBoundary fallback={<ErrorFallback />}>
  <Component />
</ErrorBoundary>
```

### Analytics Events (Naming Convention)

```typescript
// ALWAYS use format: category_action
type AnalyticsEvent =
  | 'villa_view'
  | 'villa_gallery_swipe'
  | 'calculator_use'
  | 'calculator_complete'
  | 'whatsapp_click'
  | 'inquiry_submit'
  | 'tier_filter';
```

---

## Folder Structure Rules

**NEVER create new top-level folders. Use existing structure:**

```
src/
├── app/                  # App Router pages ONLY
│   └── (marketing)/      # Route group for public pages
├── components/
│   ├── ui/               # shadcn/ui ONLY
│   ├── villa/            # Villa-specific
│   ├── calculator/       # Calculator-related
│   ├── trust/            # Trust-building
│   ├── contact/          # Contact-related
│   ├── layout/           # Header, Footer, Nav
│   └── shared/           # Cross-cutting utilities
├── lib/
│   ├── sanity/           # Sanity client, queries, types
│   ├── utils.ts          # ALL formatting functions
│   ├── whatsapp.ts       # ALL WhatsApp URL building
│   └── analytics.ts      # ALL analytics helpers
├── hooks/                # Custom React hooks
├── actions/              # Server Actions ONLY
├── providers/            # Context providers
└── types/                # Shared TypeScript types
```

---

## Anti-Patterns (NEVER DO)

| Anti-Pattern | Correct Approach |
|--------------|------------------|
| Inline currency formatting | Use `formatCurrency()` from `lib/utils.ts` |
| Hardcoded WhatsApp URLs | Use `buildWhatsAppUrl()` from `lib/whatsapp.ts` |
| Direct Sanity image URLs | Use `urlFor()` + Next.js `Image` |
| Unvalidated Sanity data | Always validate with Zod schema |
| Generic component names | Use specific names: `VillaCard`, not `Card` |
| `default export` for components | Use named exports: `export function VillaCard` |
| Separate CSS files | Use Tailwind classes inline |
| New top-level folders | Use existing structure |
| Missing error context | Log with `[functionName]` prefix |

---

## State Management Architecture

```
AffordabilityProvider (React Context)
├── useAffordability hook
│   ├── villaPrice: number
│   ├── deposit: number
│   ├── monthlyPayment: computed
│   └── setDeposit: function
├── FinancingCalculator (consumer)
├── StickyAffordabilityBar (consumer)
└── WhatsAppButton (reads for pre-fill)
```

---

## Environment Variables

```bash
# Public (client-accessible)
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_SITE_URL=

# Private (server-only)
SANITY_API_TOKEN=
RESEND_API_KEY=
```

---

## Quick Reference

- **CMS**: Sanity (GROQ queries, Zod validation)
- **Hosting**: Vercel (ISR, Edge CDN)
- **Forms**: Server Actions + Zod
- **Email**: Resend API
- **Analytics**: GA4 + Meta Pixel
- **State**: React Context (`useAffordability`)
- **Styling**: Tailwind CSS + shadcn/ui + CVA

---

## Usage Guidelines

**For AI Agents:**
- Read this file BEFORE implementing any code
- Follow ALL rules exactly as documented
- When in doubt, prefer the more restrictive option
- Reference `docs/architecture.md` for detailed rationale

**For Humans:**
- Keep this file lean and focused on agent needs
- Update when technology stack or patterns change
- Review quarterly for outdated rules
- Remove rules that become obvious over time

---

_Generated: 2025-12-14 | Source: docs/architecture.md_
