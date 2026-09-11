// =====================================
// Orders
// =====================================

const ordersContainer = document.getElementById("ordersContainer");

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {

    alert("Please login first.");

    window.location.href = "login.html";

}

const orderKey = `orders_${currentUser.id}`;

const orders = JSON.parse(localStorage.getItem(orderKey)) || [];

displayOrders();


// =====================================
// Display Orders
// =====================================

function displayOrders() {

    ordersContainer.innerHTML = "";

    if (orders.length === 0) {

        ordersContainer.innerHTML = `

        <div class="alert alert-warning text-center">

            <h4>No Orders Found</h4>

        </div>

        `;

        return;

    }

    // Latest order first
    orders.reverse().forEach(order => {

        let products = "";

        order.items.forEach(item => {

            products += `

            <li class="list-group-item d-flex justify-content-between">

                <span>

                    ${item.title}

                </span>

                <span>

                    Qty : ${item.quantity}

                </span>

            </li>

            `;

        });

        ordersContainer.innerHTML += `

        <div class="card shadow mb-4">

            <div class="card-header bg-danger text-white">

                <h5>

                    Order #${order.orderId}

                </h5>

            </div>

            <div class="card-body">

                <p>

                    <strong>Date :</strong>

                    ${order.date}

                </p>

                <p>

                    <strong>Name :</strong>

                    ${order.name}

                </p>
                <p>

                    <strong>Address :</strong>

                    ${order.address}

                </p>

                <p>

                    <strong>Status :</strong>

                    <span class="badge bg-success">

                        ${order.status}

                    </span>

                </p>

                <ul class="list-group mb-3">

                    ${products}

                </ul>

                <h4 class="text-danger">

                    Total : $${order.total.toFixed(2)}

                </h4>

            </div>

        </div>

        `;

    });

}