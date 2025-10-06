# Horizon Bridge - E-commerce App Integration

This document describes the integration of the Sagitine React e-commerce application with the Horizon Bridge Shopify Theme Editor.

## Overview

The Horizon Bridge editor now supports loading and editing a real-world React e-commerce application (Sagitine) as a test case for JSX editing capabilities. The integration includes:

1. **React E-commerce App**: A production-level e-commerce application built with React, TypeScript, and Vite
2. **Editor Bridge**: A communication layer that enables bidirectional messaging between the editor and the e-commerce app
3. **Component Inspection**: The ability to inspect and select React components within the running e-commerce app
4. **Real-time Updates**: The capability to send updates from the editor to modify components in the e-commerce app

## Architecture

```
┌─────────────────────────┐       ┌─────────────────────────┐       ┌─────────────────────────┐
│   Horizon Bridge       │       │   React E-commerce     │       │   Editor Bridge         │
│   Editor Frontend      │◄─────►│   Application          │◄─────►│   (injected script)    │
│   (Next.js)            │       │   (Vite/React)         │       │                       │
└─────────────────────────┘       └─────────────────────────┘       └─────────────────────────┘
          │                                    │                                    │
          └────────────────────────────────────┼────────────────────────────────────┘
                                               │
                                               ▼
                                      Component Tree & Updates
```

## Key Components

### 1. EcommerceAppLoader Component
- Location: `🖥️.frontend/src/components/Canvas/EcommerceAppLoader.tsx`
- Renders the e-commerce app in an iframe
- Establishes communication via postMessage API
- Handles loading states and errors

### 2. Editor Bridge Script
- Location: `ecommerce-app/public/editor-bridge.js`
- Injected into the e-commerce app
- Tracks React components and their DOM elements
- Handles hover, click, and update events
- Sends component tree to editor

### 3. Updated CenterPanel
- Location: `🖥️.frontend/src/components/Panels/CenterPanel.tsx`
- Toggle between e-commerce app and sample store
- Integrates with existing element selection system

## Communication Protocol

### Editor → E-commerce App
- `EDITOR_INIT`: Initialize the connection
- `VIEW_MODE_CHANGE`: Switch between desktop/tablet/mobile views
- `SELECT_ELEMENT`: Select a specific component
- `UPDATE_ELEMENT`: Apply updates to a component

### E-commerce App → Editor
- `EDITOR_BRIDGE_READY`: Bridge script is loaded
- `ECOMMERCE_APP_LOADED`: App is fully loaded
- `ELEMENT_HOVER`: User hovers over a component
- `ELEMENT_CLICK`: User clicks a component
- `COMPONENT_TREE`: Complete component hierarchy
- `ERROR`: Error messages

## Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Install all dependencies
npm run install:all

# or manually:
npm install
cd 🖥️.frontend && npm install
cd ../ecommerce-app && npm install
```

### Running the Applications

#### Option 1: Using the dev script (recommended)
```bash
# Starts both applications automatically
npm run dev
```

#### Option 2: Manual startup
```bash
# Terminal 1 - Start e-commerce app (port 5173)
npm run dev:ecommerce

# Terminal 2 - Start editor (port 3000)
npm run dev:frontend
```

### Accessing the Applications
- Horizon Bridge Editor: http://localhost:3000
- E-commerce App (standalone): http://localhost:5173
- E-commerce App (via editor proxy): http://localhost:3000/ecommere-app

## Testing the Integration

1. **Load the Editor**: Navigate to http://localhost:3000
2. **Switch to E-commerce App**: Click the "E-commerce App" button in the canvas toolbar
3. **Inspect Components**: Hover over elements in the e-commerce app to see them highlighted
4. **Select Components**: Click on elements to select them and see their properties in the contextual editor
5. **View Component Tree**: Check browser console for component hierarchy

## Features

### Component Detection
The editor bridge automatically detects common e-commerce components:
- Headers and Navigation
- Hero Sections and Banners
- Product Cards and Grids
- Buttons and CTAs
- Footers
- Containers and Wrappers

### Visual Feedback
- Hover: Blue outline (2px, rgba(59, 130, 246, 0.5))
- Selected: Purple outline (2px, rgb(139, 92, 246))
- Selection handles at corners

### Responsive Support
- Desktop (1200x800)
- Tablet (768x1024)
- Mobile (375x667)

## Troubleshooting

### Common Issues

1. **E-commerce app not loading in iframe**
   - Check if the e-commerce app is running on port 5173
   - Verify CORS settings in Next.js config
   - Check browser console for errors

2. **Components not being detected**
   - Ensure editor-bridge.js is loaded in index.html
   - Check if component selectors match your app's structure
   - Look for errors in browser console

3. **Communication not working**
   - Verify both apps are on localhost
   - Check postMessage security settings
   - Ensure messages are being sent/received correctly

### Debug Mode
Open browser console and look for:
- Bridge initialization messages
- Component detection logs
- Communication events
- Error messages

## Future Enhancements

1. **Live Editing**: Modify JSX in real-time
2. **Component Properties**: Edit props and styles
3. **State Management**: Inspect and modify React state
4. **Hot Reload**: See changes instantly
5. **Export/Import**: Save and load component configurations
6. **Shopify Integration**: Connect to Shopify APIs

## File Structure

```
Horizon Bridge/
├── 🖥️.frontend/
│   └── src/
│       └── components/
│           ├── Canvas/
│           │   └── EcommerceAppLoader.tsx
│           └── Panels/
│               └── CenterPanel.tsx
├── ecommerce-app/
│   ├── public/
│   │   └── editor-bridge.js
│   └── index.html
├── package.json
├── dev.js
└── INTEGRATION_README.md
```

## Contributing

1. Ensure both applications are running before testing
2. Test changes in both development and production modes
3. Update documentation for any protocol changes
4. Follow existing code patterns and conventions