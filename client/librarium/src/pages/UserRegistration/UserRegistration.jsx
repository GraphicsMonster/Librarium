import React from 'react';
import {Link} from 'react-router-dom'
import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
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

const UserRegistration = () => {

  const {id} = useParams();
  const [libraryExists, setLibraryExists] = useState(false);
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [ethAddressExists, setEthAddressExists] = useState(false);

  useEffect(() => {
    const checkLibraryExists = async() => {
      const response = await fetch(`http://localhost:3000/api/library/${id}`);
      setLibraryExists(response.ok);
    };

    checkLibraryExists();
  }, [id]);

  const checkAddressExists = async (address) => {
    // This function will check if the address exists in the database

    const url = `http://localhost:3000/api/library/${id}/users/checkaddress?address=${address}`;
    const response = await fetch(url);

    if(response.ok) {
      setEthAddressExists(true);
    }
    else {
      setEthAddressExists(false);
    }
  };


  const onSubmit = async (event) => {
    event.preventDefault()
    user_credentials.address = document.getElementById('address').value;
    user_credentials.email = document.getElementById('user-email').value;
    user_credentials.name = document.getElementById('name').value;
  
    db_user_credentials.username = document.getElementById('username').value;
    db_user_credentials.password = document.getElementById('password').value;

    // Simple Ethereum address validation
    const addressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
    setIsValidAddress(addressRegex.test(user_credentials.address));
    checkAddressExists(user_credentials.address);

    setSubmitClicked(true);
  };

  useEffect(() => {

    if(submitClicked && isValidAddress && !ethAddressExists) {

    const sendDataWrapper = async () => {
      await sendData();
    };

   sendDataWrapper();

    setSubmitClicked(false);
    setIsValidAddress(false);
    // set the submitClicked state var to false once the action is performed so that when the button is clicked again the state turns to true
    }

    else if(ethAddressExists){
      console.log('User with this address already exists');
      setSubmitClicked(false);
      setIsValidAddress(false);
      setEthAddressExists(false);
    }

    else if(submitClicked && !isValidAddress) {
      // handles the case when the user enters an invalid address
      console.log('Invalid address');
      setSubmitClicked(false);
    }

  }, [isValidAddress, submitClicked]);
  

  
  const getCredentials = () => {
    // This function will return the user credentials
    return user_credentials;
  };
  
  const sendData = async () => {
    try {
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
  };


  if(!libraryExists) {
    return (
      <div className='registration-error'>
        <h1>Library does not exist</h1>
      </div>
    )
  }
  
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
            <input type='text' id='address' name='address' placeholder='Enter your Ethereum Address'/>
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