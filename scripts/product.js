// ================================
// Product Listing Page
// ================================

const productsList = document.getElementById("productsList");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");
const ratingFilter = document.getElementById("ratingFilter");
const sortProducts = document.getElementById("sortProducts");
const clearFilter = document.getElementById("clearFilter");

let allProducts = [];

// ===================================
// Fetch Products
// ===================================

async function getProducts() {

    try {

        const response = await fetch("https://fakestoreapi.com/products");

        const products = await response.json();

        allProducts = products;

        displayProducts(allProducts);

        loadCategories(allProducts);

    } catch (error) {

        console.log(error);

    }

}

// ===================================
// Display Products
// ===================================

function displayProducts(products) {

    if (!productsList) return;

    productsList.innerHTML = "";

    if (products.length === 0) {

        productsList.innerHTML = `

        <div class="col-12">

            <div class="alert alert-warning text-center">

                <h4>No Products Found</h4>

            </div>

        </div>

        `;

        return;

    }

    products.forEach(product => {

        productsList.innerHTML += `

        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">

            <div class="card h-100 shadow-sm">

                <img
                    src="${product.image}"
                    class="card-img-top p-3"
                    style="height:220px;object-fit:contain;"
                >

                <div class="card-body d-flex flex-column">

                    <h6 class="card-title">

                        ${product.title.substring(0,40)}...

                    </h6>

                    <p class="text-muted">

                        ${product.category}

                    </p>

                    <h4 class="text-danger">

                        $${product.price}

                    </h4>

                    <p>

                        ⭐ ${product.rating.rate}

                    </p>

                    <div class="mt-auto d-grid gap-2">

                        <button
                            class="btn btn-buy"
                            onclick="viewProduct(${product.id})">

                            View Details

                        </button>

                        <button
                            class="btn btn-outline-danger"
                            onclick="toggleWishlist(${product.id})">

                            ❤️ Wishlist

                        </button>

                    </div>

                </div>

            </div>

        </div>

        `;

    });

    // Update wishlist hearts
    // loadWishlistHearts(products);

}
// ===============================
// Filter Products
// ===============================

function filterProducts() {

    let filteredProducts = [...allProducts];

    // Search
    if (searchInput && searchInput.value.trim() !== "") {

        const search = searchInput.value.toLowerCase();

        filteredProducts = filteredProducts.filter(product =>

            product.title.toLowerCase().includes(search)

        );

    }

    // Category
    if (categoryFilter && categoryFilter.value !== "all") {

        filteredProducts = filteredProducts.filter(product =>

            product.category === categoryFilter.value
       
        );
 console.log("Selected Category:", categoryFilter.value);
    }

    // Min Price
    if (minPrice && minPrice.value !== "") {

        filteredProducts = filteredProducts.filter(product =>

            product.price >= Number(minPrice.value)

        );

    }

    // Max Price
    if (maxPrice && maxPrice.value !== "") {

        filteredProducts = filteredProducts.filter(product =>

            product.price <= Number(maxPrice.value)

        );

    }

    // Rating
    if (ratingFilter && ratingFilter.value !== "") {

        filteredProducts = filteredProducts.filter(product =>

            product.rating.rate >= Number(ratingFilter.value)

        );

    }

    // Sort
    if (sortProducts) {

        switch (sortProducts.value) {

            case "priceAsc":

                filteredProducts.sort((a, b) => a.price - b.price);

                break;

            case "priceDesc":

                filteredProducts.sort((a, b) => b.price - a.price);

                break;

            case "ratingAsc":

                filteredProducts.sort((a, b) => a.rating.rate - b.rating.rate);

                break;

            case "ratingDesc":

                filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);

                break;

            case "newest":

                filteredProducts.sort((a, b) => b.id - a.id);

                break;

        }

    }

    displayProducts(filteredProducts);

}

// ===============================
// Event Listeners
// ===============================

if (searchInput) {

    searchInput.addEventListener("input", filterProducts);

}

if (categoryFilter) {

    categoryFilter.addEventListener("change", filterProducts);

}

if (minPrice) {

    minPrice.addEventListener("input", filterProducts);

}

if (maxPrice) {

    maxPrice.addEventListener("input", filterProducts);

}

if (ratingFilter) {

    ratingFilter.addEventListener("change", filterProducts);

}

if (sortProducts) {

    sortProducts.addEventListener("change", filterProducts);

}

// ===============================
// Clear Filters
// ===============================

if (clearFilter) {

    clearFilter.addEventListener("click", () => {

        if (searchInput) searchInput.value = "";

        if (categoryFilter) categoryFilter.value = "all";

        if (minPrice) minPrice.value = "";

        if (maxPrice) maxPrice.value = "";

        if (ratingFilter) ratingFilter.value = "";

        if (sortProducts) sortProducts.value = "";

        filterProducts();

    });

}
// ===============================
// Load Categories
// ===============================

function loadCategories(products) {

    if (!categoryFilter) return;

    const categories = [...new Set(products.map(product => product.category))];

    categoryFilter.innerHTML = `
        <option value="all">All Categories</option>
    `;

    categories.forEach(category => {

        categoryFilter.innerHTML += `
            <option value="${category}">
                ${category}
            </option>
        `;

    });

}

// ===============================
// View Product
// ===============================

function viewProduct(id) {

    window.location.href = `product_details.html?id=${id}`;

}

// ===============================
// Initialize Page
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    if (productsList) {

        getProducts();

    }

});