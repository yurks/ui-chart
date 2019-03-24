import window from '../helpers/window';
import {document, PointerEvent} from '../helpers/window';

export default class Drag {

  constructor({$el, attr}, container, handlers = {}) {
    this.$el = $el;
    this.attr = attr;
    this.$container = container.$el;
    this.handlers = typeof handlers === 'function' ? {move: handlers} : handlers;
    this.offset = 0;
    this.bind();
  }

  getOffset() {
    return this.$container.getBoundingClientRect().left + ( window.pageXOffset || document.documentElement.scrollLeft ) - ( document.documentElement.clientLeft || 0 );
  }

  getPosition(e) {
    let pos = ((e.pageX || (e.touches && e.touches[0].pageX) || 0) - this.offset) / this.$container.offsetWidth;
    if (pos < 0) {
      pos = 0;
    }
    if (pos > 1) {
      pos = 1
    }
    return pos;
  }

  bind() {
    const {move} = this.handlers;
    if (!move) {
      return;
    }

    const handler = e => {
      this.start(e);
    };

    if (PointerEvent) {
      this.$el.style.touchAction = 'none';
    }
    this.on(this.$el, 'mousedown', handler)
      .on(this.$el, 'touchstart', handler)
  }

  start(e) {
    const {start, move, end} = this.handlers;

    this.offset = this.getOffset();
    this.attr.moving = true;


    if (start) {
      start(e, this);
    }

    e.stopPropagation();
    e.preventDefault();


    const onMove = e => {
      move(e, this);
    };


    const onEnd = e => {
      this.off(document, 'mousemove', onMove)
        .off(document, 'touchmove', onMove)
        .off(document, 'mouseup', onEnd)
        .off(document, 'touchend', onEnd);

      this.offset = 0;
      delete this.attr.moving;

      if (end) {
        end(e, this);
      }
    };

    this.on(document, 'mousemove', onMove)
      .on(document, 'touchmove', onMove)
      .on(document, 'mouseup', onEnd)
      .on(document, 'touchend', onEnd);
  }



  on($el, event, callback) {
    $el.addEventListener(event, callback);
    return this;
  }

  off($el, event, callback) {
    $el.removeEventListener(event, callback);
    return this;
  }

}
