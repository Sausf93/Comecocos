/**
 * @param  {} {jugadorActual=localStorage.getItem("jugadorActual"
 * @param  {} ;dificultad=localStorage.getItem("dificultad"
 * @param  {} ;game=newPhaser.Game(800
 * @param  {} 600
 * @param  {} Phaser.CANVAS
 * @param  {} 'comecocos'
 * @param  {boot} {boot
 * @param  {preload} preload
 * @param  {create} create
 * @param  {update}} update
 */
function Juego() {

    jugadorActual = localStorage.getItem("jugadorActual");
    dificultad = localStorage.getItem("dificultad");
    game = new Phaser.Game(800, 600, Phaser.CANVAS, 'comecocos', {
        boot: boot,
        preload: preload,
        create: create,
        update: update
    });

}
//Falta cargar niveles y dificultad y sumar puntos de aguacates.
var jugadorActual;
var dificultad;
var fantasmas;
var comecocos;
var controles;
var numeroFantasmas;
var bolas;
var bolasPoder;
var score = 0;
var textoScore;
var map;
var layer;
var array;
var nivelactual;
/**
 * @param  {} {game.scale.scaleMode=Phaser.ScaleManager.USER_SCALE;game.scale.setUserScale(game.Metrics.scaleX
 * @param  {} game.Metrics.scaleY
 */
function boot() {
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    game.scale.setUserScale(game.Metrics.scaleX, game.Metrics.scaleY);
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
}
/**
 * @param  {} {if(dificultad=="facil"
 * @param  {} {numeroFantasmas=4;}if(dificultad=="normal"
 * @param  {} {numeroFantasmas=6;}if(dificultad=="dificil"
 * @param  {} {numeroFantasmas=8;}if(dificultad==null
 * @param  {} {numeroFantasmas=4;}array=JSON.parse(localStorage.getItem("jugador"
 * @param  {} ;for(variinarray
 * @param  {} {if(array[i].nickname==jugadorActual
 * @param  {} {nivelactual=array[i].level;score=array[i].score;}}game.load.image('fondo'
 * @param  {} '../imagenes/fondo.png'
 * @param  {} ;game.load.spritesheet('comecocos'
 * @param  {} '../imagenes/sprite-comecocos.png'
 * @param  {} 24
 * @param  {} 24
 * @param  {} ;if(nivelactual==0
 * @param  {} {game.load.tilemap('map'
 * @param  {} '../assets/level1.csv'
 * @param  {} ;}if(nivelactual==1
 * @param  {} {game.load.tilemap('map'
 * @param  {} '../assets/level2.csv'
 * @param  {} ;numeroFantasmas=numeroFantasmas+1;}if(nivelactual==2
 * @param  {} {game.load.tilemap('map'
 * @param  {} '../assets/level3.csv'
 * @param  {} ;numeroFantasmas=numeroFantasmas+2;}game.load.image('tileset'
 * @param  {} '../assets/tileset.png'
 * @param  {} ;game.load.spritesheet('fantasmas'
 * @param  {} '../imagenes/sprite-fantasma.png'
 * @param  {} 20
 * @param  {} 18
 * @param  {} ;game.load.image('mancuerna'
 * @param  {} '../imagenes/mancuerna.png'
 */
