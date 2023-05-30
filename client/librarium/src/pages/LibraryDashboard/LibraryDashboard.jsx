import React from 'react'
import "./LibraryDashboard.css"
import ProfileCard from '../../components/ProfileCard/ProfileCard.jsx';
import Inventory from './../../components/Inventory/Inventory.jsx'
import Sidebar from '../../components/sidebar/sidebar.jsx';

function LibraryDashboard() {
  return (
    <>
    <div className='dashboard__container'>
      <div className='dashboard__sidebar'>
          <Sidebar />
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