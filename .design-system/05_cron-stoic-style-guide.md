# Cron x Stoic Style Guide

**Version**: 1.0
**Date**: October 2025
**Status**: Design System Variant
**Framework**: Next.js 14 + Tailwind CSS + shadcn/ui

---

## Executive Summary

This style guide combines Cron's professional efficiency and orange brand theme with Stoic's minimalist, thoughtful UI design philosophy. The result is a warm, sophisticated design system that emphasizes calm efficiency and thoughtful data presentation - perfect for Skylevel's AI-powered recruitment intelligence platform.

**Core Philosophy**: Warm Professional Intelligence - presenting complex AI-driven insights with warm confidence, thoughtful simplicity, and professional efficiency.

---

## Design Principles

### 1. **Warm Professional Clarity**
- Orange-based color palette creates warmth and energy
- Clean, minimalist interface reduces cognitive load
- Generous whitespace for focus and decision-making
- Clear visual hierarchy without overwhelming complexity

### 2. **Thoughtful Efficiency**
- Every interaction optimized for speed and clarity
- Progressive disclosure of complex information
- Calm, focused interfaces for high-stakes decisions
- Keyboard-first design for power users

### 3. **Sophisticated Simplicity**
- Minimal elements, maximum impact
- Subtle depth and layering
- Smooth, natural interactions
- Professional polish with warm character

### 4. **Confident Decision Support**
- AI insights presented with warm clarity
- Clear confidence indicators
- Calm color psychology for reduced stress
- Professional workflow optimization

---

## Color System

### Primary Orange Palette (Cron Theme)

```javascript
// tailwind.config.js
colors: {
  // Primary (Warm Orange - Cron Brand)
  primary: {
    50: '#FFF8F1',
    100: '#FED7AA',
    200: '#FDBA74',
    300: '#FB923C',
    400: '#F97316',  // Main brand orange
    500: '#EA580C',  // Primary variant
    600: '#DC2626',  // Dark orange
    700: '#C2410C',
    800: '#9A3412',
    900: '#7C2D12',
    950: '#431407',
  },

  // Warm Accent (Golden Orange - High Excellence)
  accent: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',  // Main accent - premium gold
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
    950: '#451A03',
  },

  // Warm Neutrals (Stoic Calm)
  neutral: {
    50: '#FFFBFA',   // Warm white
    100: '#F5F1F1',  // Warm light gray
    200: '#E7E5E5',  // Warm medium light
    300: '#D6D3D1',  // Warm gray
    400: '#A8A29E',  // Warm medium gray
    500: '#78716C',  // Warm medium dark
    600: '#57534E',  // Warm dark gray
    700: '#44403C',  // Warm dark
    800: '#292524',  // Warm very dark
    900: '#1C1917',  // Warm near black
    950: '#0C0A09',  // Warm black
  },

  // Sage Green (Stoic Growth & Balance)
  sage: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',  // Success green
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
    950: '#052E16',
  },

  // Soft Blue (Cron Professional)
  professional: {
    50: '#F0F9FF',
    100: '#E0F2FE',
    200: '#BAE6FD',
    300: '#7DD3FC',
    400: '#38BDF8',
    500: '#0EA5E9',  // Professional blue
    600: '#0284C7',
    700: '#0369A1',
    800: '#075985',
    900: '#0C4A6E',
    950: '#082F49',
  },
}
```

### Semantic Colors

```javascript
// Score Colors (Warm-based Psychology)
score: {
  excellent: '#FBBF24',  // 85+ - Warm gold
  good: '#22C55E',       // 70-84 - Sage green
  moderate: '#F59E0B',   // 50-69 - Warm amber
  low: '#EF4444',        // <50 - Soft red
},

// Status Colors (Cron Professional)
status: {
  active: '#22C55E',     // Sage green
  pending: '#F59E0B',    // Warm amber
  rejected: '#EF4444',   // Soft red
  interview: '#0EA5E9',  // Professional blue
  hired: '#FBBF24',      // Gold accent
},

// Calendar Colors (Cron Theme)
calendar: {
  event: '#F97316',      // Primary orange
  meeting: '#0EA5E9',    // Professional blue
  deadline: '#EF4444',   // Soft red
  reminder: '#22C55E',   // Sage green
}
```

### Color Usage Guidelines

