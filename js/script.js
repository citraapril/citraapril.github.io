// Submit form data to Supabase
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    let contactData = {
        full_name: document.getElementById('fullName').value,
        email_address: document.getElementById('emailAddress').value,
        mobile_number: document.getElementById('mobileNumber').value,
        email_subject: document.getElementById('emailSubject').value,
        message: document.getElementById('message').value,
        created_at: new Date().toISOString()
    };

    try {
        await addContact(contactData);
        let notification = document.getElementById('notification');
        notification.textContent = 'Thank you for filling out the form!';
        notification.style.backgroundColor = '#4CAF50'; // Hijau untuk sukses
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
            window.location.href = 'data.html'; // Redirect ke data.html setelah sukses
        }, 3000);
    } catch (error) {
        let notification = document.getElementById('notification');
        notification.textContent = 'There was an error submitting your form. Please try again.';
        notification.style.backgroundColor = '#f44336'; // Merah untuk error
        notification.style.display = 'block';
        setTimeout(() => notification.style.display = 'none', 5000);
    }
});

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

// Submit form data to backend and MongoDB
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const contactData = {
        fullName: document.getElementById('fullName').value,
        emailAddress: document.getElementById('emailAddress').value,
        mobileNumber: document.getElementById('mobileNumber').value,
        emailSubject: document.getElementById('emailSubject').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch('http://localhost:3000/api/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
        });

        if (response.ok) {
            let notification = document.getElementById('notification');
            notification.textContent = 'Thank you for filling out the form!';
            notification.style.backgroundColor = '#4CAF50';
            notification.style.display = 'block';
            setTimeout(() => {
                notification.style.display = 'none';
                window.location.href = 'data.html';
            }, 3000);
        } else {
            throw new Error('Failed to send message.');
        }
    } catch (error) {
        let notification = document.getElementById('notification');
        notification.textContent = 'There was an error submitting your form. Please try again.';
        notification.style.backgroundColor = '#f44336';
        notification.style.display = 'block';
        setTimeout(() => notification.style.display = 'none', 5000);
    }
});