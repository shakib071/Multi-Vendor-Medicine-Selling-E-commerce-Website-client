# Multi-Vendor Medicine Selling E-commerce Website


[![React](https://img.shields.io/badge/React-17.0.2-blue?logo=react)](https://reactjs.org/)  
[![Node.js](https://img.shields.io/badge/Node.js-18.0-green?logo=node.js)](https://nodejs.org/)  
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0.2-brightgreen?logo=mongodb)](https://www.mongodb.com/)  
[![Express](https://img.shields.io/badge/Express-4.18.2-black?logo=express)](https://expressjs.com/)  
[![Firebase](https://img.shields.io/badge/Firebase-9.22-yellow?logo=firebase)](https://firebase.google.com/)  
[![Stripe](https://img.shields.io/badge/Stripe-8.0-purple?logo=stripe)](https://stripe.com/)  


A full-featured online platform for buying and selling medicines with separate dashboards for users, sellers, and admins. Built with the **MERN stack** and designed for responsive, real-time, and secure operations.

---

## Admin Credentials
- **Username:** admin@example.com  
- **Password:** Admin@123  

**Live Site URL:** [https://your-website-link.com](https://your-website-link.com)

---

## Features

### General Features
- User authentication and role-based access (User, Seller, Admin)  
- Social login with **Google** and **GitHub**  
- Fully responsive design for **mobile, tablet, and desktop**  
- Sweet alerts/toasts for CRUD operations and authentication  
- Environment variables used for Firebase and MongoDB credentials  
- Dynamic page titles using **react-helmet**  
- Digital clock on navbar (optional feature)  

### Home Page
- Navbar with logo, website name, home, shop, cart, languages dropdown, and login/profile  
- Slider section for admin-managed product slides  
- Category card section with at least 6 categories  
- Discount products slider using **SwiperJS**  
- Two additional sections relevant to the website  
- Footer with relevant links and information  

### User Pages
- **Shop Page:** Browse all medicines, view details in modal, add to cart  
- **Category Details:** Table of medicines in selected category with modal and select button  
- **Cart Page:** Manage selected medicines, adjust quantity, remove items, checkout button  
- **Checkout Page:** Stripe payment integration and invoice generation  
- **Invoice Page:** Printable PDF invoice with purchase details  

### Seller Dashboard
- View total sales revenue (Paid, Pending)  
- Manage medicines: add, edit, delete, with detailed fields including discount  
- Payment history with status (paid/pending)  
- Request advertisement: manage slider medicine images and descriptions  

### Admin Dashboard
- View total sales revenue, paid and pending totals  
- Manage users: assign roles (user/seller/admin)  
- Manage categories: add, edit, delete categories with images  
- Payment management: approve pending payments  
- Sales report: filter by date range, export as PDF/Excel/CSV  
- Manage banner advertisements: toggle slides for homepage  

### User Dashboard
- View payment history with transaction IDs and status  

---

## Challenges Implemented
- Pagination, search, and sort by price on all medicine tables  
- Access token stored in **localStorage** and verified for private routes  
- Download reports in **PDF/Excel format**  
- Date range filtering for sales reports  
- Form management using **React Hook Form**  

---

## Tech Stack
- **Frontend:** React, Tailwind CSS, React Router, React Hook Form, React Helmet, SwiperJS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas  
- **Authentication:** Firebase Auth (Email, Google, GitHub)  
- **Payment Gateway:** Stripe  
- **Other Libraries:** Axios, SweetAlert2, TanStack Query, Pikaday  

---

## Setup Instructions
1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/your-repo.git

2. Navigate into the project folder:
    cd your-repo

3. Install dependencies:
    npm install

4. Create a .env file and add your credentials:
    VITE_apiKey
    VITE_authDomain
    VITE_projectId
    VITE_storageBucket
    VITE_messagingSenderId
    VITE_appId
    VITE_Github_Client_Secrets_Key
    VITE_ImgBB_API
    VITE_Stripe_Publisher_key

5. Start the development server:
    npm run dev

6. Open your browser at http://localhost:5173/

