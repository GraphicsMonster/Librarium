import React from 'react';
import './Inventory.css';
import BookCard from '../BookCard/BookCard.jsx';

function Inventory() {
  // Mock data for testing
  const bookData = [
    {
      title: 'Item 1',
      image: 'item1.jpg',
      description: 'Random shit for testing',
    },
    {
      title: 'Item 2',
      image: 'item2.jpg',
      description: 'Too lazy to find full lorem ipsum and paste',
    },
    // Add more book objects as needed
  ];

  return (
    <div className="inventory">
      <h2 className="inventory__title">Inventory</h2>
      <div className="inventory__items">
        {bookData.map((book, index) => (
          <BookCard
            key={index}
            title={book.title}
            image={book.image}
            description={book.description}
          />
        ))}
      </div>
    </div>
  );
}

export default Inventory;
