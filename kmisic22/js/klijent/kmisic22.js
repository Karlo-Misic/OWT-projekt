document.addEventListener('DOMContentLoaded', function () {
    const gumb = document.getElementById('toggleVersion');
    gumb.addEventListener('click', promijeniVerziju);

    // Provjera da li postoji spremljena verzija u kolačićima prije primjene stilova
    const spremljenaVerzija = dohvatiVerzijuUređaja();
    if (spremljenaVerzija === "mobilna") {
        primijeniMobilnuVerziju();
        console.log("mobitel")
    } else if (spremljenaVerzija === "desktop") {
        primijeniDesktopVerziju();
        console.log("desktop");
    } else {
        primijeniStilPremaVerziji(); // Ako nema spremljene verzije, primjenjuje se prema zadanim stilovima
    }
});

function promijeniVerziju() {
    const gumb = document.getElementById('toggleVersion');
    const trenutniCSS = document.querySelector('link[rel="stylesheet"]:not([href*="dokumentacija.css"])');

    if (gumb.textContent.includes('mobilnu')) {
        console.log("Postavljena mobilna verzija.");
        trenutniCSS.href = '../css/mobilnaVerzija.css';
        gumb.textContent = 'Vrati na stolnu verziju';
        // Čuvanje verzije uređaja u kolačiću prilikom promjene
        postaviVerzijuUređaja("mobilna");
    } else {
        console.log("Postavljena desktop verzija.");
        trenutniCSS.href = '../css/kmisic22.css';
        gumb.textContent = 'Prebaci na mobilnu verziju';
        // Čuvanje verzije uređaja u kolačiću prilikom promjene
        postaviVerzijuUređaja("desktop");
    }
}

// Funkcija koja postavlja kolačić
function postaviVerzijuUređaja(verzija) {
    console.log("Postavljena verzija u kolačiću: " + verzija);
    document.cookie = "verzijaUređaja=" + verzija + "; path=/";
}

// Funkcija koja čita kolačić
function dohvatiVerzijuUređaja() {
    var ime = "verzijaUređaja=";
    var dekodiraniKolačić = decodeURIComponent(document.cookie);
    console.log("Dekodirani kolačić:", dekodiraniKolačić);
    var kolačići = dekodiraniKolačić.split(';');
    for(var i = 0; i < kolačići.length; i++) {
        var kolačić = kolačići[i];
        while (kolačić.charAt(0) == ' ') {
            kolačić = kolačić.substring(1);
        }
        if (kolačić.indexOf(ime) == 0) {
            var verzija = kolačić.substring(ime.length, kolačić.length);
            console.log("Verzija iz kolačića:", verzija);
            return verzija;
        }
    }
    console.log("Nije pronađena verzija u kolačićima.");
    return "";
}

// Funkcija koja primjenjuje stilove na osnovu verzije uređaja
function primijeniStilPremaVerziji() {
    console.log("Primenjuju se stilovi prema verziji uređaja.");
    var gumb = document.getElementById("toggleVersion");
    gumb.textContent = "Prebaci na mobilnu verziju";
}

// Funkcija koja primjenjuje mobilnu verziju
function primijeniMobilnuVerziju() {
    console.log("Primjenjuje se mobilna verzija.");
    const gumb = document.getElementById('toggleVersion');
    const trenutniCSS = document.querySelector('link[rel="stylesheet"]:not([href*="dokumentacija.css"])');
    gumb.textContent = 'Vrati na stolnu verziju';
    trenutniCSS.href = '../css/mobilnaVerzija.css';
}

// Funkcija koja primjenjuje desktop verziju
function primijeniDesktopVerziju() {
    console.log("Primjenjuje se desktop verzija.");
    const gumb = document.getElementById('toggleVersion');
    const trenutniCSS = document.querySelector('link[rel="stylesheet"]:not([href*="dokumentacija.css"])');
    gumb.textContent = 'Prebaci na mobilnu verziju';
    trenutniCSS.href = '../css/kmisic22.css';
}