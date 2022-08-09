// ###########  Imports  ###########
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
import {fetchData} from './apiCalls';
import Booking from './classes/Booking';
import Customer from './classes/Customer';
import Reservation from './classes/Reservation';
import Room from './classes/Room';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


// ###########  Query Selectors ###########
const upcomingReservationsContainer = document.querySelector('.upcoming-reservations-container');
const pastReservationsContainer = document.querySelector('.past-reservations-container');
const amountValue = document.querySelector('.amt-value');

// ###########  Global Variables  ###########
let bookings;
let bookingData;
let customers;
let customerData;
let customerID;
let reservation;
let rooms;
let roomData;

// ###########  Promises  ###########
function getPromiseData() {
  Promise.all( [fetchData('customers'), fetchData('rooms'), fetchData('bookings')]).then(data => {
    customerData = data[0];
    roomData = data[1];
    bookingData = data[2];
    bookings = bookingData.bookings.map(booking => new Booking(booking)); 
    customers = customerData.customers.map(customer => new Customer(customer));
    rooms = roomData.rooms.map(room => new Room(room));
    customerID = customers[0].id;
    reservation = new Reservation(customerID, rooms, bookings)
    populateUpcomingBookings();
    populatePastBookings();
    populateTotalCost();
  })
}

// ###########  Event Listeners  ###########
window.addEventListener('load', getPromiseData);


// ###########  On-Load Functions  ###########
function populatePastBookings() {
  let pastBookings = reservation.returnPastBookings();
  pastReservationsContainer.innerHTML = '';
  if (pastBookings.length === 0) {
    pastReservationsContainer.innerText = "No previous bookings at this time"
  } else {
    pastBookings.forEach((booking, index) => {
      let div = document.createElement('div');
      div.id = `pastReservation${[index + 1]}`;
      div.className = 'past-reservation-details';
      div.innerHTML = `Booking ID: ${booking.id}<br><br>Booking Date: ${booking.date}</br></br>Room Number: ${booking.roomNumber}`;
      pastReservationsContainer.appendChild(div);
    })
  }
}

function populateUpcomingBookings() {
  let upcomingBookings = reservation.returnUpcomingBookings();
  upcomingReservationsContainer.innerHTML = '';
  if (upcomingBookings.length === 0) {
    upcomingReservationsContainer.innerText = "No upcoming bookings at this time"
  } else {
    upcomingBookings.forEach((booking, index) => {
      let div = document.createElement('div');
      div.id = `upcomingReservation${[index + 1]}`;
      div.className = 'upcoming-reservation-details'
      div.innerHTML = `Booking ID: ${booking.id}<br><br>Booking Date: ${booking.date}</br></br>Room Number: ${booking.roomNumber}`;
      upcomingReservationsContainer.appendChild(div);
    })
  }
}

function populateTotalCost() {
  let cost = reservation.returnTotalCost();
  amountValue.innerText = '';
  amountValue.innerText = `$${cost}`;
}





// ###########  View Functions  ###########




// ###########  Show/Hide View Functions  ###########




// ###########  Search Functions  ###########




