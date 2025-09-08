# Web-Assist – Smart Web Platform 

## 🚀 Overview  
**Web-Assist** is a smart web application built with **Django** that provides user authentication, search assistance, and integrated web utilities. The platform combines backend logic with a clean frontend interface to deliver a smooth user experience.  

### Key Features  
- 🔐 **User Authentication** – Signup, login, logout, and password reset  
- 📊 **Search & History** – Save and track user search queries  
- 📧 **Email Integration** – Email verification and notifications  
- 🖼️ **Frontend Templates** – Responsive UI with static assets (CSS, JS, images, fonts)  
- ⚡ **Custom Commands** – Extendable Django management commands (e.g., active user checks)  

---

## 📂 Project Structure  
\`\`\`
smart-web/
├── backend/
│   ├── manage.py
│   ├── db.sqlite3
│   ├── package.json / package-lock.json
│   ├── backend/            # Django project settings
│   └── authenticator/      # Core Django app
│       ├── models.py       # Database models
│       ├── views.py        # Business logic
│       ├── urls.py         # App routing
│       ├── serializers.py  # API serializers
│       ├── templates/      # HTML templates
│       ├── static/         # CSS, JS, fonts, images
│       └── migrations/     # Database migrations
\`\`\`

---

## ⚙️ Installation & Setup  

### 1. Clone the Repository  

    git clone https://github.com/Mishaa931/Web-Assist.git
    cd Web-Assist/smart-web/backend


### 2. Create Virtual Environment  

    python -m venv venv
    source venv/bin/activate   # On Linux/Mac
    venv\Scripts\activate      # On Windows


### 3. Install Dependencies  

    pip install -r requirements.txt


### 4. Run Database Migrations  

    python manage.py migrate


### 5. Create Superuser (Admin Access)  

    python manage.py createsuperuser

### 6. Start Development Server  

    python manage.py runserver

Now visit: 👉 http://127.0.0.1:8000/  

---

## 🖼️ Layout  
<p align="center">
  <img src="https://github.com/Mishaa931/Web-Assist/blob/main/Images/landingpage.png", alt=" Landing Page" width="50%" height="50%">
</p> 

<p align="center">
  <img src="https://github.com/Mishaa931/Web-Assist/blob/main/Images/sign%20up.png", alt=" Sign Up Page" width="50%" height="50%">
</p> 

<p align="center">
  <img src="https://github.com/Mishaa931/Web-Assist/blob/main/Images/login.png", alt=" Login Page" width="50%" height="50%">
</p> 

<p align="center">
  <img src="https://github.com/Mishaa931/Web-Assist/blob/main/Images/search.png", alt=" Search Page" width="50%" height="50%">
</p> 

<p align="center">
  <img src="https://github.com/Mishaa931/Web-Assist/blob/main/Images/browser%20history.png", alt=" browser history Page" width="50%" height="50%">
</p> 

---

## 🛠️ Tech Stack  
- **Backend**: Django (Python)  
- **Frontend**: HTML, CSS, JavaScript  
- **Database**: SQLite (default, can be swapped with PostgreSQL/MySQL)  
- **APIs**: Django REST Framework serializers  
- **Other**: Node.js (for frontend build/scripts if required)  

---

## 🤝 Contributing  
1. Fork the repository  
2. Create a new branch (\`feature/my-feature\`)  
3. Commit your changes (\`git commit -m 'Add new feature'\`)  
4. Push to your branch (\`git push origin feature/my-feature\`)  
5. Open a Pull Request  

---

## 📜 License  
This project is licensed under the MIT License." > README.md


