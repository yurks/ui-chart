
export default class Column {

  constructor({column, types, names, colors}) {
    this.data = column;
    this.type = this._def(types, 'x');
    if (this.type !== 'x') {
      this.name = this._def(names);
      this.color = this._def(colors);
    }
  }

  _def(data, value) {
    return (data && typeof data === 'object') ? data[this.id] : data || value;
  }

  get data() {
    return this._data;
  }

  set data(data) {
    this.id = data[0];
    this._data = data.slice(1);
    this.first = this._data[0];
    this.total = this._data.length;
    this.max = Math.max(...this.data);
  }
}



