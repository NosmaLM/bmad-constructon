---
stepsCompleted: [1, 2, 3]
inputDocuments:
  - docs/prd.md
  - docs/architecture.md
  - docs/ux-design-specification.md
workflowType: 'epics'
lastStep: 3
status: 'in-progress'
project_name: 'constructon'
user_name: 'Lmr'
date: '2025-12-14'
---

# constructon - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for constructon, decomposing the requirements from the PRD, UX Design, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

**Villa Discovery & Showcase (7 FRs)**
- FR1: Visitor can browse a gallery of all available villa plans
- FR2: Visitor can view high-quality photos for each villa plan
- FR3: Visitor can view floor plans for each villa
- FR4: Visitor can filter/browse villas by tier (Starter, Executive, Signature)
- FR5: Visitor can view smart home features included with each villa
- FR6: Visitor can view a gallery of completed projects
- FR7: Visitor can view detailed specifications for each villa plan

**Pricing & Financial Tools (5 FRs)**
- FR8: Visitor can see pricing displayed on every villa plan
- FR9: Visitor can use a financing calculator to see monthly payment estimates
- FR10: Visitor can input their savings/deposit amount to adjust payment calculations
- FR11: Visitor can see "Your villa from $X/month" messaging on relevant plans
- FR12: Visitor can view promotional offers and limited-time pricing

**Lead Capture & Communication (6 FRs)**
- FR13: Visitor can contact constructon via WhatsApp button from any page
- FR14: Visitor can submit an inquiry form with contact details and interests
- FR15: Visitor can find the phone number to call directly
- FR16: Visitor can request a site visit through the website
- FR17: Visitor can request customization options for a villa plan
- FR18: System can capture lead source attribution for analytics

**Trust & Credibility (7 FRs)**
- FR19: Visitor can view the company story and mission
- FR20: Visitor can view team member profiles with credentials
- FR21: Visitor can view video introductions from team members
- FR22: Visitor can read/view client testimonials
- FR23: Visitor can see "constructon Verified" quality badge on projects
- FR24: Visitor can view diaspora-specific program information
- FR25: Visitor can understand the build process and transparency commitments

**Content & Resources (6 FRs)**
- FR26: First-time builder can access guides and FAQ resources
- FR27: Investor can view turnkey investment package information
- FR28: Investor can view ROI projections and rental information
- FR29: Visitor can view land partnership information
- FR30: Visitor can learn about smart home technology offerings
- FR31: Visitor can view villa tier comparisons (Starter vs Executive vs Signature)

**Site Foundation & SEO (6 FRs)**
- FR32: Search engines can crawl and index all villa plan pages
- FR33: Visitor can share villa pages on social media with rich previews
- FR34: Visitor can access the site on mobile devices with full functionality
- FR35: Visitor can navigate the site using keyboard only
- FR36: Screen reader users can access all content with proper semantic structure
- FR37: Visitor can view the site in under 3 seconds on mobile connections

**Analytics & Tracking (4 FRs)**
- FR38: System can track visitor behavior and page views
- FR39: System can track lead conversion events (form submissions, WhatsApp clicks)
- FR40: System can measure time spent on villa plan pages
- FR41: System can identify return visitors

**Total: 41 Functional Requirements**

### NonFunctional Requirements

**Performance**
- NFR1: First Contentful Paint (FCP) < 1.5 seconds
- NFR2: Largest Contentful Paint (LCP) < 2.5 seconds
- NFR3: Time to Interactive (TTI) < 3.5 seconds
- NFR4: Cumulative Layout Shift (CLS) < 0.1
- NFR5: Total Page Weight < 2MB
- NFR6: Image load (above fold) < 1 second
- NFR7: Financing calculator responds within 500ms to user input

**Security**
- NFR8: All traffic via HTTPS (TLS 1.2+)
- NFR9: Inquiry forms protected against CSRF
- NFR10: All user inputs sanitized server-side
- NFR11: CMS/admin requires strong authentication
- NFR12: Lead information stored securely, access logged
- NFR13: Third-party scripts limited to trusted sources

**Scalability**
- NFR14: Support 50 concurrent users initially, scalable to 500
- NFR15: Support 5,000 to 50,000 monthly page views
- NFR16: Support 50 to 500 lead submissions per month

**Accessibility**
- NFR17: WCAG 2.1 Level AA compliance
- NFR18: Minimum 4.5:1 color contrast for normal text
- NFR19: All interactive elements keyboard accessible
- NFR20: Visible focus states on all interactive elements
- NFR21: All images have descriptive alt text
- NFR22: All form inputs properly labeled
- NFR23: Semantic HTML structure with ARIA where needed
- NFR24: Respect prefers-reduced-motion preference

**Integration**
- NFR25: WhatsApp Business click-to-chat integration
- NFR26: Google Analytics 4 tracking
- NFR27: Meta Pixel tracking for ad attribution
- NFR28: Headless CMS REST/GraphQL API integration
- NFR29: Email service API for form notifications

**Reliability**
- NFR30: 99.5% uptime availability
- NFR31: Recovery time < 1 hour for critical issues
- NFR32: CMS content backed up daily

**Total: 32 Non-Functional Requirements**

### Additional Requirements

