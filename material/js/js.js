let balance = parseInt(localStorage.getItem('balance')) || 0;

// Function to check if task is completed
function isTaskCompleted(taskId, taskType) {
    return localStorage.getItem(`${taskType}_${taskId}`) === 'true';
}

// Function to mark task as completed
function completeTask(reward, taskUrl, taskId, taskType = 'general') {
    // Check if already completed
    if (isTaskCompleted(taskId, taskType)) {
        return; // Do nothing if task is already completed
    }

    // Update balance
    balance += reward;
    updateBalance();

    // Store completion status with task type
    localStorage.setItem(`${taskType}_${taskId}`, 'true');
    localStorage.setItem('balance', balance);

    // Update task appearance
    const button = event.target;
    markTaskAsCompleted(button);

    // Navigate to verification
    window.location.href = taskUrl;
}

// Function to mark task as completed visually
function markTaskAsCompleted(button) {
    const taskElement = button.closest('.task');
    if (taskElement) {
        taskElement.classList.add('completed-task');
        button.innerHTML = '<i class="fas fa-check"></i> Completed';
        button.classList.add('completed-button');
        button.disabled = true;
    }
}

function updateBalance() {
    const balanceElement = document.getElementById('balance');
    if (balanceElement) {
        balanceElement.textContent = balance;
    }
}

// Function to initialize tasks state based on type
function initializeTasks(taskType) {
    const tasks = document.querySelectorAll('.task');
    tasks.forEach(task => {
        const button = task.querySelector('.task-button');
        if (button) {
            const taskId = button.getAttribute('data-task-id');
            if (taskId && isTaskCompleted(taskId, taskType)) {
                markTaskAsCompleted(button);
            }
        }
    });
}

// Set active navigation item
function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateBalance();
    setActiveNavItem();
    
    // Check which page we're on
    const currentPage = window.location.pathname;
    if (currentPage.includes('home.html')) {
        initializeTasks('home');
    } else if (currentPage.includes('task.html')) {
        initializeTasks('task');
    }
});
