import Node from '../node';

export default class Axis extends Node {

  constructor(data) {
    super('axis');

    this.tickXcount = 6;
    this.tickYcount = 7;

    this.columnX = data.columnX;

    this.width = data.width;
    this.offsetX = data.columnX.offset;

    this.maxX = data.columnX.max;
    this.maxY = Math.max(...data.columnsY.map(col => col.max));

  }

  getTicks (count, max) {
    return [...Array(count).keys()].map(d => max / (count-1) * parseInt(d))
  }
  renderChildren() {

    let x_ticks = this.getTicks(this.tickXcount, this.maxX);
    let y_ticks = this.getTicks(this.tickYcount, this.maxY).reverse();
    let offset_x = this.offsetX;

    let x_mapped = `<div class="x-axis" style="width:${this.width}px">${this.columnX.data.map((v,i) => `<div data-value="${i}" ></div>`).join('')}</div>`;
    let y_mapped = y_ticks.map(v => `<div data-value="${v}" ></div>`).join('');
    return x_mapped;
  }

}
