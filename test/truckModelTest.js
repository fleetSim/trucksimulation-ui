var chai = require('chai');
var expect = chai.expect;
chai.should();

var TruckModel = require('../modules/trucks/TruckModel');
var TruckCollection = require('../modules/trucks/TruckCollection');

describe('Truck Model and Collection', () => {
    var truckModel = new TruckModel({"_id": "abc123"});
    var truckColl = new TruckCollection("simId");

    it('does not have an url without a collection', () => {
        expect(truckModel.url).to.throw(Error);
    });

    it('should point to truck collection in corresponding simulation document when added to a collection', () => {
        truckColl.add(truckModel);
        expect(truckModel.url()).to.equal("/api/v1/simulations/simId/trucks/abc123");
    });

    it('should provide access to linked route resource when route attribute is set', () => {
        truckModel.fetchRoute.should.be.a("function");
    })
});