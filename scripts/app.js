const STEP_SIZE = 20;
const MAX_WIDTH = 1200;
const MAX_HEIGHT = 700;
const SPACE = 32;
const KEYS = {
  W: 87,
  A: 65,
  S: 83,
  D: 68,
  E: 69,
  F: 70,
  SPACE: 32,
}
let MOVE_CHARACTER = false;
const CHEAT_CODE = "brrr";
let cheat = ""
const images = {};
const personaje = new Personaje({
  maxWidth: MAX_WIDTH,
  maxHeight: MAX_HEIGHT,
  step: STEP_SIZE,
  sizeX: 40,
  sizeY: 40,
  posX: 0,
  posY: 0,
});
let juego = new Juego({ personaje });

let button;

function preload() {
  images.palancaOff = loadImage('./assets/palanca1.png');
  images.palancaOn = loadImage('./assets/palanca2.png');
  images.heart = loadImage('./assets/heart.png');
  images.key = loadImage('./assets/bigkey.png');
  images.gem = loadImage('./assets/bigdiamond.png');
  images.bullet = {
    default: loadImage('./assets/ataque_derecha.png'),
    up: loadImage('./assets/ataque_arriba.png'),
    down: loadImage('./assets/ataque_abajo.png'),
    left: loadImage('./assets/ataque_izquierda.png'),
    right: loadImage('./assets/ataque_derecha.png'),
  }
  images.enemy_one = {
    default: loadImage('./assets/enemigo_derecha.png'),
    left: loadImage('./assets/enemigo_izquierda.png'),
    right: loadImage('./assets/enemigo_derecha.png'),
  }
  images.enemy_bullet = {
    default: loadImage('./assets/ataque_enemigo_derecha.png'),
    up: loadImage('./assets/ataque_enemigo_arriba.png'),
    down: loadImage('./assets/ataque_enemigo_abajo.png'),
    left: loadImage('./assets/ataque_enemigo_izquierda.png'),
    right: loadImage('./assets/ataque_enemigo_derecha.png'),
  }
  images.hint = loadImage('./assets/antorcha.png');
  images.hint1View = loadImage('./assets/pista1.png');
  images.hint2View = loadImage('./assets/pista2.png');
  images.hint3View = loadImage('./assets/pista3.png');
  images.hint4View = loadImage('./assets/pista4.png');
  images.swordRight = loadImage('./assets/swordRight.png');
  images.swordUp = loadImage('./assets/swordUp.png');
  images.swordDown = loadImage('./assets/swordDown.png');
  images.swordLeft = loadImage('./assets/swordLeft.png');
  images.empty = loadImage('./assets/empty.png');
  images.bg1 = loadImage('./assets/Level1BG.png');
  images.bg2 = loadImage('./assets/Level2BG.png');
  images.bg3 = loadImage('./assets/Level3BG.png');
  images.bg4 = loadImage('./assets/Level4BG.png');
  images.skullright = loadImage('./assets/skullright.png');
  images.skullleft = loadImage('./assets/skullleft.png');
  images.door = loadImage('./assets/door.png');
  images.gameover = loadImage('./assets/gameover.png');
  images.startimage = loadImage('./assets/startimage.png');
  images.menu = loadImage('./assets/menu.jpeg');
  images.options = loadImage('./assets/opciones.jpeg');
  images.howtoplay = loadImage('./assets/howtoplay.jpeg');
  images.collectionBG = loadImage('./assets/collectionBG.png');
  images.win = loadImage('./assets/win.png');
}

function setup() {
  juego.personaje.image = loadImage('./assets/fuego_abajo.png');
  juego.personaje.views = {
    up: loadImage('./assets/fuego_arriba.png'),
    down: loadImage('./assets/fuego_abajo.png'),
    left: loadImage('./assets/fuego_izquierda.png'),
    right: loadImage('./assets/fuego_derecha.png'),
  }
  juego.addPantalla(generarPantalla(1));
  juego.addPantalla(generarPantalla(2));
  juego.addPantalla(generarPantalla(3));
  juego.addPantalla(generarPantalla(4));
  juego.addEscenario(generarEscenario(1));
  juego.addEscenario(generarEscenario(2));
  juego.addEscenario(generarEscenario(3));
  juego.addEscenario(generarEscenario(4));
  juego.addEscenario(generarEscenario(5));
  
  createCanvas(MAX_WIDTH, MAX_HEIGHT);
  frameRate(25);
}

