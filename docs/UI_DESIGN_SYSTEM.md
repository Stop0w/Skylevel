
# Skylevel UI Design System

**Version**: 1.0
**Date**: January 2025
**Status**: Greenfield Rebuild Design System
**Framework**: Tailwind CSS + shadcn/ui

---

## ⚠️ Important: Design System Updated to Skylevel Brand Colors

**Current State**: This file contains legacy RGB color values
**Updated System**: See [.design-system/04_style-guide.md](../.design-system/04_style-guide.md) for the official Skylevel color palette

This documentation has been **updated** to use the official Skylevel color palette based on the brand inspiration images. All new development should use the Skylevel color system defined in `tailwind.config.js` and documented in [.design-system/04_style-guide.md](../.design-system/04_style-guide.md).

**Key Changes**:
- ✅ Official Skylevel brand colors (Blue, Coral, Gold, Success)
- ✅ Dual theme support (Light & Dark)
- ✅ Enhanced component system with ScorePill focus
- ✅ Comprehensive design tokens

---

---

## Design Philosophy

**Principles**:
1. **Speed**: Every UI element accelerates decision-making
2. **Clarity**: Information hierarchy is obvious at a glance
3. **Trust**: Visual design reinforces data confidence
4. **Accessibility**: WCAG 2.1 AA compliant by default

---

## Color System

### Skylevel Brand Colors (Tailwind Config)

```javascript
// tailwind.config.js - Updated with official Skylevel palette
colors: {
  // Skylevel Blue (Primary brand color)
  skylevel: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#2563EB',  // Main brand blue
    600: '#1D4ED8',
    700: '#1E40AF',
    800: '#1E3A8A',
    900: '#172554',
    950: '#0F172A',
  },

  // Skylevel Coral (Accent & highlights)
  coral: {
    50: '#FFF1F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',  // Main coral accent
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
    950: '#450A0A',
  },

  // Gold Excellence (High scores)
  gold: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',  // Main gold
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
    950: '#451A03',
  },

  // Success Green (Good scores)
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',  // Main success
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
    950: '#052E16',
  },

  // Neutral (Dual theme support)
  neutral: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
    950: '#020617',
  },
}
```

### Color Usage Guidelines

#### Light Theme Usage

| Color | Usage | Example |
|-------|-------|---------|
| `skylevel-500` | Primary actions, CTA buttons | "Apply Now", "Schedule Interview" |
| `gold-500` | Highlights, scores 85+ | High Fit Scores, Hot Candidates |
| `success-500` | Good scores, positive states | Scores 70-84, "Application Received" |
| `coral-500` | Alerts, low scores | Scores <50, warnings |
| `white` | Background | Main canvas, cards |
| `neutral-900` | Primary text | Headings, body text |
| `neutral-600` | Secondary text | Metadata, timestamps |

#### Dark Theme Usage

| Color | Usage | Example |
|-------|-------|---------|
| `skylevel-400` | Primary actions, CTA buttons | "Apply Now", "Schedule Interview" |
| `gold-400` | Highlights, scores 85+ | High Fit Scores, Hot Candidates |
| `success-400` | Good scores, positive states | Scores 70-84, "Application Received" |
| `coral-400` | Alerts, low scores | Scores <50, warnings |
| `neutral-900` | Background | Main canvas, cards |
| `white` | Primary text | Headings, body text |
| `neutral-300` | Secondary text | Metadata, timestamps |

---

## Typography

### Font Stack

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
             'Helvetica Neue', Arial, sans-serif;
```

### Type Scale (Tailwind)

```javascript
// tailwind.config.js
fontSize: {
  xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px
  sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
  base: ['1rem', { lineHeight: '1.5rem' }],     // 16px
  lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
  xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
  '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
  '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
  '5xl': ['3rem', { lineHeight: '1' }],           // 48px
}
```

### Typography Usage

| Element | Class | Usage |
|---------|-------|-------|
| **H1** | `text-5xl font-bold` | Page titles |
| **H2** | `text-3xl font-semibold` | Section headers |
| **H3** | `text-2xl font-semibold` | Card headers |
| **H4** | `text-xl font-medium` | Subsection headers |
| **Body** | `text-base` | Primary content |
| **Small** | `text-sm` | Metadata, captions |
| **Micro** | `text-xs` | Timestamps, labels |

---

## Component Library

### Button System

```typescript
// shadcn/ui button variants
<Button variant="default">Primary Action</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Tertiary</Button>
<Button variant="ghost">Subtle Action</Button>
<Button variant="destructive">Delete/Remove</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
```

**Visual Styles**:
- `default`: `bg-primary-600 hover:bg-primary-700 text-white`
- `secondary`: `bg-accent-400 hover:bg-accent-500 text-neutral-950`
- `outline`: `border-2 border-primary-600 text-primary-600 hover:bg-primary-600/10`
- `ghost`: `hover:bg-neutral-800 text-neutral-50`

---

### Score Pill Component

**Purpose**: Display Fit Scores consistently across the app

```tsx
// ScorePill.tsx
interface ScorePillProps {
  score: number;           // 0-100
  size?: 'sm' | 'md' | 'lg';
  showBreakdown?: boolean;
  confidence?: 'high' | 'medium' | 'low';
}

