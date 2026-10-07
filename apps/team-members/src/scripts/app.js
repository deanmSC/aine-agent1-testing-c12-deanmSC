// Team Members Expense Claims App

(function() {
  'use strict';

  // Sample data - expense claims
  let claims = [
    {
      id: 1,
      name: 'Sarah Johnson',
      date: '2024-01-15',
      description: 'Client lunch meeting at downtown restaurant',
      amount: 127.50,
      status: 'Approved'
    },
    {
      id: 2,
      name: 'Michael Chen',
      date: '2024-01-18',
      description: 'Office supplies and printer paper',
      amount: 45.99,
      status: 'Pending'
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      date: '2024-01-20',
      description: 'Conference registration fee',
      amount: 350.00,
      status: 'Approved'
    },
    {
      id: 4,
      name: 'David Martinez',
      date: '2024-01-22',
      description: 'Travel expenses - taxi to airport',
      amount: 65.00,
      status: 'Rejected'
    },
    {
      id: 5,
      name: 'Emily Wong',
      date: '2024-01-25',
      description: 'Team building event catering',
      amount: 280.00,
      status: 'Approved'
    },
    {
      id: 6,
      name: 'Michael Chen',
      date: '2024-01-28',
      description: 'Software subscription renewal',
      amount: 99.00,
      status: 'Pending'
    },
    {
      id: 7,
      name: 'David Martinez',
      date: '2024-02-01',
      description: 'Hotel accommodation for client visit',
      amount: 185.00,
      status: 'Approved'
    }
  ];

  let nextId = 8;
  let editingClaimId = null;
  let claimToDelete = null;

  // Initialize the app
  document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
  });

  function initializeApp() {
    // Set header style from CSS variable
    setHeaderStyle();
    
    // Set up event listeners
    setupEventListeners();
    
    // Render initial data
    renderClaims();
    updateSummary();
    populateMemberFilter();
    
    console.log('Team Members Expense Claims app initialized');
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

  // Set up all event listeners
  function setupEventListeners() {
    // Add claim button
    document.getElementById('btn-add-claim').addEventListener('click', openAddModal);
    
    // Modal buttons
    document.getElementById('btn-cancel').addEventListener('click', closeClaimModal);
    document.getElementById('btn-save').addEventListener('click', saveClaim);
    document.getElementById('claim-form').addEventListener('submit', function(e) {
      e.preventDefault();
      saveClaim();
    });
    
    // Delete modal buttons
    document.getElementById('btn-cancel-delete').addEventListener('click', closeDeleteModal);
    document.getElementById('btn-confirm-delete').addEventListener('click', confirmDelete);
    
    // Search and filter
    document.getElementById('search-input').addEventListener('input', applyFilters);
    document.getElementById('status-filter').addEventListener('change', applyFilters);
    document.getElementById('member-filter').addEventListener('change', applyFilters);
    document.getElementById('btn-clear-filters').addEventListener('click', clearFilters);
    
    // Close modals when clicking outside
    document.getElementById('claim-modal').addEventListener('click', function(e) {
      if (e.target === this) {
        closeClaimModal();
      }
    });
    
    document.getElementById('delete-modal').addEventListener('click', function(e) {
      if (e.target === this) {
        closeDeleteModal();
      }
    });
  }

  // Render claims table
  function renderClaims(filteredClaims) {
    const claimsToRender = filteredClaims || claims;
    const container = document.getElementById('table-container');
    const emptyState = document.getElementById('empty-state');
    
    if (claimsToRender.length === 0) {
      container.innerHTML = '';
      emptyState.style.display = 'block';
      return;
    }
    
    emptyState.style.display = 'none';
    
    // Sort by date (newest first)
    const sortedClaims = [...claimsToRender].sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    
    let html = '<table><thead><tr>';
    html += '<th>Date</th>';
    html += '<th>Team Member</th>';
    html += '<th>Description</th>';
    html += '<th>Amount</th>';
    html += '<th>Status</th>';
    html += '<th>Actions</th>';
    html += '</tr></thead><tbody>';
    
    sortedClaims.forEach(function(claim) {
      html += '<tr>';
      html += '<td>' + formatDate(claim.date) + '</td>';
      html += '<td>' + escapeHtml(claim.name) + '</td>';
      html += '<td>' + escapeHtml(claim.description) + '</td>';
      html += '<td>$' + claim.amount.toFixed(2) + '</td>';
      html += '<td><span class="status-badge status-' + claim.status.toLowerCase() + '">' + claim.status + '</span></td>';
      html += '<td><div class="action-buttons">';
      html += '<button class="btn-icon" onclick="editClaim(' + claim.id + ')" title="Edit">✏️</button>';
      html += '<button class="btn-icon delete" onclick="deleteClaim(' + claim.id + ')" title="Delete">🗑️</button>';
      html += '</div></td>';
      html += '</tr>';
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
  }

  // Update summary statistics
  function updateSummary() {
    const total = claims.reduce((sum, claim) => sum + claim.amount, 0);
    const pending = claims.filter(c => c.status === 'Pending');
    const approved = claims.filter(c => c.status === 'Approved');
    const rejected = claims.filter(c => c.status === 'Rejected');
    
    const pendingTotal = pending.reduce((sum, claim) => sum + claim.amount, 0);
    const approvedTotal = approved.reduce((sum, claim) => sum + claim.amount, 0);
    const rejectedTotal = rejected.reduce((sum, claim) => sum + claim.amount, 0);
    
    document.getElementById('total-claims').textContent = '$' + total.toFixed(2);
    document.getElementById('claims-count').textContent = claims.length + ' claim' + (claims.length !== 1 ? 's' : '');
    
    document.getElementById('pending-total').textContent = '$' + pendingTotal.toFixed(2);
    document.getElementById('pending-count').textContent = pending.length + ' claim' + (pending.length !== 1 ? 's' : '');
    
    document.getElementById('approved-total').textContent = '$' + approvedTotal.toFixed(2);
    document.getElementById('approved-count').textContent = approved.length + ' claim' + (approved.length !== 1 ? 's' : '');
    
    document.getElementById('rejected-total').textContent = '$' + rejectedTotal.toFixed(2);
    document.getElementById('rejected-count').textContent = rejected.length + ' claim' + (rejected.length !== 1 ? 's' : '');
    
    // Update team breakdown
    updateTeamBreakdown();
  }

  // Update team member breakdown
  function updateTeamBreakdown() {
    const teamTotals = {};
    
    claims.forEach(function(claim) {
      if (!teamTotals[claim.name]) {
        teamTotals[claim.name] = 0;
      }
      teamTotals[claim.name] += claim.amount;
    });
    
    const container = document.getElementById('team-breakdown-list');
    let html = '';
    
    // Sort by total amount (highest first)
    const sortedTeam = Object.entries(teamTotals).sort((a, b) => b[1] - a[1]);
    
    if (sortedTeam.length === 0) {
      html = '<p style="color: var(--color-text-secondary); font-size: var(--text-sm);">No claims yet</p>';
    } else {
      sortedTeam.forEach(function([name, total]) {
        html += '<div class="team-member-summary">';
        html += '<span class="team-member-name">' + escapeHtml(name) + '</span>';
        html += '<span class="team-member-total">$' + total.toFixed(2) + '</span>';
        html += '</div>';
      });
    }
    
    container.innerHTML = html;
  }

  // Populate member filter dropdown
  function populateMemberFilter() {
    const members = [...new Set(claims.map(c => c.name))].sort();
    const select = document.getElementById('member-filter');
    
    // Keep the "All" option and add members
    let html = '<option value="all">All</option>';
    members.forEach(function(member) {
      html += '<option value="' + escapeHtml(member) + '">' + escapeHtml(member) + '</option>';
    });
    
    select.innerHTML = html;
  }

  // Apply search and filters
  function applyFilters() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const statusFilter = document.getElementById('status-filter').value;
    const memberFilter = document.getElementById('member-filter').value;
    
    let filtered = claims;
    
    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(function(claim) {
        return claim.name.toLowerCase().includes(searchTerm) ||
               claim.description.toLowerCase().includes(searchTerm) ||
               claim.amount.toString().includes(searchTerm);
      });
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(function(claim) {
        return claim.status === statusFilter;
      });
    }
    
    // Apply member filter
    if (memberFilter !== 'all') {
      filtered = filtered.filter(function(claim) {
        return claim.name === memberFilter;
      });
    }
    
    renderClaims(filtered);
  }

  // Clear all filters
  function clearFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('status-filter').value = 'all';
    document.getElementById('member-filter').value = 'all';
    renderClaims();
  }

  // Open add claim modal
  function openAddModal() {
    editingClaimId = null;
    document.getElementById('modal-title').textContent = 'Add Expense Claim';
    document.getElementById('claim-form').reset();
    document.getElementById('claim-id').value = '';
    
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('claim-date').value = today;
    
    // Set default status to Pending
    document.getElementById('claim-status').value = 'Pending';
    
    document.getElementById('claim-modal').classList.add('active');
  }

  // Open edit claim modal
  window.editClaim = function(id) {
    const claim = claims.find(c => c.id === id);
    if (!claim) return;
    
    editingClaimId = id;
    document.getElementById('modal-title').textContent = 'Edit Expense Claim';
    document.getElementById('claim-id').value = claim.id;
    document.getElementById('claim-name').value = claim.name;
    document.getElementById('claim-date').value = claim.date;
    document.getElementById('claim-description').value = claim.description;
    document.getElementById('claim-amount').value = claim.amount;
    document.getElementById('claim-status').value = claim.status;
    
    document.getElementById('claim-modal').classList.add('active');
  };

  // Close claim modal
  function closeClaimModal() {
    document.getElementById('claim-modal').classList.remove('active');
    editingClaimId = null;
  }

  // Save claim (add or edit)
  function saveClaim() {
    const name = document.getElementById('claim-name').value.trim();
    const date = document.getElementById('claim-date').value;
    const description = document.getElementById('claim-description').value.trim();
    const amount = parseFloat(document.getElementById('claim-amount').value);
    const status = document.getElementById('claim-status').value;
    
    if (!name || !date || !description || isNaN(amount) || amount < 0) {
      alert('Please fill in all required fields with valid values.');
      return;
    }
    
    if (editingClaimId) {
      // Edit existing claim
      const claim = claims.find(c => c.id === editingClaimId);
      if (claim) {
        claim.name = name;
        claim.date = date;
        claim.description = description;
        claim.amount = amount;
        claim.status = status;
      }
    } else {
      // Add new claim
      claims.push({
        id: nextId++,
        name: name,
        date: date,
        description: description,
        amount: amount,
        status: status
      });
    }
    
    closeClaimModal();
    renderClaims();
    updateSummary();
    populateMemberFilter();
    
    // Clear filters to show the new/edited claim
    clearFilters();
  }

  // Open delete confirmation modal
  window.deleteClaim = function(id) {
    const claim = claims.find(c => c.id === id);
    if (!claim) return;
    
    claimToDelete = id;
    const info = claim.name + ' - $' + claim.amount.toFixed(2) + ' - ' + claim.description;
    document.getElementById('delete-claim-info').textContent = info;
    document.getElementById('delete-modal').classList.add('active');
  };

  // Close delete modal
  function closeDeleteModal() {
    document.getElementById('delete-modal').classList.remove('active');
    claimToDelete = null;
  }

  // Confirm delete
  function confirmDelete() {
    if (claimToDelete) {
      claims = claims.filter(c => c.id !== claimToDelete);
      closeDeleteModal();
      renderClaims();
      updateSummary();
      populateMemberFilter();
      
      // Reapply current filters
      applyFilters();
    }
  }

  // Utility: Format date
  function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  // Utility: Escape HTML to prevent XSS
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

})();
