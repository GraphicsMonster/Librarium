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
          description="Random shit for testing"
        />
        <BookCard
          title="Item 2"
          image="item2.jpg"
          description="Too lazy to find full lorem ipsum and paste"
        />
        {/* ... */}
      </div>
    </div>
  );
}

export default Inventory;
