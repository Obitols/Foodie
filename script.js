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
                                <button onclick="updateQuantity(this, -1)">-</button>
                                <h5 style="margin: auto;">1</h5>
                                <button onclick="updateQuantity(this, 1)">+</button>
                            </div>
                             <button class="Cart" onclick="addToCart(this);">Cart</button>
                        </div>
                    </div>
            </div>`
        ).join("");
        updateCartCount();
};

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
    try {
        const filteredData = products[currentMenu].filter(item => item.category === category);
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
        button.setAttribute('onclick', `filterByCategory('${names[index].category.toLowerCase()}')`);
    });
};
 function toggleheight(){
   const explore = document.getElementById("page3");
   explore.style.height = explore.style.height === "140vh" ? "max-content" : "140vh";
 }
// Fetch the JSON file and initialize the products data
fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data; // Assign fetched data to the products variable
        filterProducts('all'); // Render all products initially
    })
    .catch(error => console.error('Error fetching the product data:', error));
