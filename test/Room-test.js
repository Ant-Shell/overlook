import { expect } from 'chai';
import Room from '../src/classes/Room';

describe('Room', () => {
  let room;
  let roomData;

  beforeEach(function() {
    roomData =
    {
      "number": 1,
      "roomType": "residential suite",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 1,
      "costPerNight": 358.4
    },

    room = new Room(roomData);
  });

  it('should be a function', function() {
    expect(Room).to.be.a('function');
  })

  it('should be an instance of room', function() {
    expect(room).to.be.an.instanceOf(Room);
  })

  it('should have a room id', function() {
    expect(room.number).to.deep.equal(1);
  })

  it('should have a room type', function() {
    expect(room.roomType).to.deep.equal("residential suite");
  })

  it('should have a bidet boolean value', function() {
    expect(room.bidet).to.deep.equal(true);
  })

  it('should have a bed size', function() {
    expect(room.bedSize).to.deep.equal("queen");
  })

  it('should have a number of beds', function() {
    expect(room.numBeds).to.deep.equal(1);
  })

  it('should have a cost per night', function() {
    expect(room.costPerNight).to.deep.equal(358.4)
  })
});