| Context | Primary Usage | Secondary Usage | Accent Usage |
|---------|---------------|----------------|--------------|
| **Primary Actions** | `primary-500` | `primary-600` (hover) | `neutral-50` (text) |
| **Secondary Actions** | `professional-500` | `professional-600` (hover) | `neutral-50` (text) |
| **High Scores (85+)** | `accent-400` | `accent-500` (hover) | `neutral-950` (text) |
| **Good Scores (70-84)** | `score.good` | `status.active` | `neutral-50` (text) |
| **Moderate Scores (50-69)** | `score.moderate` | `status.pending` | `neutral-950` (text) |
| **Low Scores (<50)** | `score.low` | `status.rejected` | `neutral-50` (text) |
| **Backgrounds** | `neutral-50` | `neutral-100` | `neutral-200` |
| **Text** | `neutral-900` | `neutral-700` | `neutral-600` |

---

## Typography System

### Font Stack (Stoic Minimalist)

```css
/* Primary - Clean & Professional */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'SF Pro Display',
             'Helvetica Neue', Arial, sans-serif;

/* Monospace - Data & Code */
font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono',
             monospace;
```

### Type Scale

```javascript
// tailwind.config.js
fontSize: {
  xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],
  sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.025em' }],
  base: ['1rem', { lineHeight: '1.6rem' }],  // Increased for readability
  lg: ['1.125rem', { lineHeight: '1.75rem' }],
  xl: ['1.25rem', { lineHeight: '1.75rem' }],
  '2xl': ['1.5rem', { lineHeight: '2rem' }],
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
  '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
  '5xl': ['3rem', { lineHeight: '1' }],
}
```

### Typography Hierarchy

| Element | Class | Weight | Usage | Example |
|---------|-------|--------|-------|---------|
| **H1 - Page Title** | `text-4xl font-light` | 300 | Main page titles | "Fit Queue" |
| **H2 - Section** | `text-3xl font-normal` | 400 | Section headers | "Top Candidates" |
| **H3 - Card Header** | `text-2xl font-normal` | 400 | Card titles | "Sarah Chen" |
| **H4 - Subsection** | `text-xl font-medium` | 500 | Subsections | "Technical Skills" |
| **Body Large** | `text-lg font-light` | 300 | Important content | Candidate summary |
| **Body** | `text-base font-normal` | 400 | Primary content | Details, descriptions |
| **Body Small** | `text-sm font-normal` | 400 | Secondary info | Metadata, timestamps |
| **Caption** | `text-xs font-medium` | 500 | Labels, tags | "CONFIDENCE: HIGH" |
| **Data/Score** | `font-mono text-lg font-medium` | 500 | Scores, metrics | "Fit Score: 87" |

### Text Colors

```javascript
textColors: {
  primary: 'text-neutral-900',      // Main text
  secondary: 'text-neutral-700',    // Secondary text
  tertiary: 'text-neutral-600',     // Tertiary text
  inverse: 'text-neutral-50',       // On dark backgrounds
  accent: 'text-primary-600',       // Highlight text
  link: 'text-professional-600',    // Links
  success: 'text-sage-500',         // Success states
  warning: 'text-accent-500',       // Warning states
  error: 'text-red-500',            // Error states
}
```

---

## Component System

### 1. ScorePill Component (Most Critical)

**Purpose**: Display Fit Scores with warm color psychology and confidence indicators

```tsx
interface ScorePillProps {
  score: number;           // 0-100
  size?: 'sm' | 'md' | 'lg';
  showConfidence?: boolean;
  confidence?: 'high' | 'medium' | 'low';
  showBreakdown?: boolean;
  variant?: 'default' | 'warm' | 'minimal';
  className?: string;
}

// Visual Logic
const getScoreColor = (score: number) => {
  if (score >= 85) return 'bg-accent-400 text-neutral-950';      // Warm gold
  if (score >= 70) return 'bg-sage-500 text-neutral-50';         // Sage green
  if (score >= 50) return 'bg-accent-500 text-neutral-50';       // Warm amber
  return 'bg-red-500 text-neutral-50';                           // Soft red
};
```

**Sizes**:
- **sm**: `h-8 px-3 text-sm font-medium` (32px height)
- **md**: `h-10 px-4 text-base font-medium` (40px height) - default
- **lg**: `h-14 px-6 text-xl font-light` (56px height)

