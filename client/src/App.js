import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

function App() {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get('http://localhost:5000/items');
    setItems(response.data);
  };

  const addItem = async (item) => {
    await axios.post('http://localhost:5000/items', item);
    fetchItems();
  };

  const updateItem = async (item) => {
    await axios.put(`http://localhost:5000/items/${item.id}`, item);
    fetchItems();
    setCurrentItem(null);
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/items/${id}`);
    fetchItems();
  };

  return (
    <div className="App">
      <h1>Inventory Management System</h1>
      <ItemForm addItem={addItem} updateItem={updateItem} currentItem={currentItem} />
      <ItemList items={items} deleteItem={deleteItem} setCurrentItem={setCurrentItem} />
    </div>
  );
}

export default App;
