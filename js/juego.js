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
var layerdos;
var array;
var nivelactual;

function boot() {
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    game.scale.setUserScale(game.Metrics.scaleX, game.Metrics.scaleY);
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
}

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
    for(var i in array){
        if(array[i].nickname==jugadorActual){
           nivelactual= array[i].level;
           score= array[i].score;
        }
    }


    // Aqui se cargaran los sprites.
    game.load.image('fondo', '../imagenes/fondo.png');
    game.load.spritesheet('comecocos', '../imagenes/sprite-comecocos.png', 24, 24);

    //Falta agregar los mapas por completo.
    if(nivelactual==0){
        game.load.tilemap('map', '../assets/level1.csv');
    }
     else{
         if(nivelactual==1){
             game.load.tilemap('map', '../assets/level2.csv');
         }else{
             game.load.tilemap('map', '../assets/level1.csv');
         }
     }

    game.load.image('tileset', '../assets/tileset.png');

    //Enemigos.
    game.load.spritesheet('fantasmas', '../imagenes/sprite-fantasma.png', 20, 18 );
    

    //Mancuerna.
    game.load.image('mancuerna', '../imagenes/mancuerna.png');

}

function create() {

    //Aqui se agregan todos los sprites.
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //Se agrega el fondo.
    game.add.sprite(0, 0, 'fondo');
    map = game.add.tilemap('map', 32, 32);
    map.addTilesetImage('tileset');
    layer = map.createLayer(0);
    layer.resizeWorld();
    map.setCollision(0);
    map.setTileIndexCallback(4, comprueba, this);//Buscar para sumar puntos.


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

var poderes=false;
function update() {

    //Colisiones
    //Tiempo del poder.

    if(((score>2000) && (nivelactual==0)) || ((score>4500) && (nivelactual==1))){
        game.paused=true;
        textoGanar = game.add.text(50, 350, 'Has ganado este nivel, preparate para el siguiente', {
            fontSize: '25px',
            fill: '#fff'
        });
        setTimeout( function () {
            $("canvas").remove();
            game="";
            for(var i in array){

                if(array[i].nickname==jugadorActual){
                    array[i].level=array[i].level+1;
                    array[i].score=array[i].score+score;
                }
                if((array[i].level>=2) && (array[i].nickname==jugadorActual)){
                    
                    $(".final").append("<h1>Felicidades te has pasado el juego</h1> <br><a href='../index.html'> Volver a la pagina principal </a>");
                    array[i].level=array[i].level+1;
                    array[i].score=array[i].score+score;
                    return;
                }
            }
            
            localStorage.setItem("jugador", JSON.stringify(array));
            Juego();
            return;
        },4000);
    }
    if(poderes==true){
        setTimeout(function(){
            poderes=false;
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


function poder(come, bol) {

    if(!poderes){
        bol.kill();
        fantasmas.forEach(e => {
            e.animations.play('bueno');
        });
        poderes=true;
        score += 100;
        textoScore.text = 'Score: ' + score;
    }

    //Que hara cuando coja la estrella.
}

function comprueba() {
        if(map.getTile(layer.getTileX(comecocos.x), layer.getTileY(comecocos.y), layer[4])!=null){
            
            map.putTile(-1, layer.getTileX(comecocos.x), layer.getTileY(comecocos.y));
            score += 10;   
            textoScore.text = 'Score: ' + score;     
        }
}

function perder(come, fant) {

    if(poderes==false){
        come.kill();
        for(var i in array){
            if(array[i].nickname== jugadorActual){
                array[i].score = score;
            }
        }
        localStorage.setItem("jugador", JSON.stringify(array));
        game.paused=true;
        textoGameOver = game.add.text(300, 300, 'Game Over', {
            fontSize: '50px',
            fill: '#fff'
        });
        
    }else{
    score += 300;
    textoScore.text = 'Score: ' + score;
        fant.kill();
    }
   
}

//Falta ver porque no colisiona con el borde.