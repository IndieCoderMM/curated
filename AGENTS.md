# AGENTS.md

## Build, Lint, and Test Commands

- **Development Server**: `npm run dev`
- **Build**: `npm run build`
- **Start**: `npm run start`
- **Lint**: `npm run lint`
- **Run All Tests**: Not explicitly defined in `package.json`. Add a test script if needed.
- **Run Single Test**: Use a test runner like Jest or Vitest if configured. Add specific instructions if applicable.

## Code Style Guidelines

### Formatting

- **Prettier**: Enforced with the following rules:
  - Tab width: 2 spaces
  - Semicolons: Required
  - Trailing commas: Always
  - Single quotes: Disabled (use double quotes)
  - Line width: 80 characters
  - Plugins: `prettier-plugin-organize-imports`, `prettier-plugin-tailwindcss`

### Imports

- Use `prettier-plugin-organize-imports` to automatically sort imports.
- Group imports logically (e.g., external libraries, internal modules).

### Naming Conventions

- **Files**: Use kebab-case for filenames (e.g., `my-component.tsx`).
- **Variables**: Use camelCase for variables and functions.
- **Constants**: Use UPPER_SNAKE_CASE for constants.
- **Components**: Use PascalCase for React components.

### Types

- Use TypeScript for type safety.
- Prefer `interface` over `type` for object shapes.
- Use `zod` for runtime validation where applicable.

### Error Handling

- Use `try-catch` blocks for async operations.
- Log errors with meaningful messages.
- Avoid swallowing errors silently.

### ESLint

- Extends `next/core-web-vitals` for linting rules.

### TailwindCSS

- Use `prettier-plugin-tailwindcss` to enforce class sorting.
- Follow utility-first principles for styling.

## Notes for Agents

- Ensure all changes pass linting and formatting checks before committing.
- Add missing test scripts if required for better test coverage.
- Follow the existing structure and conventions to maintain consistency.
