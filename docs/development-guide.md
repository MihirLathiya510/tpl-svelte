# Development Guide

This guide will walk you through building full-stack features using this template.

## Creating a Full-Stack Feature

Let's walk through creating a complete feature from database to UI using a simple "Posts" example.

### 1. Database Schema

Add to `src/lib/server/db/schema.ts`:

```typescript
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow()
});
```

Push the schema:
```bash
npm run db:push
```

### 2. Server-Side Logic

Create `src/lib/server/posts.ts`:

```typescript
import { db } from '$lib/server/db';
import { posts } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function getPosts() {
  return await db.select().from(posts).orderBy(posts.createdAt);
}

export async function createPost({ title, content }: { title: string; content: string }) {
  return await db.insert(posts).values({ title, content }).returning();
}
```

### 3. Route Handlers

Create `src/routes/api/posts/+server.ts`:

```typescript
import { json } from '@sveltejs/kit';
import * as posts from '$lib/server/posts';

export async function GET() {
  const allPosts = await posts.getPosts();
  return json(allPosts);
}

export async function POST({ request }) {
  const data = await request.json();
  const newPost = await posts.createPost(data);
  return json(newPost);
}
```

### 4. UI Components

Create a reusable component in `src/lib/components/PostCard.svelte`:

```svelte
<script lang="ts">
  export let title: string;
  export let content: string;
  export let createdAt: Date;
</script>

<div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
  <h2 class="text-xl font-bold">{title}</h2>
  <p class="mt-2 text-gray-600 dark:text-gray-300">{content}</p>
  <time class="text-sm text-gray-500">{new Date(createdAt).toLocaleDateString()}</time>
</div>
```

### 5. Page Implementation

Create `src/routes/posts/+page.ts`:

```typescript
export const load = async ({ fetch }) => {
  const response = await fetch('/api/posts');
  const posts = await response.json();
  return { posts };
};
```

Create `src/routes/posts/+page.svelte`:

```svelte
<script lang="ts">
  import PostCard from '$lib/components/PostCard.svelte';
  
  export let data;
  
  let title = '';
  let content = '';
  
  async function handleSubmit() {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.ok) {
      title = '';
      content = '';
      invalidateAll();
    }
  }
</script>

<div class="max-w-4xl mx-auto p-4">
  <form on:submit|preventDefault={handleSubmit} class="mb-8 space-y-4">
    <input
      bind:value={title}
      placeholder="Post title"
      class="w-full p-2 rounded border dark:bg-gray-800"
    />
    <textarea
      bind:value={content}
      placeholder="Post content"
      class="w-full p-2 rounded border dark:bg-gray-800"
    />
    <button
      type="submit"
      class="px-4 py-2 bg-accent-500 text-white rounded hover:bg-accent-600"
    >
      Create Post
    </button>
  </form>

  <div class="space-y-4">
    {#each data.posts as post}
      <PostCard {...post} />
    {/each}
  </div>
</div>
```

## Best Practices

1. **Type Safety**
   - Use TypeScript for all files
   - Define types for your API responses and database models
   - Use Drizzle's type inference for database operations

2. **Code Organization**
   - Keep server-side logic in `src/lib/server`
   - Place reusable components in `src/lib/components`
   - Use `+page.ts` for data loading and `+page.svelte` for UI

3. **Performance**
   - Use SvelteKit's server-side rendering
   - Implement proper loading states
   - Add error boundaries for better error handling

4. **Security**
   - Validate user input on both client and server
   - Use proper CORS headers for API routes
   - Implement authentication when needed

## Next Steps

- [Testing Guide](testing-guide.md) - Learn how to test your features
- [Database Guide](database-guide.md) - Advanced database operations
- [Deployment Guide](deployment-guide.md) - Deploy your application