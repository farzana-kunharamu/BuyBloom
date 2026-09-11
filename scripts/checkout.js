// =====================================
// Checkout
// =====================================
// Order Summary
const subtotal = document.getElementById("subtotal");
const tax = document.getElementById("tax");
const shipping = document.getElementById("shipping");
const grandTotal = document.getElementById("grandTotal");

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {

    alert("Please login first.");

    window.location.href = "login.html";

}

const cartKey = `cart_${currentUser.id}`;

const cart = JSON.parse(localStorage.getItem(cartKey)) || [];



function loadSummary() {

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

    });

    const taxAmount = total * 0.05;

    const shippingAmount = 10;

    subtotal.innerText = "$" + total.toFixed(2);

    tax.innerText = "$" + taxAmount.toFixed(2);

    shipping.innerText = "$" + shippingAmount.toFixed(2);

    grandTotal.innerText = "$" + (total + taxAmount + shippingAmount).toFixed(2);

}

// place order
const checkoutForm = document.getElementById("checkoutForm");

checkoutForm.addEventListener("submit", placeOrder);

function placeOrder(e) {

    e.preventDefault();

    if (cart.length === 0) {

        alert("Cart is Empty");

        return;

    }

    const orderKey = `orders_${currentUser.id}`;

    let orders = JSON.parse(localStorage.getItem(orderKey)) || [];

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

    });

    const taxAmount = total * 0.05;

    const shippingAmount = 10;

    const finalTotal = total + taxAmount + shippingAmount;

    const newOrder = {

        orderId: Date.now(),

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        address: document.getElementById("address").value,

        date: new Date().toLocaleString(),

        status: "Processing",

        total: finalTotal,

        items: cart

    };

    orders.push(newOrder);

    localStorage.setItem(orderKey, JSON.stringify(orders));

    localStorage.removeItem(cartKey);

    updateCartCount();

    alert("Order Placed Successfully!");

    window.location.href = "success.html";

}