# Skylevel Style Guide

**Version**: 1.0
**Date**: October 2025
**Status**: Canonical Design System
**Framework**: Next.js 14 + Tailwind CSS + shadcn/ui

---

## Executive Summary

This style guide synthesizes the design philosophies of Dollar Shave Club (confident clarity), Stoic (thoughtful data presentation), and Cron (professional efficiency) into a cohesive design system for Skylevel's AI-powered recruitment intelligence platform.

**Core Philosophy**: Confident Professional Intelligence - presenting complex AI-driven insights with approachable confidence, thoughtful sophistication, and professional efficiency.

---

## Design Principles

### 1. **Confidence in Clarity**
- Every element serves a clear purpose
- Bold visual hierarchy for immediate understanding
- Single primary action per context
- No ambiguity in value proposition

### 2. **Thoughtful Data Sophistication**
- Complex information presented simply
- Progressive disclosure of complexity
- Generous whitespace for focus
- Calm interfaces for high-stakes decisions

### 3. **Professional Workflow Efficiency**
- Keyboard-first design for power users
- Bulk operations for high-volume tasks
- Intelligent automation that enhances
- Multi-pane layouts for information-rich workflows

### 4. **Decision Acceleration, Not Replacement**
- AI as augmentation, not replacement
- Clear decision paths with supporting data
- Confidence indicators for rapid decisions
- Audit trails for accountability

---

## Color System

### Skylevel Dual Theme Palette

Based on the official Skylevel color palette inspiration images, the system supports both light and dark themes with consistent brand identity.

```javascript
// tailwind.config.js
colors: {
  // Primary Skylevel Brand (Deep Blue-Red)
  primary: {
    50: '#F1F5F9',
    100: '#E2E8F0',
    200: '#CBD5E1',
    300: '#94A3B8',
    400: '#64748B',
    500: '#475569',  // Light theme primary
    600: '#1E293B',  // Dark theme primary
    700: '#0F172A',
    800: '#020617',
    900: '#020617',
    950: '#020617',
  },

  // Skylevel Blue (Main brand color)
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

  // Success Green
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

  // Theme-Specific Neutrals
  neutral: {
    // Light Theme Neutrals
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

  // Dark Theme Specifics
  dark: {
    50: '#F8FAFC',   // Lightest text on dark
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',  // Main dark background
    950: '#020617',  // Deepest background
  },
}
```

### Semantic Colors

```javascript
// Score Colors (Skylevel Fit Score System)
score: {
  excellent: '#F59E0B',  // 85+ - Gold excellence
  good: '#22C55E',       // 70-84 - Success green
  moderate: '#F59E0B',   // 50-69 - Gold warning
  low: '#EF4444',        // <50 - Coral alert
},

// Status Colors (Professional recruitment workflow)
status: {
  active: '#22C55E',     // Active candidates - success green
  pending: '#F59E0B',    // Under review - gold
  rejected: '#EF4444',   // Not a fit - coral
  interview: '#2563EB',  // Interview stage - skylevel blue
  hired: '#F59E0B',      // Hired - gold excellence
  shortlisted: '#2563EB', // Shortlisted - skylevel blue
}
```

### Color Usage Guidelines

#### Light Theme Usage

| Context | Primary Usage | Secondary Usage | Accent Usage |
|---------|---------------|----------------|--------------|
| **Primary Actions** | `skylevel-500` | `skylevel-600` (hover) | `white` (text) |
| **Secondary Actions** | `neutral-500` | `neutral-600` (hover) | `white` (text) |
| **High Scores (85+)** | `gold-500` | `gold-600` (hover) | `neutral-900` (text) |
| **Good Scores (70-84)** | `success-500` | `success-600` (hover) | `white` (text) |
| **Moderate Scores (50-69)** | `gold-500` | `gold-600` (hover) | `neutral-900` (text) |
| **Low Scores (<50)** | `coral-500` | `coral-600` (hover) | `white` (text) |
| **Backgrounds** | `white` | `neutral-50` | `neutral-100` |
| **Text** | `neutral-900` | `neutral-600` | `neutral-500` |

#### Dark Theme Usage

