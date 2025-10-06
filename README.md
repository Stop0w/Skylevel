# Skylevel

AI-powered candidate intelligence layer that accelerates recruitment decisions through validated Fit Scores.

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Configure your database URL and Clerk authentication keys.

3. **Set up the database**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## 🎯 Core Features

- **Fit Score Intelligence**: Transform 200+ resumes into 5 high-confidence candidates
- **Technical Match Score (TMS)**: Skill alignment vs job requirements
- **Soft Skills Rating (SRS)**: Behavioral fit assessment
- **Referral Network Score (RNS)**: Peer validation strength
- **JobPrint™**: Custom scoring weights per role

## 🏗️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: Clerk
- **Validation**: Zod
- **Testing**: Vitest, Playwright

## 📁 Project Structure

```
app/
├── (auth)/              # Authentication routes
├── (recruiter)/         # Recruiter-specific routes
│   ├── fit-queue/       # PRIMARY SCREEN
│   ├── dashboard/
│   └── shortlists/
├── (candidate)/         # Candidate-facing routes
├── api/                 # API Routes
├── components/          # Reusable UI components
│   ├── common/          # ScorePill, CandidateCard, etc.
│   └── ui/              # shadcn/ui components
└── lib/                 # Utilities and configurations
```

## 🔧 Development Commands

```bash
# Development
npm run dev              # Start development server

# Building
npm run build            # Build for production
npm start               # Start production server

# Database
npx prisma migrate dev   # Create database migration
npx prisma studio       # Open database browser
npx prisma generate      # Generate Prisma client

# Testing
npm test                # Run unit tests
npm run test:e2e        # Run E2E tests

# Linting
npm run lint            # Run ESLint
```

## 🎨 Design System

- **Primary**: Red spectrum (`#8B1538`)
- **Accent**: Gold (`#D4AF37`) for high scores
- **Background**: Light neutral (`#F5F2E8`)
- **Typography**: System fonts, mobile-first responsive

## 📊 Key Components

### ScorePill
Most critical UI component - displays Fit Scores consistently across the app.
- Shows 0-100 score with color coding (85+ gold, 70+ green, 50+ orange, <50 red)
- Includes confidence level indicator
- Tooltip with detailed score breakdown (TMS, SRS, RNS)

### CandidateCard
Reusable card component for displaying candidate information with Fit Scores.

## 🚀 Deployment

This project is designed for **Replit Autoscale Deployments** but can be deployed to any Vercel-compatible platform.

## 📖 Documentation

- [Architecture Overview](docs/ARCHITECTURE.md)
- [Database Schema](docs/DATABASE_SCHEMA.md)
- [API Specification](docs/API_SPECIFICATION.md)
- [Implementation Roadmap](docs/IMPLEMENTATION_ROADMAP.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.