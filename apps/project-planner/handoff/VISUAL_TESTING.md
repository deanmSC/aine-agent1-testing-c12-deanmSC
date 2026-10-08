# Visual Testing Guide for Project Planner

## Overview
This guide explains how to manually test the Project Planner app at different viewport widths and states, since automated Playwright testing is not available in this environment.

## Testing Requirements
The app must be tested at three viewport widths:
- **390px** - Mobile (small phone)
- **768px** - Tablet
- **1100px** - Desktop

Each screen must be tested in all four states:
- **default** - Normal view with data
- **empty** - No data available
- **loading** - Loading spinner
- **error** - Error message

## Manual Testing Instructions

### Setup
1. Open `apps/project-planner/index.html` in a web browser
2. Open browser DevTools (F12 or right-click → Inspect)
3. Enable Device Toolbar (Ctrl+Shift+M or Cmd+Shift+M)

### Testing Each Width

#### 390px Width (Mobile)
1. Set viewport to 390px wide in DevTools
2. Test Projects List screen:
   - Default: `index.html?state=default`
   - Empty: `index.html?state=empty`
   - Loading: `index.html?state=loading`
   - Error: `index.html?state=error`
3. Test Project Detail screen:
   - Open console and run: `changeScreen('project-detail')`
   - Test all four states using the same URLs above
4. **Check for:**
   - No horizontal scrolling
   - All text is readable
   - Buttons are tappable (min 44px touch target)
   - Cards stack vertically
   - Filter chips scroll horizontally if needed

#### 768px Width (Tablet)
1. Set viewport to 768px wide
2. Repeat all tests from mobile
3. **Check for:**
   - No horizontal scrolling
   - Grid layouts adapt appropriately
   - Header elements fit comfortably
   - Cards may show in 1-2 columns

#### 1100px Width (Desktop)
1. Set viewport to 1100px wide
2. Repeat all tests
3. **Check for:**
   - No horizontal scrolling
   - Grid shows multiple columns
   - Content is centered with max-width
   - All spacing looks balanced

### Console Commands for Testing
Open browser console and use these commands:

```javascript
// Change states
changeState('default')
changeState('empty')
changeState('loading')
changeState('error')

// Change screens
changeScreen('projects-list')
changeScreen('project-detail')

// Navigate to project detail
showProjectDetail('project-1')

// Navigate back to list
showProjectsList()
```

## What to Look For

### Layout Issues
- ✓ No horizontal scrollbar at any width
- ✓ Content fits within viewport
- ✓ Text doesn't overflow containers
- ✓ Images/icons scale appropriately

### Responsive Behavior
- ✓ Grid columns reduce at smaller widths
- ✓ Header adapts (smaller text, wrapping if needed)
- ✓ Buttons remain accessible
- ✓ Cards stack vertically on mobile

### Design Token Usage
- ✓ Accent color (#2563EB) used consistently
- ✓ Border radius matches tokens (6px controls, 12px cards, 16px chips)
- ✓ Spacing uses token values (12px row spacing)
- ✓ Title text is 28px
- ✓ Header uses accent background

### State Management
- ✓ All four states work on both screens
- ✓ State changes via URL parameter
- ✓ Empty states show helpful messages
- ✓ Loading states show spinner
- ✓ Error states show retry button

## Known Good Configurations

The app has been designed to work well at:
- Minimum width: 320px
- Maximum content width: 1200px (projects list), 1000px (project detail)
- All standard device sizes in between

## Automated Testing (Future)

When Playwright is available, run:
```bash
cd apps/project-planner/handoff
node visual-test.js
```

This will automatically capture screenshots of all screen/state combinations at all three widths and save them to `screenshots/` directory.

## Verification Checklist

- [ ] Projects List - Default - 390px
- [ ] Projects List - Default - 768px
- [ ] Projects List - Default - 1100px
- [ ] Projects List - Empty - 390px
- [ ] Projects List - Empty - 768px
- [ ] Projects List - Empty - 1100px
- [ ] Projects List - Loading - 390px
- [ ] Projects List - Loading - 768px
- [ ] Projects List - Loading - 1100px
- [ ] Projects List - Error - 390px
- [ ] Projects List - Error - 768px
- [ ] Projects List - Error - 1100px
- [ ] Project Detail - Default - 390px
- [ ] Project Detail - Default - 768px
- [ ] Project Detail - Default - 1100px
- [ ] Project Detail - Empty - 390px
- [ ] Project Detail - Empty - 768px
- [ ] Project Detail - Empty - 1100px
- [ ] Project Detail - Loading - 390px
- [ ] Project Detail - Loading - 768px
- [ ] Project Detail - Loading - 1100px
- [ ] Project Detail - Error - 390px
- [ ] Project Detail - Error - 768px
- [ ] Project Detail - Error - 1100px

Total: 24 test cases (2 screens × 4 states × 3 widths)
