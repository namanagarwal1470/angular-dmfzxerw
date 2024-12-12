import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  seats: boolean[][] = [
    [true, true, true, false, true, false, false],    // Row 1
    [false, false, true, true, false, true, false],   // Row 2
    [false, false, false, false, false, true, true],  // Row 3
    [false, false, false, true, false, true, false],  // Row 4
    [false, false, false, false, true, true, true],   // Row 5
    [false, false, true, true, false, false, false],  // Row 6
    [false, true, false, false, false, false, true],  // Row 7
    [false, false, false, false, true, true, true],   // Row 8
    [false, false, false, true, false, true, false],  // Row 9
    [true, false, true, false, false, false, false],  // Row 10
    [false, false, true, true, false, false, false],  // Row 11
    [false, false, false]                           // Row 12 (last row)
  ];
  
  seatsToBook: number = 0;
  bookedSeats: string[] = [];
  bookSeats() {
    if (this.seatsToBook < 1 || this.seatsToBook > 7) {
      alert('You can book between 1 and 7 seats.');
      return;
    }

    let seatsBooked = [];
    let found = false;

    // Try to book seats row by row (Looking for consecutive seats in one row first)
    for (let i = 0; i < this.seats.length; i++) {
      let row = this.seats[i];
      let availableSeats = [];

      // Find consecutive available seats in this row
      for (let j = 0; j < row.length; j++) {
        if (!row[j]) availableSeats.push(j + 1); // Store seat number (1-based index)
        if (availableSeats.length === this.seatsToBook) break;
      }

      if (availableSeats.length === this.seatsToBook) {
        // Book the seats
        availableSeats.forEach(seat => {
          row[seat - 1] = true;
          seatsBooked.push(`R${i + 1}S${seat}`);
        });
        found = true;
        break;
      }
    }

    // If no exact row found, try booking the seats across adjacent rows
    if (!found) {
      let seatsToBookLeft = this.seatsToBook;
      let bookedAcrossRows = [];
      
      // Iterate over each row and book seats across multiple rows if needed
      for (let i = 0; i < this.seats.length && seatsToBookLeft > 0; i++) {
        let row = this.seats[i];
        let availableSeatsInRow = [];

        // Collect all available seats in the current row
        for (let j = 0; j < row.length; j++) {
          if (!row[j]) {
            availableSeatsInRow.push(`R${i + 1}S${j + 1}`);
            row[j] = true; // Book the seat
            seatsToBookLeft--; // Decrease the seats left to book
            bookedAcrossRows.push(`R${i + 1}S${j + 1}`);
            if (seatsToBookLeft === 0) break;
          }
        }

        // If no more seats need to be booked, break the loop
        if (seatsToBookLeft === 0) break;
      }

      // If all required seats have been booked across rows, store the booked seats
      if (seatsToBookLeft === 0) {
        this.bookedSeats = bookedAcrossRows;
      } else {
        alert('Not enough available seats.');
      }
    }
  }

  }
