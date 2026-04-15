---
description: Scaffold a Next.js API route handler with Zod validation and typed request/response models
argument-hint: <routeName>
---

Scaffold a Next.js API route named **$ARGUMENTS** for this project.

## Steps

### 1. Determine the route segment name

Use `$ARGUMENTS` as the route name. Convert to a **URL-safe route segment**:
- If the user passed PascalCase or camelCase, convert to kebab-case (e.g. `createUser` → `create-user`).
- If the user passed spaces, convert to kebab-case (e.g. `create user` → `create-user`).
- Keep existing kebab-case as-is.

Call the result `<routeSegment>`.

### 2. Create the type file for request/response types

Path: `src/app/api/<routeSegment>/types.ts`

Create request/response types plus an error response shape:

```ts
export type <RouteName>Request = {
  // add fields here
};

export type <RouteName>Response = {
  ok: true;
  // add fields here
};

export type ApiErrorResponse = {
  ok: false;
  error: {
    code: "BAD_REQUEST" | "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "CONFLICT" | "INTERNAL_ERROR";
    message: string;
    details?: unknown;
  };
};
```

Notes:
- `<RouteName>` should be PascalCase derived from `<routeSegment>` (e.g. `create-user` → `CreateUser`).
- Keep types minimal placeholders; don’t invent domain fields.

### 3. Create the API route handler

Path: `src/app/api/<routeSegment>/route.ts`

Scaffold a `POST` handler with:
- Input validation using Zod
- Proper HTTP status codes
- A consistent JSON response shape

```ts
import { z } from "zod";
import { NextResponse } from "next/server";
import type { <RouteName>Request, <RouteName>Response, ApiErrorResponse } from "./types";

const RequestSchema = z.object({
  // add fields here
}) satisfies z.ZodType<<RouteName>Request>;

function json<T>(body: T, init?: ResponseInit) {
  return NextResponse.json(body, init);
}

export async function POST(req: Request): Promise<NextResponse<<RouteName>Response | ApiErrorResponse>> {
  try {
    const raw = await req.json().catch(() => null);
    const parsed = RequestSchema.safeParse(raw);
    if (!parsed.success) {
      return json(
        {
          ok: false,
          error: {
            code: "BAD_REQUEST",
            message: "Invalid request body",
            details: parsed.error.flatten(),
          },
        },
        { status: 400 }
      );
    }

    // TODO: implement
    return json(
      {
        ok: true,
      } as <RouteName>Response,
      { status: 200 }
    );
  } catch (err) {
    return json(
      {
        ok: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Unexpected error",
        },
      },
      { status: 500 }
    );
  }
}
```

Conventions:
- Use App Router route handlers (`route.ts`) and method-named exports (`POST`, `GET`, etc.).
- Prefer `safeParse` and return **400** with Zod error details for validation issues.
- Use **500** for unexpected errors.
- Do not add extra methods unless the user asked for them.

### 4. Add optional method-not-allowed handling (only if needed)

If the user explicitly asked for multiple methods, include only those. For any explicitly unsupported method they mention, return **405**:

```ts
export function OPTIONS() {
  return new Response(null, { status: 204 });
}
```

If the user asked for a non-POST method (like `GET`), validate inputs appropriately:
- **GET**: validate `new URL(req.url).searchParams` via a Zod schema (convert to an object first).
- **POST/PUT/PATCH**: validate `await req.json()`.

### 5. Report what was done

Print a concise summary listing:
- Path to `route.ts`
- Path to `types.ts`
- Which HTTP method(s) were scaffolded
