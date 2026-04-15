---
description: Run pre-deploy checks (typecheck, tests, console.log scan, env var verification) and report pass/fail
argument-hint: (no arguments)
---

Run a **pre-deploy** checklist for this repo and report a clear pass/fail summary.

## Steps

### 1. Run TypeScript type-check

Run TypeScript without emitting files:

```bash
npx tsc --noEmit
```

Record whether it passed.

### 2. Run the test suite

Check `package.json` for a test script:
- If `"test"` exists, run:

```bash
npm test
```

- If `"test"` is missing but `vitest` is installed, run:

```bash
npx vitest run
```

Record whether it passed.

### 3. Search for `console.log` statements in source code

Search only application source (exclude dependencies and build output):

```bash
rg -n --hidden --glob '!**/node_modules/**' --glob '!**/.next/**' --glob '!**/dist/**' --glob '!**/build/**' "console\\.log\\(" src
```

- If matches are found, treat as **fail** and include a short list of the first ~20 matches (file + line).
- If no matches, mark as **pass**.

### 4. Verify required environment variables are set

Determine required variables:
- If `.env.local.example` exists, parse it and treat every non-empty `KEY=value` line as required (ignore comments and blank lines).
- Otherwise, fall back to checking for `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.

Verify each required variable is set (non-empty) in at least one of:
- The current shell environment (`process.env`)
- A local env file (`.env.local`)

Mark as:
- **pass** if all required variables are present and non-empty
- **fail** otherwise, listing missing keys only (do not print values)

### 5. Report a pass/fail summary

Print a concise checklist summary like:
- Typecheck: PASS/FAIL
- Tests: PASS/FAIL (include the command used)
- console.log scan: PASS/FAIL (include number of matches)
- Env vars: PASS/FAIL (include missing keys, no values)

If any step fails, overall status is **FAIL**. Otherwise overall status is **PASS**.
