import React from 'react'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import "./LibraryDashboard.css"
import ProfileCard from '../../components/ProfileCard/ProfileCard.jsx';
import Inventory from './../../components/Inventory/Inventory.jsx'
import Sidebar from '../../components/sidebar/sidebar.jsx';

function LibraryDashboard() {

  const props = { isItLibrary: true};
  const {id} = useParams();
  const [libraryExists, setLibraryExists] = useState(false);

  useEffect(() => {

    const checkLibraryExists = async() => {
    const response = await fetch(`http://localhost:3000/api/library/${id}`)
    setLibraryExists(response.ok);
    };

    checkLibraryExists();
    
  }, [id]);

  if(!libraryExists) {
    return(
      <div className='library-dashboard-error'>
        <h1>Library does not exist</h1>
      </div>
    )
  }

  return (
    <>
    <div className='dashboard__container'>
      <div className='dashboard__sidebar'>
          <Sidebar props />
      </div>
      <div className='dashboard__content'>
          <ProfileCard />
          <Inventory />
      </div>
    </div>
    </>
  )
}

export default LibraryDashboard

// Page library finds themselves on after logging in