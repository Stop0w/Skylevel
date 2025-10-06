# Skylevel Depth System Style Guide

**Version**: 2.0
**Date**: January 2025
**Status**: Design System Specification
**Framework**: Next.js 14 + Tailwind CSS + OKLCH CSS Custom Properties

---

## Executive Summary

This depth system evolves Skylevel's UI from flat design to a purpose-driven depth system that enhances usability through clear visual hierarchy. Every shadow and layer serves a specific purpose: reducing cognitive load, guiding user attention, and providing clear interaction feedback.

**Core Philosophy**: Clarity Over Decoration - depth must always serve a purpose and make the UI's structure self-evident.

**Color System**: Uses OKLCH color space for perceptual uniformity and consistent appearance across all devices and display technologies.

---

## Design Principles

### 1. **Clarity Over Decoration**
- Every shadow and layer must have a clear "why"
- Reduce cognitive load by making UI structure self-evident
- Guide user attention to interactive elements
- Provide clear feedback on interaction states

### 2. **Systematize Everything**
- All depth effects codified as design tokens
- No "one-off" shadow or color values
- Single source of truth for design and development
- Consistent, scalable implementation

### 3. **Accessibility is Non-Negotiable**
- All color combinations pass WCAG AA contrast ratios
- UI remains perfectly usable without depth perception
- Borders serve as fallbacks where necessary
- Focus rings provide alternative interaction cues

### 4. **Interaction Defines Depth**
- Elevation communicates element state (hover, focus, active)
- Shows relationship to user's workflow
- Modal elements clearly separated from page context
- Interactive behavior defines visual hierarchy

---

## Z-Axis Token System

### 1. Elevation Levels (Surfaces)

#### OKLCH Surface Color System

```css
/* Skylevel :: Dark Theme (Default) */
:root {
  /* Base colors - Sophisticated & Focused */
  --surface-base: oklch(0.09 0.002 291); /* Main page background */
  --surface-recessed: oklch(0.12 0.004 291); /* Sunken/contained elements */
  --surface-level: oklch(0.12 0.004 291); /* Default static content cards */
  --surface-raised: oklch(0.18 0.006 291); /* Primary interactive elements */
  --surface-overlay: oklch(1 0 0); /* Transient elements above all content */

  /* UI Elements */
  --surface-border: oklch(0.22 0.006 291); /* Consistent border color */
  --surface-border-hover: oklch(0.42 0.01 291); /* Hover state borders */
}

/* Skylevel :: Light Theme */
.light {
  /* Base colors */
  --surface-base: oklch(0.97 0.003 291); /* Main page background */
  --surface-recessed: oklch(0.94 0.004 291); /* Sunken/contained elements */
  --surface-level: oklch(1 0 0); /* Default static content cards */
  --surface-raised: oklch(0.94 0.004 291); /* Primary interactive elements */
  --surface-overlay: oklch(1 0 0); /* Transient elements above all content */

  /* UI Elements */
  --surface-border: oklch(0.91 0.004 291); /* Consistent border color */
  --surface-border-hover: oklch(0.42 0.01 291); /* Hover state borders */
}
```

### 2. Shadow System (Elevation Cues)

#### OKLCH Shadow System

```css
/* Skylevel :: Shadow System (OKLCH-based) */
:root {
  /* Shadow Color - Matches dark theme background */
  --shadow-color: oklch(0.09 0.002 291);

  /* Shadow XS - Subtle lift for hover/focus states */
  --shadow-xs: 0 1px 2px 0px var(--shadow-color / 0.08);

  /* Shadow SM - Default for surface-raised elements and cards */
  --shadow-sm: 0 1px 3px 0px var(--shadow-color / 0.10);

  /* Shadow MD - Standard elevation for interactive elements */
  --shadow-md: 0 4px 6px -1px var(--shadow-color / 0.12),
              0 2px 4px -2px var(--shadow-color / 0.08);

  /* Shadow LG - Surface-overlay elements (modals, dropdowns) */
  --shadow-lg: 0 10px 15px -3px var(--shadow-color / 0.12),
              0 4px 6px -4px var(--shadow-color / 0.08);

  /* Shadow XL - Maximum elevation for critical overlays */
  --shadow-xl: 0 20px 25px -5px var(--shadow-color / 0.12),
              0 8px 10px -6px var(--shadow-color / 0.08);

  /* Shadow Inner - Inset shadow for surface-recessed elements */
  --shadow-inner: inset 0 2px 4px 0px var(--shadow-color / 0.06);
}

/* Light theme shadow adaptation */
.light {
  /* Shadow Color - Matches light theme needs */
  --shadow-color: oklch(0.09 0.002 291);
}
```

