import Node from './node';
import Graph from './graph/index';
import GraphData from './graph/data';
import Preview from './preview/index';

export default class Chart extends Node {

  constructor(data) {
    super('container');

    const graphData = new GraphData(data);
    this.graph = new Graph(graphData);
    this.preview = new Preview(graphData);

    this.addChild(this.graph)
    this.addChild(this.preview)
  }

  afterCreate() {
  }

  sync(position, width, initiator) {
    this.graph.svg.setView(position, width)
  }

}
