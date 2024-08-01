import React from 'react';
import Item from './Item';

const ItemList = ({ items, deleteItem, setCurrentItem }) => {
  return (
    <ul>
      {items.map(item => (
        <Item key={item.id} item={item} deleteItem={deleteItem} setCurrentItem={setCurrentItem} />
      ))}
    </ul>
  );
};

export default ItemList;