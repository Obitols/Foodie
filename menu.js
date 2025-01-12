let foodMenu = [];

async function loadFoodMenu() {
    const response = await fetch('http://localhost:3000/api/food_menu');
    foodMenu = await response.json();
    displayMenu(foodMenu);
}

function displayMenu(items) {
    const productsContainer = document.querySelector(".itemgroup");
    productsContainer.innerHTML = items.map(item => `
                <div class="orderitem">
                    <div class="rot"></div>
                    <img src="${item.image}" alt="${item.name}" class="image">
                    <h4>${item.name}</h4>
                    <h6>${item.title}</h6>
                    <div class="rr">
                        <div>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star-half'></i>
                            <i class='bx bx-star'></i>
                        </div>
                        <h6>(${item.review} Reviews)</h6>
                    </div>
                    <div class="ac">
                        <h3>$${item.price}</h3>
                        <button class="addtc" onclick="showcart(this)">Add To Cart</button>
                        <div class="addbtn" style="display:none;">
                            <div class="noi">
                                <button onclick="updateQuantity(this, -1)">-</button>
                                <h5 style="margin: auto;">1</h5>
                                <button onclick="updateQuantity(this, 1)">+</button>
                            </div>
                             <button class="Cart" onclick="addToCart(this);">Cart</button>
                        </div>
                    </div>
            </div>`
    ).join("");
}

function filterMenu(type) {
    const buttons = document.querySelectorAll('.choicebtn button');
    if (type === 'all') {
        const names = foodMenu.filter(item => item.meal_type === type);
        buttons.forEach((button, index) => {
            button.innerHTML = `<i class="${names[index].cname}"></i>${names[index].btname}`;
            button.setAttribute('onclick', `filterByCategory('${names[index].category.toLowerCase()}')`);
        });
        displayMenu(foodMenu);
    }
    else {
        const names = foodMenu.filter(item => item.meal_type === type);
        buttons.forEach((button, index) => {
            button.innerHTML = `<i class="${names[index].cname}"></i>${names[index].btname}`;
            button.setAttribute('onclick', `filterByCategory('${names[index].category.toLowerCase()}')`);
        });
        displayMenu(names);
    }
}

const filterByCategory = (category) => {
    const filteredData = foodMenu.filter(item => item.category === category);
    displayMenu(filteredData);
};

function toggleheight() {
    const explore = document.getElementById("page3");
    explore.style.height = explore.style.height === "140vh" ? "max-content" : "140vh";
}
loadFoodMenu();