// Visual logic
score >= 85: bg-accent-400 (gold)
score >= 70: bg-success-500 (green)
score >= 50: bg-warning-500 (orange)
score < 50:  bg-error-500 (red)
```

**Sizes**:
- `sm`: 32px height, text-sm
- `md`: 40px height, text-base (default)
- `lg`: 56px height, text-xl

---

### Card Component

```tsx
// Base card (shadcn/ui)
<Card className="bg-neutral-900 border-neutral-800">
  <CardHeader>
    <CardTitle>Candidate Name</CardTitle>
    <CardDescription>Senior Frontend Developer</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

**Variants**:
- **Candidate Card**: Compact info, score pill, quick actions
- **Job Card**: Title, skills, status badge
- **Shortlist Card**: Draggable, compare checkbox

---

### Modal System

```tsx
// shadcn/ui dialog
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Candidate Profile</DialogTitle>
      <DialogDescription>
        Detailed view of candidate information
      </DialogDescription>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

**Modal Types**:
- **Full-screen**: Candidate profiles, comparisons
- **Medium**: Shortlist actions, filters
- **Small**: Confirmations, alerts

---

## Layout System

### Container

```tsx
<div className="container mx-auto px-4 max-w-7xl">
  {/* Content */}
</div>
```

**Breakpoints**:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

---

### Grid System

```tsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <CandidateCard />
  <CandidateCard />
  <CandidateCard />
</div>
```

---

## Spacing Scale

```javascript
// Tailwind spacing (4px base)
spacing: {
  px: '1px',
  0: '0',
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  6: '1.5rem',   // 24px
  8: '2rem',     // 32px
  12: '3rem',    // 48px
  16: '4rem',    // 64px
}
```

**Usage Guidelines**:
- Padding: `p-4` (16px) for cards, `p-6` (24px) for sections
- Margin: `mb-6` (24px) between sections, `mb-4` (16px) between elements
- Gap: `gap-4` (16px) for grids, `gap-6` (24px) for sections

---

## Icons

**Library**: Lucide React (tree-shakeable)

```tsx
import { User, Briefcase, Star, CheckCircle } from 'lucide-react';

<User className="w-5 h-5 text-neutral-300" />
```

**Icon Sizes**:
- `w-4 h-4`: Small (16px)
- `w-5 h-5`: Default (20px)
- `w-6 h-6`: Medium (24px)
- `w-8 h-8`: Large (32px)

---

## Interactive States

### Hover States

```css
/* Button */
hover:bg-primary-700
hover:scale-105
transition-all duration-200

/* Card */
hover:shadow-lg
hover:border-primary-600
transition-shadow duration-300
```

### Focus States (Accessibility)

```css
focus:outline-none
focus:ring-2
focus:ring-primary-500
focus:ring-offset-2
focus:ring-offset-neutral-950
```

### Loading States

```tsx
// Skeleton loader
<div className="animate-pulse bg-neutral-800 h-20 rounded-lg" />

