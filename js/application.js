var nombre, puntuaciones, nivel, player, contraseña;
var array;

function salir() {
    window.close();
}

function puntuacion() {

    var juego = JSON.parse(localStorage.getItem("jugador"));
    juego.sort(function (a, b) {
        return b.score - a.score;
    });
    for (var i in juego) {
        nombre = juego[i].nickname;
        puntuaciones = juego[i].score;
        nivel = juego[i].level;
        $("#puntuaciones").append("<h2> Nickname: " + nombre + " Score: " + puntuaciones + " Level: " + nivel + "</h2>");
        if (parseInt(i) > 10) {
            return;
        }
    }
}

Jugador = function (nickname, score, level, contraseña) {
    this.nickname = nickname;
    this.score = score;
    this.level = level;
    this.contraseña = contraseña;
};
var encontrado;

function comprueba() {
    encontrado = false;
    array = JSON.parse(localStorage.getItem("jugador"));
    for (var i in array) {
        if ((array[i].nickname == $("#inputnombre").val()) && (array[i].contraseña == $("#contraseñados").val())) {

            localStorage.setItem("jugadorActual", array[i].nickname);
            encontrado = true;
        }
    }
    if (!encontrado) {
        
        alert("jugador no encontrado");
        return false;
    }



}

function compruebaRegistro() {

    var player = new Jugador($("#nickname").val(), 0, 0, $("#contraseñados").val());
    array = JSON.parse(localStorage.getItem("jugador"));
    if (array == null) {
        var array = [];
    }
    array.push(player);
    localStorage.setItem("jugador", JSON.stringify(array));
}


function dificultad(tipo){
    if(tipo==null){
        tipo="facil";
    }
    localStorage.setItem("dificultad", tipo);
}