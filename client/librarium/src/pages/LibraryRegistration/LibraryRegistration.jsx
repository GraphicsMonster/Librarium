import react from 'react'
import {Link} from 'react-router-dom'
import './LibraryRegistration.css'

const credentials = {
    Library_name: '',
    Library_address: '',
    library_email: '',
    Library_contact: '',
    Library_MaxHolds: 5
    // Using a default value of 5 for now. We can change it later.
}

const db_credentials = {
    Library_id: '',
    Library_password: ''
}

const onSubmit = () => {
    //this function will take the input from the input fields and store it in the credentials object.
    db_credentials.Library_id = document.getElementById('lib-id').value;
    db_credentials.Library_password = document.getElementById('lib-password').value;
    // The credentials to send to the database once we have managed to set up once

    credentials.Library_name = document.getElementById('lib-name').value;
    credentials.Library_address = document.getElementById('lib-location').value;
    credentials.library_email = document.getElementById('lib-email').value;
    credentials.Library_contact = document.getElementById('lib-number').value;
    // The credentials to send to the blockchain as soon as the user hits register.
    postData();
}

const getCredentials = () => {
    //this function will return the credentials object.
    return credentials;
}

const postData = async () => {
    try {
        const response = await fetch('/api/library/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(getCredentials())
        });
        
        if(response.ok) {
            const data = await response.json();
            console.log(data);
        }
        else {
            console.log('Failed to register library');
        }

    }
    catch (error) {
        console.log(error);
    }
}

const LibraryRegistration = () => {
    // This page will be used to register a new library.x
    // Library Id will be like a unique id for each Library. It can be alphanumeric or just alphabetic just like usernames.
    // Ofcourse this setting is only for the database for us to be able to keep track of the libraries.
    // The blockchain will have its own numeric id for each library which we will go on to use in the future.

    return (
        <><div className='lib-registration-form'>
        <div className='lib-registration-form-container'>
            <div className='row'>
                <div className='col-25 lib-id'>Library ID</div>
                <div className='col-75 lib-input'>
                    <input type='text' id='lib-id' name='id' placeholder='Enter Username' />
                </div>
            </div>

            <div className='row'>
                <div className='col-25 lib-name'>Library Name</div>
                <div className='col-75 lib-input'>
                    <input type='text' id='lib-name' name='username' placeholder='Enter Username' />
                </div>
            </div>
            <div className='row'>   
                <div className='col-25 lib-location'>Location</div>
                <div className='col-75 lib-input'>
                    <input type='text' id='lib-location' name='location' placeholder='Enter library location' />
                </div>
            </div>
            <div className='row'>
                <div className='col-25 lib-email'>Email Address</div>
                <div className='col-75 lib-input'>
                    <input type='email' id='lib-email' name='email' placeholder='Enter Library Email' />
                </div>
            </div>
            <div className='row'>
                <div className='col-25 lib-number'>Contact Number</div>
                <div className='col-75 lib-input'>
                    <input type='number' id='lib-number' name='number' placeholder='Enter Library contact number' />
                </div>
            </div>
            <div className='row'>
                <div className='col-25 lib-password'>Password</div>
                <div className='col-75 lib-input'>
                    <input type='password' id='lib-password' name='password' placeholder='Enter Password' />
                </div>
            </div>
        </div>

        <div className='submit-button'>
                <button onClick={onSubmit} type='submit'id='lib-log-in-submit' className='submit-btn'>Register</button>
        </div>
        
    </div>
    
    <div className='library-Registration-footer'>
        <p>Are you a registered library? <Link to='/library/'>Library Login Page</Link></p>
    </div>
    </>
    )
}

export default LibraryRegistration;
export {getCredentials};