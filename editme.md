# Project Hierarchy and UI Overview

## Directory Structure
```
hien-website/
├── app/
│   ├── api/
│   │   └── views/              # View tracking API endpoints
│   │       ├── route.ts        # POST: record views, GET: all views
│   │       └── [slug]/
│   │           └── route.ts    # GET: specific post analytics
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── content/               # Content directory
│   │   ├── blog/             # Blog post markdown files
│   │   │   └── *.md
│   │   └── projects/         # Project markdown files
│   │       └── *.md
│   ├── BlogPost.tsx
│   ├── Button.tsx
│   ├── ChatBubble.tsx
│   ├── ContactForm.tsx
│   ├── Navigation.tsx
│   ├── Project.tsx
│   └── ui/                   # UI components
├── lib/
│   ├── db.ts                 # Database client setup
│   └── utils.ts
├── postgres/                 # PostgreSQL configuration
│   ├── init/
│   │   └── 01-init.sql      # Database initialization
│   ├── migrations/          # Database migrations
│   └── schemas/             # Schema documentation
├── prisma/
│   └── schema.prisma        # Prisma schema
├── public/
│   └── media/              # Public media files for blog/projects
└── [other configuration files]
```

## New Features

### 1. Content Management
- **Markdown-based Content**: Blog posts and projects are now managed through markdown files
- **Image Handling**: Images are stored in `public/media/` and referenced in markdown
- **Rich Content Support**: Full markdown support including tables, code blocks, and images

### 2. View Analytics System
- **Database Structure**:
  ```sql
  post_views:
  - Tracks individual views
  - Stores IP addresses
  - Records user agent info
  - Captures geographic data
  - Stores device information

  post_view_counts:
  - Aggregates view statistics
  - Maintains unique visitor counts
  - Updates automatically via triggers
  ```

- **API Endpoints**:
  - `POST /api/views`: Record new views
  - `GET /api/views`: Get all post view counts
  - `GET /api/views/[slug]`: Get detailed analytics for a post

### 3. Content Creation Guidelines

#### Blog Posts
```markdown
---
title: "Your Blog Title"
date: "YYYY-MM-DD"
location: "Location"
subtitle: "Your Subtitle"
views: 0
---

# Content Title

Your content here...

![Image Description](/media/your-image.jpg)
*Image caption*

## Sections
...
```

#### Projects
```markdown
---
title: "Project Title"
context: "Project Context"
imageSrc: "/media/project-image.jpg"
---

# Project Description

Project content here...
```

### 4. Database Features
- Automatic view counting
- IP tracking and analytics
- User agent parsing
- Geographic data collection
- Aggregated statistics
- Real-time updates

### 5. Docker Configuration
- PostgreSQL database service
- Volume persistence
- Automatic initialization
- Development environment setup

## Usage Notes

### Adding New Content
1. Create markdown file in appropriate directory
2. Add images to `public/media/`
3. Reference images using relative paths
4. Views are automatically tracked

### View Analytics
- Views are counted when users reach the bottom of posts
- IP addresses are stored for unique visitor tracking
- Geographic and device information is automatically captured
- Real-time statistics are available through API endpoints

### Development Setup
1. Start services:
   ```bash
   docker-compose up -d
   ```
2. Database is automatically initialized
3. Content is served with analytics tracking

### Environment Variables
```env
DATABASE_URL=postgresql://user:password@localhost:5432/blog_analytics
POSTGRES_USER=blog_user
POSTGRES_PASSWORD=blog_password
POSTGRES_DB=blog_analytics
```

Detailed Breakdown with Editing Guidelines
1. Root Files
components.json
Purpose: Contains UI configuration (schema, style, aliases, and base settings for Tailwind and icon libraries).
Editing Tip: Modify to change default styling options, component aliases, or to switch the icon library.

globals.css
Purpose: Global CSS applied across the project (includes Tailwind directives and base styles for body background and text colors).
Editing Tip: Adjust global typography, colors, or add utility classes that affect the entire UI.

next.config.mjs
Purpose: Next.js configuration. Controls build settings and experimental features.
Editing Tip: Typically not for direct UI changes, but can affect how assets (including UI styles) are built.

package.json
Purpose: Defines project metadata, dependencies, and scripts (e.g. "dev", "build", "start").
Editing Tip: Update dependencies (like UI libraries or Next.js), or modify scripts if you change how the app is built or served.

page.tsx
Purpose: A simple page that renders the main Navigation component.
Editing Tip: Use as a starting point if you want to experiment with rendering different high-level components.

postcss.config.mjs & tailwind.config.ts
Purpose: Configure PostCSS and Tailwind CSS—these files define where Tailwind should look for classes and customize the theme (colors, animations, etc.).
Editing Tip: Edit these files to extend or adjust your UI's design tokens (e.g., custom colors or spacing).

tsconfig.json & types.ts
Purpose: Configure TypeScript settings and define additional types.
Editing Tip: Update if you add new UI components or utilities that require additional type definitions.

