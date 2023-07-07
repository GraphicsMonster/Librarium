import React, { useEffect, useState } from 'react';
import './ProfileCard.css';

function ProfileCard(props) {
  const isItLibrary = props.isItLibrary;
  const [libdetails, setLibdetails] = useState({});

  useEffect(() => {
    setLibdetails({
      lib_id: props.libraryId,
      lib_name: props.lib_name,
      lib_email: props.email,
      lib_inventory: props.inventory,
      lib_users: props.totalUsers
    });
  }, [props]);

  if (isItLibrary && !libdetails) return <div>Loading...</div>;

  return (
    <div className={`profile-card ${isItLibrary ? 'library-profile' : 'user-profile'}`}>
      <div className='profile-card__header'>
        <div className='profile-card__header__avatar'></div>
        <div className='profile-card__header__name'>{isItLibrary ? libdetails.lib_name : 'Name'}</div>
      </div>
      <div className='profile-card__body'>
        <ul className='profile-body-elements'>
          <li className='profile-body-elements__item'>
            <div className='profile-body-elements__label'>
              {isItLibrary ? 'Library ID' : 'Username'}
            </div>
            <div className='profile-body-elements__value'>{isItLibrary ? libdetails.lib_id : 'Username'}</div>
          </li>
          <li className='profile-body-elements__item'>
            <div className='profile-body-elements__label'>Email</div>
            <div className='profile-body-elements__value'>{isItLibrary ? libdetails.lib_email : 'Email'}</div>
          </li>
          {isItLibrary && (
            <>
              <li className='profile-body-elements__item'>
                <div className='profile-body-elements__label'>Inventory Size</div>
                <div className='profile-body-elements__value'>{libdetails.lib_inventory}</div>
              </li>
              <li className='profile-body-elements__item'>
                <div className='profile-body-elements__label'>Total Registered Users</div>
                <div className='profile-body-elements__value'>{libdetails.lib_users}</div>
              </li>
            </>
          )}
          {!isItLibrary && (
            <li className='profile-body-elements__item'>
              <div className='profile-body-elements__label'>Books Held</div>
              <div className='profile-body-elements__value'>Books Held</div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ProfileCard;
