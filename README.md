# NFL Stats Platform

This repository contains a web-based NFL statistics platform with a **Flask** backend and a **React** frontend. Users can explore, filter, and compare team and player statistics from the 2012–2023 seasons.

---

## 📂 Repository Structure

```text
nfl-stats-platform/
├── backend/                # Flask application
│   ├── app.py              # Flask routes & API endpoints
│   └── requirements.txt    # Python dependencies
│   └── venv/               # (Created locally) Python virtual environment

├── frontend/               # React application
│   ├── public/             # Static HTML and assets
│   ├── src/                # React source code
│   ├── package.json        # npm scripts & dependencies
│   └── node_modules/       # (Created locally) Node packages

├── .gitignore              # Ignored files (venv, node_modules, etc.)
└── README.md               # This file
```

---

## 🛠 Prerequisites

- **Git** (v2.x+)
- **Python** (v3.8–3.11)
- **Node.js** (v16.x or higher) and **npm**

---

## 🚀 Setup & Run Locally

### 1. Clone the repository

```bash
git clone git@github.com:<your-user>/nfl-stats-platform.git
cd nfl-stats-platform
```

### 2. Backend (Flask)

1. Create and activate a virtual environment:
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate      # macOS/Linux
   # .\venv\Scripts\activate   # Windows PowerShell
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the Flask server:
   ```bash
   export FLASK_APP=app.py      # macOS/Linux
   set FLASK_APP=app.py         # Windows PowerShell
   flask run
   ```
4. The API will be available at: `http://localhost:5000`

### 3. Frontend (React)

1. Open a new terminal, navigate to the `frontend` folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. The React app will open in your browser at: `http://localhost:3000`

> **Tip:** The React dev server proxies `/api/*` requests to the Flask backend on port 5000 (configured in `package.json`).

---

## 📝 Usage

1. Visit **Home** for an overview.
2. Click **Teams** or **Players** in the navbar.
3. Toggle **Weekly** / **Yearly** stats with the button group.
4. Data will be fetched dynamically from the Flask API.

---

## 📖 Further Development

- **Database Integration**: Add Oracle (or another) database and update `app.py` with real queries.
- **Deployment**: Containerize with Docker or deploy to a PaaS (Heroku, AWS, etc.).
- **Styling**: Refine CSS or integrate a UI library for charts and tables.

---

## 🤝 Contributing

1. Fork this repo.
2. Create a feature branch: `git checkout -b feature/YourFeature`.
3. Commit your changes: `git commit -m "Add feature..."`.
4. Push branch: `git push origin feature/YourFeature`.
5. Open a Pull Request.

---

## 📄 License

This project is licensed under [MIT](LICENSE).

