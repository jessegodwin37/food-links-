/* =========================================
   JG FOOD — APP JAVASCRIPT
========================================= */

const restaurants = [
    {
        name: "Burger District",
        category: "Burger",
        rating: "4.8",
        time: "15–25 min",
        delivery: "₦600"
    },

    {
        name: "Mama's Kitchen",
        category: "African",
        rating: "4.9",
        time: "20–30 min",
        delivery: "₦700"
    },

    {
        name: "La Pizza House",
        category: "Pizza",
        rating: "4.7",
        time: "25–35 min",
        delivery: "₦800"
    },

    {
        name: "Chop & Grill",
        category: "Chicken",
        rating: "4.9",
        time: "20–30 min",
        delivery: "₦650"
    }
];


/* =========================================
   SEARCH FOOD
========================================= */

function searchFood() {

    const searchInput =
        document.getElementById("searchInput");

    const searchValue =
        searchInput.value.trim().toLowerCase();


    if (searchValue === "") {

        showMessage(
            "Type a food or restaurant name."
        );

        return;
    }


    const results =
        restaurants.filter(function (restaurant) {

            return (
                restaurant.name
                    .toLowerCase()
                    .includes(searchValue)
                ||
                restaurant.category
                    .toLowerCase()
                    .includes(searchValue)
            );

        });


    if (results.length === 0) {

        showMessage(
            "No restaurants found for " +
            searchInput.value
        );

        return;
    }


    showMessage(
        results.length +
        " restaurant(s) found."
    );


    displayResults(results);
}


/* =========================================
   FILTER FOOD CATEGORY
========================================= */

function filterFood(category) {

    const results =
        restaurants.filter(function (restaurant) {

            return restaurant.category
                .toLowerCase()
                .includes(category.toLowerCase());

        });


    displayResults(results);


    showMessage(
        category + " restaurants"
    );
}


/* =========================================
   DISPLAY RESULTS
========================================= */

function displayResults(results) {

    const restaurantList =
        document.getElementById(
            "restaurantList"
        );


    if (!restaurantList) {
        return;
    }


    restaurantList.innerHTML = "";


    results.forEach(function (restaurant) {

        const card =
            document.createElement("article");


        card.className =
            "restaurant-card";


        card.innerHTML = `

            <div class="restaurant-image burger">
                🍽️
            </div>

            <div class="restaurant-info">

                <h3>
                    ${restaurant.name}
                </h3>

                <p>
                    ⭐ ${restaurant.rating}
                    · ${restaurant.time}
                    · ${restaurant.delivery} delivery
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

        `;


        card.addEventListener(
            "click",
            function () {

                openRestaurant(
                    restaurant
                );

            }
        );


        restaurantList.appendChild(card);

    });
}


/* =========================================
   OPEN RESTAURANT
========================================= */

function openRestaurant(restaurant) {

    showMessage(
        "Opening " +
        restaurant.name +
        "..."
    );

    /*
        Later this will open the
        restaurant's full menu.
    */
}


/* =========================================
   BOTTOM NAVIGATION
========================================= */

function showSection(section) {

    const buttons =
        document.querySelectorAll(
            ".bottom-nav button"
        );


    buttons.forEach(function (button) {

        button.classList.remove(
            "active"
        );

    });


    event.currentTarget.classList.add(
        "active"
    );


    showMessage(
        section +
        " section coming soon."
    );
}


/* =========================================
   MESSAGE / NOTIFICATION
========================================= */

function showMessage(message) {

    let notification =
        document.getElementById(
            "jgNotification"
        );


    if (!notification) {

        notification =
            document.createElement("div");

        notification.id =
            "jgNotification";


        notification.style.position =
            "fixed";

        notification.style.top =
            "20px";

        notification.style.left =
            "50%";

        notification.style.transform =
            "translateX(-50%)";


        notification.style.background =
            "#171914";

        notification.style.color =
            "#ffffff";

        notification.style.padding =
            "13px 20px";

        notification.style.borderRadius =
            "12px";

        notification.style.fontWeight =
            "700";

        notification.style.fontSize =
            "14px";

        notification.style.zIndex =
            "9999";

        notification.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.18)";


        document.body.appendChild(
            notification
        );
    }


    notification.textContent =
        message;


    clearTimeout(
        window.jgMessageTimer
    );


    window.jgMessageTimer =
        setTimeout(function () {

            notification.remove();

        }, 2500);
}


/* =========================================
   ACCOUNT BUTTON
========================================= */

const accountButton =
    document.querySelector(
        ".account-btn"
    );


if (accountButton) {

    accountButton.addEventListener(
        "click",
        function () {

            showMessage(
                "JG Food Account coming soon."
            );

        }
    );

}


/* =========================================
   SEARCH WITH ENTER KEY
========================================= */

const searchInput =
    document.getElementById(
        "searchInput"
    );


if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                searchFood();

            }

        }
    );

}


/* =========================================
   START APP
========================================= */

console.log(
    "JG Food successfully loaded."
);