// Spinner
<Loader2 className="w-6 h-6 animate-spin" />
```

---

## Animations

### Transitions

```javascript
// tailwind.config.js
extend: {
  animation: {
    'fade-in': 'fadeIn 0.3s ease-out',
    'slide-up': 'slideUp 0.3s ease-out',
    'slide-down': 'slideDown 0.3s ease-out',
  },
  keyframes: {
    fadeIn: {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' },
    },
    slideUp: {
      '0%': { transform: 'translateY(10px)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
    slideDown: {
      '0%': { transform: 'translateY(-10px)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
  },
}
```

---

## Form Components

### Input Fields

```tsx
<Input 
  type="text" 
  placeholder="Enter name"
  className="bg-neutral-900 border-neutral-700 focus:border-primary-500"
/>
```

### Select Dropdown

```tsx
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select role" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="frontend">Frontend Developer</SelectItem>
    <SelectItem value="backend">Backend Developer</SelectItem>
  </SelectContent>
</Select>
```

### Checkbox & Radio

```tsx
<Checkbox id="shortlist" className="border-neutral-700" />
<Label htmlFor="shortlist">Add to shortlist</Label>
```

---

## Accessibility Guidelines

### Color Contrast
- Text on background: Minimum 4.5:1 ratio (WCAG AA)
- Large text (18px+): Minimum 3:1 ratio
- Interactive elements: Minimum 3:1 ratio

### Focus Indicators
- All interactive elements must have visible focus state
- Use `focus:ring-2` pattern consistently

### ARIA Labels
```tsx
<button aria-label="Close modal">
  <X className="w-4 h-4" />
</button>
```

### Keyboard Navigation
- All actions accessible via keyboard
- Tab order follows visual flow
- Escape closes modals

---

## Responsive Design

### Mobile-First Approach

```tsx
// Start with mobile, scale up
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>

<div className="p-4 md:p-6 lg:p-8">
  Responsive padding
</div>
```

### Breakpoint Strategy (Mobile-First)

| Breakpoint | Width | Device | Touch Targets | Layout |
|------------|-------|--------|---------------|--------|
| Default | 0-640px | Mobile | 44px min | Single column, bottom nav |
| `md` | 768px+ | Tablet | 44px min | Expanded cards, hybrid nav |
| `lg` | 1024px+ | Laptop | Hover OK | Multi-column, sidebar |
| `xl` | 1280px+ | Desktop | Hover OK | Full features, keyboard |

**Mobile-First Examples**:

```tsx
// Typography scales up
<h1 className="text-2xl md:text-3xl lg:text-4xl">
  Fit Score: 89
</h1>

// Padding increases with screen size
<div className="p-4 md:p-6 lg:p-8">
  {/* Content */}
</div>

// Hidden on mobile, visible on desktop
<aside className="hidden lg:block">
  {/* Sidebar navigation */}
</aside>

// Bottom nav on mobile, sidebar on desktop
<nav className="
  fixed bottom-0 left-0 right-0 lg:static lg:h-screen
  flex flex-row lg:flex-col
">
  {/* Navigation items */}
</nav>
```

---

## Dark Mode (Default)

Skylevel uses dark mode by default. Light mode is not supported in v1.

**Background Hierarchy**:
- Primary: `bg-neutral-950` (#0A0606)
- Secondary: `bg-neutral-900` (#1A0F0F)
- Tertiary: `bg-neutral-800` (#2B1B1B)

**Text Hierarchy**:
- Primary: `text-neutral-50` (#F5F2E8)
- Secondary: `text-neutral-300` (#A68A8A)
- Tertiary: `text-neutral-400` (#8B6B6B)

---

## Component Checklist

### Must-Have Components (Week 1)

- [ ] Button (all variants)
- [ ] Input, Select, Checkbox
- [ ] Card (candidate, job, shortlist)
- [ ] Modal/Dialog
- [ ] ScorePill
- [ ] Toast notifications
- [ ] Loading spinner/skeleton

### Nice-to-Have Components (Week 2)

- [ ] Tabs
- [ ] Accordion
- [ ] Tooltip
- [ ] Badge
- [ ] Avatar
- [ ] Dropdown menu

---

## Design Tokens (CSS Variables)

```css
:root {
  /* Colors */
  --color-primary: 165 42 82;     /* primary-500 */
  --color-accent: 212 175 55;     /* accent-400 */
  --color-bg: 10 6 6;             /* neutral-950 */
  --color-text: 245 242 232;      /* neutral-50 */
  
  /* Spacing */
  --spacing-xs: 0.25rem;  /* 4px */
  --spacing-sm: 0.5rem;   /* 8px */
  --spacing-md: 1rem;     /* 16px */
  --spacing-lg: 1.5rem;   /* 24px */
  --spacing-xl: 2rem;     /* 32px */
  
  /* Radius */
  --radius-sm: 0.25rem;   /* 4px */
  --radius-md: 0.5rem;    /* 8px */
  --radius-lg: 0.75rem;   /* 12px */
  --radius-xl: 1rem;      /* 16px */
}
```

---

## Usage Examples

### Candidate Card

```tsx
<Card className="bg-neutral-900 border-neutral-800 hover:border-primary-600 transition-colors">
  <CardHeader className="flex flex-row items-center justify-between">
    <div>
      <CardTitle className="text-neutral-50">Sarah Chen</CardTitle>
      <CardDescription className="text-neutral-400">Senior Frontend Developer</CardDescription>
    </div>
    <ScorePill score={87} size="md" />
  </CardHeader>
  <CardContent>
    <div className="flex gap-2 flex-wrap mb-4">
      <Badge variant="secondary">React</Badge>
      <Badge variant="secondary">TypeScript</Badge>
      <Badge variant="secondary">Next.js</Badge>
    </div>
    <div className="flex gap-2">
      <Button variant="default" size="sm">View Profile</Button>
      <Button variant="outline" size="sm">Shortlist</Button>
    </div>
  </CardContent>
</Card>
```

---

**Status**: Approved  
**Next Step**: Implement in Next.js  
**Owner**: Design & Engineering Teams
