// ======================================
// Cart
// ======================================

const cartItems = document.getElementById("cartItems");
const grandTotal = document.getElementById("grandTotal");

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {

    alert("Please login first.");

    window.location.href = "login.html";

}

const cartKey = `cart_${currentUser.id}`;

let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

displayCart();


// ======================================
// Display Cart
// ======================================

function displayCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `

        <div class="col-12">

            <div class="alert alert-warning text-center">

                <h4>Your Cart is Empty</h4>

            </div>

        </div>

        `;

        grandTotal.innerText = "0.00";

        return;

    }

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

        cartItems.innerHTML += `

        <div class="card mb-3 shadow">

            <div class="card-body">

                <div class="row align-items-center">

                    <div class="col-md-2">

                        <img
                            src="${item.image}"
                            class="img-fluid"
                            style="height:120px;object-fit:contain;">

                    </div>

                    <div class="col-md-4">

                        <h5>${item.title}</h5>

                        <h4 class="text-danger">

                            $${item.price}

                        </h4>

                    </div>

                    <div class="col-md-3">

                        <div class="d-flex gap-2">

                            <button
                                class="btn btn-secondary"
                                onclick="decreaseQuantity(${item.id})">

                                -

                            </button>

                            <span class="fs-5">

                                ${item.quantity}

                            </span>

                            <button
                                class="btn btn-secondary"
                                onclick="increaseQuantity(${item.id})">

                                +

                            </button>

                        </div>

                    </div>

                    <div class="col-md-3 text-end">

                        <button
                            class="btn btn-danger"
                            onclick="removeItem(${item.id})">

                            Remove

                        </button>

                    </div>

                </div>

            </div>

        </div>

        `;

    });

    grandTotal.innerText = total.toFixed(2);

}
// ======================================
// Increase Quantity
// ======================================

function increaseQuantity(id) {

    const product = cart.find(item => item.id === id);

    if (product) {

        product.quantity++;

    }

    localStorage.setItem(cartKey, JSON.stringify(cart));

    updateCartCount();

    displayCart();

}


// ======================================
// Decrease Quantity
// ======================================

function decreaseQuantity(id) {

    const product = cart.find(item => item.id === id);

    if (product.quantity > 1) {

        product.quantity--;

    }

    localStorage.setItem(cartKey, JSON.stringify(cart));

    updateCartCount();

    displayCart();

}
// ======================================
// Remove Item
// ======================================

function removeItem(id) {

    cart = cart.filter(item => item.id !== id);

    localStorage.setItem(cartKey, JSON.stringify(cart));

    updateCartCount();

    displayCart();

}


// ======================================
// Clear Cart
// ======================================

function clearCart() {

    if (!confirm("Clear Cart?")) return;

    cart = [];

    localStorage.setItem(cartKey, JSON.stringify(cart));

    updateCartCount();

    displayCart();

}


// ======================================
// Checkout
// ======================================

function checkout() {

    if (cart.length === 0) {

        alert("Cart is Empty");

        return;

    }

    window.location.href = "checkout.html";

}