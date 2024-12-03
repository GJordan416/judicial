// Load unassigned cases and display them in the table
if (document.getElementById('caseTableBody')) {
    const savedCases = JSON.parse(localStorage.getItem('judicialCases')) || [];
    const caseTableBody = document.getElementById('caseTableBody');

    savedCases.forEach(caseItem => {
        if (!caseItem.assignedTo) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${caseItem.id}</td>
                <td>${caseItem.title}</td>
                <td>${caseItem.client}</td>
                <td>${caseItem.details}</td>
                <td>
                    <select id="judgeSelect-${caseItem.id}">
                        <option value="">-- Select Judge --</option>
                        <option value="Judge John Smith">Judge John Smith</option>
                        <option value="Judge Mary Johnson">Judge Mary Johnson</option>
                        <option value="Judge Peter Brown">Judge Peter Brown</option>
                    </select>
                    <button onclick="assignJudge('${caseItem.id}')">Assign</button>
                </td>
            `;
            caseTableBody.appendChild(row);
        }
    });
}

// Function to assign a judge to a case
async function assignJudge(caseId) {
    const judgeSelect = document.getElementById(`judgeSelect-${caseId}`);
    const selectedJudge = judgeSelect.value;

    if (!selectedJudge) {
        alert('Please select a judge.');
        return;
    }

    // Update the case with the assigned judge
    const cases = JSON.parse(localStorage.getItem('judicialCases')) || [];
    const caseIndex = cases.findIndex(c => c.id === caseId);
    if (caseIndex > -1) {
        cases[caseIndex].assignedTo = selectedJudge;
        cases[caseIndex].status = 'Assigned';  // Set initial status to "Assigned"
        localStorage.setItem('judicialCases', JSON.stringify(cases));

        // Send Discord notification with embed
        const discordWebhookUrl = 'https://discord.com/api/webhooks/1313312647344689163/L0R54rCuqLcdEau7TXgveaE5GuKdtMpBcYnFBkguqAY56F1vUL1vJqe0d5HLP4YVilSF';
        const payload = {
            embeds: [
                {
                    title: `Case Assigned: ${caseId}`,
                    description: `The case with ID **${caseId}** has been assigned to **${selectedJudge}**.`,
                    color: 3447003,  // Blue
                    fields: [
                        {
                            name: 'Case ID',
                            value: caseId,
                            inline: true
                        },
                        {
                            name: 'Assigned Judge',
                            value: selectedJudge,
                            inline: true
                        }
                    ],
                    footer: {
                        text: 'Judiciary System'
                    }
                }
            ]
        };

        try {
            const response = await fetch(discordWebhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert(`Case ${caseId} assigned to ${selectedJudge}`);
            } else {
                console.error('Error sending to Discord:', response.statusText);
                alert('Failed to send case assignment to Discord.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while sending the case details.');
        }

        // Reload page to reflect changes in the table
        location.reload();
    }
}