function showLife(){
  if(juego.escenario == 1){
    for(let i = 1; i <= juego.personaje.vida; i++){
      image(images.heart,1130-(20 * i), 110, 20, 20);
    }
  }
  if (juego.escenario == 2 || juego.escenario == 3 || juego.escenario == 4 ){
    for(let i = 1; i <= juego.personaje.vida; i++){
      image(images.heart,1130-(20 * i), 100, 20, 20);
    }
  }
  if(juego.personaje.vida == 0){
    image(images.gameover,0, 0, MAX_WIDTH, MAX_HEIGHT);
  }
}

function weaponInUse(){
  if(juego.personaje.tipoArma == TIPOS_ARMA.pistola){
    image(images.bullet.right,1080, 140, 30, 30);
  }
  if(juego.personaje.tipoArma == TIPOS_ARMA.espada){
    image(images.swordRight,1065, 130, 60, 60);
  }
}
function keysInInventory(){


if (juego.escenario == 2){
  image(images.collectionBG,0, 55, 200, 100);
  for(let i = 1; i <= juego.collection; i++){
    image(images.key,0+(20 * i), 80, 20, 20);
  }
  
}
if (juego.escenario == 3 || juego.escenario == 4 ||  juego.escenario == 1 ){
  image(images.collectionBG,0, 55, 200, 100);
  for(let i = 1; i <= juego.collection; i++){
    image(images.key,0+(20 * i), 80, 20, 20);
  }
}

}
  
function gemsInInventory(){
  if (juego.escenario == 2 ){
    for(let i = 1; i <= juego.gemas; i++){      
      image(images.gem,0+(20 * i), 110, 20, 20);
    }
  }
  if (juego.escenario == 3 || juego.escenario == 4  || juego.escenario == 1){
   
    for(let i = 1; i <= juego.gemas; i++){
      image(images.gem,0+(20 * i), 110, 20, 20);
    }

  }
}

function generateApexes(posX, posY, sizeX, sizeY) {
  return [
    [posX, posY],
    [posX + sizeX, posY],
    [posX + sizeX, posY + sizeY],
    [posX, posY + sizeY],
  ]
}

function generateSword(posicion = 'right') {
  switch(posicion) {
    case 'right':
      return [images.swordRight, juego.personaje.posX + 37, juego.personaje.posY -10, 75, 75]
    case 'up':
      return [images.swordUp, juego.personaje.posX -15, juego.personaje.posY -70, 90, 90]
    case 'left':
      return [images.swordLeft, juego.personaje.posX - 70, juego.personaje.posY -15 , 90, 90]
    case 'down':
      return [images.swordDown, juego.personaje.posX -20, juego.personaje.posY +37, 75, 75]
  }
}

function checkSword() {
  if (keyIsDown(SPACE) && juego.personaje.tipoArma == TIPOS_ARMA.espada) {
    const [imagen, posX, posY, sizeX, sizeY] = generateSword(juego.personaje.swordDirection);
    image(imagen, posX, posY, sizeX, sizeY);
    juego.personaje.puedomover = false;
  }
}

function keyReleased() {
  if (keyCode === KEYS.SPACE && juego.personaje.tipoArma == TIPOS_ARMA.espada) {
    juego.personaje.puedomover = true;
  }
}

function checkShootsCollisions() {
  const escenario = juego.escenarioActivo;
  for (const disparo of escenario.disparos) {
    for (const muro of escenario.muros) {
      if (muro.collide(disparo.apexes)) {
        escenario.removeDisparo(disparo);
      }
    }
    for (const activable of escenario.activables) {
      if (!activable.onCollide && activable.collide(disparo.apexes)) {
        escenario.removeDisparo(disparo);
      }
    }
    for (const enemigo of escenario.enemigos) {
      if (enemigo.collide(disparo.apexes)) {
        enemigo.recibirDanio(disparo.danio);
        if (enemigo.vida <= 0) {
          escenario.removeEnemigo(enemigo);
        }
        escenario.removeDisparo(disparo);
      }
    }
    if (disparo.posX >= MAX_WIDTH || disparo.posY >= MAX_HEIGHT
      || (disparo.posX + disparo.sizeX) <= 0 || (disparo.posY + disparo.sizeY) <= 0) {
      escenario.removeDisparo(disparo);
    }
  }
}

function checkEnemyShootsCollisions() {
  const escenario = juego.escenarioActivo;
  for (const disparo of escenario.disparosEnemigos) {
    for (const muro of escenario.muros) {
      if (muro.collide(disparo.apexes)) {
        escenario.removeDisparoEnemigo(disparo);
      }
    }
    for (const activable of escenario.activables) {
      if (!activable.onCollide && activable.collide(disparo.apexes)) {
        escenario.removeDisparoEnemigo(disparo);
      }
    }
    if (disparo.collide(juego.personaje.apexes)) {
      escenario.removeDisparoEnemigo(disparo);
      juego.personaje.lostALife();
    }
    if (disparo.posX >= MAX_WIDTH || disparo.posY >= MAX_HEIGHT) {
      escenario.removeDisparoEnemigo(disparo);
    }
  }
}

