# Trivik Signature Customer Portal Backend

Demo credentials:

- Email: john.doe@gmail.com
- Password: johndoe

## Local run

```bash
npm install
cp .env.example .env
npm run dev
```

API runs at `http://localhost:8080`.

## Production notes

This demo uses an in-memory customer record. For production, replace it with PostgreSQL, Supabase, MySQL, or another real database and never hardcode customers in source files.
