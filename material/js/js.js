
let balance = parseInt(localStorage.getItem('balance')) || 0;

function completeTask(reward, taskUrl) {
   
    if (localStorage.getItem(taskUrl) === 'true') {
        alert('You have already completed this task.');
        return;
    }

 
    balance += reward;
    updateBalance();

 
    localStorage.setItem(taskUrl, 'true');

 
    localStorage.setItem('balance', balance);


    window.location.href = taskUrl;
}

function updateBalance() {
    document.getElementById('balance').textContent = balance;
}

updateBalance();
