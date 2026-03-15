# 🗂️ Windows Explorer Clone

A high-performance web application designed to simulate the look and feel of the **Windows File Explorer**. This project is architected as a fullstack monorepo, featuring a modern REST API backend and a reactive Vue.js frontend.

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | [Bun](https://bun.sh/) + [Elysia.js](https://elysiajs.com/) |
| **Frontend** | [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/) + TypeScript |
| **Database** | PostgreSQL ([Docker](https://www.docker.com/) optional) + [Drizzle ORM](https://orm.drizzle.team/) |
| **Package Manager** | [Bun](https://bun.sh/) (workspace monorepo) |

## 📁 Project Structure

```
windows-explorer/
├── apps/
│   ├── backend/      # REST API (Elysia.js, port 3000)
│   └── frontend/     # Web App (Vue 3 + Vite, port 5173)
├── packages/
│   └── types/        # Shared TypeScript types
├── docker-compose.yml
└── package.json
```

## ⚙️ Prerequisites

Ensure you have the following installed:

- [Bun](https://bun.sh/) >= 1.0
- [Docker](https://www.docker.com/) & Docker Compose (optional, if you don't have a local PostgreSQL instance)

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/username/windows-explorer.git
cd windows-explorer
```

### 2. Install all dependencies (monorepo)

```bash
bun install
```

### 3. Setup Backend environment variables

Create a `.env` file inside the `apps/backend/` folder:

```bash
cp apps/backend/.env.example apps/backend/.env
```

Or manually create one with the following content:

```env
DATABASE_URL="postgresql://devuser:devpassword@localhost:5432/explorer_db"
```

## ▶️ Running the Project

### 1. Run the Database (PostgreSQL)

If using Docker:

```bash
docker compose up -d
```

Otherwise, ensure your local PostgreSQL is running and matches the configuration in `.env`.

The database will be available at `localhost:5432`.

### 2. Run the Backend

```bash
cd apps/backend
bun run dev
```

The API server will run at **http://localhost:3000**

#### Additional Backend Commands:

```bash
# Push database schema
bun run db:push

# Seed database with initial data
bun run db:seed
```

### 3. Run the Frontend

Open a new terminal, then:

```bash
cd apps/frontend
bun run dev
```

The application will be available at **http://localhost:5173**