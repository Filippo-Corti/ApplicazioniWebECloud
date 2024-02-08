/* --------------------------------------------------------------- 
Profile.js contains scripts used in the profile page.
--------------------------------------------------------------- */

//Enables edit of the sibling with class "editable"
function enableEdit(clicked_element) {

    let editable_element = clicked_element.parentNode.querySelector(".editable");

    editable_element.disabled = false;
}

//Disables edit of the sibling with class "editable"
function disableEdit(clicked_element) {
    let editable_element = clicked_element.parentNode.querySelector(".editable");
    //Check validity of field
    if (!editable_element.checkValidity()) {
        editable_element.classList.add("is-invalid");
        return;
    } 
    editable_element.classList.remove("is-invalid");
    editable_element.disabled = true;
    //Save edit in local storage 
}

//Checks Passwords, then calls disableEdit
function confirmPasswordEdit(clicked_element) {
    let password = clicked_element.parentNode.querySelector("input#password");
    let password_confirm= clicked_element.parentNode.querySelector("input#password_confirm");
    if (password.value !== password_confirm.value) {
        password_confirm.classList.remove("is-valid");
        password_confirm.classList.add("is-invalid");
        return;
    }
    if (password.type == "text") 
        toggleShowPassword();
    disableEdit(clicked_element);
}