class Juego {
  constructor({ escenarios, personaje } = {}) {
    this.finished = false;
    this.listaEscenarios = escenarios || [];
    this.escenario = 0;
    this.pantallas = [];
    this.pantalla = 1;
    this.collection = 0;
    this.gemas = 0;
    this.personaje = personaje;
  }

  get escenarioActivo() {
    return this.listaEscenarios[this.escenario - 1];
  }

  get pantallaActiva() {
    return this.pantallas[this.pantalla - 1];
  }

  nextLevel() {
    this.personaje.puedomover = false;
    this.personaje.posX = 0;
    this.personaje.posY = 0;
    this.escenario += 1;
    setTimeout(() => {
      this.personaje.puedomover = true;
    }, 500);
  }

  addEscenario(escenario) {
    this.listaEscenarios.push(escenario)
  }

  addPantalla(pantalla) {
    this.pantallas.push(pantalla)
  }

}