
# Skylevel Modern Style Guide

**Version**: 3.0
**Date**: January 2025
**Status**: Production-Ready Design System
**Framework**: Next.js 14 + Tailwind CSS + shadcn/ui
**Color System**: OKLCH-based for perceptual uniformity

---

## Color System

### OKLCH Color Palette (Perceptually Uniform)

The Skylevel color system uses OKLCH color space for better perceptual uniformity and accessibility across devices and display technologies.

#### CSS Custom Properties

```css
/* Skylevel :: Dark Theme (Default) */
:root {
  /* Base colors - Sophisticated & Focused */
  --background: oklch(0.09 0.002 291); /* Gray 950 */
  --foreground: oklch(0.97 0.003 291); /* Gray 50 */

  --card: oklch(0.12 0.004 291); /* Gray 900 */
  --card-foreground: oklch(0.97 0.003 291); /* Gray 50 */

  --popover: oklch(0.12 0.004 291); /* Gray 900 */
  --popover-foreground: oklch(0.97 0.003 291); /* Gray 50 */

  /* Primary - Decisive & Confident Red */
  --primary: oklch(0.56 0.17 19.3); /* Primary 500 */
  --primary-foreground: oklch(0.98 0.01 19.3); /* Primary 50 */

  /* Secondary - Calm & Professional Blue */
  --secondary: oklch(0.48 0.09 252); /* Secondary 500 */
  --secondary-foreground: oklch(0.96 0.01 252); /* Secondary 50 */

  /* Accent - Premium & Rewarding Gold */
  --accent: oklch(0.74 0.11 88.5); /* Accent 500 */
  --accent-foreground: oklch(0.26 0.05 88.5); /* Accent 900 */

  /* Muted tones for hover states and secondary info */
  --muted: oklch(0.18 0.006 291); /* Gray 800 */
  --muted-foreground: oklch(0.67 0.01 291); /* Gray 400 */

  /* Destructive - Unambiguous Red */
  --destructive: oklch(0.56 0.17 19.3); /* Primary 500 */
  --destructive-foreground: oklch(0.98 0.01 19.3); /* Primary 50 */

  /* UI Elements */
  --border: oklch(0.22 0.006 291); /* Gray 800 */
  --input: oklch(0.22 0.006 291); /* Gray 800 */
  --ring: oklch(0.48 0.09 252); /* Secondary 500 */

  /* Additional Skylevel Semantic Colors */
  --success: oklch(0.72 0.15 159); /* Success 500 */
  --success-foreground: oklch(0.14 0.05 159); /* Success 950 */
  --warning: oklch(0.63 0.16 63); /* Warning 500 */
  --warning-foreground: oklch(0.21 0.07 63); /* Warning 950 */

  /* Spacing and sizing */
  --radius: 0.5rem;

  /* Shadows - Soft and neutral */
  --shadow-color: oklch(0.09 0.002 291);
  --shadow-xs: 0 1px 2px 0px var(--shadow-color / 0.08);
  --shadow-sm: 0 1px 3px 0px var(--shadow-color / 0.10);
  --shadow-md: 0 4px 6px -1px var(--shadow-color / 0.12), 0 2px 4px -2px var(--shadow-color / 0.08);
  --shadow-lg: 0 10px 15px -3px var(--shadow-color / 0.12), 0 4px 6px -4px var(--shadow-color / 0.08);
  --shadow-xl: 0 20px 25px -5px var(--shadow-color / 0.12), 0 8px 10px -6px var(--shadow-color / 0.08);
}

/* Skylevel :: Light Theme */
.light {
  /* Base colors */
  --background: oklch(0.97 0.003 291); /* Gray 100 */
  --foreground: oklch(0.12 0.004 291); /* Gray 900 */

  --card: oklch(1 0 0); /* White */
  --card-foreground: oklch(0.12 0.004 291); /* Gray 900 */

  --popover: oklch(1 0 0); /* White */
  --popover-foreground: oklch(0.12 0.004 291); /* Gray 900 */

  /* Accent Foreground needs to be darker on a light background */
  --accent-foreground: oklch(0.26 0.05 88.5); /* Accent 900 */

  /* Muted tones */
  --muted: oklch(0.94 0.004 291); /* Gray 200 */
  --muted-foreground: oklch(0.42 0.01 291); /* Gray 600 */

  /* UI Elements */
  --border: oklch(0.91 0.004 291); /* Gray 200 */
  --input: oklch(0.91 0.004 291); /* Gray 200 */

  /* Additional Skylevel Semantic Colors */
  --success: oklch(0.72 0.15 159); /* Success 500 */
  --success-foreground: oklch(0.94 0.03 159); /* Success 50 */
  --warning: oklch(0.63 0.16 63); /* Warning 500 */
  --warning-foreground: oklch(0.99 0.03 63); /* Warning 50 */
}
```

#### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom Skylevel colors
        success: {
          DEFAULT: "oklch(var(--success))",
          foreground: "oklch(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "oklch(var(--warning))",
          foreground: "oklch(var(--warning-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```
```

### Score Color Logic

```typescript
const getScoreColor = (score: number) => {
  if (score >= 85) return 'bg-gradient-to-br from-accent to-accent/90';     // Gold for excellence
  if (score >= 70) return 'bg-gradient-to-br from-success to-success/90';   // Green for good
  if (score >= 50) return 'bg-gradient-to-br from-warning to-warning/90';   // Amber for moderate
  return 'bg-gradient-to-br from-destructive to-destructive/90';           // Red for low
};

// Score text color (for contrast)
const getScoreTextColor = (score: number) => {
  if (score >= 85) return 'text-accent-foreground';     // Dark gold text
  if (score >= 70) return 'text-success-foreground';   // Dark green text
  if (score >= 50) return 'text-warning-foreground';   // Dark amber text
  return 'text-destructive-foreground';               // Dark red text
};
```

---

## Typography System

### Font Configuration

```javascript
// tailwind.config.js
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Variable', ...fontFamily.sans],
        display: ['Inter Display', ...fontFamily.sans],
        mono: ['JetBrains Mono', ...fontFamily.mono],
      },
    },
  },
};
```

### Import Fonts

```html
<!-- index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Type Scale

```javascript
fontSize: {
  xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],
  sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],
  base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
  lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
  xl: ['1.25rem', { lineHeight: '1.875rem', letterSpacing: '-0.015em' }],
  '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],
  '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.025em' }],
  '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.03em' }],
  '5xl': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.035em' }],
  '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.04em' }],
}
```

### Usage Examples

```tsx
// Hero Title
<h1 className="font-display text-5xl font-bold text-white">
  Start every hire with proof, not guesswork
</h1>

// Section Header
<h2 className="font-display text-3xl font-semibold text-white">
  The Truth Layer Your Hiring Stack Was Missing
</h2>

// Card Title
<h3 className="text-xl font-semibold text-white">
  Sarah Chen
</h3>

// Body Text
<p className="text-base text-neutral-300">
  Find great candidates faster with AI-powered fit scoring
</p>

// Small Text / Metadata
<span className="text-sm text-neutral-400">
  Applied 2 days ago
</span>

// Score Display
<span className="font-mono text-2xl font-bold">
  87
</span>
```

---

## Component System

### ScorePill Component (Modern)

