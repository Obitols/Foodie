document.querySelector('.find').addEventListener('keyup', (e) => {
    const searchdata = e.target.value.trim().toLowerCase();
    const container = document.getElementById("searchitems");
    if (searchdata !== "") {
        const filterdata = [...products.breakfast, ...products.dinner, ...products.lunch, ...products.dessert, ...products.beverage].filter((item) =>
            item.name.toLowerCase().includes(searchdata)
        );
        filterdata.length > 0 ? displayItem(filterdata) : container.innerHTML = `<p style="text-align:center";>No Result found</p>`;

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
// let count = 0;
// function displayQuantity() {
    // displayQuantity();
//     document.getElementById("count").innerText = ++count;
// }

function addToCart(button) {
    const itemContainer = button.closest('.orderitem');
    const item = {
        image: itemContainer.querySelector('.image').src,
        name: itemContainer.querySelector('h4').innerText,
        title: itemContainer.querySelector('h6').innerText,
        price: parseFloat(itemContainer.querySelector('h3').innerText.replace('$', '')),
        quantity: parseInt(itemContainer.querySelector('.noi h5').innerText)
    };
    updateCartTable(item);
}

function updateCartTable(item) {
    const table = document.querySelector(".table");

    let existingRow = [...table.querySelectorAll('tr')].find(row =>
        row.querySelector('td:nth-child(2)')?.innerText === item.name
    );

    if (existingRow) {
        // Update the existing row's quantity and total price
        let currentQuantity = parseInt(existingRow.querySelector('td:nth-child(5)').innerText);
        currentQuantity += item.quantity;
        existingRow.querySelector('td:nth-child(5)').innerText = currentQuantity;
        existingRow.querySelector('td:nth-child(6)').innerText = `$${(item.price * currentQuantity).toFixed(2)}`;
    } else {
        // Create a new row for a new item
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}" style="width:50px;height:50px;"></td>
            <td>${item.name}</td>
            <td>${item.title}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td><b onclick="removeItem(this)">X</b></td>
        `;
        table.appendChild(newRow);
    }
}
function removeItem(b) {
    b.closest('tr').remove();
}

// Fetch the JSON file and initialize the products data
fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data; // Assign fetched data to the products variable
    })
    .catch(error => console.error('Error fetching the product data:', error));