**From Architecture - Starter Template (CRITICAL for Epic 1 Story 1):**
- Initialize project with `npx create-next-app@latest constructon --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
- Initialize shadcn/ui with `npx shadcn@latest init`
- Add shadcn components: button, card, input, badge, dialog, sheet, carousel, tabs, skeleton
- Use Next.js 16 with React 19 and TypeScript 5.x strict mode
- Verify Next.js version is 16.0.4+ (CVE-2025-67779 patch)

**From Architecture - Technical Patterns:**
- Use ActionResponse<T> pattern for all Server Actions
- Validate all Sanity CMS data with Zod schemas
- Use lib/utils.ts for ALL formatting functions (never inline)
- Use lib/whatsapp.ts for ALL WhatsApp URLs (never hardcode)
- Follow naming conventions: PascalCase components, camelCase hooks, Action suffix
- Use Next.js Image component with blur placeholders for all images
- Follow loading state pattern: status enum (idle/loading/success/error)
- Log errors with context prefix [functionName]

**From Architecture - Infrastructure:**
- Deploy to Vercel with Edge CDN
- Set up Sanity CMS project with schemas: villa, teamMember, testimonial, siteSettings
- Configure environment variables for Sanity, GA4, Meta Pixel, WhatsApp, Resend
- Implement ISR (Incremental Static Regeneration) for villa pages
- Set up on-demand revalidation webhook for CMS updates

**From Architecture - Component Structure:**
- components/ui/ for shadcn primitives
- components/villa/ for VillaCard, TierBadge, PhotoGallery, VillaSpecs
- components/calculator/ for FinancingCalculator, StickyAffordabilityBar
- components/trust/ for TrustBadge, TeamProfileCard, TestimonialCard
- components/contact/ for WhatsAppButton, InquiryForm
- components/layout/ for Header, Footer, MobileNav

**From UX - Design Requirements:**
- Mobile-first responsive design (320px → 767px → 1024px+)
- Touch-first with 44x44px minimum touch targets
- Thumb-zone optimization for critical CTAs
- Premium typography: serif headings, sans-serif body
- Luxury whitespace with generous spacing
- Swipeable photo galleries on mobile
- Sticky WhatsApp button always visible

**From UX - Interaction Patterns:**
- Core flow: "See it. Afford it. WhatsApp it."
- Hero images must load in < 1 second for first impression
- Financing calculator with instant updates (500ms response)
- Pre-filled WhatsApp messages with villa context
- 3-tier visual hierarchy: Starter → Executive → Signature

**From UX - Accessibility:**
- WCAG 2.1 AA compliance throughout
- Visible focus indicators on all interactive elements
- Keyboard navigation for all functionality
- Screen reader compatible semantic structure
- Respect prefers-reduced-motion

### FR Coverage Map

| FR | Epic | Description |
|----|------|-------------|
| FR1 | Epic 2 | Browse villa gallery |
| FR2 | Epic 2 | View photos |
| FR3 | Epic 2 | View floor plans |
| FR4 | Epic 2 | Filter by tier |
| FR5 | Epic 2 | Smart home features |
| FR6 | Epic 6 | Completed projects gallery |
| FR7 | Epic 2 | Villa specifications |
| FR8 | Epic 3 | Pricing display |
| FR9 | Epic 3 | Financing calculator |
| FR10 | Epic 3 | Deposit input |
| FR11 | Epic 3 | Monthly payment messaging |
| FR12 | Epic 3 | Promotional offers |
| FR13 | Epic 4 | WhatsApp button |
| FR14 | Epic 4 | Inquiry form |
| FR15 | Epic 4 | Phone number |
| FR16 | Epic 4 | Site visit request |
| FR17 | Epic 4 | Customization request |
| FR18 | Epic 4 | Lead attribution |
| FR19 | Epic 5 | Company story |
| FR20 | Epic 5 | Team profiles |
| FR21 | Epic 5 | Video introductions |
| FR22 | Epic 5 | Testimonials |
| FR23 | Epic 5 | Verified badge |
| FR24 | Epic 5 | Diaspora program |
| FR25 | Epic 5 | Build process |
| FR26 | Epic 6 | Builder guides/FAQ |
| FR27 | Epic 6 | Investment package |
| FR28 | Epic 6 | ROI projections |
| FR29 | Epic 6 | Land partnerships |
| FR30 | Epic 6 | Smart home info |
| FR31 | Epic 6 | Tier comparisons |
| FR32 | Epic 2 | SEO crawlability |
| FR33 | Epic 2 | Social sharing |
| FR34 | Epic 1 | Mobile accessibility |
| FR35 | Epic 1 | Keyboard navigation |
| FR36 | Epic 1 | Screen reader support |
| FR37 | Epic 1 | Performance (<3s) |
| FR38 | Epic 7 | Behavior tracking |
| FR39 | Epic 7 | Conversion tracking |
| FR40 | Epic 7 | Time on page |
| FR41 | Epic 7 | Return visitors |

**Coverage: 41/41 FRs mapped (100%)**

## Epic List

### Epic 1: Site Foundation & Homepage
Visitors can access a fast, mobile-friendly, professional website with navigation and a compelling homepage that establishes the constructon brand.

**FRs covered:** FR34, FR35, FR36, FR37

**Includes:**
- Project initialization (Next.js 16 + shadcn/ui + Sanity)
- Root layout with Header, Footer, MobileNav
- Homepage hero section
- Mobile-first responsive foundation
- Basic SEO setup

---

### Epic 2: Villa Discovery & Showcase
Visitors can browse all villa plans, view high-quality photos and floor plans, filter by tier, and explore smart home features and specifications.

**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR7, FR32, FR33

**Includes:**
- Sanity CMS villa schema
- Villa listing page with TierFilter
- Villa detail page with PhotoGallery
- VillaCard, TierBadge, VillaSpecs components
- Open Graph tags for sharing

---

### Epic 3: Pricing & Financial Tools
Visitors can see transparent pricing on every villa and calculate their personal monthly payment based on deposit amount.

**FRs covered:** FR8, FR9, FR10, FR11, FR12

**Includes:**
- FinancingCalculator component
- StickyAffordabilityBar
- AffordabilityProvider (useAffordability hook)
- lib/calculator.ts logic
- Promotional badge display

---

### Epic 4: Lead Capture & Communication
Visitors can contact constructon via WhatsApp, inquiry form, or phone, with pre-filled context from their browsing session.

**FRs covered:** FR13, FR14, FR15, FR16, FR17, FR18

**Includes:**
- WhatsAppButton (CVA variants: sticky, floating, inline)
- InquiryForm with Server Action
- Contact page
- lib/whatsapp.ts URL builder
- Resend email integration
- UTM parameter tracking

---

### Epic 5: Trust & Credibility
Visitors can verify constructon's legitimacy through company story, team profiles with video, testimonials, and diaspora-specific program information.

**FRs covered:** FR19, FR20, FR21, FR22, FR23, FR24, FR25

**Includes:**
- About page
- Team page with TeamProfileCard
- LazyVideo component for team videos
- TestimonialCard component
- TrustBadge component
- Diaspora program section
- Build process timeline

---

### Epic 6: Content & Resources
Visitors can learn about building, investing, smart home technology, and make informed decisions through comprehensive resources.

**FRs covered:** FR6, FR26, FR27, FR28, FR29, FR30, FR31

**Includes:**
- FAQ page with accordion
- Investment section
- Smart home showcase page
- Tier comparison component
- CompletedProjectGallery
- CMS content for all resources

---

### Epic 7: Analytics & Optimization
Business can track visitor behavior, conversion events, and optimize the website based on data.

**FRs covered:** FR38, FR39, FR40, FR41

**Includes:**
- GA4 integration
- Meta Pixel integration
- AnalyticsProvider
- lib/analytics.ts event helpers
- Conversion tracking (WhatsApp clicks, form submissions)

---

## Epic 1: Site Foundation & Homepage

Visitors can access a fast, mobile-friendly, professional website with navigation and a compelling homepage that establishes the constructon brand.

### Story 1.1: Initialize Next.js Project with Core Dependencies

As a **developer**,
I want **a properly configured Next.js 16 project with TypeScript, Tailwind CSS, and shadcn/ui**,
So that **I have a solid foundation to build all future features**.

**Acceptance Criteria:**

**Given** no existing project
**When** the initialization commands are run
**Then** a Next.js 16 project is created with:
- TypeScript 5.x in strict mode
- Tailwind CSS 4.x configured
- App Router with `src/` directory
- Import alias `@/*` configured
**And** Next.js version is 16.0.4+ (CVE-2025-67779 patched)

**Given** the project is initialized
**When** shadcn/ui is configured
**Then** the following components are available:
- button, card, input, badge, dialog, sheet, carousel, tabs, skeleton
**And** components are in `src/components/ui/`

**Given** the project setup is complete
**When** `npm run dev` is executed
**Then** the development server starts without errors
**And** the default page loads in the browser

---

### Story 1.2: Create Root Layout with Header and Footer

As a **visitor**,
I want **a consistent header and footer on every page**,
So that **I can easily navigate the site and find contact information**.

**Acceptance Criteria:**

**Given** I am on any page of the website
**When** the page loads
**Then** I see a Header with:
- constructon logo (links to homepage)
- Navigation links (Villas, About, Team, Contact)
- WhatsApp button placeholder (styled, non-functional until Epic 4)
**And** I see a Footer with:
- Company information
- Navigation links
- Contact details placeholder
- Copyright notice

**Given** I am using a screen reader
**When** I navigate the header
**Then** all navigation elements are properly labeled
**And** skip-to-content link is available (FR36)

**Given** I am using keyboard only
**When** I tab through the header
**Then** all interactive elements receive visible focus (FR35)
**And** I can activate any element with Enter/Space

---

### Story 1.3: Build Mobile Navigation with Sheet Component

As a **mobile visitor**,
I want **a responsive navigation menu that works well on touch devices**,
So that **I can easily navigate the site on my phone** (FR34).

**Acceptance Criteria:**

**Given** I am on a mobile device (viewport < 768px)
**When** the page loads
**Then** I see a hamburger menu icon instead of full navigation
**And** the navigation links are hidden

**Given** I am on mobile and tap the hamburger icon
**When** the menu opens
**Then** a Sheet component slides in from the right
**And** all navigation links are visible with 44x44px minimum touch targets
**And** I can tap any link to navigate

**Given** the mobile menu is open
**When** I tap outside the menu or the close button
**Then** the Sheet closes smoothly
**And** focus returns to the hamburger icon

**Given** I am on tablet or desktop (viewport >= 768px)
**When** the page loads
**Then** I see the full navigation inline in the header
**And** the hamburger icon is hidden

---

### Story 1.4: Create Homepage with Hero Section

As a **visitor**,
I want **a compelling homepage that showcases constructon's value proposition**,
So that **I understand what makes constructon special and want to explore further**.

**Acceptance Criteria:**

**Given** I navigate to the homepage
**When** the page loads
**Then** I see a hero section with:
- Headline: "Western-quality smart villas, built in Zimbabwe"
- Subheadline highlighting key differentiators
- Primary CTA button (placeholder for WhatsApp)
- Hero image placeholder (optimized for performance)
**And** the page loads in under 3 seconds on 3G (FR37)

**Given** the hero section is displayed
**When** I view on mobile
**Then** the layout is optimized for mobile-first display
**And** text is readable without zooming
**And** CTA button is within thumb reach zone

**Given** I scroll below the hero
**When** I view the homepage content
**Then** I see section placeholders for:
- Featured Villas (placeholder for Epic 2)
- Trust Badges (placeholder for Epic 5)
- Call-to-action section

**Given** I am using a screen reader
**When** I navigate the homepage
**Then** all content is semantically structured with proper headings (h1, h2, h3)
**And** images have descriptive alt text (FR36)

---

## Epic 2: Villa Discovery & Showcase

Visitors can browse all villa plans, view high-quality photos and floor plans, filter by tier, and explore smart home features and specifications.

### Story 2.1: Set Up Sanity CMS with Villa Schema

As a **content manager**,
I want **a Sanity CMS configured with villa content types**,
So that **I can manage villa plans without code changes**.

**Acceptance Criteria:**

**Given** the project needs content management
**When** Sanity is initialized
**Then** a Sanity project is created with:
- Project embedded in `/sanity` directory
- Studio accessible at `/studio` route
- Environment variables configured (SANITY_PROJECT_ID, DATASET, TOKEN)

**Given** Sanity is configured
**When** the villa schema is created
**Then** the `villa` document type includes:
- name (string, required)
- slug (slug, required)
- tier (enum: starter, executive, signature)
- price (number, required)
- description (text)
- mainImage (image with hotspot)
- galleryImages (array of images)
- floorPlanImage (image)
- specifications (object: bedrooms, bathrooms, sqMeters, garages)
- smartHomeFeatures (array of strings)
- promotionalOffer (string, optional)

**Given** the schema is deployed
**When** I access Sanity Studio
**Then** I can create, edit, and publish villa documents
**And** I can upload and crop images with hotspot

---

### Story 2.2: Create Sanity Client and Type-Safe Queries

As a **developer**,
I want **type-safe Sanity queries with Zod validation**,
So that **villa data is validated at runtime and TypeScript-safe**.

**Acceptance Criteria:**

**Given** Sanity is configured
**When** the client library is created
**Then** `src/lib/sanity/client.ts` exports:
- Configured Sanity client
- `urlFor()` image URL builder function

**Given** the client exists
**When** Zod schemas are defined
**Then** `src/lib/sanity/types.ts` includes:
- VillaSchema with all fields validated
- Villa TypeScript type inferred from Zod
- Tier enum type

**Given** types are defined
**When** GROQ queries are created
**Then** `src/lib/sanity/queries.ts` exports:
- `getVillas()` — returns all villas, validated with Zod
- `getVillaBySlug(slug)` — returns single villa
- `getVillasByTier(tier)` — returns filtered villas
**And** all query results are validated with `z.array(VillaSchema).parse()`

---

### Story 2.3: Create Villa Listing Page with VillaCard Grid

As a **visitor**,
I want **to browse a gallery of all available villa plans**,
So that **I can see what's available and find plans that interest me** (FR1).

**Acceptance Criteria:**

**Given** I navigate to `/villas`
**When** the page loads
**Then** I see a grid of VillaCard components showing all villas
**And** each VillaCard displays:
- Main image with blur placeholder
- Villa name
- TierBadge (Starter/Executive/Signature with distinct colors)
- Price (formatted with `formatCurrency()`)
- Brief description
**And** cards link to individual villa detail pages

**Given** the villa listing loads
**When** images are rendered
**Then** Next.js Image component is used with:
- Blur placeholder from Sanity LQIP
- Proper width/height for aspect ratio
- Lazy loading for below-fold images

**Given** I am on mobile
**When** I view the villa grid
**Then** cards stack in a single column
**And** images are optimized for mobile bandwidth
**And** the page loads in under 3 seconds on 3G

**Given** search engines crawl the page
**When** the page is rendered
**Then** it uses SSR with proper semantic HTML (FR32)
**And** each villa has a link to its detail page

---

### Story 2.4: Create Villa Detail Page with Specifications

As a **visitor**,
I want **to view detailed information about a specific villa plan**,
So that **I can understand the specifications and features** (FR7).

**Acceptance Criteria:**

**Given** I click on a VillaCard or navigate to `/villas/[slug]`
**When** the villa detail page loads
**Then** I see:
- Villa name as page title
- TierBadge
- Price prominently displayed
- Full description
- VillaSpecs component showing: bedrooms, bathrooms, sqMeters, garages

**Given** the villa has smart home features
**When** I view the detail page
**Then** I see a SmartHomeFeatures section listing all features (FR5)
**And** features are displayed with icons/badges

**Given** the villa has a floor plan
**When** I view the detail page
**Then** I see the floor plan image (FR3)
**And** I can tap/click to view larger

**Given** I am using a screen reader
**When** I navigate the villa detail page
**Then** all content is properly structured with headings
**And** specifications are in a semantic table or definition list

---

### Story 2.5: Build Photo Gallery with Swipe Support

As a **visitor**,
I want **to view high-quality photos of each villa in a gallery**,
So that **I can see the villa from multiple angles** (FR2).

**Acceptance Criteria:**

**Given** I am on a villa detail page with gallery images
**When** I view the photo section
**Then** I see a PhotoGallery component with:
- Main large image
- Thumbnail strip below
- Image counter (e.g., "3 of 12")

**Given** I am on mobile
**When** I interact with the gallery
**Then** I can swipe left/right to navigate images
**And** swipe gestures are smooth and responsive

**Given** I am on desktop
**When** I interact with the gallery
**Then** I can click thumbnails to change main image
**And** I can use arrow keys to navigate
**And** I can click arrows to go prev/next

**Given** I tap/click the main gallery image
**When** the lightbox opens
**Then** I see a full-screen view of the image
**And** I can swipe/navigate through all images
**And** I can close with X button or swipe down

---

### Story 2.6: Implement Tier Filtering on Villa Listing

As a **visitor**,
I want **to filter villas by tier (Starter, Executive, Signature)**,
So that **I can focus on plans within my budget or preference** (FR4).

**Acceptance Criteria:**

**Given** I am on the `/villas` page
**When** I view the filter section
**Then** I see TierFilter component with options:
- All (default, shows all villas)
- Starter
- Executive
- Signature
**And** current filter is visually highlighted

**Given** I select a tier filter
**When** the filter is applied
**Then** only villas of that tier are displayed
**And** the URL updates (e.g., `/villas?tier=starter`)
**And** the filter state persists on page refresh

**Given** I select "All" filter
**When** the filter is applied
**Then** all villas are displayed regardless of tier

**Given** no villas exist for a selected tier
**When** I apply that filter
**Then** I see a friendly empty state message
**And** a suggestion to view other tiers

---

### Story 2.7: Add SEO and Social Sharing for Villa Pages

As a **visitor**,
I want **to share villa pages on social media with rich previews**,
So that **I can show friends and family what I'm interested in** (FR33).

**Acceptance Criteria:**

**Given** a villa detail page exists
**When** search engines or social platforms fetch the page
**Then** proper meta tags are present:
- `<title>` with villa name and "constructon"
- `<meta name="description">` with villa description
- Canonical URL

**Given** the page has Open Graph tags
**When** I share on Facebook/WhatsApp/LinkedIn
**Then** the preview shows:
- og:title — Villa name
- og:description — Villa description snippet
- og:image — Villa main image (1200x630 optimized)
- og:url — Full canonical URL

**Given** the page has Twitter Card tags
**When** I share on Twitter/X
**Then** a large image card is displayed with villa image

**Given** the villa listing page exists
**When** search engines crawl
**Then** a sitemap includes all villa pages (FR32)
**And** pages use semantic HTML structure

---

## Epic 3: Pricing & Financial Tools

Visitors can see transparent pricing on every villa and calculate their personal monthly payment based on deposit amount.

### Story 3.1: Create Formatting Utilities and Calculator Logic

As a **developer**,
I want **centralized formatting functions and calculator logic**,
So that **pricing is consistent across the entire site**.

**Acceptance Criteria:**

**Given** the project needs currency formatting
**When** `lib/utils.ts` is created
**Then** it exports:
- `formatCurrency(amount: number): string` — formats as "$XX,XXX"
- `formatMonthlyPayment(amount: number): string` — formats as "$X,XXX/mo"
**And** formatting uses `Intl.NumberFormat` with USD, no decimals

**Given** the project needs payment calculations
**When** `lib/calculator.ts` is created
**Then** it exports:
- `calculateMonthlyPayment(price, deposit, interestRate, termMonths): number`
- `DEFAULT_INTEREST_RATE` constant (e.g., 0.12 for 12%)
- `DEFAULT_TERM_MONTHS` constant (e.g., 240 for 20 years)
**And** the formula correctly calculates amortized monthly payment

**Given** I call `calculateMonthlyPayment(150000, 30000, 0.12, 240)`
**When** the calculation runs
**Then** the result is mathematically correct for a 20-year loan at 12%
**And** the function handles edge cases (0 deposit, full payment)

---

### Story 3.2: Implement AffordabilityProvider and useAffordability Hook

As a **developer**,
I want **a React Context that manages calculator state across components**,
So that **the FinancingCalculator and StickyAffordabilityBar stay in sync**.

**Acceptance Criteria:**

**Given** multiple components need shared calculator state
**When** AffordabilityProvider is created
**Then** `src/providers/AffordabilityProvider.tsx` provides:
- `villaPrice: number` — current villa price
- `deposit: number` — user's deposit input
- `monthlyPayment: number` — computed from price, deposit
- `setVillaPrice(price: number): void`
- `setDeposit(amount: number): void`

**Given** the provider wraps the app
**When** `useAffordability()` hook is called
**Then** components can read and update calculator state
**And** state changes trigger re-renders in all consuming components

**Given** the deposit or villa price changes
**When** the context updates
**Then** `monthlyPayment` is recalculated automatically
**And** the recalculation completes within 500ms (NFR7)

**Given** a user navigates to a villa detail page
**When** the page loads
**Then** the context automatically updates `villaPrice` to the villa's price

---

### Story 3.3: Display Pricing on Villa Cards and Detail Pages

As a **visitor**,
I want **to see pricing displayed clearly on every villa plan**,
So that **I know the cost upfront without having to ask** (FR8).

**Acceptance Criteria:**

**Given** I am browsing the villa listing page
**When** I view any VillaCard
**Then** the price is prominently displayed using `formatCurrency()`
**And** the price is visually prominent (larger font, bold)

**Given** I am on a villa detail page
**When** the page loads
**Then** the price is displayed near the villa name
**And** the price uses consistent formatting from `lib/utils.ts`

**Given** a villa has a promotional offer (FR12)
**When** I view the VillaCard or detail page
**Then** I see a promotional badge (e.g., "Early Bird: $5,000 off")
**And** the original price may be shown with strikethrough
**And** the promotional offer text is displayed

**Given** I am using a screen reader
**When** I encounter a price
**Then** it is announced clearly (e.g., "Price: one hundred fifty thousand dollars")

---

### Story 3.4: Build Financing Calculator Component

As a **visitor**,
I want **to use a financing calculator to see my monthly payment estimate**,
So that **I can understand if this villa is affordable for me** (FR9).

**Acceptance Criteria:**

**Given** I am on a villa detail page
**When** I scroll to the financing section
**Then** I see a FinancingCalculator component showing:
- Villa price (read-only, from context)
- Deposit input field (editable)
- Calculated monthly payment (auto-updates)
- Loan term and interest rate (displayed for transparency)

**Given** I interact with the deposit input (FR10)
**When** I type a deposit amount
**Then** the monthly payment updates in real-time
**And** the update occurs within 500ms (NFR7)
**And** the input validates for numbers only

**Given** I enter a deposit greater than the villa price
**When** the validation runs
**Then** I see an error message
**And** the calculator shows the maximum valid deposit

**Given** I clear the deposit field
**When** the field is empty
**Then** the calculator assumes $0 deposit
**And** shows the maximum monthly payment

**Given** I am on mobile
**When** I use the calculator
**Then** the numeric keyboard appears for the deposit input
**And** touch targets are at least 44x44px

---

### Story 3.5: Create StickyAffordabilityBar

As a **visitor**,
I want **to see my calculated monthly payment as I browse the villa page**,
So that **affordability stays top of mind while I explore** (FR11).

**Acceptance Criteria:**

**Given** I am on a villa detail page
**When** I scroll past the main calculator
**Then** a StickyAffordabilityBar appears at the bottom of the screen
**And** it shows: "Your villa from $X,XXX/mo" with current calculation
**And** it includes a WhatsApp CTA button (placeholder until Epic 4)

**Given** the sticky bar is visible
**When** I scroll back up to the calculator
**Then** the sticky bar hides smoothly
**And** there is no layout shift (CLS < 0.1)

**Given** I am on mobile
**When** the sticky bar is displayed
**Then** it respects safe-area-insets for notched devices
**And** it doesn't overlap critical content
**And** the WhatsApp button is within thumb reach

**Given** I update the deposit in the calculator
**When** the monthly payment changes
**Then** the StickyAffordabilityBar updates immediately
**And** the bar shows the same value as the calculator (via shared context)

**Given** I am using keyboard navigation
**When** I tab through the page
**Then** the sticky bar CTA is focusable
**And** it doesn't trap focus

---

### Story 3.6: Add Monthly Payment Messaging to Villa Cards

As a **visitor**,
I want **to see "Your villa from $X/month" on villa cards**,
So that **I can quickly assess affordability while browsing** (FR11).

**Acceptance Criteria:**

**Given** I am on the villa listing page
**When** I view VillaCards
**Then** each card shows estimated monthly payment below the price
**And** the format is "From $X,XXX/mo" using default deposit (e.g., 20%)

**Given** I have used the calculator on a previous villa
**When** I return to the listing page
**Then** the monthly estimates use my last entered deposit percentage
**And** this provides a personalized browsing experience

**Given** the monthly payment is displayed
**When** I hover/tap for more info
**Then** I see a tooltip: "Based on X% deposit, Y% interest, Z years"
**And** this helps users understand the estimate

**Given** the calculation uses defaults
**When** displayed on cards
**Then** a small note indicates "Estimate based on 20% deposit"
**And** users understand this is customizable on detail page

---

## Epic 4: Lead Capture & Communication

Visitors can contact constructon via WhatsApp, inquiry form, or phone, with pre-filled context from their browsing session.

### Story 4.1: Create WhatsApp URL Builder Utility

As a **developer**,
I want **a centralized WhatsApp URL builder**,
So that **all WhatsApp links are consistent and include proper context**.

**Acceptance Criteria:**

**Given** the project needs WhatsApp integration
**When** `lib/whatsapp.ts` is created
**Then** it exports:
- `WHATSAPP_NUMBER` from environment variable
- `WhatsAppContext` type with: villaName?, monthlyPayment?, deposit?, source
- `buildWhatsAppUrl(context: WhatsAppContext): string`

**Given** I call `buildWhatsAppUrl({ source: 'header' })`
**When** no villa context is provided
**Then** the URL is: `https://wa.me/263XXXXXXXXX?text=Hi, I'm interested in constructon villas.`

**Given** I call `buildWhatsAppUrl({ villaName: 'Signature Villa', monthlyPayment: 1500, deposit: 30000, source: 'sticky' })`
**When** full villa context is provided
**Then** the URL includes: `Hi, I'm interested in the Signature Villa. Calculator showed $1,500/month with $30,000 deposit.`
**And** the message is properly URL-encoded

**Given** a WhatsApp URL is generated
**When** it's used anywhere in the app
**Then** it ALWAYS uses `buildWhatsAppUrl()` (never hardcoded)
**And** this ensures consistency across all touchpoints

---

### Story 4.2: Build WhatsApp Button with CVA Variants

As a **visitor**,
I want **to contact constructon via WhatsApp from any page**,
So that **I can easily reach out when I'm ready** (FR13).

**Acceptance Criteria:**

**Given** WhatsAppButton component is created
**When** CVA (class-variance-authority) variants are defined
**Then** the button supports variants:
- `sticky` — fixed bottom bar style (used in StickyAffordabilityBar)
- `floating` — circular FAB style (bottom-right corner)
- `inline` — standard button style (within content)
- `header` — compact style for header navigation

**Given** I am on any page of the website
**When** the page loads
**Then** I see a floating WhatsApp button in the bottom-right corner
**And** it has the WhatsApp green color (#25D366)
**And** it includes the WhatsApp icon

**Given** I click the WhatsApp button
**When** WhatsApp opens (app or web)
**Then** the chat is pre-filled with context-appropriate message
**And** the correct constructon number is populated

**Given** I am on a villa detail page
**When** I click the floating WhatsApp button
**Then** the message includes the villa name and calculator values (if set)

**Given** I am on mobile
**When** I tap the WhatsApp button
**Then** the native WhatsApp app opens (if installed)
**And** the button has minimum 44x44px touch target

---

### Story 4.3: Add WhatsApp to Header and StickyAffordabilityBar

As a **visitor**,
I want **multiple convenient ways to reach WhatsApp**,
So that **I can contact constructon from wherever I am on the page** (FR13).

**Acceptance Criteria:**

**Given** I am viewing the site header
**When** I look at the navigation
**Then** I see a WhatsApp button (header variant)
**And** clicking it opens WhatsApp with generic message

**Given** I am on a villa detail page with StickyAffordabilityBar visible
**When** I view the sticky bar
**Then** I see a WhatsApp CTA button alongside the monthly payment
**And** clicking it opens WhatsApp with full villa context (name, price, monthly payment)

**Given** I am on mobile with sticky bar visible
**When** I view the screen
**Then** only one WhatsApp button is visible (sticky bar takes precedence)
**And** the floating button hides when sticky bar is showing
**And** this prevents button overlap and confusion

**Given** I am using keyboard navigation
**When** I tab through the page
**Then** all WhatsApp buttons are focusable and activatable
**And** they have proper aria-labels ("Contact us on WhatsApp")

---

### Story 4.4: Create Contact Page with Phone Number

As a **visitor**,
I want **to find the phone number to call directly**,
So that **I can speak with someone immediately if I prefer** (FR15).

**Acceptance Criteria:**

**Given** I navigate to `/contact`
**When** the page loads
**Then** I see:
- Page title "Contact Us"
- Phone number displayed prominently with click-to-call link
- WhatsApp button (inline variant)
- Email address
- Office address/location
- Business hours

**Given** I am on mobile
**When** I tap the phone number
**Then** the native phone dialer opens with the number pre-filled
**And** the link uses `tel:` protocol

**Given** I am on desktop
**When** I click the phone number
**Then** it attempts to open the default calling app
**Or** copies the number to clipboard with feedback message

**Given** the contact page displays information
**When** I view it
**Then** all contact methods are clearly labeled
**And** the page is accessible with proper heading structure

---

### Story 4.5: Build Inquiry Form with Server Action

As a **visitor**,
I want **to submit an inquiry form with my contact details**,
So that **constructon can reach out to me** (FR14).

**Acceptance Criteria:**

**Given** I am on the contact page
**When** I view the inquiry form
**Then** I see fields for:
- Full name (required)
- Email (required, validated)
- Phone number (required)
- Inquiry type dropdown: General, Site Visit Request, Customization Request
- Message (optional textarea)
- Preferred contact method: WhatsApp, Phone, Email

**Given** I fill out the form and submit
**When** the Server Action processes the submission
**Then** the action uses `ActionResponse<void>` return type
**And** Zod validates all input fields server-side
**And** on success: I see a success message and form resets
**And** on error: I see specific field errors displayed

**Given** the form is submitted successfully
**When** the Server Action completes
**Then** an email is sent via Resend API to the constructon team
**And** the email includes all form data formatted nicely
**And** the email subject indicates the inquiry type

**Given** I select "Site Visit Request" (FR16)
**When** the form displays
**Then** additional fields appear: preferred date, preferred time
**And** these are included in the submission

**Given** I select "Customization Request" (FR17)
**When** the form displays
**Then** a field appears for: which villa plan, customization details
**And** these are included in the submission

---

### Story 4.6: Implement Lead Source Attribution

As a **business owner**,
I want **to track where leads come from**,
So that **I can measure marketing effectiveness** (FR18).

**Acceptance Criteria:**

**Given** a visitor arrives via a marketing link with UTM parameters
**When** they land on the site
**Then** UTM parameters are captured: utm_source, utm_medium, utm_campaign
**And** they are stored in sessionStorage for the session duration

**Given** UTM parameters are stored
**When** the visitor submits an inquiry form
**Then** the UTM data is included in the form submission
**And** the email to the team shows lead source attribution

**Given** a visitor clicks a WhatsApp button
**When** the URL is generated
**Then** the source parameter identifies which button was clicked
**And** this can be tracked for analytics (Epic 7)

**Given** no UTM parameters are present
**When** the visitor submits a form
**Then** the source is recorded as "direct" or "organic"
**And** the referrer URL is captured if available

**Given** I view a submitted lead
**When** I check the attribution data
**Then** I can see: source, medium, campaign, landing page, referrer
**And** this helps identify which marketing channels work best

---

## Epic 5: Trust & Credibility

Visitors can verify constructon's legitimacy through company story, team profiles with video, testimonials, and diaspora-specific program information.

### Story 5.1: Create Sanity Schemas for Team and Testimonials

As a **content manager**,
I want **to manage team members and testimonials in Sanity CMS**,
So that **I can update trust content without code changes**.

**Acceptance Criteria:**

**Given** Sanity needs team member content
**When** the `teamMember` schema is created
**Then** it includes:
- name (string, required)
- role (string, required)
- bio (text)
- photo (image with hotspot)
- videoUrl (URL, optional - for video intro)
- credentials (array of strings - certifications, qualifications)
- order (number - for display ordering)

**Given** Sanity needs testimonial content
**When** the `testimonial` schema is created
**Then** it includes:
- clientName (string, required)
- clientLocation (string - e.g., "London, UK" for diaspora)
- quote (text, required)
- projectType (string - e.g., "Executive Villa")
- photo (image, optional)
- videoUrl (URL, optional)
- featured (boolean - for homepage display)

**Given** schemas are deployed
**When** I access Sanity Studio
**Then** I can create and manage team members and testimonials
**And** I can reorder team members by drag-and-drop or order field

---

### Story 5.2: Build About Page with Company Story

As a **visitor**,
I want **to view the company story and mission**,
So that **I understand who constructon is and what they stand for** (FR19).

**Acceptance Criteria:**

**Given** I navigate to `/about`
**When** the page loads
**Then** I see:
- Hero section with company vision headline
- Founder story section (who started constructon, why)
- Mission statement prominently displayed
- Company values (transparency, quality, innovation)
- Key differentiators (smart homes, Western quality, trust)

**Given** the about page content exists
**When** I scroll through the page
**Then** the content is engaging with:
- Quality imagery (team, completed projects)
- Pull quotes highlighting key messages
- Visual timeline or milestones (optional)

**Given** I am a diaspora visitor (FR24)
**When** I view the about page
**Then** I see a section specifically addressing diaspora concerns:
- "Building Trust Across Borders" messaging
- Remote monitoring commitments
- Weekly update promises
- Link to diaspora program details

**Given** I am using a screen reader
**When** I navigate the about page
**Then** all content is properly structured
**And** images have meaningful alt text describing the company

---

### Story 5.3: Create Team Page with Profile Cards

As a **visitor**,
I want **to view team member profiles with their credentials**,
So that **I can trust the people who will build my home** (FR20).

**Acceptance Criteria:**

**Given** I navigate to `/team`
**When** the page loads
**Then** I see a grid of TeamProfileCard components
**And** cards are ordered by the `order` field from Sanity

**Given** I view a TeamProfileCard
**When** it renders
**Then** I see:
- Team member photo (circular crop)
- Name and role
- Brief bio snippet
- Credentials/qualifications badges
- "Watch Video" button (if video exists)

**Given** a team member has credentials
**When** they are displayed
**Then** credentials appear as badges/pills below the bio
**And** they provide social proof (e.g., "Certified Architect", "15 Years Experience")

**Given** I click on a TeamProfileCard
**When** the interaction occurs
**Then** a modal/sheet opens with full bio details
**And** full credentials list is shown
**And** video player is embedded (if video exists)

**Given** I am on mobile
**When** I view the team grid
**Then** cards stack in a single column
**And** all content remains readable
**And** tap targets are appropriately sized

---

### Story 5.4: Implement Video Introductions with LazyVideo

As a **visitor**,
I want **to watch video introductions from team members**,
So that **I can connect with the people behind constructon** (FR21).

**Acceptance Criteria:**

**Given** a team member has a video introduction
**When** I click "Watch Video" on their profile
**Then** a LazyVideo component loads and plays the video
**And** the video doesn't autoplay (respects user control)

**Given** the LazyVideo component is implemented
**When** videos are on the page but not in viewport
**Then** videos are NOT loaded (Intersection Observer)
**And** a thumbnail/placeholder is shown instead
**And** this optimizes page performance

**Given** I click play on a lazy-loaded video
**When** the video starts loading
**Then** I see a loading skeleton/spinner
**And** the video plays when ready
**And** controls are visible (play, pause, volume, fullscreen)

**Given** I am on a slow connection
**When** videos are present
**Then** they don't block page load
**And** main content is prioritized
**And** video quality adapts if possible (or uses reasonable default)

**Given** the user prefers reduced motion
**When** the page loads
**Then** video thumbnails are static (no auto-preview)
**And** the preference is respected

---

### Story 5.5: Build Testimonials Section with TestimonialCard

As a **visitor**,
I want **to read client testimonials**,
So that **I can see social proof from real customers** (FR22).

**Acceptance Criteria:**

**Given** testimonials exist in Sanity
**When** I view testimonials on the site
**Then** TestimonialCard components display:
- Client quote (with quotation styling)
- Client name
- Client location (important for diaspora trust)
- Project type (e.g., "Executive Villa")
- Client photo (if available)

**Given** I am on the homepage
**When** featured testimonials are displayed
**Then** only testimonials marked `featured: true` appear
**And** they display in a carousel or grid
**And** maximum 3-4 are shown with "See all" link

**Given** testimonials have video content
**When** displayed
**Then** a play button overlay indicates video testimonial
**And** clicking plays the video in a modal

**Given** I navigate to a dedicated testimonials section
**When** the page/section loads
**Then** all testimonials are displayed
**And** they can be filtered by project type or location

**Given** I am a diaspora visitor
**When** I view testimonials
**Then** I can identify other diaspora clients by location
**And** this builds trust for overseas customers

---

### Story 5.6: Create TrustBadge Component and Display

As a **visitor**,
I want **to see "constructon Verified" badges on projects**,
So that **I know projects meet quality standards** (FR23).

**Acceptance Criteria:**

**Given** TrustBadge component is created
**When** it renders
**Then** it displays:
- "constructon Verified" text with checkmark icon
- Distinctive styling (gold/premium color)
- Tooltip explaining what verification means

**Given** I view a villa card or detail page
**When** the villa is verified
**Then** the TrustBadge appears near the villa name
**And** it's visually prominent but not overwhelming

**Given** I hover/tap on the TrustBadge
**When** the tooltip appears
**Then** it explains: "This plan meets constructon's quality standards including materials verification, design review, and smart home certification"

**Given** trust badges are shown throughout the site
**When** displayed
**Then** they appear consistently:
- On villa cards (small version)
- On villa detail pages (larger version)
- In testimonials (if client verified)
- On completed projects gallery

**Given** a TrustBadgeRow component is needed
**When** displaying multiple trust signals
**Then** it shows a row of badges:
- constructon Verified
- Smart Home Certified
- Quality Materials
- Transparent Pricing

---

### Story 5.7: Build Process Transparency Section

As a **visitor**,
I want **to understand the build process and transparency commitments**,
So that **I know what to expect and can trust the journey** (FR25).

**Acceptance Criteria:**

**Given** I want to understand the build process
**When** I navigate to the process section (on About or dedicated page)
**Then** I see a visual timeline showing:
- Step 1: Consultation & Design Selection
- Step 2: Contract & Deposit
- Step 3: Foundation Phase (with milestone celebration)
- Step 4: Structure Phase (walls, roof)
- Step 5: Finishing Phase (interiors, smart home)
- Step 6: Handover Ceremony

**Given** each build phase is displayed
**When** I view the details
**Then** I see:
- What happens in this phase
- Expected duration range
- What updates I'll receive
- Milestone celebration details

**Given** I am a diaspora customer (FR24)
**When** I view the process section
**Then** I see specific diaspora program details:
- Weekly video updates promise
- Build Tracker Dashboard mention (future feature)
- Dedicated project manager
- Timezone-friendly communication

**Given** the transparency commitments are displayed
**When** I read them
**Then** I see concrete promises:
- "Transparent pricing - no hidden costs"
- "Weekly progress updates"
- "Direct access to your project manager"
- "Quality materials verified and documented"

---

## Epic 6: Content & Resources

Visitors can learn about building, investing, smart home technology, and make informed decisions through comprehensive resources.

### Story 6.1: Create Sanity Schema for Completed Projects

As a **content manager**,
I want **to showcase completed projects in Sanity CMS**,
So that **I can add new projects as they finish without code changes**.

**Acceptance Criteria:**

**Given** Sanity needs completed projects content
**When** the `completedProject` schema is created
**Then** it includes:
- title (string, required)
- slug (slug)
- location (string - e.g., "Borrowdale, Harare")
- completionDate (date)
- villaType (reference to villa schema)
- clientType (enum: local, diaspora, investor)
- galleryImages (array of images, required)
- description (text)
- testimonialRef (reference to testimonial, optional)
- featured (boolean)

**Given** schemas are deployed
**When** I access Sanity Studio
**Then** I can create completed project entries
**And** I can upload multiple gallery images
**And** I can link to the original villa plan and client testimonial

**Given** a project is marked featured
**When** the homepage loads
**Then** featured projects appear in the showcase section

---

### Story 6.2: Build Completed Projects Gallery

As a **visitor**,
I want **to view a gallery of completed construction projects**,
So that **I can see proof that constructon delivers quality work** (FR6).

**Acceptance Criteria:**

**Given** I navigate to the completed projects section
**When** the gallery loads
**Then** I see a CompletedProjectGallery component showing:
- Grid of project cards with hero image
- Project title and location
- Villa type badge (Starter/Executive/Signature)
- Client type indicator (Local/Diaspora/Investor)

**Given** I click on a completed project card
**When** the detail view opens
**Then** I see:
- Full image gallery with swipe/navigation
- Project description
- Villa specifications
- Client testimonial (if linked)
- "Build a villa like this" CTA linking to the villa plan

**Given** I am a diaspora visitor
**When** I view completed projects
**Then** I can filter by "Diaspora Client" projects
**And** seeing successful diaspora builds increases my confidence

**Given** I am on the homepage
**When** featured projects are displayed
**Then** 3-4 featured projects appear in a carousel/grid
**And** "View All Projects" link navigates to full gallery

**Given** I am on mobile
**When** I browse the gallery
**Then** project cards are swipeable
**And** images load progressively with blur placeholders

---

### Story 6.3: Create FAQ Page for First-Time Builders

As a **first-time builder**,
I want **to access guides and FAQ resources**,
So that **I can understand the building process and feel confident** (FR26).

**Acceptance Criteria:**

**Given** I navigate to `/faq`
**When** the page loads
**Then** I see:
- Page title "First-Time Builder Guide"
- Introduction text welcoming first-time builders
- FAQ sections organized by category
- WhatsApp CTA for additional questions

**Given** FAQ content is displayed
**When** I view the categories
**Then** I see accordion sections for:
- Getting Started (What's the process? How long does it take?)
- Financing (How do I pay? What deposit is needed?)
- Land & Location (Do I need land? Can you help find land?)
- Design & Customization (Can I modify plans? What's included?)
- During Construction (How will I be updated? Can I visit?)
- After Completion (What warranty? What about maintenance?)

**Given** I click on an FAQ category
**When** the accordion expands
**Then** I see 4-6 questions with answers
**And** answers include helpful links where relevant
**And** only one category is expanded at a time

**Given** I am on mobile
**When** I interact with the accordion
**Then** touch targets are appropriately sized
**And** expand/collapse animations are smooth
**And** content doesn't cause layout shift

**Given** FAQ content needs updating
**When** managed in Sanity
**Then** FAQ items can be edited in the CMS
**And** new questions can be added without code changes

---

### Story 6.4: Build Investment Information Section

As an **investor**,
I want **to view turnkey investment package information**,
So that **I can evaluate constructon villas as an investment** (FR27).

**Acceptance Criteria:**

**Given** I am interested in investment opportunities
**When** I navigate to the investment section
**Then** I see:
- "Invest in constructon Villas" headline
- Value proposition for investors
- Turnkey package explanation
- Key benefits (rental income, appreciation, turnkey)

**Given** the turnkey package is explained
**When** I read the details
**Then** I understand:
- What's included (build, furnishing, property management intro)
- The hands-off nature of the investment
- How rental management works
- Expected involvement level

**Given** I am viewing investment content
**When** I scroll through
**Then** I see trust signals:
- Investor testimonials
- Completed investor projects
- Professional credentials

**Given** I want more information
**When** I reach the CTA section
**Then** I see:
- "Schedule Investment Consultation" button
- Phone number for direct contact (investors prefer phone)
- Download investment brochure option (optional/future)

---

### Story 6.5: Create ROI Projections Display

As an **investor**,
I want **to view ROI projections and rental information**,
So that **I can assess the financial viability of investing** (FR28).

**Acceptance Criteria:**

**Given** I am on the investment section
**When** I view ROI projections
**Then** I see:
- Projected rental yield range (e.g., "12-16% annual")
- Sample calculation breakdown
- Assumptions clearly stated
- Comparison to other investment types

**Given** ROI projections are displayed
**When** I view a sample calculation
**Then** I see a clear breakdown:
- Villa purchase price: $XXX,XXX
- Estimated monthly rental: $X,XXX
- Annual rental income: $XX,XXX
- Estimated annual yield: XX%
- 5-year appreciation projection

**Given** projections are shown
**When** disclaimers are displayed
**Then** clear text indicates:
- "Projections based on current market data"
- "Past performance doesn't guarantee future results"
- "Individual results may vary"

**Given** I am on mobile
**When** I view ROI tables/charts
**Then** they are responsive and readable
**And** horizontal scroll is available for wide tables if needed

---

### Story 6.6: Build Land Partnership Information Page

As a **visitor without land**,
I want **to view land partnership information**,
So that **I understand my options for acquiring land** (FR29).

**Acceptance Criteria:**

**Given** I don't own land yet
**When** I navigate to land information
**Then** I see:
- "Don't Have Land Yet?" section
- Explanation of land partnership options
- Areas/locations constructon operates in
- Land acquisition support offered

**Given** land partnerships are explained
**When** I read the details
**Then** I understand:
- constructon can recommend land partners
- Assistance with land identification
- Guidance on location selection
- What to look for in villa land

**Given** I want help finding land
**When** I reach the CTA
**Then** I can:
- Submit a "Help Me Find Land" inquiry
- Specify preferred areas
- Indicate budget range
- Request a consultation

**Given** prime villa locations are highlighted
**When** displayed
**Then** I see featured areas:
- Borrowdale, Harare
- Glen Lorne
- Other premium suburbs
**And** brief description of each area's benefits

---

### Story 6.7: Create Smart Home Technology Showcase

As a **visitor**,
I want **to learn about smart home technology offerings**,
So that **I understand what makes constructon villas special** (FR30).

**Acceptance Criteria:**

**Given** I want to learn about smart home features
**When** I navigate to the smart home section
**Then** I see:
- "Smart Home Living" headline
- Overview of what smart home means
- Visual showcase of features
- "Included as Standard" messaging

**Given** smart home features are displayed
**When** I view the feature list
**Then** I see categories:
- **Lighting**: Voice control, automated scenes, energy saving
- **Security**: Smart locks, automated gates, camera integration
- **Climate**: App-controlled AC, temperature scheduling
- **Entertainment**: Whole-home audio ready, smart TV integration
- **Convenience**: Voice assistants, automated routines

**Given** each feature category is shown
**When** I view details
**Then** I see:
- Icon/illustration for the category
- Bullet points of specific features
- "How it works" brief explanation
- Photo showing the feature in a constructon villa

**Given** I am skeptical about smart home in Zimbabwe
**When** I read the section
**Then** concerns are addressed:
- Local support availability
- Power backup considerations
- Reliability information
- Maintenance simplicity

---

### Story 6.8: Build Villa Tier Comparison Component

As a **visitor**,
I want **to compare villa tiers side-by-side**,
So that **I can choose the right tier for my needs and budget** (FR31).

**Acceptance Criteria:**

**Given** I want to compare villa tiers
**When** I view the tier comparison section
**Then** I see a TierComparison component with columns:
- Starter Villa
- Executive Villa
- Signature Villa

**Given** the comparison table is displayed
**When** I view the rows
**Then** I can compare across:
- Price range
- Size range (sqm)
- Bedrooms/Bathrooms
- Smart home features (basic → full)
- Customization level
- Typical buyer profile
- Monthly payment estimate

**Given** each tier column is shown
**When** I view tier details
**Then** I see:
- Tier name with distinctive color
- TierBadge component
- "Starting from $XXX,XXX"
- "View Plans" CTA button

**Given** I am on mobile
**When** I view the comparison
**Then** the table is horizontally scrollable
**Or** tabs allow switching between tiers
**And** content remains readable without zooming

**Given** I click "View Plans" for a tier
**When** I navigate
**Then** I go to `/villas?tier=starter` (or executive/signature)
**And** the filter is pre-applied

---

## Epic 7: Analytics & Optimization

Business can track visitor behavior, conversion events, and optimize the website based on data.

### Story 7.1: Create Analytics Utilities and Event Types

As a **developer**,
I want **centralized analytics utilities with typed events**,
So that **tracking is consistent and type-safe across the application**.

**Acceptance Criteria:**

**Given** the project needs analytics tracking
**When** `lib/analytics.ts` is created
**Then** it exports:
- `AnalyticsEvent` type with all valid event names
- `trackEvent(event: AnalyticsEvent, properties?: Record<string, unknown>): void`
- `trackPageView(url: string, title: string): void`
- `identifyUser(userId?: string): void`

**Given** analytics events are defined
**When** the type is created
**Then** it includes events following `category_action` format:
- villa_view, villa_gallery_swipe, villa_filter_tier
- calculator_use, calculator_deposit_change, calculator_complete
- whatsapp_click, inquiry_form_start, inquiry_form_submit
- phone_click, video_play, faq_expand

**Given** `trackEvent` is called
**When** the function executes
**Then** it sends to GA4 via `gtag('event', ...)`
**And** it sends to Meta Pixel via `fbq('track', ...)`
**And** errors are caught and logged (don't break the app)

---

### Story 7.2: Implement Google Analytics 4 Integration

As a **business owner**,
I want **Google Analytics 4 tracking on the website**,
So that **I can understand visitor behavior and measure success** (FR38).

**Acceptance Criteria:**

**Given** GA4 needs to be integrated
**When** the setup is complete
**Then**:
- GA4 script is loaded via Next.js Script component
- `NEXT_PUBLIC_GA_ID` environment variable is used
- Script loads with `afterInteractive` strategy
- No tracking occurs if GA_ID is not set (dev safety)

**Given** a visitor lands on any page
**When** the page loads
**Then** a pageview is automatically tracked
**And** the page URL and title are sent to GA4

**Given** the visitor navigates between pages
**When** client-side navigation occurs
**Then** pageviews are tracked for each route change
**And** the App Router navigation is properly instrumented

**Given** GA4 is loaded
**When** custom events are tracked via `trackEvent()`
**Then** events appear in GA4 Realtime view
**And** event parameters are properly attached

**Given** the site fails to load GA4 script
**When** analytics functions are called
**Then** the site continues to function normally
**And** errors are silently logged

---

### Story 7.3: Implement Meta Pixel Integration

As a **marketing manager**,
I want **Meta Pixel tracking for Facebook/Instagram ads**,
So that **I can measure ad effectiveness and build retargeting audiences** (FR39).

**Acceptance Criteria:**

**Given** Meta Pixel needs to be integrated
**When** the setup is complete
**Then**:
- Meta Pixel base code is loaded
- `NEXT_PUBLIC_META_PIXEL_ID` environment variable is used
- PageView is tracked automatically on load

**Given** a visitor views a villa detail page
**When** the page loads
**Then** a `ViewContent` event is sent with:
- content_name: villa name
- content_category: villa tier
- value: villa price
- currency: USD

**Given** a visitor submits an inquiry form
**When** the form is successfully submitted
**Then** a `Lead` event is sent to Meta Pixel
**And** the lead can be attributed to ad campaigns

**Given** a visitor clicks WhatsApp
**When** the click is tracked
**Then** a `Contact` event is sent to Meta Pixel
**And** WhatsApp conversions can be measured

**Given** Meta Pixel script fails to load
**When** the site is used
**Then** all functionality continues to work
**And** tracking gracefully degrades

---

### Story 7.4: Create AnalyticsProvider Component

As a **developer**,
I want **an AnalyticsProvider that initializes tracking**,
So that **analytics is properly set up across the application**.

**Acceptance Criteria:**

**Given** analytics needs app-wide initialization
**When** AnalyticsProvider is created
**Then** `src/providers/AnalyticsProvider.tsx` provides:
- GA4 initialization on mount
- Meta Pixel initialization on mount
- Route change tracking for SPA navigation
- Context for any shared analytics state

**Given** AnalyticsProvider wraps the app
**When** the app loads
**Then** both GA4 and Meta Pixel are initialized
**And** initial pageview is tracked
**And** provider is added to root layout

**Given** the user navigates between pages
**When** using Next.js App Router navigation
**Then** `usePathname()` and `useSearchParams()` detect changes
**And** pageviews are tracked for each navigation

**Given** environment variables are missing
**When** the app loads in development
**Then** console warnings indicate missing config
**And** tracking is skipped (no errors thrown)

---

### Story 7.5: Track Conversion Events

As a **business owner**,
I want **to track lead conversion events**,
So that **I can measure which actions lead to inquiries** (FR39).

**Acceptance Criteria:**

**Given** a visitor clicks any WhatsApp button
**When** the click occurs
**Then** `trackEvent('whatsapp_click', { source, villaName?, page })` is called
**And** the source identifies which button (header, floating, sticky, inline)
**And** villa context is included if on a villa page

**Given** a visitor submits the inquiry form
**When** the submission succeeds
**Then** `trackEvent('inquiry_form_submit', { inquiryType, source })` is called
**And** GA4 receives the conversion event
**And** Meta Pixel receives a Lead event

**Given** a visitor starts filling the inquiry form
**When** they interact with the first field
**Then** `trackEvent('inquiry_form_start')` is called
**And** this helps measure form abandonment

**Given** a visitor clicks the phone number
**When** the click occurs
**Then** `trackEvent('phone_click', { page })` is called
**And** phone conversions can be measured

**Given** conversion events are tracked
**When** I view GA4 reports
**Then** I can see conversion rates by:
- Traffic source
- Landing page
- Device type
- Villa viewed

---

### Story 7.6: Track Villa Engagement Metrics

As a **business owner**,
I want **to measure engagement on villa plan pages**,
So that **I can optimize the most important content** (FR40).

**Acceptance Criteria:**

**Given** a visitor views a villa detail page
**When** the page loads
**Then** `trackEvent('villa_view', { villaName, tier, price })` is called
**And** this tracks which villas get the most views

**Given** a visitor uses the photo gallery
**When** they swipe or click through images
**Then** `trackEvent('villa_gallery_swipe', { villaName, imageIndex })` is called
**And** engagement depth is measured

**Given** a visitor uses the financing calculator
**When** they change the deposit amount
**Then** `trackEvent('calculator_deposit_change', { villaName, deposit })` is called
**And** calculator engagement is tracked

**Given** a visitor completes a calculator session
**When** they've viewed the monthly payment result
**Then** `trackEvent('calculator_complete', { villaName, deposit, monthlyPayment })` is called
**And** calculator completion rate can be measured

**Given** a visitor filters villas by tier
**When** a filter is applied
**Then** `trackEvent('villa_filter_tier', { tier })` is called
**And** tier preference data is collected

---

### Story 7.7: Identify Return Visitors

As a **business owner**,
I want **to identify return visitors**,
So that **I can understand customer journey patterns** (FR41).

**Acceptance Criteria:**

**Given** a visitor lands on the site
**When** the analytics initializes
**Then** GA4's built-in new vs returning detection is utilized
**And** this data is available in GA4 reports

**Given** a visitor returns to the site
**When** they are identified as returning
**Then** a custom dimension `visitor_type: returning` is set
**And** returning visitor behavior can be analyzed separately

**Given** a visitor has previously viewed specific villas
**When** they return to the site
**Then** localStorage tracks viewed villa slugs
**And** this enables "Recently Viewed" features (future)
**And** analytics can report on cross-session engagement

**Given** privacy is respected
**When** tracking occurs
**Then** no PII is collected without consent
**And** tracking is cookie-based per GA4 defaults
**And** users can opt out via browser settings

**Given** I view GA4 audience reports
**When** analyzing user segments
**Then** I can see:
- New vs returning visitors
- Sessions per user
- Pages per session
- Returning visitor conversion rate

