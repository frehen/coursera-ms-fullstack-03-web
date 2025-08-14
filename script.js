// === Scroll spy feature to highlight section displayed on screen in Menu ===
const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll(".nav-menu a");
const header = document.getElementById("header");
const main = document.querySelector("main");

function updateHeaderOffsets() {
    const headerHeight = header.offsetHeight;

    // Add top padding to main so content is not hidden behind header
    main.style.paddingTop = `${headerHeight + 16}px`; // 16px extra spacing

    // Adjust scroll-margin-top for each section to account for header height
    sections.forEach(section => {
        section.style.scrollMarginTop = `${headerHeight + 16}px`;
    });
}

// Run on page load
updateHeaderOffsets();

// Optional: run on window resize in case header height changes
window.addEventListener("resize", updateHeaderOffsets);

function isAtPageBottom(offset = 0) {
    const doc = document.documentElement;
    return doc.scrollHeight <= (window.scrollY + doc.clientHeight + offset)
}

window.addEventListener("scroll", () => {
    // Account for sticky header. Set location for menu selection to 32px below header. 
    const scrollPosition = window.scrollY + header.offsetHeight + 32;
    let current = sections[0].getAttribute("id"); // Default to first section

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollPosition >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    // Select the last section when the bottom of page has been almost reached. 
    // The last section might not be able to scroll all the way to the top of the page.
    const pageBottomOffset = 50;
    const lastSection = sections[sections.length - 1];
    if (isAtPageBottom(pageBottomOffset)) {
        current = lastSection.getAttribute("id");
    }

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// === Hamburger Menu ===
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Function to toggle the menu's active state
function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Add a click event listener to the hamburger button
hamburger.addEventListener('click', toggleMenu);

// Optional: Close the menu when a link is clicked on mobile
document.querySelectorAll('.nav-item a').forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            // Check if the menu is active before closing
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        }
    });
});

// === Contact form ==== 
const contactForm = document.getElementById('contact-form');

// Add an event listener for the form submission
contactForm.addEventListener('submit', function (event) {
    // Prevent the default form submission behavior (which reloads the page)
    event.preventDefault();

    // Get the values from the form fields
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const topics = document.getElementById('topic').value;

    // Log the form contents to the console
    console.log('--- Form Submission Data ---');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Topic:', topic);
    console.log('---------------------------');

    // You would typically send this data to a server here using fetch()
    // Example:
    // fetch('/submit-form', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ name, email, topics }),
    // })
    // .then(response => response.json())
    // .then(data => console.log('Success:', data))
    // .catch((error) => console.error('Error:', error));

    // You could also show a success message to the user here
    // For this example, we'll just alert that the data was logged
    alert('Form submitted! Check the console for the data.');
});
