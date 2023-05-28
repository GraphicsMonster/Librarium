import React from 'react'
import "./sidebar.css"

function Sidebar() {
  return (
    <div className='sidebar'>
        <div className='sidebar__container'>
            <div className='sidebar__header'>
                <h1>Librarium</h1>
            </div>
            <div className='sidebar__container__items'>
                <h3 className='sidebar__item'>Dashboard</h3>
                <h3 className='sidebar__item'>Inventory</h3>
                <h3 className='sidebar__item'>Users</h3>
                <h3 className='sidebar__item'>Settings</h3>
            </div>
        </div>
    </div>
  )
}

export default Sidebar;