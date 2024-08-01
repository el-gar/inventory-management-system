// src/components/ItemList.js

import React from 'react';

function ItemList({ items, deleteItem, setCurrentItem }) {
  return (
    <div className="item-list">
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <span className="item-details">
              <strong>Name:</strong> {item.name} <br />
              <strong>Category:</strong> {item.category} <br />
              <strong>Quantity:</strong> {item.quantity}
            </span>
            <div className="item-actions">
              <button className="edit-button" onClick={() => setCurrentItem(item)}>Edit</button>
              <button className="delete-button" onClick={() => deleteItem(item.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;