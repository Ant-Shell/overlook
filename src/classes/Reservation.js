class Reservation {
  constructor(customerID, rooms, bookings) {
    this.customerID = customerID;
    this.rooms = rooms;
    this.bookings = bookings;
  }

  returnPastBookings() {
    let dateToday = new Date().toLocaleDateString('en-ZA');
    let pastBookings = this.bookings.filter(booking => {
      return booking.date < dateToday && this.customerID === booking.userID;
    });
    return pastBookings;
  }

  returnUpcomingBookings() {
    let dateToday = new Date().toLocaleDateString('en-ZA');
    let futureBookings = this.bookings.filter(booking => {
      return booking.date > dateToday === booking.userID;
    });
    return futureBookings;
  }
}





module.exports = Reservation;
