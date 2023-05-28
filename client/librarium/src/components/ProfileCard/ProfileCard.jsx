import React from 'react'
import "./ProfileCard.css"

function ProfileCard() {
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