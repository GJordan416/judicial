// Mock data for demonstration
const users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'judge1', password: 'judge123', role: 'judge' },
    { username: 'lawyer1', password: 'lawyer123', role: 'lawyer' },
    { username: 'citizen1', password: 'citizen123', role: 'citizen' }
];

const cases = [
    { caseNumber: '12345', title: 'John Doe vs Jane Doe', status: 'Open' },
    { caseNumber: '67890', title: 'Company X vs Company Y', status: 'In Progress' },
    { caseNumber: '11223', title: 'Alice Johnson vs Bob Smith', status: 'Closed' }
];

const judicialPanel = [
    { name: 'Judge John Smith', email: 'john.smith@judiciary.com' },
    { name: 'Judge Mary Johnson', email: 'mary.johnson@judiciary.com' },
    { name: 'Judge Peter Brown', email: 'peter.brown@judiciary.com' }
];

const usersList = [
    { username: 'admin', role: 'admin' },
    { username: 'judge1', role: 'judge' },
    { username: 'lawyer1', role: 'lawyer' },
    { username: 'citizen1', role: 'citizen' }
];

// Login simulation
document.getElementById('loginForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem('user', JSON.stringify(user)); // Store user in localStorage
        window.location.href = 'dashboard.html'; // Redirect to dashboard
    } else {
        document.getElementById('error-message').textContent = 'Invalid username or password';
    }
});

// Load dashboard
if (document.getElementById('username') && localStorage.getItem('user')) {
    const user = JSON.parse(localStorage.getItem('user'));
    document.getElementById('username').textContent = user.username;

    // Load cases into the case list table
    const caseList = document.getElementById('case-list');
    cases.forEach(caseItem => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${caseItem.caseNumber}</td>
            <td>${caseItem.title}</td>
            <td>${caseItem.status}</td>
        `;
        caseList.appendChild(row);
    });
}

// Load Judicial Panel
if (document.getElementById('panel-list')) {
    const panelList = document.getElementById('panel-list');
    judicialPanel.forEach(judge => {
        const li = document.createElement('li');
        li.textContent = `${judge.name} - ${judge.email}`;
        panelList.appendChild(li);
    });
}

// Case filing simulation
document.getElementById('caseForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const caseTitle = document.getElementById('caseTitle').value;
    const caseDetails = document.getElementById('caseDetails').value;

    // Simulate case filing by logging to the console
    console.log('Case Filed:', caseTitle, caseDetails);
    alert('Case filed successfully');
});

// Admin Panel: Manage Users
if (document.getElementById('user-list')) {
    const userList = document.getElementById('user-list');
    usersList.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.role}</td>
        `;
        userList.appendChild(row);
    });
}
