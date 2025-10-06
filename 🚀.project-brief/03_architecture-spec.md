# Architecture Specification

## Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **State Management**: Redux Toolkit with RTK Query
- **UI Library**: Custom components based on design system
- **Styling**: CSS Modules with Tailwind CSS for utility classes
- **Code Editor**: Monaco Editor for Liquid syntax highlighting
- **Real-time**: WebSocket connections for collaboration

### Backend
- **Framework**: Node.js with Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens with Shopify OAuth integration
- **File Storage**: AWS S3 for theme assets and backups
- **API**: RESTful API with WebSocket support
- **Caching**: Redis for session management and performance

### Infrastructure
- **Hosting**: Vercel for frontend, AWS EC2 for backend
- **Database**: AWS RDS PostgreSQL
- **CDN**: Cloudflare for static assets
- **Monitoring**: Datadog for application performance
- **CI/CD**: GitHub Actions for automated deployment

## Data Models

### Theme
```typescript
interface Theme {
  id: string;
  name: string;
  shopId: string;
  version: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  settings: ThemeSettings;
}
```

### UI_Element
```typescript
interface UI_Element {
  id: string;
  themeId: string;
  type: 'section' | 'block' | 'component';
  name: string;

  // Content
  content: ElementContent;

  // Layout
  layout: {
    position: { x: number; y: number };
    dimensions: { width: number; height: number };
    padding: { top: number; right: number; bottom: number; left: number };
    margin: { top: number; right: number; bottom: number; left: number };
  };

  // Style
  style: {
    fill: string | Gradient;
    stroke: StrokeStyle;
    effects: Effect[];
    typography: Typography;
    layout: LayoutStyle;
  };

  // Liquid-specific
  liquidCode: string;
  schema: SchemaDefinition;
}
```

### ThemeSettings
```typescript
interface ThemeSettings {
  colors: ColorPalette;
  typography: FontSettings;
  spacing: SpacingScale;
  breakpoints: BreakpointSettings;
  customCSS: string;
  schema: ThemeSchema;
}
```

### User
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  shopifyShopId: string;
  role: 'admin' | 'developer' | 'designer';
  permissions: Permission[];
  createdAt: Date;
}
```

## API Contracts

### Theme Management
- `GET /api/themes` - List all themes for a shop
- `GET /api/themes/:id` - Get theme details and structure
- `POST /api/themes` - Create new theme
- `PUT /api/themes/:id` - Update theme metadata
- `DELETE /api/themes/:id` - Delete theme
- `POST /api/themes/:id/publish` - Publish theme to Shopify store
- `POST /api/themes/:id/duplicate` - Create theme copy

### Element Management
- `GET /api/themes/:id/elements` - Get all theme elements
- `GET /api/themes/:id/elements/:elementId` - Get specific element
- `POST /api/themes/:id/elements` - Create new element
- `PUT /api/themes/:id/elements/:elementId` - Update element
- `DELETE /api/themes/:id/elements/:elementId` - Delete element
- `POST /api/themes/:id/elements/reorder` - Reorder elements

### Real-time Operations
- `WebSocket /ws/theme/:id` - Real-time collaboration
  - `element:update` - Element changes
  - `selection:change` - Selection updates
  - `cursor:move` - User cursor positions
  - `comment:add` - Add comments

### Asset Management
- `GET /api/themes/:id/assets` - List theme assets
- `POST /api/themes/:id/assets/upload` - Upload asset
- `DELETE /api/themes/:id/assets/:assetId` - Delete asset
- `GET /api/assets/:assetId` - Serve asset file

### Code Operations
- `POST /api/themes/:id/validate` - Validate Liquid code
- `GET /api/themes/:id/preview` - Generate theme preview
- `POST /api/themes/:id/export` - Export theme as ZIP

## Security Considerations

### Authentication
- Shopify OAuth 2.0 flow for user authentication
- JWT tokens for session management
- Role-based access control (RBAC)

### Data Protection
- All API requests over HTTPS
- Sensitive data encryption at rest
- Regular security audits and penetration testing

### Rate Limiting
- API rate limiting to prevent abuse
- Request validation and sanitization
- DDoS protection measures

## Performance Optimization

### Frontend
- Code splitting and lazy loading
- Virtual scrolling for large element lists
- Optimized asset loading and caching
- Service worker for offline functionality

### Backend
- Database query optimization
- Redis caching for frequent requests
- CDN integration for static assets
- Horizontal scaling capabilities