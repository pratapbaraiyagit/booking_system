import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { login } from '../redux/userSlice';

const LoginForm = () => {
  const [showAlert, setShowAlert] = useState(false); // State for showing alert
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      if (values.username === 'GVMTechnologies' && values.password === '123') {
        dispatch(login({ username: values.username }));
        localStorage.setItem('username', values.username);
        navigate('/');
      } else {
        setShowAlert(true);
      }
      setSubmitting(false);
    }, 400);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Login</h2>
              {showAlert && (
                <div className="alert alert-danger" role="alert">
                  Incorrect username or password!
                </div>
              )}
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">Username:</label>
                      <Field type="text" id="username" name="username" className="form-control" />
                      <ErrorMessage name="username" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password:</label>
                      <Field type="password" id="password" name="password" className="form-control" />
                      <ErrorMessage name="password" component="div" className="text-danger" />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