function checkCharacterCollisions(direction, step) {
  const escenario = juego.escenarioActivo;
  for (const elemento of escenario.muros) {
    if (elemento.collide(juego.personaje.nextApexes(direction, step))) return false;
  }
  for (const elemento of escenario.activables) {
    if (elemento.onCollide) {
      if (elemento.collide(juego.personaje.apexes)) elemento.onCollide();
    } else {
      if (elemento.collide(juego.personaje.nextApexes(direction, step))) {
        return false
      };
    }
  }
  for (const elemento of escenario.enemigos) {
    if (elemento.collide(personaje.nextApexes(direction, step))) {
      if (!juego.personaje.esInvulnerable) {
        juego.personaje.lostALife();
        juego.personaje.invulnerable();
      }
      return true;
    }
  }
  return true;
}

function executeMove(direction) {
  if(juego.personaje.puedomover == false){
    return;
  }
  if(juego.personaje.vida == 0){
    return;
  }
  if (checkCharacterCollisions(direction)) {
    juego.personaje.move(direction);
  } else {
    let step = STEP_SIZE;
    do {
      step -= 1;
    } while (!checkCharacterCollisions(direction, step) && step >= 0)
    if (step > 0) juego.personaje.move(direction, step);
  }
}

function getMouseDirection() {
  const [ x1, y1 ] = juego.personaje.center;
  const [ x2, y2 ] = [ mouseX, mouseY ];
  let direccion = '';
  const pendiente = (y2 - y1) / (x2 - x1);
  if (pendiente > - 1 && pendiente < 1) {
    if (x2 < x1) direccion = 'left'
    else direccion = 'right'
  } else {
    if (y2 < y1) direccion = 'up'
    else direccion = 'down'
  }
  return direccion;
}

function executeShot() {
  if (juego.personaje.vida == 0) {
    return;
  }
  if (juego.personaje.tipoArma == TIPOS_ARMA.pistola) {
    const direccion = getMouseDirection();
  
    juego.escenarioActivo.addDisparo(new Disparo({
      posX: juego.personaje.posX,
      posY: juego.personaje.posY,
      sizeX: 40,
      sizeY: 40,
      danio: 10,
      image: images.bullet.default,
      views: images.bullet,
      direccion,
    }));
  } else {
    const direccion = getMouseDirection();
    juego.personaje.swordDirection = direccion;
    const swordApexes = generateApexes(...generateSword(direccion).slice(1));
    const escenario = juego.escenarioActivo;
    for (const enemigo of escenario.enemigos) {
      if (enemigo.collide(swordApexes)) {
        enemigo.recibirDanio(18);
        if (enemigo.vida <= 0) {
          escenario.removeEnemigo(enemigo);
        }
      }
    }
  }
}

function checkPress() {
  if (juego.personaje.puedomover) {
    if (keyIsDown(KEYS.A)) {
      executeMove(LEFT_ARROW);
    }
    if (keyIsDown(KEYS.D)) {
      executeMove(RIGHT_ARROW);
    }
    if (keyIsDown(KEYS.W)) {
      executeMove(UP_ARROW);
    }
    if (keyIsDown(KEYS.S)) {
      executeMove(DOWN_ARROW);
    }
  }
}

function checkInteractions() {
  const escenario = juego.escenarioActivo;
  for (const activable of escenario.activables) {
    if (activable.isAside(juego.personaje.apexes) && activable.onInteraction)
      activable.onInteraction();
  }
}

function checkPressEnergy() {
  if (keyIsDown(LEFT_ARROW) && keyIsDown(SPACE)) {
    executeMoveEnergy(LEFT_ARROW);
  }
  if (keyIsDown(RIGHT_ARROW) && keyIsDown(SPACE)) {
    executeMoveEnergy(RIGHT_ARROW);
  }
  if (keyIsDown(UP_ARROW) && keyIsDown(SPACE)) {
    executeMoveEnergy(UP_ARROW);
  }
  if (keyIsDown(DOWN_ARROW) && keyIsDown(SPACE)) {
    executeMoveEnergy(DOWN_ARROW);
  }
}

function keyTyped() {
  if (juego.escenario === 0) {
    if (juego.pantalla === 1 || juego.pantalla !== 2) {
      juego.pantalla = 2;
      return;
    }
  } else {
    if (juego.escenario === 5 || juego.personaje.vida === 0) {
      location.reload();
    }
    switch(keyCode) {
      case KEYS.E:
        checkInteractions();
        break;
      case KEYS.SPACE:
        if (juego.personaje.puedomover) executeShot(juego.personaje.direccion);
        break;
      case KEYS.F:
        if (juego.personaje.puedomover) changeWeapon();
      break; 
    }
  }
  if (key === 'q') {
    cheat = '';
    MOVE_CHARACTER = false;
  } else {
    cheat += key;
  }
  if (cheat === CHEAT_CODE) {
    MOVE_CHARACTER = true;
  }
}