function preload() {


    if (dificultad == "facil") {

        numeroFantasmas = 4;
    }
    if (dificultad == "normal") { //Falta hacer la comparacion con la dificultad.

        numeroFantasmas = 6;
    }
    if (dificultad == "dificil") { //Falta hacer la comparacion con la dificultad.

        numeroFantasmas = 8;
    }
    if (dificultad == null) {

        numeroFantasmas = 4;
    }

    array = JSON.parse(localStorage.getItem("jugador"));
    for (var i in array) {
        if (array[i].nickname == jugadorActual) {
            nivelactual = array[i].level;
        }
    }


    //cargar audios.
    game.load.audio('inicio', '../audios/pacman_beginning.wav');
    game.load.audio('comida', '../audios/pacman_chomp.wav');
    game.load.audio('comefantasmas', '../audios/pacman-eating-ghost.mp3');
    game.load.audio('muerte', '../audios/pacman-5.mp3');

    // Aqui se cargaran los sprites.
    game.load.image('fondo', '../imagenes/fondo.png');
    game.load.spritesheet('comecocos', '../imagenes/sprite-comecocos.png', 24, 24);

    //Falta agregar los mapas por completo.
    if (nivelactual == 0) {
        scrore=0;
        game.load.tilemap('map', '../assets/level1.csv');
    }
    if (nivelactual == 1) {
        scrore=2200;
        game.load.tilemap('map', '../assets/level2.csv');
        numeroFantasmas = numeroFantasmas + 1;
    }
    if (nivelactual == 2) {
        scrore=5000;
        game.load.tilemap('map', '../assets/level3.csv');
        numeroFantasmas = numeroFantasmas + 2;
    }
    if(nivelactual>2){
        $("canvas").remove();
        $(".final").append("<h1> Ya te pasaste el juego con este usuario. Registrate con otro para volver a jugar </h1>");
    }


    game.load.image('tileset', '../assets/tileset.png');

    //Enemigos.
    game.load.spritesheet('fantasmas', '../imagenes/sprite-fantasma.png', 20, 18);


    //Mancuerna.
    game.load.image('mancuerna', '../imagenes/mancuerna.png');

}
/**
 * @param  {} {game.physics.startSystem(Phaser.Physics.ARCADE
 * @param  {} ;game.add.sprite(0
 * @param  {} 0
 * @param  {} 'fondo'
 * @param  {} ;map=game.add.tilemap('map'
 * @param  {} 32
 * @param  {} 32
 * @param  {} ;map.addTilesetImage('tileset'
 * @param  {} ;layer=map.createLayer(0
 * @param  {} ;layer.resizeWorld(
 * @param  {} ;map.setCollision(0
 * @param  {} ;map.setTileIndexCallback(4
 * @param  {} comprueba
 * @param  {} this
 * @param  {} ;comecocos=game.add.sprite(40
 * @param  {} 40
 * @param  {} 'comecocos'
 * @param  {} ;comecocos.anchor.setTo(0.2
 * @param  {} 0.2
 * @param  {} ;game.physics.arcade.enable(comecocos
 * @param  {} ;comecocos.body.collideWorldBounds=true;game.camera.follow(comecocos
 * @param  {} ;comecocos.animations.add('izquierda'
 * @param  {} [1]
 * @param  {} 25
 * @param  {} true
 * @param  {} ;comecocos.animations.add('arriba'
 * @param  {} [2]
 * @param  {} 25
 * @param  {} true
 * @param  {} ;comecocos.animations.add('derecha'
 * @param  {} [0]
 * @param  {} 25
 * @param  {} true
 * @param  {} ;comecocos.animations.add('abajo'
 * @param  {} [3]
 * @param  {} 25
 * @param  {} true
 * @param  {} ;controles=game.input.keyboard.createCursorKeys(
 * @param  {} ;fantasmas=game.add.group(
 * @param  {} ;fantasmas.enableBody=true;for(vari=0;i<numeroFantasmas;i++
 * @param  {} {varfantasma=fantasmas.create(385+i*10
 * @param  {} 270
 * @param  {} 'fantasmas'
 * @param  {} ;fantasma.animations.add('malo'
 * @param  {} [0]
 * @param  {} 20
 * @param  {} true
 * @param  {} ;fantasma.animations.add('bueno'
 * @param  {} [1]
 * @param  {} 20
 * @param  {} true
 * @param  {} ;fantasma.body.collideWorldBounds=true;fantasma.body.gravity.x=Math.floor(Math.random(
 * @param  {} *(300-(-300
 * @param  {} +-300
 * @param  {} ;fantasma.body.gravity.y=Math.floor(Math.random(
 * @param  {} *(300-(-300
 * @param  {} +-300
 * @param  {} ;fantasma.body.bounce.y=1;fantasma.body.bounce.x=1;}bolasPoder=game.add.group(
 * @param  {} ;bolasPoder.enableBody=true;varbolaEsquinaDerArr=bolasPoder.create(702
 * @param  {} 30
 * @param  {} 'mancuerna'
 * @param  {} ;varbolaEsquinaDerAba=bolasPoder.create(705
 * @param  {} 540
 * @param  {} 'mancuerna'
 * @param  {} ;varbolaEsquinaIzqAba=bolasPoder.create(30
 * @param  {} 540
 * @param  {} 'mancuerna'
 * @param  {} ;textoScore=game.add.text(660
 * @param  {} 0
 * @param  {0'} 'Score
 * @param  {'26px'} {fontSize
 * @param  {'#fff'}} fill
 */
