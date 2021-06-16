class Escenario {
  constructor() {
    this.muros = [];
    this.activables = [];
    this.disparos = [];
    this.enemigos = [];
    this.disparosEnemigos = [];
    this.pista;
    this.puedeFinalizar = () => false;
  }

  addMuro(muro) {
    this.muros.push(muro);
  }

  removeMuro(muro) {
    this.muros = this.muros.filter((el) => el !== muro);
  }

  addActivable(activable) {
    this.activables.push(activable);
  }

  removeActivable(activable) {
    this.activables = this.activables.filter((el) => activable !== el);
  }

  addDisparo(disparo) {
    if (this.disparos.length < 2) {
      this.disparos.push(disparo)
    }
  }

  removeDisparo(disparo) {
    this.disparos = this.disparos.filter((el) => disparo !== el);
  }

  addDisparoEnemigo(disparo) {
    this.disparosEnemigos.push(disparo)
  }

  removeDisparoEnemigo(disparo) {
    this.disparosEnemigos = this.disparosEnemigos.filter((el) => disparo !== el);
  }

  addEnemigo(enemigo) {
    this.enemigos.push(enemigo);
  }

  removeEnemigo(enemigo) {
    this.enemigos = this.enemigos.filter((el) => enemigo !== el);
  }
}