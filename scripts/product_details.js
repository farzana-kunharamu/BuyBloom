
  // ==========================================
// Product Details
// ==========================================

const productDetails = document.getElementById("productDetails");

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

// ==========================================
// Get Product
// ==========================================

async function getProduct() {

    try {

        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);

        const product = await response.json();

        displayProduct(product);


    }

    catch (error) {

        console.log(error);

    }

}

// ==========================================
// Display Product
// ==========================================

function displayProduct(product) {

    productDetails.innerHTML = `

    <div class="col-md-6 text-center">

        <img
            src="${product.image}"
            class="img-fluid"
            style="height:400px;object-fit:contain;"
        >

    </div>

    <div class="col-md-6">

        <h2>${product.title}</h2>

        <p class="text-muted text-capitalize">

            ${product.category}

        </p>

        <h3 class="text-danger">

            $${product.price}

        </h3>

        <p>

            ⭐ ${product.rating.rate}

            (${product.rating.count} Reviews)

        </p>

        <p>

            ${product.description}

        </p>

        <div class="d-flex gap-2 mt-4">

            <button
                class="btn btn-buy"
                onclick="addToCart(${product.id})">

                Add To Cart

            </button>

            <button
                class="btn btn-outline-danger"
                onclick="toggleWishlist(${product.id})">

                ❤️ Wishlist

            </button>

        </div>

        <hr>

        <div id="reviewSection"></div>

        <div id="reviewsList"></div>

    </div>

    `;

 loadReviewForm(product.id);

loadReviews(product.id);

}
// ==========================================
// Review Form
// ==========================================

function loadReviewForm(productId) {

    const reviewSection = document.getElementById("reviewSection");

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {

        reviewSection.innerHTML = `

            <div class="alert alert-warning">

                Please login to submit a review.

            </div>

        `;

        return;

    }

    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    const alreadyReviewed = reviews.find(review =>

        review.userId === currentUser.id &&
        review.productId == productId

    );

    if (alreadyReviewed) {

        reviewSection.innerHTML = `

            <div class="alert alert-success">

                You have already reviewed this product.

            </div>

        `;

        return;

    }

    reviewSection.innerHTML = `

        <h4 class="mt-4">Write a Review</h4>

        <form id="reviewForm">

            <div class="mb-3">

                <label class="form-label">

                    Rating

                </label>

                <select
                    id="rating"
                    class="form-select"
                    required>

                    <option value="">Select Rating</option>
                    <option value="5">⭐⭐⭐⭐⭐</option>
                    <option value="4">⭐⭐⭐⭐</option>
                    <option value="3">⭐⭐⭐</option>
                    <option value="2">⭐⭐</option>
                    <option value="1">⭐</option>

                </select>

            </div>

            <div class="mb-3">

                <textarea
                    id="reviewText"
                    class="form-control"
                    rows="4"
                    placeholder="Write your review..."
                    required>

                </textarea>

            </div>

            <button
                class="btn btn-buy"
                type="submit">

                Submit Review

            </button>

        </form>

    `;

    document
        .getElementById("reviewForm")
        .addEventListener("submit", submitReview);

}

// ==========================================
// Submit Review
// ==========================================

function submitReview(e) {

    e.preventDefault();

    const productId = Number(new URLSearchParams(window.location.search).get("id"));

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    reviews.push({

        productId: productId,

        userId: currentUser.id,

        userName: currentUser.name,

        rating: Number(document.getElementById("rating").value),

        review: document.getElementById("reviewText").value,

        date: new Date().toLocaleDateString()

    });

    localStorage.setItem("reviews", JSON.stringify(reviews));

    alert("Review Submitted Successfully!");

    loadReviews(productId);

    loadReviewForm(productId);

}
// ==========================================
// Display Reviews
// ==========================================

function loadReviews(productId) {

    const reviewsList = document.getElementById("reviewsList");

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    reviews = reviews.filter(review => review.productId == productId);

    if (reviews.length === 0) {

        reviewsList.innerHTML = `

            <div class="mt-4">

                <h4>Customer Reviews</h4>

                <div class="alert alert-info">

                    No Reviews Yet.

                </div>

            </div>

        `;

        return;

    }

    reviewsList.innerHTML = "<h4 class='mt-4'>Customer Reviews</h4>";

    reviews.forEach(review => {

        reviewsList.innerHTML += `

            <div class="card mt-3 shadow-sm">

                <div class="card-body">

                    <h6>

                        👤 ${review.userName}

                    </h6>

                    <p>

                        ${"⭐".repeat(review.rating)}

                    </p>

                    <p>

                        ${review.review}

                    </p>

                    <small class="text-muted">

                        ${review.date}

                    </small>

                </div>

            </div>

        `;

    });

}

// ==========================================
// Add To Cart
// ==========================================

async function addToCart(id) {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {

        alert("Please login first.");

        window.location.href = "login.html";

        return;

    }

    const response = await fetch(`https://fakestoreapi.com/products/${id}`);

    const product = await response.json();

    const cartKey = `cart_${currentUser.id}`;

    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const existing = cart.find(item => item.id === id);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1

        });

    }

    localStorage.setItem(cartKey, JSON.stringify(cart));

    updateCartCount();

    alert("Product Added To Cart!");

}

// ==========================================
// Initialize
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    if (productDetails && productId) {

        getProduct();

    }

});