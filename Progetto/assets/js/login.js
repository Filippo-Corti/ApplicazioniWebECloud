function checkCredentialsAndLogin(form) {
    let email = form.querySelector("input[type='email']");
    let password = form.querySelector("input[type='password']");
    email.classList.remove("is-invalid");
    password.classList.remove("is-invalid");

    if (email.value === "corti.filippo03@gmail.com" && password.value === "1234") {
        //Ok
        return true;
    } else {
        //Not ok
        document.querySelector(".invalid-credentials").classList.remove("d-none");
        //if username not found
        email.classList.add("is-invalid");
        //always
        password.classList.add("is-invalid");

        return false;
    }
}

//Toggle Password Visibiliy
function toggleShowPassword() {
    let password_fields = document.querySelectorAll(".toggle-visibility");

    for (let password_field of password_fields) {
        if (password_field.type == "password")
            password_field.type = "text";
        else
            password_field.type = "password";
    }
}
