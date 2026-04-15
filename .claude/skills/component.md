---
description: Scaffold a new React component with a co-located test file and barrel export
argument-hint: <ComponentName>
---

Scaffold a new React component named **$ARGUMENTS** for this Next.js project.

## Steps

### 1. Determine the component name

- Use `$ARGUMENTS` as the component name exactly as provided (PascalCase expected; if the user passes kebab-case or lowercase, convert it to PascalCase automatically).
- Call the result `<ComponentName>`.

### 2. Create the component file

Path: `src/app/components/<ComponentName>.tsx`

Follow the conventions observed in the existing components (`FlashCard.tsx`, `SearchInput.tsx`):
- Add `"use client";` at the top only if the component uses React hooks (useState, useEffect, etc.) or browser-only APIs. For a generic scaffold, include it by default since most interactive components need it.
- Define a `<ComponentName>Props` TypeScript type above the component.
- Use a default export.
- Use Tailwind CSS for styling.
- Keep the scaffold minimal but realistic — a `<div>` wrapper with a placeholder child is fine.

Example shape:
```tsx
"use client";

type <ComponentName>Props = {
  // add props here
};

export default function <ComponentName>({}: <ComponentName>Props) {
  return (
    <div>
      <ComponentName />
    </div>
  );
}
```

### 3. Create the test file

Path: `src/app/components/__tests__/<ComponentName>.test.tsx`

Use **Vitest** + **@testing-library/react** conventions (the standard for Next.js + React 19 projects).

The test file must:
- Import `describe`, `it`, `expect` from `"vitest"`
- Import `render`, `screen` from `"@testing-library/react"`
- Import the component under test
- Include one `describe` block with at least two `it` cases:
  1. A basic render test (component mounts without throwing)
  2. A snapshot or content test (something rendered is in the document)

Example shape:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import <ComponentName> from "../<ComponentName>";

describe("<ComponentName>", () => {
  it("renders without crashing", () => {
    render(<<ComponentName> />);
  });

  it("is present in the document", () => {
    const { container } = render(<<ComponentName> />);
    expect(container.firstChild).toBeTruthy();
  });
});
```

### 4. Update (or create) the barrel file

Path: `src/app/components/index.ts`

- If the file does not exist, create it.
- If it exists, read it first and append only if the export is not already present.
- Add a named re-export line:

```ts
export { default as <ComponentName> } from "./<ComponentName>";
```

Keep existing exports intact — do not remove or reorder them.

### 5. Report what was done

After all files are written, print a concise summary:
- Path to the component file
- Path to the test file
- The export line added to `index.ts`
- A note that tests require `vitest` and `@testing-library/react` to be installed if they are not already in `devDependencies`
