# Build Tracker

Construction project management platform for **constructon** - Zimbabwe's first modern smart villa builder.

## Project Structure

```
build-tracker/
├── packages/
│   ├── api/           # Express + TypeScript + Prisma REST API
│   ├── shared/        # Shared types, constants, and utilities
│   ├── client-app/    # React Native (Expo) client app for homeowners
│   └── field-app/     # React Native (Expo) field app for site workers
├── docker/            # Docker configuration files
├── .github/           # GitHub Actions CI/CD workflows
└── scripts/           # Utility scripts
```

## Tech Stack

- **Backend**: Node.js, Express, TypeScript, Prisma ORM
- **Database**: PostgreSQL
- **Cache**: Redis
- **Mobile Apps**: React Native, Expo, TypeScript
- **State Management**: Zustand, React Query
- **Infrastructure**: Docker, AWS ECS, GitHub Actions

## Getting Started

### Prerequisites

- Node.js >= 20.x
- pnpm >= 8.x
- Docker & Docker Compose
- PostgreSQL 16+ (or use Docker)
- Redis 7+ (or use Docker)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/constructon/build-tracker.git
   cd build-tracker
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Start infrastructure (PostgreSQL + Redis):
   ```bash
   docker-compose up -d postgres redis
   ```

5. Run database migrations:
   ```bash
   pnpm db:migrate
   ```

6. Seed the database (optional):
   ```bash
   pnpm db:seed
   ```

### Development

Start all services in development mode:

```bash
# Start API server
pnpm dev:api

# Start client app (in separate terminal)
pnpm dev:client

# Start field app (in separate terminal)
pnpm dev:field
```

Or start everything with Docker:

```bash
docker-compose up
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all packages in dev mode |
| `pnpm dev:api` | Start API server |
| `pnpm dev:client` | Start client mobile app |
| `pnpm dev:field` | Start field mobile app |
| `pnpm build` | Build all packages |
| `pnpm test` | Run all tests |
| `pnpm lint` | Lint all packages |
| `pnpm typecheck` | Type check all packages |
| `pnpm db:migrate` | Run database migrations |
| `pnpm db:generate` | Generate Prisma client |
| `pnpm db:seed` | Seed the database |
| `pnpm db:studio` | Open Prisma Studio |
| `pnpm docker:up` | Start Docker services |
| `pnpm docker:down` | Stop Docker services |

## API Documentation

API documentation is available at `/api/v1/docs` when running in development mode.

### Key Endpoints

- `POST /api/v1/auth/login` - User authentication
- `GET /api/v1/projects` - List user's projects
- `GET /api/v1/projects/:id` - Get project details
- `POST /api/v1/projects/:id/tasks` - Create task
- `POST /api/v1/projects/:id/media/upload-url` - Get media upload URL

## Mobile Apps

### Client App

For homeowners to track their construction project:
- Dashboard with project overview
- Photo/video gallery with timeline
- Payment tracking and history
- Direct messaging with project manager
- Push notifications for updates

### Field App

For site supervisors and workers:
- Daily check-in and task management
- Photo capture with GPS tagging
- Daily report submission
- Issue reporting
- Offline support

## Deployment

### API Deployment

The API is deployed to AWS ECS via GitHub Actions on push to `main`.

Required secrets:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

### Mobile App Deployment

Mobile apps are built and deployed via EAS (Expo Application Services).

```bash
# Build for production
eas build --platform all

# Submit to stores
eas submit
```

## License

UNLICENSED - Proprietary software of constructon.
