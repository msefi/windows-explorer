# 🗂️ Windows Explorer Clone

Aplikasi web yang mensimulasikan tampilan dan fungsionalitas **Windows Explorer** (File Explorer). Dibangun sebagai monorepo fullstack dengan backend REST API dan frontend berbasis Vue.js.

## 🧱 Tech Stack

| Layer | Teknologi |
|---|---|
| **Backend** | [Bun](https://bun.sh/) + [Elysia.js](https://elysiajs.com/) |
| **Frontend** | [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/) + TypeScript |
| **Database** | PostgreSQL (via Docker) + [Drizzle ORM](https://orm.drizzle.team/) |
| **Package Manager** | [Bun](https://bun.sh/) (workspace monorepo) |

## 📁 Struktur Proyek

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

## ⚙️ Prasyarat

Pastikan sudah terinstal:

- [Bun](https://bun.sh/) >= 1.0
- [Docker](https://www.docker.com/) & Docker Compose

## 🚀 Instalasi

### 1. Clone repository

```bash
git clone https://github.com/username/windows-explorer.git
cd windows-explorer
```

### 2. Install semua dependencies (monorepo)

```bash
bun install
```

### 3. Setup variabel lingkungan Backend

Buat file `.env` di dalam folder `apps/backend/`:

```bash
cp apps/backend/.env.example apps/backend/.env
```

Atau buat manual dengan isi berikut:

```env
DATABASE_URL="postgresql://devuser:devpassword@localhost:5432/explorer_db"
```

## ▶️ Menjalankan Proyek

### 1. Jalankan Database (PostgreSQL via Docker)

```bash
docker compose up -d
```

Database akan berjalan di `localhost:5432`.

### 2. Jalankan Backend

```bash
cd apps/backend
bun run dev
```

Server API akan berjalan di **http://localhost:3000**

#### Perintah tambahan Backend:

```bash
# Push schema database
bun run db:push

# Buka Drizzle Studio (database GUI)
bun run db:studio

# Seed database dengan data awal
# POST http://localhost:3000/api/v1/seed
```

### 3. Jalankan Frontend

Buka terminal baru, lalu:

```bash
cd apps/frontend
bun run dev
```

Aplikasi akan berjalan di **http://localhost:5173**

## 🛑 Menghentikan Proyek

Untuk menghentikan database Docker:

```bash
docker compose down
```
