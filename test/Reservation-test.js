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
  let customerID1;
  let customerID2;
  let customerID3;
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
  let reservation;
  let reservation1;
  let reservation2;
  let reservation3;


  beforeEach(function() {
    bookingInfo = bookingData;
    customerInfo = customerData;
    roomInfo = roomData;
    customerID1 = 1;
    customerID2 = 9;
    customerID3 = 13;
    customer1 = new Customer(customerInfo[0]);
    customer2 = new Customer(customerInfo[1]);
    customer3 = new Customer(customerInfo[2]);
    room1 = new Room(roomInfo[1]);
    room2 = new Room(roomInfo[3]);
    room3 = new Room(roomInfo[4]);
    room4 = new Room(roomInfo[5]);
    room5 = new Room(roomInfo[6]);
    booking1 = new Booking(bookingInfo[4]);
    booking2 = new Booking(bookingInfo[0]);
    booking3 = new Booking(bookingInfo[2]);
    booking4 = new Booking(bookingInfo[9]);
    booking5 = new Booking(bookingInfo[5]);
    booking6 = new Booking(bookingInfo[7]);
    reservation = new Reservation(1, roomInfo, bookingInfo)
    reservation1 = new Reservation(customerID1, roomInfo, bookingInfo)
    reservation2 = new Reservation(customerID2, roomInfo, bookingInfo)
    reservation3 = new Reservation(customerID3, roomInfo, bookingInfo)
  }) 

  it('should be a function', function() {
    expect(Reservation).to.be.a('function');
  })
  
  it('should be an instance of reservation', function() {
    expect(reservation).to.be.an.instanceOf(Reservation);
  })

  it('should have a customer id', function() {
    expect(reservation.customerID).to.deep.equal(1);
  })

  it('should have rooms', function() {
    expect(reservation.rooms).to.be.an('array');
    expect(reservation.rooms[0].roomType).to.deep.equal('single room');
  })

  it('should have bookings', function() {
    expect(reservation.bookings).to.be.an('array');
    expect(reservation.bookings[0].id).to.deep.equal('5fwrgu4i7k55hl6sz');
  })

  it('should be able to return bookings made in the past', function() {
    expect(reservation.returnPastBookings()[0]).to.deep.equal({
      id: '5fwrgu4i7k55hl6t8',
      userID: 1,
      date: '2022/02/05',
      roomNumber: 12
    })
  })

  it('should be able to return upcoming bookings', function() {
    expect(reservation.returnUpcomingBookings()[0]).to.deep.equal({
      id: '5fwrgu4i7k55hl727',
      userID: 1,
      date: '2022/11/06',
      roomNumber: 22
    })
  })

  it('should be able to return the total amount spent on rooms', function() {
    expect(reservation.returnTotalCost()).to.equal('522.40')
  })

  it('should return rooms only available on a certain date', function() {
    expect(reservation.returnFilteredByDate("2022/02/05")[0]).to.deep.equal({
      number: 15,
      roomType: 'residential suite',
      bidet: false,
      bedSize: 'full',
      numBeds: 1,
      costPerNight: 294.56
    })
  })

  it('should return rooms by room type', function() {
    expect(reservation.returnFilteredByRoomType('2022/02/05', 'single room')[0]).to.deep.equal({
      number: 12,
      roomType: 'single room',
      bidet: false,
      bedSize: 'twin',
      numBeds: 2,
      costPerNight: 172.09
    })
  })
})