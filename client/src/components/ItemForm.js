// src/components/ItemForm.js

import React, { useState, useEffect } from 'react';

function ItemForm({ addItem, updateItem, currentItem }) {
  const [item, setItem] = useState({ name: '', category: '', quantity: '' });

  useEffect(() => {
    if (currentItem) {
      setItem(currentItem);
    } else {
      setItem({ name: '', category: '', quantity: '' });
    }
  }, [currentItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentItem) {
      updateItem(item);
    } else {
      addItem(item);
    }
    setItem({ name: '', category: '', quantity: '' });
  };

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <h2>{currentItem ? 'Edit Item' : 'Item Directory'}</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={item.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={item.category}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={item.quantity}
        onChange={handleChange}
        required
      />
      <button type="submit">{currentItem ? 'Update Item' : 'Add Item'}</button>
    </form>
  );
}

export default ItemForm;