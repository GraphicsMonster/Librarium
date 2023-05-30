import React from 'react'
import './UserLogin.css'

const UserLogin = () => {
  return (
    <div className='loginForm'>
        <div className='loginForm__form'>
            <div className='row'>
                <div className='col-25 username'>Username</div>
                <div className='col-75 username-input'>
                    <input type='text' id='username' name='username' placeholder='Enter Username' />

                </div>
            </div>
            <div className='row'>
                <div className='col-25 password'>Password</div>
                <div className='col-75 password-input'>
                    <input type='password' id='password' name='password' placeholder='Enter Password' />
                </div>
            </div>
            <div className='submit-button'>
                <button onClick={onSubmit} type='submit'id='login-form' className='submit-btn'>Login</button>
            </div>
        </div>
    </div>

  )
}

let data = {};

const onSubmit = () => {

  document.getElementById("login-form").addEventListener("click", function(event){

    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    data = {username, password};
})
}

const getCredentials = () => {
    return data;
}


export default UserLogin;
export {getCredentials};