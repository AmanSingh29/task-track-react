# 📝 Task Tracker — React + Redux (Drag & Drop, Filters, Persistence)

A modern, responsive, feature-rich **Task Management Application** built using **React, Redux Toolkit, dnd-kit, TailwindCSS**, and **localStorage persistence**.  
Users can create, edit, organize, reorder, search, and categorize tasks with a clean UI and smooth drag-and-drop experience.

---

## 🚀 Live Demo

👉 **Live App:** https://task-track-fe.netlify.app/  
Hosted on **Netlify**.

---

## 📌 Features

### ✅ Core Features
- Add, edit, delete tasks  
- Mark tasks as complete/incomplete  
- Search tasks  
- Filter by status (All / Active / Completed)  
- Add tags/categories  
- Priority levels (High / Medium / Low)  
- Mobile-first responsive UI  

### 🎯 Advanced Features
- Smooth drag & drop using **dnd-kit**  
- Long-press drag for mobile  
- Haptic feedback (supported devices)  
- Priority badges & category tags  
- Clean animations & transitions  
- Auto-save to **localStorage**  
- State restored on app load  

### 🧠 State Management
- Built using **Redux Toolkit slices**  
- Centralized global state  
- Memoized filtering logic  
- Predictable and scalable architecture  

---

## 🛠️ Tech Stack

| Feature | Technology |
|--------|------------|
| Frontend Framework | React (Vite) |
| State Management | Redux Toolkit |
| Drag & Drop | dnd-kit |
| Styling | Tailwind CSS |
| Storage | localStorage |
| Deployment | Netlify |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone this repository
```bash
git clone https://github.com/AmanSingh29/task-track-react.git
cd task-tracker
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Run the development server
```bash
npm run dev
```

Your app will now be available at:  
👉 **http://localhost:5173/**

---

## 📘 How to Use the App

### ➕ Adding a Task
- Enter a task title  
- Select priority level  
- Optionally add a category tag  
- Click **Add**

### ✏ Editing a Task
- Click **Edit**  
- Modify the text  
- Click **Save**

### ☑ Mark Complete / Incomplete
- Use the task checkbox

### 🗑 Deleting a Task
- Press **Delete** on any task

### 🔍 Searching Tasks
- Use the search bar to filter tasks instantly

### 🎛 Filtering Tasks
Choose between:
- **All**
- **Active**
- **Completed**

### 🏷 Category Tags
- Each task can have multiple categories  
- Categories help group similar tasks

### 🔄 Drag & Drop Reordering
- **Desktop:** Drag anywhere on a task  
- **Mobile:** Long press → drag  
- Smooth animations + vibration feedback

### 💾 Persistent Storage
- All tasks are saved automatically  
- Data is restored when you reopen the app  

---
