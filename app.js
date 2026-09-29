/* =========================================================
   JG FOOD — MAIN APP.JS
   Complete frontend controller
========================================================= */

"use strict";

/* =========================================================
   HELPERS
========================================================= */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0
    }).format(Number(amount) || 0);


/* =========================================================
   APP STATE
========================================================= */

let cart = JSON.parse(localStorage.getItem("jgFoodCart") || "[]");

let favorites = JSON.parse(
    localStorage.getItem("jgFoodFavorites") || "[]"
);


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    loadTheme();
    initializeMenu();
    initializeSearch();
    initializeCart();
    initializeFoodCards();
    initializeFavorites();
    initializeRestaurants();
    initializeCategories();
    initializeModals();
    initializeNotifications();
    initializeBottomNavigation();
    initializeAssistant();
    updateCartUI();

});


/* =========================================================
   THEME
========================================================= */

function loadTheme() {

    const savedTheme =
        localStorage.getItem("jgFoodTheme");

    const isDark =
        savedTheme === "dark";

    document.body.classList.toggle(
        "dark-mode",
        isDark
    );

    updateThemeButton(isDark);
}


function toggleTheme() {

    const isDark =
        document.body.classList.toggle("dark-mode");

    localStorage.setItem(
        "jgFoodTheme",
        isDark ? "dark" : "light"
    );

    updateThemeButton(isDark);
}


function updateThemeButton(isDark) {

    const button =
        $("#themeToggle");

    if (!button) return;

    button.textContent =
        isDark ? "☀️" : "🌙";

    button.setAttribute(
        "aria-label",
        isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
    );

    button.setAttribute(
        "title",
        isDark
            ? "Light mode"
            : "Dark mode"
    );
}


const themeButton =
    $("#themeToggle");

if (themeButton) {

    themeButton.addEventListener(
        "click",
        toggleTheme
    );

}


/* =========================================================
   MOBILE MENU
========================================================= */

function initializeMenu() {

    const menuButton =
        $("#menuBtn");

    const mobileMenu =
        $("#mobileMenu");

    if (!menuButton || !mobileMenu)
        return;

    menuButton.addEventListener(
        "click",
        () => {

            const isOpen =
                mobileMenu.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuButton.textContent =
                isOpen ? "×" : "☰";

        }
    );

    $$(".mobile-menu a").forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileMenu.classList.remove(
                    "open"
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.textContent = "☰";

            }
        );

    });

}


/* =========================================================
   SEARCH
========================================================= */

function initializeSearch() {

    const searchInput =
        $("#searchInput");

    const searchButton =
        $("#searchBtn");

    const searchOverlay =
        $("#searchOverlay");

    const globalSearch =
        $("#globalSearch");

    const closeSearch =
        $("#closeSearch");

    if (searchButton) {

        searchButton.addEventListener(
            "click",
            () => {

                const value =
                    searchInput?.value.trim();

                openSearch(value);

            }
        );

    }

    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {

                    event.preventDefault();

                    openSearch(
                        searchInput.value.trim()
                    );

                }

            }
        );

    }

    if (closeSearch) {

        closeSearch.addEventListener(
            "click",
            closeSearchOverlay
        );

    }

    if (searchOverlay) {

        searchOverlay.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    searchOverlay
                ) {
                    closeSearchOverlay();
                }

            }
        );

    }

    if (globalSearch) {

        globalSearch.addEventListener(
            "input",
            () => {

                displaySearchResults(
                    globalSearch.value
                );

            }
        );

    }

}


function openSearch(value = "") {

    const overlay =
        $("#searchOverlay");

    const input =
        $("#globalSearch");

    if (!overlay)
        return;

    overlay.classList.add("active");

    overlay.setAttribute(
        "aria-hidden",
        "false"
    );

    if (input) {

        input.value = value;

        displaySearchResults(value);

        setTimeout(
            () => input.focus(),
            100
        );

    }

    document.body.classList.add(
        "no-scroll"
    );

}


function closeSearchOverlay() {

    const overlay =
        $("#searchOverlay");

    if (!overlay)
        return;

    overlay.classList.remove(
        "active"
    );

    overlay.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "no-scroll"
    );

}


function displaySearchResults(query) {

    const container =
        $("#searchResults");

    if (!container)
        return;

    const cleanQuery =
        query.trim().toLowerCase();

    if (!cleanQuery) {

        container.innerHTML = `
            <div class="search-empty">
                <span>🔎</span>
                <p>Start typing to search.</p>
            </div>
        `;

        return;
    }

    const foods = $$(".food-card");

    const restaurants =
        $$(".restaurant-card");

    const matches = [];

    foods.forEach(card => {

        const name =
            card.dataset.foodName || "";

        const text =
            card.textContent.toLowerCase();

        if (
            name.toLowerCase().includes(cleanQuery) ||
            text.includes(cleanQuery)
        ) {

            matches.push({
                type: "Food",
                name,
                emoji:
                    card.querySelector(
                        ".food-image span"
                    )?.textContent || "🍽️"
            });

        }

    });

    restaurants.forEach(card => {

        const name =
            card.dataset.restaurant || "";

        const text =
            card.textContent.toLowerCase();

        if (
            name.toLowerCase().includes(cleanQuery) ||
            text.includes(cleanQuery)
        ) {

            matches.push({
                type: "Restaurant",
                name,
                emoji: "🏪"
            });

        }

    });

    if (!matches.length) {

        container.innerHTML = `
            <div class="search-empty">
                <span>😕</span>
                <h3>No results found</h3>
                <p>
                    Try another food or restaurant name.
                </p>
            </div>
        `;

        return;
    }

    container.innerHTML =
        matches.map(item => `
            <button
                type="button"
                class="search-result-item"
                data-result="${escapeHTML(item.name)}"
            >
                <span class="search-result-icon">
                    ${item.emoji}
                </span>

                <span>
                    <strong>
                        ${escapeHTML(item.name)}
                    </strong>

                    <small>
                        ${item.type}
                    </small>
                </span>

                <span>→</span>
            </button>
        `).join("");

    $$(".search-result-item", container)
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const name =
                        button.dataset.result;

                    closeSearchOverlay();

                    showNotification(
                        "Search",
                        `Opening ${name}`
                    );

                }
            );

        });

}


/* =========================================================
   FOOD CARDS
========================================================= */

function initializeFoodCards() {

    $$("[data-add-cart]").
