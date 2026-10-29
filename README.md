# React Authentication & Dashboard Project

A user authentication and dashboard application built with **React** and **TypeScript**.

---

## 1. Environment Setup & Installation

### 1.1 Prerequisites
Ensure the following tools are installed on your machine before running the project:
- **Node.js**: Recommended version `v18.x` or later (Download from [Node.js Official Website](https://nodejs.org/)).
- **Package Manager**:
  - **npm**: Comes bundled with Node.js.
  - **Yarn** (Recommended): If not already installed, install it globally via npm:
    ```bash
    npm install -g yarn
    ```

### 1.2 Installing Dependencies
Open a terminal in the project directory (`project-react`) and install the required packages:

Using Yarn (Recommended):
```bash
yarn install
```

Or using npm:
```bash
npm install
```

---

## 2. Running the Application

Once the dependencies are installed, start the local development server:

Using Yarn (Recommended):
```bash
yarn start
```

Or using npm:
```bash
npm start
```

The application will compile and automatically open in your default browser. If it does not open automatically, visit:
`http://localhost:3333`

---

## 3. Environment Variables & Port Configuration (`.env`)

The project root contains an environment configuration file [`.env`](.env):

```env
PORT=3333
```

- **How it works**: By default, Create React App (`react-scripts`) serves applications on port `3000`. By configuring `PORT=3333` in `.env`, the local development server will start on port `3333`, making the application accessible at `http://localhost:3333`.
- **Customizing the Port**: If you encounter port conflicts or prefer a different port, modify the port number in `.env` (e.g., `PORT=8080`) and restart the development server with `yarn start`.

---

## 4. Project Structure & Core File Explanations

### 4.1 `src/Components/` Directory (Component Modules)
Contains the core UI components for authentication and user management:

- **[`Auth.tsx`](src/Components/Auth.tsx)**: **User Authentication Component (Login & Sign Up)**

- **[`Dashboard.tsx`](src/Components/Dashboard.tsx)**: **User Dashboard Component (Welcome Screen)**

---

### 4.2 `src/CSS/` Directory (Styling Modules)
Contains dedicated stylesheets for the application:

- **[`Auth.css`](src/CSS/Auth.css)**: **Styles for Authentication & Dashboard Views**

---

## 5. Attachments of the login & registration page

### 5.1 `Screenshots/` Directory (Screenshots of UI)

---

## 6. SQL Assignment

### 6.1 `SQL Assignment Answer.docx` File (Answer of SQL Assignment)