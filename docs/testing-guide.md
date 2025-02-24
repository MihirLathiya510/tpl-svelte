# Testing Guide

This guide covers testing strategies and best practices for your SvelteKit application using Vitest.

## Testing Setup

The template comes with Vitest configured for:
- Unit testing with jsdom environment
- Component testing with `@testing-library/svelte`
- API route testing
- Database testing with test utilities

## Writing Tests

### 1. Component Tests

Example testing a UI component (`src/lib/components/PostCard.test.ts`):

```typescript
import { render, screen } from '@testing-library/svelte';
import PostCard from './PostCard.svelte';

describe('PostCard', () => {
  const mockPost = {
    title: 'Test Post',
    content: 'Test Content',
    createdAt: new Date().toISOString()
  };

  it('renders post details correctly', () => {
    render(PostCard, { props: mockPost });
    
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.content)).toBeInTheDocument();
  });
});
```

### 2. API Route Tests

Example testing an API endpoint (`src/routes/api/posts/+server.test.ts`):

```typescript
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { GET, POST } from './+server';
import { db } from '$lib/server/db';

describe('Posts API', () => {
  beforeAll(async () => {
    // Setup test database
    await db.execute(sql`DELETE FROM posts`);
  });

  it('GET returns all posts', async () => {
    const response = await GET();
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
  });

  it('POST creates a new post', async () => {
    const post = {
      title: 'Test Post',
      content: 'Test Content'
    };

    const response = await POST({
      request: new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify(post)
      })
    });

    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.title).toBe(post.title);
  });
});
```

### 3. Database Tests

Example testing database operations (`src/lib/server/posts.test.ts`):

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { getPosts, createPost } from './posts';
import { db } from './db';

describe('Posts Database Operations', () => {
  beforeEach(async () => {
    // Clean database before each test
    await db.execute(sql`TRUNCATE TABLE posts CASCADE`);
  });

  it('creates and retrieves posts', async () => {
    const post = await createPost({
      title: 'Test Post',
      content: 'Test Content'
    });

    expect(post[0].title).toBe('Test Post');

    const posts = await getPosts();
    expect(posts).toHaveLength(1);
    expect(posts[0].title).toBe('Test Post');
  });
});
```

## Test Organization

```
src/
├── lib/
│   ├── components/
│   │   ├── Component.svelte
│   │   └── Component.test.ts    # Component tests
│   └── server/
│       ├── feature.ts
│       └── feature.test.ts      # Server-side tests
└── routes/
    └── api/
        └── endpoint/
            ├── +server.ts
            └── +server.test.ts   # API tests
```

## Best Practices

1. **Test Organization**
   - Keep test files close to the code they test
   - Use consistent naming: `*.test.ts` or `*.spec.ts`
   - Group related tests using describe blocks

2. **Test Coverage**
   - Write tests for all new features
   - Aim for high coverage of business logic
   - Test edge cases and error scenarios

3. **Testing Database Operations**
   - Use a test database for running tests
   - Clean up data between tests
   - Test both successful and failed operations

4. **Component Testing**
   - Test user interactions
   - Verify component renders correctly
   - Test prop changes and events

## Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm run test -- src/lib/components/MyComponent.test.ts
```

## Debug Tests

To debug tests in VS Code:
1. Add a `debugger` statement in your test
2. Run `npm run test:debug`
3. Use VS Code's debugger to step through code

## Continuous Integration

The template includes GitHub Actions workflows for:
- Running tests on pull requests
- Checking test coverage
- Linting and type checking

See `.github/workflows/test.yml` for the configuration.