| Context | Primary Usage | Secondary Usage | Accent Usage |
|---------|---------------|----------------|--------------|
| **Primary Actions** | `skylevel-400` | `skylevel-500` (hover) | `white` (text) |
| **Secondary Actions** | `neutral-200` | `neutral-300` (hover) | `neutral-900` (text) |
| **High Scores (85+)** | `gold-400` | `gold-500` (hover) | `neutral-900` (text) |
| **Good Scores (70-84)** | `success-400` | `success-500` (hover) | `white` (text) |
| **Moderate Scores (50-69)** | `gold-400` | `gold-500` (hover) | `neutral-900` (text) |
| **Low Scores (<50)** | `coral-400` | `coral-500` (hover) | `white` (text) |
| **Backgrounds** | `neutral-900` | `neutral-800` | `neutral-700` |
| **Text** | `white` | `neutral-300` | `neutral-400` |

---

## Typography System

### Font Stack

```css
/* Primary - Professional & Readable */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
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
  base: ['1rem', { lineHeight: '1.5rem' }],
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
| **H1 - Page Title** | `text-4xl font-bold` | 700 | Main page titles | "Fit Queue" |
| **H2 - Section** | `text-3xl font-semibold` | 600 | Section headers | "Top Candidates" |
| **H3 - Card Header** | `text-2xl font-semibold` | 600 | Card titles | "Sarah Chen" |
| **H4 - Subsection** | `text-xl font-medium` | 500 | Subsections | "Technical Skills" |
| **Body Large** | `text-lg font-normal` | 400 | Important content | Candidate summary |
| **Body** | `text-base font-normal` | 400 | Primary content | Details, descriptions |
| **Body Small** | `text-sm font-normal` | 400 | Secondary info | Metadata, timestamps |
| **Caption** | `text-xs font-medium` | 500 | Labels, tags | "CONFIDENCE: HIGH" |
| **Data/Score** | `font-mono text-lg` | 600 | Scores, metrics | "Fit Score: 87" |

### Text Colors

```javascript
textColors: {
  primary: 'text-neutral-50',      // Main text
  secondary: 'text-neutral-300',    // Secondary text
  tertiary: 'text-neutral-400',     // Tertiary text
  inverse: 'text-neutral-950',     // On light backgrounds
  accent: 'text-accent-400',       // Highlight text
  link: 'text-professional-500',   // Links
  success: 'text-status.active',   // Success states
  warning: 'text-status.pending',  // Warning states
  error: 'text-status.rejected',   // Error states
}
```

---

## Component System

### 1. ScorePill Component (Most Critical)

**Purpose**: Display Fit Scores consistently across the platform with confidence indicators

```tsx
interface ScorePillProps {
  score: number;           // 0-100
  size?: 'sm' | 'md' | 'lg';
  showConfidence?: boolean;
  confidence?: 'high' | 'medium' | 'low';
  showBreakdown?: boolean;
  className?: string;
}

