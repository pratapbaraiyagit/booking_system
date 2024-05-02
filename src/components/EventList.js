import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { logout } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom'; 

const EventList = () => {
  const events = useSelector(state => state.events);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (!username) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('username');
    navigate('/login'); 
  };


  return (
    <div className="container mt-5 mb-5">
      <div className="d-flex justify-content-between mb-3">
        <h1>Event List</h1>
        <button className="btn btn-outline-primary" onClick={handleLogout}>Logout</button>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {events.map(event => (
          <div key={event.id} className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text"><strong>Date:</strong> {event.date}</p>
                <p className="card-text"><strong>Time:</strong> {event.time}</p>
                <p className="card-text"><strong>Venue:</strong> {event.venue}</p>
                <p className="card-text"><strong>Available Tickets:</strong> {event.availableTickets}</p>
                <Link to={`/event/${event.id}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
