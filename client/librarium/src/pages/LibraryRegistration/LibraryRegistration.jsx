import react from 'react'
import {Link} from 'react-router-dom'
import './LibraryRegistration.css'

const LibraryRegistration = () => {
    // This page will be used to register a new library.

    const credentials = {
        Library_id: '',
        Password: '',
        Library_name: '',
        Library_address: '',
        Library_phone: '',
        Library_email: ''
    }

    const onSubmit = () => {

    }

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
                <div className='col-25 lib-location'>Location</div>
                <div className='col-75 lib-input'>
                    <input type='text' id='lib-location' name='location' placeholder='Enter library location' />
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