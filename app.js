/* =========================================================
   JG FOOD — COMPLETE APP.JS
========================================================= */

"use strict";

/* =========================================================
   GLOBAL STATE
========================================================= */

const JG_FOOD = {
    cart: JSON.parse(localStorage.getItem("jgFoodCart") || "[]"),
    favorites: JSON.parse(localStorage.getItem("jgFoodFavorites") || "[]"),
    theme: localStorage.getItem("jgFoodTheme") || "light"
};


/* =========================================================
   BASIC HELPERS
========================================================= */

function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

function saveCart() {
    localStorage.setItem(
        "jgFoodCart",
        JSON.stringify(JG_FOOD.cart)
    );
}

function saveFavorites() {
    localStorage.setItem(
        "jgFoodFavorites",
        JSON.stringify(JG_FOOD.favorites)
    );
}

function formatMoney(amount) {
    return "₦" + Number(amount || 0).toLocaleString("en-NG");
}


/* =========================================================
   THEME
========================================================= */

function applyTheme() {
    document.body.classList.toggle(
        "dark-mode",
        JG_FOOD.theme === "dark"
    );

    const themeButton =
        document.getElementById("themeToggle");

    if (themeButton) {
        themeButton.textContent =
            JG_FOOD.theme === "dark"
                ? "☀️"
                : "🌙";

        themeButton.setAttribute(
            "aria-label",
            JG_FOOD.theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
        );

        themeButton.setAttribute(
            "title",
            JG_FOOD.theme === "dark"
                ? "Light mode"
                : "Dark mode"
        );
    }
}

function toggleTheme() {
    JG_FOOD.theme =
        JG_FOOD.theme === "dark"
            ? "light"
            : "dark";

    localStorage.setItem(
        "jgFoodTheme",
        JG_FOOD.theme
    );

    applyTheme();
}


/* =========================================================
   MOBILE MENU
========================================================= */

function toggleMobileMenu() {
    const menu = $(".mobile-menu");

    if (!menu) return;

    menu.classList.toggle("open");
}

function closeMobileMenu() {
    const menu = $(".mobile-menu");

    if (menu) {
        menu.classList.remove("open");
    }
}


/* =========================================================
   CART
========================================================= */

function addToCart(
    id,
    name,
    price,
    image = "🍔",
    restaurant = "JG FOOD"
) {
    const existing =
        JG_FOOD.cart.find(
            item => String(item.id) === String(id)
        );

    if (existing) {
        existing.quantity += 1;
    } else {
        JG_FOOD.cart.push({
            id,
            name,
            price: Number(price),
            image,
            restaurant,
            quantity: 1
        });
    }

    saveCart();

    updateCartUI();

    showNotification(
        "Added to cart",
        `${name} has been added to your cart.`
    );
}


function removeFromCart(id) {
    JG_FOOD.cart =
        JG_FOOD.cart.filter(
            item => String(item.id) !== String(id)
        );

    saveCart();

    updateCartUI();
}


function changeQuantity(id, change) {
    const item =
        JG_FOOD.cart.find(
            product =>
                String(product.id) === String(id)
        );

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(id);
        return;
    }

    saveCart();

    updateCartUI();
}


function getCartCount() {
    return JG_FOOD.cart.reduce(
        (total, item) =>
            total + Number(item.quantity || 0),
        0
    );
}


function getCartSubtotal() {
    return JG_FOOD.cart.reduce(
        (total, item) =>
            total +
            Number(item.price || 0) *
            Number(item.quantity || 0),
        0
    );
}


function updateCartUI() {
    const count = getCartCount();
    const subtotal = getCartSubtotal();

    /* Header count */

    $$(".cart-count").forEach(element => {
        element.textContent = count;
        element.style.display =
            count > 0 ? "grid" : "none";
    });


    /* Bottom navigation count */

    const bottomCount =
        $(".bottom-cart b");

    if (bottomCount) {
        bottomCount.textContent = count;
        bottomCount.style.display =
            count > 0 ? "grid" : "none";
    }


    /* Cart items */

    const container =
        $(".cart-items");

    if (!container) return;

    if (JG_FOOD.cart.length === 0) {

        container.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>

                <h3>Your cart is empty</h3>

                <p>
                    Add delicious meals and they
                    will appear here.
                </p>
            </div>
        `;

    } else {

        container.innerHTML =
            JG
