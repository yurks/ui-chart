import Node from '../node';

import Dataset from './dataset';

export default class Svg extends Node {

  constructor(data) {
    super({
      xmlns: 'http://www.w3.org/2000/svg',
      width: '100%',
      preserveAspectRatio: 'none',
    }, 'svg');

    this.width = data.width;
    this.height = data.height;

    this.viewBox = {
      minX: 0,
      minY: 0,
      width: this.width,
      height: this.height
    };

    this.setViewBox();

    this.maxZoom = 40;
    this.attr.height = this.height;

    this.addChild(new Dataset(data));

  }

  afterCreate() {

  }

  setViewBox(data) {
    const {viewBox} = this;
    if (data) {
      Object.assign(viewBox, {...data});
    }
    this.attr.viewBox = `${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`;
  }

  setView(positionDelta, widthDelta) {
    let minX = this.width * positionDelta / 100;
    let width = this.width * widthDelta / 100;
    this.setViewBox({minX, width});
  }

  setWidth(width) {
    const oldWidth = this.viewBox.width;
    if (!oldWidth|| width > oldWidth) {
      this.width = width;
      this.setViewBox({width});
      return width;
    }
    return oldWidth;
  }




}
