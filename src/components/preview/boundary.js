import Node from '../node';
import Drag from '../drag';


export default class Boundary extends Node {

  constructor(isRight) {
    super('viewport-boundary', 'span');
    if (isRight) {
      this.attr.right = true;
    } else {
      this.attr.left = true;
    }
  }

  onMoveStart(e, drag) {
    this._lastPosition = drag.getPosition(e);
  }
  onMove(e, drag) {
    const pos = drag.getPosition(e);
    const newPos = this._lastPosition - pos;
    this.parent.parent.widthDelta(newPos, !!this.attr.right);

    this._lastPosition = pos;
  }

  afterCreate() {
    new Drag(this, this.parent.parent.parent, {
      start: (...args) => this.onMoveStart(...args),
      move: (...args) => this.onMove(...args),
    });
  }
}
