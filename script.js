// === Scroll Spy Feature ===
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

window.addEventListener("scroll", () => {
    // Account for sticky header. Set focus for menu selection 32 px under header. 
    const scrollPosition = window.scrollY + header.offsetHeight + 32;
    let current = sections[0].getAttribute("id"); // Default to first section

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollPosition >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    // Select last section when present in upper quater of screen

    const lastSection = sections[sections.length-1];
    if (scrollPosition >= lastSection.offsetTop - window.innerHeight/4) {
       current = lastSection.getAttribute("id");  
    }

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// Contact form 
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
