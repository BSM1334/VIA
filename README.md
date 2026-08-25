# VIA Project

VIA is a multi-service project for reporting and tracking road traffic incidents. The repository contains two main application stacks:

- `VIA/` — a full-stack web app with a React frontend, Express backend, PostgreSQL database, and Python AI service.
- `VIA api/` — a Laravel API that supports the project backend and server-side business logic.

This repo is structured as a monorepo to make setup and deployment easier for local development and containerized testing.

## Project structure

```text
VIA website/
├── README.md
├── SETUP.md
├── package-lock.json
├── VIA/
│   ├── ai-service/
│   │   ├── app.py
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   ├── backend/
│   │   ├── src/
│   │   ├── routes/
│   │   ├── db.js
│   │   ├── server.js
│   │   ├── Dockerfile
│   │   └── package.json
│   ├── frontend/
│   │   ├── src/
│   │   ├── package.json
│   │   └── Dockerfile
│   ├── db/
│   ├── docker-compose.yml
│   ├── package.json
│   └── vite.config.js
└── VIA api/
    ├── app/
    ├── config/
    ├── database/
    ├── public/
    ├── routes/
    ├── resources/
    ├── tests/
    ├── composer.json
    ├── package.json
    ├── phpunit.xml
    └── vite.config.js
```

## Tech stack

### Main app (`VIA/`)
- React + Vite + Tailwind
- Express.js backend
- PostgreSQL database
- Python AI service
- Docker Compose support

### Laravel API (`VIA api/`)
- Laravel 12
- PHP 8.2+
- Composer
- SQLite or database configured for local development

## Prerequisites

Before running the project, install the following:

- Node.js 18+ and npm
- Python 3.10+
- PHP 8.2+
- Composer
- Docker and Docker Compose (optional but recommended)
- Git

## Quick start with Docker

From the `VIA/` folder:

```bash
cd VIA
docker compose up --build
```

This starts:
- PostgreSQL database on port 5432
- Express backend on port 4000
- React frontend on port 3000
- AI service on port 5000

## Local development setup

### 1) Frontend

```bash
cd VIA/frontend
npm install
npm run dev
```

The frontend should be available on:
- http://localhost:5173

### 2) Backend

```bash
cd VIA/backend
npm install
npm run dev
```

The backend runs on:
- http://localhost:4000

### 3) AI service

```bash
cd VIA/ai-service
python -m venv .venv
. .venv/bin/activate   # Linux/macOS
# or .venv\Scripts\activate   # Windows
pip install -r requirements.txt
python app.py
```

The AI service runs on:
- http://localhost:5000

### 4) Laravel API

```bash
cd "VIA api"
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

The Laravel API runs on:
- http://localhost:8000

## Environment variables

The app expects environment variables for certain services. Check the existing config files and `.env.example` files before running in production. For local development, the included Docker setup sets the most common values automatically.

Common examples:

```env
DATABASE_URL=postgres://via_admin:via_pass@localhost:5432/via_db
JWT_SECRET=verysecret
AI_SERVICE_URL=http://localhost:5000
VITE_API_URL=http://localhost:4000
```

## Useful commands

### Root project

```bash
git status
git add .
git commit -m "Update project"
git push
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
```

### Backend

```bash
npm run dev
npm start
```

### Laravel

```bash
php artisan test
php artisan migrate
php artisan serve
```

## Notes

- The repository currently contains two separate application stacks that may be used together or independently depending on the deployment scenario.
- If you use Docker, start from the `VIA/` folder for the Node/React application setup.
- For Laravel-only work, use the `VIA api/` folder directly.
- Keep environment files local and do not commit secrets to version control.

## License

This project is currently distributed without a separate project license file unless otherwise specified by the repository owner.

## Contributing

Use feature branches and keep changes focused:

```bash
git checkout -b feature/my-change
git add .
git commit -m "Add my change"
git push origin feature/my-change
```

---

For a more detailed step-by-step setup, see [SETUP.md](SETUP.md).
