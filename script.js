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
                        <button class="addtc" onclick="showcart()">Add To Cart</button>
                        <div class="addbtn">
                            <div class="noi">
                                <button class="sub">-</button>
                                <h5 style="margin: auto;">1</h5>
                                <button class="add">+</button>
                            </div>
                            <button class="Cart">cart</button>
                        </div>
                    </div>
                </div>
        `).join("");
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

window.onload = () => displayProducts();

function showcart(){
    document.querySelector(".addtc").style.display = 'none';
    document.querySelector(".addbtn").style.display = 'grid';
}
