class Reservation {
  constructor(customerID, rooms, bookings) {
    this.customerID = customerID;
    this.rooms = rooms;
    this.bookings = bookings;
  }

  returnPastBookings() {
    let dateToday = new Date().toLocaleDateString('en-ZA');
    let pastBookings = this.bookings.filter(booking => booking.date < dateToday);
    return pastBookings;
  }

  returnUpcomingBookings() {
    let dateToday = new Date().toLocaleDateString('en-ZA');
    let futureBookings = this.bookings.filter(booking => booking.date > dateToday);
    return futureBookings;
  }
}





module.exports = Reservation;
