# College Login System

This project implements a login system for a college using email IDs and passwords. Users are authenticated against a MongoDB database and routed to their respective roles: admin, faculty, or student.

## Project Structure

```
college-login-system
├── src
│   ├── app.js                # Entry point of the application
│   ├── controllers           # Contains controllers for handling requests
│   │   ├── authController.js # Handles user authentication
│   │   └── userController.js # Manages user-related operations
│   ├── models                # Contains Mongoose models
│   │   └── userModel.js      # Defines the User model
│   ├── routes                # Contains route definitions
│   │   ├── authRoutes.js     # Authentication routes
│   │   └── userRoutes.js     # User-related routes
│   └── utils                 # Utility functions
│       └── db.js            # Database connection handling
├── package.json              # npm configuration file
├── .env                      # Environment variables
└── README.md                 # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd college-login-system
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGODB_URI=<your_mongodb_connection_string>
   ```

4. **Run the application:**
   ```
   npm start
   ```

## Usage

- Send a POST request to `/login` with the following JSON body to authenticate users:
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```

- Based on the user's role, they will be routed to the appropriate section of the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.