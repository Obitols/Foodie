const headder = document.querySelector(".navigation");
    headder.innerHTML =
            ` <nav class="navtop">
        <i class='bx bx-menu bx-md' id="has"
            onclick="document.querySelector('.side').style.display ='flex';document.querySelector('.aside').style.display ='block';"></i>
        <h3 class="topic">Foodie</h3>
        <ul class="Service">
            <li><a href="index.html" onclick="document.querySelector('.aside').style.display ='none';">Home</a></li>
            <li><a href="index.html#page3" onclick="document.querySelector('.aside').style.display ='none';">Categories</a></li>
            <li><a href="order.html" onclick="document.querySelector('.aside').style.display ='none';">Myorder</a></li>
            <li><a href="index.html#page7" onclick="document.querySelector('.aside').style.display ='none';">Content</a></li>
            <li><a href="index.html#sev" onclick="document.querySelector('.aside').style.display ='none';">Service</a></li>
        </ul>
        <div class="search">
            <i class='bx bx-search bx-sm' style='color:#ab9d9d;align-self: center;'></i>
            <input type="text" class="find" placeholder="search">
        </div>
        <i class='bx bx-shopping-bag bx-sm' id="cart" onclick="window.location.href='cart.html';">
            <h6 id="count">0</h6>
        </i>
        <i class='bx bxs-user-circle bx-md' onclick="document.querySelector('.lsr').style.display='flex';login();"></i>
    </nav>
    <div class="searchalt">
            <i class='bx bx-search bx-sm' style='color:#ab9d9d;align-self: center;'></i>
            <input type="text" class="altfind" placeholder="search">
        </div>
    <section class="aside"
        onclick="document.querySelector('.side').style.display ='none';document.querySelector('.aside').style.display ='none';">
    </section>
<section class="lsr" style="display: none;">
        <form  action="http://localhost:3000/login" method="POST" enctype="multipart/form-data" class="login" style="display:none;">
            <i class='bx bx-x bx-md close' onclick="document.querySelector('.lsr').style.display ='none';"></i>
            <h1 style="text-align: center;">Login</h1>
            <div>
                <div class="info">
                    <input type="text" name="username" required>
                    <label>Username</label>
                    <i class='bx bxs-user bx-sm' style='color:#ffffff'></i>
                </div>
                <label class="lab"> please complete the field</label>
            </div>
            <div>
                <div class="info">
                    <input type="password" name="password" required>
                    <label>Password</label>
                    <i class='bx bxs-lock-alt bx-sm' style='color:#ffffff' ></i>
                </div>
                <label class="lab"> please complete the field</label>
            </div>
            <div id="pass">
                <p><input type="checkbox">Remember me</p><b style="color:white;" onclick="forgot()">Resert password?</b>
            </div>
            <button type="button" class="log" onclick="log()">Login</button>
            <p style="text-align: center;">Don't have an account?<b onclick="signin()">Register</b></p>
        </form>
        <form action="http://localhost:3000/signup" method="POST" enctype="multipart/form-data" class="signup" style="display:none;">
            <i class='bx bx-x bx-md close'
            onclick="document.querySelector('.lsr').style.display ='none';"></i>
            <h1 style="text-align: center;">Sign up</h1>
            <div>
                <div class="info">
                    <input type="text" name="name" required>
                    <label>Full name</label>
                    <i class='bx bxs-user bx-sm' style='color:#ffffff'></i>
                </div>
                <label class="lab"> please complete the field</label>
            </div>
            <div>
                <div class="info">
                    <input type="password" name="pass" required>
                    <label>Password</label>
                    <i class='bx bx-key bx-sm' style='color:#ffffff'></i>
                </div>
                <label class="lab"> please complete the field</label>
            </div>
            <div>
                <div class="info">
                    <input type="email" name="email" required>
                    <label>Email</label>
                    <i class='bx bxl-gmail bx-sm'></i>
                </div>
                <label class="lab"> please complete the field</label>
            </div>
            <button type="button" class="log" onclick="signup()">Sign up</button>
            <p style="text-align: center;">Already have an account? <b onclick="login()">Log In</b></p>
        </form>
        <form action="http://localhost:3000/forgot_password" method="POST" enctype="multipart/form-data" class="forgot" style="display:none;">
            <i class='bx bx-x bx-md close'
            onclick="document.querySelector('.lsr').style.display ='none';"></i>
            <h1 style="text-align: center;">Reset Password</h1>
            <div class="info">
                <input type="text" name="usname" required>
                <label>Email</label>
                <i class='bx bxs-user bx-sm' style='color:#ffffff'></i>
            </div>
            <label class="lab"> please complete the field</label>
            <div class="info">
                <input type="password" name="newPassword" required>
                <label>New password</label>
                <i class='bx bx-key bx-sm' style='color:#ffffff'></i>
            </div>
            <label class="lab"> please complete the field</label>
            <div class="info">
                <input type="password" name="confirmPassword" required>
                <label>Confirm password</label>
                <i class='bx bx-key bx-sm' style='color:#ffffff'></i>
            </div>
            <label class="lab"> please complete the field</label>
            <button type="button" class="log" onclick="resetpass()">Resert</button>
            <p style="text-align: center;">Don't want to resert Back to <b onclick="login()">Log In</b></p>
        </form>
    </section>
    <nav class="side">
        <div>
            <h3 class="topic">Foodie</h3>
            <i class='bx bx-x bx-md'
                onclick="document.querySelector('.side').style.display ='none';document.querySelector('.aside').style.display ='none';"></i>
        </div>
        <ul class="SService">
            <li><a href="index.html" onclick="document.querySelector('.aside').style.display ='none';">Home</a></li>
            <li><a href="index.html#page3" onclick="document.querySelector('.aside').style.display ='none';">Categories</a></li>
            <li><a href="order.html" onclick="document.querySelector('.aside').style.display ='none';">Myorder</a></li>
            <li><a href="index.html#page7" onclick="document.querySelector('.aside').style.display ='none';">Content</a></li>
            <li><a href="index.html#sev" onclick="document.querySelector('.aside').style.display ='none';">Service</a></li>
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
footer.innerHTML =`   
<footer id="page7">
        <address>
            <b>
                <h5>Foodie</h5>
            </b>
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
        <img src="/images/logo.jpg" alt="image" width="40%" height="40px">
    </footer>  `;   

async function fetchCount() {  
const response5 = await fetch('http://localhost:3000/cart');
const items = await response5.json();
const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
document.getElementById('count').textContent=totalQuantity;
}
fetchCount();