**Variants**:
- **default**: Solid colors with warm psychology
- **warm**: Softer edges, subtle shadows
- **minimal**: Outlined only, minimal visual weight

**States**:
- **Default**: Warm solid colors with high contrast
- **Hover**: Gentle scale (`scale-105`) and warm shadow
- **Loading**: Warm skeleton with shimmer effect
- **Error**: Red border with supportive error message

### 2. CandidateCard Component

**Purpose**: Present candidate information with warm, thoughtful design

```tsx
interface CandidateCardProps {
  candidate: Candidate;
  showQuickActions?: boolean;
  compact?: boolean;
  variant?: 'default' | 'minimal' | 'warm';
  onSelect?: (candidate: Candidate) => void;
  className?: string;
}
```

**Structure**:
```tsx
<Card className="bg-white border-neutral-200 hover:border-primary-300 transition-all duration-300 shadow-sm hover:shadow-md">
  <CardHeader className="pb-4">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <CardTitle className="text-neutral-900 text-xl font-normal">
          {candidate.name}
        </CardTitle>
        <CardDescription className="text-neutral-700 text-base mt-1">
          {candidate.title}
        </CardDescription>
      </div>
      <ScorePill
        score={candidate.fitScore}
        size="lg"
        variant="warm"
        showConfidence={true}
        className="ml-4"
      />
    </div>
  </CardHeader>

  <CardContent className="pt-0">
    {/* Skills Tags */}
    <div className="flex flex-wrap gap-2 mb-4">
      {candidate.skills.slice(0, 4).map(skill => (
        <Badge key={skill} variant="secondary" className="bg-neutral-100 text-neutral-700 text-xs font-medium">
          {skill}
        </Badge>
      ))}
      {candidate.skills.length > 4 && (
        <Badge variant="outline" className="text-xs">
          +{candidate.skills.length - 4} more
        </Badge>
      )}
    </div>

    {/* Experience Summary */}
    <p className="text-neutral-600 text-sm mb-4 line-clamp-2 leading-relaxed">
      {candidate.experienceSummary}
    </p>

    {/* Quick Actions */}
    <div className="flex gap-3">
      <Button size="sm" className="flex-1 bg-primary-500 hover:bg-primary-600 text-white">
        View Profile
      </Button>
      <Button variant="outline" size="sm" className="border-primary-500 text-primary-600 hover:bg-primary-50">
        Shortlist
      </Button>
    </div>
  </CardContent>
</Card>
```

**Variants**:
- **default**: Full information with warm styling
- **minimal**: Reduced visual weight, essential info only
- **warm**: Enhanced spacing, rounded corners, subtle shadows

### 3. Button System

**Primary Button**:
```tsx
<Button className="bg-primary-500 hover:bg-primary-600 text-white font-normal shadow-sm hover:shadow-md transition-all duration-200">
  Primary Action
</Button>
```

**Secondary Button**:
```tsx
<Button variant="secondary" className="bg-professional-500 hover:bg-professional-600 text-white font-normal">
  Secondary Action
</Button>
```

**Warm Button**:
```tsx
<Button variant="warm" className="bg-accent-400 hover:bg-accent-500 text-neutral-900 font-medium">
  Warm Action
</Button>
```

**Outline Button**:
```tsx
<Button variant="outline" className="border-2 border-primary-500 text-primary-600 hover:bg-primary-50 font-normal">
  Outline Action
</Button>
```

**Ghost Button**:
```tsx
<Button variant="ghost" className="hover:bg-neutral-100 text-neutral-700 font-normal">
  Subtle Action
</Button>
```

**Sizes**:
- **sm**: `h-8 px-3 text-sm` - Compact actions
- **default**: `h-10 px-4 text-base` - Standard
- **lg**: `h-12 px-6 text-lg` - Prominent actions

### 4. Badge System

```tsx
// Status Badges (Warm Colors)
<Badge className="bg-sage-500 text-white font-normal">Active</Badge>
<Badge className="bg-accent-500 text-white font-normal">Pending</Badge>
<Badge className="bg-red-500 text-white font-normal">Rejected</Badge>

// Score Badges
<Badge className="bg-accent-400 text-neutral-900 font-medium">85+</Badge>
<Badge className="bg-sage-500 text-white font-medium">70-84</Badge>

// Skill Badges (Minimalist)
<Badge variant="secondary" className="bg-neutral-100 text-neutral-700 font-normal">React</Badge>
<Badge variant="outline" className="border-neutral-300 text-neutral-600 font-normal">TypeScript</Badge>
```

