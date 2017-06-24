import Engine from './engine';

module.exports = class worldmap {
  constructor(options = {}) {
    this._name = 'worldmap';
    this._engine = new Engine(options);

    this._engine.run();
  }
  get name() {
    return this._name;
  }

  addElementAtPosition(element, latitude, longitude) {
    return this._engine.addElementAtPosition(element, latitude, longitude);
  }

  centerOnElement(element) {
    this._engine.centerOnElement(element);
  }

  home() {
    this._engine.home();
  }

};
