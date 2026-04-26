# Donkey Web

Angular 21 frontend for the **Burros de Miranda** platform.

## Stack

- Angular 21 (standalone components, signals)
- Angular Router (lazy-loaded routes)
- HttpClient
- SCSS

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm start
```

App will be available at `http://localhost:4200`.

> The API must be running at `http://localhost:8080` before using the app.

### Build for production

```bash
npm run build
```

Output is placed in `dist/donkey-web/`.

---

## Project Structure

```
src/app/
+-- app.config.ts             # Root providers (Router, HttpClient)
+-- app.routes.ts             # Lazy-loaded route definitions
+-- app.ts                    # Root component (navbar + router-outlet)
+-- app.html
+-- app.scss                  # Global styles and .btn classes
+-- shared-auth.scss          # Shared form/card styles (imported by auth components)
+-- models/
¦   +-- user.model.ts
¦   +-- post.model.ts
+-- services/
¦   +-- auth.service.ts       # Login, register, logout — persists user in localStorage
¦   +-- post.service.ts       # GET/POST /api/posts
+-- guards/
¦   +-- auth.guard.ts         # authGuard, sponsoredGuard
+-- components/
    +-- home/                 # Public feed
    +-- login/
    +-- register/
    +-- create-post/          # SPONSORED role only
```

---

## Routes

| Path           | Component         | Access                    |
|----------------|-------------------|---------------------------|
| `/`            | HomeComponent     | Public                    |
| `/login`       | LoginComponent    | Public                    |
| `/register`    | RegisterComponent | Public                    |
| `/create-post` | CreatePostComponent | `SPONSORED` role only  |

Route guards redirect unauthorized users:
- `authGuard` — redirects to `/login` if not logged in
- `sponsoredGuard` — redirects to `/` if role is not `SPONSORED`

---

## Authentication

Auth state is managed via a signal-based `AuthService`.

- On login the user object is stored in `localStorage` and exposed via `currentUser` signal.
- On logout the signal is cleared and `localStorage` is cleaned.
- The navbar adapts in real time based on `currentUser()`.

No JWT or session tokens are used — this is a simple study project.

---

## Roles

| Role         | Capabilities                                         |
|--------------|------------------------------------------------------|
| `SPONSOR`    | View the public post feed, register, login           |
| `SPONSORED`  | Everything above + create posts about their donkeys  |

Role is chosen at registration and cannot be changed from the UI.

---

## API Integration

All API calls target `http://localhost:8080`. To change this, update the `API` constant in:

- `src/app/services/auth.service.ts`
- `src/app/services/post.service.ts`

### AuthService

| Method                              | Endpoint                  |
|-------------------------------------|---------------------------|
| `register(email, password, role)`   | `POST /api/auth/register` |
| `login(email, password)`            | `POST /api/auth/login`    |
| `logout()`                          | Local only                |

### PostService

| Method                                                 | Endpoint         |
|--------------------------------------------------------|------------------|
| `getPosts()`                                           | `GET /api/posts` |
| `createPost(donkeyName, content, photoUrl, authorId)`  | `POST /api/posts`|

---

## Pages

### Home (`/`)

- Displays all posts in reverse chronological order.
- Each card shows the donkey name, activity text, optional photo, author email, and date.
- If logged in as `SPONSORED`, a **New Post** button is shown in the hero section.

### Register (`/register`)

- Fields: email, password, role (dropdown: Sponsor / Producer).
- On success, redirects to `/login`.

### Login (`/login`)

- Fields: email, password.
- On success, redirects to `/`.

### Create Post (`/create-post`)

- Accessible only to users with role `SPONSORED`.
- Fields: donkey name (required), activity description (required), photo URL (optional).
- On success, redirects to `/`.
