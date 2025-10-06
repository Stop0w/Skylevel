
# Skylevel Design Approach

**Version**: 2.0  
**Last Updated**: January 2025  
**Stack**: Next.js 14 PWA (Mobile-First)  
**Status**: Greenfield Rebuild Ready

---

## Design Philosophy

**Core Principle**: Mobile-First Progressive Web App

Skylevel is designed as a **mobile-first PWA** because:
- 70% of recruiter screening happens during "dead time" (commute, between meetings)
- 60%+ of job applications start on mobile devices
- One-click referral actions demand mobile convenience
- Desktop users get enhanced features, not a separate experience

---

## Progressive Web App Strategy

### Phase 1: Mobile-First Web (Weeks 1-3)

**Viewport Priority**:
```
375px (Mobile) → 768px (Tablet) → 1440px (Desktop)
```

**Mobile-First Features**:
- Touch-first interactions (44px minimum touch targets)
- Bottom navigation for core actions
- Swipeable candidate cards in Fit Queue
- One-handed operation zones
- Instant feedback animations
- Progressive enhancement for larger screens

**PWA Capabilities**:
```javascript
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});

module.exports = withPWA({
  // ... other Next.js config
});
```

**Manifest Configuration**:
```json
{
  "name": "Skylevel - Human + AI Future of Hiring",
  "short_name": "Skylevel",
  "description": "Start Every Hire with Proof, Not Guesswork",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0A0606",
  "theme_color": "#8B1538",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Phase 2: Desktop Enhancement (Week 4)

**Desktop-Specific Features**:
- Expanded sidebar navigation
- Multi-column layouts (Fit Queue + Candidate Detail side-by-side)
- Keyboard shortcuts (J/K for navigation, Enter to open, Esc to close)
- Bulk actions (multi-select candidates)
- Hover states and tooltips

---

## Responsive Breakpoint Strategy

### Breakpoint System

| Breakpoint | Width | Device | Layout Strategy |
|------------|-------|--------|-----------------|
| `mobile` | 0-640px | Phone | Single column, bottom nav, touch-first |
| `md` | 768px+ | Tablet | Expanded cards, hybrid nav |
| `lg` | 1024px+ | Laptop | Multi-column, sidebar nav |
| `xl` | 1280px+ | Desktop | Full features, keyboard shortcuts |

### Implementation Pattern

```tsx
// Example: Fit Queue responsive layout
<div className="
  flex flex-col gap-4 p-4
  md:gap-6 md:p-6
  lg:grid lg:grid-cols-[1fr_400px] lg:gap-8
  xl:grid-cols-[1fr_500px]
">
  {/* Candidate list */}
  <div className="space-y-3 md:space-y-4">
    {candidates.map(candidate => (
      <CandidateCard key={candidate.id} {...candidate} />
    ))}
  </div>
  
  {/* Detail panel (hidden on mobile, visible on desktop) */}
  <div className="hidden lg:block sticky top-4">
    <CandidateDetailPanel />
  </div>
</div>
```

---

## Mobile-First Component Design

### Touch Target Sizing

**Minimum Sizes**:
- Buttons: 44px × 44px (Apple HIG standard)
- Interactive cards: 56px min height
- Swipe zones: Full width
- Checkbox/Radio: 24px × 24px with 44px touch area

```tsx
// Example: Touch-optimized button
<button className="
  min-h-[44px] px-6 
  text-base font-medium
  active:scale-95 transition-transform
  touch-manipulation
">
  Apply Now
