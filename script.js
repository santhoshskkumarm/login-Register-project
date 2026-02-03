
window.onload = function () {
    showLogin();
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
        document.getElementById("loginEmail").value = savedEmail;
        document.getElementById("rememberMe").checked = true;
    }
};

function showRegister() {
    clearAllFeedback();
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
    clearAllFeedback();
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("registerForm").classList.add("hidden");
    document.getElementById("forgotForm").classList.remove("hidden");
}

function clearAllFeedback() {
    setFeedback('loginEmailFeedback', '', '');
    setFeedback('registerEmailFeedback', '', '');
    setFeedback('forgotEmailFeedback', '', '');
}

function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);
    input.type = input.type === "password" ? "text" : "password";
    icon.classList.toggle("bi-eye");
    icon.classList.toggle("bi-eye-slash");
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setFeedback(id, msg, type) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = msg;
    el.className = `email-feedback ${type}`;
}

function register() {
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;

    if (!validateEmail(email)) {
        setFeedback('registerEmailFeedback', 'Invalid email address', 'invalid');
        return;
    }
    if (password.length < 6) {
        setFeedback('registerEmailFeedback', 'Password too short (min 6 chars)', 'invalid');
        return;
    }

    let index = parseInt(localStorage.getItem("index") || "0");
    localStorage.setItem(index, JSON.stringify({ email: email, password: password }));
    localStorage.setItem("index", index + 1);

    setFeedback('registerEmailFeedback', 'Registration successful!', 'valid');

    setTimeout(() => {
        showLogin();
        document.getElementById('loginEmail').value = email;
        setFeedback('loginEmailFeedback', 'Registration successful! Please login.', 'valid');
    }, 2000);
}

function login() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const rememberMe = document.getElementById("rememberMe").checked;
    const count = parseInt(localStorage.getItem("index") || "0");

    if (!validateEmail(email)) {
        setFeedback('loginEmailFeedback', 'Invalid email format', 'invalid');
        return;
    }

    for (let i = 0; i < count; i++) {
        const user = JSON.parse(localStorage.getItem(i));
        if (user && user.email === email && user.password === password) {
            if (rememberMe) localStorage.setItem("rememberedEmail", email);
            else localStorage.removeItem("rememberedEmail");
            
            localStorage.setItem('loggedInUser', JSON.stringify({ user: user }));
            window.location.href = "dashboard.html";
            return;
        }
    }
    setFeedback('loginEmailFeedback', 'Invalid credentials', 'invalid');
}

function submitForgot() {
    const email = document.getElementById("forgotEmail").value.trim();

    if (validateEmail(email)) {
        setFeedback('forgotEmailFeedback', 'Valid Email! Reset link sent. Redirecting...', 'valid');
        setTimeout(() => {
            showLogin();
        }, 3000);
    } else {
        setFeedback('forgotEmailFeedback', 'Invalid email address', 'invalid');
    }
}

