import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: '1', name: 'Summer Party', date: '10-05-2024', time: '10:00 PM', venue: 'VR Mall, Vesu, Surat', availableTickets: 50 },
  { id: '2', name: 'Music Festival', date: '15-05-2024', time: '08:00 PM', venue: 'City Stadium, Mumbai', availableTickets: 100 },
  { id: '3', name: 'Art Exhibition', date: '20-05-2024', time: '11:00 AM', venue: 'Art Gallery, Delhi', availableTickets: 30 },
  { id: '4', name: 'Tech Conference', date: '25-05-2024', time: '09:30 AM', venue: 'Convention Center, Bangalore', availableTickets: 80 },
  { id: '5', name: 'Food Festival', date: '30-05-2024', time: '12:00 PM', venue: 'Downtown Plaza, Pune', availableTickets: 70 },
  { id: '6', name: 'Fashion Show', date: '05-06-2024', time: '07:00 PM', venue: 'Fashion Arena, Kolkata', availableTickets: 60 },
  { id: '7', name: 'Movie Premiere', date: '10-06-2024', time: '06:30 PM', venue: 'Cinema Complex, Chennai', availableTickets: 120 },
  { id: '8', name: 'Book Launch', date: '15-06-2024', time: '02:00 PM', venue: 'Bookstore, Hyderabad', availableTickets: 40 },
  { id: '9', name: 'Fitness Expo', date: '20-06-2024', time: '10:00 AM', venue: 'Fitness Center, Jaipur', availableTickets: 90 },
  { id: '10', name: 'Gaming Tournament', date: '25-06-2024', time: '03:00 PM', venue: 'Gaming Arena, Ahmedabad', availableTickets: 50 } 
  // add more events as needed
];

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    bookTickets: (state, action) => {
      const { eventId, ticketCount } = action.payload;
      const event = state.find(event => event.id === eventId);
      if (event) {
        if (event.availableTickets >= ticketCount) {
          event.availableTickets -= ticketCount;
        } else {
          console.log("Not enough tickets available");
        }
      }
    },
  },
});

export const { bookTickets } = eventsSlice.actions;
export default eventsSlice.reducer;
