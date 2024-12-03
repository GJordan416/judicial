document.addEventListener('DOMContentLoaded', () => {
    loadUnassignedCases(); // Load unassigned cases when the page loads
});

// Function to load unassigned cases into the judicial panel
function loadUnassignedCases() {
    const unassignedCasesBody = document.getElementById('unassignedCasesBody');
    const cases = JSON.parse(localStorage.getItem('judicialCases')) || [];

    // Clear the table before adding new rows
    unassignedCasesBody.innerHTML = '';

    // Loop through cases and display the unassigned ones
    cases.forEach(caseItem => {
        if (!caseItem.assignedTo) {  // Only display unassigned cases
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${caseItem.id}</td>
                <td>${caseItem.title}</td>
                <td>
                    <select id="judgeSelect-${caseItem.id}">
                        <option value="">Select Judge</option>
                        <option value="Judge A">Judge A</option>
                        <option value="Judge B">Judge B</option>
                        <option value="Judge C">Judge C</option>
                    </select>
                </td>
                <td>
                    <button onclick="assignJudgeToCase('${caseItem.id}')">Assign Judge</button>
                </td>
            `;
            unassignedCasesBody.appendChild(row);
        }
    });
}

// Function to assign a judge to a case
function assignJudgeToCase(caseId) {
    const judgeSelect = document.getElementById(`judgeSelect-${caseId}`);
    const selectedJudge = judgeSelect.value;

    if (!selectedJudge) {
        alert('Please select a judge.');
        return;
    }

    const cases = JSON.parse(localStorage.getItem('judicialCases')) || [];
    const caseIndex = cases.findIndex(c => c.id === caseId);

    if (caseIndex > -1) {
        cases[caseIndex].assignedTo = selectedJudge;
        cases[caseIndex].status = 'Assigned'; // Update status to "Assigned"

        localStorage.setItem('judicialCases', JSON.stringify(cases));

        alert(`Case ${caseId} has been assigned to ${selectedJudge}`);
        loadUnassignedCases();  // Refresh unassigned cases list
    }
}

// Function to handle the submission of ruling and warrant
function submitRulingAndWarrant() {
    const rulingInput = document.getElementById('rulingInput').value;
    const warrantInput = document.getElementById('warrantInput').value;

    if (!rulingInput || !warrantInput) {
        alert('Please fill in both the Ruling and Warrant details.');
        return;
    }

    const judgeName = "Judge A"; // This can be dynamically retrieved from the user's session if needed

    const rulingWarrantData = {
        judge: judgeName,
        ruling: rulingInput,
        warrant: warrantInput,
        date: new Date().toLocaleString()
    };

    // Save the ruling and warrant to localStorage (or send it to a server, etc.)
    let judicialData = JSON.parse(localStorage.getItem('judicialData')) || [];
    judicialData.push(rulingWarrantData);

    localStorage.setItem('judicialData', JSON.stringify(judicialData));

    alert('Ruling and Warrant submitted successfully!');
    
    // Clear the inputs
    document.getElementById('rulingInput').value = '';
    document.getElementById('warrantInput').value = '';
}
