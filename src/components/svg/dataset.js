import Node from '../node';
import Path from './path';
import Column from '../graph/column';

export default class Dataset extends Node {

  constructor({columnX, columnsY}) {
    super(void 0, 'g');
    columnsY.forEach(column => this.addChild(new Path(columnX, column)))
  }

}