// Visual Logic
const getScoreColor = (score: number) => {
  if (score >= 85) return 'bg-accent-400 text-neutral-950';      // Gold
  if (score >= 70) return 'bg-score.good text-neutral-50';        // Green
  if (score >= 50) return 'bg-score.moderate text-neutral-50';   // Orange
  return 'bg-score.low text-neutral-50';                         // Red
};
```

**Sizes**:
- **sm**: `h-8 px-3 text-sm font-semibold` (32px height)
- **md**: `h-10 px-4 text-base font-bold` (40px height) - default
- **lg**: `h-14 px-6 text-xl font-bold` (56px height)

**States**:
- **Default**: Solid color with high contrast text
- **Hover**: Slight scale (`scale-105`) and shadow
- **Loading**: Skeleton with shimmer effect
- **Error**: Red border with error message

**Confidence Indicator**:
- **High**: Solid border, no additional indicator
- **Medium**: Dashed border (`border-2 border-dashed`)
- **Low**: Dotted border (`border-2 border-dotted`) + caution icon

### 2. CandidateCard Component

**Purpose**: Present rich candidate information efficiently with clear actions

```tsx
interface CandidateCardProps {
  candidate: Candidate;
  showQuickActions?: boolean;
  compact?: boolean;
  onSelect?: (candidate: Candidate) => void;
  className?: string;
}
```

**Structure**:
```tsx
<Card className="bg-neutral-900 border-neutral-800 hover:border-primary-600 transition-all duration-200">
  <CardHeader className="pb-3">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <CardTitle className="text-neutral-50 text-xl font-semibold">
          {candidate.name}
        </CardTitle>
        <CardDescription className="text-neutral-400 text-base">
          {candidate.title}
        </CardDescription>
      </div>
      <ScorePill
        score={candidate.fitScore}
        size="lg"
        showConfidence={true}
        className="ml-4"
      />
    </div>
  </CardHeader>

  <CardContent className="pt-0">
    {/* Skills Tags */}
    <div className="flex flex-wrap gap-2 mb-4">
      {candidate.skills.slice(0, 4).map(skill => (
        <Badge key={skill} variant="secondary" className="text-xs">
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
    <p className="text-neutral-300 text-sm mb-4 line-clamp-2">
      {candidate.experienceSummary}
    </p>

    {/* Quick Actions */}
    <div className="flex gap-2">
      <Button size="sm" className="flex-1">
        View Profile
      </Button>
      <Button variant="outline" size="sm">
        Shortlist
      </Button>
    </div>
  </CardContent>
</Card>
```

**Variants**:
- **Default**: Full information with actions
- **Compact**: Reduced height, minimal information
- **List**: Horizontal layout for dense views
- **Comparison**: Side-by-side comparison mode

### 3. Button System

**Primary Button**:
```tsx
<Button className="bg-primary-600 hover:bg-primary-700 text-neutral-50 font-semibold">
  Primary Action
</Button>
```

**Secondary Button**:
```tsx
<Button variant="secondary" className="bg-professional-500 hover:bg-professional-600 text-neutral-50">
  Secondary Action
</Button>
```

**Outline Button**:
```tsx
<Button variant="outline" className="border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-neutral-50">
  Outline Action
</Button>
```

**Ghost Button**:
```tsx
<Button variant="ghost" className="hover:bg-neutral-800 text-neutral-50">
  Subtle Action
</Button>
```

**Sizes**:
- **sm**: `h-8 px-3 text-sm` - Compact actions
- **default**: `h-10 px-4 text-base` - Standard
- **lg**: `h-12 px-6 text-lg` - Prominent actions

### 4. Badge System

```tsx
// Status Badges
<Badge className="bg-status-active text-neutral-50">Active</Badge>
<Badge className="bg-status.pending text-neutral-50">Pending</Badge>
<Badge className="bg-status.rejected text-neutral-50">Rejected</Badge>

// Score Badges
<Badge className="bg-accent-400 text-neutral-950 font-bold">85+</Badge>
<Badge className="bg-score.good text-neutral-50 font-semibold">70-84</Badge>

// Skill Badges
<Badge variant="secondary">React</Badge>
<Badge variant="outline">TypeScript</Badge>
```

### 5. Input Components

```tsx
// Text Input
<Input
  className="bg-neutral-900 border-neutral-700 focus:border-primary-500 text-neutral-50 placeholder:text-neutral-500"
  placeholder="Enter candidate name"
/>

// Search Input (Cron-inspired)
<div className="relative">
  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
  <Input
    className="pl-10 bg-neutral-900 border-neutral-700 focus:border-primary-500"
    placeholder="Search candidates..."
  />
</div>

// Select Dropdown
<Select>
  <SelectTrigger className="bg-neutral-900 border-neutral-700 focus:border-primary-500">
    <SelectValue placeholder="Select role" />
  </SelectTrigger>
  <SelectContent className="bg-neutral-900 border-neutral-800">
    <SelectItem value="frontend">Frontend Developer</SelectItem>
    <SelectItem value="backend">Backend Developer</SelectItem>
  </SelectContent>
</Select>
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
// Main Container
<div className="container mx-auto px-4 max-w-7xl">
  {/* Content */}
</div>

// Wide Container (for data-rich interfaces)
<div className="container mx-auto px-4 max-w-full">
  {/* Content */}
</div>

// Compact Container (for focused interfaces)
<div className="container mx-auto px-4 max-w-4xl">
  {/* Content */}
</div>
```

### Breakpoint Strategy

| Breakpoint | Width | Device | Usage |
|------------|-------|--------|-------|
| **Mobile** | 0-640px | Phone | Single column, essential actions |
| **Tablet** | 640-1024px | Tablet | Two-column, enhanced features |
| **Desktop** | 1024-1280px | Laptop | Multi-column, full features |
| **Large** | 1280px+ | Desktop | Multi-pane, information-rich |

---

## Spacing System

```javascript
// Tailwind Spacing (4px base unit)
spacing: {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px - Standard unit
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px - Section spacing
  8: '2rem',      // 32px - Component spacing
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
| **Page Sections** | `mb-12` | `py-8` | Major content areas |
| **Component Groups** | `mb-6` | `p-4` | Related components |
| **Individual Components** | `mb-4` | `p-4` | Standalone components |
| **List Items** | `mb-2` | `p-3` | List elements |
| **Form Elements** | `mb-4` | `p-3` | Input fields |

---

## Icon System

### Icon Library: Lucide React

```tsx
import {
  // Navigation
  Search, Filter, Settings, User, Home,
  // Actions
  Eye, Plus, X, Check, ChevronDown,
  // Status
  AlertCircle, CheckCircle, Clock, TrendingUp,
  // Professional
  Briefcase, GraduationCap, Award, Target,
  // Scores & Metrics
  Star, TrendingUp, BarChart3, PieChart
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
// Default
<Search className="w-5 h-5 text-neutral-400" />

// Interactive
<Button>
  <Plus className="w-4 h-4 mr-2" />
  Add Candidate
</Button>

// Status
<CheckCircle className="w-5 h-5 text-status.active" />
<AlertCircle className="w-5 h-5 text-status.rejected" />

// Accent
<Star className="w-5 h-5 text-accent-400" />
```

---

## Animation System

### Transition Utilities

```javascript
// tailwind.config.js
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
// Custom animations
animation: {
  'fade-in': 'fadeIn 0.3s ease-out',
  'slide-up': 'slideUp 0.3s ease-out',
  'slide-down': 'slideDown 0.3s ease-out',
  'scale-in': 'scaleIn 0.2s ease-out',
  'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
  scaleIn: {
    '0%': { transform: 'scale(0.95)', opacity: '0' },
    '100%': { transform: 'scale(1)', opacity: '1' },
  },
}
```

### Interaction States

```tsx
// Hover States
<div className="hover:scale-105 hover:shadow-lg transition-all duration-200">
  {/* Content */}
</div>

// Focus States (Accessibility)
<button className="focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-950">
  {/* Button content */}
</button>

// Loading States
<div className="animate-pulse bg-neutral-800 h-20 rounded-lg" />
<Loader2 className="w-6 h-6 animate-spin" />
```

---

## Responsive Design

### Mobile-First Approach

```tsx
// Start with mobile, enhance for larger screens
<div className="
  text-sm          // Mobile
  md:text-base     // Tablet
  lg:text-lg       // Desktop
">
  Responsive text
</div>

// Responsive layout
<div className="
  grid grid-cols-1        // Mobile: single column
  md:grid-cols-2         // Tablet: two columns
  lg:grid-cols-3         // Desktop: three columns
  gap-4 md:gap-6 lg:gap-8
">
  {/* Cards */}
</div>
```

### Component Adaptations

**ScorePill Responsive**:
```tsx
<ScorePill
  size="sm"      // Mobile: compact
  md:size="md"   // Tablet: standard
  lg:size="lg"   // Desktop: prominent
/>
```

**Navigation Responsive**:
```tsx
// Mobile: Bottom tab bar
// Desktop: Sidebar navigation
<nav className="
  fixed bottom-0 left-0 right-0 bg-neutral-950 border-t border-neutral-800
  lg:static lg:h-screen lg:border-r lg:border-neutral-800
">
  {/* Navigation content */}
</nav>
```

---

## Theme Implementation

**Skylevel supports both light and dark themes** with smooth transitions and consistent visual hierarchy.

### Light Theme Background Hierarchy

```css
/* Primary Background */
.bg-white { background-color: #FFFFFF; }  /* Main canvas */

/* Secondary Background */
.bg-neutral-50 { background-color: #F8FAFC; }  /* Cards, elevated surfaces */

/* Tertiary Background */
.bg-neutral-100 { background-color: #F1F5F9; }  /* Hover states, inputs */
```

### Dark Theme Background Hierarchy

```css
/* Primary Background */
.bg-neutral-900 { background-color: #0F172A; }  /* Main canvas */

/* Secondary Background */
.bg-neutral-800 { background-color: #1E293B; }  /* Cards, elevated surfaces */

/* Tertiary Background */
.bg-neutral-700 { background-color: #334155; }  /* Hover states, inputs */
```

### Light Theme Text Hierarchy

```css
/* Primary Text */
.text-neutral-900 { color: #0F172A; }  /* Headlines, important content */

/* Secondary Text */
.text-neutral-600 { color: #475569; }  /* Body text, descriptions */

/* Tertiary Text */
.text-neutral-500 { color: #64748B; }  /* Metadata, captions */

/* Muted Text */
.text-neutral-400 { color: #94A3B8; }  /* Placeholders, disabled */
```

### Dark Theme Text Hierarchy

```css
/* Primary Text */
.text-white { color: #FFFFFF; }  /* Headlines, important content */

/* Secondary Text */
.text-neutral-300 { color: #CBD5E1; }  /* Body text, descriptions */

/* Tertiary Text */
.text-neutral-400 { color: #94A3B8; }  /* Metadata, captions */

/* Muted Text */
.text-neutral-500 { color: #64748B; }  /* Placeholders, disabled */
```

### Theme Switching Implementation

```tsx
// Tailwind CSS with theme support
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white transition-colors duration-200">
        {children}
      </div>
    </div>
  );
};
```

---

## Form Design

### Input System

```tsx
// Base Input
<Input className="
  bg-neutral-900
  border-neutral-700
  focus:border-primary-500
  focus:ring-2
  focus:ring-primary-500/20
  text-neutral-50
  placeholder:text-neutral-500
" />

// Textarea
<Textarea className="
  bg-neutral-900
  border-neutral-700
  focus:border-primary-500
  text-neutral-50
  placeholder:text-neutral-500
  resize-none
" rows={4} />

// Checkbox
<Checkbox className="
  border-neutral-700
  data-[state=checked]:bg-primary-600
  data-[state=checked]:border-primary-600
" />
```

### Form Layout

```tsx
// Form Section
<div className="space-y-6">
  <div>
    <Label className="text-neutral-50 font-medium">Candidate Name</Label>
    <Input className="mt-2" />
    <p className="text-neutral-400 text-sm mt-1">
      Enter the full name as it appears on their resume
    </p>
  </div>
</div>

// Form Actions
<div className="flex gap-3 pt-6 border-t border-neutral-800">
  <Button type="submit" className="flex-1">
    Save Candidate
  </Button>
  <Button variant="outline" type="button">
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

### Focus Management

```tsx
// Focusable Elements
<button className="
  focus:outline-none
  focus:ring-2
  focus:ring-primary-500
  focus:ring-offset-2
  focus:ring-offset-neutral-950
">
  Accessible Button
</button>
```

### Screen Reader Support

```tsx
// ARIA Labels
<button aria-label="View candidate profile for Sarah Chen">
  <Eye className="w-4 h-4" />
</button>

// Status Announcements
<div aria-live="polite" className="sr-only">
  {loadingState && 'Loading candidate data...'}
  {error && 'Error loading candidate data'}
</div>
```

### Keyboard Navigation

- **Tab Order**: Logical flow through interactive elements
- **Skip Links**: Jump to main content for keyboard users
- **Modal Focus**: Proper focus trapping and escape handling

---

## Performance Guidelines

### Loading States

```tsx
// Skeleton Loading
<div className="animate-pulse space-y-4">
  <div className="h-4 bg-neutral-800 rounded w-3/4"></div>
  <div className="h-4 bg-neutral-800 rounded w-1/2"></div>
  <div className="h-4 bg-neutral-800 rounded w-5/6"></div>
</div>

// Loading Spinner
<div className="flex items-center justify-center p-8">
  <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
</div>
```

### Performance Targets

- **Fit Queue Load**: <100ms for 200 candidates
- **Candidate Profile**: <300ms load time
- **Search/Filter**: <50ms response time
- **Page Transitions**: <200ms animation completion

### Optimization Strategies

- **Virtual Scrolling**: For large candidate lists
- **Image Lazy Loading**: Candidate photos, company logos
- **Score Caching**: Pre-calculate and cache fit scores
- **Progressive Enhancement**: Core functionality without JavaScript

---

## Component Library Integration

### shadcn/ui Base Components

Skylevel uses shadcn/ui as the foundation component library, customized with the design system tokens.

```tsx
// Example: Customized Card Component
import { Card as ShadcnCard } from "@/components/ui/card";

const Card = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ShadcnCard>
>(({ className, ...props }, ref) => (
  <ShadcnCard
    ref={ref}
    className={cn(
      "bg-neutral-900 border-neutral-800 text-neutral-50",
      className
    )}
    {...props}
  />
));
```

### Custom Component Variants

```tsx
// ScorePill Component
export const ScorePill = ({ score, size = "md", ...props }) => {
  const colorClass = getScoreColor(score);
  const sizeClass = getSizeClass(size);

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full font-bold transition-all duration-200",
        colorClass,
        sizeClass,
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

- [ ] **ScorePill Component** - Most critical, perfect visual implementation
- [ ] **CandidateCard Component** - Information hierarchy with clear actions
- [ ] **Button System** - All variants and states
- [ ] **Color System** - Complete palette implementation
- [ ] **Typography System** - All heading and body styles

### Week 2: Layout & Navigation

- [ ] **Grid System** - Responsive layouts
- [ ] **Container System** - Different container types
- [ ] **Navigation Components** - Header, sidebar, mobile navigation
- [ ] **Form Components** - All input types and validation states
- [ ] **Modal System** - Overlays and dialogs

### Week 3: Polish & Performance

- [ ] **Animation System** - Smooth transitions and microinteractions
- [ ] **Loading States** - Skeleton screens and spinners
- [ ] **Accessibility** - Full WCAG 2.1 AA compliance
- [ ] **Performance Optimization** - Virtual scrolling, caching
- [ ] **Documentation** - Component usage examples and guidelines

---

## Quality Assurance

### Design Review Checklist

- [ ] **Color Contrast**: All text meets WCAG AA standards
- [ ] **Typography**: Consistent hierarchy and readability
- [ ] **Spacing**: Consistent use of spacing scale
- [ ] **Responsiveness**: Works across all breakpoint sizes
- [ ] **Accessibility**: Keyboard navigation, screen reader support
- [ ] **Performance**: Meets all loading time targets
- [ ] **Cross-browser**: Consistent in Chrome, Firefox, Safari, Edge

### Code Review Guidelines

- [ ] **Component Structure**: Consistent prop interfaces
- [ ] **Class Names**: Follow Tailwind naming conventions
- [ ] **Performance**: Optimized rendering and state management
- [ ] **Accessibility**: Proper ARIA labels and semantic HTML
- [ ] **Testing**: Component coverage and user interaction tests

---

## Usage Examples

### Complete Candidate Card

```tsx
<CandidateCard candidate={sarahChen}>
  <CardHeader>
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <CardTitle className="text-xl font-semibold text-neutral-50">
          Sarah Chen
        </CardTitle>
        <CardDescription className="text-neutral-400">
          Senior Frontend Developer
        </CardDescription>
      </div>
      <ScorePill score={87} size="lg" showConfidence />
    </div>
  </CardHeader>

  <CardContent>
    <div className="flex flex-wrap gap-2 mb-4">
      <Badge variant="secondary">React</Badge>
      <Badge variant="secondary">TypeScript</Badge>
      <Badge variant="secondary">Next.js</Badge>
      <Badge variant="outline">+5 more</Badge>
    </div>

    <p className="text-neutral-300 text-sm mb-4">
      5+ years building scalable web applications...
    </p>

    <div className="flex gap-2">
      <Button size="sm" className="flex-1">
        View Profile
      </Button>
      <Button variant="outline" size="sm">
        Shortlist
      </Button>
    </div>
  </CardContent>
</CandidateCard>
```

### Fit Queue Layout

```tsx
<div className="container mx-auto px-4 max-w-7xl">
  {/* Header */}
  <div className="mb-8">
    <h1 className="text-4xl font-bold text-neutral-50 mb-2">
      Fit Queue
    </h1>
    <p className="text-neutral-400 text-lg">
      12 candidates match your criteria
    </p>
  </div>

  {/* Filters */}
  <div className="mb-6 flex gap-4 flex-wrap">
    <Button variant="outline" size="sm">
      <Filter className="w-4 h-4 mr-2" />
      Filters
    </Button>
    <Button variant="outline" size="sm">
      Score: 85+
    </Button>
    <Button variant="outline" size="sm">
      Available Now
    </Button>
  </div>

  {/* Candidate Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {candidates.map(candidate => (
      <CandidateCard key={candidate.id} candidate={candidate} />
    ))}
  </div>
</div>
```

---

## Conclusion

This style guide provides a comprehensive design system that combines the best principles from Dollar Shave Club, Stoic, and Cron into a cohesive approach for Skylevel. The system emphasizes:

1. **Confident Clarity**: Bold, unambiguous presentation of information
2. **Thoughtful Sophistication**: Complex data presented with calm professionalism
3. **Professional Efficiency**: Workflow optimization for power users
4. **Accessibility Excellence**: Inclusive design for all users

The result is a design system that transforms the complex process of recruitment into a focused, confident, and efficient experience that helps recruiters make better hiring decisions faster.

---

**Status**: Complete and ready for implementation
**Next Step**: Begin component implementation starting with ScorePill
**Maintenance**: Review and update quarterly based on user feedback and usage data