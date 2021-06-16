class Disparo extends Elemento {
  constructor(props) {
    super(props);
    this.danio = props.danio || 10;
    this.direccion = props.direccion;
    this.step = props.step || 10;
  }
  get posicion() {
    switch(this.direccion) {
      case 'up':
        this.posY -= this.step;
        break;
      case 'down':
        this.posY += this.step;
        break;
      case 'left':
        this.posX -= this.step;
        break;
      case 'right':
        this.posX += this.step;
        break;
    }
    return [ this.posX, this.posY ];
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
}