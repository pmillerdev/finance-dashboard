## Finance Dashboard

A dashboard which allows the user to track their invoices, revenue and customers.

Deployed [here](https://finance-dashboard-delta.vercel.app/)

### Features

- User login system with password hashing
- Partial prerendering and streaming for improved UX
- Realtime data visualisation
- Table search and pagination
- Able to create, read, update and delete invoices
- Metadata for individual pages
- Error handling

### Technologies

- Built with `next`, `react` and `typescript`
- Authentication with `next-auth` and `bcrypt`
- Styling with `tailwindcss`
- Form validation with `zod`
- Uses `@vercel/postgres` PostgresSQL database
- Tested with `jest` and `@testing-library/react`
- Deployed with Vercel
