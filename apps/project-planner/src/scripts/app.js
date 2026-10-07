// Project Planner App JavaScript

(function() {
  'use strict';

  // Initialize the app when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
  });

  function initializeApp() {
    // Set header style from CSS variable
    setHeaderStyle();
    
    // Handle state from URL parameter
    handleStateFromURL();
    
    // Show initial screen (projects list by default)
    showScreen('projects-list');
    
    // Set up event listeners
    setupEventListeners();
  }

  // Set header style attribute based on CSS variable
  function setHeaderStyle() {
    const headerStyle = getComputedStyle(document.documentElement)
      .getPropertyValue('--header-style')
      .trim();
    
    if (headerStyle) {
      document.documentElement.setAttribute('data-studio-header', headerStyle);
    }
  }

  // Handle state parameter from URL (?state=loading, ?state=empty, etc.)
  function handleStateFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const state = urlParams.get('state');
    
    if (state) {
      document.documentElement.setAttribute('data-studio-state', state);
    } else {
      // Default to 'default' state
      document.documentElement.setAttribute('data-studio-state', 'default');
    }
  }

  // Show a specific screen by ID
  function showScreen(screenId) {
    // Hide all screens
    const allScreens = document.querySelectorAll('[data-studio-screen]');
    allScreens.forEach(function(screen) {
      screen.classList.remove('active');
      screen.style.display = 'none';
    });
    
    // Show the requested screen
    const targetScreen = document.querySelector('[data-studio-screen="' + screenId + '"]');
    if (targetScreen) {
      targetScreen.classList.add('active');
      targetScreen.style.display = 'block';
    }
  }

  // Set up event listeners for interactive elements
  function setupEventListeners() {
    // Filter chips
    const chips = document.querySelectorAll('.chip');
    chips.forEach(function(chip) {
      chip.addEventListener('click', function() {
        // Remove active class from all chips
        chips.forEach(function(c) {
          c.classList.remove('active');
        });
        // Add active class to clicked chip
        this.classList.add('active');
      });
    });

    // Search input
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.addEventListener('input', function(e) {
        // In a real app, this would filter the projects
        console.log('Search:', e.target.value);
      });
    }

    // State change buttons (for testing states)
    const retryButtons = document.querySelectorAll('[data-studio-id^="btn-retry"], [data-studio-id^="btn-detail-retry"]');
    retryButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        // Reset to default state
        document.documentElement.setAttribute('data-studio-state', 'default');
      });
    });

    // Create first project button (empty state)
    const createFirstButton = document.querySelector('[data-studio-id="btn-create-first"]');
    if (createFirstButton) {
      createFirstButton.addEventListener('click', function() {
        // In a real app, this would open a create project dialog
        alert('Create project dialog would open here');
      });
    }

    // New project button
    const newProjectButton = document.querySelector('[data-studio-id="btn-new-project"]');
    if (newProjectButton) {
      newProjectButton.addEventListener('click', function() {
        // In a real app, this would open a create project dialog
        alert('Create project dialog would open here');
      });
    }

    // Edit button
    const editButton = document.querySelector('[data-studio-id="btn-edit"]');
    if (editButton) {
      editButton.addEventListener('click', function() {
        // In a real app, this would open an edit dialog
        alert('Edit project dialog would open here');
      });
    }
  }

  // Navigate to project detail screen
  window.showProjectDetail = function(projectId) {
    console.log('Showing project detail:', projectId);
    showScreen('project-detail');
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // In a real app, we would load the specific project data here
    // For now, we're showing the same detail data for all projects
  };

  // Navigate back to projects list
  window.showProjectsList = function() {
    console.log('Showing projects list');
    showScreen('projects-list');
    
    // Scroll to top
    window.scrollTo(0, 0);
  };

  // Utility function to change state (useful for testing in console)
  window.changeState = function(state) {
    const validStates = ['default', 'empty', 'loading', 'error'];
    if (validStates.indexOf(state) !== -1) {
      document.documentElement.setAttribute('data-studio-state', state);
      console.log('State changed to:', state);
    } else {
      console.error('Invalid state. Valid states are:', validStates.join(', '));
    }
  };

  // Utility function to change screen (useful for testing in console)
  window.changeScreen = function(screenId) {
    const validScreens = ['projects-list', 'project-detail'];
    if (validScreens.indexOf(screenId) !== -1) {
      showScreen(screenId);
      console.log('Screen changed to:', screenId);
    } else {
      console.error('Invalid screen. Valid screens are:', validScreens.join(', '));
    }
  };

  // Log initialization
  console.log('Project Planner initialized');
  console.log('Available commands:');
  console.log('  changeState("default|empty|loading|error") - Change the current state');
  console.log('  changeScreen("projects-list|project-detail") - Change the current screen');
  console.log('  showProjectDetail("project-1") - Navigate to project detail');
  console.log('  showProjectsList() - Navigate to projects list');

})();
