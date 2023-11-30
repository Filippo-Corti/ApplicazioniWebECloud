function getStringaGeneri(genres) {
    var s = "";
    for (genere of genres) {
        s += genere.name + ", ";
    }
    return s.substring(0, s.length - 2)
}

function formatDate(date) {
    //From yyyy-mm-dd to dd/mm/yyyy
    return date.substring(8, 10) + "/" + date.substring(5, 7) + "/" + date.substring(0, 4);
}

function formatRuntime(time) {
    var s = "";
    if (time >= 60) {
        s += parseInt(time / 60) + "h ";
    }
    s += time % 60 + "m";
    return s;
}