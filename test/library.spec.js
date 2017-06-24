/*global describe, it, before */

import chai from 'chai';
import WorldMap from '../lib/worldmap.js';

chai.expect();

const expect = chai.expect;

let lib;

describe('Given an instance of my WorldMap',  () => {
  before(() => {
    lib = new WorldMap();
  });
  describe('when I need the name', () => {
    it('should return the name', () => {
      expect(lib.name).to.be.equal('WorldMap');
    });
  });
});