function create() {


    music = game.add.audio('inicio');
    music.play();
    //Aqui se agregan todos los sprites.
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //Se agrega el fondo.
    game.add.sprite(0, 0, 'fondo');
    map = game.add.tilemap('map', 32, 32);
    map.addTilesetImage('tileset');
    layer = map.createLayer(0);
    layer.resizeWorld();
    map.setCollision(0);
    map.setTileIndexCallback(4, comprueba, this); //Buscar para sumar puntos.


    //Se agraga la imagen del comecocos
    comecocos = game.add.sprite(40, 40, 'comecocos');
    comecocos.anchor.setTo(0.2, 0.2);
    game.physics.arcade.enable(comecocos);
    comecocos.body.collideWorldBounds = true;
    game.camera.follow(comecocos);

    // //Animaciones.
    comecocos.animations.add('izquierda', [1], 25, true);
    comecocos.animations.add('arriba', [2], 25, true);
    comecocos.animations.add('derecha', [0], 25, true);
    comecocos.animations.add('abajo', [3], 25, true);


    //Controles.
    controles = game.input.keyboard.createCursorKeys();


    // //Estanciar grupo de fantasmas.
    fantasmas = game.add.group();
    fantasmas.enableBody = true;
    // //Hacer que el numero de fantasmas dependa de la dificultad.
    // //Facil 2, normal 3, dificil 4. y ya se vera si es muy facil.
    for (var i = 0; i < numeroFantasmas; i++) {
        var fantasma = fantasmas.create(385 + i * 10, 270, 'fantasmas');
        fantasma.animations.add('malo', [0], 20, true);
        fantasma.animations.add('bueno', [1], 20, true);
        fantasma.body.collideWorldBounds = true;
        fantasma.body.gravity.x = Math.floor(Math.random() * (300 - (-300)) + -300);
        fantasma.body.gravity.y = Math.floor(Math.random() * (300 - (-300)) + -300);
        fantasma.body.bounce.y = 1;
        fantasma.body.bounce.x = 1;
    }

    //Mancuernas.
    bolasPoder = game.add.group();
    bolasPoder.enableBody = true;
    var bolaEsquinaDerArr = bolasPoder.create(702, 30, 'mancuerna');
    var bolaEsquinaDerAba = bolasPoder.create(705, 540, 'mancuerna');
    var bolaEsquinaIzqAba = bolasPoder.create(30, 540, 'mancuerna');




    textoScore = game.add.text(660, 0, 'Score: 0', {
        fontSize: '26px',
        fill: '#fff'
    });
}
var intervalo;
var poderes = false;
/**
 * @param  {} {if(((score>2000
 * @param  {} &&(nivelactual==0
 * @param  {} ||((score>4500
 * @param  {} &&(nivelactual==1
 * @param  {} ||((score>9000
 * @param  {} &&(nivelactual==2
 * @param  {} {game.paused=true;textoGanar=game.add.text(50
 * @param  {} 350
 * @param  {} 'Hasganadoestenivel
 * @param  {} preparateparaelsiguiente'
 * @param  {'25px'} {fontSize
 * @param  {'#fff'}} fill
 */
function update() {

    //Colisiones
    //Tiempo del poder.

    if (((score > 2000) && (nivelactual == 0)) || ((score > 4500) && (nivelactual == 1)) || ((score > 9000) && (nivelactual == 2))) {
        game.paused = true;
        textoGanar = game.add.text(50, 350, 'Has ganado este nivel, preparate para el siguiente', {
            fontSize: '25px',
            fill: '#fff'
        });
        setTimeout(function () {
            $("canvas").remove();
            game = "";
            for (var i in array) {

                if (array[i].nickname == jugadorActual) {
                    array[i].level = array[i].level + 1;
                    array[i].score = array[i].score + score;
                }
                if ((array[i].level >= 3) && (array[i].nickname == jugadorActual)) {

                    $(".final").append("<h1>Felicidades te has pasado el juego</h1> <br><a href='../index.html'> Volver a la pagina principal </a>");
                    array[i].score = array[i].score + score;
                    localStorage.setItem("jugador", JSON.stringify(array));
                    return;
                }
            }

            localStorage.setItem("jugador", JSON.stringify(array));
            Juego();
            return;
        }, 4000);
    }
    if (poderes == true) {
        intervalo = setTimeout(function () {
            poderes = false;
            fantasmas.forEach(e => {
                e.animations.play('malo');
            });
        }, 10000);

    }
    game.physics.arcade.overlap(comecocos, bolasPoder, poder, null, this);
    game.physics.arcade.collide(comecocos, layer);
    game.physics.arcade.collide(fantasmas, layer);
    game.physics.arcade.overlap(fantasmas, comecocos, perder, null, this);
    //funcion que hace el movimiento del usuario.
    Movimiento();
    //Traspaso de mapa
    TraspasoMapa();

}

