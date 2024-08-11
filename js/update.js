// Toggle menu icon and navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Dark mode toggle
let darkModeIcon = document.querySelector('#darkMode-icon');

darkModeIcon.onclick = () => {
    darkModeIcon.classList.toggle('bx-sun');
    document.body.classList.toggle('dark-mode');
};

// contact data
document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id) {
        try {
            const response = await fetch(`http://localhost:3000/api/contacts/${id}`);
            if (response.ok) {
                const contact = await response.json();
                document.getElementById('contactId').value = contact.id;
                document.getElementById('fullName').value = contact.fullName;
                document.getElementById('emailAddress').value = contact.emailAddress;
                document.getElementById('mobileNumber').value = contact.mobileNumber;
                document.getElementById('emailSubject').value = contact.emailSubject;
                document.getElementById('message').value = contact.message;
            } else {
                alert('Failed to load contact data.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while loading contact data.');
        }
    }
});

document.getElementById('updateForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const id = document.getElementById('contactId').value;
    const fullName = document.getElementById('fullName').value;
    const emailAddress = document.getElementById('emailAddress').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    const emailSubject = document.getElementById('emailSubject').value;
    const message = document.getElementById('message').value;

    const data = {
        fullName,
        emailAddress,
        mobileNumber,
        emailSubject,
        message
    };

    try {
        const response = await fetch(`http://localhost:3000/api/contacts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Contact updated successfully!');
        } else {
            alert('Failed to update contact.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while updating the contact.');
    }
});