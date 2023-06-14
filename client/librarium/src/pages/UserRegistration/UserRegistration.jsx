import React from 'react';
import {Link} from 'react-router-dom'
import './UserRegistration.css';

const user_credentials = {
  username: '',
  email: '',
  password: ''
};

const onSubmit = () => {
  user_credentials.username = document.getElementById('username').value;
  user_credentials.email = document.getElementById('user-email').value;
  user_credentials.password = document.getElementById('password').value;
};

const getCredentials = () => {
  // This function will return the user credentials
  return user_credentials;
};

const UserRegistration = () => {
  return (
    <div className='user-registration-form'>
      <div className='user-registration-form-container'>
        <div className='row'>
          <div className='col-25 user-username'>Username</div>
          <div className='col-75 user-input'>
            <input type='text' id='username' name='username' placeholder='Enter Username' />
          </div>
        </div>

        <div className='row'>
          <div className='col-25 user-email'>Email Address</div>
          <div className='col-75 user-input'>
            <input type='email' id='user-email' name='email' placeholder='Enter Email Address' />
          </div>
        </div>

        <div className='row'>
          <div className='col-25 user-password'>Password</div>
          <div className='col-75 user-input'>
            <input type='password' id='password' name='password' placeholder='Enter Password' />
          </div>
        </div>

        <button className='submit-button' type='submit' onClick={onSubmit}>Submit</button>
      </div>

        <div className='user-registration-form-footer'>
            <p>Already have an account? <Link to='/'>Login</Link></p>
        </div>
    </div>
  );
};

export default UserRegistration;