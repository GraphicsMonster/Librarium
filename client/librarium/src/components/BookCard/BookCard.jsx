import React from 'react';
import './BookCard.css';

function BookCard({ title, image, description }) {
  return (
    <div className="book-card">
      <img src={image} alt={title} className="book-card__image" />
      <div className="book-card__content">
        <h3 className="book-card__title">{title}</h3>
        <p className="book-card__description">{description}</p>
      </div>
    </div>
  );
}

export default BookCard;