```tsx
interface ScorePillProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showConfidence?: boolean;
  animated?: boolean;
}

export const ScorePill = ({
  score,
  size = 'md',
  showConfidence = false,
  animated = true
}: ScorePillProps) => {
  const getScoreClasses = (score: number) => {
    if (score >= 85) return {
      bg: 'bg-gradient-to-br from-accent to-accent/90',
      text: 'text-accent-foreground',
      shadow: 'shadow-lg shadow-accent/20'
    };
    if (score >= 70) return {
      bg: 'bg-gradient-to-br from-success to-success/90',
      text: 'text-success-foreground',
      shadow: 'shadow-lg shadow-success/20'
    };
    if (score >= 50) return {
      bg: 'bg-gradient-to-br from-warning to-warning/90',
      text: 'text-warning-foreground',
      shadow: 'shadow-lg shadow-warning/20'
    };
    return {
      bg: 'bg-gradient-to-br from-destructive to-destructive/90',
      text: 'text-destructive-foreground',
      shadow: 'shadow-lg shadow-destructive/20'
    };
  };

  const scoreClasses = getScoreClasses(score);

  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-14 px-6 text-xl',
  };

  return (
    <div className="relative group">
      <div className={`
        ${scoreClasses.bg}
        ${sizes[size]}
        rounded-full
        flex items-center justify-center
        font-mono font-bold
        ${scoreClasses.text}
        ${scoreClasses.shadow}
        transition-all duration-200
        hover:scale-105 hover:shadow-xl hover:-translate-y-0.5
        ${animated ? 'animate-in fade-in slide-in-from-bottom-2' : ''}
      `}>
        {score}

        {showConfidence && (
          <div className="ml-2 w-1.5 h-1.5 rounded-full bg-current/40" />
        )}
      </div>

      {/* Glow effect on hover */}
      <div className={`
        absolute inset-0 -z-10
        ${scoreClasses.bg}
        rounded-full
        opacity-0 group-hover:opacity-30
        blur-xl
        transition-opacity duration-300
      `} />
    </div>
  );
};
```

### Button System

```tsx
// Primary Button (Gradient)
<button className="
  relative overflow-hidden
  bg-gradient-to-r from-primary-500 to-primary-600
  hover:from-primary-600 hover:to-primary-700
  text-white font-semibold
  px-6 py-3 rounded-xl
  shadow-lg hover:shadow-xl
  transition-all duration-200
  hover:scale-105
  active:scale-95
">
  <span className="relative z-10">Get Started</span>
  
  {/* Shimmer effect */}
  <div className="
    absolute inset-0
    bg-gradient-to-r from-transparent via-white/20 to-transparent
    -translate-x-full
    group-hover:translate-x-full
    transition-transform duration-1000
  " />
</button>

// Secondary Button (Outlined)
<button className="
  relative
  bg-transparent
  border-2 border-primary-500
  hover:bg-primary-500
  text-primary-500 hover:text-white
  font-semibold
  px-6 py-3 rounded-xl
  transition-all duration-200
  hover:scale-105
  active:scale-95
">
  Learn More
</button>

// Ghost Button
<button className="
  relative
  bg-transparent
  hover:bg-white/5
  text-neutral-300 hover:text-white
  font-medium
  px-4 py-2 rounded-lg
  transition-all duration-200
">
  View Details
</button>
```

### Card Component

```tsx
<div className="
  relative group
  bg-neutral-900/50
  backdrop-blur-sm
  border border-neutral-800
  hover:border-primary-500/50
  rounded-2xl
  p-6
  transition-all duration-300
  hover:shadow-2xl hover:shadow-primary-500/10
  hover:-translate-y-1
">
  {/* Gradient border effect on hover */}
  <div className="
    absolute inset-0 -z-10
    bg-gradient-to-br from-primary-500/20 to-accent-500/20
    rounded-2xl
    opacity-0 group-hover:opacity-100
    blur-xl
    transition-opacity duration-300
  " />
  
  {/* Card content */}
  <div className="relative z-10">
    {children}
  </div>
</div>
```

### Input Components

```tsx
// Text Input
<input className="
  w-full
  bg-neutral-900/50
  border-2 border-neutral-800
  focus:border-primary-500
  focus:ring-4 focus:ring-primary-500/20
  text-white placeholder:text-neutral-500
  px-4 py-3 rounded-xl
  transition-all duration-200
  outline-none
" />

// Search Input (with icon)
<div className="relative">
  <Search className="
    absolute left-4 top-1/2 -translate-y-1/2
    w-5 h-5 text-neutral-400
  " />
  <input className="
    w-full
    bg-neutral-900/50
    border-2 border-neutral-800
    focus:border-primary-500
    focus:ring-4 focus:ring-primary-500/20
    text-white placeholder:text-neutral-500
    pl-12 pr-4 py-3 rounded-xl
    transition-all duration-200
    outline-none
  " />
</div>
```

---

## Layout System

### Spacing Scale (8px base)

