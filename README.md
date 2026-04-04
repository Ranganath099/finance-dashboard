#  Finance Dashboard UI

##  Objective

This project is built as part of a frontend evaluation assignment to demonstrate the ability to design and implement a clean, interactive, and responsive finance dashboard.

The focus of this project is on:

* UI/UX design
* Component structure
* State management
* Data handling using mock APIs

---

##  Live Demo

 https://finance-dashboard-umber-mu-78.vercel.app/

---

##  GitHub Repository

 https://github.com/Ranganath099/finance-dashboard.git

---

##  Tech Stack

* **Frontend:** React.js (JavaScript)
* **State Management:** Context API
* **Styling:** Tailwind CSS
* **Routing:** React Router (BrowserRouter)
* **Data Handling:** Mock API with localStorage
* **Deployment:** Vercel

---

##  Features Implemented

### 1️ Dashboard Overview

* Summary cards:

  * Total Balance
  * Total Income
  * Total Expenses
* Time-based visualization (monthly data)
* Category-based insights (spending distribution)

---

### 2️ Transactions Section

* Displays transaction details:

  * Date
  * Amount
  * Category
  * Type (Income/Expense)
* Features:

  * Search functionality
  * Filtering
  * Clean tabular layout

---

### 3️ Role-Based UI (Frontend Simulation)

* **Viewer**

  * Can only view data
* **Admin**

  * Can add, edit, and delete transactions
* Role switching implemented using UI controls

---

### 4️ Insights Section

Provides meaningful financial insights:

* Highest spending category
* Monthly comparison
* Income vs Expense observation

---

### 5️ State Management

* Centralized state using **Context API**
* Managed states:

  * Transactions
  * User role
  * Search/filter inputs

---

### 6️ UI & UX

* Clean and modern design
* Responsive across devices
* Smooth transitions and hover effects
* Handles empty states gracefully

---

##  Project Setup

### Clone the repository

```bash
git clone https://github.com/Ranganath099/finance-dashboard.git
cd finance-dashboard
```

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

---

##  Technical Decisions

* **React.js** was chosen for component-based architecture and scalability.
* **Context API** was used for lightweight state management without external dependencies.
* **Tailwind CSS** enabled rapid UI development and responsive design.
* A **mock API layer** was implemented using localStorage to simulate backend operations.
* **React Router** was used to maintain SPA navigation.

---

##  Trade-offs

* Used localStorage instead of a real backend for simplicity.
* Data is device-specific and does not persist across environments.
* Backend features like authentication and database storage are not implemented.

---

##  Optional Enhancements Implemented

* Mock API integration
* Data persistence using localStorage
* Smooth UI transitions and animations

---

##  Future Improvements

* Backend integration (Django / Node.js)
* Advanced data visualizations (charts)
* Authentication system
* Export functionality (CSV/Excel)
* Advanced filtering and grouping

---

## Conclusion

This project demonstrates a structured approach to building a frontend application, focusing on usability, maintainability, and clean UI design while fulfilling all core assignment requirements.

---

## Author

Sri Ranganath Besta
