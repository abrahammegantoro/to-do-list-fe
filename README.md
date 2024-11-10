# Todo List Frontend

A modern, responsive Todo List application built with React and Tailwind CSS.

## Features

- User authentication (login/register)
- Create, read, update, and delete todos
- Category-based organization
- Responsive design
- Protected routes
- API integration with axios

## Tech Stack

- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React Router](https://reactrouter.com/) - Routing library for React
- [Axios](https://axios-http.com/) - HTTP client for API requests
- [Vite](https://vitejs.dev/) - Next generation frontend tooling

## Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation

1. Clone the repository

```bash
git clone
cd
```

2. Set up environment variables

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

3. Install dependencies

```bash
npm install
```

4. Start the development server

```bash
npm run dev
```

The application will start on `http://localhost:5173` (or another available port)

## Available Scripts

In the project directory, you can run:

- `npm run dev` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm run preview` - Serves the production build locally
- `npm run lint` - Runs ESLint for code linting

## Project Structure

```
src/
├── api/            # Axios API client
├── assets/         # Static assets
├── components/     # Reusable UI components
├── hooks/          # Custom hooks
├── pages/          # Route components
├── providers/      # Context providers
└── App.tsx         # Root component
```

## Features Overview

### Authentication

- Login page
- Registration page
- Protected routes
- Authentication state management

### Todo Management

- Todo list view
- Create new todo
- Edit existing todo
- Delete todo
- Category filtering
