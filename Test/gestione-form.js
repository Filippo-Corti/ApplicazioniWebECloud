function elencoParametri(idElemento) {
    var corpo = document.getElementById(idElemento)
    var parametri = new URLSearchParams(window.location.search);
    // console.log(parametri)
    for (var p of parametri) {
        corpo.innerHTML += "<p>" + p[0] + "->" + p[1] + "</p>"

    }
}

function mostraPassword(elemento1, elemento2, tasto) {
    tasto = document.getElementById('tasto');
    if (elemento1.type == 'text') {
        elemento1.type = 'password';
        tasto.innerHTML = 'Mostra Password';
        if (elemento2)
            elemento2.type = 'password';
    } else {
        elemento1.type = 'text';
        tasto.innerHTML = 'Nascondi Password';
        if (elemento2)
            elemento2.type = 'text';
    }
}

function controllaLunghezza(elemento, lunghezza) {
    if (elemento.value.length < lunghezza) {
        elemento.classList.add('border-danger');
        return false;
    } else {
        elemento.classList.remove('border-danger');

        return true
    }

}

function controllaCampi() {
    console.log("Sto controllando i campi");
    var controllo = true;

    var password = document.getElementById('password');
    var password2 = document.getElementById('password2');
    var nome = document.getElementById('nome');
    var cognome = document.getElementById('cognome');

    if (password.value != password2.value) {
        password.classList.add('border-danger')
        password2.classList.add('border-danger')
        controllo = false;
    } else {
        password.classList.remove('border-danger')
        password2.classList.remove('border-danger')
    }

    if (password.value.length < 8) {
        password.classList.add('border-danger')
        controllo = false;
    } else {
        password.classList.remove('border-danger')
    }

    if (nome.value.length < 3) {
        nome.classList.add('border-danger')
        controllo = false;
    } else {
        nome.classList.remove('border-danger')
    }

    if (cognome.value.length < 3) {
        cognome.classList.add('border-danger')
        controllo = false;
    } else {
        cognome.classList.remove('border-danger')
    }
    return controllo;

}

function controllaCampiERegistra() {
    if (!controllaCampi()) {
        //Dati di Registrazione Non Validi
        return false;
    }
    //Registrazione dell'Utente

    var nuovo_utente = {
        email: document.getElementById('email').value,        
        password: document.getElementById('password').value,
        nome: document.getElementById('nome').value,
        cognome: document.getElementById('cognome').value,
        genere: document.getElementById('gender').value,
        dataNascita: document.getElementById('date').value,
    }

    var utenti_string = localStorage.getItem("utenti");
    var utenti_correnti;
    if (!utenti_string) {
        utenti_correnti = {
            utenti: [],
        }
    } else {
        utenti_correnti = JSON.parse(utenti_string);
    }

    utenti_correnti.utenti.push(nuovo_utente);

    localStorage.setItem("utenti", JSON.stringify(utenti_correnti));
    localStorage.setItem("utente_loggato", nuovo_utente.email);

    return true;
}