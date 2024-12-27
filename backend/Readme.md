# Backend routes details 


# User and Account Routes Documentation

This document provides an overview of the `user` and `account` routes in the application. These routes handle operations such as user signup, signin, updating user data, filtering user data, viewing account balances, and transferring funds.

---

## **User Routes**

### **1. User Signup**
- **Endpoint:** `/signup`
- **Method:** `POST`
- **Authorization:** Yes (requires authentication middleware `auth`)
- **Description:** Allows a new user to sign up.

#### Request Body:
```json
{
  "username": "string",
  "password": "string",
  "email": "string",
  "firstname": "string",
  "lastname": "string"
}
```

#### Responses:
- **201 Created:**
  ```json
  {
    "message": "User created successfully",
    "token": "string",
    "user": {
      "_id": "string",
      "username": "string",
      "email": "string",
      ...
    }
  }
  ```
- **411 Invalid Data:**
  ```json
  {
    "error": "Invalid data"
  }
  ```
- **411 Email Taken:**
  ```json
  {
    "message": "Email already taken / Incorrect inputs"
  }
  ```

---

### **2. User Signin**
- **Endpoint:** `/sigin`
- **Method:** `POST`
- **Authorization:** No
- **Description:** Allows an existing user to log in.

#### Request Body:
```json
{
  "username": "string",
  "password": "string"
}
```

#### Responses:
- **200 OK:**
  ```json
  {
    "token": "string",
    "user": {
      "_id": "string",
      "username": "string",
      "email": "string",
      ...
    }
  }
  ```
- **411 Invalid Data:**
  ```json
  {
    "error": "Invalid data"
  }
  ```
- **411 User Not Found:**
  ```json
  {
    "message": "User does not exist"
  }
  ```
- **411 Incorrect Password:**
  ```json
  {
    "message": "Incorrect password"
  }
  ```

---

### **3. Update User**
- **Endpoint:** `/`
- **Method:** `PUT`
- **Authorization:** Yes (requires authentication middleware `auth`)
- **Description:** Allows an authenticated user to update their profile information.

#### Request Body:
```json
{
  "username": "string (optional)",
  "email": "string (optional)",
  "firstname": "string (optional)",
  "lastname": "string (optional)"
}
```

#### Responses:
- **200 OK:**
  ```json
  {
    "message": "User updated successfully",
    "user": {
      "_id": "string",
      "username": "string",
      "email": "string",
      ...
    }
  }
  ```
- **411 Invalid Data:**
  ```json
  {
    "error": "Invalid data"
  }
  ```

---

### **4. Filter Users**
- **Endpoint:** `/bulk`
- **Method:** `GET`
- **Authorization:** No
- **Description:** Fetches a list of users filtered by query parameters.

#### Query Parameters:
- `filter` (optional): A string to filter users by `firstname` or `lastname`.

#### Responses:
- **200 OK:**
  ```json
  {
    "users": [
      {
        "username": "string",
        "firstname": "string",
        "lastname": "string",
        "_id": "string"
      },
      ...
    ]
  }
  ```

---

## **Account Routes**

### **1. View Account Balance**
- **Endpoint:** `/balance`
- **Method:** `GET`
- **Authorization:** Yes (requires authentication middleware `auth`)
- **Description:** Retrieves the account balance for the authenticated user.

#### Responses:
- **200 OK:**
  ```json
  {
    "accountBalance": 1000
  }
  ```
- **400 Bad Request:**
  ```json
  {
    "message": "Account not found"
  }
  ```

---

### **2. Transfer Amount**
- **Endpoint:** `/transfer`
- **Method:** `POST`
- **Authorization:** Yes (requires authentication middleware `auth`)
- **Description:** Transfers a specified amount from the authenticated user's account to another user's account.

#### Request Body:
```json
{
  "amount": 500,
  "to": "recipientUserId"
}
```

#### Responses:
- **200 OK:**
  ```json
  {
    "message": "Amount transferred successfully"
  }
  ```
- **400 Insufficient Balance:**
  ```json
  {
    "message": "Insufficient balance"
  }
  ```
- **400 Invalid User:**
  ```json
  {
    "message": "Invalid user"
  }
  ```
- **500 Server Error:**
  ```json
  {
    "message": "Transaction failed"
  }
  ```

---

## **Error Handling**
- **HTTP 400:** Returned for bad requests, such as insufficient balance or invalid user IDs.
- **HTTP 500:** Returned for unexpected server errors.

---

## **Middleware**
- **`auth` Middleware:** Protects sensitive routes (e.g., balance and transfer) by ensuring only authenticated users can access them.

---

## **Validation**
- **Request Validation:**
  - Ensure proper structure for request payloads.
  - Validate user authentication and input values.

---

## **Models Used**
- **`account` Model:**
  - Contains fields such as `userId` and `accountBalance`.

---

## **Setup Instructions**
1. Ensure you have all dependencies installed:
   ```bash
   npm install express mongoose
   ```
2. Use the route in your Express app:
   ```javascript
   const accountRoutes = require('./routes/account');
   app.use('/account', accountRoutes);
   ```
3. Ensure your MongoDB connection is established and the `account` model is correctly defined.

---

## **Future Enhancements**
- Add email notifications for successful transfers.
- Implement rate limiting to prevent abuse of the transfer route.
- Add support for multi-currency accounts.


