import React from 'react';

const Item = ({ item, deleteItem, setCurrentItem }) => {
  return (
    <li>
      {item.name} - {item.quantity} - {item.category}
      <button onClick={() => setCurrentItem(item)}>Update</button>
      <button onClick={() => deleteItem(item.id)}>Delete</button>
    </li>
  );
};

export default Item;