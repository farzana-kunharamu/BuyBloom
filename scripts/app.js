
// updateCartCount
function updateCartCount() {
console.log("updateCartCount called");

    const cartCount = document.getElementById("cartCount");

    // If the cart count element doesn't exist on this page
    if (!cartCount) return;

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // If no user is logged in
    if (!currentUser) {
        cartCount.innerText = 0;
        return;
    }
// unique LocalStorage key,It gives each user a separate shopping cart
    const cartKey = `cart_${currentUser.id}`;

// cart quantity
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
console.log(cart);
    const totalItems = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    cartCount.innerText = totalItems;
}




// Wishlist


function getWishlistKey() {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) return null;

    return `wishlist_${currentUser.id}`;

}

async function toggleWishlist(id) {
  console.log("Wishlist clicked:", id);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {

        alert("Please login first.");

        window.location.href = "login.html";

        return;
    }

    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await response.json();

    const wishlistKey = `wishlist_${currentUser.id}`;

    let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];

    const existing = wishlist.find(item => item.id === id);

    if (existing) {

        wishlist = wishlist.filter(item => item.id !== id);

        alert("Removed from Wishlist");

    } else {

        wishlist.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image
        });

        alert("Added to Wishlist");
    }

    localStorage.setItem(wishlistKey, JSON.stringify(wishlist));

    updateWishlistCount();
}

function updateWishlistCount() {

    const count = document.getElementById("wishlistCount");

    if (!count) return;

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {

        count.innerText = 0;

        return;
    }

    const wishlistKey = `wishlist_${currentUser.id}`;

    const wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];

    count.innerText = wishlist.length;
}





function updateNavbar() {

    const loginMenu = document.getElementById("loginMenu");

    if (!loginMenu) return;

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {

        loginMenu.innerHTML = `
            <a class="nav-link dropdown-toggle"
               href="#"
               role="button"
               data-bs-toggle="dropdown">

                👤 ${currentUser.name}

            </a>

            <ul class="dropdown-menu dropdown-menu-end">

               

                <li>
                    <a class="dropdown-item" href="orders.html">
                        My Orders
                    </a>
                </li>

                <li><hr class="dropdown-divider"></li>

                <li>
                    <a class="dropdown-item text-danger"
                       href="#"
                       onclick="logout()">
                        Logout
                    </a>
                </li>

            </ul>
        `;

    } else {

        loginMenu.innerHTML = `
            <a class="nav-link" href="login.html">
                Login
            </a>
        `;
    }
}
function logout() {

    localStorage.removeItem("currentUser");

    alert("Logged out successfully.");

    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
    updateNavbar();
    updateCartCount();
    updateWishlistCount();
});