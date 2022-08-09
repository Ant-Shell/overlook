// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

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

console.log('This is the JavaScript entry file - your code begins here.');

// ###########  Query Selectors ###########
const upcomingReservationsContainer = document.querySelector('.upcoming-reservations-container');
const pastReservationsContainer = document.querySelector('.past-reservations-container');

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
  })
}


// ###########  Event Listeners  ###########
window.addEventListener('load', getPromiseData);


// ###########  On-Load Functions  ###########
function populatePastBookings() {
  console.log(reservation.returnPastBookings())
}

function populateUpcomingBookings() {
  console.log(reservation.returnUpcomingBookings())
}





// ###########  View Functions  ###########




// ###########  Show/Hide View Functions  ###########




// ###########  Search Functions  ###########




