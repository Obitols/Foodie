let products = {};
const fetchData = async () => {
        const response = await fetch(`http://localhost:3000/food_menu`);
        let foodMenu = await response.json();
        displayMenu(foodMenu);
};

function displayMenu(items) {
    const productsContainer = document.querySelector(".itemgroup");
    productsContainer.innerHTML = items.map(item => `
                <div class="orderitem">
                    <div class="rot"></div>
                    <img src='http://localhost:3000/food_menu/${item.id}' alt="${item.name}" class="image">
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
                             <button class="Cart" onclick="addToCart(${item.id}, '${item.name}', ${item.price},'${item.image}')">Cart</button>
                        </div>
                    </div>
            </div>`
    ).join("");
}

function filterMenu(type) {
    const names=products[type];
    const buttons = document.querySelectorAll('.choicebtn button');
    buttons.forEach((button, index) => {
        button.innerHTML = `<i class="${names[index].cname}"></i>${names[index].btname}`;
        button.setAttribute('onclick', `filterByCategory('${names[index].btname}')`);
    });
    if(type === 'all'){
        displayMenu(foodMenu); 
    }
    else{
        const filteredData = foodMenu.filter(item => item.meal_type === type);
        displayMenu(filteredData);
    }     
}

const filterByCategory = (category) => {
    const filteredData = foodMenu.filter(item => item.category === category);
    displayMenu(filteredData);
};

fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
    })
    .catch(error => console.error('Error fetching the product data:', error));

fetchData();

