// Project Planner App JavaScript

(function() {
  'use strict';

  // Project data with dates for filtering
  var projectsData = [
    {
      id: 'project-1',
      title: 'Website Redesign',
      status: 'Active',
      startDate: '2024-01-15',
      endDate: '2024-04-30',
      progress: 65,
      description: 'Complete overhaul of company website with modern design',
      team: ['SK', 'JD', 'AM'],
      tasks: '13/20 tasks'
    },
    {
      id: 'project-2',
      title: 'Mobile App Launch',
      status: 'Active',
      startDate: '2024-02-01',
      endDate: '2024-06-15',
      progress: 45,
      description: 'Develop and launch iOS and Android mobile applications',
      team: ['TC', 'RH', 'KM', '+2'],
      tasks: '18/40 tasks'
    },
    {
      id: 'project-3',
      title: 'Marketing Campaign Q2',
      status: 'Completed',
      startDate: '2023-10-01',
      endDate: '2024-03-31',
      progress: 100,
      description: 'Execute comprehensive marketing strategy for Q2 product launches',
      team: ['MJ', 'PW', 'LB'],
      tasks: '24/24 tasks'
    },
    {
      id: 'project-4',
      title: 'Infrastructure Upgrade',
      status: 'Overdue',
      startDate: '2023-12-01',
      endDate: '2024-02-28',
      progress: 75,
      description: 'Migrate to cloud infrastructure and upgrade security protocols',
      team: ['DK', 'NS'],
      tasks: '9/12 tasks'
    }
  ];

  var filteredProjects = projectsData.slice(); // Copy of projects for filtering

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
        
        // Apply the filter based on which chip was clicked
        const chipId = this.getAttribute('data-studio-id');
        applyStatusFilter(chipId);
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

    // Date filter - Apply button
    const applyFilterButton = document.querySelector('[data-studio-id="btn-apply-filter"]');
    if (applyFilterButton) {
      applyFilterButton.addEventListener('click', function() {
        applyDateFilter();
      });
    }

    // Date filter - Clear button
    const clearFilterButton = document.querySelector('[data-studio-id="btn-clear-filter"]');
    if (clearFilterButton) {
      clearFilterButton.addEventListener('click', function() {
        clearDateFilter();
      });
    }

    // Export to Excel button
    const exportButton = document.querySelector('[data-studio-id="btn-export-excel"]');
    if (exportButton) {
      exportButton.addEventListener('click', function() {
        exportToExcel();
      });
    }

    // Back button
    const backButton = document.querySelector('[data-studio-id="btn-back"]');
    if (backButton) {
      backButton.addEventListener('click', function() {
        showProjectsList();
      });
    }
  }

  // Apply date range filter
  function applyDateFilter() {
    var dateFrom = document.getElementById('date-from').value;
    var dateTo = document.getElementById('date-to').value;

    if (!dateFrom && !dateTo) {
      alert('Please select at least one date (From or To)');
      return;
    }

    filteredProjects = projectsData.filter(function(project) {
      var projectStart = new Date(project.startDate);
      var projectEnd = new Date(project.endDate);
      var filterFrom = dateFrom ? new Date(dateFrom) : null;
      var filterTo = dateTo ? new Date(dateTo) : null;

      // Check if project date range overlaps with filter date range
      if (filterFrom && filterTo) {
        return projectEnd >= filterFrom && projectStart <= filterTo;
      } else if (filterFrom) {
        return projectEnd >= filterFrom;
      } else if (filterTo) {
        return projectStart <= filterTo;
      }
      return true;
    });

    updateProjectsDisplay();
    console.log('Date filter applied. Showing ' + filteredProjects.length + ' projects.');
  }

  // Apply status filter based on chip selection
  function applyStatusFilter(chipId) {
    var projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    var allCards = projectsGrid.querySelectorAll('.project-card');
    
    // Show all cards by default
    allCards.forEach(function(card) {
      card.style.display = 'block';
    });

    // Apply filter based on chip
    if (chipId === 'chip-all') {
      // Show all projects
      console.log('Showing all projects');
    } else if (chipId === 'chip-active') {
      // Show only Active projects
      allCards.forEach(function(card) {
        var statusBadge = card.querySelector('.status-active');
        if (!statusBadge) {
          card.style.display = 'none';
        }
      });
      console.log('Showing Active projects only');
    } else if (chipId === 'chip-completed') {
      // Show only Completed projects
      allCards.forEach(function(card) {
        var statusBadge = card.querySelector('.status-completed');
        if (!statusBadge) {
          card.style.display = 'none';
        }
      });
      console.log('Showing Completed projects only');
    } else if (chipId === 'chip-overdue') {
      // Show only Overdue projects
      allCards.forEach(function(card) {
        var hasOverdueClass = card.classList.contains('card-overdue');
        if (!hasOverdueClass) {
          card.style.display = 'none';
        }
      });
      console.log('Showing Overdue projects only');
    }
  }

  // Clear date range filter
  function clearDateFilter() {
    document.getElementById('date-from').value = '';
    document.getElementById('date-to').value = '';
    filteredProjects = projectsData.slice();
    updateProjectsDisplay();
    console.log('Date filter cleared. Showing all ' + filteredProjects.length + ' projects.');
  }

  // Sort projects with overdue items at the top
  function sortProjects(projects) {
    return projects.slice().sort(function(a, b) {
      // Overdue items come first
      if (a.status === 'Overdue' && b.status !== 'Overdue') {
        return -1;
      }
      if (a.status !== 'Overdue' && b.status === 'Overdue') {
        return 1;
      }
      // For items with the same status, maintain original order
      return 0;
    });
  }

  // Update the projects display based on filtered data
  function updateProjectsDisplay() {
    var projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    // Sort projects to put overdue items at the top
    var sortedProjects = sortProjects(filteredProjects);

    // Hide all project cards first
    var allCards = projectsGrid.querySelectorAll('.project-card');
    allCards.forEach(function(card) {
      card.style.display = 'none';
    });

    // Show filtered projects in sorted order
    sortedProjects.forEach(function(project, index) {
      var card = projectsGrid.querySelector('[data-studio-id="card-' + project.id + '"]');
      if (card) {
        card.style.display = 'block';
        // Set order to control visual position
        card.style.order = index;
      }
    });

    // Show message if no projects match
    if (filteredProjects.length === 0) {
      console.log('No projects match the selected date range.');
    }
  }

  // Export projects to Excel (CSV format with .xls extension)
  function exportToExcel() {
    // Prepare CSV data
    var csvContent = 'Project Title,Status,Start Date,End Date,Progress,Description,Team Members,Tasks\n';
    
    filteredProjects.forEach(function(project) {
      var row = [
        escapeCSV(project.title),
        escapeCSV(project.status),
        escapeCSV(project.startDate),
        escapeCSV(project.endDate),
        project.progress + '%',
        escapeCSV(project.description),
        escapeCSV(project.team.join(', ')),
        escapeCSV(project.tasks)
      ].join(',');
      csvContent += row + '\n';
    });

    // Create blob and download
    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    var link = document.createElement('a');
    var url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'project-planner-export.xls');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('Exported ' + filteredProjects.length + ' projects to Excel.');
  }

  // Escape CSV values
  function escapeCSV(value) {
    if (typeof value === 'string') {
      // Escape quotes and wrap in quotes if contains comma, quote, or newline
      if (value.indexOf(',') !== -1 || value.indexOf('"') !== -1 || value.indexOf('\n') !== -1) {
        return '"' + value.replace(/"/g, '""') + '"';
      }
    }
    return value;
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
