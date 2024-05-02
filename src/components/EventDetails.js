import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { bookTickets } from '../redux/eventsSlice';

const EventDetails = () => {
    const { eventId } = useParams();
    const event = useSelector(state => state.events.find(event => event.id === eventId));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ticketCount, setTicketCount] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');

    const handleBookTickets = (e) => {
        e.preventDefault();
        if (event.availableTickets === 0) {
            setErrorMessage('Tickets for this event are sold out.');
            if (ticketCount == 0) {
                navigate('/');
            }
        } else if (ticketCount > event.availableTickets) {
            setErrorMessage('You cannot book more tickets than available.');
        } else {
            dispatch(bookTickets({ eventId, ticketCount }));
            setTicketCount(1);
            navigate('/');
        }
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header d-flex justify-content-between">
                    <h1>{event.name}</h1>
                    <Link to="/" className="btn btn-outline-primary">Back</Link>
                </div>
                <div className="card-body">
                    <p><strong>Date:</strong> {event.date}</p>
                    <p><strong>Time:</strong> {event.time}</p>
                    <p><strong>Venue:</strong> {event.venue}</p>
                    <p><strong>Description:</strong> {event.description}</p>
                    <p><strong>Available Tickets:</strong> {event.availableTickets}</p>

                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                    <form onSubmit={handleBookTickets}>
                        <div className="mb-3">
                            <label htmlFor="ticketCount" className="form-label">Number of Tickets:</label>
                            <input
                                type="number"
                                id="ticketCount"
                                className="form-control"
                                value={ticketCount}
                                onChange={(e) => setTicketCount(parseInt(e.target.value))}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Book Tickets</button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default EventDetails;
