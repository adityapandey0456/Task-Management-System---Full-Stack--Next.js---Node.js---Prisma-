# todo-list_web

# 📝 Task Management System

The Task Management System is a full-stack web application designed to help users efficiently manage their daily tasks. The application provides secure user authentication and allows users to create, view, update, complete, and delete tasks through a clean and user-friendly interface. This project demonstrates practical implementation of software engineering concepts such as RESTful APIs, authentication, database management, and frontend-backend integration.

## Features
- User Registration and Login
- JWT-based Authentication
- Secure Protected Routes
- Create, Read, Update, and Delete Tasks
- Mark Tasks as Completed or Pending
- Responsive and Professional UI
- Centralized Error Handling
- Role-based task isolation (each user sees only their tasks)

## Tech Stack
Frontend: Next.js (App Router), React, TypeScript, Tailwind CSS  
Backend: Node.js, Express.js, Prisma ORM, SQLite  
Authentication: JSON Web Token (JWT)  
Tools: Git, GitHub, GitHub Desktop, Postman

## Project Structure
project/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   └── task.routes.ts
│   │   ├── middleware/
│   │   │   └── error.middleware.ts
│   │   ├── utils/
│   │   │   ├── prisma.ts
│   │   │   ├── jwt.ts
│   │   │   └── hash.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   └── app/
│   │       ├── login/page.tsx
│   │       ├── register/page.tsx
│   │       ├── dashboard/page.tsx
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       └── globals.css
│   └── package.json
│
└── README.md

## Authentication Flow
Users first register using their name, email, and password. Passwords are securely hashed before being stored in the database. During login, the system verifies the credentials and generates a JWT token on successful authentication. This token is stored in the browser and sent with every protected API request to ensure secure access to user-specific data.

## API Endpoints
Authentication:
POST /auth/register – Register a new user  
POST /auth/login – Login user  

Tasks:
GET /tasks – Fetch all tasks  
POST /tasks – Create a new task  
PATCH /tasks/:id/toggle – Toggle task completion  
DELETE /tasks/:id – Delete a task  

## Installation and Setup
Clone the repository:
git clone https://github.com/your-username/your-repo-name.git  
cd project  

Backend setup:
cd backend  
npm install  

Create a .env file:
DATABASE_URL="file:./dev.db"  
JWT_SECRET="your_secret_key"  

Run Prisma migration:
npx prisma migrate dev  

Start backend server:
npm run dev  

Backend runs on http://localhost:5000  

Frontend setup:
cd frontend  
npm install  
npm run dev  

Frontend runs on http://localhost:3000  

## Testing
All backend APIs were tested using Postman. Frontend authentication flow and protected routes were tested in the browser to ensure proper integration between frontend and backend.

## Learning Outcomes
This project helped in understanding full-stack application development, JWT authentication, REST API design, Prisma ORM, Next.js App Router, Tailwind CSS styling, and Git/GitHub workflow.

## Author
Aditya Pandey

## License
This project is developed for educational and learning purposes.
