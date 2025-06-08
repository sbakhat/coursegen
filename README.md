# Course Generator Web Application

A modern web application for creating, managing, and taking online courses. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and Material-UI for a beautiful user interface.

## Features

- User authentication (Register, Login, Logout)
- Role-based access control (Student, Instructor)
- Course creation and management
- Course enrollment
- Course reviews and ratings
- Course search and filtering
- Responsive design
- Modern UI/UX with Material-UI

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd course-generator
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd client
npm install
```

4. Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

## Running the Application

1. Start the backend server:
```bash
npm run dev
```

2. In a new terminal, start the frontend development server:
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Project Structure

```
course-generator/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/     # React components
│       ├── store/         # Redux store and slices
│       └── App.js         # Main App component
├── models/                # Mongoose models
├── routes/               # Express routes
├── middleware/          # Custom middleware
├── server.js           # Express server
└── package.json        # Project dependencies
```

## API Endpoints

### Authentication
- POST /api/users/register - Register a new user
- POST /api/users/login - Login user
- GET /api/users/profile - Get user profile

### Courses
- GET /api/courses - Get all courses
- GET /api/courses/:id - Get single course
- POST /api/courses - Create new course
- PUT /api/courses/:id - Update course
- DELETE /api/courses/:id - Delete course
- POST /api/courses/:id/reviews - Add course review

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Material-UI for the beautiful components
- MongoDB for the database
- Express.js for the backend framework
- React.js for the frontend framework 