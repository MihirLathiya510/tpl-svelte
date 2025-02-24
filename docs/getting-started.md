# Getting Started

This guide will help you set up your development environment and get the template running locally.

## Prerequisites

- Node.js 18+ and npm
- Docker for PostgreSQL database
- Git

## Installation

1. Create a new project using this template:
   ```bash
   npm create svelte@latest my-app -- --template https://github.com/MihirLathiya510/tpl-svelte
   cd my-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your database credentials if needed.

4. Start the PostgreSQL database:
   ```bash
   npm run db:start
   ```

5. Push the database schema:
   ```bash
   npm run db:push
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── lib/               # Shared components and utilities
│   ├── components/    # Reusable UI components
│   ├── server/       # Server-side code
│   │   └── db/      # Database configuration and schemas
│   └── utils/        # Helper functions and utilities
├── routes/           # SvelteKit routes (pages)
└── app.d.ts         # TypeScript declarations
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Run type checking
- `npm run test` - Run tests
- `npm run lint` - Run linter
- `npm run format` - Format code

## Next Steps

- [Development Guide](development-guide.md) - Learn how to build full-stack features
- [Database Guide](database-guide.md) - Working with PostgreSQL and Drizzle
- [Testing Guide](testing-guide.md) - Writing and maintaining tests