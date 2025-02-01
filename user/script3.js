function login() {
  toggleForms('.login');
}

function signin() {
  toggleForms('.signup');
}

function forgot() {
  toggleForms('.forgot');
}

function getOtp() {
  document.querySelector('.forgot').style.display = "none";
  document.querySelector('.putotp').style.display = "flex";
}

function submitOtp() {
  document.querySelector('.putotp').style.display = "none";
  document.querySelector('.resert').style.display = "flex";
}

function toggleForms(formToShow) {
  const forms = ['.login', '.signup', '.forgot'];
  forms.forEach(form => {
    document.querySelector(form).style.display = form === formToShow ? 'flex' : 'none';
  });
}

function signup() {
  const signinform = document.querySelector('.signup');
  const formData1 = new FormData(signinform);
  const patterns = {
    name: /^[a-zA-Z0-9]{3,25}$/,
    uemail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    pass: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,25}$/
  };

  for (let [key, value] of formData1.entries()) {
    value = value.trim();
    if (!value) {
      alert(`Please fill all the field.`);
      return;
    }

    if (patterns[key] && !patterns[key].test(value)) {
      alert(`${key.replace('name', 'Username must have morethan 3 length').replace('pass', 'Password must have 1 character, 1 number and 8 length').replace('uemail', 'Email must end with @gmail.com')}`);
      return;
    }
  }
  fetch(signinform.action, {
    method: "POST",
    body: formData1,
  })
    .then(response => response.text())
    .then(data => {
      if (`"user already exist!"` === data) {
        alert('User already exist!');
        signinform.reset();
      }
      else {
        alert("User registered successfully!");
        signinform.reset();
        document.querySelector('.signup').style.display = "none";
        document.querySelector('.login').style.display = "flex";
      }
    })
    .catch(err => {
      alert("Error: " + err.message);
    });
  }

function logn() {
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
      if (`"Login successful!"` === data) {
        Loginform.reset();
        window.location.href = 'home.html';
      }
      else {
        alert(data);
        Loginform.reset();
      }
    })
    .catch(err => {
      alert("Error: " + err.message);
    });
}

let forgotuser = "";
function getOtp() {
  forgotuser = document.getElementById('forgot_user').value;
  if (forgotuser == 0) {
    alert("Enter the username");
    return;
  }
  else {
    fetch("http://localhost:3000/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: forgotuser })

    })
      .then(response => response.json())
      .then(data => {
        if (forgotuser === data) {
          alert("OTP sent to Email!")
          document.querySelector('.forgot').style.display = "none";
          document.querySelector('.putotp').style.display = "flex";
          return;
        }
        alert(data);
      })
      .catch(error => console.error("Error:", error));
  }
}

function submitOtp() {
  const otp = document.getElementById('otp').value;
  if (otp == 0) {
    alert("Enter the OTP");
    return;
  }
  else {
    fetch("http://localhost:3000/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: forgotuser, otp })
    })
      .then(response => response.json())
      .then(data => {
        if (`sucess` === data) {
          document.querySelector('.putotp').style.display = "none";
          document.querySelector('.resert').style.display = "flex";
        }
        else {
          alert(data);
        }
      })
      .catch(error => console.error("Error:", error));
  }
}

function resetpass() {
  const newPassword = document.getElementById('nPassword').value;
  const confirmPassword = document.getElementById('cPassword').value;
  const patterns = {
    pass: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,25}$/
  };
  if (!newPassword || !confirmPassword) {
    alert("All fields are required.");
  }
  else if (!patterns.pass.test(newPassword) && !patterns.pass.test(confirmPassword)) {
    alert("Password must have 1 character, 1 number and 8 length");
  }
  else if (newPassword !== confirmPassword) {
    alert("Passwords do not match.");
  }
  else {
    fetch("http://localhost:3000/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: forgotuser, newPassword, confirmPassword
      })
    })
      .then(response => response.json())
      .then(data => {
        if ("successfully" === data) {
          alert("Password reset successfully");
          document.querySelector('.resert').style.display = "none";
          document.querySelector('.login').style.display = "flex";
        }
        else {
          alert(data);
        }
      })
      .catch(error => console.error("Error:", error));
  }
}