### 3. Border System (Accessibility Fallbacks)

#### Border Tokens

```css
:root {
  /* Border colors that complement shadows */
  --border-base: #E5E7EB;
  --border-recessed: #D1D5DB;
  --border-level: #E5E7EB;
  --border-raised: #D1D5DB;
  --border-overlay: #9CA3AF;

  /* Focus ring colors */
  --focus-ring: #3B82F6;
  --focus-ring-width: 2px;
  --focus-ring-offset: 2px;
}

[data-theme="dark"] {
  --border-base: #374151;
  --border-recessed: #4B5563;
  --border-level: #4B5563;
  --border-raised: #6B7280;
  --border-overlay: #9CA3AF;
}
```

---

## Interaction State Protocol

### State Transitions

#### 1. Default State
```css
.interactive-element {
  background-color: var(--surface-raised);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-raised);
}
```

#### 2. Hover State
```css
.interactive-element:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-1px);
}
```

#### 3. Focus State
```css
.interactive-element:focus {
  box-shadow: var(--shadow-lg);
  outline: none;
  outline-offset: var(--focus-ring-offset);
  outline: var(--focus-ring-width) solid var(--focus-ring);
}
```

#### 4. Active/Pressed State
```css
.interactive-element:active {
  box-shadow: var(--shadow-sm);
  transform: translateY(0);
}
```

---

## Component Implementation

### 1. Button System

#### Primary Button
```css
.btn-primary {
  background-color: var(--surface-raised);
  background-image: linear-gradient(135deg, #3B82F6, #2563EB);
  box-shadow: var(--shadow-md);
  border: 1px solid transparent;
  color: white;
}

.btn-primary:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-1px);
}

.btn-primary:focus {
  outline: var(--focus-ring-width) solid var(--focus-ring);
  outline-offset: var(--focus-ring-offset);
}

.btn-primary:active {
  box-shadow: var(--shadow-sm);
  transform: translateY(0);
}
```

#### Secondary Button
```css
.btn-secondary {
  background-color: var(--surface-raised);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-raised);
  color: #374151;
}

.btn-secondary:hover {
  box-shadow: var(--shadow-lg);
  background-color: var(--surface-overlay);
}
```

### 2. Card System

#### Static Card
```css
.card {
  background-color: var(--surface-level);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-level);
  border-radius: 8px;
}
```

#### Interactive Card
```css
.card-interactive {
  background-color: var(--surface-level);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-level);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.card-interactive:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### 3. Input Field System

#### Text Input
```css
.input {
  background-color: var(--surface-recessed);
  box-shadow: var(--shadow-inner);
  border: 1px solid var(--border-recessed);
  border-radius: 6px;
}

.input:focus {
  box-shadow: var(--shadow-inner), 0 0 0 3px rgb(59 130 246 / 0.1);
  border-color: var(--focus-ring);
  outline: none;
}
```

### 4. Modal System

#### Modal Overlay
```css
.modal-overlay {
  background-color: var(--surface-overlay);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-overlay);
  border-radius: 12px;
  position: relative;
  z-index: 1000;
}
```

---

## Design System Do's and Don'ts

### ✅ Do's

1. **Use tokens consistently** - Always use defined surface and shadow tokens
2. **Pair shadows with borders** - Ensure accessibility with border fallbacks
3. **Maintain contrast** - All text must meet WCAG AA standards on all surfaces
4. **Animate transitions** - Use smooth transitions for state changes
5. **Test without color** - Verify usability for users with depth perception issues
6. **Use semantic elevation** - Higher elevation = more important/actionable

### ❌ Don'ts

1. **Create custom shadows** - Never use arbitrary box-shadow values
2. **Overwhelm with depth** - Don't use excessive elevation for non-interactive elements
3. **Mix themes** - Don't combine light/dark theme tokens
4. **Skip focus states** - Always provide clear focus indicators
5. **Use shadows alone** - Don't rely solely on shadows for state communication
6. **Inflate elevation** - Don't use higher elevation than necessary

---

## Tailwind CSS Integration

### Custom Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        surface: {
          base: 'var(--surface-base)',
          recessed: 'var(--surface-recessed)',
          level: 'var(--surface-level)',
          raised: 'var(--surface-raised)',
          overlay: 'var(--surface-overlay)',
        },
        border: {
          base: 'var(--border-base)',
          recessed: 'var(--border-recessed)',
          level: 'var(--border-level)',
          raised: 'var(--border-raised)',
          overlay: 'var(--border-overlay)',
        }
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'inner': 'var(--shadow-inner)',
      }
    }
  }
}
```

