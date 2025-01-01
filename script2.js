let currentMenu = 'all';
let products = {}; // Will hold the fetched data
const productsContainer = document.querySelector(".itemgroup");
const renderProducts = (data) => {
    productsContainer.innerHTML =
    data.map(item => 
         `   <div class="orderitem">
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
                                <button class="sub" onclick="updateQuantity(this, -1)">-</button>
                                <h5 style="margin: auto;">1</h5>
                                <button class="add" onclick="updateQuantity(this, 1)">+</button>
                            </div>
                             <button class="Cart" onclick="displayQuantity(this)">Cart</button>
                        </div>
                    </div>
            </div>`
    ).join("");
};

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

const filterProducts = (type) => {
    try {
    if (type === 'all') {
        
        renderProducts([...products.breakfast, ...products.dinner, ...products.lunch, ...products.dessert, ...products.beverage]);
    } else {
        
        renderProducts([...products[type]]);
    }
}
catch (error) {
        console.error('Error filtering products:', error);
    }
};

const filterByCategory = (category) => {
    try{
    const filteredData = products[currentMenu].filter(item => item.btname === category);
    renderProducts(filteredData);
    }
    catch (error) {
        console.error('Error filtering products:', error);
    }
};

const changeMenu = (type) => {
    currentMenu = type; 
    const names = products[currentMenu]; 
    const buttons = document.querySelectorAll('.choicebtn button');
    buttons.forEach((button, index) => { 
        button.innerHTML = `<i class="${names[index].cname}"></i>${names[index].btname}`;
        button.setAttribute('onclick', `filterByCategory('${names[index].btname.toLowerCase()}')`);
    });
};

document.querySelector('.find').addEventListener('keyup', (e) => {
    const searchdata = e.target.value.toLowerCase();
    const filterdata = [...products.breakfast, ...products.dinner, ...products.lunch, ...products.dessert, ...products.beverage].filter((item) => 
        item.price.toLowerCase().includes(searchdata)
    );
    displayItem(filterdata);
});

// Function to display items
const displayItem = (items) => {
    const container = document.querySelector(".itemgroup");
    container.innerHTML = items.map((item) => {
        const { name , title  , review  , price , image } = item;
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


// Fetch the JSON file and initialize the products data
fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data; // Assign fetched data to the products variable
        filterProducts('all'); // Render all products initially
    })
    .catch(error => console.error('Error fetching the product data:', error));
