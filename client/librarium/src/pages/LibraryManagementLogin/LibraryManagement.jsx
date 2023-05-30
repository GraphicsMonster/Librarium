import React from 'react'
import "./LibraryManagement.css"

const LibraryLogin = () => {
  return (
    <><div className='loginForm'>
    <div className='loginForm__form'>
        <div className='row'>
            <div className='col-25 lib-id'>Library ID</div>
            <div className='col-75 lib-input'>
                <input type='text' id='lib-id' name='username' placeholder='Enter Username' />

            </div>
        </div>
        <div className='row'>
            <div className='col-25 password'>Password</div>
            <div className='col-75 password-input'>
                <input type='password' id='lib-password' name='password' placeholder='Enter Password' />
            </div>
        </div>
        <div className='submit-button'>
            <button onClick={onSubmit} type='submit'id='lib-log-in-submit' className='submit-btn'>Login</button>
        </div>
    </div>
</div></>
  )
}

let data = {};

const onSubmit = () => {
  document.getElementById("lib-log-in-submit").addEventListener("click", function(event){
    event.preventDefault();
    const LibId = document.getElementById("lib-id").value;
    const password = document.getElementById("lib-password").value;
    
    data = {
      Library_id: LibId,
      Password: password
    };
    console.log(data)
  })
}

const getCredentials = () => {
  return data;
}

export default LibraryLogin;
export {getCredentials};

// page library uses to log into their account