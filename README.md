# TDD Kata: Sweet Shop Management System

**Project Type:**  
Full Stack Web Application (MERN Stack)

---

## 📌 Project Overview

This project is a full-stack **Sweet Shop Management System** built as part of a  
**Test-Driven Development (TDD) Kata**.

The system allows users to browse and purchase sweets, while administrators can
manage inventory, update sweets, and track revenue analytics.

The application demonstrates:
- RESTful API development
- Secure authentication and authorization
- Database-driven inventory management
- Modern frontend SPA development
- Test-Driven Development practices
- Responsible and transparent AI usage

---

## 🛠 Technology Stack

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- Jest
- Supertest

### Frontend
- React (Vite)
- React Router DOM
- Axios
- Chart.js
- HTML
- CSS

### Tools
- Git & GitHub
- MongoDB Atlas UI
- Postman
- VS Code

---

## 🚀 Core Functionality

### User Authentication
- User registration
- User login
- JWT-based authentication
- Role-based authorization (`USER` / `ADMIN`)

### Customer Features
- View all available sweets
- Search sweets by name, category, and price range
- View stock status for each sweet
- Purchase sweets
- Purchase button disabled when stock is zero

### Admin Features
- Admin-only access to inventory management
- Add new sweets
- Edit existing sweets
- Delete sweets
- Restock sweets
- View revenue per sweet using bar chart analytics

---

## 🧠 System Architecture

### Frontend
- Single Page Application (SPA)
- Protected routes based on authentication and role
- Admin panel accessible only to `ADMIN` users

### Backend
- RESTful API
- JWT middleware for protected routes
- Separate admin middleware for admin-only actions

### Database
- MongoDB Atlas
- Persistent storage (not in-memory)

---

## 📊 Data Models

### User Model
```js
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String,
  role: "USER" | "ADMIN",
  createdAt: Date,
  updatedAt: Date
} 
```
---

### Sweet Model
```js
{
  _id: ObjectId,
  name: String,
  category: String,
  price: Number,
  quantity: Number,
  sold: Number,
  image: String,
  createdAt: Date,
  updatedAt: Date
}
```
---

### Revenue Calculation
```js
revenue = price * sold
```
---

## API Endpoints

### Authentication
```js
POST /api/auth/register
POST /api/auth/login
```

---

### Sweets (Protected)
```js
POST   /api/sweets
GET    /api/sweets
GET    /api/sweets/search
PUT    /api/sweets/:id
DELETE /api/sweets/:id        (Admin only)
```

---

### Inventory (Protected)
```js
POST /api/sweets/:id/purchase
POST /api/sweets/:id/restock  (Admin only)
```

---

## 🖥 Frontend Pages

### Customer
- Dashboard (Available Sweets)
- Search and filter interface
- Purchase flow

### Admin
- Admin Panel
- Revenue per Sweet chart
- Add New Sweet form
- Existing Sweets list with Restock, Edit, Delete

### Authentication
- Login page
- Register page

### Screenshots

#### Customer Dashboard
![WhatsApp Image 2025-12-14 at 17 10 07_fc366655](https://github.com/user-attachments/assets/723a26e0-0a33-4dd3-a418-7690c3c5cf2d)

#### Admin Panel
![WhatsApp Image 2025-12-14 at 17 10 33_e30d8d05](https://github.com/user-attachments/assets/d38e8538-c763-4768-81d7-21a71681b471)

#### Revenue per Sweet
![WhatsApp Image 2025-12-14 at 17 10 51_dce3da8a](https://github.com/user-attachments/assets/1f12fdc7-30a7-408c-b1e7-c7b739c09727)

#### Add New Sweet
![WhatsApp Image 2025-12-14 at 17 11 02_7b32b602](https://github.com/user-attachments/assets/de6f998f-1323-4a18-ab72-850844a9fff1)

#### Existing Sweets
![WhatsApp Image 2025-12-14 at 17 11 15_5f1d74ec](https://github.com/user-attachments/assets/a5374f74-2afd-484c-a373-57fda6f30fdb)

#### Login Page
![WhatsApp Image 2025-12-14 at 17 11 29_58447db0](https://github.com/user-attachments/assets/6a1f8c90-a5bb-4ee4-8865-74b9476ae5b0)

#### Register Page
![WhatsApp Image 2025-12-14 at 17 11 43_82b1f346](https://github.com/user-attachments/assets/297f9689-ce82-46c7-b8f4-9c6430447c84)

#### Responsive Design
<img width="544" height="817" alt="image" src="https://github.com/user-attachments/assets/f9097119-6435-490c-a21a-f5ca6dd903ca" />


---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (LTS)
- MongoDB Atlas Account
- Git

### Backend Setup
```js
cd backend
npm install
npm run dev
```

### Backend runs on:
```js
http://localhost:5000
```

### Frontend Setup
```js
cd frontend
npm install
npm run dev
```

### Frontend runs on:
```js
http://localhost:5173
```

---

## 🔐 Environment Variables

### Create a file backend/.env:
```js
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 🔑 Authentication Flow

- User registers or logs in
- Backend validates credentials
- JWT token is returned
- Token stored on client
- Axios attaches token to API requests
- Backend verifies token
- Admin middleware checks ADMIN role where required

### Admin Role Setup (Local):
- Update user role in MongoDB to ADMIN

--- 

## 🧪 Test-Driven Development (TDD)

This project follows **Test-Driven Development (TDD)** principles, with a strong focus on backend logic.

### Testing Tools
- **Jest**
- **Supertest**

### Test Coverage Includes
- User registration and login
- JWT authentication
- Protected routes
- Admin-only authorization
- Sweet CRUD operations
- Purchase logic
- Restock logic
- Error handling scenarios

### TDD Cycle
```text
Red → Green → Refactor
```

---

## 🧾 Git & Version Control

- Git used for version control
- Small, meaningful commits
- Clear and descriptive commit messages
- Commit history reflects the TDD workflow

---

## 🤖 My AI Usage

### AI Tools Used
- **ChatGPT Go** 
- **GitHub Copilot**
- **Perplexity Pro**
- **Cursor**

### How AI Was Used
- Brainstorming system architecture
- Designing REST API structure
- Generating boilerplate code for controllers and models
- Assisting with test case ideas using Jest and Supertest
- Debugging edge cases (e.g., out-of-stock scenarios)
- Improving UI/UX ideas
- Refining README documentation

### AI Co-authorship Policy

For every commit where AI assistance was used, the following co-author trailer was added to the commit message:

```text
Co-authored-by: AI Assistant <AI@users.noreply.github.com>
```

### Reflection

AI accelerated development by reducing boilerplate effort and helping explore alternative solutions.  
All final logic, debugging, and refactoring were done manually to ensure full understanding and originality.

---

## 📦 Deliverables

- Public Git repository
- Complete `README.md`
- Screenshots of the application
- Test report generated using Jest
- Deployed application link - 

---

## 👨‍💻 Author

**Sunidhi Goyal**  
Final Year, bachelor of Engineering
Computer Science and Engineering  
Chandigarh University, Punjab










