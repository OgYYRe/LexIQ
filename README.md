```
██╗     ███████╗██╗  ██╗██╗ ██████╗ 
██║     ██╔════╝╚██╗██╔╝██║██╔═══██╗
██║     █████╗   ╚███╔╝ ██║██║   ██║
██║     ██╔══╝   ██╔██╗ ██║██║▄▄ ██║
███████╗███████╗██╔╝ ██╗██║╚██████╔╝
╚══════╝╚══════╝╚═╝  ╚═╝╚═╝ ╚══▀▀═╝                                  
```
---

LexIQ ist eine Full-Stack-Webanwendung für ein wortbasiertes Spiel mit Benutzerkonto, Login und Punktesystem. Das Frontend wurde mit HTML, CSS und JavaScript umgesetzt. Das Backend basiert auf Node.js und Express und stellt eine REST-API für Authentifizierung, Spielverwaltung und Leaderboard bereit. Die Daten werden in MongoDB gespeichert.

Die Anwendung ist in einen Frontend- und einen Backend-Teil aufgeteilt und kann lokal oder containerisiert mit Docker betrieben werden. Zur technischen Umgebung gehören außerdem GitHub für die Versionsverwaltung, GitHub Actions für Build und Deployment, GitHub Container Registry für Docker Images sowie Render für das Hosting der bereitgestellten Services.

## Lokales Setup

### 1. Repository klonen

```bash
git clone <repo-url>
cd LexIQ
```

### 2. Root-Umgebungsdatei erstellen

```bash
cp .env.example .env
```

Danach die `.env` anpassen:

```env
JWT_SECRET=replace-with-a-long-random-secret
BACKEND_PORT=5000
FRONTEND_PORT=8080
MONGO_URI=mongodb://mongo:27017/lexiq
CORS_ORIGIN=http://localhost:8080
API_BASE_URL=http://localhost:5000
```

### 3. Anwendung mit Docker starten

```bash
docker compose up --build
```

Danach ist die Anwendung unter folgenden Adressen erreichbar:

- Frontend: `http://localhost:8080`
- Backend: `http://localhost:5000`
- MongoDB: `mongodb://localhost:27017`

### 4. Alternative ohne Docker

Backend-Konfiguration anlegen:

```bash
cd backend
cp .env.example .env
```

Beispiel für `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/lexiq
JWT_SECRET=your_secret_here
CORS_ORIGIN=http://localhost:5000
```

Frontend-Konfiguration anlegen:

```bash
cd ../frontend
cp config.example.js config.js
```

Beispiel für `frontend/config.js`:

```js
window.API_BASE_URL = "http://localhost:5000";
```

Anschließend MongoDB starten, Backend-Abhängigkeiten installieren und den Server ausführen:

```bash
cd ../backend
npm install
npm start
```

Beim lokalen Start ohne Docker wird das Frontend ebenfalls durch den Backend-Server ausgeliefert. Die Anwendung ist dann unter `http://localhost:5000` erreichbar.

### 5. Tests lokal ausführen

```bash
cd backend
npm install
npm test
```
