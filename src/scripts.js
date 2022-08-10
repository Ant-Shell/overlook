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
const upcomingReservationsContainer2 = document.querySelector('.upcoming-reservations-container2');
const pastReservationsContainer = document.querySelector('.past-reservations-container');
const amountValue = document.querySelector('.amt-value');
const resultMessage = document.querySelector('.result-message')
const bookRoomButton = document.getElementById('bookRoomButton');
const homeViewSection = document.getElementById('homeSection');
const bookingViewSection = document.getElementById('bookingReservationSection');
const reservationsForm = document.getElementById('reservationForm');
const selectDateButton = document.getElementById('selectDateButton');

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
bookRoomButton.addEventListener('click', bookingReservationView)
selectDateButton.addEventListener('click', dateSelection)

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

function toggleView(section) {
  section.classList.toggle("hidden");
}

function populateUpcomingBookings2() {
  let upcomingBookings = reservation.returnUpcomingBookings();
  upcomingReservationsContainer2.innerHTML = '';
  if (upcomingBookings.length === 0) {
    upcomingReservationsContainer2.innerText = "No upcoming bookings at this time"
  } else {
    upcomingBookings.forEach((booking, index) => {
      let div = document.createElement('div');
      div.id = `upcomingReservation${[index + 1]}`;
      div.className = 'upcoming-reservation-details'
      div.innerHTML = `Booking ID: ${booking.id}<br><br>Booking Date: ${booking.date}</br></br>Room Number: ${booking.roomNumber}`;
      upcomingReservationsContainer2.appendChild(div);
    })
  }
}

function bookingReservationView() {
  toggleView(homeViewSection);
  toggleView(bookingViewSection);
  populateUpcomingBookings2();
  createDateSelector();
}

function createDateSelector() {
  let dateToday = new Date().toLocaleDateString('en-ZA')
  let minDate = dateToday.split("/").join("-");
  reservationsForm.innerHTML = 
    `<label class="reservations-promt" id="reservationsPromt">Please select a date for your reservation:
    <input type="date" name="reservation" value="${minDate}" min="${minDate}" class="customer-date" id="customerDate" required>
    </label>`;
}

function dateSelection() {
  resultMessage.innerText = ''
  const customerDate = document.querySelector("form#reservationForm label input");
  const reformattedDate = customerDate.value.split("-").join("/");
  const dateSelected = reservation.returnFilteredByDate(reformattedDate);
  if (dateSelected.length === 0) {
    resultMessage.innerText = 'Sorry, there were no results. Please adjust your search.'
  } else {
    console.log("Hello")
  }
}

// ###########  View Functions  ###########




// ###########  Show/Hide View Functions  ###########




// ###########  Search Functions  ###########




