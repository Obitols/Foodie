function login(){
    toggleForms('.login');
}

function signin(){
    toggleForms('.signup');
}
function forgot(){
    toggleForms('.forgot');
}
function getOtp(){
    document.querySelector('.forgot').style.display="none";
    document.querySelector('.putotp').style.display="flex";
}
function submitOtp(){
    document.querySelector('.putotp').style.display="none";
    document.querySelector('.resert').style.display="flex";
}

function toggleForms(formToShow) {
    const forms = ['.login','.signup','.forgot'];
    forms.forEach(form => {
      document.querySelector(form).style.display = form === formToShow ? 'flex' : 'none';
    });
  }
  function signup(){
    const signinform = document.querySelector('.signup');
            const formData1 = new FormData(signinform);
            const patterns = {
                email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            }

            for (let [key, value] of formData1.entries()) {
                if (typeof value === "string" && !value.trim()) {
                    alert("Please fill all fields.");
                    return;
                }
        
                if (patterns[key] && !patterns[key].test(value.trim())) {
                    alert(`Please enter a valid ${key.replace('pnumber', 'phone number').replace('zipcode', 'ZIP code')}.`);
                    return;
                }
            }
             fetch(signinform.action, {
                method: "POST",
                body: formData1,
            })
                .then(response => response.text())
                .then(data => {
                    alert(data);
                    signinform.reset();
                })
                .catch(err => {
                    alert("Error: " + err.message);
                });
}
function logn(){
    const Loginform = document.querySelector('.login');
            const formData2 = new FormData(Loginform);

            for (let [key, value] of formData2.entries()) {
                if (typeof value === "string" && !value.trim()) {
                    alert("Please fill all fields.");
                    return;
                }
            }
            fetch(Loginform.action, {
                method: "POST",
                body: formData2
            })
                .then(response => response.text())
                .then(data => {
                    alert(data);
                    Loginform.reset();
                })
                .catch(err => {
                    alert("Error: " + err.message);
                });
}
let forgotuser = ""; 
function getOtp() {
    forgotuser = document.getElementById('forgot_user').value;
    fetch("http://localhost:3000/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username:forgotuser })
    })
      .then(response => response.json())
      .then(data =>{ alert(data.message)
        document.querySelector('.forgot').style.display="none";
        document.querySelector('.putotp').style.display="flex";
})
      .catch(error => console.error("Error:", error));
  }
  
  function submitOtp() {
    const otp = document.getElementById('otp').value;
    fetch("http://localhost:3000/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username:forgotuser, otp })
    })
      .then(response => response.json())
      .then(data =>{ alert(data.message)
        document.querySelector('.putotp').style.display="none";
        document.querySelector('.resert').style.display="flex";
})
      .catch(error => console.error("Error:", error));
  }

function resetpass(){
    const newPassword = document.getElementById('nPassword').value;
    const confirmPassword = document.getElementById('cPassword').value;
    fetch("http://localhost:3000/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username:forgotuser, newPassword, confirmPassword
      })
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        document.querySelector('.resert').style.display="none";
        document.querySelector('.login').style.display="flex";
})
      .catch(error => console.error("Error:", error));
  }
