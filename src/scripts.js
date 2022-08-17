// ###########  Imports  ###########
import './css/styles.css';
import {fetchData} from './apiCalls';
import Booking from './classes/Booking';
import Customer from './classes/Customer';
import Reservation from './classes/Reservation';
import Room from './classes/Room';

// ###########  Query Selectors ###########
const upcomingReservationsContainer = document.querySelector('.upcoming-reservations-container');
const pastReservationsContainer = document.querySelector('.past-reservations-container');
const bookingResultBox = document.querySelector('.booking-result-box');
const amountValue = document.querySelector('.amt-value');
const resultMessage = document.querySelector('.result-message');
const bookRoomButton = document.getElementById('bookRoomButton');
const logOutButton = document.getElementById('logOutButton')
const homeViewSection = document.getElementById('homeSection');
const header = document.getElementById('header');
const loginView = document.getElementById('loginView');
const bookingViewSection = document.getElementById('bookingReservationSection');
const reservationsForm = document.getElementById('reservationForm');
const selectDateButton = document.getElementById('selectDateButton');
const roomTypeSubmitButton = document.getElementById('roomTypeSubmitButton');
const radioButtons = document.querySelectorAll('input[name="roomType"]');
const bookingResults = document.getElementById('bookingResultBox');
const usernameField = document.getElementById('username'); 
const passwordField = document.getElementById('password');
const loginSubmitButton = document.getElementById('loginSubmitButton');
const notificationMessage = document.querySelector('.notification-message');

// ###########  Global Variables  ###########
let bookings;
let bookingData;
let customers;
let customerData;
let customerID;
let reservation;
let rooms;
let roomData;
let loginID;

// ###########  Promises  ###########
function getPromiseData() {
  Promise.all( [fetchData('customers'), fetchData('rooms'), fetchData('bookings')]).then(data => {
    customerData = data[0];
    roomData = data[1];
    bookingData = data[2];
    bookings = bookingData.bookings.map(booking => new Booking(booking)); 
    customers = customerData.customers.map(customer => new Customer(customer));
    rooms = roomData.rooms.map(room => new Room(room));
    customerID = loginID;
    reservation = new Reservation(customerID, rooms, bookings);
    populateUpcomingBookings();
    populatePastBookings();
    populateTotalCost();
  })
}

// ###########  Event Listeners  ###########
loginSubmitButton.addEventListener('click', loginSubmit);
window.addEventListener('load', getPromiseData);
bookRoomButton.addEventListener('click', bookingReservationView);
selectDateButton.addEventListener('click', dateSelection);
roomTypeSubmitButton.addEventListener('click', roomTypeSelection);
bookingResults.addEventListener('click', postNewBooking);
logOutButton.addEventListener('click', logOut)

// ###########  Login Functions  ###########
function loginSubmit(event) {
  event.preventDefault();
  notificationMessage.innerText = ''
  if (!usernameField.value) {
    notificationMessage.innerText = 'Please enter username';
  } else if (!passwordField.value) {
    notificationMessage.innerText = 'Please enter password';
  } else if (passwordField.value !== 'overlook2021') {
    notificationMessage.innerText = 'Please enter valid password';
  } else {
    loginID = usernameField.value.replace('customer', '');
    fetch(`http://localhost:3001/api/v1/customers/${loginID}`)
      .then(response => {
        if (!response.ok) {
          throw new Error (`Sorry, no customer by id ${loginID}. Please try again.`);
        } else {
          return response.json();
        }
      })
      .then(data => {
        loginID = data.id;
        getPromiseData();
        dashboardView();
      })
      .catch(error => {
        notificationMessage.innerText = error.message;
      })
  }
}

