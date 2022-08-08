import { expect } from 'chai';
import Booking from '../src/classes/Booking';
import Customer from '../src/classes/Customer';
import Room from '../src/classes/Room';
import Reservation from '../src/classes/Reservation';
import bookingData from './data/booking-test-data';
import customerData from './data/customer-test-data';
import roomData from './data/room-test-data';

describe('Reservation', () => {
  let bookingInfo;
  let customerInfo;
  let roomInfo;
  let customer1;
  let customer2;
  let customer3;
  let room1;
  let room2;
  let room3;
  let room4;
  let room5;
  let booking1;
  let booking2;
  let booking3;
  let booking4;
  let booking5;
  let booking6;

  beforeEach(function() {
    bookingInfo = bookingData;
    customerInfo = customerData;
    roomInfo = roomData;
    customer1 = new Customer(customerInfo[0]); // Cust 1
    customer2 = new Customer(customerInfo[1]); // Cust 9
    customer3 = new Customer(customerInfo[2]); // Cust 13
    room1 = new Room(roomInfo[1]); // Room 6
    room2 = new Room(roomInfo[3]); // Room 12
    room3 = new Room(roomInfo[4]); // Room 15
    room4 = new Room(roomInfo[5]); // Room 22
    room5 = new Room(roomInfo[6]); // Room 23
    booking1 = new Booking(bookingInfo[4]); // Cust 1 | Room 12
    booking2 = new Booking(bookingInfo[0]); // Cust 9 | Room 15
    booking3 = new Booking(bookingInfo[2]); // Cust 13 | Room 12
    booking4 = new Booking(bookingInfo[9]); // Cust 1 | Room 22
    booking5 = new Booking(bookingInfo[5]); // Cust 9 | Room 23
    booking6 = new Booking(bookingInfo[7]); // Cust 13 | Room 6
  }) 

  it('should be a function', function() {
    expect(Reservation).to.be.a('function');
  })
})