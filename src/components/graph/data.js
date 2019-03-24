import Column from './column';

export default class GraphData {

  constructor(data) {

    this.view = {
      pos: 70,
      width: 30
    };

    this.maxZoom = 40;
    this.width = 0;
    this.height = 300;
    this.raw = data;

    this.columnX = null;
    this.columnsY = data && data.columns
        .map(column => new Column({column, ...data}))
        .filter(column => column.type === 'x' ? !this.initX(column) : true)
        .map(column => this.initY(column))
      || [];
  }


  initX(column) {
    this.width = column.total * this.maxZoom;
    this.columnX = Object.assign(column, {
      offset: column.first,
      width: this.width, // this.parent.setWidth(column.total * this.parent.maxZoom),
      height: this.height
    });

    const {offset, max, width, data} = column;
    column.render = index => (data[index] - offset) / (max - offset) * width;
    return column;
  }

  initY(column) {
    const {height} = this.columnX;
    const {max, data} = column;
    column.render = index => height - data[index] / max * height;
    return column;
  }
}
