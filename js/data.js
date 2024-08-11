// Toggle menu icon and navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Scroll sections active link
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.navbar a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (document.querySelector('.navbar a[href*=' + id + ']')) {
                    document.querySelector('.navbar a[href*=' + id + ']').classList.add('active');
                }
            });
        }
    });

    // Sticky navbar
    let header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Remove menu icon navbar when clicking a link (scroll)
    if (navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
    }
};

// Dark mode toggle
let darkModeIcon = document.querySelector('#darkMode-icon');

darkModeIcon.onclick = () => {
    darkModeIcon.classList.toggle('bx-sun');
    document.body.classList.toggle('dark-mode');
};

// Fetch contacts from MongoDB and display them
async function fetchContacts() {
    try {
        const response = await fetch('http://localhost:3000/api/contacts');
        if (response.ok) {
            const contacts = await response.json();
            const tableBody = document.getElementById('contactTableBody');
            tableBody.innerHTML = '';

            contacts.forEach(contact => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${contact.fullName}</td>
                    <td>${contact.emailAddress}</td>
                    <td>${contact.mobileNumber}</td>
                    <td>${contact.emailSubject}</td>
                    <td>${contact.message}</td>
                    <td>
                        <button onclick="updateContact('${contact._id}')">Update</button>
                        <button onclick="deleteContact('${contact._id}')">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        } else {
            console.error('Failed to fetch contacts');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Delete contact
async function deleteContact(id) {
    if (confirm('Are you sure you want to delete this contact?')) {
        try {
            const response = await fetch(`http://localhost:3000/api/contacts/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Contact deleted successfully!');
                fetchContacts(); // Refresh the contact list
            } else {
                alert('Failed to delete contact.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while deleting the contact.');
        }
    }
}

// Update contact
async function updateContact(id) {
    const newMessage = prompt('Enter new message:');
    if (newMessage) {
        try {
            const response = await fetch(`http://localhost:3000/api/contacts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: newMessage })
            });

            if (response.ok) {
                alert('Contact updated successfully!');
                fetchContacts(); // Refresh the contact list
            } else {
                alert('Failed to update contact.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while updating the contact.');
        }
    }
}

// Fetch contacts when page loads
fetchContacts();