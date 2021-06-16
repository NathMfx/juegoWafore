class Elemento {
  constructor({ posX, posY, sizeX, sizeY, image, views }) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.posX = posX;
    this.posY = posY;
    this.image = image || '';
    this.views = views || {};
  }
  collide (positions) {
    for (const [posX, posY] of positions) {
      if (
        (
          (this.posX <= posX && posX <= this.posX + this.sizeX)
          || (this.posX <= posX && posX <= this.posX + this.sizeX)
        )
        && (
          (this.posY <= posY && posY <= this.posY + this.sizeY)
          || (this.posY <= posY && posY <= this.posY + this.sizeY)
        )
      ) return true;
    }
    let [[fposX, fposY],,[fsizeX, fsizeY]] = positions;
    fsizeX -= fposX;
    fsizeY -= fposY;
    for (const [posX, posY] of this.apexes) {
      if (
        (
          (fposX <= posX && posX <= fposX + fsizeX)
          || (fposX <= posX && posX <= fposX + fsizeX)
        )
        && (
          (fposY <= posY && posY <= fposY + fsizeY)
          || (fposY <= posY && posY <= fposY + fsizeY)
        )
      ) return true;
    }

    return false;
  }
  click (position) {
    const [posX, posY] = position;
    if (
      (
        (this.posX <= posX && posX <= this.posX + this.sizeX)
        || (this.posX <= posX && posX <= this.posX + this.sizeX)
      )
      && (
        (this.posY <= posY && posY <= this.posY + this.sizeY)
        || (this.posY <= posY && posY <= this.posY + this.sizeY)
      )
    ) return true;
    return false;
  }
  // Points order up-left up-right down-right down-left
  get apexes() {
    return [
      [this.posX, this.posY],
      [this.posX + this.sizeX, this.posY],
      [this.posX + this.sizeX, this.posY + this.sizeY],
      [this.posX, this.posY + this.sizeY],
    ]
  }

  get center() {
    return [ (2 * this.posX + this.sizeX) / 2, (2 * this.posY + this.sizeY) / 2]
  }
}