function TraspasoMapa() {
    if (((comecocos.body.x > 773) && (comecocos.body.x < 785)) && ((comecocos.body.y > 285) && (comecocos.body.y < 300))) {
        comecocos.body.x = 20;
    }
    if ((comecocos.body.x == 0) && ((comecocos.body.y > 285) && (comecocos.body.y < 300))) {
        comecocos.body.x = 750;
        comecocos.body.velocity.y = 0;
        comecocos.body.velocity.x = -150;
        comecocos.animations.play('izquierda');
    }
}

function Movimiento() {
    let noDiagonal = false;

    //Mejorar los controles para que no deje ir en diagonal ///Hecho.
    if ((controles.left.isDown) && (noDiagonal == false)) {
        comecocos.body.velocity.y = 0;
        comecocos.body.velocity.x = -150;
        comecocos.animations.play('izquierda');
        noDiagonal = true;
    }

    if ((controles.right.isDown) && (noDiagonal == false)) {
        comecocos.body.velocity.y = 0;
        comecocos.body.velocity.x = 150;
        comecocos.animations.play('derecha');
        noDiagonal = true;
    }


    if ((controles.up.isDown) && (noDiagonal == false)) {
        comecocos.body.velocity.x = 0;
        comecocos.body.velocity.y = -150;
        comecocos.animations.play('arriba');
        noDiagonal = true;
    }


    if ((controles.down.isDown) && (noDiagonal == false)) {
        comecocos.body.velocity.x = 0;
        comecocos.body.velocity.y = 150;
        comecocos.animations.play('abajo');
        noDiagonal = true;
    }

    //foreach para cambiar la velocidad y la direccion todo el rato.
    fantasmas.forEach(e => {
        e.body.gravity.x = Math.floor(Math.random() * (300 - (-300)) + -300);
        e.body.gravity.y = Math.floor(Math.random() * (300 - (-300)) + -300);
    });

}

/**
 * @param  {} come
 * @param  {} bol
 * @param  {} {if(!poderes
 * @param  {} {bol.kill(
 * @param  {} ;if(intervalo!=null
 * @param  {} {clearInterval(intervalo
 * @param  {} ;}fantasmas.forEach(e=>{e.animations.play('bueno'
 * @param  {} ;}
 * @param  {'+score;}}} ;poderes=true;score+=100;textoScore.text='Score
 * @returns score
 */
function poder(come, bol) {

    if (!poderes) {
        bol.kill();
        if (intervalo != null) {
            clearInterval(intervalo);
        }
        fantasmas.forEach(e => {
            e.animations.play('bueno');
        });
        poderes = true;
        score += 100;
        textoScore.text = 'Score: ' + score;
    }

    //Que hara cuando coja la estrella.
}
/**
 * @param  {} {if(map.getTile(layer.getTileX(comecocos.x
 * @param  {} layer.getTileY(comecocos.y
 * @param  {} layer[4]
 * @param  {} !=null
 * @param  {} {map.putTile(-1
 * @param  {} layer.getTileX(comecocos.x
 * @param  {} layer.getTileY(comecocos.y
 * @param  {'+score;}}} ;score+=10;textoScore.text='Score
 * @returns score
 */
function comprueba() {
    if (map.getTile(layer.getTileX(comecocos.x), layer.getTileY(comecocos.y), layer[4]) != null) {
        music = game.add.audio('comida');
        music.play();
        map.putTile(-1, layer.getTileX(comecocos.x), layer.getTileY(comecocos.y));
        score += 10;
        textoScore.text = 'Score: ' + score;
    }
}
/**
 * @param  {} come
 * @param  {} fant
 * @param  {} {if(poderes==false
 * @param  {} {come.kill(
 * @param  {} ;for(variinarray
 * @param  {} {if(array[i].nickname==jugadorActual
 * @param  {} {array[i].score=score;}}localStorage.setItem("jugador"
 * @param  {} JSON.stringify(array
 * @param  {} ;game.paused=true;textoGameOver=game.add.text(300
 * @param  {} 300
 * @param  {} 'GameOver'
 * @param  {'50px'} {fontSize
 * @param  {'#fff'}} fill
 */
function perder(come, fant) {

    if (poderes == false) {
        music = game.add.audio('muerte');
        music.play();
        come.kill();
        for (var i in array) {
            if (array[i].nickname == jugadorActual) {
                array[i].score = score;
            }
        }
        localStorage.setItem("jugador", JSON.stringify(array));
        textoGameOver = game.add.text(130, 300, 'Game Over, Volver al menu principal', {
            fontSize: '30px',
            fill: '#fff'
        });

    } else {
        music = game.add.audio('comefantasmas');
        music.play();
        score += 300;
        textoScore.text = 'Score: ' + score;
        fant.kill();
    }

}