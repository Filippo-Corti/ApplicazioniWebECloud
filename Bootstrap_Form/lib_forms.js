function elencoParametri(elementId) {
    //Estrazione parametri dall'URL
    var parametri = new URLSearchParams(window.location.search);

    //parametri.get("email") //Leggi valore parametro
    //parametri.has("email") //verifica se parametro esista (ma potrebbe essere vuoto)

    //Accesso al Document Object Model (DOM)
    var pagina = document.getElementById(elementId);
    //oppure: var pagina = document.querySelector("#dati");

    //Lettura di tutti i parametri come array [chiave, valori...]
    for (var parametro of parametri) {
        //Inserimento nella pagina Dati
        pagina.innerHTML += parametro[0] + ": " + parametro[1] + "<br>";
    }

}

function controllaCampi(event) {
    console.log("Sto Controllando...");
    var redirect = true;

    var pw1 = document.getElementById("password");
    var pw2 = document.getElementById("password2");
    var firstName = document.getElementById("fname");
    var checkbox = document.getElementById("checkbox");

    pw1.classList.remove("border-danger");
    pw2.classList.remove("border-danger");
    firstName.classList.remove("border-danger");
    checkbox.classList.remove("border-danger");

    //Verifica che Password 1 == Password 2
    if (pw1.value != pw2.value) {
        redirect = false;
        pw2.classList.add("border-danger");
    }

    //Verifica che la Password sia almeno di 8 caratteri 
    if (pw1.length < 8) {
        redirect = false;
        pw1.classList.add("border-danger");
    }

    //Verifica che il Nome sia almeno di 3 caratteri e contenga solo lettere 
    if (firstName.value.length < 3) {
        redirect = false;
        firstName.classList.add("border-danger");
    }
    if (!contieneSoloLettereESpazi(firstName.value)) {
        redirect = false;
        firstName.classList.add("border-danger");
    }

    //Verifica che la checkbox sia checkata
    if (!checkbox.checked) {
        checkbox.classList.add("border-danger");
        redirect = false;
    }

    return redirect;
}

function controllaLunghezzaEUguaglianza(elemento, lunghezza) {
    var passwords = document.querySelectorAll("input.password");


    console.log(passwords[0].value + " " + passwords[1].value)
    if (elemento.value.length < lunghezza || passwords[0].value != passwords[1].value) {
        passwords[0].classList.add("border-danger");
        passwords[1].classList.add("border-danger");
        console.log("Sbagliato")
        return false;
    } else {
        passwords[0].classList.remove("border-danger");
        passwords[1].classList.remove("border-danger");
        console.log("Giusto")
        return true;
    }
}

function contieneSoloLettereESpazi(str) {
    for (var c of str) {
        if (!((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) && (c != ' '))
            return false;
    }
    return true;
}

function mostraPassword() {
    var passwords = document.querySelectorAll("input.password");
    for (var pw of passwords) {
        pw.type = (pw.type == "text") ? "password" : "text";
    }
}

function controllaEmail(element) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (element.value.match(mailformat)) {
        element.classList.remove("border-danger");
        element.focus();
        return true;
    }
    else {
        element.classList.add("border-danger");
        element.focus();
        return false;
    }
}

function ripopolaForm() {
    var parametri = new URLSearchParams(window.location.search);
    for ( var parametro of parametri) {
        document.getElementById(parametro[0]).value = parametro[1];
    }
}