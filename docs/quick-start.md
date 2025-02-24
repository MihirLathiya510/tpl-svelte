# Quick Start Guide

This guide will help you quickly create a full-stack website using this template. We'll build a simple blog with authentication.

## 1. Create Your Project

```bash
# Create new project from template
npm create svelte@latest my-blog -- --template https://github.com/MihirLathiya510/tpl-svelte
cd my-blog

# Install dependencies
npm install

# Start PostgreSQL database
npm run db:start
```

## 2. Quick Development Steps

### Step 1: Set Up Auth

```typescript
// src/lib/server/db/schema.ts
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow()
});
```

### Step 2: Create API Routes

Example protected route:
```typescript
// src/routes/api/protected/+server.ts
import { json } from '@sveltejs/kit';

export async function GET({ locals }) {
  // Check auth status
  if (!locals.user) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  return json({ message: 'Protected data' });
}
```

### Step 3: Add UI Components

```svelte
<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { user } from '$lib/stores/auth';
</script>

<div class="container mx-auto p-4">
  {#if $user}
    <h1>Welcome, {$user.name}!</h1>
  {:else}
    <a href="/login" class="btn">Login</a>
  {/if}
</div>
```

## Common Patterns

### 1. Data Fetching
```typescript
// src/routes/blog/+page.ts
export const load = async ({ fetch }) => {
  const posts = await fetch('/api/posts').then(r => r.json());
  return { posts };
};
```

### 2. Form Handling
```svelte
<script lang="ts">
  async function handleSubmit(event: SubmitEvent) {
    const formData = new FormData(event.target as HTMLFormElement);
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: formData
    });
    if (response.ok) {
      // Handle success
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <!-- Form fields -->
</form>
```

### 3. Protected Routes
```typescript
// src/hooks.server.ts
export const handle = async ({ event, resolve }) => {
  const session = await getSession(event);
  event.locals.user = session?.user;
  return resolve(event);
};
```

## Quick Tips

1. **Database Operations**
   - Use `db:push` for quick schema updates during development
   - Use `db:studio` to view/edit data visually

2. **Testing**
   - Write tests alongside new features
   - Run `npm run test:watch` during development

3. **Styling**
   - Use Tailwind utility classes
   - Dark mode is available via `dark:` prefix

4. **Type Safety**
   - Enable strict mode in `tsconfig.json`
   - Use Drizzle's type inference

## Next Steps

For more detailed information, check:
- [Development Guide](development-guide.md)
- [Testing Guide](testing-guide.md)
- [Database Guide](database-guide.md)