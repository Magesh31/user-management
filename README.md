# Eizen – React + Python Flask Application

A full-stack web application built using **React.js** for the frontend and **Python Flask** for the backend REST API.

## 📁 Project Structure

```text
eizen/
│
├── my-app/                    # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│
├── backend/                   # Python Flask Backend
│   ├── app.py
│   ├── requirements.txt
│   └── venv/                   # Python virtual environment
│
├── .gitignore
└── README.md
```

## 🛠️ Technologies Used

### Frontend
- React.js
- JavaScript (ES6+)
- HTML5
- CSS3
- Fetch API

### Backend
- Python 3
- Flask
- Flask-CORS
- REST API
- JSON

## ⚙️ Prerequisites

Install the following before setting up the application:

- [Node.js](https://nodejs.org/) (LTS version)
- npm (included with Node.js)
- [Python 3](https://www.python.org/downloads/)
- Git (optional)

Verify the installations:

```bash
node -v
npm -v
python --version
pip --version
```

## 🚀 Installation and Setup

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd eizen
```

If you already have the project locally, navigate to your project folder instead.

### 2. Frontend Setup (React.js)

Navigate to the React application:

```bash
cd my-app
```

Install the dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

The frontend will run at:

http://localhost:3000

The React app uses the Flask backend running at `http://127.0.0.1:5000`.

Keep the React terminal running.

### 3. Backend Setup (Python Flask)

Open a **new terminal** in the root `eizen` directory.

Navigate to the backend:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment on Windows CMD:

```cmd
venv\Scripts\activate
```

For Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

Install the Python dependencies:

```bash
pip install -r requirements.txt
```

If `requirements.txt` does not exist yet, install the packages manually:

```bash
pip install flask flask-cors
```

Save the dependencies:

```bash
pip freeze > requirements.txt
```

Start the Flask server:

```bash
python app.py
```

The backend will run at:

http://127.0.0.1:5000

Keep the backend terminal running.

## ▶️ Running the Application

Run the frontend and backend in two separate terminals.

**Terminal 1 – React Frontend**

```bash
cd my-app
npm start
```

**Terminal 2 – Flask Backend**

```bash
cd backend
venv\Scripts\activate
python app.py
```

Open the application in your browser:

http://localhost:3000

## 🔗 Backend API Endpoints

The Flask backend currently exposes the following REST API endpoints.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check backend status |
| GET | `/api/users` | Retrieve all users |
| POST | `/api/users` | Create a user |

### 1. Check Backend Status

**Request**

```http
GET http://127.0.0.1:5000/
```

**Response**

```json
{
  "message": "Flask API is running!"
}
```

### 2. Get All Users

**Request**

```http
GET http://127.0.0.1:5000/api/users
```

**Response**

```json
[
  {
    "id": 1,
    "name": "Magesh"
  },
  {
    "id": 2,
    "name": "John"
  },
  {
    "id": 3,
    "name": "David"
  }
]
```

### 3. Create a User

**Request**

```http
POST http://127.0.0.1:5000/api/users
Content-Type: application/json
```

**Request Body**

```json
{
  "name": "Alex"
}
```

**Response**

```json
{
  "id": 4,
  "name": "Alex"
}
```

The current example uses in-memory sample data and does not persist newly created users. A database can be integrated for permanent storage.

## 🌐 Frontend and Backend Integration

The React application communicates with the Flask API using the Fetch API.

Example:

```javascript
const response = await fetch(
  "http://127.0.0.1:5000/api/users"
);

const data = await response.json();
console.log(data);
```

For creating a user:

```javascript
const response = await fetch(
  "http://127.0.0.1:5000/api/users",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: "Alex"
    })
  }
);

const data = await response.json();
console.log(data);
```

Flask-CORS is enabled to allow requests from the React development server.

## 📦 Dependencies

### React Dependencies

Managed using `package.json`.

Install them using:

```bash
npm install
```

### Python Dependencies

The backend uses `requirements.txt`.

Example:

```text
Flask
Flask-Cors
```

Install them using:

```bash
pip install -r requirements.txt
```

## 🔒 Environment Configuration

For local development, the API URL is:

```text
http://127.0.0.1:5000
```

For production deployment, configure the frontend to use the deployed backend URL and restrict Flask-CORS to trusted origins.

Do not commit `.env` files containing secrets, credentials, or API keys.

## 🧪 Testing the API

You can test the Flask API using a browser, Postman, or curl.

Check backend status:

```bash
curl http://127.0.0.1:5000/
```

Retrieve users:

```bash
curl http://127.0.0.1:5000/api/users
```

Create a user:

```bash
curl -X POST http://127.0.0.1:5000/api/users \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Alex\"}"
```

## 🛠️ Troubleshooting

### React: `npm is not recognized`

Install Node.js and restart your terminal.

Verify:

```bash
node -v
npm -v
```

### React: Port 3000 is already in use

Stop the existing React server or choose another available port when prompted.

### Flask: `ModuleNotFoundError: No module named 'flask'`

Activate the virtual environment and install dependencies:

```bash
venv\Scripts\activate
pip install -r requirements.txt
```

### Flask: `Address already in use`

Another application may be using port 5000. Stop the existing Flask process or configure the application to use a different port.

### React: Failed to fetch

Make sure the Flask server is running:

```bash
python app.py
```

Check that the API is accessible at:

http://127.0.0.1:5000/api/users

Also verify that Flask-CORS is installed and enabled.

### Git: `my-app` shows modified content

Check whether `my-app` is a nested Git repository or a submodule:

```bash
git ls-files --stage my-app
```

Configure Git appropriately before committing frontend changes to the main repository.

## 📌 Important Notes

- Start the Flask backend before testing API functionality in React.
- Run React and Flask in separate terminals.
- The current backend uses sample in-memory data.
- User records are not permanently stored.
- Flask debug mode is for local development only.
- Use a production-ready WSGI server and secure configuration when deploying.

## 🔮 Future Enhancements

- SQLite or MySQL database integration
- User registration and login
- JWT authentication
- CRUD operations (Create, Read, Update, Delete)
- API validation and error handling
- Production deployment

## 👨‍💻 Development

**Frontend:** React.js  
**Backend:** Python Flask  
**Architecture:** REST API

---

**Eizen – React + Flask Full-Stack Application**