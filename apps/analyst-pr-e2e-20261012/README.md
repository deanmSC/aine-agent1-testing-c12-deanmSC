# Team Task Tracker

A simple and easy-to-use task tracker for small teams. Keep track of your team's work, mark tasks as complete, and see what's pending at a glance.

## What It Does

This app helps your team:
- **View all tasks** in one organized table
- **Add new tasks** with title, description, and assignee
- **Mark tasks complete** with a simple checkbox
- **Search and filter** to find specific tasks quickly
- **See summary statistics** showing total, pending, and completed tasks
- **Edit or delete** tasks as needed

## How to Use It

### Opening the App

1. Open the `index.html` file in your web browser
2. That's it! No installation, server, or internet connection needed.

You can:
- Double-click `index.html` in your file explorer
- Right-click `index.html` and choose "Open with" your preferred browser
- Drag and drop `index.html` into an open browser window

### Using the App

#### Viewing Tasks

When you open the app, you'll see:
- **Summary cards** at the top showing total tasks, pending tasks, and completed tasks
- **Search and filter controls** to find specific tasks
- **Tasks table** showing all your team's tasks with their status, title, description, and who they're assigned to

#### Adding a Task

1. Click the **"+ Add Task"** button at the top right
2. Fill in the task details:
   - **Task Title** (required) - What needs to be done
   - **Description** (optional) - Additional details about the task
   - **Assigned To** (required) - Team member responsible for this task
   - **Status** - Choose "Pending" or "Completed"
3. Click **"Save Task"** to add it to the list

#### Marking Tasks Complete

There are two ways to mark a task as complete:

1. **Quick method**: Click the checkbox next to the task status in the table
2. **Edit method**: Click "Edit" on the task, change the status to "Completed", and save

The checkbox works both ways - you can also uncheck it to mark a completed task as pending again.

#### Editing a Task

1. Click the **"Edit"** button next to any task
2. Update any of the task details
3. Click **"Save Task"** to save your changes

#### Deleting a Task

1. Click the **"Delete"** button next to any task
2. Confirm that you want to delete it
3. The task will be removed from the list

The app will ask for confirmation before deleting to prevent accidents.

#### Searching and Filtering

Use the controls above the task table to find specific tasks:

- **Search box**: Type any text to search by task title, description, or assignee name
- **Status filter**: Show only Pending or Completed tasks, or view All
- **Clear Filters button**: Reset all filters to show everything

All filters work together - for example, you can search for "meeting" and filter by "Pending" to find all pending tasks about meetings.

## Sample Data

The app comes with 3 sample tasks so you can try it right away:
- Review Q4 budget proposal (Pending)
- Update team documentation (Completed)
- Schedule client meeting (Pending)

You can edit or delete these sample tasks, or add your own.

## Features

✅ **Simple and clean interface** - Easy to understand at a glance  
✅ **Real-time updates** - Summary updates automatically as you add, edit, or complete tasks  
✅ **Status tracking** - Color-coded badges for Pending and Completed  
✅ **Quick completion** - Check/uncheck boxes to mark tasks complete  
✅ **Search and filter** - Find tasks quickly  
✅ **Delete confirmation** - Asks before removing anything  
✅ **Accessible** - Proper labels and keyboard navigation for screen readers  
✅ **Responsive design** - Works on desktop, tablet, and mobile  
✅ **No installation needed** - Just open the HTML file  

## Technical Details

This is a static web app that runs entirely in your browser:
- **Data storage** - Tasks are saved in your browser's localStorage, so they persist between sessions
- **No server required** - Everything runs in the browser
- **No internet needed** - Works completely offline
- **No installation** - Just HTML, CSS, and JavaScript files

**Note:** Data is stored in your browser only. If you clear your browser data or use a different browser, you'll start fresh with the sample tasks again.

## Browser Compatibility

Works in all modern browsers:
- Chrome, Edge, Firefox, Safari
- Desktop and mobile versions

## Questions?

- **Can I save my data?** Yes! Tasks are automatically saved in your browser and will be there when you come back.
- **How many tasks can I add?** As many as you want! The app handles any number of tasks.
- **Can multiple people use it?** Each person needs to open their own copy. There's no sharing between browsers or devices.
- **What if I accidentally delete something?** The app asks for confirmation before deleting, so you have a chance to cancel.
- **Can I export my tasks?** Currently, tasks are stored in the browser only. This is designed for quick team tracking.

---

Made for small teams (under 10 people) to track tasks simply and quickly.
