import Node from '../node';

export default class Path extends Node {

  constructor(columnX, columnY) {
    super({
      'vector-effect': 'non-scaling-stroke',
      'fill': 'none'
    }, 'path');

    this.columnX = columnX;
    this.columnY = columnY;
  }

  constructChild({columnY, columnX}) {
    const renderX = columnX.render;
    const renderY = columnY.render;
    this.attr.d = `M${columnX.data.map((n, i) => `L${renderX(i)} ${renderY(i)}`).join(' ').slice(1)}`;
    this.attr.stroke = columnY.color;
  }
}