// ###########  On-Load Functions  ###########
function populatePastBookings() {
  let pastBookings = reservation.returnPastBookings();
  pastReservationsContainer.innerHTML = '';
  if (pastBookings.length === 0) {
    pastReservationsContainer.innerText = "No previous bookings at this time";
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
function toggleView(section) {
  section.classList.toggle("hidden");
}

// ###########  Show/Hide View Functions  ###########
function bookingReservationView() {
  toggleView(homeViewSection);
  toggleView(bookingViewSection);
  createDateSelector();
}

function dashboardView() {
  toggleView(header);
  toggleView(homeViewSection);
  toggleView(loginView);
  toggleView(bookRoomButton);
}

function logOut() {
  if (!bookingViewSection.classList.contains("hidden")) {
    bookingViewSection.classList.add("hidden");
    toggleView(loginView);
    toggleView(header);
    toggleView(bookRoomButton);
    usernameField.value = '';
    passwordField.value = '';
  } else {
    toggleView(loginView);
    toggleView(header);
    toggleView(homeViewSection);
    toggleView(bookRoomButton);
    usernameField.value = '';
    passwordField.value = '';
  }
}

function createDateSelector() {
  let dateToday = new Date().toLocaleDateString('en-ZA')
  let minDate = dateToday.split("/").join("-");
  reservationsForm.innerHTML = 
    `<label class="reservations-promt" id="reservationsPromt">Please select a date for your reservation:
    <input type="date" name="reservation" value="${minDate}" min="${minDate}" class="customer-date" id="customerDate" required>
    </label>`;
}

// ###########  Search Functions  ###########
function dateSelection() {
  resultMessage.innerText = '';
  bookingResultBox.innerHTML = '';
  const customerDate = document.querySelector("form#reservationForm label input");
  const reformattedDate = customerDate.value.split("-").join("/");
  const filteredResults = reservation.returnFilteredByDate(reformattedDate);
  if (filteredResults.length === 0) {
    resultMessage.innerText = 'Sorry, there were no results. Please adjust your search.';
  } else {
    filteredResults.forEach(result => {
      let div = document.createElement('div');
      div.id = result.number;
      div.className = 'filtered-booking-details';
      div.innerHTML = `${result.number}, ${result.roomType}, ${result.bidet}, ${result.bedSize}, ${result.numBeds}, ${result.costPerNight}`;
      bookingResultBox.appendChild(div);
    })
  }
}

function roomTypeSelection(event) {
  event.preventDefault();
  resultMessage.innerText = '';
  bookingResultBox.innerHTML = '';
  const customerDate = document.querySelector("form#reservationForm label input");
  const reformattedDate = customerDate.value.split("-").join("/");
  let roomType;
  let filteredResults;
  radioButtons.forEach(button => {
    if (button.checked) {
      roomType = button.value;
    }
  })
  filteredResults = reservation.returnFilteredByRoomType(reformattedDate, roomType);
  if (filteredResults.length === 0) {
    resultMessage.innerText = 'Sorry, there were no results. Please adjust your search.';
    } else {
    filteredResults.forEach(result => {
      let div = document.createElement('div');
      div.id = result.number;
      div.className = 'filtered-booking-details';
      div.innerHTML = `${result.number}, ${result.roomType}, ${result.bidet}, ${result.bedSize}, ${result.numBeds}, ${result.costPerNight}`;
      bookingResultBox.appendChild(div);
    })
  }
}

function postNewBooking(event) {
  let target = event.target;
  const customerDate = document.querySelector("form#reservationForm label input");
  const reformattedDate = customerDate.value.split("-").join("/");
  let customerID = reservation.customerID;
  let roomNum;
  bookingResults.childNodes.forEach(node =>  {
    if (target === node) {
      roomNum = parseInt(node.id);
      fetch('http://localhost:3001/api/v1/bookings', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({ userID: customerID, date: reformattedDate, roomNumber: roomNum})
      })
        .then(response =>{
          if (!response.ok) {
          throw new Error ('Sorry, unable to book room at this time. Please try selecting another.')
          } else {
            resultMessage.innerText = `Room ${roomNum} booked successfully!`;
            return response.json();
          }
        })
        .then(booking => {
          let newbooking = new Booking(booking.newBooking);
          reservation.bookings.push(newbooking);
          populateUpcomingBookings();
        } )
        .catch(error => {
          resultMessage.innerText = error.message;
        })
    }
  })
}




