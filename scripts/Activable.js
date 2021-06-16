class Activable extends Elemento {
  constructor(props) {
    super(props);
    this.onCollide = props.onCollide;
    this.onInteraction = props.onInteraction;
    this.onClick = props.onClick;
  }

  isAside(positions) {
    const myApexes = this.apexes;
    const maxX = myApexes[1][0] + 1;
    const minX = myApexes[0][0] - 1;
    const maxY = myApexes[3][1] + 1;
    const minY = myApexes[0][1] - 1;
    
    const posMaxX = positions[1][0];
    const posMinX = positions[0][0];
    const posMaxY = positions[3][1];
    const posMinY = positions[0][1];

    if (posMinX === maxX || posMaxX === minX) {
      if ((posMinY > minY && posMinY < maxY) || (posMaxY < maxY && posMaxY > minY)) {
        return true;
      }
    }

    if (posMinY === maxY || posMaxY === minY) {
      if ((posMinX > minX && posMinX < maxX) || (posMaxX < maxX && posMaxX > minX)) {
        return true
      }
    }
    return false;
  }
}