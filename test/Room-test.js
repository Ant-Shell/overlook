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
});