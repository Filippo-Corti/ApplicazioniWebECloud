function controllaLogin() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let utentiDalloStorage = JSON.parse(localStorage.getItem('utenti'));

    if(!utentiDalloStorage.some((utente) => utente.email == email)) {
        alert("Utente non esiste")
        return false;
    }

    if (!utentiDalloStorage.some((utente) => utente.email == email && utente.password == password)) {
        alert("Credenziali non valide")
        return false;
    }

    alert("Logged In!")
    return true;

}