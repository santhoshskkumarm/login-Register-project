function showRegister() {
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("registerForm").classList.remove("hidden");
    document.getElementById("forgotForm").classList.add("hidden");
}




function showLogin() {
   document.getElementById("loginForm").classList.remove("hidden");
    document.getElementById("registerForm").classList.add("hidden");
    document.getElementById("forgotForm").classList.add("hidden");
}



function showForgot() {
     document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("registerForm").classList.add("hidden");
    document.getElementById("forgotForm").classList.remove("hidden");
}




function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);

    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash");
    } else {
        input.type = "password";
        icon.classList.remove("bi-eye-slash");
        icon.classList.add("bi-eye");
    }
}





function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}




function updateEmailFeedback(inputId, feedbackId) {
    const input = document.getElementById(inputId);
    const feedback = document.getElementById(feedbackId);
    if (!input || !feedback) return;

    const value = input.value.trim();
    if (value ==="") {
        feedback.textContent = "";
        feedback.className = 'email-feedback';
        return;
    }

    if (validateEmail(value)) {
        feedback.textContent = 'Your email is valid';
        feedback.className = 'email-feedback valid';
    } else {
        feedback.textContent = 'Please enter a valid email address';
        feedback.className = 'email-feedback invalid';
    }
}





function updateMobileFeedback(inputId, feedbackId) {
    const input = document.getElementById(inputId);
    const feedback = document.getElementById(feedbackId);
    if (!input || !feedback) return;

    const value = input.value.trim();
    if (value === "") {
        feedback.textContent = "";
        feedback.className = 'email-feedback';
        return;
    }
    if (validateMobile(value)) {
        feedback.textContent = 'Your mobile number is valid';
        feedback.className = 'email-feedback valid';
    } else {
        feedback.textContent = 'Please enter a valid 10-digit mobile number';
        feedback.className = 'email-feedback invalid';
    }
}






function setFeedback(feedbackId, message, status) {
    const el = document.getElementById(feedbackId);
    if (!el) return;
    el.textContent = message || '';
    el.className = 'email-feedback ' + (status || '');
}


function clearFeedback(feedbackId) {
    setFeedback(feedbackId, '', '');
}






(function initEmailValidation() {
    const loginEmail = document.getElementById('loginEmail');
    const registerEmail = document.getElementById('registerEmail');
    const forgotEmail = document.getElementById('forgotEmail');
    const forgotMobile = document.getElementById('forgotMobile');



    if (loginEmail) {
        loginEmail.addEventListener('input', function() {
            updateEmailFeedback('loginEmail', 'loginEmailFeedback');
        });
        
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            loginEmail.value = storedEmail;
            updateEmailFeedback('loginEmail', 'loginEmailFeedback');
        }
    }







    if (registerEmail) {
        registerEmail.addEventListener('input', function() {
            updateEmailFeedback('registerEmail', 'registerEmailFeedback');
        });
        updateEmailFeedback('registerEmail', 'registerEmailFeedback');
    }




    if (forgotEmail) {
        forgotEmail.addEventListener('input', function() {
            updateEmailFeedback('forgotEmail', 'forgotEmailFeedback');
        });
    }



    if (forgotMobile) {
        forgotMobile.addEventListener('input', function() {
            updateMobileFeedback('forgotMobile', 'forgotMobileFeedback');
        });
    }
})();





function register() {
    const Email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;

    

    clearFeedback('registerEmailFeedback');

    if (Email === "" || password === "") {
        setFeedback('registerEmailFeedback', 'Please fill all fields', 'invalid');
        return;
    }

    if (!validateEmail(Email)) {
        setFeedback('registerEmailFeedback', 'Please enter a valid email address', 'invalid');
        return;
    }

    let index = localStorage.getItem("index") || 0;

    localStorage.setItem("index", parseInt(index) + 1);

    localStorage.setItem(index, JSON.stringify({ email: Email, password: password }));

    const loginEmail = document.getElementById('loginEmail');
    if (loginEmail) {
        loginEmail.value = Email;
        setFeedback('loginEmailFeedback', 'Registration successful! Please login.', 'valid');
    }

    clearFeedback('registerEmailFeedback');
} 




function login() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

  
 clearFeedback('loginEmailFeedback');

    if (email === "" || password === "") {
        setFeedback('loginEmailFeedback', 'Please fill all fields', 'invalid');
        return;
    }

    if (!validateEmail(email)) {
        setFeedback('loginEmailFeedback', 'Please enter a valid email address', 'invalid');
        return;
    }

    for (let i = 0; i < localStorage.getItem("index"); i++) {
        const user = JSON.parse(localStorage.getItem(i));
        if (user && user.email === email && user.password === password) {

            localStorage.setItem('loggedInUser', JSON.stringify({"user" : user, loggedIn}));

            window.location.href = "dashboard.html";
        }
    }

     setFeedback('loginEmailFeedback', 'Invalid email or password', 'invalid');
}

function submitForgot() {
    const email = document.getElementById("forgotEmail").value.trim();
    const mobile = document.getElementById("forgotMobile").value.trim();

    clearFeedback('forgotEmailFeedback');
    clearFeedback('forgotMobileFeedback');

    if (email === "" || mobile === "") {
        setFeedback('forgotEmailFeedback', 'Please fill all fields', 'invalid');
        return;
    }

    if (!validateEmail(email)) {
        setFeedback('forgotEmailFeedback', 'Please enter a valid email address', 'invalid');
        return;
    }

    if (!validateMobile(mobile)) {
        setFeedback('forgotMobileFeedback', 'Please enter a valid mobile number', 'invalid');
        return;
    }

   
    localStorage.setItem('userEmail', email);
    localStorage.setItem('username', email.split('@')[0]);
    window.location.href = "dashboard.html";
}

function validateMobile(mobile) {
    const regex = /^[0-9]{10}$/; 
    return regex.test(mobile);
}










