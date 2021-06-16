const BULLET_SIZE = 20;
class Enemigo extends Elemento {
  constructor(props) {
    super(props);
    this.vida = props.vida || 100;
    this.invulnerable = props.invulnerable || false;
    this.estaArmado = props.estaArmado || false;
    this.puedeDisparar = props.puedeDisparar || true;
    this.intervaloDisparo = props.intervaloDisparo || 2;
    this.direccion = props.direccion || 'right';
  }
  
  recibirDanio (danio) {
    if (!this.invulnerable) this.vida -= danio;
  }

  generateDisparo(bullet) {
    let disparo;
    if (this.puedeDisparar) {
      const [ posX, posY ] = this.center;
      disparo = new Disparo({
        direccion: this.direccion,
        posX: posX - (BULLET_SIZE / 2),
        posY: posY - (BULLET_SIZE / 2),
        sizeX: BULLET_SIZE,
        sizeY: BULLET_SIZE,
        image: bullet.default,
        views: bullet,
      });
      this.puedeDisparar = false;
      setTimeout(() => {
        this.puedeDisparar = true;
      }, this.intervaloDisparo * 1000)
    }
    return disparo;
  }
  get currentImage() {
    if (!this.estaArmado) return this.image;
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