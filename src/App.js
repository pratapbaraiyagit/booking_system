import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import EventList from './components/EventList';
import EventDetails from './components/EventDetails';
import LoginForm from './components/LoginForm';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/event/:eventId" element={<EventDetails />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