### 5. Calendar Components (Cron Theme)

```tsx
// Event Card
<div className="bg-white border border-neutral-200 rounded-lg p-3 shadow-sm">
  <div className="flex items-center gap-3">
    <div className="w-1 h-8 bg-primary-500 rounded-full"></div>
    <div className="flex-1">
      <h4 className="font-normal text-neutral-900">Team Interview</h4>
      <p className="text-sm text-neutral-600">2:00 PM - 3:30 PM</p>
    </div>
    <Badge className="bg-primary-100 text-primary-700 font-normal">Meeting</Badge>
  </div>
</div>

// Mini Calendar
<div className="bg-white border border-neutral-200 rounded-lg p-4">
  <div className="grid grid-cols-7 gap-1 text-center">
    {/* Calendar days with orange accents for events */}
  </div>
</div>
```

---

## Layout System

### Grid Structure

```javascript
// Responsive Grid System
grid: {
  '12': 'repeat(12, minmax(0, 1fr))',
  '8': 'repeat(8, minmax(0, 1fr))',
  '6': 'repeat(6, minmax(0, 1fr))',
  '4': 'repeat(4, minmax(0, 1fr))',
  '3': 'repeat(3, minmax(0, 1fr))',
  '2': 'repeat(2, minmax(0, 1fr))',
  '1': 'repeat(1, minmax(0, 1fr))',
}
```

### Container System

```tsx
// Main Container (Stoic intimate reading)
<div className="container mx-auto px-4 max-w-6xl">
  {/* Content */}
</div>

// Wide Container (Cron productivity)
<div className="container mx-auto px-4 max-w-full">
  {/* Content */}
</div>

// Compact Container (Focused work)
<div className="container mx-auto px-4 max-w-4xl">
  {/* Content */}
</div>
```

### Breakpoint Strategy

| Breakpoint | Width | Device | Usage |
|------------|-------|--------|-------|
| **Mobile** | 0-640px | Phone | Single column, warm simplicity |
| **Tablet** | 640-1024px | Tablet | Two-column, enhanced features |
| **Desktop** | 1024-1280px | Laptop | Multi-column, full features |
| **Large** | 1280px+ | Desktop | Multi-pane, information-rich |

---

## Spacing System

```javascript
// Generous Spacing (Stoic breathing room)
spacing: {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px - Standard unit
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px - Component spacing
  8: '2rem',      // 32px - Section spacing
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px - Page sections
  16: '4rem',     // 64px - Major sections
  20: '5rem',     // 80px
  24: '6rem',     // 96px - Page margins
}
```

### Spacing Guidelines

| Context | Margin | Padding | Usage |
|---------|--------|---------|-------|
| **Page Sections** | `mb-16` | `py-12` | Major content areas |
| **Component Groups** | `mb-8` | `p-6` | Related components |
| **Individual Components** | `mb-6` | `p-4` | Standalone components |
| **List Items** | `mb-3` | `p-4` | List elements |
| **Form Elements** | `mb-4` | `p-3` | Input fields |

---

## Icon System

### Icon Library: Lucide React

```tsx
import {
  // Navigation
  Search, Filter, Settings, User, Home, Calendar,
  // Actions
  Eye, Plus, X, Check, ChevronDown, Clock,
  // Status
  AlertCircle, CheckCircle, TrendingUp,
  // Professional
  Briefcase, GraduationCap, Award, Target,
  // Warm & Human
  Heart, Star, Smile, Coffee, Sun
} from 'lucide-react';
```

### Icon Sizes

| Size | Class | Dimensions | Usage |
|------|-------|------------|-------|
| **XS** | `w-3 h-3` | 12px | Inline icons, badges |
| **SM** | `w-4 h-4` | 16px | Button icons, small elements |
| **MD** | `w-5 h-5` | 20px | Default size, most use cases |
| **LG** | `w-6 h-6` | 24px | Section headers, important actions |
| **XL** | `w-8 h-8` | 32px | Feature icons, large elements |

### Icon Colors

