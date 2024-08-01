import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import LoginForm from './components/LoginForm';

function App() {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchItems();
    }
  }, [isAuthenticated]);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/items', { withCredentials: true });
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
      if (error.response && error.response.status === 401) {
        setIsAuthenticated(false);
      }
    }
  };

  const addItem = async (item) => {
    try {
      await axios.post('http://localhost:5000/items', item, { withCredentials: true });
      fetchItems();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const updateItem = async (item) => {
    try {
      await axios.put(`http://localhost:5000/items/${item.id}`, item, { withCredentials: true });
      fetchItems();
      setCurrentItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`, { withCredentials: true });
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password }, { withCredentials: true });
      if (response.status === 200) {
        setIsAuthenticated(true);
        fetchItems();
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5000/logout', { withCredentials: true });
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="App">
      <h1>G.I.M.S.: The Government Inventory Management System</h1>
      <h2>Managing all your Public Sector Office needs.</h2>
      {isAuthenticated ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          <ItemForm addItem={addItem} updateItem={updateItem} currentItem={currentItem} />
          <ItemList items={items} deleteItem={deleteItem} setCurrentItem={setCurrentItem} />
        </>
      ) : (
        <LoginForm handleLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;