---
description: Scaffold a new React component with a co-located test file and barrel export
argument-hint: <ComponentName>
---

Scaffold a new React component named **$ARGUMENTS** for this Next.js project.

## Steps

### 1. Determine the component name

Use `$ARGUMENTS` as the component name. Convert to PascalCase if the user passed kebab-case or lowercase (e.g. `flash-card` → `FlashCard`). Call the result `<ComponentName>`.

### 2. Create the component file

Path: `src/app/components/<ComponentName>.tsx`

Conventions (match `FlashCard.tsx` and `SearchInput.tsx`):
- Always include `"use client";` at the top — all scaffolded components are client components by default.
- Define a `<ComponentName>Props` TypeScript type above the function.
- Use a default export.
- Use Tailwind CSS for styling.
- The JSX body should be a minimal placeholder — a `<div>` with a comment, not a self-referencing call.

```tsx
"use client";

type <ComponentName>Props = {
  // add props here
};

export default function <ComponentName>({}: <ComponentName>Props) {
  return (
    <div className="flex items-center justify-center">
      {/* <ComponentName> content */}
    </div>
  );
}
```

### 3. Create the test file

Path: `src/app/components/__tests__/<ComponentName>.test.tsx`

Use Vitest + @testing-library/react. Import only what is actually used in the tests.

```tsx
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import <ComponentName> from "../<ComponentName>";

describe("<ComponentName>", () => {
  it("renders without crashing", () => {
    render(<<ComponentName> />);
  });

  it("mounts a DOM element", () => {
    const { container } = render(<<ComponentName> />);
    expect(container.firstChild).toBeTruthy();
  });
});
```

### 4. Update (or create) the barrel file

Path: `src/app/components/index.ts`

- If the file does not exist, create it.
- If it exists, read it first and append only if the export line is not already present.
- Add:

```ts
export { default as <ComponentName> } from "./<ComponentName>";
```

Do not remove or reorder existing exports.

### 5. Check for vitest config

Check whether `vitest.config.ts` exists at the project root. If it does not, create it:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
  },
});
```

Also check `package.json` for a `"test"` script. If missing, note that the user should add `"test": "vitest"` to the `scripts` section.

### 6. Report what was done

Print a concise summary listing:
- Path to the component file
- Path to the test file
- The export line added to `index.ts`
- Whether `vitest.config.ts` was created or already existed
