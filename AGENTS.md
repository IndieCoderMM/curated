# AGENTS.md

## Build, Lint, and Test Commands

- **Development Server**: `npm run dev`
- **Build**: `npm run build`
- **Start**: `npm run start`
- **Lint**: `npm run lint`

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

### TailwindCSS

- Follow utility-first principles for styling.

## Notes for Agents

- Follow the existing structure and conventions to maintain consistency.
