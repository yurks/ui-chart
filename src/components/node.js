import {document} from '../helpers/window';
import random from 'wsk-utils/var/string/random';
let tmp_container;

export default class Node {

  constructor(attrs, tag = 'div') {
    this.tag = tag;
    this.id = 'ui'+random(10);

    if (attrs) {
      if (typeof attrs === 'string') {
        attrs = [attrs];
      }
      if (Array.isArray(attrs)) {
        attrs = {
          class: attrs.map(item => 'ui-chart--' + item)
        }
      }
    }
    this._attrs = attrs || {};

    this._attrs.id = this.id;

    this.children = [];

    this.attr = new Proxy(this, {
      get({_attrs}, prop) {
        let val = _attrs[prop];
        if (val === '') {
          val = true;
        }
        return val;
      },
      set({$el, _attrs}, prop, value) {
        value = value === true ? '' : value;
        _attrs[prop] = value;
        if ($el) {
          $el.setAttribute(prop, value);
        }
        return true;
      },
      deleteProperty({$el, _attrs}, prop) {
        delete _attrs[prop];
        if ($el) {
          $el.removeAttribute(prop);
        }
        return true;
      }
    });

    //this.$el = this.create();
  }

  get attrs() {
    const {_attrs} = this;
    let out = '';
    for (const key in _attrs) {
      if (_attrs.hasOwnProperty(key)) {
        out += ` ${key}="${_attrs[key]}"`;
      }
    }
    return out;
  }

  set attrs(attrs) {
    Object.assign(this._attrs, attrs);
    if (this.$el) {
      for (const key in attrs) {
        if (attrs.hasOwnProperty(key)) {
          this.$el.setAttribute(key, attrs[key]);
        }
      }
    }
  }
/*
  notify(key, ...args) {
    let node = this;
    while(node = node.parent) {
      if (node[key]) {
        if (node[key](...args) === false) {
          break;
        }
      }
    }
  }
*/
  addChild(instance) {
    if (instance && ('tag' in instance)) {
      instance.parent = this;
      this.children.push(instance);
      if (instance.constructChild) {
        instance.constructChild(instance);
      }
    }
    return this;
  }

  renderChildren() {
    return this.children.map(node => node.render()).join('')
  }

  render() {
    return `<${this.tag}${this.attrs}>${this.renderChildren()}</${this.tag}>`;
  }

  //TODO: refactor this.$el as getter
  _afterCreate($el) {
    this.children.forEach(node => {
      if (node.afterCreate) {
        node.$el = $el.querySelector('#'+node.id);
        node.afterCreate();
      }
      node._afterCreate($el)
    });
  }

  create() {
    tmp_container = tmp_container || document.createElement('div');
    tmp_container.innerHTML = this.render();
    const {firstChild} = tmp_container;
    this._afterCreate(firstChild);
    return tmp_container.removeChild(firstChild);
  }
}
