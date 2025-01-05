document.querySelector('.find').addEventListener('keyup', (e) => {
    const searchdata = e.target.value.trim().toLowerCase();
    const container = document.getElementById("searchitems");
    if (searchdata !== "") {
        const filterdata = [...products.breakfast, ...products.dinner, ...products.lunch, ...products.dessert, ...products.beverage].filter((item) =>
            item.name.toLowerCase().includes(searchdata)
        );
        filterdata.length > 0 ? displayItem(filterdata) : container.innerHTML=`<p style="text-align:center";>No Result found</p>`;
        
    }
    else {
        container.style.display = "none";
        document.querySelector("main").style.display = "block";
    }

});

// Function to display items
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
let count=0;
function displayQuantity () {
    document.getElementById("count").innerText = ++count;
}

// Fetch the JSON file and initialize the products data
fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data; // Assign fetched data to the products variable
   })
    .catch(error => console.error('Error fetching the product data:', error));
