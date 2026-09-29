/* =========================================
   JG FOOD
   FULL APPLICATION JAVASCRIPT
========================================= */


/* =========================================
   RESTAURANT DATABASE
========================================= */

const restaurants = [

    {
        id: 1,
        name: "Burger District",
        category: "Burger",
        rating: 4.8,
        time: "15–25 min",
        delivery: 600,
        emoji: "🍔",
        type: "burger",
        description: "Premium burgers, crispy fries and refreshing drinks.",
        address: "Central Food Street",
        menu: [
            {
                id: 101,
                name: "Classic Beef Burger",
                description: "Juicy beef patty, lettuce, cheese and special sauce.",
                price: 4500,
                emoji: "🍔"
            },
            {
                id: 102,
                name: "Double Cheese Burger",
                description: "Two beef patties with double cheese and house sauce.",
                price: 6500,
                emoji: "🍔"
            },
            {
                id: 103,
                name: "Loaded Fries",
                description: "Crispy fries topped with cheese and grilled beef.",
                price: 3000,
                emoji: "🍟"
            }
        ]
    },

    {
        id: 2,
        name: "Mama's Kitchen",
        category: "African",
        rating: 4.9,
        time: "20–30 min",
        delivery: 700,
        emoji: "🍛",
        type: "african",
        description: "Authentic African meals prepared fresh every day.",
        address: "Market Road",
        menu: [
            {
                id: 201,
                name: "Jollof Rice & Chicken",
                description: "Party-style jollof rice served with grilled chicken.",
                price: 4500,
                emoji: "🍛"
            },
            {
                id: 202,
                name: "Egusi Soup",
                description: "Rich egusi soup served with your choice of swallow.",
                price: 5000,
                emoji: "🥘"
            },
            {
                id: 203,
                name: "Fried Rice & Chicken",
                description: "Vegetable fried rice with seasoned chicken.",
                price: 4800,
                emoji: "🍚"
            }
        ]
    },

    {
        id: 3,
        name: "La Pizza House",
        category: "Pizza",
        rating: 4.7,
        time: "25–35 min",
        delivery: 800,
        emoji: "🍕",
        type: "pizza",
        description: "Freshly baked pizzas with premium toppings.",
        address: "City Centre",
        menu: [
            {
                id: 301,
                name: "Pepperoni Pizza",
                description: "Classic pizza with mozzarella and pepperoni.",
                price: 7500,
                emoji: "🍕"
            },
            {
                id: 302,
                name: "Chicken Supreme",
                description: "Chicken, peppers, onions and mozzarella.",
                price: 8500,
                emoji: "🍕"
            },
            {
                id: 303,
                name: "Margherita Pizza",
                description: "Tomato, mozzarella, basil and olive oil.",
                price: 6500,
                emoji: "🍕"
            }
        ]
    },

    {
        id: 4,
        name: "Chop & Grill",
        category: "Chicken",
        rating: 4.9,
        time: "20–30 min",
        delivery: 650,
        emoji: "🍗",
        type: "chicken",
        description: "Grilled chicken, wings and delicious sides.",
        address: "Garden Avenue",
        menu: [
            {
                id: 401,
                name: "Grilled Chicken",
                description: "Tender grilled chicken with house seasoning.",
                price: 5000,
                emoji: "🍗"
            },
            {
                id: 402,
                name: "Chicken Wings",
                description: "Crispy wings with your choice of sauce.",
                price: 4200,
                emoji: "🍗"
            },
            {
                id: 403,
                name: "Chicken & Chips",
                description: "Crispy chicken served with golden fries.",
                price: 4500,
                emoji: "🍟"
            }
        ]
    },

    {
        id: 5,
        name: "Noodle Bowl",
        category: "Noodles",
        rating: 4.6,
        time: "20–30 min",
        delivery: 500,
        emoji: "🍜",
        type: "noodles",
        description: "Asian-inspired noodle bowls made fresh.",
        address: "Downtown",
        menu: [
            {
                id: 501,
                name: "Chicken Noodles",
                description: "Stir-fried noodles with chicken and vegetables.",
                price: 4000,
                emoji: "🍜"
            },
            {
                id: 502,
                name: "Spicy Noodles",
                description: "Spicy noodles with vegetables and special sauce.",
                price: 3500,
                emoji: "🍜"
            }
        ]
    },

    {
        id: 6,
        name: "Sweet Spot",
        category: "Dessert",
        rating: 4.8,
        time: "15–25 min",
        delivery: 450,
        emoji: "🍰",
        type: "dessert",
        description: "Cakes, ice cream and sweet treats.",
        address: "Palm Street",
        menu: [
            {
                id: 601,
                name: "Chocolate Cake",
                description: "Rich chocolate cake with creamy frosting.",
                price: 3000,
                emoji: "🍰"
            },
            {
                id: 602,
                name: "Ice Cream",
                description: "Creamy vanilla, chocolate and strawberry ice cream.",
                price: 2500,
                emoji: "🍨"
            }
        ]
    },

    {
        id: 7,
        name: "Fresh Sip",
        category: "Drinks",
        rating: 4.7,
        time: "10–20 min",
        delivery: 400,
        emoji: "🥤",
        type: "drinks",
        description: "Fresh juices, smoothies and cold drinks.",
        address: "Riverside",
        menu: [
            {
                id: 701,
                name: "Fresh Fruit Juice",
                description: "Freshly blended seasonal fruit juice.",
                price: 2000,
                emoji: "🧃"
            },
            {
                id: 702,
                name: "Strawberry Smoothie",
                description: "Creamy strawberry smoothie.",
                price: 2800,
                emoji: "🥤"
            }
        ]
    }

];


