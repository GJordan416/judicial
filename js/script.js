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

// Mock judicial panel data
const judicialCases = [];

// Event listener for case submission
document.getElementById('caseForm')?.addEventListener('submit', async function (event) {
    event.preventDefault();

    // Grab the case details
    const caseTitle = document.getElementById('caseTitle').value;
    const caseDetails = document.getElementById('caseDetails').value;
    const clientName = document.getElementById('clientName')?.value || "Anonymous";

    // Generate a unique case ID
    const caseId = `CASE-${Date.now()}`;

    // Add the case to the judicial panel
    const newCase = {
        id: caseId,
        title: caseTitle,
        details: caseDetails,
        client: clientName,
        assignedTo: null // Not assigned to a judge yet
    };
    judicialCases.push(newCase);

    // Update the localStorage (simulate database storage)
    localStorage.setItem('judicialCases', JSON.stringify(judicialCases));

    // Discord webhook URL
    const discordWebhookUrl = 'https://discord.com/api/webhooks/1313312647344689163/L0R54rCuqLcdEau7TXgveaE5GuKdtMpBcYnFBkguqAY56F1vUL1vJqe0d5HLP4YVilSF';

    // Prepare payload for Discord
    const payload = {
        content: `**New Case Filed**\n**Case ID:** ${caseId}\n**Title:** ${caseTitle}\n**Client:** ${clientName}\n**Details:** ${caseDetails}\n\nThis case is ready to be assigned to a judge.`
    };

    try {
        // Send data to the Discord webhook
        const response = await fetch(discordWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert('Case filed successfully and sent to Discord!');
        } else {
            console.error('Error sending to Discord:', response.statusText);
            alert('Failed to send case details to Discord.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while sending the case details.');
    }
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
