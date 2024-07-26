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

        if(top >= offset && top < offset + height) {
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

// Load data into table
document.addEventListener('DOMContentLoaded', function() {
    const contactList = JSON.parse(localStorage.getItem('contactList')) || [];
    const dataTable = document.getElementById('dataTable').getElementsByTagName('tbody')[0];

    contactList.forEach((contact, index) => {
        let row = dataTable.insertRow();

        let cellFullName = row.insertCell(0);
        let cellEmailAddress = row.insertCell(1);
        let cellMobileNumber = row.insertCell(2);
        let cellEmailSubject = row.insertCell(3);
        let cellMessage = row.insertCell(4);
        let cellActions = row.insertCell(5);

        cellFullName.innerHTML = contact.fullName;
        cellEmailAddress.innerHTML = contact.emailAddress;
        cellMobileNumber.innerHTML = contact.mobileNumber;
        cellEmailSubject.innerHTML = contact.emailSubject;
        cellMessage.innerHTML = contact.message;
        cellActions.innerHTML = `<button class="update" onclick="editRow(${index})">Update</button><button class="delete" onclick="deleteRow(${index})">Delete</button>`;
    });
});

// Edit row
function editRow(index) {
    // Redirect to update.html with index as query parameter
    window.location.href = `update.html?index=${index}`;
}

// Delete row
function deleteRow(index) {
    let contactList = JSON.parse(localStorage.getItem('contactList')) || [];
    contactList.splice(index, 1);
    localStorage.setItem('contactList', JSON.stringify(contactList));
    location.reload();
}