/* =========================================
   APP STATE
========================================= */

let cart = [];

let orders = [];

let favorites = [];

let selectedFood = null;

let selectedQuantity = 1;


/* =========================================
   LOCAL STORAGE
========================================= */

function loadSavedData() {

    try {

        cart =
            JSON.parse(
                localStorage.getItem("jgFoodCart")
            ) || [];

        orders =
            JSON.parse(
                localStorage.getItem("jgFoodOrders")
            ) || [];

        favorites =
            JSON.parse(
                localStorage.getItem("jgFoodFavorites")
            ) || [];

    } catch (error) {

        cart = [];

        orders = [];

        favorites = [];

    }

}


function saveData() {

    localStorage.setItem(
        "jgFoodCart",
        JSON.stringify(cart)
    );

    localStorage.setItem(
        "jgFoodOrders",
        JSON.stringify(orders)
    );

    localStorage.setItem(
        "jgFoodFavorites",
        JSON.stringify(favorites)
    );

}


/* =========================================
   CURRENCY
========================================= */

function money(amount) {

    return "₦" +
        Number(amount).toLocaleString(
            "en-NG"
        );

}


/* =========================================
   DISPLAY RESTAURANTS
========================================= */

function displayRestaurants(list) {

    const container =
        document.getElementById(
            "restaurantList"
        );


    if (!container) return;


    if (list.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <div>🔎</div>

                <h3>
                    No restaurants found
                </h3>

                <p>
                    Try another search.
                </p>

            </div>

        `;

        return;
    }


    container.innerHTML =
        list.map(
            restaurant => {

                const isFavorite =
                    favorites.includes(
                        restaurant.id
                    );


                return `

                    <article
                        class="restaurant-card"
                        onclick="openRestaurant(${restaurant.id})"
                    >

                        <div
                            class="restaurant-image ${restaurant.type}"
                        >

                            ${restaurant.emoji}

                            <button
                                class="favorite-btn"
                                onclick="toggleFavorite(event, ${restaurant.id})"
                            >
                                ${isFavorite ? "❤️" : "♡"}
                            </button>

                        </div>

                        <div class="restaurant-info">

                            <h3>
                                ${restaurant.name}
                            </h3>

                            <p>
                                ⭐ ${restaurant.rating}
                                · ${restaurant.time}
                                · ${money(restaurant.delivery)} delivery
                            </p>

                            <div class="tags">

                                <span>
                                    ${restaurant.category}
                                </span>

                                <span>
                                    Open
                                </span>

                            </div>

                        </div>

                    </article>

                `;

            }
        )
        .join("");

}


/* =========================================
   POPULAR FOOD
========================================= */

function displayPopularFood() {

    const container =
        document.getElementById(
            "popularFoodList"
        );


    if (!container) return;


    const popular = [

        {
            ...restaurants[0].menu[0],
            restaurant:
                restaurants[0].name
        },

        {
            ...restaurants[1].menu[0],
            restaurant:
                restaurants[1].name
        },

        {
            ...restaurants[2].menu[0],
            restaurant:
                restaurants[2].name
        },

        {
            ...restaurants[3].menu[0],
            restaurant:
                restaurants[3].name
        }

    ];


    container.innerHTML =
        popular.map(
            food => `

                <article
                    class="food-card"
                    onclick="openFoodById(${food.id})"
                >

                    <div class="food-image">
                        ${food.emoji}
                    </div>

                    <div class="food-info">

                        <h3>
                            ${food.name}
                        </h3>

                        <p>
                            ${food.restaurant}
                        </p>

                        <div class="food-bottom">

                            <span class="food-price">
                                ${money(food.price)}
                            </span>

                            <button
                                class="add-btn"
                                onclick="addFoodFromPopular(event, ${food.id})"
                            >
                                +
                            </button>

                        </div>

                    </div>

                </article>

            `
        )
        .join("");

}


/* =========================================
   SEARCH
========================================= */

function searchFood() {

    const input =
        document.getElementById(
            "searchInput"
        );


    const value =
        input.value
            .trim()
            .toLowerCase();


    if (!value) {

        displayRestaurants(
            restaurants
        );

        showMessage(
            "Showing all restaurants."
        );

        return;
    }


    const restaurantResults =
        restaurants.filter(
            restaurant =>

                restaurant.name
                    .toLowerCase()
                    .includes(value)

                ||

                restaurant.category
                    .toLowerCase()
                    .includes(value)

                ||

                restaurant.description
                    .toLowerCase()
                    .includes(value)

        );


    displayRestaurants(
        restaurantResults
    );


    scrollToSection(
        "restaurantsSection"
    );


    showMessage(
        restaurantResults.length +
        " restaurant(s) found."
    );

}


/* =========================================
   LARGE SEARCH
========================================= */

function openSearch() {

    document
        .getElementById(
            "searchOverlay"
        )
        .classList.add("show");


    setTimeout(
        function () {

            document
                .getElementById(
                    "largeSearchInput"
                )
                ?.focus();

        },
        100
    );

}


function closeSearch() {

    document
        .getElementById(
            "searchOverlay"
        )
        .classList.remove("show");

}


function performLargeSearch() {

    const input =
        document.getElementById(
            "largeSearchInput"
        );


    const mainInput =
        document.getElementById(
            "searchInput"
        );


    mainInput.value =
        input.value;


    closeSearch();

    searchFood();

}


function quickSearch(value) {

    document
        .getElementById(
            "largeSearchInput"
        )
        .value = value;

    performLargeSearch();

}


/* =========================================
   ENTER SEARCH
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key ===
            "Enter"
        ) {

            const active =
                document.activeElement;


            if (
                active &&
                active.id ===
                "searchInput"
            ) {

                searchFood();

            }

            if (
                active &&
                active.id ===
                "largeSearchInput"
            ) {

                performLargeSearch();

            }

        }


        if (
            event.key ===
            "Escape"
        ) {

            closeSearch();

        }

    }
);


/* =========================================
   CATEGORY FILTER
========================================= */

function filterFood(category) {

    const results =
        restaurants.filter(
            restaurant =>
                restaurant.category
                    .toLowerCase() ===
                category.toLowerCase()
        );


    displayRestaurants(
        results
    );


    scrollToSection(
        "restaurantsSection"
    );


    showMessage(
        category +
        " restaurants"
    );

}


/* =========================================
   SHOW ALL
========================================= */

function showAllRestaurants() {

    displayRestaurants(
        restaurants
    );

    scrollToSection(
        "restaurantsSection"
    );

    showMessage(
        "Showing all restaurants."
    );

}


/* =========================================
   RESTAURANT PROFILE
========================================= */

function openRestaurant(id) {

    const restaurant =
        restaurants.find(
            item =>
                item.id === id
        );


    if (!restaurant) return;


    const details =
        document.getElementById(
            "restaurantDetails"
        );


    details.innerHTML = `

        <div
            class="detail-hero ${restaurant.type}"
        >
            ${restaurant.emoji}
        </div>

        <div class="detail-header">

            <div>

                <p class="small-label">
                    ${restaurant.category.toUpperCase()}
                </p>

                <h2>
                    ${restaurant.name}
                </h2>

                <p class="detail-meta">
                    ⭐ ${restaurant.rating}
                    · ${restaurant.time}
                    · ${money(restaurant.delivery)} delivery
                    <br>
                    📍 ${restaurant.address}
                </p>

            </div>

        </div>

        <p class="modal-description">
            ${restaurant.description}
        </p>

        <h3>
            Menu
        </h3>

        <div class="menu-list">

            ${restaurant.menu.map(
                food => `

                    <div class="menu-item">

                        <div class="menu-emoji">
                            ${food.emoji}
                        </div>

                        <div class="menu-item-content">

                            <h4>
                                ${food.name}
                            </h4>

                            <p>
                                ${food.description}
                            </p>

                        </div>

                        <div>

                            <div class="menu-price">
                                ${money(food.price)}
                            </div>

                            <button
                                class="menu-add"
                                onclick="addToCart(${restaurant.id}, ${food.id})"
                            >
                                Add
                            </button>

                        </div>

                    </div>

                `
            ).join("")}

        </div>

    `;


    document
        .getElementById(
            "restaurantModal"
        )
        .classList.add("show");

}


function closeRestaurant() {

    document
        .getElementById(
            "restaurantModal"
        )
        .classList.remove("show");

}


/* =========================================
   FOOD DETAILS
========================================= */

function findFood(foodId) {

    for (
        const restaurant of restaurants
    ) {

        const food =
            restaurant.menu.find(
                item =>
                    item.id === foodId
            );


        if (food) {

            return {

                food,
                restaurant

            };

        }

    }


    return null;

}


function openFoodById(foodId) {

    const result =
        findFood(foodId);


    if (!result) return;


    selectedFood =
        result;


    selectedQuantity = 1;


    const details =
        document.getElementById(
            "foodDetails"
        );


    details.innerHTML = `

        <div class="food-detail">

            <div class="food-detail-image">
                ${result.food.emoji}
            </div>

            <p class="small-label">
                ${result.restaurant.name.toUpperCase()}
            </p>

            <h2>
                ${result.food.name}
            </h2>

            <strong>
                ${money(result.food.price)}
            </strong>

            <p class="food-detail-description">
                ${result.food.description}
            </p>

            <div class="quantity-control">

                <button onclick="changeQuantity(-1)">
                    −
                </button>

                <strong id="foodQuantity">
                    1
                </strong>

                <button onclick="changeQuantity(1)">
                    +
                </button>

            </div>

            <button
                class="checkout-btn"
                onclick="addSelectedFoodToCart()"
            >
                Add to cart ·
                <span id="foodTotal">
                    ${money(result.food.price)}
                </span>
            </button>

        </div>

    `;


    document
        .getElementById(
            "foodModal"
        )
        .classList.add("show");

}


function closeFood() {

    document
        .getElementById(
            "foodModal"
        )
        .classList.remove("show");

}


function changeQuantity(amount) {

    selectedQuantity += amount;


    if (selectedQuantity < 1) {

        selectedQuantity = 1;

    }


    const quantity =
        document.getElementById(
            "foodQuantity"
        );


    const total =
        document.getElementById(
            "foodTotal"
        );


    if (quantity) {

        quantity.textContent =
            selectedQuantity;

    }


    if (total && selectedFood) {

        total.textContent =
            money(
                selectedFood.food.price *
                selectedQuantity
            );

    }

}


/* =========================================
   ADD TO CART
========================================= */

function addToCart(
    restaurantId,
    foodId,
    quantity = 1
) {

    const restaurant =
        restaurants.find(
            item =>
                item.id === restaurantId
        );


    if (!restaurant) return;


    const food =
        restaurant.menu.find(
            item =>
                item.id === foodId
        );


    if (!food) return;


    const existing =
        cart.find(
            item =>
                item.foodId === foodId
        );


    if (existing) {

        existing.quantity +=
            quantity;

    } else {

        cart.push({

            foodId: food.id,

            restaurantId:
                restaurant.id,

            name:
                food.name,

            restaurant:
                restaurant.name,

            price:
                food.price,

            emoji:
                food.emoji,

            quantity

        });

    }


    saveData();

    updateCart();

    showMessage(
        food.name +
        " added to cart."
    );

}


function addSelectedFoodToCart() {

    if (!selectedFood) return;


    addToCart(
        selectedFood.restaurant.id,
        selectedFood.food.id,
        selectedQuantity
    );


    closeFood();

}


function addFoodFromPopular(
    event,
    foodId
) {

    event.stopPropagation();


    const result =
        findFood(foodId);


    if (!result) return;


    addToCart(
        result.restaurant.id,
        result.food.id
    );

}


/* =========================================
   CART
========================================= */

function openCart() {

    updateCart();

    document
        .getElementById(
            "cartDrawer"
        )
        .classList.add("show");

    document
        .getElementById(
            "cartOverlay"
        )
        .classList.add("show");

}


function closeCart() {

    document
        .getElementById(
            "cartDrawer"
        )
        .classList.remove("show");

    document
        .getElementById(
            "cartOverlay"
        )
        .classList.remove("show");

}


function updateCart() {

    const items =
        document.getElementById(
            "cartItems"
        );


    const count =
        cart.reduce(
            (
                total,
                item
            ) =>
                total +
                item.quantity,
            0
        );


    document
        .getElementById(
            "cartCount"
        )
        .textContent = count;


    if (
        !items
    ) return;


    if (
        cart.length === 0
    ) {

        items.innerHTML = `

            <div class="empty-state">

                <div>
                    🛒
                </div>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add something delicious.
                </p>

            </div>

        `;

    } else {

        items.innerHTML =
            cart.map(
                item => `

                    <div class="cart-item">

                        <div class="cart-item-image">
                            ${item.emoji}
                        </div>

                        <div class="cart-item-content">

                            <h4>
                                ${item.name}
                            </h4>

                            <p>
                                ${item.restaurant}
                            </p>

                            <strong>
                                ${money(
                                    item.price *
                                    item.quantity
                                )}
                            </strong>

                            <div class="cart-controls">

                                <button
                                    onclick="changeCartQuantity(${item.foodId}, -1)"
                                >
                                    −
                                </button>

                                <span>
                                    ${item.quantity}
                                </span>

                                <button
                                    onclick="changeCartQuantity(${item.foodId}, 1)"
                                >
                                    +
                                </button>

                                <button
                                    onclick="removeFromCart(${item.foodId})"
                                >
                                    ×
                                </button>

                            </div>

                        </div>

                    </div>

                `
            ).join("");

    }


    const subtotal =
        cart.reduce(
            (
                total,
                item
            ) =>
                total +
                (
                    item.price *
                    item.quantity
                ),
            0
        );


    const delivery =
        cart.length > 0
            ? 700
            : 0;


    const total =
        subtotal +
        delivery;


    document
        .getElementById(
            "cartSubtotal"
        )
        .textContent =
        money(subtotal);


    document
        .getElementById(
            "cartDelivery"
        )
        .textContent =
        money(delivery);


    document
        .getElementById(
            "cartTotal"
        )
        .textContent =
        money(total);

}


function changeCartQuantity(
    foodId,
    amount
) {

    const item =
        cart.find(
            product =>
                product.foodId === foodId
        );


    if (!item) return;


    item.quantity += amount;


    if (
        item.quantity <= 0
    ) {

        cart =
            cart.filter(
                product =>
                    product.foodId !==
                    foodId
            );

    }


    saveData();

    updateCart();

}


function removeFromCart(
    foodId
) {

    cart =
        cart.filter(
            item =>
                item.foodId !==
                foodId
        );


    saveData();

    updateCart();

    showMessage(
        "Item removed from cart."
    );

}


/* =========================================
   CHECKOUT
========================================= */

function openCheckout() {

    if (
        cart.length === 0
    ) {

        showMessage(
            "Your cart is empty."
        );

        return;

    }


    const subtotal =
        cart.reduce(
            (
                total,
                item
            ) =>
                total +
                (
                    item.price *
                    item.quantity
                ),
            0
        );


    const total =
        subtotal +
        700;


    document
        .getElementById(
            "checkoutTotal"
        )
        .textContent =
        money(total);


    closeCart();


    document
        .getElementById(
            "checkoutModal"
        )
        .classList.add("show");

}


function closeCheckout() {

    document
        .getElementById(
            "checkoutModal"
        )
        .classList.remove("show");

}


function placeOrder(event) {

    event.preventDefault();


    if (
        cart.length === 0
    ) {

        showMessage(
            "Your cart is empty."
        );

        return;

    }


    const name =
        document
            .getElementById(
                "checkoutName"
            )
            .value
            .trim();


    const phone =
        document
            .getElementById(
                "checkoutPhone"
            )
            .value
            .trim();


    const address =
        document
            .getElementById(
                "checkoutAddress"
            )
            .value
            .trim();


    const payment =
        document
            .getElementById(
                "paymentMethod"
            )
            .value;


    const subtotal =
        cart.reduce(
            (
                total,
                item
            ) =>
                total +
                (
                    item.price *
                    item.quantity
                ),
            0
        );


    const total =
        subtotal +
        700;


    const order = {

        id:
            "JG" +
            Date.now(),

        name,

        phone,

        address,

        payment,

        items:
            [...cart],

        total,

        status:
            "Order received",

        date:
            new Date()
                .toLocaleString()

    };


    orders.unshift(
        order
    );


    cart = [];


    saveData();

    updateCart();


    document
        .getElementById(
            "checkoutForm"
        )
        .reset();


    closeCheckout();


    showMessage(
        "Order placed successfully!"
    );


    setTimeout(
        openOrders,
        500
    );

}


/* =========================================
   ORDERS
========================================= */

function openOrders() {

    closeAccount();

    closeCart();


    const container =
        document.getElementById(
            "ordersList"
        );


    if (
        orders.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-state">

                <div>
                    📦
                </div>

                <h3>
                    No orders yet
                </h3>

                <p>
                    Your orders will appear here.
                </p>

            </div>

        `;

    } else {

        container.innerHTML =
            orders.map(
                order => `

                    <div class="order-card">

                        <div class="order-top">

                            <strong>
                                ${order.id}
                            </strong>

                            <span class="order-status">
                                ${order.status}
                            </span>

                        </div>

                        <p>
                            ${order.items.length}
                            item(s)
                            ·
                            ${money(order.total)}
                        </p>

                        <p>
                            ${order.date}
                        </p>

                        <p>
                            📍 ${order.address}
                        </p>

                    </div>

                `
            ).join("");

    }


    document
        .getElementById(
            "ordersModal"
        )
        .classList.add("show");

}


