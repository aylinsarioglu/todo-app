# Todo App

A modern and minimal Todo application built with **React + TypeScript**.

This project demonstrates core frontend concepts such as state management, component structure, and persistent data handling.

---

## Features

- Add new todos
- Toggle complete / incomplete
- Delete individual todos
- Filter todos (All / Active / Completed)
- Persistent storage with localStorage
- Clean and simple UI

---

## Tech Stack

- React
- TypeScript
- Vite
- CSS

---

## Project Structure

```text
todo-app/
|-- public/
|   `-- icons.svg
|-- src/
|   |-- components/
|   |   |-- TodoInput.tsx
|   |   |-- TodoItem.tsx
|   |   `-- TodoList.tsx
|   |-- App.css
|   |-- App.tsx
|   |-- index.css
|   `-- main.tsx
|-- .gitignore
|-- eslint.config.js
|-- index.html
|-- package-lock.json
|-- package.json
|-- tsconfig.app.json
|-- tsconfig.json
|-- tsconfig.node.json
`-- vite.config.ts
```

### Core `src` Structure

```text
src/
|-- components/
|   |-- TodoItem.tsx
|   `-- TodoList.tsx
|-- App.tsx
`-- main.tsx
```

---

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run development server

```bash
npm run dev
```

### 3) Build for production

```bash
npm run build
```

### 4) Preview production build

```bash
npm run preview
```
