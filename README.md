# User Management Dashboard

An internal **admin dashboard** built with React and TypeScript to manage users in a realistic, production-like environment.  
The project focuses on **real-world frontend challenges** such as authentication, protected routes, CRUD operations, server state management, UX feedback, and application scalability.

---

## 🔗 Demo
> https://user-management-dashboard.vercel.app

**Demo credentials**
- Email: `admin@demo.com`
- Password: `admin123`

---

## 🧠 Project Goals

This project was created to simulate how a **real company admin system** works, not just a UI demo.

Key goals:
- Work with **realistic data flows** (API, pagination, filters)
- Handle **loading, error and empty states**
- Implement **auth & route protection**
- Build **scalable folder architecture**
- Improve UX with **optimistic updates, toasts, debounce**
- Support **light/dark theme**
- Keep everything **typed, predictable and maintainable**

---

## 🛠 Tech Stack

- **React + TypeScript**
- **Vite**
- **React Router**
- **TanStack React Query**
- **React Hook Form + Zod**
- **Tailwind CSS**
- **MSW (Mock Service Worker)**
- **LocalStorage (auth + theme persistence)**

---

## 📁 Folder Structure

```txt
src/
  app/                # App-level setup (router, providers, query client)
  features/
    auth/             # Authentication (login, fake auth)
    users/            # Users domain (API, hooks, pages, components)
  shared/
    components/       # Reusable UI components
    hooks/            # Shared hooks (toast, debounce, theme)
    lib/              # Utilities (http, storage, theme)
    layout/           # App shell / layout
  mocks/              # MSW handlers and mock database


🔐 Authentication & Route Protection
Problem

How to protect internal routes without a real backend?

Solution

Implemented fake authentication using MSW

Token stored in localStorage

Created a ProtectedRoute component

Unauthenticated users are redirected to /login

This mimics how real SPAs protect admin routes.

🌐 API Simulation with MSW
Problem

Public APIs are unstable and do not support full CRUD + pagination.

Solution

Used Mock Service Worker (MSW) to intercept HTTP requests

Created an in-memory database

Implemented:

Pagination

Filters

Search

Create / Edit / Delete

This allowed the frontend to behave exactly like it would with a real backend.

🔐 Authentication & Route Protection
Problem

How to protect internal routes without a real backend?

Solution

Implemented fake authentication using MSW

Token stored in localStorage

Created a ProtectedRoute component

Unauthenticated users are redirected to /login

This mimics how real SPAs protect admin routes.

🌐 API Simulation with MSW
Problem

Public APIs are unstable and do not support full CRUD + pagination.

Solution

Used Mock Service Worker (MSW) to intercept HTTP requests

Created an in-memory database

Implemented:

Pagination

Filters

Search

Create / Edit / Delete

This allowed the frontend to behave exactly like it would with a real backend.

Failed to register ServiceWorker: unsupported MIME type ('text/html')

Cause

The mockServiceWorker.js file was missing, so the dev server returned index.html.

Fix

npx msw init public/ --save

Then explicitly configured:

worker.start({
  serviceWorker: { url: "/mockServiceWorker.js" }
});

This is a very common real-world issue when working with MSW.

📊 Server State Management (React Query)
Why React Query?

Automatic loading & error states

Caching

Request deduplication

Query invalidation

Used for:

Users list

Create / Update / Delete mutations

⚡ Optimistic UI Updates
Problem

Deleting a user feels slow if we wait for the server.

Solution

Implemented optimistic delete

UI updates immediately

Rollback happens automatically if the request fails

This improves perceived performance and UX significantly.

🔍 Debounced Search
Problem

Search input triggered requests on every keystroke.

Solution

Created a custom useDebouncedValue hook (300ms)

Reduced unnecessary requests

Improved performance and UX

🎯 UX States Handling

Handled explicitly:

Loading state (spinner)

Error state (retry button)

Empty state (no users found)

Success/Error feedback (toast notifications)

This is critical in real applications and often missing in junior projects.

🔔 Toast Notifications

Implemented a custom toast system to:

Show success messages

Show error messages

Auto-dismiss after a few seconds

Used for:

Create user

Update user

Delete user

Error feedback


🧪 Development Tools

React Query Devtools enabled only in development

Clean separation between DEV and PROD behavior

📱 Responsive Design

Mobile-first approach

Tables scroll horizontally on small screens

Modals adapt to mobile layout

🚀 What This Project Demonstrates

Real-world frontend problem solving

Scalable architecture

Clean separation of concerns

Strong UX mindset

Ability to work without a backend

Professional code organization

🔮 Possible Improvements

Unit tests (React Testing Library)

Role-based permissions

Accessibility audit

Real backend integration

👤 Author

Alisson Pereira dos Santos (ALPS)
Frontend Developer (Junior)

Portfolio: https://portifolio-alps.vercel.app

GitHub: https://github.com/ALPSofc

LinkedIn: https://linkedin.com/im/alissonpereira73a1097