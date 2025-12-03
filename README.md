## 🚀 Zap Shift Delivery: MERN Stack Parcel Delivery Management System

A fast, secure, and robust **role-based courier platform** designed to manage parcel delivery and tracking for **Users**, **Riders**, and **Admins**.

This project is built using the **MERN** (MongoDB, Express, React, Node.js) stack with a focus on **scalability**, **clean architecture**, and **maintainability**.

---

## 📌 Overview

**Zap Shift Delivery** provides a comprehensive ecosystem for modern parcel logistics:

* **Users** can easily create and track delivery requests in real-time and review their complete delivery history.
* **Riders** are managed through a dedicated dashboard, where they receive, accept, track, and complete assigned delivery tasks.
* **Admins** have full control over the system, including rider management, order monitoring, delivery assignment, and system-wide analytics.

---

## 🔥 Key Features

### ✔ User Features

* **Secure Authentication:** Register/Login using **JWT** (JSON Web Tokens).
* **Parcel Creation:** Intuitive interface to create a new parcel delivery request.
* **Real-time Tracking:** Track the current, live status of any active parcel.
* **History View:** Access and view all previous deliveries and transaction history.
* **Profile Management:** Ability to update personal user profile information.

### ✔ Rider Features

* **Rider Dashboard:** Dedicated interface to manage all assigned tasks.
* **Task Management:** See assigned parcels and the ability to **Accept** or **Decline** delivery tasks.
* **Status Updates:** Step-by-step update of the delivery status, including:
    * `Accepted`
    * `Picked Up`
    * `In Transit`
    * `Delivered`
* **Live Location Update:** Ability to update the **live GPS location** during transit.
* **Delivery History:** View a log of all completed deliveries.

### ✔ Admin Features

* **User & Rider Management:** Full control to manage and oversee all users and riders.
* **Rider Approval:** Approve or Suspend rider accounts to manage the workforce.
* **Order Assignment:** Assign specific riders to pending delivery orders.
* **System View:** Comprehensive view of the entire order system and current statuses.
* **Dashboard Analytics:** Access to key system metrics and analytics for operational insights.

### ✔ System Architecture

* **Role-based Access Control (RBAC):** Strict security ensuring users can only access features relevant to their role.
* **Secure Authentication:** Utilizes **JWT** for stateless and secure user verification.
* **REST API:** Clean and predictable communication layer between the frontend and backend.
* **Database:** **MongoDB** utilized with **Mongoose models** for flexible and scalable data management.
* **Realtime Tracking (Optional):** Architecture supports integration with **Socket.IO** for real-time status updates and location tracking.
* **Responsive UI:** Developed with **React** for a fully responsive, modern user interface.

---

## 💻 Tech Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React, React Router | Modern, responsive UI development. |
| **Backend** | Node.js, Express.js | Fast, scalable server-side environment. |
| **Database** | MongoDB | Flexible NoSQL database with Mongoose ODM. |
| **Authentication** | JWT (JSON Web Tokens) | Secure, industry-standard authentication. |
| **Styling** | CSS/Tailwind CSS (Implied) | (Based on project context) |
| **Optional** | Socket.IO | For potential real-time features. |

---

## 🔗 Live Demo & Repository

* **Live Demo:** [https://module--49.web.app/](https://module--49.web.app/)
* **Client Repository:** [https://github.com/Rafi570/Zap-Shift-Client.git](https://github.com/Rafi570/Zap-Shift-Client.git)
* **Server Repository:** *[https://github.com/Rafi570/Zap-Shift-server.git](https://github.com/Rafi570/Zap-Shift-server.git)*

---

## ⚙️ Installation and Setup

### Prerequisites

* Node.js (LTS version recommended)
* MongoDB instance (Local or Atlas)
* Git

### Steps

1.  **Clone the repositories:**
    ```bash
    git clone [https://github.com/Rafi570/Zap-Shift-Client.git](https://github.com/Rafi570/Zap-Shift-Client.git)
    # Clone the server repository (replace with actual link)
    # git clone <Server-Repo-Link> Zap-Shift-Server
    ```

2.  **Install dependencies (Client):**
    ```bash
    cd Zap-Shift-Client
    npm install
    ```

3.  **Install dependencies (Server):**
    ```bash
    cd ../Zap-Shift-Server # Adjust path if needed
    npm install
    ```

4.  **Configure Environment Variables (Server):**
    Create a `.env` file in the root of the server directory and add the following:
    ```
    PORT=3000
    MONGODB_URI=<Your-MongoDB-Connection-String>
    JWT_SECRET=<A-Strong-Secret-Key>
    ```

5.  **Start the Server:**
    ```bash
    npm start
    # or
    # node index.js
    ```

6.  **Start the Client:**
    ```bash
    cd ../Zap-Shift-Client # Adjust path if needed
    npm run dev
    ```

The client application should now be running on `http://localhost:5173` (or the port specified in your client configuration).

---

## 🤝 Contribution

Contributions are welcome! If you find a bug or have a feature request, please open an issue or submit a pull request.

---
