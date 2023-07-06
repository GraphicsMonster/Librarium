import React, { useEffect } from 'react'
import { useState } from 'react';
import "./ProfileCard.css"

function ProfileCard(props) {

    const isItLibrary = props.isItLibrary;

    if(isItLibrary) {

        const [libdetails, setLibdetails] = useState({});

        useEffect(() => {
         setLibdetails({
            lib_id : props.libraryId,
            lib_name : props.lib_name,
            lib_email : props.email,
            lib_inventory : props.inventory,
            lib_users: props.totalUsers
         })
        }, [props])

        if(!libdetails) return (<div>Loading...</div>)

        return (
            <div className='profile-card'>
                <div className='profile-card__header'>
                    <div className='profile-card__header__avatar'></div>
                    <div className='profile-card__header__name'>{libdetails.lib_name}</div>
                </div>
                <div className='profile-card__body'>
                    <ul className='profile-body-elements'>
                        <li className='profile-body-elements__username profile-row'>
                            <div className='profile-body-elements__username__label'>Library ID</div>
                            <div className='profile-body-elements__username__value'>{libdetails.lib_id}</div>
                        </li>
                        <li className='profile-body-elements__email profile-row'>
                            <div className='profile-body-elements__email__label'>Email</div>
                            <div className='profile-body-elements__email__value'>{libdetails.lib_email}</div>
                        </li>
                        <li className='profile-inventory-size profile-row'>
                            <div className='profile-inventory-size__label'>Inventory Size</div>
                            <div className='profile-inventory-size__value'>{libdetails.lib_inventory}</div>
                        </li>
                        <li className='profile-registered-users profile-row'>
                            <div className='profile-registered-users__label'>Total registered users</div>
                            <div className='profile-regsitered-users__value'>{libdetails.lib_users}</div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

  return (
    <div className='profile-card'>
        <div className='profile-card__header'>
            <div className='profile-card__header__avatar'></div>
            <div className='profile-card__header__name'>Name</div>
        </div>
        <div className='profile-card__body'>
            <ul className='profile-body-elements'>
                <li className='profile-body-elements__username profile-row'>
                    <div className='profile-body-elements__username__label'>Username</div>
                    <div className='profile-body-elements__username__value'>Username</div>
                </li>
                <li className='profile-body-elements__email profile-row'>
                    <div className='profile-body-elements__email__label'>Email</div>
                    <div className='profile-body-elements__email__value'>Email</div>
                </li>
                <li className='profile-inventory-size profile-row'>
                    <div className='profile-inventory-size__label'>Inventory Size</div>
                    <div className='profile-inventory-size__value'>Inventory Size</div>
                </li>
                <li className='profile-books-held profile-row'>
                    <div className='profile-books-held__label'>Books Held</div>
                    <div className='profile-books-held__value'>Books Held</div>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default ProfileCard;