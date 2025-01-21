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
function resetpass(){
    const forgotform = document.querySelector('.forgot');
            const formData3 = new FormData(forgotform);

            for (let [key, value] of formData3.entries()) {
                if (typeof value === "string" && !value.trim()) {
                    alert("Please fill all fields.");
                    return;
                }
            }
            fetch(forgotform.action, {
                method: "POST",
                body: formData3
            })
                .then(response => response.text())
                .then(data => {
                    alert(data);
                    forgotform.reset();
                })
                .catch(err => {
                    alert("Error: " + err.message);
                });
}