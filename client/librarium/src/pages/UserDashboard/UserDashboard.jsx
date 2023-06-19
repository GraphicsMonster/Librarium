import React from 'react'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import "./UserDashboard.css"
import Sidebar from '../../components/sidebar/sidebar.jsx'

const UserDashboard = () => {
  
  const {lib_Id} = useParams();
  const {user_Id} = useParams();
  const [libraryExists, setLibraryExists] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const sidebarprop = {isitLibrary: false}

  useEffect(() => {

    const checkLibraryandUserExist = async() => {
    const response_lib = await fetch(`http://localhost:3000/api/library/${lib_Id}`)
    const response_user = await fetch(`http://localhost:3000/api/library/${lib_Id}/user/${user_Id}`)
    console.log(response_lib)
    console.log(response_user)
    setLibraryExists(response_lib.ok);
    setUserExists(response_user.ok);
    };

    checkLibraryandUserExist();
  }, [lib_Id, user_Id]);


  if(!libraryExists) {
    return(
      <div className='library-dashboard-error'>
        <h1>Library does not exist</h1>
      </div>
    )
  }

  if(!userExists) {
    return(
      <div className='library-dashboard-error'>
        <h1>User does not exist</h1>
      </div>
    )
  }


  return (
    <>
    <div className='user-dashboard'>
      <div className='user-dashboard-container'>
        <div className='sidebar-container'>
          <Sidebar sidebarprop />
        </div>
        <div className='user-dashboard-content'>
          <div className='user-dashboard-content__header'>
            <h1 className='user-dashboard-content__header-title'>User Dashboard</h1>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default UserDashboard;

// Page user finds themselves on after logging in