```tsx
// Default (Warm neutral)
<Search className="w-5 h-5 text-neutral-600" />

// Primary Orange
<Plus className="w-4 h-4 text-primary-500" />

// Professional Blue
<Clock className="w-5 h-5 text-professional-600" />

// Success Green
<CheckCircle className="w-5 h-5 text-sage-500" />

// Warm Accent
<Star className="w-5 h-5 text-accent-400" />
```

---

## Animation System

### Transition Utilities

```javascript
// Smooth, gentle transitions
transitionProperty: {
  'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
  'opacity': 'opacity',
  'shadow': 'box-shadow',
  'transform': 'transform',
  'all': 'all',
},

transitionDuration: {
  '75': '75ms',
  '100': '100ms',
  '150': '150ms',
  '200': '200ms',  // Default
  '300': '300ms',
  '500': '500ms',
  '700': '700ms',
  '1000': '1000ms',
},
```

### Custom Animations

```javascript
// Gentle, warm animations
animation: {
  'fade-in': 'fadeIn 0.4s ease-out',
  'slide-up': 'slideUp 0.3s ease-out',
  'slide-down': 'slideDown 0.3s ease-out',
  'scale-in': 'scaleIn 0.2s ease-out',
  'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  'warm-glow': 'warmGlow 2s ease-in-out infinite alternate',
},

keyframes: {
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
  slideUp: {
    '0%': { transform: 'translateY(12px)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' },
  },
  slideDown: {
    '0%': { transform: 'translateY(-12px)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' },
  },
  scaleIn: {
    '0%': { transform: 'scale(0.98)', opacity: '0' },
    '100%': { transform: 'scale(1)', opacity: '1' },
  },
  warmGlow: {
    '0%': { boxShadow: '0 0 20px rgba(249, 115, 22, 0.1)' },
    '100%': { boxShadow: '0 0 30px rgba(249, 115, 22, 0.2)' },
  },
}
```

---

## Calendar System (Cron Feature)

### Calendar Colors

```javascript
// Calendar-specific colors
calendar: {
  background: 'bg-white',
  border: 'border-neutral-200',
  today: 'bg-primary-100 text-primary-700',
  selected: 'bg-primary-500 text-white',
  event: 'bg-primary-500',
  meeting: 'bg-professional-500',
  deadline: 'bg-red-500',
  reminder: 'bg-sage-500',
}
```

### Calendar Components

```tsx
// Month View
<div className="bg-white border border-neutral-200 rounded-lg p-4">
  <div className="grid grid-cols-7 gap-1 text-center">
    {weekDays.map(day => (
      <div key={day} className="text-xs font-medium text-neutral-600 py-2">
        {day}
      </div>
    ))}
    {calendarDays.map(day => (
      <div
        key={day.date}
        className={cn(
          "aspect-square flex items-center justify-center text-sm rounded-lg cursor-pointer transition-colors",
          day.isToday && "bg-primary-100 text-primary-700 font-medium",
          day.isSelected && "bg-primary-500 text-white",
          day.hasEvent && "bg-primary-500 text-white",
          !day.isToday && !day.isSelected && "hover:bg-neutral-100"
        )}
      >
        {day.date}
      </div>
    ))}
  </div>
</div>

// Event List
<div className="space-y-3">
  {events.map(event => (
    <div key={event.id} className="flex items-center gap-3 p-3 bg-white border border-neutral-200 rounded-lg">
      <div className={cn("w-1 h-8 rounded-full", getEventTypeColor(event.type))}></div>
      <div className="flex-1">
        <h4 className="font-normal text-neutral-900">{event.title}</h4>
        <p className="text-sm text-neutral-600">{event.time}</p>
      </div>
      <Badge className={cn("font-normal", getEventBadgeClass(event.type))}>
        {event.type}
      </Badge>
    </div>
  ))}
</div>
```

---

## Form Design

### Input System

```tsx
// Warm, approachable inputs
<Input className="
  bg-white
  border-neutral-300
  focus:border-primary-500
  focus:ring-2
  focus:ring-primary-500/20
  text-neutral-900
  placeholder:text-neutral-500
  rounded-lg
" />

// Textarea
<Textarea className="
  bg-white
  border-neutral-300
  focus:border-primary-500
  text-neutral-900
  placeholder:text-neutral-500
  resize-none
  rounded-lg
" rows={4} />

// Checkbox
<Checkbox className="
  border-neutral-400
  data-[state=checked]:bg-primary-500
  data-[state=checked]:border-primary-500
  data-[state=checked]:text-white
" />
```

