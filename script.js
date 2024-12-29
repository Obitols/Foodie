const products = [
    { name: "McDonaid Cheeseburger", title: "Hamburger Veggie burger", review: "68", category: "Bread", price: 3.5, image: "logo.jpg" },
    { name: "Cheeseburger", title: "Whapper Veggle burger", review: "77", category: "Sandwich", price: 6 , image: "logo.jpg" },
    { name: "Three patty burger", title: "Hamburger Veggie burger", review: "55", category: "Burger", price: 7.5, image: "logo.jpg" },
    { name: "Burger with lettuce", title: "Whapper Veggle burger", review: "57", category: "Pasta", price:2.5 , image: "logo.jpg" },
    { name: "Three partty", title: "Hamburger Veggie burger", review: "58", category: "Pizza", price: 8.5, image: "logo.jpg" },
    { name: "Brown hamburger", title: "Whapper Veggle burger", review: "75", category: "Bread", price: 3.5, image: "logo.jpg" },
    { name: "Hamburger", title: "Hamburger Veggie burger", review: "62", category: "Sandwich", price: 3.0, image: "logo.jpg" },
    { name: "Black hamburger", title: "Whapper Veggle burger", review: "64", category: "Burger", price: 3.5, image: "logo.jpg" }
];

const productsContainer = document.querySelector(".itemgroup");
// const searchInput = document.getElementById("search-input");

function displayProducts(filter = "SetMenu") {
    productsContainer.innerHTML = products
        .filter(p => filter === "SetMenu" || p.category === filter)
        .map(p => `
            <div class="orderitem">
                    <div class="rot"></div>
                    <img src="${p.image}" alt="${p.name}" class="image">
                    <h4>${p.name}</h4>
                    <h6>${p.title}</h6>
                    <div class="rr">
                        <div>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star-half'></i>
                            <i class='bx bx-star'></i>
                        </div>
                        <h6>(${p.review} Reviews)</h6>
                    </div>
                    <div class="ac">
                        <h3>$${p.price}</h3>
                        <button class="addtc" onclick="showcart(this)">Add To Cart</button>
                        <div class="addbtn" style="display:none;">
                            <div class="noi">
                                <button class="sub" onclick="updateQuantity(this, -1)">-</button>
                                <h5 style="margin: auto;">1</h5>
                                <button class="add" onclick="updateQuantity(this, 1)">+</button>
                            </div>
                             <button class="Cart" onclick="displayQuantity(this)">Cart</button>
                        </div>
                    </div>
                </div>
        `).join("");
}

function showcart(button){
    const parent = button.closest(".ac");
    parent.querySelector(".addtc").style.display = "none";
    parent.querySelector(".addbtn").style.display = "grid";
}

function updateQuantity(button, value) {
    const quantityTag = button.closest(".noi").querySelector("h5");
    const quantity = Math.max(1, parseInt(quantityTag.textContent) + value);
    quantityTag.textContent = quantity;
}

function displayQuantity(button) {
    const quantityTag = button.closest(".addbtn").querySelector("h5");
    const quantity = quantityTag.textContent;
    alert(`Quantity: ${quantity}`); // Display the quantity in an alert or handle it as needed
}

function filterProducts(category) {
    document.querySelectorAll(".choicebtn button").forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");
    displayProducts(category);
}

// document.getElementById("search-btn").addEventListener("click", () => {
//     const searchValue = searchInput.value.toLowerCase();
//     productsContainer.innerHTML = products
//         .filter(p => p.name.toLowerCase().includes(searchValue))
//         .map(p => `
//             <div class="card" style="display: block;">
//                 <img src="${p.image}" alt="${p.name}">
//                 <h5>${p.name}</h5>
//                 <p>$${p.price}</p>
//             </div>
//         `).join("");
// });


document.querySelector('.find').addEventListener('keyup', (e) => {
    const searchdata = e.target.value.toLowerCase();
    const filterdata = products.filter((item) => 
        item.name.toLowerCase().includes(searchdata)
    );
    displayItem(filterdata);
});

// Function to display items
const displayItem = (items) => {
    const container = document.querySelector(".itemgroup");
    container.innerHTML = items.map((item) => {
        const { name , title  , review , category , price , image } = item;
        return `
            <div class="orderitem">
                    <div class="rot"></div>
                    <img src="${image}" alt="${name}" class="image">
                    <h4>${name}</h4>
                    <h6>${title}</h6>
                    <div class="rr">
                        <div>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star-half'></i>
                            <i class='bx bx-star'></i>
                        </div>
                        <h6>(${review} Reviews)</h6>
                    </div>
                    <div class="ac">
                        <h3>$${price}</h3>
                        <button class="addtc" onclick="showcart(this)">Add To Cart</button>
                        <div class="addbtn" style="display:none;">
                            <div class="noi">
                                <button class="sub" onclick="updateQuantity(this, -1)">-</button>
                                <h5 style="margin: auto;">1</h5>
                                <button class="add" onclick="updateQuantity(this, 1)">+</button>
                            </div>
                             <button class="Cart" onclick="displayQuantity(this)">Cart</button>
                        </div>
                    </div>
            </div>`;
    }).join('');
};

window.onload = () => displayProducts();



                   
