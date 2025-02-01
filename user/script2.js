const headder = document.querySelector(".navigation");
headder.innerHTML =
    ` <nav class="navtop">
        <i class='bx bx-menu bx-md' id="has"
            onclick="document.querySelector('.side').style.display ='flex';document.querySelector('.aside').style.display ='block';"></i>
        <h1 class="topic">Foodie</h1>
        <ul class="Service">
            <li><a href="home.html" onclick="document.querySelector('.aside').style.display ='none';">Home</a></li>
            <li><a href="home.html#page3" onclick="document.querySelector('.aside').style.display ='none';">Categories</a></li>
            <li><a href="order.html" onclick="document.querySelector('.aside').style.display ='none';">Myorder</a></li>
            <li><a href="home.html#page7" onclick="document.querySelector('.aside').style.display ='none';">Content</a></li>
            <li><a href="home.html#sev" onclick="document.querySelector('.aside').style.display ='none';">Service</a></li>
        </ul>
        <div class="search">
            <i class='bx bx-search bx-sm' style='color:#ab9d9d;align-self: center;'></i>
            <input type="text" class="find" placeholder="search">
        </div>
        <i class='bx bx-shopping-bag bx-sm' id="cart" onclick="window.location.href='cart.html';">
            <h6 id="count">0</h6>
        </i>
        <details>
        <summary><i class='bx bxs-user-circle bx-md'></i></summary>
        <a href="index.html" >Logout</a>
        </details>
    </nav>
    <div class="searchalt">
            <i class='bx bx-search bx-sm' style='color:#ab9d9d;align-self: center;'></i>
            <input type="text" class="altfind" placeholder="search">
        </div>
    <section class="aside"
        onclick="document.querySelector('.side').style.display ='none';document.querySelector('.aside').style.display ='none';">
    </section>
    <nav class="side">
        <div>
            <h1 class="topic">Foodie</h1>
            <i class='bx bx-x bx-md'
                onclick="document.querySelector('.side').style.display ='none';document.querySelector('.aside').style.display ='none';"></i>
        </div>
        <ul class="SService">
            <li><a href="home.html" onclick="document.querySelector('.aside').style.display ='none';">Home</a></li>
            <li><a href="home.html#page3" onclick="document.querySelector('.aside').style.display ='none';document.querySelector('.side').style.display ='none';">Categories</a></li>
            <li><a href="order.html" onclick="document.querySelector('.aside').style.display ='none';">Myorder</a></li>
            <li><a href="home.html#page7" onclick="document.querySelector('.aside').style.display ='none';document.querySelector('.side').style.display ='none';">Content</a></li>
            <li><a href="home.html#sev" onclick="document.querySelector('.aside').style.display ='none';document.querySelector('.side').style.display ='none';">Service</a></li>
        </ul>
        <footer>
            <i class='bx bxl-facebook bx-sm bx-border' id="touch"></i>
            <i class='bx bxl-twitter bx-sm bx-border' id="touch"></i>
            <i class='bx bxl-instagram bx-sm bx-border' id="touch"></i>
            <i class='bx bxl-linkedin bx-sm bx-border' id="touch"></i>
        </footer>
    </nav>
    <section id="searchitems" style="display: none; margin: 0 4%; height:max-content"></section>
      `;

const footer = document.querySelector(".contact");
footer.innerHTML = `   
<footer id="page7">
        <address>
            <h3>Foodie</h3>
            <p>Make a connection<br>with Social media</p>
            <div class="socm">
                <i class='bx bxl-facebook bx-sm bx-border' id="touch"></i>
                <i class='bx bxl-twitter bx-sm bx-border' id="touch"></i>
                <i class='bx bxl-instagram bx-sm bx-border' id="touch"></i>
                <i class='bx bxl-linkedin bx-sm bx-border' id="touch"></i>
            </div>
        </address>
        <table>
            <tr>
                <td><b>Support</b></td>
                <td><b>Our Menu</b></td>
                <td><b>Useful Links</b></td>
                <td><b>Get in touch</b></td>
            </tr>
            <tr>
                <td>Account</td>
                <td>special</td>
                <td>Payment & Tax</td>
                <td>Edvinlokesh@gmail.com</td>
            </tr>
            <tr>
                <td>Support Center</td>
                <td>popular</td>
                <td>Teams of Service</td>
                <td>+919631876821</td>
            </tr>
            <tr>
                <td>Feedback</td>
                <td>Categories</td>
                <td>Privacy Policy</td>
            </tr>
            <tr>
                <td>Accebility</td>
                <td></td>
                <td>About Us</td>
            </tr>
        </table>

    </footer>
    <footer id="page8">
        <h5>&copy 2025 Foodie.All rights reseved</h5>
        <img src="/images/pay.png" alt="image" width="30%" height="40px">
    </footer>  `;

async function fetchCount() {
    const response5 = await fetch('http://localhost:3000/cart');
    const items = await response5.json();
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('count').textContent = totalQuantity;
}

fetchCount();