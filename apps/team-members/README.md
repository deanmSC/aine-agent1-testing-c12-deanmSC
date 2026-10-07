# Team Members - Expense Claims

A simple tool for managing team expense claims. Team members can submit their expense claims, and you can view them all in one table with status tracking and totals per person.

## What It Does

This app helps you:
- **Submit expense claims** with details like date, description, and amount
- **Track status** of each claim (Pending, Approved, or Rejected)
- **See totals** for all claims and breakdown by each team member
- **Search and filter** to find specific claims quickly
- **Edit or delete** claims with confirmation before deleting

## How to Use It

### Opening the App

1. Open the `index.html` file in your web browser
2. That's it! No installation or server needed.

You can also:
- Double-click `index.html` in your file explorer
- Right-click `index.html` and choose "Open with" your preferred browser
- Drag and drop `index.html` into an open browser window

### Using the App

#### Viewing Claims

When you open the app, you'll see:
- **Summary cards** at the top showing total amounts and counts by status
- **Team breakdown** showing how much each person has claimed
- **Claims table** with all the details of each expense claim

#### Adding a New Claim

1. Click the **"+ Add Claim"** button in the top right
2. Fill in the form:
   - Team member name
   - Date of the expense
   - Description (what it was for)
   - Amount in dollars
   - Status (Pending, Approved, or Rejected)
3. Click **"Save Claim"**

The new claim will appear in the table and update all the totals.

#### Editing a Claim

1. Find the claim in the table
2. Click the **pencil icon (✏️)** in the Actions column
3. Make your changes in the form
4. Click **"Save Claim"**

#### Deleting a Claim

1. Find the claim in the table
2. Click the **trash icon (🗑️)** in the Actions column
3. A confirmation dialog will ask if you're sure
4. Click **"Delete"** to confirm, or **"Cancel"** to keep it

**Note:** The app asks before deleting to prevent accidental removal.

#### Searching and Filtering

Use the controls above the table to find specific claims:

- **Search box**: Type any text to search by name, description, or amount
- **Status filter**: Show only Pending, Approved, or Rejected claims
- **Member filter**: Show only claims from a specific team member
- **Clear Filters button**: Reset all filters to show everything

All filters work together - for example, you can search for "lunch" and filter by "Sarah Johnson" to find all of Sarah's lunch expenses.

## Sample Data

The app comes with 7 sample expense claims so you can try it right away:
- Claims from 5 different team members
- Mix of Pending, Approved, and Rejected statuses
- Various types of expenses (meals, travel, supplies, etc.)
- Amounts ranging from $45 to $350

You can edit or delete these sample claims, or add your own.

## Features

✅ **Simple and clean interface** - Easy to understand at a glance  
✅ **Real-time totals** - Summary updates automatically as you add/edit/delete  
✅ **Status tracking** - Color-coded badges for Pending, Approved, and Rejected  
✅ **Team breakdown** - See total expenses per person  
✅ **Search and filter** - Find claims quickly  
✅ **Delete confirmation** - Asks before removing anything  
✅ **Responsive design** - Works on desktop, tablet, and mobile  
✅ **No installation needed** - Just open the HTML file  

## Technical Details

This is a static web app that runs entirely in your browser:
- **No server required** - All data is stored in the browser while the page is open
- **No internet needed** - Works completely offline
- **No installation** - Just HTML, CSS, and JavaScript files

**Note:** Data is not saved between sessions. When you close the browser, any changes you made will be lost and the sample data will return when you reopen the app. This is designed for quick testing and demonstration purposes.

## Browser Compatibility

Works in all modern browsers:
- Chrome, Edge, Firefox, Safari
- Desktop and mobile versions

## Questions?

- **Can I save my data?** Currently, data resets when you close the page. This is a simple demonstration tool.
- **How many claims can I add?** As many as you want! The app handles any number of claims.
- **Can multiple people use it?** Each person needs to open their own copy. There's no sharing between browsers.
- **What if I accidentally delete something?** The app asks for confirmation before deleting, so you have a chance to cancel.

---

Made for small teams (under 10 people) to track expense claims simply and quickly.