function closeOrders() {

    document
        .getElementById(
            "ordersModal"
        )
        .classList.remove("show");

}


/* =========================================
   FAVORITES
========================================= */

function toggleFavorite(
    event,
    restaurantId
) {

    event.stopPropagation();


    if (
        favorites.includes(
            restaurantId
        )
    ) {

        favorites =
            favorites.filter(
                id =>
                    id !==
                    restaurantId
            );

        showMessage(
            "Removed from favorites."
        );

    } else {

        favorites.push(
            restaurantId
        );

        showMessage(
            "Added to favorites ❤️"
        );

    }


    saveData();

    displayRestaurants(
        restaurants
    );

}


/* =========================================
   ACCOUNT
========================================= */

function openAccount() {

    document
        .getElementById(
            "accountModal"
        )
        .classList.add("show");

}


function closeAccount() {

    document
        .getElementById(
            "accountModal"
        )
        .classList.remove("show");

}


/* =========================================
   LOCATION
========================================= */

function chooseLocation() {

    const location =
        prompt(
            "Enter your delivery location:"
        );


    if (
        location &&
        location.trim()
    ) {

        document
            .getElementById(
                "locationText"
            )
            .textContent =
            "📍 " +
            location.trim();


        localStorage.setItem(
            "jgFoodLocation",
            location.trim()
        );


        showMessage(
            "Delivery location updated."
        );

    }

}


