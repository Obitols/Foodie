let foodMenu = [];
async function loadFoodMenu() {
    const response = await fetch('http://localhost:3000/food_menu');
    foodMenu = await response.json();
}

document.querySelector('.find').addEventListener('keyup', (e) => {
    const searchdata = e.target.value.trim().toLowerCase();
    const container = document.getElementById("searchitems");
    if (searchdata !== "") {
        const filterdata = foodMenu.filter((item) =>
            item.name.toLowerCase().includes(searchdata)
        );
        filterdata.length > 0 ? displayItem(filterdata) : container.innerHTML = `<p style="text-align:center";>No Result found</p>`;
    }
    else {
        container.style.display = "none";
        document.querySelector("main").style.display = "block";
    }
});

document.querySelector('.altfind').addEventListener('keyup', (e) => {
    const searchdata = e.target.value.trim().toLowerCase();
    const container = document.getElementById("searchitems");
    if (searchdata !== "") {
        const filterdata = foodMenu.filter((item) =>
            item.name.toLowerCase().includes(searchdata)
        );
        filterdata.length > 0 ? displayItem(filterdata) : container.innerHTML = `<p style="text-align:center";>No Result found</p>`;
    }
    else {
        container.style.display = "none";
        document.querySelector("main").style.display = "block";
    }
});


function login(){
    document.querySelector(".forgot").style.display="none";
    document.querySelector(".signup").style.display="none";
    document.querySelector('.login').style.display="flex";
}

function signin(){
     document.querySelector('.lsr').style.display="flex";
    document.querySelector('.login').style.display="none";
    document.querySelector(".forgot").style.display="none";
    document.querySelector(".signup").style.display="flex";
}
function forgot(){
    document.querySelector('.login').style.display="none";
    document.querySelector(".forgot").style.display="flex";
}

const displayItem = (items) => {
    document.querySelector("main").style.display = "none";
    const container = document.getElementById("searchitems");
    if (items.length > 0) {
        container.style.display = "grid";
        container.className = 'itemgroup';
        container.innerHTML = items.map((item) => {
            const { name, title, review, price, image } = item;
            return `
            <div class="orderitem">
                    <div class="rot"></div>
                    <img src='http://localhost:3000/food_menu/${item.id}' alt="${name}" class="image">
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
                             <button class="Cart" onclick="addToCart(${item.id}, '${item.name}', ${item.price},'${item.image}')">Cart</button>
                        </div>
                    </div>
            </div>`;
        }).join('');
    }
    else {
        document.querySelector("main").style.display = "block";
    }
};

function showcart(button) {
    const parent = button.closest(".ac");
    parent.querySelector(".addtc").style.display = "none";
    parent.querySelector(".addbtn").style.display = "grid";
}

function updateQuantity(button, value) {
    const quantityTag = button.closest(".noi").querySelector("h5");
    const quantity = Math.max(1, parseInt(quantityTag.textContent) + value);
    quantityTag.textContent = quantity;
}

async function fetchCart() {
    const response = await fetch('http://localhost:3000/cart');
    const items = await response.json();
    displayCart(items);
}

function displayCart(items) {
    const cartTableBody = document.getElementById('cartTableBody');
    const subtotalElement = document.querySelector('.total'); 
    const totalElement = document.querySelector('.total2');  
    const deliveryFee = 5;
     cartTableBody.innerHTML = items.map(item => {
        return `
            <tr>
                <td><img src="/images/bubble.png" alt="${item.name}" style="width:50px;height:50px;"></td>
                <td>${item.name}</td>
                <td>$${item.price}</td>
                <td>${item.quantity}</td>
                <td>$${item.total}</td>
                <td><span onclick="removeFromCart(${item.itemId})">X</span></td>
            </tr>
        `;
    }).join('');
    const subtotal = items.reduce((sum, item) => sum + Number(item.total), 0);
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    const finalTotal = subtotal + deliveryFee;
    totalElement.textContent = `$${finalTotal.toFixed(2)}`;
    localStorage.setItem('totalAmount', finalTotal.toFixed(2));
}

async function addToCart(itemId, name, price, image) {
    await fetch('http://localhost:3000/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, name, price, quantity: 1 ,image})
    });
    
    alert(`${name} added to cart`);
    fetchCart();
}

async function removeFromCart(itemId) {
    await fetch(`http://localhost:3000/cart/${itemId}`, {
        method: 'DELETE'
    });
    fetchCart();
}

if (window.location.pathname.includes('cart.html')) {
    fetchCart();
}


loadFoodMenu();

