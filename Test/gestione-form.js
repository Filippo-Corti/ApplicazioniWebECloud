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

    //Controllo che psw siano uguali
    if (password.value != password2.value) {
        password.classList.add('border-danger')
        password2.classList.add('border-danger')
        controllo = false;
    } else {
        password.classList.remove('border-danger')
        password2.classList.remove('border-danger')
    }

    //Controllo che password sia lunga almeno 8 
    if (password.value.length < 8) {
        password.classList.add('border-danger')
        controllo = false;
    } else {
        password.classList.remove('border-danger')
    }

    //Controllo che nome sia lungo almeno 3
    if (nome.value.length < 3) {
        nome.classList.add('border-danger')
        controllo = false;
    } else {
        nome.classList.remove('border-danger')
    }

    //Controllo che cognome sia lungo almeno 3
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
        ricettario: [],
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

function controllaCampiEModificaAccount() {
    if (!controllaCampi()) {
        //Dati di Registrazione Non Validi
        return false;
    }

    //Modifica dei Dati dell'Utente

    var utente_aggiornato = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        nome: document.getElementById('nome').value,
        cognome: document.getElementById('cognome').value,
        genere: document.getElementById('gender').value,
        dataNascita: document.getElementById('date').value,
    }

    var utenti_string = localStorage.getItem("utenti");
    var utenti_correnti = JSON.parse(utenti_string);

    for (var i = 0; i < utenti_correnti.utenti.length; i++) {
        if (utenti_correnti.utenti[i].email == utente_aggiornato.email) {
            console.log("Trovato tra gli utenti");
            //Copio il ricettario 
            utente_aggiornato.ricettario = utenti_correnti.utenti[i].ricettario;
            //Elimino dagli utenti la versione vecchia
            utenti_correnti.utenti.splice(i, 1);
        }
    }
    //Inserisco tra gli utenti la versione nuova
    utenti_correnti.utenti.push(utente_aggiornato);

    localStorage.setItem("utenti", JSON.stringify(utenti_correnti));
    localStorage.setItem("utente_loggato", utente_aggiornato.email);

    return true;
}

function controllaCampiELogin() {
    //Login dell'Utente, se l'utente esiste

    var href = location.href;

    var utente_inserito = document.login.email.value;
    var password_inserita = document.login.password.value;

    console.log(utente_inserito);
    console.log(password_inserita);

    var utenti_string = localStorage.getItem("utenti");
    if (!utenti_string) {
        return false;
    }

    var utenti_correnti = JSON.parse(utenti_string);

    for (var utente of utenti_correnti.utenti) {
        console.log(utente.email == utente_inserito);
        console.log(utente.password == password_inserita);
        if (utente.email == utente_inserito && utente.password == password_inserita) {
            //Credenziali valide
            localStorage.setItem("utente_loggato", utente.email);
            var loginModal = document.getElementById('loginModal');
            var modal = bootstrap.Modal.getInstance(loginModal)
            modal.hide();
            location.href = href;
        } else {
            document.getElementById("errore-login").classList.remove("d-none");
        }
    }

    return false;

}
