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

// Load data into update form
document.addEventListener('DOMContentLoaded', function() {
    // Get index from URL
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('index');

    // Get contact list from localStorage
    const contactList = JSON.parse(localStorage.getItem('contactList')) || [];
    const contact = contactList[index];

    if (contact) {
        document.getElementById('updateIndex').value = index;
        document.getElementById('fullName').value = contact.fullName;
        document.getElementById('emailAddress').value = contact.emailAddress;
        document.getElementById('mobileNumber').value = contact.mobileNumber;
        document.getElementById('emailSubject').value = contact.emailSubject;
        document.getElementById('message').value = contact.message;
    }
});

// Update contact
document.getElementById('contactUpdateForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let index = document.getElementById('updateIndex').value;
    let contactList = JSON.parse(localStorage.getItem('contactList')) || [];

    contactList[index] = {
        fullName: document.getElementById('fullName').value,
        emailAddress: document.getElementById('emailAddress').value,
        mobileNumber: document.getElementById('mobileNumber').value,
        emailSubject: document.getElementById('emailSubject').value,
        message: document.getElementById('message').value
    };

    localStorage.setItem('contactList', JSON.stringify(contactList));
    window.location.href = 'data.html'; // Redirect back to data.html after update
});
