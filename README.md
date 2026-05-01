# 🚀 Task & Project Management System

A full-stack web application to manage tasks and projects with role-based access (Admin & Member).  
Built using **Spring Boot + React + Tailwind CSS**.

---

## ✨ Features

### 🔐 Authentication
- User Signup & Login (JWT-based)
- Role-based access control (ADMIN / MEMBER)

### 📋 Task Management
- Create tasks
- View tasks  
  - Admin → all tasks  
  - Member → own tasks  
- Update task status (TODO → IN_PROGRESS → DONE)
- Delete tasks  
  - Admin → can delete all  
  - Member → can delete only their own tasks  

### 📁 Project Management (Admin Only)
- Create projects
- View all projects
- Update project status (TODO → IN_PROGRESS → DONE)
- Delete projects

### 📊 Dashboard
- Total tasks
- Completed tasks
- Pending tasks

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios

### Backend
- Spring Boot
- Spring Security
- JWT Authentication
- Hibernate / JPA

### Database
- MySQL

---

## 📂 Project Structure

Team_Task_Manager/
│
├── Backend/
│   ├── controller/
│   ├── service/
│   ├── model/
│   ├── repository/
│   └── config/
│
├── Frontend/
│   ├── pages/
│   ├── routes/
│   ├── context/
│   └── api/

---

## 🔑 API Endpoints

### Auth
POST /api/auth/register  
POST /api/auth/login  

### Tasks
GET /api/tasks  
POST /api/tasks  
PUT /api/tasks/{id}?status=IN_PROGRESS  
DELETE /api/tasks/{id}  

### Projects
GET /api/projects  
POST /api/projects  
PUT /api/projects/{id}/status?status=IN_PROGRESS  
DELETE /api/projects/{id}  

---

## 👤 Roles

ADMIN → Full access (tasks + projects)  
MEMBER → Only own tasks  

---

## 🎯 Status Flow

TODO → IN_PROGRESS → DONE  

---

## 🚀 Future Improvements

- Task assignment UI  
- Notifications  
- Search & filters  
- Drag & drop Kanban board  
- Deployment  

