# GIMS: The Government Inventory Management System

This Inventory Management System is a full-stack web application designed to manage public sector office equipment and supplies. Inspired by the challenges of organization within an office environment and the problem of equipment going missing, this system provides an efficient way to track and manage inventory items.

## Project Description

The Inventory Management System allows users to create, read, update, and delete inventory items. The application features a modern front-end built with React, a RESTful API backend developed with Flask, and data storage handled by SQLite. The system includes user authentication for secure access and ensures comprehensive error handling and input validation.

## Dependencies and Prerequisites

### Backend (Flask)
- Python 3.x
- Flask
- Flask-SQLAlchemy
- Flask-CORS
- Flask-Login

### Frontend (React)
- Node.js
- React
- Axios

### Installation

#### Backend Setup

1. **Clone the repository:**
   git clone https://github.com/yourusername/inventory-management-system.git
   cd inventory-management-system/backend
2. **Create Virtual Environment:**
   python -m venv venv 
   venv\Scripts\activate (this command is for Windows)
3. **Install Dependencies:**
   pip install -r requirements.txt
4. **Run Backend Server:**
   python app.py 

#### Frontend Setup

1. **Switch to Client/Frontend Directory:**
   cd inventory-management-system/client
2. **Install Dependencies:**
   npm install
3. **Run Frontend Server:**
   npm start 

### API Endpoints

#### Login/Logout and Authentication

    POST /register: Register a new user
        Request Body: { "username": "your_username", "password": "your_password" }
    POST /login: Login a user
        Request Body: { "username": "your_username", "password": "your_password" }
    GET /logout: Logout the current user

#### Items/Inventory 

    GET /items: Retrieve all items
    POST /items: Add a new item
        Request Body: { "name": "item_name", "category": "item_category", "quantity": item_quantity }
    PUT /items/:id: Update an existing item
        Request Body: { "name": "item_name", "category": "item_category", "quantity": item_quantity }
    DELETE /items/:id: Delete an item

#### SQL Queries

    GET /sql/items/category/:category: Retrieve all items from a specific category
    GET /sql/items/last-30-days: Retrieve items created within the last 30 days

#### Report Generation 

    GET /report/items-per-category: Retrieve a report showing the count of items per category

### User Guide

#### Non-Technical User Instructions

1. **Login:**
        -Open the application in your web browser (http://localhost:3000).
        -Enter your username and password on the login screen and click "Login".

2. **Add Item:**
        -After logging in, you will be redirected to the main dashboard.
        -Fill out the form with the item details (name, category, quantity).
        -Click "Add Item" to add the item to the inventory.

3. **Update Item:**
        -Click on the "Edit" button next to the item you want to update.
        -Update the item details in the form and click "Update Item".

4. **Delete Item:**
        -Click on the "Delete" button next to the item you want to remove.
        -Confirm the deletion in the popup dialog.

5. **Logout:**
        -Click the "Logout" button at the top right corner of the dashboard.

### Notes

-Ensure the backend server is running on http://localhost:5000.
-Ensure the frontend development server is running on http://localhost:3000.
-Used Postman to efficiently test the API endpoints.