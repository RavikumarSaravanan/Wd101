document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = new Date(document.getElementById('dob').value);
    const acceptedTerms = document.getElementById('terms').checked;

    const age = new Date().getFullYear() - dob.getFullYear();

    if (age < 18 || age > 55) {
        alert("You must be between 18 and 55 years old.");
        return;
    }

    const registrationData = { name, email, password, dob: dob.toISOString().split('T')[0], acceptedTerms };
    saveToLocalStorage(registrationData);
    displayData();
});

function saveToLocalStorage(data) {
    let storedData = JSON.parse(localStorage.getItem('registrations')) || [];
    storedData.push(data);
    localStorage.setItem('registrations', JSON.stringify(storedData));
}

function displayData() {
    const tbody = document.querySelector('#dataTable tbody');
    tbody.innerHTML = '';
    const storedData = JSON.parse(localStorage.getItem('registrations')) || [];

    storedData.forEach(item => {
        const row = `<tr>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.password}</td>
            <td>${item.dob}</td>
            <td>${item.acceptedTerms}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

// Load existing data when page loads
window.onload = displayData;
