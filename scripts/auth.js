
// sign up
const nameRegex = /^[A-Za-z\s]{3,30}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[6-9]\d{9}$/;
const passwordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;


const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        // Name Validation
        if (!nameRegex.test(name)) {
            alert("Name must contain 3-30 letters only.");
            return;
        }

        // Email Validation
        if (!emailRegex.test(email)) {
            alert("Enter a valid email.");
            return;
        }

        // Phone Validation
        if (!phoneRegex.test(phone)) {
            alert("Enter a valid 10-digit phone number.");
            return;
        }

        // Password Validation
        if (!passwordRegex.test(password)) {
            alert("Password must contain:\n\n• 8 characters\n• One uppercase\n• One lowercase\n• One number\n• One special character");
            return;
        }

        // Confirm Password
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Check duplicate email
        const exists = users.find(user => user.email === email);

        if (exists) {
            alert("Email already registered.");
            return;
        }

        const newUser = {

            id: Date.now(),

            name,

            email,

            phone,

            password

        };

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        alert("Account Created Successfully!");

        signupForm.reset();

        window.location.href = "login.html";

    });

}



// ================================
// LOGIN Form
// ================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value;

        if (email === "" || password === "") {

            alert("All fields are required.");

            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(user => {

            return user.email === email &&
                   user.password === password;

        });

        if (!user) {

            alert("Invalid Email or Password");

            return;

        }

        localStorage.setItem("currentUser", JSON.stringify(user));

        alert("Login Successful");

        window.location.href = "index.html";

    });

}



// ================================
// LOGOUT
// ================================

function logout() {

    localStorage.removeItem("currentUser");

    alert("Logged Out Successfully");

    window.location.href = "login.html";

}



// ================================
// CHECK LOGIN
// ================================

function isLoggedIn() {

    return localStorage.getItem("currentUser") !== null;

}



// ================================
// PROTECT CHECKOUT
// ================================

function protectCheckout() {

    if (!isLoggedIn()) {

        alert("Please Login First");

        window.location.href = "login.html";

    }

}








// navbar profileName



document.addEventListener("DOMContentLoaded",()=>{

    showLoggedInUser();

    

});