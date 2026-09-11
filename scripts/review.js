// ==========================================
// Load Review Form
// ==========================================
function loadReviewForm(productId) {

    const reviewSection = document.getElementById("reviewSection");

    if (!reviewSection) return;

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {

        reviewSection.innerHTML = `
            <div class="alert alert-warning">
                Please login to submit a review.
            </div>
        `;

        return;
    }

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
// to prevent duplicate review
    const alreadyReviewed = reviews.find(review =>
        review.userId === currentUser.id &&
        review.productId === Number(productId)
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
                    required></textarea>

            </div>

            <button
                type="submit"
                class="btn btn-danger">

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

    const productId = Number(
        new URLSearchParams(window.location.search).get("id")
    );

    const currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    let reviews =
        JSON.parse(localStorage.getItem("reviews")) || [];

    const exists = reviews.find(review =>
        review.userId === currentUser.id &&
        review.productId === productId
    );

    if (exists) {

        alert("You have already reviewed this product.");

        return;
    }

    reviews.push({

        productId: productId,

        userId: currentUser.id,

        userName: currentUser.name,

        rating: Number(document.getElementById("rating").value),

        review: document.getElementById("reviewText").value,

        date: new Date().toLocaleDateString()

    });

    localStorage.setItem(
        "reviews",
        JSON.stringify(reviews)
    );

    alert("Review Submitted Successfully!");

    loadReviews(productId);

    loadReviewForm(productId);

}



// ==========================================
// Display Reviews
// ==========================================
function loadReviews(productId) {

    const reviewsList =
        document.getElementById("reviewsList");

    if (!reviewsList) return;

    let reviews =
        JSON.parse(localStorage.getItem("reviews")) || [];

    reviews = reviews.filter(review =>
        review.productId === Number(productId)
    );

    if (reviews.length === 0) {

        reviewsList.innerHTML = `

            <h4 class="mt-4">
                Customer Reviews
            </h4>

            <div class="alert alert-info">

                No Reviews Yet.

            </div>

        `;

        return;
    }

    reviewsList.innerHTML = `
        <h4 class="mt-4">
            Customer Reviews
        </h4>
    `;

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