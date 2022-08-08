import { expect } from 'chai';
import Booking from '../src/classes/Booking';

describe('Booking', () => {
  let booking;
  let bookingData;
  beforeEach(function() {
    bookingData =
    {
      "id": "5fwrgu4i7k55hl6sz",
      "userID": 9,
      "date": "2022/04/22",
      "roomNumber": 15,
  
    },

    booking = new Booking(bookingData);
  });
  it('should be a function', function() {
    expect(Booking).to.be.a('function');
  })

  it('should be an instance of booking', function() {
    expect(booking).to.be.an.instanceOf(Booking);
  })

  it('should have an id', function() {
    expect(booking.id).to.deep.equal("5fwrgu4i7k55hl6sz")
  });

  it('should have a user ID', function() {
    expect(booking.userID).to.deep.equal(9)
  });

  it('should have a date', function() {
    expect(booking.date).to.deep.equal("2022/04/22")
  })

  it('should have a room number', function() {
    expect(booking.roomNumber).to.deep.equal(15)
  })
});