2. App Directory (app/)
app/globals.css
Purpose: Styles specific to the Next.js app (such as fonts and component-level global styles).
Editing Tip: Modify for app-wide style changes that should affect every page.

app/layout.tsx
Purpose: The root layout for your Next.js application; wraps every page.
Editing Tip: Update to add UI providers (for theming, state management) or modify the HTML structure (e.g., adding headers/footers).

app/page.tsx
Purpose: The main landing page that renders the home page (importing from page.tsx).
Editing Tip: Change the content or structure if you wish to alter the initial view of your app.

3. Components Directory (components/)
High-Level UI Components
BlogPost.tsx
Purpose: Displays a blog post with title, date, location, subtitle, body text, and likes/views count.
Editing Tip: Modify layout, add new post metadata, or change the like mechanism.

Button.tsx
Purpose: A button component that uses Framer Motion for animations.
Editing Tip: Update styling, animations, or variants if you need different button behaviors.

ChatBubble.tsx
Purpose: Provides a chat UI element with animated message entry and display.
Editing Tip: Change the chat bubble appearance or add additional interactivity.

ContactForm.tsx
Purpose: Renders a contact form with inputs and a submit button; includes animations on submission.
Editing Tip: Modify form fields, validation logic, or submission behavior.

Navigation.tsx
Purpose: The main navigation that conditionally displays sections (Chat, Projects, Blog, Contact) using buttons and animated transitions.
Editing Tip: Update the list of sections, change the layout of navigation buttons, or adjust animations.

Project.tsx
Purpose: Displays project details with an image, title, context, and a collapsible description.
Editing Tip: Change how projects are presented (e.g., add links or more interactive elements).

theme-provider.tsx
Purpose: Wraps its children in a theme provider (using next-themes) to handle light/dark modes.
Editing Tip: Use this to add additional theme support or customize how themes are applied.

Lower-Level UI Components (Inside components/ui/)
These files build the atomic and composite UI pieces used throughout the app. They are usually based on Radix UI primitives, Tailwind CSS, and utility functions.

General Notes for UI Files:
Examples: accordion.tsx, alert-dialog.tsx, avatar.tsx, badge.tsx, breadcrumb.tsx, etc.
Purpose: Each file encapsulates a specific UI element (e.g., an accordion, a dialog, a button variant).
Editing Tip:
To change the styling, update the Tailwind classes or the variants defined via class variance authority (cva).
To adjust behavior (e.g., animations or responsive interactions), review the component's props and Radix UI usage.
Custom Components:
calendar.tsx, carousel.tsx, chart.tsx: These often combine third-party libraries with custom styling. Adjust the class names and component props as needed.
form.tsx: Integrates react-hook-form for managing form state; update field layouts or error displays here.
sidebar.tsx: Manages the responsive sidebar UI, including mobile behavior via a Sheet. Changes here affect overall navigation.
toaster.tsx and toast.tsx: Manage notifications; edit to update toast styles or behavior.
Utility UI Components:
Files like separator.tsx, skeleton.tsx, and toggle.tsx are small building blocks. They are meant to be reusable and easily customizable through props and utility functions.
4. Hooks Directory (hooks/)
use-mobile.tsx
Purpose: Custom hook to detect mobile view (based on window width).
Editing Tip: Adjust the breakpoint value if needed.

use-toast.ts
Purpose: Manages toast notifications' state (adding, dismissing, updating toasts).
Editing Tip: Modify the logic if you need different toast behavior or timeouts.

5. Lib Directory (lib/)
utils.ts
Purpose: Provides helper functions, such as cn() which merges Tailwind CSS class names using clsx and twMerge.
Editing Tip: This is the place to adjust how classes are merged or to add additional utility functions that might help in styling.
6. Styles and Utils Directories
styles/globals.css
Purpose: Additional global styles (applied as fallback or extended base styles).
Editing Tip: Modify for broad, cross-cutting UI changes not handled by Tailwind's config.

utils/colors.ts
Purpose: Defines specific color values (for example, bubbleColors for different sections like chat or projects).
Editing Tip: Change these values to update the color theme for related UI parts.

utils/theme.ts
Purpose: Provides a theme object (background, button colors, text colors, etc.).
Editing Tip: Update these to modify the overall look and feel of your application's UI.

How to Use This Guide for Future UI Changes
High-Level Changes:

To adjust the overall layout or main navigation, start with the files in app/ and high-level components in components/ (e.g., Navigation.tsx, BlogPost.tsx).
Component Styling:

For tweaks in the look and behavior of individual UI elements (buttons, dialogs, toggles, etc.), open the corresponding file in components/ui/ and modify the Tailwind classes or variant definitions.
Global Theme:

To change colors, fonts, or spacing that affect the entire app, update globals.css, tailwind.config.ts, and the files in utils/ (like colors.ts and theme.ts).
Responsive Behavior:

Adjust mobile-specific behavior in hooks/use-mobile.tsx and components like sidebar.tsx (which uses a mobile Sheet).
