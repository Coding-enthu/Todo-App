# MERN Stack Todo App

A full-stack todo application built with MongoDB, Express.js, React, and Node.js.

## Features

- 🔐 User authentication (register/login/logout)
- ✅ Create, read, update, and delete todos
- 🎯 Priority levels (low, medium, high)
- 📅 Due dates
- ✔️ Mark todos as complete/incomplete
- 🔍 Filter todos (all, pending, completed)
- 📱 Responsive design
- 🎨 Modern UI with gradient themes

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management

## Project Structure

```
mern-todo-app/
├── server/                 # Backend code
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── .env              # Environment variables
│   ├── server.js         # Entry point
│   └── package.json      # Backend dependencies
├── client/                # Frontend code
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── contexts/     # React contexts
│   │   ├── services/     # API services
│   │   └── App.js       # Main component
│   └── package.json     # Frontend dependencies
└── package.json         # Root package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### 1. Clone the repository
```bash
git clone <repository-url>
cd Todo\ List\ App
```

### 2. Install dependencies
```bash
# Install root dependencies
npm install

# Install server dependencies
npm run install-server

# Install client dependencies
npm run install-client
```

### 3. Environment Setup
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-todo
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### 4. Database Setup
Make sure MongoDB is running on your system:
- **Local MongoDB**: Start mongod service
- **MongoDB Atlas**: Update MONGODB_URI with your connection string

### 5. Run the application

#### Development mode (both frontend and backend):
```bash
npm run dev
```

#### Run separately:
```bash
# Backend only
npm run server

# Frontend only
npm run client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Todos
- `GET /api/todos` - Get all todos for authenticated user
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo
- `PATCH /api/todos/:id/toggle` - Toggle todo completion

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Add Todos**: Use the form to add new tasks with title, description, priority, and due date
3. **Manage Todos**: 
   - Click checkbox to mark as complete/incomplete
   - Use Edit button to modify tasks
   - Use Delete button to remove tasks
4. **Filter**: Use filter buttons to view all, pending, or completed tasks
5. **Dashboard**: View statistics of your tasks

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Author

Sayak Bhattacharyya - bhattacharyya.sayak2004@gmail.com
