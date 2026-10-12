// Task Tracker Application
// Manages tasks with add, edit, delete, complete, search, and filter functionality

// Sample data for initial load
const SAMPLE_TASKS = [
  {
    id: '1',
    title: 'Review Q4 budget proposal',
    description: 'Check all line items and prepare feedback for the finance team',
    assignee: 'Sarah Johnson',
    status: 'pending',
    createdAt: new Date('2026-10-10').toISOString()
  },
  {
    id: '2',
    title: 'Update team documentation',
    description: 'Add new onboarding procedures to the wiki',
    assignee: 'Mike Chen',
    status: 'completed',
    createdAt: new Date('2026-10-09').toISOString()
  },
  {
    id: '3',
    title: 'Schedule client meeting',
    description: 'Coordinate with the client for next week\'s project review',
    assignee: 'Emma Davis',
    status: 'pending',
    createdAt: new Date('2026-10-11').toISOString()
  }
];

// Application state
let tasks = [];
let currentFilter = {
  search: '',
  status: 'all'
};
let editingTaskId = null;

// DOM Elements
const elements = {
  // Buttons
  btnAddTask: document.getElementById('btn-add-task'),
  btnAddFirstTask: document.getElementById('btn-add-first-task'),
  btnSave: document.getElementById('btn-save'),
  btnCancel: document.getElementById('btn-cancel'),
  btnClearFilters: document.getElementById('btn-clear-filters'),
  btnCancelDelete: document.getElementById('btn-cancel-delete'),
  btnConfirmDelete: document.getElementById('btn-confirm-delete'),
  
  // Modals
  taskModal: document.getElementById('task-modal'),
  deleteModal: document.getElementById('delete-modal'),
  
  // Form
  taskForm: document.getElementById('task-form'),
  taskId: document.getElementById('task-id'),
  taskTitle: document.getElementById('task-title'),
  taskDescription: document.getElementById('task-description'),
  taskAssignee: document.getElementById('task-assignee'),
  taskStatus: document.getElementById('task-status'),
  modalTitle: document.getElementById('modal-title'),
  
  // Filters
  searchInput: document.getElementById('search-input'),
  statusFilter: document.getElementById('status-filter'),
  
  // Display
  tasksTbody: document.getElementById('tasks-tbody'),
  emptyState: document.getElementById('empty-state'),
  tasksTableContainer: document.getElementById('tasks-table-container'),
  
  // Summary
  totalTasks: document.getElementById('total-tasks'),
  pendingCount: document.getElementById('pending-count'),
  completedCount: document.getElementById('completed-count'),
  
  // Delete confirmation
  deleteTaskInfo: document.getElementById('delete-task-info')
};

// Initialize the application
function init() {
  loadTasks();
  attachEventListeners();
  renderTasks();
  updateSummary();
}

// Load tasks from localStorage or use sample data
function loadTasks() {
  const stored = localStorage.getItem('teamTasks');
  if (stored) {
    tasks = JSON.parse(stored);
  } else {
    // First time loading - use sample data
    tasks = SAMPLE_TASKS;
    saveTasks();
  }
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('teamTasks', JSON.stringify(tasks));
}

// Attach event listeners
function attachEventListeners() {
  // Add task buttons
  elements.btnAddTask.addEventListener('click', () => openTaskModal());
  elements.btnAddFirstTask.addEventListener('click', () => openTaskModal());
  
  // Modal buttons
  elements.btnCancel.addEventListener('click', closeTaskModal);
  elements.btnSave.addEventListener('click', saveTask);
  elements.taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    saveTask();
  });
  
  // Delete modal buttons
  elements.btnCancelDelete.addEventListener('click', closeDeleteModal);
  elements.btnConfirmDelete.addEventListener('click', confirmDelete);
  
  // Filters
  elements.searchInput.addEventListener('input', handleSearch);
  elements.statusFilter.addEventListener('change', handleStatusFilter);
  elements.btnClearFilters.addEventListener('click', clearFilters);
  
  // Close modals on overlay click
  elements.taskModal.addEventListener('click', (e) => {
    if (e.target === elements.taskModal) closeTaskModal();
  });
  elements.deleteModal.addEventListener('click', (e) => {
    if (e.target === elements.deleteModal) closeDeleteModal();
  });
  
  // Keyboard accessibility for modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (elements.taskModal.classList.contains('active')) closeTaskModal();
      if (elements.deleteModal.classList.contains('active')) closeDeleteModal();
    }
  });
}

// Open task modal for adding or editing
function openTaskModal(task = null) {
  editingTaskId = task ? task.id : null;
  
  if (task) {
    // Edit mode
    elements.modalTitle.textContent = 'Edit Task';
    elements.taskId.value = task.id;
    elements.taskTitle.value = task.title;
    elements.taskDescription.value = task.description || '';
    elements.taskAssignee.value = task.assignee;
    elements.taskStatus.value = task.status;
  } else {
    // Add mode
    elements.modalTitle.textContent = 'Add Task';
    elements.taskForm.reset();
    elements.taskId.value = '';
  }
  
  elements.taskModal.classList.add('active');
  elements.taskTitle.focus();
}

// Close task modal
function closeTaskModal() {
  elements.taskModal.classList.remove('active');
  elements.taskForm.reset();
  editingTaskId = null;
}

