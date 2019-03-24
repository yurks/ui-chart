import Node from '../node';
import Viewport from './viewport';
import Svg from '../svg';

export default class Preview extends Node {

  constructor(data) {
    super('bar');

    this.addChild(new Viewport(data));
    this.addChild(new Svg(data))
  }
  afterCreate() {

  }

}
