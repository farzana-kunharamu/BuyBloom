const wishlistItems = document.getElementById("wishlistItems");

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {

    alert("Please login first.");

    window.location.href = "login.html";

}

const wishlistKey = `wishlist_${currentUser.id}`;

let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];

displayWishlist();


// =====================================
// Display Wishlist
// =====================================

function displayWishlist() {

    wishlistItems.innerHTML = "";

    if (wishlist.length === 0) {

        wishlistItems.innerHTML = `

        <div class="col-12">

            <div class="alert alert-warning text-center">

                <h4>Your Wishlist is Empty ❤️</h4>

            </div>

        </div>

        `;

        return;

    }

    wishlist.forEach(product => {

        wishlistItems.innerHTML += `

        <div class="col-lg-3 col-md-4 mb-4">

            <div class="card h-100 shadow">

                <img
                    src="${product.image}"
                    class="card-img-top p-3"
                    style="height:220px;object-fit:contain;"
                >

                <div class="card-body d-flex flex-column">

                    <h6>

                        ${product.title}

                    </h6>

                    <h4 class="text-danger">

                        $${product.price}

                    </h4>

                    <div class="mt-auto d-grid gap-2">

                        <button
                            class="btn btn-buy"
                            onclick="moveToCart(${product.id})">

                            🛒 Move To Cart

                        </button>

                        <button
                            class="btn btn-outline-danger"
                            onclick="removeWishlist(${product.id})">

                            Remove

                        </button>

                    </div>

                </div>

            </div>

        </div>

        `;

    });

}
function removeWishlist(id) {

    wishlist = wishlist.filter(item => item.id !== id);

    localStorage.setItem(wishlistKey, JSON.stringify(wishlist));

    updateWishlistCount();

    displayWishlist();

}
function moveToCart(id) {

    const product = wishlist.find(item => item.id === id);

    const cartKey = `cart_${currentUser.id}`;

    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const existing = cart.find(item => item.id === id);

    if (existing) {

        existing.quantity++;

    }

    else {

        cart.push({

            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1

        });

    }

    localStorage.setItem(cartKey, JSON.stringify(cart));

    removeWishlist(id);

    updateCartCount();

    alert("Moved To Cart");

}
function clearWishlist() {

    if (!confirm("Clear Wishlist?")) return;

    wishlist = [];

    localStorage.setItem(wishlistKey, JSON.stringify(wishlist));

    updateWishlistCount();

    displayWishlist();

}