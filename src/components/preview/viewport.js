import Node from '../node';
import ViewportWrapper from './wrapper';

export default class Viewport extends Node {

  constructor({view}) {
    super('viewport');
    this.addChild(new ViewportWrapper());
    this.update(view.pos, view.width);
  }

  afterCreate() {
    //this.update(50, 100);
  }

  update(position, width) {
    if (typeof width === 'number') {
      if ((width + position > 100)) {
        width = 100 - position;
      }
    }
    this._width = width;
    this._pos = position;
    this.attr.style = `left:${position}%;width:${width}%;`
    if (this.parent) {
      this.parent.parent.sync(position, width, this);
    }
  }


  //TODO: beautify below

  positionDelta(delta, _resizing) {
    let width = this._width;
    let oldPos = this._pos;
    let pos = oldPos - (delta * 100);
    if (pos < 0) {
      pos = 0;
    } else if ((pos + width) > 100 && !_resizing) {
      pos = 100 - width;
    }
    if (_resizing && width <= 5 && delta < 0) {
      pos = oldPos;
    }
    if (!_resizing) {
      return this.update(pos, width);
    }
    return pos;
  }

  widthDelta(delta, isRight) {
    let pos = this._pos;
    let oldWidth = this._width;
    if (!isRight) {
      pos = this.positionDelta(delta, true);
      delta = (this._pos - pos) / 100;
      delta *= -1;
    }

    let width = oldWidth - (delta * 100);

    if (width < 5) {
      width = 5
    } else if (width + pos > 100) {
      width = 100 - pos
    }
    return this.update(pos, width);
  }

}
