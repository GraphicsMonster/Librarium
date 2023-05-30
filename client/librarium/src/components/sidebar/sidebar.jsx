import React from 'react'
import "./sidebar.css"

function Sidebar(props) {

  const {isItLibrary} = props;
  
  return (
    <div className='sidebar'>
        <div className='sidebar__container'>
            <div className='sidebar__header'>
                <h1>Librarium</h1>
            </div>
            <div className='sidebar__container__items'>
              { isItLibrary ?
              <>
                <h3 className='sidebar__item'>Dashboard</h3>
                <h3 className='sidebar__item'>Inventory</h3>
                <h3 className='sidebar__item'>Users</h3>
                <h3 className='sidebar__item'>Settings</h3>
              </>
                : 
              <>
                <h3 className='sidebar__item'>Dashboard</h3>
                <h3 className='sidebar__item'>My Holds</h3>
                <h3 className='sidebar__item'>My Favourites</h3>
                <h3 className='sidebar__item'>Settings</h3>
              </>
}
            </div>
        </div>
    </div>
  )
}

export default Sidebar;