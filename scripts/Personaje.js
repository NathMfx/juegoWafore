const TIPOS_ARMA = {
  espada: 'sword',
  pistola: 'gun',
};

class Personaje extends Elemento {
  constructor(props) {
    super(props)
    this.maxWidth = props.maxWidth;
    this.maxHeight = props.maxHeight;
    this.step = props.step;
    this.vida = 3;
    this.direccion = 'down';
    this.puedomover = true;
    this.esInvulnerable = false;
    this.swordDirection = "rignt";    
    this.tipoArma = TIPOS_ARMA.pistola;
  }
  invulnerable() {
    this.esInvulnerable = true;
    setTimeout(() => {
      this.esInvulnerable = false;
    }, 1500)
  }
  switchArma() {
    if (this.tipoArma === TIPOS_ARMA.pistola) {
      this.tipoArma = TIPOS_ARMA.espada;
    } else {
      this.tipoArma = TIPOS_ARMA.pistola;
    }
  }
  move(direction, step) {
    const { posX, posY } = this.nextPosition(direction, step);
    this.posX = posX;
    this.posY = posY;
    switch (direction) {
      case LEFT_ARROW:
        this.direccion = 'left';
        break;
      case RIGHT_ARROW:
        this.direccion = 'right';
        break;
      case UP_ARROW:
        this.direccion = 'up';
        break;
      case DOWN_ARROW:
        this.direccion = 'down';
        break;
    
      default:
        break;
    }
  }
  get currentImage() {
    switch(this.direccion) {
      case 'up':
        return this.views.up || this.image;
      case 'down':
        return this.views.down || this.image;
      case 'left':
        return this.views.left || this.image;
      case 'right':
        return this.views.right || this.image;
      default:
        return this.image;
    }
  }
  lostALife(){
    if (this.vida > 0){
      this.vida -= 1;
    }
  }
  nextPosition(direction, step) {
    const stepSize = step || this.step;
    const newPosition = { posX: this.posX, posY: this.posY };
    switch (direction) {
      case LEFT_ARROW:
        newPosition.posX = Math.max(this.posX - stepSize, 0);
        break;
      case RIGHT_ARROW:
        newPosition.posX = Math.min(this.posX + stepSize, this.maxWidth - this.sizeX);
        break;
      case UP_ARROW:
        newPosition.posY = Math.max(this.posY - stepSize, 0);
        break;
      case DOWN_ARROW:
        newPosition.posY = Math.min(this.posY + stepSize, this.maxHeight - this.sizeY);
        break;
    
      default:
        break;
    }
    return newPosition
  }
  nextApexes(direction, step) {
    const { posX, posY } = this.nextPosition(direction, step)
    return [
      [posX, posY],
      [posX + this.sizeX, posY],
      [posX + this.sizeX, posY + this.sizeY],
      [posX, posY + this.sizeY],
    ]
  }
}