### Utility Classes

```css
/* Elevation utilities */
.elevate-base { background-color: var(--surface-base); }
.elevate-recessed { background-color: var(--surface-recessed); }
.elevate-level { background-color: var(--surface-level); }
.elevate-raised { background-color: var(--surface-raised); }
.elevate-overlay { background-color: var(--surface-overlay); }

/* Shadow utilities */
.shadow-sm { box-shadow: var(--shadow-sm); }
.shadow-md { box-shadow: var(--shadow-md); }
.shadow-lg { box-shadow: var(--shadow-lg); }
.shadow-inner { box-shadow: var(--shadow-inner); }

/* Border utilities */
.border-base { border-color: var(--border-base); }
.border-recessed { border-color: var(--border-recessed); }
.border-level { border-color: var(--border-level); }
.border-raised { border-color: var(--border-raised); }
.border-overlay { border-color: var(--border-overlay); }
```

---

## Performance Considerations

### Optimization Strategies

1. **CSS Custom Properties** - Use for theme switching and dynamic updates
2. **Transform over box-shadow** - Use transform for animations when possible
3. **Will-change property** - Specify for complex animations
4. **Reduced motion support** - Respect user preferences
5. **Hardware acceleration** - Use transform3d for smooth animations

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Accessibility Implementation

### Focus Management

```css
/* High contrast focus rings */
.focus-ring {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

/* Skip link for keyboard navigation */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--surface-raised);
  color: var(--focus-ring);
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 1000;
}

.skip-link:focus {
  top: 6px;
}
```

### Screen Reader Support

```html
<!-- Semantic structure with depth indicators -->
<div class="card" role="article" aria-label="Candidate card">
  <div class="card-content">
    <h3>Sarah Chen</h3>
    <p>Senior Frontend Developer</p>
    <div class="score-pill" aria-label="Fit Score: 87 out of 100">87</div>
  </div>
</div>
```

---

## Implementation Checklist

### Phase 1: System Definition ✅
- [x] Define surface color tokens for light and dark themes
- [x] Create shadow system with realistic light physics
- [x] Establish border system for accessibility fallbacks
- [x] Document interaction state protocol
- [x] Create comprehensive do's and don'ts guidelines

### Phase 2: Component Application
- [ ] Apply depth system to Button components
- [ ] Apply depth system to Card components
- [ ] Apply depth system to Navigation Tabs
- [ ] Apply depth system to Modal components
- [ ] Apply depth system to Input Fields
- [ ] Apply depth system to Table components
- [ ] Create interaction state prototypes

### Phase 3: Validation & Handoff
- [ ] Conduct accessibility audit
- [ ] Test contrast ratios for all combinations
- [ ] Validate keyboard navigation
- [ ] Prepare developer documentation
- [ ] Create migration guide from flat design

---

## Usage Examples

### Complete Component Example

```html
<div class="card-interactive group" tabindex="0" role="button">
  <div class="elevate-level shadow-md border-level p-6 rounded-lg transition-all duration-200 group-hover:shadow-lg group-hover:-translate-y-1">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold">Candidate Profile</h3>
      <div class="score-pill elevate-raised shadow-sm" aria-label="Fit Score: 87">87</div>
    </div>

    <div class="space-y-2">
      <p class="text-gray-600">Sarah Chen</p>
      <p class="text-sm text-gray-500">Senior Frontend Developer</p>
    </div>

    <button class="btn-primary mt-4">
      View Profile
    </button>
  </div>
</div>
```

---

## Conclusion

This depth system provides a purpose-driven approach to UI elevation that enhances usability while maintaining accessibility and performance. By systematizing all depth effects as tokens, we ensure consistency across the entire design system while enabling designers and developers to create intuitive, hierarchical interfaces.

The system is designed to be:
- **Accessible**: WCAG AA compliant with fallbacks
- **Performant**: Optimized animations and transitions
- **Scalable**: Token-based for easy maintenance
- **Intuitive**: Clear visual hierarchy that guides users

**Next Step**: Apply this system to all core components and validate through accessibility testing.

---

**Status**: System definition complete
**Next Phase**: Component application
**Maintenance**: Review quarterly for performance and accessibility standards