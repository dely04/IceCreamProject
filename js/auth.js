// LOGIN FORM VALIDATION
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");
  const loginMessage = document.getElementById("loginMessage");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!loginForm.checkValidity()) {
      loginForm.classList.add("was-validated");
      return;
    }

    loginMessage.textContent =
      "Login form validated successfully.";

    loginMessage.classList.remove("d-none");

    console.log("Login data:", {
      email: loginEmail.value,
      password: loginPassword.value
    });
  });
}
setTimeout(function () {
  window.location.href = "./index.html";
}, 1000);


// REGISTRATION FORM VALIDATION
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  const registerName = document.getElementById("registerName");
  const registerEmail = document.getElementById("registerEmail");
  const registerPassword = document.getElementById("registerPassword");
  const confirmPassword = document.getElementById("confirmPassword");
  const registerMessage = document.getElementById("registerMessage");

  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    confirmPassword.setCustomValidity("");

    if (registerPassword.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity(
        "Passwords do not match."
      );
    }

    if (!registerForm.checkValidity()) {
      registerForm.classList.add("was-validated");
      return;
    }

    registerMessage.textContent =
      "Registration form validated successfully.";

    registerMessage.classList.remove("d-none");

    console.log("Registration data:", {
      name: registerName.value,
      email: registerEmail.value
    });

    registerForm.reset();
    registerForm.classList.remove("was-validated");
  });

  confirmPassword.addEventListener("input", function () {
    if (registerPassword.value === confirmPassword.value) {
      confirmPassword.setCustomValidity("");
    }
  });
}