### Form Layout

```tsx
// Warm, spacious form sections
<div className="space-y-8">
  <div>
    <Label className="text-neutral-900 font-normal text-base">Candidate Name</Label>
    <Input className="mt-2" />
    <p className="text-neutral-600 text-sm mt-2 leading-relaxed">
      Enter the full name as it appears on their resume
    </p>
  </div>
</div>

// Form Actions
<div className="flex gap-4 pt-8 border-t border-neutral-200">
  <Button className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-normal">
    Save Candidate
  </Button>
  <Button variant="outline" className="border-primary-500 text-primary-600 hover:bg-primary-50 font-normal">
    Cancel
  </Button>
</div>
```

---

## Accessibility Guidelines

### Color Contrast

- **Text on Background**: Minimum 4.5:1 contrast ratio (WCAG AA)
- **Large Text (18px+)**: Minimum 3:1 contrast ratio
- **Interactive Elements**: Minimum 3:1 contrast ratio
- **Warm Colors**: Ensure sufficient contrast for accessibility

### Focus Management

```tsx
// Warm, visible focus states
<button className="
  focus:outline-none
  focus:ring-2
  focus:ring-primary-500
  focus:ring-offset-2
  focus:ring-offset-white
">
  Accessible Button
</button>
```

### Screen Reader Support

```tsx
// ARIA Labels with warm, helpful language
<button aria-label="View candidate profile for Sarah Chen">
  <Eye className="w-4 h-4" />
</button>

// Status Announcements
<div aria-live="polite" className="sr-only">
  {loadingState && 'Loading candidate data...'}
  {success && 'Candidate profile loaded successfully'}
  {error && 'Unable to load candidate data. Please try again.'}
</div>
```

---

## Performance Guidelines

### Loading States

```tsx
// Warm skeleton loading
<div className="animate-pulse space-y-4">
  <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
  <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
  <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
</div>

// Warm loading spinner
<div className="flex items-center justify-center p-8">
  <div className="w-8 h-8 border-3 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
</div>
```

### Performance Targets

- **Fit Queue Load**: <100ms for 200 candidates
- **Calendar Rendering**: <50ms for month view
- **Search/Filter**: <50ms response time
- **Page Transitions**: <300ms animation completion

---

## Component Library Integration

### shadcn/ui Base Components

```tsx
// Customized Card Component
import { Card as ShadcnCard } from "@/components/ui/card";

const Card = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ShadcnCard>
>(({ className, ...props }, ref) => (
  <ShadcnCard
    ref={ref}
    className={cn(
      "bg-white border-neutral-200 text-neutral-900 rounded-lg shadow-sm",
      className
    )}
    {...props}
  />
));
```

### Custom Component Variants

```tsx
// Warm ScorePill Component
export const ScorePill = ({ score, size = "md", variant = "warm", ...props }) => {
  const colorClass = getScoreColor(score);
  const sizeClass = getSizeClass(size);
  const variantClass = getVariantClass(variant);

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300",
        colorClass,
        sizeClass,
        variantClass,
        props.className
      )}
      {...props}
    >
      {score}
    </div>
  );
};
```

---

## Implementation Checklist

### Week 1: Core Components

- [ ] **ScorePill Component** - Warm color psychology implementation
- [ ] **CandidateCard Component** - Warm, thoughtful design
- [ ] **Button System** - All variants with warm styling
- [ ] **Color System** - Complete orange-based palette
- [ ] **Typography System** - Lightweight, readable fonts

### Week 2: Layout & Calendar

- [ ] **Grid System** - Responsive layouts with warm spacing
- [ ] **Container System** - Different container types
- [ ] **Calendar Components** - Cron-inspired calendar system
- [ ] **Form Components** - Warm, approachable inputs
- [ ] **Modal System** - Warm, friendly overlays

### Week 3: Polish & Performance

- [ ] **Animation System** - Smooth, warm transitions
- [ ] **Loading States** - Warm skeleton screens
- [ ] **Accessibility** - Full WCAG 2.1 AA compliance
- [ ] **Performance Optimization** - Calendar optimization, caching
- [ ] **Documentation** - Component usage examples

