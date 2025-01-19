function login(){
    toggleForms('.login');
}

function signin(){
    toggleForms('.signup');
}
function forgot(){
    toggleForms('.forgot');
}

function toggleForms(formToShow) {
    const forms = ['.login','.signup','.forgot'];
    forms.forEach(form => {
      document.querySelector(form).style.display = form === formToShow ? 'flex' : 'none';
    });
  }
  function signup(){
    const signinform = document.querySelector('.signup');
            const formData = new FormData(signinform);
            const patterns = {
                email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            }

            for (let [key, value] of formData.entries()) {
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
                body: formData
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
function log(){
    const Loginform = document.querySelector('.login');
            const formData = new FormData(Loginform);

            for (let [key, value] of formData.entries()) {
                if (typeof value === "string" && !value.trim()) {
                    alert("Please fill all fields.");
                    return;
                }
            }
            fetch(Loginform.action, {
                method: "POST",
                body: formData
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
function resetpass(){
    const forgotform = document.querySelector('.forgot');
            const formData = new FormData(forgotform);

            for (let [key, value] of formData.entries()) {
                if (typeof value === "string" && !value.trim()) {
                    alert("Please fill all fields.");
                    return;
                }
            }
            fetch(forgotform.action, {
                method: "POST",
                body: formData
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