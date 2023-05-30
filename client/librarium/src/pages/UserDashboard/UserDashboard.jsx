import React from 'react'
import "./UserDashboard.css"
import Sidebar from '../../components/sidebar/sidebar.jsx'

const UserDashboard = () => {
  
  const sidebarprop = {isitLibrary: false}
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