---

## Quality Assurance

### Design Review Checklist

- [ ] **Color Contrast**: All text meets WCAG AA standards
- [ ] **Typography**: Consistent hierarchy and readability
- [ ] **Spacing**: Generous, consistent spacing
- [ ] **Responsiveness**: Works across all breakpoint sizes
- [ ] **Accessibility**: Keyboard navigation, screen reader support
- [ ] **Performance**: Meets all loading time targets
- [ ] **Warm Psychology**: Colors create warm, confident feeling

### Code Review Guidelines

- [ ] **Component Structure**: Consistent prop interfaces
- [ ] **Class Names**: Follow Tailwind naming conventions
- [ ] **Performance**: Optimized rendering and state management
- [ ] **Accessibility**: Proper ARIA labels and semantic HTML
- [ ] **Warm Design**: Components feel warm and approachable

---

## Usage Examples

### Complete Candidate Card

```tsx
<CandidateCard candidate={sarahChen} variant="warm">
  <CardHeader className="pb-4">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <CardTitle className="text-xl font-normal text-neutral-900">
          Sarah Chen
        </CardTitle>
        <CardDescription className="text-neutral-700 text-base mt-1">
          Senior Frontend Developer
        </CardDescription>
      </div>
      <ScorePill score={87} size="lg" variant="warm" showConfidence />
    </div>
  </CardHeader>

  <CardContent className="pt-0">
    <div className="flex flex-wrap gap-2 mb-4">
      <Badge variant="secondary" className="bg-neutral-100 text-neutral-700">React</Badge>
      <Badge variant="secondary" className="bg-neutral-100 text-neutral-700">TypeScript</Badge>
      <Badge variant="secondary" className="bg-neutral-100 text-neutral-700">Next.js</Badge>
      <Badge variant="outline" className="border-neutral-300 text-neutral-600">+5 more</Badge>
    </div>

    <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
      5+ years building scalable web applications with a focus on user experience...
    </p>

    <div className="flex gap-3">
      <Button size="sm" className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-normal">
        View Profile
      </Button>
      <Button variant="outline" size="sm" className="border-primary-500 text-primary-600 hover:bg-primary-50 font-normal">
        Shortlist
      </Button>
    </div>
  </CardContent>
</CandidateCard>
```

### Calendar Integration

```tsx
<div className="container mx-auto px-4 max-w-6xl">
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    {/* Main Content */}
    <div className="lg:col-span-2">
      <h1 className="text-4xl font-light text-neutral-900 mb-8">Schedule</h1>

      {/* Calendar Grid */}
      <div className="bg-white border border-neutral-200 rounded-lg p-6 mb-6">
        {/* Calendar implementation */}
      </div>

      {/* Today's Events */}
      <div className="bg-white border border-neutral-200 rounded-lg p-6">
        <h2 className="text-xl font-normal text-neutral-900 mb-4">Today's Events</h2>
        <div className="space-y-3">
          {/* Event cards */}
        </div>
      </div>
    </div>

    {/* Sidebar */}
    <div className="space-y-6">
      {/* Mini Calendar */}
      <div className="bg-white border border-neutral-200 rounded-lg p-4">
        <h3 className="font-normal text-neutral-900 mb-3">October 2025</h3>
        {/* Mini calendar */}
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-neutral-200 rounded-lg p-4">
        <Button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-normal">
          Schedule Interview
        </Button>
      </div>
    </div>
  </div>
</div>
```

---

## Conclusion

The Cron x Stoic style guide combines the best of both worlds:

1. **Cron's Professional Efficiency**: Orange-based energy, workflow optimization, calendar functionality
2. **Stoic's Thoughtful Design**: Minimalist approach, generous spacing, calm user experience
3. **Warm Psychology**: Orange and gold tones create confidence and energy
4. **Sophisticated Simplicity**: Clean interfaces with thoughtful details

The result is a design system that transforms recruiting into a warm, confident, and efficient experience. The orange color palette provides energy and optimism, while the minimalist design reduces cognitive load and helps recruiters focus on making great hiring decisions.

---

**Status**: Complete and ready for implementation
**Next Step**: Begin component implementation starting with ScorePill and Calendar
**Maintenance**: Review and update quarterly based on user feedback and usage data