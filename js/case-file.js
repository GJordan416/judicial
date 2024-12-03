function submitCase(event) {
    event.preventDefault();  // Prevent form from submitting the traditional way

    // Get the form data
    const caseId = document.getElementById('caseId').value;
    const caseTitle = document.getElementById('caseTitle').value;
    const caseDescription = document.getElementById('caseDescription').value;

    // Create a case object
    const newCase = {
        id: caseId,
        title: caseTitle,
        description: caseDescription,
        assignedTo: null,  // Initial state of the case (unassigned)
        status: 'Unassigned'
    };

    // Retrieve existing cases from localStorage or create an empty array
    const cases = JSON.parse(localStorage.getItem('judicialCases')) || [];

    // Add the new case to the array
    cases.push(newCase);

    // Store the updated cases array back to localStorage
    localStorage.setItem('judicialCases', JSON.stringify(cases));

    // Display a confirmation alert
    alert(`Case ${caseId} has been successfully submitted!`);

    // Redirect to the home page
    window.location.href = 'index.html';  // Change this to the correct homepage file if needed
}
