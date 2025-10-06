# Skylevel Design Territories Preview

A live preview system showcasing three different design approaches for the Skylevel AI-powered recruitment platform.

## 🎨 Design Territories

### Territory A: Confident Clarity (Dollar Shave Club inspired)
- **Style**: Bold, confident, and direct
- **Characteristics**:
  - Gradient backgrounds and strong color contrasts
  - Prominent CTAs with hover effects
  - Emphasis on quick decision-making
  - High energy, action-oriented interface

### Territory B: Thoughtful & Calm (Stoic inspired)
- **Style**: Minimalist, sophisticated, and data-driven
- **Characteristics**:
  - Generous whitespace and calm color palette
  - Thoughtful data presentation
  - Professional yet approachable design
  - Focus on quality and precision

### Territory C: Professional Efficiency (Cron inspired)
- **Style**: Keyboard-first, data-rich, and efficient
- **Characteristics**:
  - Professional blue color scheme
  - Bulk operations and keyboard shortcuts
  - Multi-pane layouts for information density
  - Optimized for power users

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to:
   ```
   http://localhost:5173
   ```

## 🛠️ Technology Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v3.4.15
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Color System**: Custom Skylevel design tokens

## 📁 Project Structure

```
src/
├── components/
│   ├── Navigation.tsx          # Main navigation component
│   └── territories/
│       ├── TerritoryA_ConfidentClarity.tsx    # Dollar Shave Club style
│       ├── TerritoryB_ThoughtfulCalm.tsx      # Stoic style
│       └── TerritoryC_ProfessionalEfficiency.tsx # Cron style
├── App.tsx                     # Main routing configuration
├── main.tsx                    # App entry point
└── index.css                   # Global styles + Tailwind
```

## 🎯 Available Routes

### Territory A - Confident Clarity
- `/territory-a/dashboard` - Recruiter Dashboard
- `/territory-a/fit-queue` - Fit Queue interface

### Territory B - Thoughtful & Calm
- `/territory-b/dashboard` - Recruiter Dashboard
- `/territory-b/fit-queue` - Fit Queue interface

### Territory C - Professional Efficiency
- `/territory-c/dashboard` - Recruiter Dashboard
- `/territory-c/fit-queue` - Fit Queue interface

### Default Routes
- `/` - Defaults to Territory A Dashboard
- `/dashboard` - Territory A Dashboard
- `/fit-queue` - Territory A Fit Queue

## 🎨 Design System

The project uses a comprehensive design system based on the Skylevel brand:

### Color Palette
- **Primary**: Skylevel Red spectrum (`primary-600: #8B1538`)
- **Accent**: Excellence Gold (`accent-400: #D4AF37`)
- **Neutral**: Dark theme (`neutral-950: #0A0606`)
- **Professional**: Blue (`professional-500: #3B82F6`)

### Typography
- **Font Stack**: System fonts (SF Pro, Segoe UI, Roboto)
- **Hierarchy**: H1-H4 with clear size and weight distinctions
- **Responsive**: Mobile-first scaling

### Components
- **ScorePill**: Critical component for displaying Fit Scores
- **CandidateCard**: Rich candidate information display
- **KPITile**: Dashboard metric visualization
- **Navigation**: Territory switcher and main navigation

## 🔄 Navigation

Use the navigation bar at the top to:

1. **Switch Territories**: Click the territory dropdown to explore different design approaches
2. **Navigate Components**: Switch between Dashboard and Fit Queue views
3. **Quick Access**: Direct navigation buttons for each component

## 📱 Responsive Design

All three territories are designed to be fully responsive:
- **Mobile**: Optimized for 320px+ screens
- **Tablet**: Enhanced experience for 640px-1024px
- **Desktop**: Full feature set for 1024px+ screens

## 🚀 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check
```

## 📊 Performance

- **Bundle Size**: ~290KB (gzipped: ~84KB)
- **First Load**: Optimized with Vite's HMR
- **Tailwind CSS**: JIT compilation for minimal CSS
- **Icons**: Tree-shaken Lucide React icons

---

**Status**: ✅ Live preview ready
**Next Steps**: Review design territories and provide feedback