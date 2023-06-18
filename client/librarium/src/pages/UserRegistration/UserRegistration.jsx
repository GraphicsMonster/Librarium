import React from 'react';
import {Link} from 'react-router-dom'
import {useParams} from 'react-router-dom';
import './UserRegistration.css';

const user_credentials = {
  address: '',
  name: '',
  email: '',
};

const db_user_credentials = {
  username: '',
  password: ''
};

const onSubmit = async () => {
  user_credentials.username = document.getElementById('username').value;
  user_credentials.email = document.getElementById('user-email').value;
  user_credentials.password = document.getElementById('password').value;

  await sendData();
};

const getCredentials = () => {
  // This function will return the user credentials
  return user_credentials;
};

const sendData = async () => {
  try {
    const {id} = useParams();
    const url = `http://localhost:3000/api/library/${id}/registeruser`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(getCredentials())
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
    else {
      console.log('Failed to register user');
    }
  }
  catch (error) {
    console.log(error);
  }
}

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
          <div className='col-25 user-name'>Name</div>
          <div className='col-75 user-input'>
            <input type='text' id='name' name='name' placeholder='Enter Name' />
          </div>
        </div>

        <div className='row'>
          <div className='col-25 user-address'>Ethereum Address</div>
          <div className='col-75 user-input'>
            <input type='text' id='address' name='address' placeholder='Enter your Ethereum Address' />
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