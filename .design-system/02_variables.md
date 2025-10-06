# Skylevel Design Variables

## Key Design Variables for Style Guide Creation

### 1. Brand Identity Variables

**Primary Brand Color**: Skylevel Blue (#2563EB)
- Represents professional intelligence and technological innovation
- Used for primary actions, important CTAs, and key interactive elements
- Communicates trust and authority in the AI-powered recruitment process

**Accent Color**: Coral (#EF4444)
- Represents urgency, action, and candidate highlights
- Used for alerts, important notifications, and low scores
- Creates visual hierarchy and draws attention to critical information

**Excellence Color**: Gold (#F59E0B)
- Represents excellence, achievement, and high-quality candidates
- Used for high Fit Scores (85+), premium features, and success states
- Creates visual hierarchy and draws attention to top performers

**Success Color**: Green (#22C55E)
- Represents positive outcomes, good matches, and progress
- Used for good Fit Scores (70-84), successful actions, and confirmations
- Reinforces confidence in hiring decisions

**Dual Theme Support**: Light & Dark
- Light theme: Professional, clean interface for daytime use
- Dark theme: Reduced eye strain during extended review sessions
- Smooth transitions between themes with consistent visual hierarchy
- Both themes maintain accessibility and professional appearance

### 2. User Experience Variables

**Speed vs. Depth Balance**: 70% Speed, 30% Depth
- Primary interface optimized for quick scanning and decisions
- Secondary interfaces provide detailed analysis and validation
- Progressive disclosure of information as needed

**Confidence Indicators**: Visual trust signals
- Score confidence levels (High/Medium/Low)
- Peer validation strength indicators
- Data completeness badges
- Real-time status updates

**Information Density**: Medium-High
- Recruiters need to process large amounts of candidate data
- Cards must be information-rich but scannable
- Use visual grouping and whitespace to prevent overwhelm

### 3. Interaction Model Variables

**Primary Actions**: Bold and immediate
- "View Profile" - main exploration action
- "Add to Shortlist" - positive selection
- "Request More Info" - needs clarification
- "Not a Fit" - quick rejection

**Secondary Actions**: Subtle but accessible
- Share candidate profile
- Compare candidates
- Export data
- Schedule interview

**Feedback Loops**: Instant and informative
- Action confirmations
- Real-time Fit Score updates
- Peer validation notifications
- System status indicators

### 4. Technical Constraints

**Performance Targets**:
- Fit Queue load time: <100ms for 200 candidates
- Candidate profile load: <300ms
- Search/filter response: <50ms
- Mobile responsiveness: 44px minimum touch targets

**Accessibility Requirements**:
- WCAG 2.1 AA compliance
- Keyboard navigation for all actions
- Screen reader compatibility
- Color contrast minimum 4.5:1

**Platform Context**:
- Next.js 14 with Server Components
- Tailwind CSS for styling
- shadcn/ui component library
- Dark mode only (v1)

### 5. Content Strategy Variables

**Tone**: Professional but approachable
- Clear, direct language
- Action-oriented copy
- Avoid recruitment jargon where possible
- Use industry terms appropriately

**Data Presentation**:
- Numbers over paragraphs
- Visual indicators over text descriptions
- Progressive disclosure of details
- Contextual tooltips for complex metrics

**Microcopy Guidelines**:
- Buttons: Start with action verbs ("View", "Add", "Request")
- Status: Use clear, unambiguous terms
- Errors: Provide specific, actionable feedback
- Empty states: Guide users to next steps

### 6. Competitive Context Variables

**Differentiation from Traditional ATS**:
- Focus on quality over quantity
- Emphasize confidence and validation
- Speed-oriented design patterns
- Modern, professional aesthetic

**Target Competitive Positioning**:
- More sophisticated than basic job boards
- More specialized than general ATS
- More human-focused than pure AI tools
- More modern than legacy recruiting software

### 7. Design Pattern Variables

**Score Visualization**: Critical component used throughout
- 0-100 scale with color coding
- Confidence indicators
- Breakdown tooltips (TMS, SRS, RNS)
- Consistent sizing and placement

**Card-Based Layout**: Primary content pattern
- Candidate cards in Fit Queue
- Job cards in listings
- Shortlist cards for comparison
- Consistent header/action/content structure

**Modal System**: For detailed views
- Full candidate profiles
- Comparison views
- Filter and search interfaces
- Consistent sizing and behavior

### 8. Emotional Design Variables

**Trust Building**:
- Clear data sources
- Transparent scoring methodology
- Peer validation visibility
- Professional presentation

**Confidence Inspiring**:
- Bold, decisive actions
- Clear success indicators
- Progress feedback
- Professional aesthetic

**Reducing Anxiety**:
- Clear undo/redo capabilities
- Confirmation dialogs for destructive actions
- Save progress automatically
- Clear status indicators

### 9. Responsive Design Variables

**Mobile-First Strategy**:
- Core functionality on all devices
- Touch-friendly interactions (44px minimum)
- Progressive enhancement for larger screens
- Adaptive layouts for different contexts

**Breakpoint Strategy**:
- Mobile (0-640px): Core review actions
- Tablet (768px+): Enhanced comparison features
- Desktop (1024px+): Full analytics and bulk operations
- Large screens (1280px+): Multi-column layouts

### 10. Future-Proofing Variables

**Extensibility**:
- Component-based architecture
- Design token system
- Consistent naming conventions
- Documented design patterns

**Scalability**:
- Support for additional score dimensions
- Multi-language readiness
- Accessibility beyond minimum requirements
- Performance at scale (1000+ candidates)

**Integration Points**:
- API-first design patterns
- Consistent data structures
- Extensible component props
- Theme-ready architecture