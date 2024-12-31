let currentMenu = 'all';
let products = {}; // Will hold the fetched data

const renderProducts = (data) => {
    const productsDiv = document.querySelector('.products');
    productsDiv.innerHTML = '';
    data.forEach(item => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <strong>${item.ptname}</strong> - ${item.category} - $${item.price}
        `;
        productsDiv.appendChild(productDiv);
    });
};

const filterProducts = (type) => {
    if (type === 'all') {
        renderProducts([...products.breakfast, ...products.dinner, ...products.lunch, ...products.dessert, ...products.beverage]);
    } else {
        renderProducts([...products[type]]);
    }
};

const filterByCategory = (category) => {
    const filteredData = products[currentMenu].filter(item => category === 'all' || item.category === category);
    renderProducts(filteredData);
};

const changeMenu = (type) => {
    currentMenu = type;
    let names;
    switch (type) {
        case 'breakfast':
            names = ['br1', 'br2', 'br3', 'br4', 'br5', 'br6'];
            break;
        case 'dinner':
            names = ['di1', 'di2', 'di3', 'di4', 'di5', 'di6'];
            break;
        case 'lunch':
            names = ['l1', 'l2', 'l3', 'l4', 'l5', 'l6'];
            break;
        case 'dessert':
            names = ['de1', 'de2', 'de3', 'de4', 'de5', 'de6'];
            break;
        case 'beverage':
            names = ['be1', 'be2', 'be3', 'be4', 'be5', 'be6'];
            break;
        case 'all':
            names = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6'];
            break;
    }
    updateButtonNames(names);
};

const updateButtonNames = (names) => {
    const buttons = document.querySelectorAll('.choicebtn button');
    buttons.forEach((button, index) => {
        button.textContent = names[index];
        button.setAttribute('onclick', `filterByCategory('${names[index].toLowerCase()}')`);
    });
};

// Fetch the JSON file and initialize the products data
fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data; // Assign fetched data to the products variable
        filterProducts('all'); // Render all products initially
    })
    .catch(error => console.error('Error fetching the product data:', error));