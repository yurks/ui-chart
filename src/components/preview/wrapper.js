import Node from '../node';
import Drag from '../drag';
import Boundary from './boundary';

export default class Viewport extends Node {

  constructor(data) {
    super('viewport-wrapper', 'span');

    this.addChild(new Boundary());
    this.addChild(new Boundary(true));

  }

  onMoveStart(e, drag) {
    this._lastPosition = drag.getPosition(e);
  }
  onMove(e, drag) {
    const pos = drag.getPosition(e);
    this.parent.positionDelta((this._lastPosition - pos));
    this._lastPosition = pos;
  }

  afterCreate() {
    new Drag(this, this.parent.parent, {
      start: (...args) => this.onMoveStart(...args),
      move: (...args) => this.onMove(...args),
    });
  }
}
