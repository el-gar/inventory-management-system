import React, { useState, useEffect } from 'react';

const ItemForm = ({ addItem, updateItem, currentItem }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (currentItem) {
      setName(currentItem.name);
      setQuantity(currentItem.quantity);
      setCategory(currentItem.category);
    }
  }, [currentItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const item = { name, quantity: parseInt(quantity), category };
    if (currentItem) {
      updateItem(item);
    } else {
      addItem(item);
    }
    setName('');
    setQuantity('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button type="submit">{currentItem ? 'Update Item' : 'Add Item'}</button>
    </form>
  );
};

export default ItemForm;