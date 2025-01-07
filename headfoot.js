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
        <button onclick="signin()">SIGN IN</button>
    </nav>
    <div class="searchalt">
            <i class='bx bx-search bx-sm' style='color:#ab9d9d;align-self: center;'></i>
            <input type="text" class="altfind" placeholder="search">
        </div>
    <section class="aside"
        onclick="document.querySelector('.side').style.display ='none';document.querySelector('.aside').style.display ='none';">
    </section>
<section class="lsr" style="display: none;">
        <form action="check.php" method="post" class="login" style="display: none;">
            <i class='bx bx-x bx-md'
            onclick="document.querySelector('.lsr').style.display ='none';"></i>
            <h1 style="text-align: center;">Login</h1>
            <div>
                <div class="info">
                    <input type="text" placeholder="username" name="username" required autocomplete="off"></input>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        style="fill: rgba(254, 249, 249, 1);">
                        <path
                            d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z">
                        </path>
                    </svg>
                </div>
                <label id="lab"> please complete the field</label>
            </div>
            <div>
                <div class="info">
                    <input type="password" placeholder="password" name="password" required autocomplete="off"></input>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        style="fill:rgba(254, 249, 249, 1);">
                        <path
                            d="M20 12c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7z">
                        </path>
                    </svg>
                </div>
                <label id="lab"> please complete the field</label>
            </div>
            <div id="pass">
                <p><input type="checkbox">Remember me</p><b style="color:white;" onclick="forgot()">Resert password?</b>
            </div>
            <input type="submit" value="Login" class="log">
            <p style="text-align: center;">Don't have an account?<b onclick="signin()">Register</b></p>
        </form>
        <form method="post" action="register.php" class="signup" style="display: none;">
            <i class='bx bx-x bx-md'
            onclick="document.querySelector('.lsr').style.display ='none';"></i>
            <h1 style="text-align: center;">Sign up</h1>
            <div>
                <div class="info">
                    <input type="text" placeholder="Full name" name="name" autocomplete="off" required></input>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        style="fill: rgba(254, 249, 249, 1);">
                        <path
                            d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z">
                        </path>
                    </svg>
                </div>
                <label for=""> please complete the field</label>
            </div>
            <div>
                <div class="info">
                    <input type="password" placeholder="password" name="pass" autocomplete="off" required></input>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        style="fill: rgba(255, 252, 252, 1);">
                        <path
                            d="M7 17a5.007 5.007 0 0 0 4.898-4H14v2h2v-2h2v3h2v-3h1v-2h-9.102A5.007 5.007 0 0 0 7 7c-2.757 0-5 2.243-5 5s2.243 5 5 5zm0-8c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3z">
                        </path>
                    </svg>
                </div>
                <label for=""> please complete the field</label>
            </div>
            <div>
                <div class="info">
                    <input type="email" placeholder="Email" name="email" autocomplete="off" required></input>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        style="fill: rgba(255, 255, 255, 1);">
                        <path
                            d="m18.73 5.41-1.28 1L12 10.46 6.55 6.37l-1.28-1A2 2 0 0 0 2 7.05v11.59A1.36 1.36 0 0 0 3.36 20h3.19v-7.72L12 16.37l5.45-4.09V20h3.19A1.36 1.36 0 0 0 22 18.64V7.05a2 2 0 0 0-3.27-1.64z">
                        </path>
                    </svg>
                </div>
                <label for=""> please complete the field</label>
            </div>
            <input type="submit" value="Sign up" class="log" style="background-color:white ;">
            <p style="text-align: center;">Already have an account? <b onclick="login()">Log In</b></p>
        </form>
        <form action="change.php" method="post" class="forgot" style="display: none;">
            <i class='bx bx-x bx-md'
            onclick="document.querySelector('.lsr').style.display ='none';"></i>
            <h1 style="text-align: center;">Reset Password</h1>
            <div class="info">
                <input type="text" placeholder="username" name="usname" autocomplete="off" required></input>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    style="fill: rgba(254, 249, 249, 1);">
                    <path
                        d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z">
                    </path>
                </svg>
            </div>
            <div class="info">
                <input type="password" placeholder=" New password" name="npass" autocomplete="off" required></input>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    style="fill: rgba(255, 252, 252, 1);">
                    <path
                        d="M7 17a5.007 5.007 0 0 0 4.898-4H14v2h2v-2h2v3h2v-3h1v-2h-9.102A5.007 5.007 0 0 0 7 7c-2.757 0-5 2.243-5 5s2.243 5 5 5zm0-8c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3z">
                    </path>
                </svg>
            </div>
            <div class="info">
                <input type="password" placeholder="Confirm password" name="cpass" autocomplete="off" required></input>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    style="fill: rgba(255, 252, 252, 1);">
                    <path
                        d="M7 17a5.007 5.007 0 0 0 4.898-4H14v2h2v-2h2v3h2v-3h1v-2h-9.102A5.007 5.007 0 0 0 7 7c-2.757 0-5 2.243-5 5s2.243 5 5 5zm0-8c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3z">
                    </path>
                </svg>
            </div>
            <input type="submit" value="Resert" class="log" style="background-color:white ;">
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
            <div>
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

        <img src="logo.jpg" alt="image" width="40%" height="40px">
    </footer>  `;          