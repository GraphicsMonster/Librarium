import React from 'react'
import {Link} from 'react-router-dom'
import "./sidebar.css"

function Sidebar(props) {

  const {isItLibrary, id} = props;
  
  return (
    <div className='sidebar'>
      <div className='sidebar__container'>
        <div className='sidebar__header'>
          <h2>Librarium</h2>
        </div>
        <div className='sidebar__container__items'>
          {isItLibrary ? (
            <>
              <Link to={`/library/${id}/dashboard`} className='sidebar__item'>
                Dashboard
              </Link>
              <Link to={`/library/${id}/inventory`} className='sidebar__item'>
                Inventory
              </Link>
              <Link to={`/library/${id}/users`} className='sidebar__item'>
                Users
              </Link>
              <Link to={`/library/${id}/addbook`} className='sidebar__item'>
                Add Books
              </Link>
              <Link to={`/library/${id}/settings`} className='sidebar__item'>
                Settings
              </Link>
            </>
          ) : (
            <>
              <Link to={`/dashboard`} className='sidebar__item'>
                Dashboard
              </Link>
              <Link to={`/myholds`} className='sidebar__item'>
                My Holds
              </Link>
              <Link to={`/myfavourites`} className='sidebar__item'>
                My Favourites
              </Link>
              <Link to={`/settings`} className='sidebar__item'>
                Settings
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;