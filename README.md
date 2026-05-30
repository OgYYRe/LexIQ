```
░██                               ░██████  ░██████   
░██                                 ░██   ░██   ░██  
░██          ░███████  ░██    ░██   ░██  ░██     ░██ 
░██         ░██    ░██  ░██  ░██    ░██  ░██     ░██ 
░██         ░█████████   ░█████     ░██  ░██     ░██ 
░██         ░██         ░██  ░██    ░██   ░██   ░██  
░██████████  ░███████  ░██    ░██ ░██████  ░██████   
                                                ░██  
                                                 ░██ 
```

Simple full-stack LexIQ app.

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js + Express
- Database: MongoDB
- Auth: JWT

---

## Folder Structure

```text
frontend/
  index.html
  style.css
  script.js
  config.example.js

backend/
  src/
  .env.example
  package.json

README.md
```

---

## Local Setup

### 1. Clone repository

```bash
git clone <repo-url>
cd <project-folder>
```

---

### 2. Create backend environment file

```bash
cd backend
cp .env.example .env
```

#### Edit `.env`

##### Option 1 - Local MongoDB

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/lexiq
JWT_SECRET=your_secret_here
```

##### Option 2 - MongoDB Atlas (recommended)

```env
PORT=5000
MONGO_URI=mongodb+srv://your-user:your-password@your-cluster.mongodb.net/lexiq
JWT_SECRET=your_secret_here
```

---

### 3. Create frontend config

```bash
cd ../frontend
cp config.example.js config.js
```

#### Edit `config.js`

##### Option 1 - Local backend

```js
window.API_BASE_URL = "http://localhost:5000";
```

##### Option 2 - Your deployed backend

```js
window.API_BASE_URL = "https://your-backend-url.onrender.com";
```

---

### 4. Start MongoDB (only if using local DB)

If you use MongoDB Atlas, skip this step.

```bash
net start MongoDB
```

If you get a permission error, open powershell as admin and run the command again.

---

### 5. Install and run backend

```bash
cd ../backend
npm install
npm start
```

---

### 6. Open the app in your browser:

```text
http://localhost:5000
```

## Successful Startup

If the backend starts correctly, you should see something like this:

```text
MongoDB connected
Seeded word list
Server running on http://localhost:5000
```

---

## MongoDB

Collections are created automatically:

- users
- words
- gameresults

Word list is seeded on backend start.

---

## Important

Do NOT commit:

```text
backend/.env
frontend/config.js
```

Keep:

```text
backend/.env.example
frontend/config.example.js
```

---

## Docker

The project can now run with separate frontend and backend containers.

### Build and run locally

Create a root `.env` file for Docker Compose first:

```bash
cp .env.example .env
```

Set at least `JWT_SECRET` in that file.

```bash
docker compose up --build
```

This starts:

- frontend on `http://localhost:8080`
- backend on `http://localhost:5000`
- MongoDB on `mongodb://localhost:27017`

### Environment in Docker

Docker Compose reads variables from the root `.env` file:

```env
JWT_SECRET=replace-with-a-long-random-secret
BACKEND_PORT=5000
FRONTEND_PORT=8080
MONGO_URI=mongodb://mongo:27017/lexiq
CORS_ORIGIN=http://localhost:8080
API_BASE_URL=http://localhost:5000
```

The frontend container generates `config.js` at startup from `API_BASE_URL` in its Docker start command.

### JWT secret

`JWT_SECRET` is not something you download from a service. It is just a long random secret string that only your backend knows and uses to sign tokens.

Example PowerShell command to generate one:

```powershell
[Convert]::ToBase64String((1..64 | ForEach-Object { Get-Random -Maximum 256 } | ForEach-Object { [byte]$_ }))
```

Put the generated value into the root `.env` file:

```env
JWT_SECRET=your-generated-secret-here
```

### Build images for GitHub Container Registry

```bash
docker build -t ghcr.io/OgYYRe/lexiq-backend:latest ./backend
docker build -t ghcr.io/OgYYRe/lexiq-frontend:latest ./frontend
```

### Push images to GitHub Container Registry

```bash
echo <github-token> | docker login ghcr.io -u OgYYRe --password-stdin
docker push ghcr.io/OgYYRe/lexiq-backend:latest
docker push ghcr.io/OgYYRe/lexiq-frontend:latest
```

The GitHub token needs package write permissions.