function mousePressed() {
  if (MOVE_CHARACTER) {
    juego.personaje.posX = mouseX;
    juego.personaje.posY = mouseY;
  }
  if (juego.escenario === 0) {
    for (const activable of juego.pantallaActiva.activables) {
      if (activable.click([mouseX, mouseY]) && activable.onClick)
        activable.onClick();
    }
  }
}
function changeWeapon (){
    if (personaje.tipoArma == TIPOS_ARMA.pistola) {
      personaje.tipoArma = TIPOS_ARMA.espada;
    } else {
      personaje.tipoArma = TIPOS_ARMA.pistola;
    }
}
function generateBg(){
  if (juego.escenario == 0) {
    switch (juego.pantalla) {
      case 1:
        background(images.startimage);
        break;
      case 2:
        background(images.menu);
        break;
      case 3:
        background(images.howtoplay);
        break;
      case 4:
        background(images.options);
        break;
    }
    return;
  }
  switch(juego.escenario) {
    case 1:
      background(images.bg1);
      break;
    case 2:
      background(images.bg2);
      break;
    case 3:
      background(images.bg3);
      break;
    case 4:
      background(images.bg4);
      break;
    case 5:
      background(images.win);
      break;
  }
}
function draw() {
  generateBg();
  keysInInventory();
  gemsInInventory();
  if (juego.escenario === 0) {
    const pantalla = juego.pantallaActiva;
    generateBg();
    for (const elemento of pantalla.activables) {
      image(elemento.image, elemento.posX, elemento.posY, elemento.sizeX, elemento.sizeY);
    }
  } else {
    if (juego.escenario === 5) return;
    checkShootsCollisions();
    checkEnemyShootsCollisions();
    const escenario = juego.escenarioActivo;
    for (const elemento of escenario.activables) {
      image(elemento.image, elemento.posX, elemento.posY, elemento.sizeX, elemento.sizeY);
    }
    for (const elemento of escenario.muros) {
      image(elemento.image, elemento.posX, elemento.posY, elemento.sizeX, elemento.sizeY);
    }
    for (const elemento of escenario.enemigos) {
      image(elemento.currentImage, elemento.posX, elemento.posY, elemento.sizeX, elemento.sizeY);
      if (elemento.estaArmado) {
        const newDisparo = elemento.generateDisparo(images.enemy_bullet);
        if (newDisparo) escenario.addDisparoEnemigo(newDisparo);
      }
    }
    for (const elemento of escenario.disparos) {
      const [ posX, posY ] = elemento.posicion;
      image(elemento.currentImage, posX, posY, elemento.sizeX, elemento.sizeY);
    }
    for (const elemento of escenario.disparosEnemigos) {
      const [ posX, posY ] = elemento.posicion;
      image(elemento.currentImage, posX, posY, elemento.sizeX, elemento.sizeY);
    }
    fill('red');
    circle(mouseX, mouseY, 10);
    image(juego.personaje.currentImage, juego.personaje.posX, juego.personaje.posY, juego.personaje.sizeX, juego.personaje.sizeY);
    checkPress();
    checkSword();
    weaponInUse();
    showLife();

    if (escenario.pista) {
      image(escenario.pista.image, escenario.pista.posX, escenario.pista.posY, escenario.pista.sizeX, escenario.pista.sizeY);
    }
  }
}