</button>
```

### Bottom Navigation (Mobile Only)

**Core Actions**:
- Dashboard (Home)
- Jobs (Browse/Search)
- Applications (Status tracking)
- Profile (Settings)

```tsx
// src/components/BottomNav.tsx
export default function BottomNav() {
  return (
    <nav className="
      fixed bottom-0 left-0 right-0 z-50
      bg-neutral-900 border-t border-neutral-700
      flex justify-around items-center
      h-16 px-2
      lg:hidden
    ">
      {navItems.map(item => (
        <Link
          key={item.path}
          href={item.path}
          className="
            flex flex-col items-center justify-center
            flex-1 h-full
            text-xs font-medium
            text-neutral-400 hover:text-primary-400
            transition-colors
          "
        >
          <item.icon className="w-6 h-6 mb-1" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
```

### Swipeable Fit Queue

**Interaction Pattern**:
- Swipe right → View profile
- Swipe left → Skip
- Tap → Expand inline
- Long press → Actions menu

```tsx
'use client'

import { useState } from 'react';

export default function SwipeableCard({ candidate }) {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleSwipe = () => {
    if (touchStart - touchEnd > 75) {
      // Swiped left - skip
      onSkip(candidate.id);
    }
    if (touchEnd - touchStart > 75) {
      // Swiped right - view profile
      onView(candidate.id);
    }
  };

  return (
    <div
      onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
      onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
      onTouchEnd={handleSwipe}
      className="touch-pan-y"
    >
      {/* Candidate card content */}
    </div>
  );
}
```

---

## Performance Optimization

### Mobile-First Performance Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| First Contentful Paint | < 1.5s | Server Components, minimal JS |
| Time to Interactive | < 3s | Code splitting, lazy loading |
| Bundle Size (First Load) | < 300KB | Tree shaking, dynamic imports |
| Image Load | < 2s | Next.js Image optimization |

### Code Splitting Strategy

```tsx
// Lazy load heavy components
import dynamic from 'next/dynamic';

const CandidateDetailModal = dynamic(
  () => import('@/components/CandidateDetailModal'),
  { 
    loading: () => <Skeleton className="h-96" />,
    ssr: false // Client-side only for modals
  }
);
```

### Image Optimization

```tsx
import Image from 'next/image';

<Image
  src={candidate.avatar}
  alt={candidate.name}
  width={48}
  height={48}
  className="rounded-full"
  loading="lazy"
  placeholder="blur"
  blurDataURL="/avatar-placeholder.jpg"
/>
```

---

## Accessibility (Mobile-First)

### Touch Accessibility

- All interactive elements: 44px minimum
- Focus indicators visible on keyboard navigation
- Skip links for keyboard users
- ARIA labels for icon-only buttons

```tsx
<button
  aria-label="View candidate profile"
  className="
    w-11 h-11 
    rounded-full
    focus:ring-2 focus:ring-primary-400 focus:outline-none
  "
>
  <UserIcon className="w-6 h-6" />
</button>
```

### Screen Reader Support

```tsx
<div role="status" aria-live="polite" aria-atomic="true">
  {fitScore >= 85 && (
    <span className="sr-only">
      High fit score: {fitScore} out of 100
    </span>
  )}
</div>
```

---

## Why NOT Native Apps (Initially)

### Strategic Decision

❌ **Native Apps (iOS/Android)**:
- 2x development time
- App store approval delays (1-7 days)
- Update friction (users must download)
- Platform-specific bugs
- 30% App Store fee on transactions

✅ **PWA (Next.js)**:
- 1 codebase, all platforms
- Instant updates (no user action)
- No gatekeeping
- SEO benefits
- 90% of native app features

### PWA Feature Parity

| Feature | Native App | PWA (Next.js) |
|---------|------------|---------------|
| Offline mode | ✅ | ✅ (Service Workers) |
| Push notifications | ✅ | ✅ (Web Push API) |
| Home screen icon | ✅ | ✅ (Add to Home) |
| Background sync | ✅ | ✅ (Background Sync API) |
| Camera access | ✅ | ✅ (MediaDevices API) |
| App Store presence | ✅ | ❌ (Not needed for B2B SaaS) |

### When to Consider Native Apps

**Only if**:
- Push notification engagement < 20% (PWA limitation on iOS)
- Offline mode becomes critical for enterprise
- App Store presence required for deals
- Platform-specific features needed (Face ID, etc.)

**Confidence Level**: 90% that PWA is sufficient for Skylevel MVP and Series A.

---

## Design System Integration

### Mobile-First Typography

```css
/* Fluid typography scale */
.text-display {
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1.1;
}

.text-heading {
  font-size: clamp(1.5rem, 3vw, 2rem);
  line-height: 1.2;
}

.text-body {
  font-size: clamp(0.875rem, 1vw, 1rem);
  line-height: 1.6;
}
```

### Touch-Optimized Spacing

```tsx
// Spacing scale designed for thumb zones
<div className="
  p-4        /* Mobile: 16px */
  md:p-6     /* Tablet: 24px */
  lg:p-8     /* Desktop: 32px */
">
  {/* Content */}
</div>
```

---

## Implementation Checklist

### Week 1: Mobile Foundation

- [ ] Configure Next.js for mobile-first
- [ ] Set up PWA manifest and service worker
- [ ] Implement bottom navigation
- [ ] Design touch-optimized buttons
- [ ] Test on real devices (iPhone, Android)

### Week 2: Core Flows (Mobile)

- [ ] Build swipeable Fit Queue
- [ ] Implement mobile job search
- [ ] Create touch-friendly forms
- [ ] Add pull-to-refresh
- [ ] Test gesture interactions

### Week 3: Desktop Enhancement

- [ ] Add sidebar navigation
- [ ] Implement keyboard shortcuts
- [ ] Build multi-column layouts
- [ ] Add hover states
- [ ] Test on large screens

### Week 4: PWA Polish

- [ ] Configure offline fallback
- [ ] Set up push notifications
- [ ] Add install prompts
- [ ] Test "Add to Home Screen"
- [ ] Verify iOS Safari compatibility

---

## Testing Strategy

### Device Testing Matrix

| Device | Priority | Breakpoint | Key Tests |
|--------|----------|------------|-----------|
| iPhone 13/14 (375px) | P0 | Mobile | Touch, bottom nav, swipe |
| iPad (768px) | P1 | Tablet | Hybrid layout, touch |
| MacBook (1440px) | P1 | Desktop | Sidebar, keyboard, hover |
| Android (360px) | P1 | Mobile | Touch, PWA install |

### Performance Testing

```bash
# Lighthouse audit (mobile-first)
npx lighthouse https://skylevel.com \
  --only-categories=performance,accessibility,pwa \
  --emulated-form-factor=mobile \
  --throttling.cpuSlowdownMultiplier=4
```

**Target Scores**:
- Performance: 95+
- Accessibility: 95+
- PWA: 100

---

## The 0.1% Operator Decision

**Build Mobile-First PWA on Next.js 14**

**Rationale**:
- Faster time-to-market (3 weeks vs 8+ for native)
- Lower cost (1 team vs 3)
- Better iteration speed (deploy hourly vs weekly)
- Reaches both audiences (recruiters on desktop + mobile)
- Market differentiation (competitors are desktop-heavy)

**Risk**: Low - PWAs are production-proven (Twitter, Starbucks, Uber)

**Next Steps**:
1. Design Fit Queue for 375px first
2. Add PWA manifest to Next.js config
3. Test touch interactions (swipe, tap, long-press)
4. Add bottom nav as primary navigation

---

**Document Owner**: Lead Engineer  
**Last Updated**: January 2025  
**Status**: Active - Mobile-First PWA Strategy  
**Feedback**: Submit via GitHub issues with `design` label