function loadLocation() {

    const saved =
        localStorage.getItem(
            "jgFoodLocation"
        );


    if (saved) {

        document
            .getElementById(
                "locationText"
            )
            .textContent =
            "📍 " +
            saved;

    }

}


/* =========================================
   MOBILE MENU
========================================= */

function openMenu() {

    document
        .getElementById(
            "mobileMenu"
        )
        .classList.toggle(
            "show"
        );

}


function closeMenu() {

    document
        .getElementById(
            "mobileMenu"
        )
        .classList.remove(
            "show"
        );

}


/* =========================================
   NAVIGATION
========================================= */

function goHome() {

    closeMenu();

    closeSearch();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function scrollToSection(
    id
) {

    closeMenu();

    const element =
        document.getElementById(
            id
        );


    if (element) {

        element.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


/* =========================================
   DARK / LIGHT MODE
========================================= */

function toggleTheme() {

    document.body.classList.toggle(
        "dark-mode"
    );


    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );


    const button =
        document.getElementById(
            "themeToggle"
        );


    if (isDark) {

        button.textContent =
            "☀️";

        localStorage.setItem(
            "jgFoodTheme",
            "dark"
        );

    } else {

        button.textContent =
            "🌙";

        localStorage.setItem(
            "jgFoodTheme",
            "light"
        );

    }

}


function loadTheme() {

    const saved =
        localStorage.getItem(
            "jgFoodTheme"
        );


    const button =
        document.getElementById(
            "themeToggle"
        );


    if (
        saved ===
        "dark"
    ) {

        document.body.classList.add(
            "dark-mode"
        );

        button.textContent =
            "☀️";

    } else {

        button.textContent =
            "🌙";

    }

}


/* =========================================
   NOTIFICATION
========================================= */

let notificationTimer;


function showMessage(
    message
) {

    const notification =
        document.getElementById(
            "jgNotification"
        );


    notification.textContent =
        message;


    notification.classList.add(
        "show"
    );


    clearTimeout(
        notificationTimer
    );


    notificationTimer =
        setTimeout(
            function () {

                notification.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =========================================
   CLOSE MODALS WHEN CLICKING BACKDROP
========================================= */

document.addEventListener(
    "click",
    function (event) {

        const modals =
            document.querySelectorAll(
                ".modal"
            );


        modals.forEach(
            modal => {

                if (
                    event.target ===
                    modal
                ) {

                    modal.classList.remove(
                        "show"
                    );

                }

            }
        );

    }
);


/* =========================================
   START APP
========================================= */

function initializeApp() {

    loadSavedData();

    loadTheme();

    loadLocation();

    displayRestaurants(
        restaurants
    );

    displayPopularFood();

    updateCart();

    console.log(
        "JG Food successfully loaded."
    );

}


initializeApp();
