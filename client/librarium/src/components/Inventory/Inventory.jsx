// Inventory.jsx
import React from 'react';
import './Inventory.css'
import BookCard from '../BookCard/BookCard.jsx';

function Inventory() {
  return (
    <div className="inventory">
      <h2 className="inventory__title">Inventory</h2>
      <div className="inventory__items">
        {/* Inventory item list goes here */}
        <BookCard
          title="Item 1"
          image="item1.jpg"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
        <BookCard
          title="Item 2"
          image="item2.jpg"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
        {/* ... */}
      </div>
    </div>
  );
}

export default Inventory;
