# JutaDhundo.com Design Guidelines

## Design Approach
**System Selected**: Minimalist utility design inspired by Google Search and Apple HIG principles
**Philosophy**: Search-first, zero-friction interface prioritizing speed and clarity. Every pixel serves the core function: helping users find their Circle information instantly.

## Typography System
**Primary Font**: Inter or System UI stack (excellent readability, performs well on low-end devices)
- Logo/Brand: 2xl font weight 700
- Tagline: sm font weight 400
- Search Input: lg font weight 400
- Suggestions: base font weight 500
- Result Headers: lg font weight 600
- Result Body: base font weight 400
- Navigation: sm font weight 500

**Hierarchy**: Large, bold elements for search interaction; smaller, lighter elements for secondary information.

## Color Palette
**Background**: White (#FFFFFF) or very light gray (#FAFAFA)
**Primary Accent**: Bright Yellow (#FBBF24 or similar)
**Secondary**: Dark Blue (#1E3A8A or Navy)
**Text**: 
- Primary: Dark Blue/Navy for headers and important text
- Secondary: Gray-700 for body text
- Tertiary: Gray-500 for metadata

**Search Elements**: Yellow highlights for active states, dark blue borders

## Layout System
**Spacing**: Tailwind units of 2, 4, 8, 12, 16 for consistent rhythm
- Search container: py-16 to py-24 on desktop, py-8 on mobile
- Card spacing: gap-4 between cards
- Internal card padding: p-6
- Section margins: mb-8 to mb-12

**Container**: max-w-3xl centered for search and results to maintain readability

## Component Specifications

### Header/Branding
- Centered logo with shoe emoji (🥿) + "JutaDhundo" text
- Tagline directly below in lighter weight
- Minimal top navigation (Home, About Juta, Data Source, Contact) - right-aligned on desktop, hidden in hamburger on mobile
- Overall header: light weight, doesn't compete with search

### Search Box (Hero Element)
- **Position**: Vertically centered on initial load (before search), top-aligned after search initiated
- **Width**: Full container width (max-w-3xl)
- **Height**: Generous touch target (h-14 minimum)
- **Style**: 
  - White background with subtle shadow (shadow-lg)
  - Yellow border when focused (border-2)
  - Dark blue placeholder text
  - Large, clear input text (text-lg)
  - Rounded corners (rounded-xl)
- **Icon**: Search icon (magnifying glass) positioned left inside input

### Auto-Suggestions Dropdown
- Appears immediately below search box
- White background with stronger shadow than input (shadow-xl)
- Each suggestion: py-3 px-4, hover state with light yellow background
- Matching text highlighted in bold or yellow
- Maximum 6-8 suggestions visible, scrollable if more
- Subtle dividers between suggestions
- "No results" state with helpful message

### Results Cards
- **Layout**: Stacked vertically with consistent gap-4
- **Card Style**: 
  - White background
  - Border with subtle gray (border-gray-200)
  - Rounded corners (rounded-lg)
  - Gentle shadow (shadow-md)
  - Padding p-6
- **Content Structure**:
  - Village Name: Large, bold, dark blue (text-xl font-semibold)
  - Thana Number: Medium, with icon prefix (text-base, gray-700)
  - Circle Name: Accent color badge/pill with yellow background
- **Grouped Results**: When one Thana has multiple villages, show Thana/Circle header once, then list villages as sub-items with subtle indentation

### Footer
- Minimal, centered text
- Light gray background (bg-gray-50)
- Small disclaimers and data source acknowledgment
- Links to simple pages (About, Contact, Data Source)

## Images
**No hero image needed** - This is a search-utility tool where the search box IS the hero element.

**Icon Usage**:
- Shoe emoji (🥿) in logo/branding
- Search icon in search input
- Location pin icon next to Circle names
- Document/number icon next to Thana numbers
- Use Heroicons for consistent, minimal icon style

## Responsive Behavior
**Mobile-First Priorities**:
- Search box: Full width with adequate padding (px-4)
- Large tap targets (minimum 44px height)
- Suggestions: Full-width overlay on mobile
- Cards: Full width, stack naturally
- Navigation: Hamburger menu
- Typography scales down appropriately (base to sm)

**Desktop Enhancements**:
- Centered, constrained layout (max-w-3xl)
- Keyboard navigation for suggestions (arrow keys, enter)
- Slightly larger text and spacing
- Horizontal navigation in header

## Animation & Interaction
**Minimal, purposeful motion**:
- Fade-in for suggestion dropdown (duration-150)
- Smooth scroll to results after search
- Subtle scale on card hover (optional on desktop only, no mobile hover)
- No loading spinners - instant search from static data

## Performance Considerations
- Load all data on initial page load (3,472 records is ~200KB - acceptable)
- No images to lazy-load
- Minimal JavaScript dependencies (Fuse.js for search)
- Critical CSS inlined, rest deferred
- System fonts prioritized over web fonts for faster rendering

## Accessibility
- High contrast text (WCAG AA minimum)
- Keyboard navigation fully supported
- Screen reader announcements for search results
- Focus states clearly visible (yellow ring)
- Semantic HTML structure