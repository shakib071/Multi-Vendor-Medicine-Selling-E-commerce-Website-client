# Multi-Vendor Medicine Selling E-commerce Website


[![React](https://img.shields.io/badge/React-17.0.2-blue?logo=react)](https://reactjs.org/)  
[![Node.js](https://img.shields.io/badge/Node.js-18.0-green?logo=node.js)](https://nodejs.org/)  
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0.2-brightgreen?logo=mongodb)](https://www.mongodb.com/)  
[![Express](https://img.shields.io/badge/Express-4.18.2-black?logo=express)](https://expressjs.com/)  
[![Firebase](https://img.shields.io/badge/Firebase-9.22-yellow?logo=firebase)](https://firebase.google.com/)  
[![Stripe](https://img.shields.io/badge/Stripe-8.0-purple?logo=stripe)](https://stripe.com/)  
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.1.11-blue?logo=tailwind-css)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React%20Router-7.8.0-red?logo=react-router)](https://reactrouter.com/)
[![React Query](https://img.shields.io/badge/React%20Query-5.85.0-blue?logo=react-query)](https://tanstack.com/query/v5)
[![Axios](https://img.shields.io/badge/Axios-1.11.0-lightgrey?logo=axios)](https://axios-http.com/)
[![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-7.62.0-blueviolet?logo=react)](https://react-hook-form.com/)
[![SweetAlert2](https://img.shields.io/badge/SweetAlert2-11.22.4-orange?logo=javascript)](https://sweetalert2.github.io/)
[![React Toastify](https://img.shields.io/badge/React%20Toastify-11.0.5-yellowgreen?logo=react)](https://fkhadra.github.io/react-toastify/)
[![Swiper](https://img.shields.io/badge/Swiper-11.2.10-skyblue?logo=swiper)](https://swiperjs.com/)
[![Lottie](https://img.shields.io/badge/Lottie-2.4.1-pink?logo=lottie)](https://lottiefiles.com/)
[![React Data Table](https://img.shields.io/badge/React%20Data%20Table-7.7.0-purple?logo=react)](https://www.npmjs.com/package/react-data-table-component)



A full-featured online platform for buying and selling medicines with separate dashboards for users, sellers, and admins. Built with the **MERN stack** and designed for responsive, real-time, and secure operations.

---

## Admin Credentials
- **Username:** shakibadmin@gmail.com 
- **Password:** Admin071  

**Live Site URL:** [https://your-website-link.com](https://your-website-link.com)

---

## Repositories 

- **Client Side:** [https://github.com/shakib071/Multi-Vendor-Medicine-Selling-E-commerce-Website-client.git](https://github.com/shakib071/Multi-Vendor-Medicine-Selling-E-commerce-Website-client.git)\
- **ServerSide:** [https://github.com/shakib071/Multi-Vendor-Medicine-Selling-E-commerce-Website-Server](https://github.com/shakib071/Multi-Vendor-Medicine-Selling-E-commerce-Website-Server)

## Features

### General Features
- User authentication and role-based access (User, Seller, Admin)  
- Social login with **Google** and **GitHub**  
- Fully responsive design for **mobile, tablet, and desktop**  
- Sweet alerts/toasts for CRUD operations and authentication  
- Environment variables used for Firebase and MongoDB credentials  
- Dynamic page titles using **react-helmet**  
- Digital clock on navbar (optional feature)  

###  Key Features (Bullet Points)

  -  Multi-vendor support (Admin, Seller, User)
  -  User authentication (Email/Password + Google/GitHub login)
  -  Responsive UI for mobile, tablet, and desktop
  -  Product search, filter, and sort functionality
  -  Cart management and checkout with Stripe
  -  Invoice generation as PDF
  -  Admin & Seller dashboards for product & sales management
  -  SweetAlert / Toast notifications for CRUD operations
  -  Data fetching with TanStack React Query
  -  Download sales reports in PDF/Excel/CSV
  -  Dynamic page titles using React Helmet
  -  Typewriter animations and Lottie animations for better UX

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

## Dependencies 

### Frontend
- **React** (`^19.1.1`) – UI library for building dynamic user interfaces  
- **React DOM** (`^19.1.1`) – React renderer for the web  
- **React Router** (`^7.8.0`) – Declarative routing for React apps  
- **React Hook Form** (`^7.62.0`) – Easy and performant form handling  
- **React Helmet** (`^6.1.0`) – Manage dynamic page titles and meta tags  
- **React Icons** (`^5.5.0`) & **Lucide React** (`^0.539.0`) – Icon libraries for UI components  
- **React Simple Typewriter** (`^5.0.1`) & **Typewriter Effect** (`^2.22.0`) – For typewriter text animations  
- **React Data Table Component** (`^7.7.0`) – For responsive tables with sorting and pagination  
- **React Export Table to Excel** (`^1.0.6`) – Export table data to Excel  
- **React Toastify** (`^11.0.5`) – Elegant toast notifications  

### Backend / Utilities
- **Axios** (`^1.11.0`) – HTTP client for API requests  
- **Firebase** (`^12.1.0`) – Authentication, Firestore, and cloud services  
- **SweetAlert2** (`^11.22.4`) – Beautiful alerts and modals  

### Styling & UI
- **Tailwind CSS** (`^4.1.11`) & **@tailwindcss/vite** (`^4.1.11`) – Utility-first CSS framework  
- **Swiper** (`^11.2.10`) – Mobile-friendly sliders and carousels  
- **Lottie React** (`^2.4.1`) – Animations using Lottie JSON files  

### PDF & Image Generation
- **jspdf** (`^3.0.1`) & **jspdf-autotable** (`^5.0.2`) – Generate PDFs and tables dynamically  
- **html-to-image** (`^1.11.13`) & **html2canvas** (`^1.4.1`) – Convert HTML to images  

### Payments
- **@stripe/react-stripe-js** (`^3.9.0`) & **@stripe/stripe-js** (`^7.8.0`) – Stripe integration for secure payment processing  

---

## Setup Instructions
1. Clone the repository:  
   ```bash
   git clone https://github.com/shakib071/Multi-Vendor-Medicine-Selling-E-commerce-Website-client.git

2. Navigate into the project folder:
    ```bash 
    cd your-repo

3. Install dependencies:
    ```bash 
    npm install

4. Create a .env file and add your credentials:
  -  VITE_apiKey
  -  VITE_authDomain
  -  VITE_projectId
  -  VITE_storageBucket
  -  VITE_messagingSenderId
  -  VITE_appId
  -  VITE_Github_Client_Secrets_Key
  -  VITE_ImgBB_API
  -  VITE_Stripe_Publisher_key

5. Start the development server:
    ```bash 
    npm run dev

6. Open your browser at 
    ```bash 
     http://localhost:5173/

