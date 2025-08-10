# E-commerce API Documentation

This document provides instructions on how to run the project and use the Product API endpoints.

## Tech Stack

*   **Backend**: Node.js, Express.js
*   **Database**: MongoDB with Mongoose

## How to Run the Project

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Set Up Environment Variables**:
    Create a `config.env` file in the `api/config/` directory and add your environment variables (e.g., `MONGO_URI`, `JWT_SECRET`).

3.  **Seed the Database (Optional)**:
    To populate the database with sample data, run:
    ```bash
    npm run seeder
    ```

4.  **Start the Server**:
    ```bash
    npm start
    ```
    The API will be available at `http://localhost:4000` (or your configured port).

## API Endpoints

### Get All Products

Returns a list of all products. Supports filtering by category.

*   **URL**: `/api/v1/products`
*   **Method**: `GET`
*   **Query Parameters**:
    *   `category` (string, optional): Filter products by category name (e.g., `Apparel`).
*   **Sample Request**:
    ```bash
    curl http://localhost:4000/api/v1/products?category=Apparel
    ```

### Get Single Product

Returns a single product by its ID.

*   **URL**: `/api/v1/products/:id`
*   **Method**: `GET`
*   **Sample Request**:
    ```bash
    curl http://localhost:4000/api/v1/products/60d0fe4f5311236168a109ca
    ```

### Create a New Product (Bonus)

Adds a new product to the collection. Requires authentication.

*   **URL**: `/api/v1/products`
*   **Method**: `POST`
*   **Headers**:
    *   `Content-Type`: `application/json`
    *   `Authorization`: `Bearer <your_jwt_token>`
*   **Body** (raw JSON):
    ```json
    {
        "name": "New T-Shirt",
        "description": "A very comfortable cotton t-shirt.",
        "price": 25,
        "cuttedPrice": 30,
        "category": "Apparel",
        "stock": 100,
        "brandname": "Fashion Co",
        "highlights": ["100% Cotton", "Machine Washable"],
        "specifications": "[{\"title\":\"Material\",\"description\":\"Cotton\"}]"
    }
    ```
*   **Sample Request**:
    ```bash
    curl -X POST http://localhost:4000/api/v1/products \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer <your_jwt_token>" \
    -d '{ "name": "New T-Shirt", "description": "A very comfortable cotton t-shirt.", "price": 25, "cuttedPrice": 30, "category": "Apparel", "stock": 100, "brandname": "Fashion Co", "highlights": ["100% Cotton", "Machine Washable"], "specifications":