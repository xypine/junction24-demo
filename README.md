# Polly

A demo of what an extended version of Pol.is could look like for Sitra's purposes.

## Docs you should read

- [svelte kit](https://svelte.dev/docs/kit/introduction) (Fullstack framework)
- [drizzle-orm](https://orm.drizzle.team/docs/overview) (ORM)
- [shadcn-svelte](https://next.shadcn-svelte.com/docs/) (component library)

## Developing

Once you've installed dependencies with `pnpm install` and started the db in another terminal window with `pnpm db:start`,
migrate the database:
```bash
pnpm db:migrate
```

start a development server:
```bash
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev -- --open
```

## Building

To create a production version of your app:

```bash
pnpm build
```

You can preview the production build with `npm run preview`.
