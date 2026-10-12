# Project Planner

A time-based project planning interface for Agent Zero Studio designers.

## What It Does

This web app provides a comprehensive project planning interface with timeline tracking, milestone management, and team collaboration features. It includes:

- **Projects List Screen**: View all projects with progress bars, status badges, team members, and task counts
- **Project Detail Screen**: Detailed view with timeline information, milestones, team members, and recent tasks
- **Filter & Search**: Filter projects by status (All, Active, Completed, Overdue) and search functionality
- **Time-Based Planning**: Visual timeline progress bars, date ranges, duration tracking, and milestone timelines
- **Four States**: Each screen includes default, empty, loading, and error states for complete design coverage

## Features

### Projects List
- Grid layout of project cards
- Visual progress indicators
- **Color-coded status badges** - Active (blue), Completed (green), Overdue (red)
- **Smart sorting** - Overdue projects automatically appear at the top
- Team member avatars
- Task completion counts
- Search and filter capabilities
- **Date range filter** - Filter projects by start and end dates
- **NEW: Export to Excel** - Export filtered projects to Excel format (.xls)

### Project Detail
- Comprehensive timeline information (start date, end date, duration, days remaining)
- Overall progress tracking
- Team member list with roles
- Visual milestone timeline with completion status
- Recent tasks list with assignments and due dates

### Design States
- **Default**: Normal view with data
- **Empty**: No projects or project not found
- **Loading**: Loading spinner with message
- **Error**: Error message with retry option

## How to Use

### Opening the App

Simply open `index.html` in any modern web browser:

1. Navigate to the `apps/project-planner/` directory
2. Double-click `index.html` or right-click and select "Open with" your preferred browser
3. The app will load and display the projects list screen

### Testing Different States

You can test different states by adding a URL parameter:

- Default state: `index.html` or `index.html?state=default`
- Empty state: `index.html?state=empty`
- Loading state: `index.html?state=loading`
- Error state: `index.html?state=error`

### Navigation

- Click any project card to view its details
- Click the "Back" button to return to the projects list
- Use the filter chips to filter projects by status
- Use the search bar to search for projects

### Using the Date Range Filter

1. **Select a date range**: Use the "From" and "To" date inputs to specify your desired date range
2. **Apply the filter**: Click the "Apply Filter" button to show only projects that overlap with the selected date range
3. **Clear the filter**: Click the "Clear" button to remove the date filter and show all projects again

**How it works**: The filter shows projects whose date range overlaps with your selected dates. For example:
- If you select "From: 2024-01-01", you'll see all projects that end on or after January 1, 2024
- If you select "To: 2024-03-31", you'll see all projects that start on or before March 31, 2024
- If you select both dates, you'll see projects that have any overlap with that date range

### Exporting to Excel

1. **Filter your projects** (optional): Use the date range filter or status chips to narrow down the projects you want to export
2. **Click "Export to Excel"**: The button with the 📊 icon will download a file named `project-planner-export.xls`
3. **Open in Excel**: The exported file can be opened in Microsoft Excel, Google Sheets, or any spreadsheet application

**What's included in the export**:
- Project Title
- Status
- Start Date
- End Date
- Progress (%)
- Description
- Team Members
- Tasks

### Developer Console Commands

Open the browser console to access these utility functions:

```javascript
// Change state
changeState('default')  // or 'empty', 'loading', 'error'

// Change screen
changeScreen('projects-list')  // or 'project-detail'

// Navigate to project detail
showProjectDetail('project-1')

// Navigate back to list
showProjectsList()
```

## Testing

The app includes comprehensive automated tests for all features. To run the tests:

### Sorting & Color-Coding Tests
1. Open `tests/test-sorting-colors.html` in your web browser
2. Click "Run All Tests" to execute the test suite
3. View the results to ensure all features are working correctly

**Test coverage includes**:
- Overdue items sorting to the top
- Non-overdue items maintaining order
- Multiple overdue items handling
- Status color class validation (Active, Completed, Overdue)
- Edge cases (empty lists, single items, all overdue)
- Sorting with filtered results

### Date Filtering & Export Tests
1. Open `tests/test-filters.html` in your web browser
2. Click "Run All Tests" to execute the test suite
3. View the results to ensure all features are working correctly

**Test coverage includes**:
- Date range filtering (from date only, to date only, both dates)
- Filter with no matching results
- CSV export format validation
- CSV special character escaping (commas, quotes)
- Date overlap detection logic

## File Structure

```
apps/project-planner/
├── index.html                 # Main HTML file with both screens
├── README.md                  # This file
├── tests/
│   └── test-filters.html     # Automated tests for filtering and export
└── src/
    ├── theme/
    │   └── tokens.css        # Design tokens (colors, spacing, etc.)
    ├── styles/
    │   └── main.css          # All application styles
    └── scripts/
        └── app.js            # Application logic and interactivity
```

## Agent Zero Studio Integration

This app is designed for Agent Zero Studio with full support for:

- **Design Tokens**: All themed values use CSS variables from `tokens.css`
- **Screen Management**: Each screen has proper `data-studio-screen` attributes
- **State Management**: All four states (default, empty, loading, error) are implemented
- **Selectable Elements**: Every designable element has complete Studio metadata:
  - `data-studio-id`: Unique identifier
  - `data-studio-type`: Element type (header, button, card, etc.)
  - `data-studio-name`: Human-readable name
  - `data-studio-source`: File and line number
  - `data-studio-tokens`: Token names used
  - `data-studio-text`: Text content key for editing

## Placeholder Data

The app includes realistic placeholder data for:

- 4 sample projects with varying statuses
- Timeline information with dates and progress
- Team members with roles
- Milestones with completion status
- Tasks with assignments and due dates

## Browser Compatibility

This app works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

No build step, server, or network connection required.