// Save task (add or edit)
function saveTask() {
  const title = elements.taskTitle.value.trim();
  const description = elements.taskDescription.value.trim();
  const assignee = elements.taskAssignee.value.trim();
  const status = elements.taskStatus.value;
  
  if (!title || !assignee) {
    alert('Please fill in all required fields.');
    return;
  }
  
  if (editingTaskId) {
    // Edit existing task
    const taskIndex = tasks.findIndex(t => t.id === editingTaskId);
    if (taskIndex !== -1) {
      tasks[taskIndex] = {
        ...tasks[taskIndex],
        title,
        description,
        assignee,
        status
      };
    }
  } else {
    // Add new task
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      assignee,
      status,
      createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
  }
  
  saveTasks();
  renderTasks();
  updateSummary();
  closeTaskModal();
}

// Open delete confirmation modal
let taskToDelete = null;

function openDeleteModal(task) {
  taskToDelete = task;
  elements.deleteTaskInfo.textContent = `"${task.title}"`;
  elements.deleteModal.classList.add('active');
  elements.btnConfirmDelete.focus();
}

// Close delete modal
function closeDeleteModal() {
  elements.deleteModal.classList.remove('active');
  taskToDelete = null;
}

// Confirm and delete task
function confirmDelete() {
  if (taskToDelete) {
    tasks = tasks.filter(t => t.id !== taskToDelete.id);
    saveTasks();
    renderTasks();
    updateSummary();
    closeDeleteModal();
  }
}

// Toggle task completion status
function toggleTaskStatus(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.status = task.status === 'completed' ? 'pending' : 'completed';
    saveTasks();
    renderTasks();
    updateSummary();
  }
}

// Handle search input
function handleSearch(e) {
  currentFilter.search = e.target.value.toLowerCase();
  renderTasks();
}

// Handle status filter
function handleStatusFilter(e) {
  currentFilter.status = e.target.value;
  renderTasks();
}

// Clear all filters
function clearFilters() {
  currentFilter.search = '';
  currentFilter.status = 'all';
  elements.searchInput.value = '';
  elements.statusFilter.value = 'all';
  renderTasks();
}

// Filter tasks based on current filters
function getFilteredTasks() {
  return tasks.filter(task => {
    // Search filter
    const searchMatch = !currentFilter.search || 
      task.title.toLowerCase().includes(currentFilter.search) ||
      task.description.toLowerCase().includes(currentFilter.search) ||
      task.assignee.toLowerCase().includes(currentFilter.search);
    
    // Status filter
    const statusMatch = currentFilter.status === 'all' || 
      task.status === currentFilter.status;
    
    return searchMatch && statusMatch;
  });
}

// Render tasks to the table
function renderTasks() {
  const filteredTasks = getFilteredTasks();
  
  // Show/hide empty state
  if (tasks.length === 0) {
    elements.emptyState.style.display = 'block';
    elements.tasksTableContainer.style.display = 'none';
    return;
  } else {
    elements.emptyState.style.display = 'none';
    elements.tasksTableContainer.style.display = 'block';
  }
  
  // Clear table
  elements.tasksTbody.innerHTML = '';
  
  // Show message if no filtered results
  if (filteredTasks.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td colspan="5" style="text-align: center; padding: 2rem; color: #6b7280;">
        No tasks match your filters. Try adjusting your search or filter criteria.
      </td>
    `;
    elements.tasksTbody.appendChild(row);
    return;
  }
  
  // Render each task
  filteredTasks.forEach(task => {
    const row = document.createElement('tr');
    
    const statusBadgeClass = task.status === 'completed' ? 'completed' : 'pending';
    const statusText = task.status === 'completed' ? 'Completed' : 'Pending';
    const isChecked = task.status === 'completed' ? 'checked' : '';
    
    row.innerHTML = `
      <td>
        <label class="status-badge ${statusBadgeClass}">
          <input 
            type="checkbox" 
            class="status-checkbox" 
            ${isChecked}
            data-task-id="${task.id}"
            aria-label="Mark task as ${task.status === 'completed' ? 'pending' : 'completed'}">
          <span>${statusText}</span>
        </label>
      </td>
      <td><strong>${escapeHtml(task.title)}</strong></td>
      <td>${escapeHtml(task.description || '-')}</td>
      <td>${escapeHtml(task.assignee)}</td>
      <td>
        <div class="task-actions">
          <button 
            class="btn-icon edit" 
            data-task-id="${task.id}"
            aria-label="Edit task: ${escapeHtml(task.title)}">
            Edit
          </button>
          <button 
            class="btn-icon delete" 
            data-task-id="${task.id}"
            aria-label="Delete task: ${escapeHtml(task.title)}">
            Delete
          </button>
        </div>
      </td>
    `;
    
    elements.tasksTbody.appendChild(row);
  });
  
  // Attach event listeners to action buttons
  document.querySelectorAll('.status-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      toggleTaskStatus(e.target.dataset.taskId);
    });
  });
  
  document.querySelectorAll('.btn-icon.edit').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const taskId = e.target.dataset.taskId;
      const task = tasks.find(t => t.id === taskId);
      if (task) openTaskModal(task);
    });
  });
  
  document.querySelectorAll('.btn-icon.delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const taskId = e.target.dataset.taskId;
      const task = tasks.find(t => t.id === taskId);
      if (task) openDeleteModal(task);
    });
  });
}

// Update summary statistics
function updateSummary() {
  const total = tasks.length;
  const pending = tasks.filter(t => t.status === 'pending').length;
  const completed = tasks.filter(t => t.status === 'completed').length;
  
  elements.totalTasks.textContent = total;
  elements.pendingCount.textContent = pending;
  elements.completedCount.textContent = completed;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
