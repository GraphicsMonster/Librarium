import React from 'react'
import "./LibraryDashboard.css"
import ProfileCard from '../../components/ProfileCard/ProfileCard.jsx';
import Sidebar from '../../components/sidebar/sidebar.jsx';

function LibraryDashboard() {
  return (
    <>
      <Sidebar />
      <ProfileCard />
    </>
  )
}

export default LibraryDashboard

// Page library finds themselves on after logging in