```javascript
spacing: {
  0: '0',
  1: '0.5rem',   // 8px
  2: '1rem',     // 16px
  3: '1.5rem',   // 24px
  4: '2rem',     // 32px
  5: '2.5rem',   // 40px
  6: '3rem',     // 48px
  8: '4rem',     // 64px
  10: '5rem',    // 80px
  12: '6rem',    // 96px
  16: '8rem',    // 128px
  20: '10rem',   // 160px
  24: '12rem',   // 192px
}
```

### Container System

```tsx
// Standard Container
<div className="container mx-auto px-4 max-w-7xl">
  {/* Content */}
</div>

// Wide Container (for dashboards)
<div className="container mx-auto px-4 max-w-[1920px]">
  {/* Content */}
</div>

// Narrow Container (for reading)
<div className="container mx-auto px-4 max-w-4xl">
  {/* Content */}
</div>
```

---

## Animation System

### Transitions

```javascript
// tailwind.config.js
transitionDuration: {
  fast: '100ms',
  normal: '200ms',
  slow: '300ms',
  slower: '500ms',
},

transitionTimingFunction: {
  'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
}
```

### Custom Animations

```javascript
animation: {
  'fade-in': 'fadeIn 200ms ease-out',
  'slide-up': 'slideUp 300ms ease-out',
  'scale-in': 'scaleIn 200ms ease-out',
  'shimmer': 'shimmer 2s linear infinite',
  'glow': 'glow 2s ease-in-out infinite',
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
  scaleIn: {
    '0%': { transform: 'scale(0.95)', opacity: '0' },
    '100%': { transform: 'scale(1)', opacity: '1' },
  },
  shimmer: {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(100%)' },
  },
  glow: {
    '0%, 100%': { opacity: '0.5' },
    '50%': { opacity: '1' },
  },
}
```

---

## Dark Theme Implementation

### Background Strategy

```css
/* Main background */
.bg-app {
  background: linear-gradient(
    180deg,
    #000000 0%,
    #0A0A0A 50%,
    #000000 100%
  );
}

/* Card backgrounds */
.bg-card {
  background: rgba(17, 24, 39, 0.5);
  backdrop-filter: blur(12px);
}

/* Elevated surfaces */
.bg-elevated {
  background: rgba(31, 41, 55, 0.6);
  backdrop-filter: blur(16px);
}
```

---

## Accessibility

### Focus States

```tsx
<button className="
  focus:outline-none
  focus:ring-4
  focus:ring-primary-500/50
  focus:border-primary-500
  transition-all duration-200
">
  Accessible Button
</button>
```

### Screen Reader Text

```tsx
<span className="sr-only">
  Current Fit Score: 87 out of 100
</span>
```

---

## Usage Example: Complete Homepage Hero

```tsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* Gradient background */}
  <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950 to-black" />
  
  {/* Animated gradient orbs */}
  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-glow" />
  <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-glow" style={{ animationDelay: '1s' }} />
  
  <div className="relative z-10 container mx-auto px-4 text-center">
    <h1 className="font-display text-6xl font-bold text-white mb-6 animate-fade-in">
      Start every hire with{' '}
      <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
        proof
      </span>
      , not guesswork
    </h1>
    
    <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto animate-slide-up">
      AI-powered Fit Scores turn 200 resumes into 5 great candidates
    </p>
    
    <div className="flex gap-4 justify-center animate-scale-in">
      <button className="
        bg-gradient-to-r from-primary-500 to-primary-600
        hover:from-primary-600 hover:to-primary-700
        text-white font-semibold
        px-8 py-4 rounded-xl
        shadow-lg hover:shadow-xl
        transition-all duration-200
        hover:scale-105
      ">
        Get Started Free
      </button>
      
      <button className="
        border-2 border-primary-500
        hover:bg-primary-500
        text-primary-500 hover:text-white
        font-semibold
        px-8 py-4 rounded-xl
        transition-all duration-200
        hover:scale-105
      ">
        Watch Demo
      </button>
    </div>
  </div>
</section>
```

---

**Status**: Production-ready design system  
**Next Step**: Implement across all pages  
**Maintenance**: Update quarterly based on design trends
