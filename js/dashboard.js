if (document.getElementById('caseManagementBody')) {
    const savedCases = JSON.parse(localStorage.getItem('judicialCases')) || [];
    const caseManagementBody = document.getElementById('caseManagementBody');

    // Clear the table before populating
    caseManagementBody.innerHTML = '';

    savedCases.forEach(caseItem => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${caseItem.id}</td>
            <td>${caseItem.title}</td>
            <td>${caseItem.assignedTo || 'Unassigned'}</td>
            <td>
                <select id="statusSelect-${caseItem.id}">
                    <option value="Assigned" ${caseItem.status === 'Assigned' ? 'selected' : ''}>Assigned</option>
                    <option value="In Progress" ${caseItem.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                    <option value="Closed" ${caseItem.status === 'Closed' ? 'selected' : ''}>Closed</option>
                </select>
            </td>
            <td><button onclick="updateStatus('${caseItem.id}')">Update Status</button></td>
        `;
        caseManagementBody.appendChild(row);
    });
}

// Function to update the status of a case
function updateStatus(caseId) {
    const statusSelect = document.getElementById(`statusSelect-${caseId}`);
    const newStatus = statusSelect.value;

    // Update the case status in localStorage
    const cases = JSON.parse(localStorage.getItem('judicialCases')) || [];
    const caseIndex = cases.findIndex(c => c.id === caseId);
    if (caseIndex > -1) {
        cases[caseIndex].status = newStatus;
        localStorage.setItem('judicialCases', JSON.stringify(cases));
        alert(`Case ${caseId} status updated to ${newStatus}`);
        location.reload();  // Reload page to reflect status change
    }
}

