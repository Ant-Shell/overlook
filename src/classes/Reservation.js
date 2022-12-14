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
      return booking.date >= dateToday && this.customerID === booking.userID;
    });
    return futureBookings;
  }

  returnTotalCost() {
    let upcomingBookings = this.returnUpcomingBookings();
    let pastBookings = this.returnPastBookings();
    let combinedBookings = upcomingBookings.concat(pastBookings);
    let rooms = this.rooms;
    let value = 0;
    combinedBookings.forEach(booking => {
      rooms.forEach(room => {
        if (booking.roomNumber === room.number) {
          value += room.costPerNight
        }
      })
    })
    return value.toFixed(2);
  }

  returnFilteredByDate(date) {
    let notBooked = this.bookings.filter(booking => booking.date !== date)

    let availableRooms = notBooked.reduce((acc, available) => {
      this.rooms.forEach(room => {
        if (room.number === available.roomNumber && !acc.includes(room)) {
          acc.push(room);
        }
      })
      return acc
    }, [])
    return availableRooms;
  }

  returnFilteredByRoomType(date, roomtype) {
    let availableRooms = this.returnFilteredByDate(date);
    let filteredByRoomType = availableRooms.filter(room => room.roomType === roomtype);
    return filteredByRoomType;
  }
}




module.exports = Reservation;
