
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
        displayCart();
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
        displayCart();
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
                             <button class="Cart" onclick="addToCart(this);">Cart</button>
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

function addToCart(button) {
    const itemContainer = button.closest('.orderitem');
    const item = {
        image: itemContainer.querySelector('.image').src,
        name: itemContainer.querySelector('h4').innerText,
        title: itemContainer.querySelector('h6').innerText,
        price: parseFloat(itemContainer.querySelector('h3').innerText.replace('$', '')),
        quantity: parseInt(itemContainer.querySelector('.noi h5').innerText)
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(cartItem => cartItem.name === item.name);

    if (existingItem) {
        existingItem.quantity += item.quantity;
    } else {
        cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${item.name} added to cart!`);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('count').innerText = cart.reduce((total, item) => total + item.quantity, 0);
}

function displayCart() {
    const cartTableBody = document.getElementById('cartTableBody');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalprice = 0;
    let delivery = 5;
    cartTableBody.innerHTML = cart.map((item, index) =>{
        const itemtotal = item.price * item.quantity;
        totalprice += itemtotal;
        return `
        <tr>
            <td><img src="${item.image}" alt="${item.name}" style="width:50px;height:50px;"></td>
            <td>${item.name}</td>
            <td>${item.title}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>$${(itemtotal).toFixed(2)}</td>
            <td><b onclick="removeItem(${index})">X</b></td>
        </tr>
    `;}).join('');
    localStorage.setItem('semitotal',totalprice.toFixed(2));
    localStorage.setItem('total',(totalprice+ delivery).toFixed(2));
    document.getElementById('semitotal').textContent = "$" + localStorage.getItem('semitotal');
    document.getElementById('total').textContent = "$" + localStorage.getItem('total');
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

if (window.location.pathname.includes('cart.html')) {
    displayCart();
    updateCartCount();
}
else if(window.location.pathname.includes('delivery.html')){
    updateCartCount();
    document.getElementById('semitotal').textContent = "$" + localStorage.getItem('semitotal');
    document.getElementById('total').textContent = "$" + localStorage.getItem('total');
}
else{
    updateCartCount();
}

loadFoodMenu();