function generarEscenario(level) {
  if (level === 1) {
    const escenario = new Escenario();
    // Muros
    escenario.addMuro(new Elemento({ posX: 260, posY: 0, sizeX: 50, sizeY: 480, image: images.empty }));
    escenario.addMuro(new Elemento({ posX: 800, posY: 220, sizeX: 50, sizeY: 200, image: images.empty }));
    escenario.addMuro(new Elemento({ posX: 290, posY: 180, sizeX: 9200, sizeY: 50, image: images.empty }));
    escenario.addMuro(new Elemento({ posX: 550, posY: 650, sizeX: 650, sizeY: 50, image: images.empty }));
    escenario.addMuro(new Elemento({ posX: 520, posY: 500, sizeX: 50, sizeY: 200, image: images.empty }));

    // Activables
    escenario.addActivable(new Activable({ posX: 1100, posY: 400, sizeX: 100, sizeY: 100, image: images.door, onCollide: function () {
      if (escenario.puedeFinalizar()) juego.nextLevel();
    }}));
    escenario.addActivable(new Activable({ posX: 777, posY: 450, sizeX: 50, sizeY: 50, image: images.key, onCollide:function () {
      juego.collection += 1;
      escenario.removeActivable(this);
    }}));
    escenario.addActivable(new Activable({ posX: 265, posY: 490, sizeX: 50, sizeY: 50, image: images.gem, onCollide:function () {
      juego.gemas += 1;
      escenario.removeActivable(this);
    }}));
    escenario.addActivable(new Activable({ posX: 570, posY: 600, sizeX: 50, sizeY: 50, image: images.palancaOff,
      onInteraction: function() {
        this.image = images.palancaOn;
        escenario.puedeFinalizar = function () {
          return this.enemigos.length === 0;
        };
      }
    }));
    escenario.addActivable(new Activable({ posX: 30, posY: 630, sizeX: 30, sizeY: 50, image: images.hint,
      onInteraction: function() {
        if(escenario.pista){
          escenario.pista = null;
          juego.personaje.puedomover = true;
        }
        else {
          juego.personaje.puedomover = false;
          escenario.pista = new Elemento({ posX: 200, posY: 100, sizeX: MAX_WIDTH - 400, sizeY: MAX_HEIGHT - 200, image: images.hint1View })  
        }                      
      }
    }));

    // Enemigos
    escenario.addEnemigo(new Enemigo({ posX: 1000, posY: 570, sizeX: 80, sizeY: 80, image: images.enemy_one.default, views: images.enemy_one, vida: 40, estaArmado: true, direccion: 'left' }));
    escenario.addEnemigo(new Enemigo({ posX: 420, posY: 600, sizeX: 80, sizeY: 80, image: images.skullleft }));
    escenario.addEnemigo(new Enemigo({ posX: 510, posY: 420, sizeX: 80, sizeY: 80, image: images.enemy_one.default, views: images.enemy_one, vida: 40, estaArmado: true, direccion: 'right' }));
    escenario.addEnemigo(new Enemigo({ posX: 720, posY: 250, sizeX: 80, sizeY: 80, image: images.skullleft }));

    return escenario;
  }

  if( level === 2){
    const escenario = new Escenario();
    escenario.puedeFinalizar = function () {
      return this.enemigos.filter(e => !e.invulnerable).length === 0;
    };
    escenario.addMuro(new Elemento({ posX: 275, posY: 88, sizeX: 135, sizeY: 130, image: images.empty }));
    escenario.addMuro(new Elemento({ posX: 520, posY: 254, sizeX: 135, sizeY: 130, image: images.empty }));
    escenario.addMuro(new Elemento({ posX: 1020, posY: 254, sizeX: 135, sizeY: 130, image: images.empty }));
    escenario.addMuro(new Elemento({ posX: 760, posY: 416, sizeX: 135, sizeY: 130, image: images.empty }));
    escenario.addMuro(new Elemento({ posX: 65, posY: 570, sizeX: 135, sizeY: 130, image: images.empty }));
    escenario.addMuro(new Elemento({ posX: 515, posY: 570, sizeX: 135, sizeY: 130, image: images.empty }));
    escenario.addMuro(new Elemento({ posX: 51, posY: 255, sizeX: 135, sizeY: 130, image: images.empty }));

    escenario.addActivable(new Activable({ posX: 440, posY: 420, sizeX: 30, sizeY: 50, image: images.hint,
      onInteraction: function() {
        if(escenario.pista){
          escenario.pista = null;
          juego.personaje.puedomover = true;
        }
        else {
          juego.personaje.puedomover = false;
          escenario.pista = new Elemento({ posX: 200, posY: 100, sizeX: MAX_WIDTH - 400, sizeY: MAX_HEIGHT - 200, image: images.hint2View })  
        }                      
      }
    }));
    escenario.addActivable(new Activable({ posX: 550, posY: 0, sizeX: 100, sizeY: 100, image: images.door, 
      onCollide: () => {
        if (escenario.puedeFinalizar()) juego.nextLevel();
      }
    }));

    escenario.addEnemigo(new Enemigo({ posX: 400, posY: 600, sizeX: 100, sizeY: 100, image: images.door, invulnerable: true }));
    escenario.addEnemigo(new Enemigo({ posX: 0, posY: 390, sizeX: 100, sizeY: 100, image: images.door, invulnerable: true }));
    escenario.addEnemigo(new Enemigo({ posX: 1100, posY: 400, sizeX: 100, sizeY: 100, image: images.door, invulnerable: true }));

    escenario.addEnemigo(new Enemigo({ posX: 300, posY: 400, sizeX: 100, sizeY: 100, image: images.skullleft }));
    escenario.addEnemigo(new Enemigo({ posX: 400, posY: 300, sizeX: 100, sizeY: 100, image: images.skullleft }));
    escenario.addEnemigo(new Enemigo({ posX: 500, posY: 400, sizeX: 100, sizeY: 100, image: images.skullleft }));
    escenario.addEnemigo(new Enemigo({ posX: 1100, posY: 525, sizeX: 100, sizeY: 100, image: images.enemy_one.default, views: images.enemy_one, vida: 40, estaArmado: true, direccion: 'left', intervaloDisparo: 2.5 }));
    escenario.addEnemigo(new Enemigo({ posX: 900, posY: 20, sizeX: 100, sizeY: 100, image: images.enemy_one.default, views: images.enemy_one, vida: 40, estaArmado: true, direccion: 'left', intervaloDisparo: 2.5 }));

    escenario.addActivable(new Activable({ posX: 0, posY: 600, sizeX: 50, sizeY: 50, image: images.key, onCollide:function () {
      juego.collection += 1;
      escenario.removeActivable(this);
    }}));
    escenario.addActivable(new Activable({ posX: 900, posY: 600, sizeX: 50, sizeY: 50, image: images.gem, onCollide:function () {
      juego.gemas += 1;
      escenario.removeActivable(this);
    }}));

    return escenario;
  }
  if (level === 3) {
    const escenario = new Escenario();
    escenario.puedeFinalizar = function () {
      return this.enemigos.length === 0;
    };
    escenario.addMuro(new Elemento({ posX: 150, posY: 0, sizeX: 815, sizeY: 50, image: images.empty }));

    escenario.addMuro(new Elemento({ posX: 215, posY: 162, sizeX: 237, sizeY: 50, image: images.empty }));
    escenario.addMuro(new Elemento({ posX: 523, posY: 162, sizeX: 233, sizeY: 50, image: images.empty }));
    escenario.addMuro(new Elemento({ posX: 705, posY: 162, sizeX: 50, sizeY: 410, image: images.empty}));
    escenario.addMuro(new Elemento({ posX: 215, posY: 162, sizeX: 50, sizeY: 355, image: images.empty}));
    escenario.addMuro(new Elemento({ posX: 215, posY: 290, sizeX: 400, sizeY: 50, image: images.empty }));
    escenario.addMuro(new Elemento({ posX: 570, posY: 290, sizeX: 50, sizeY: 300, image: images.empty}));
    escenario.addMuro(new Elemento({ posX: 349, posY: 420, sizeX: 270, sizeY: 50, image: images.empty }));
    escenario.addMuro(new Elemento({ posX: 349, posY: 550, sizeX: 270, sizeY: 50, image: images.empty }));

    escenario.addMuro(new Elemento({ posX: 0, posY: 171, sizeX: 40, sizeY: 86, image: images.empty}));
    escenario.addMuro(new Elemento({ posX: 175, posY: 315, sizeX: 40, sizeY: 86, image: images.empty }));
    escenario.addMuro(new Elemento({ posX: 0, posY: 430, sizeX: 40, sizeY: 86, image: images.empty }));

    escenario.addMuro(new Elemento({ posX: 1059, posY: 190, sizeX: 140, sizeY: 50, image: images.empty }));
    escenario.addMuro(new Elemento({ posX: 750, posY: 310, sizeX: 185, sizeY: 50, image: images.empty }));
    escenario.addMuro(new Elemento({ posX: 1059, posY: 440, sizeX: 185, sizeY: 50, image: images.empty }));
    escenario.addMuro(new Elemento({ posX: 760, posY: 522, sizeX: 185, sizeY: 50, image: images.empty }));
    escenario.addMuro(new Elemento({ posX: 1059, posY: 650, sizeX: 185, sizeY: 50, image: images.empty }));

    escenario.addEnemigo(new Enemigo({ posX: 950, posY: 625, sizeX: 75, sizeY: 75, image: images.enemy_one.default, views: images.enemy_one, vida: 40, estaArmado: true, direccion: 'left',intervaloDisparo:2.5 }));
    escenario.addEnemigo(new Enemigo({ posX: 490, posY: 470, sizeX: 75, sizeY: 75, image: images.enemy_one.default, views: images.enemy_one, vida: 40, estaArmado: true, direccion: 'left',intervaloDisparo:2.5 }));
    escenario.addEnemigo(new Enemigo({ posX: 490, posY: 350, sizeX: 75, sizeY: 75, image: images.enemy_one.default, views: images.enemy_one, vida: 40, estaArmado: true, direccion: 'left',intervaloDisparo:2.5 }));
    escenario.addEnemigo(new Enemigo({ posX: 850, posY: 50, sizeX: 75, sizeY: 75, image: images.enemy_one.default, views: images.enemy_one, vida: 40, estaArmado: true, direccion: 'left',intervaloDisparo:2.5 }));
    escenario.addEnemigo(new Enemigo({ posX: 10, posY: 320, sizeX: 60, sizeY: 60, image: images.skullright }));
    escenario.addEnemigo(new Enemigo({ posX: 1050, posY: 300, sizeX: 60, sizeY: 60, image: images.skullleft }));

    escenario.addActivable(new Activable({ posX: 350, posY: 350, sizeX: 50, sizeY: 50, image: images.gem, onCollide:function () {
      juego.gemas += 1;
      escenario.removeActivable(this);
    }}));
    escenario.addActivable(new Activable({ posX: 1150, posY: 300, sizeX: 50, sizeY: 50, image: images.key, onCollide:function () {
      juego.collection += 1;
      escenario.removeActivable(this);
    }}));
    escenario.addActivable(new Activable({ posX: 1130, posY: 550, sizeX: 75, sizeY: 75, image: images.door, onCollide: () => {
      if (escenario.puedeFinalizar()) juego.nextLevel();
    }}));
    escenario.addActivable(new Activable({ posX: 640, posY: 360, sizeX: 30, sizeY: 50, image: images.hint,
      onInteraction: function() {
        if(escenario.pista){
          escenario.pista = null;
          juego.personaje.puedomover = true;
        }
        else {
          juego.personaje.puedomover = false;
          escenario.pista = new Elemento({ posX: 200, posY: 100, sizeX: MAX_WIDTH - 400, sizeY: MAX_HEIGHT - 200, image: images.hint3View })  
        }                      
      }
    }));

    return escenario;
  }

  if (level === 4) {
    const escenario = new Escenario();
    const door = new Enemigo({ posX: 250, posY: 10, sizeX: 50, sizeY: 50, image: images.skullright })    

    escenario.addMuro(new Elemento({ posX: 0, posY: 280, sizeX: 78, sizeY: 420, image: images.empty }));
    escenario.addMuro(new Elemento({ posX: 205, posY: 190, sizeX: 285, sizeY: 78, image: images.empty }));
    escenario.addMuro(new Elemento({ posX: 332, posY: 430, sizeX: 285, sizeY: 78, image: images.empty }));
    escenario.addMuro(new Elemento({ posX: 710, posY: 250, sizeX: 285, sizeY: 78, image: images.empty }));
    escenario.addMuro(new Elemento({ posX: 695, posY: 620, sizeX: 285, sizeY: 78, image: images.empty }));
    escenario.addMuro(new Elemento({ posX: 1120, posY: 220, sizeX: 78, sizeY: 280, image: images.empty }));
    
    escenario.addActivable(new Activable({ posX: 1140, posY: 630, sizeX: 50, sizeY: 50, image: images.palancaOff,
      onInteraction: function() {
        this.image = images.palancaOn;
        escenario.removeEnemigo(door);
        escenario.addActivable(new Activable({ posX: 150, posY: 0, sizeX: 75, sizeY: 75, image: images.door, onCollide: () => {
          juego.nextLevel();
        }}));
      }
    }));
    escenario.addActivable(new Activable({ posX: 470, posY: 290, sizeX: 30, sizeY: 50, image: images.hint,
      onInteraction: function() {
        if(escenario.pista){
          escenario.pista = null;
          juego.personaje.puedomover = true;
        }
        else {
          juego.personaje.puedomover = false;
          escenario.pista = new Elemento({ posX: 200, posY: 100, sizeX: MAX_WIDTH - 400, sizeY: MAX_HEIGHT - 200, image: images.hint4View })  
        }                      
      }
    }));


    escenario.addEnemigo(new Enemigo({ posX: 80, posY: 520, sizeX: 50, sizeY: 50, image: images.skullright }));
    escenario.addEnemigo(new Enemigo({ posX: 180, posY: 390, sizeX: 50, sizeY: 50, image: images.skullleft }));
    escenario.addEnemigo(new Enemigo({ posX: 210, posY: 570, sizeX: 50, sizeY: 50, image: images.skullleft }));
    escenario.addEnemigo(new Enemigo({ posX: 210, posY: 520, sizeX: 50, sizeY: 50, image: images.skullleft }));
    escenario.addEnemigo(new Enemigo({ posX: 210, posY: 470, sizeX: 50, sizeY: 50, image: images.skullleft }));
    escenario.addEnemigo(new Enemigo({ posX: 210, posY: 420, sizeX: 50, sizeY: 50, image: images.skullleft }));
    escenario.addEnemigo(new Enemigo({ posX: 210, posY: 370, sizeX: 50, sizeY: 50, image: images.skullright }));
    escenario.addEnemigo(new Enemigo({ posX: 210, posY: 320, sizeX: 50, sizeY: 50, image: images.skullleft }));
    escenario.addEnemigo(new Enemigo({ posX: 210, posY: 270, sizeX: 50, sizeY: 50, image: images.skullleft }));
    
    escenario.addEnemigo(new Enemigo({ posX: 80, posY: 300, sizeX: 50, sizeY: 50, image: images.skullright }));

    escenario.addEnemigo(new Enemigo({ posX: 100, posY: 0, sizeX: 50, sizeY: 50, image: images.skullright }));
    escenario.addEnemigo(new Enemigo({ posX: 100, posY: 70, sizeX: 50, sizeY: 50, image: images.skullright }));
    escenario.addEnemigo(new Enemigo({ posX: 150, posY: 70, sizeX: 50, sizeY: 50, image: images.skullright }));
    escenario.addEnemigo(new Enemigo({ posX: 200, posY: 70, sizeX: 50, sizeY: 50, image: images.skullright }));
    escenario.addEnemigo(new Enemigo({ posX: 250, posY: 70, sizeX: 50, sizeY: 50, image: images.skullright }));
    escenario.addEnemigo(door);
    
    escenario.addEnemigo(new Enemigo({ posX: 620, posY: 450, sizeX: 50, sizeY: 50, image: images.skullleft, invulnerable: true }));
    escenario.addEnemigo(new Enemigo({ posX: 670, posY: 450, sizeX: 50, sizeY: 50, image: images.skullleft, invulnerable: true }));
    escenario.addEnemigo(new Enemigo({ posX: 720, posY: 450, sizeX: 50, sizeY: 50, image: images.skullleft, invulnerable: true }));
    escenario.addEnemigo(new Enemigo({ posX: 770, posY: 450, sizeX: 50, sizeY: 50, image: images.skullleft, invulnerable: true }));
    escenario.addEnemigo(new Enemigo({ posX: 820, posY: 450, sizeX: 50, sizeY: 50, image: images.skullleft, invulnerable: true }));
    escenario.addEnemigo(new Enemigo({ posX: 870, posY: 450, sizeX: 50, sizeY: 50, image: images.skullleft, invulnerable: true }));
    escenario.addEnemigo(new Enemigo({ posX: 920, posY: 450, sizeX: 50, sizeY: 50, image: images.skullleft, invulnerable: true }));
    escenario.addEnemigo(new Enemigo({ posX: 970, posY: 450, sizeX: 50, sizeY: 50, image: images.skullleft, invulnerable: true }));

    escenario.addEnemigo(new Enemigo({ posX: 1070, posY: 625, sizeX: 50, sizeY: 50, image: images.skullleft, invulnerable: true }));

    escenario.addEnemigo(new Enemigo({ posX: 270, posY: 630, sizeX: 60, sizeY: 60, image: images.enemy_one.default, views: images.enemy_one, vida: 40, estaArmado: true, direccion: 'up', intervaloDisparo: 1.4 }));
    escenario.addEnemigo(new Enemigo({ posX: 1140, posY: 550, sizeX: 60, sizeY: 60, image: images.enemy_one.default, views: images.enemy_one, vida: 40, estaArmado: true, direccion: 'left' }));
    escenario.addEnemigo(new Enemigo({ posX: 600, posY: 40, sizeX: 60, sizeY: 60, image: images.enemy_one.default, views: images.enemy_one, vida: 40, estaArmado: true, direccion: 'down', intervaloDisparo: 1.3 }));
    escenario.addEnemigo(new Enemigo({ posX: 1050, posY: 200, sizeX: 60, sizeY: 60, image: images.enemy_one.default, views: images.enemy_one, vida: 40, estaArmado: true, direccion: 'down', intervaloDisparo: 1.9 }));
    return escenario;
  }

  if(level === 5){
    const escenario = new Escenario();
    return escenario;
  }
  return new Escenario();
}

function generarPantalla(screen) {
  if (screen === 1) {
    const escenario = new Escenario();
    return escenario;
  }
  if (screen === 2) {
    const escenario = new Escenario();
    escenario.addActivable(new Activable({ posX: 718, posY: 320, sizeX: 210, sizeY: 45, image: images.empty, onClick: () => juego.escenario = 1 }))
    escenario.addActivable(new Activable({ posX: 718, posY: 390, sizeX: 210, sizeY: 45, image: images.empty, onClick: () => juego.pantalla = 3 }))
    escenario.addActivable(new Activable({ posX: 718, posY: 460, sizeX: 210, sizeY: 45, image: images.empty, onClick: () => juego.pantalla = 4 }))
    return escenario;
  }
  if (screen === 3) {
    const escenario = new Escenario();
    return escenario;
  }
  if (screen === 4) {
    const escenario = new Escenario();
    return escenario;
  }
}
