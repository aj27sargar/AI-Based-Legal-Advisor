# ⚖️ AI-Based Legal Advisor

Live Website: [https://25april.vercel.app/](https://25april.vercel.app/)

---

## 🛠 Tech Stack

- **Frontend:** React.js + Material UI
- **Backend:** Node.js + Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT (JSON Web Tokens)
- **Cloud Storage:** Cloudinary (for file uploads)
- **Deployment:** 
  - Frontend → Vercel
  - Backend → Render

---

## 🚀 Features

- AI-powered legal consultation system
- User authentication (Login / Register)
- Secure JWT authentication with cookie management
- Resume / Document upload to Cloudinary
- Query submission and AI-based reply
- Responsive and clean UI (Material UI)

---

## 🔐 Environment Variables (.env)

You need to set up the following environment variables for the backend server:

```bash
# Server Configuration
PORT=4000

# MongoDB Database
MONGO_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET_KEY=your_jwt_secret_key
JWT_EXPIRES=5D
COOKIE_EXPIRE=5

# Cloudinary Configuration
CLOUDINARY_CLIENT_NAME=your_cloudinary_cloud_name
CLOUDINARY_CLIENT_API=your_cloudinary_api_key
CLOUDINARY_CLIENT_SECRET=your_cloudinary_api_secret

# Frontend URL (CORS Setup)
FRONTEND_URL=http://localhost:5173
```

> **Note:** Never commit your actual credentials. Use `.env` file locally and set environment variables in production platforms like Render and Vercel.

---

## 🖥️ Local Development Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/aj27sargar/25april.git
   ```

2. Install dependencies for backend:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend root and add the environment variables.

4. Run the backend server:
   ```bash
   npm run dev
   ```
   (Server will start on `http://localhost:4000`)

5. For frontend:
   ```bash
   cd frontend_folder
   npm install
   npm run dev
   ```
   (Frontend will start on `http://localhost:5173`)

---

## 🌍 Deployment

- **Backend**: Deployed on **Render**  
- **Frontend**: Deployed on **Vercel**

---

## 📷 Screenshots

| Feature | Screenshot |
|:--------|:------------|
| Home Page | (Add Scr![Screenshot 2025-02-20 095618](https://github.com/user-attachments/assets/3c3100e4-ea58-495f-937e-cbd949306c4f)
eenshot) |
| AI Consultation Form | (Add Screensh![Screenshot 2025-02-25 120354](https://github.com/user-attachments/assets/f5745f8c-875b-4934-aa85-1f86b5051596)
ot) |
| User Login/Register | (Add Screens![Screenshot 2025-02-20 095503](https://github.com/user-attachments/assets/9816d1be-57e3-4018-a445-0841b2dba2c2)
hot) |

---

## 🙌 Author

- 👨‍💻 **Ajit Sargar**  
  [GitHub](https://github.com/aj27sargar) | [LinkedIn](https://www.linkedin.com/in/ajit-sargar-495a1a253/)

#️⃣ Project Tag: `#ajitsargar #AI-Legal-Advisor #MERN`

---
```
