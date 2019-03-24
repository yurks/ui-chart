import Node from '../node';
import Svg from '../svg';
import Axis from './axis';

export default class Graph extends Node {

  constructor(data) {
    super('graph');

    this.svg = new Svg(data);
    this.svg.setView(data.view.pos, data.view.width);
    //this.axis = new Axis(data);

    this.addChild(this.svg)
    //this.addChild(this.axis)

  }

}
