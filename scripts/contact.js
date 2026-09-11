// Initialize EmailJS
emailjs.init("lIJ0S5uZQb_iAxB1n");

// Validation

const form = document.getElementById("contactForm");

const nameRegex = /^[A-Za-z\s]{3,30}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener("submit", sendEmail);

function sendEmail(e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!nameRegex.test(name)) {
        alert("Enter a valid name.");
        return;
    }

    if (!emailRegex.test(email)) {
        alert("Enter a valid email.");
        return;
    }

    if (subject.length < 3) {
        alert("Subject is required.");
        return;
    }

    if (message.length < 10) {
        alert("Message should contain at least 10 characters.");
        return;
    }

    const params = {
        name: name,
        email: email,
        subject: subject,
        message: message
    };

    emailjs.send(
        "service_saxmhro",
        "template_z58yx67",
        params
    )

    .then(() => {

        alert("Message sent successfully.");
 window.location.href = "index.html";
        form.reset();

    })

    .catch(() => {

        alert("Failed to send message.");

    });

}