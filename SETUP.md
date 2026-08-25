# Setup Guide

This guide explains how to set up the project locally and run each service in the repository.

## 1. Clone the repository

```bash
git clone https://github.com/BSM1334/VIA.git
cd VIA
```

## 2. Install prerequisites

Make sure the following are installed:

- Node.js 18+
- npm
- Python 3.10+
- Composer
- PHP 8.2+
- Docker Desktop or Docker Engine + Compose

## 3. Option A: Run everything with Docker

From the root of the project, open the `VIA/` directory:

```bash
cd VIA
docker compose up --build
```

### Services started by Docker

- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- AI service: http://localhost:5000
- PostgreSQL: localhost:5432

If you want to stop the stack:

```bash
docker compose down
```

## 4. Option B: Run services manually

### Frontend

```bash
cd VIA/frontend
npm install
npm run dev
```

### Backend

```bash
cd VIA/backend
npm install
npm run dev
```

### AI service

```bash
cd VIA/ai-service
python -m venv .venv
# Windows
.venv\Scripts\activate
# Linux/macOS
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

### Laravel API

```bash
cd "VIA api"
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

The Laravel app should then be available at:

- http://localhost:8000

## 5. Common troubleshooting

### `npm install` fails

- Check that Node.js and npm are installed properly.
- Delete `node_modules` and `package-lock.json` if needed and reinstall.

### `composer install` fails

- Ensure PHP 8.2+ and Composer are installed.
- Confirm the required extensions are enabled on your machine.

### Docker containers do not start

- Check that Docker is running.
- Ensure the ports 3000, 4000, 5000, and 5432 are free.

### Laravel app cannot connect to database

- Confirm your `.env` file is configured correctly.
- Run the migration command again after checking database settings.

## 6. Recommended workflow

For a normal local development cycle:

1. Start PostgreSQL and services with Docker, or run them manually.
2. Start the frontend and backend in separate terminals.
3. Run the AI service.
4. Run the Laravel API when backend API logic is needed.
5. Commit changes only after verifying the affected service works.

## 7. Git workflow

```bash
git status
git add .
git commit -m "Describe your changes"
git push origin main
```

## 8. Production notes

- Store all secrets in `.env` files or secret manager configuration.
- Do not commit production credentials or local environment files.
- Review the Docker config and deployment environment before deploying to a live server.

---

For an overview of the repository and technologies used, see [README.md](README.md).
