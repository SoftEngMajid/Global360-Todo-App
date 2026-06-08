# Full-Stack To-Do App

This project is a full-stack To-Do application built to demonstrate a clean, decoupled integration between an Angular frontend and a .NET backend, complete with automated end-to-end testing.

![App Screenshot Placeholder]<img width="955" height="608" alt="app-screenshot" src="https://github.com/user-attachments/assets/93080a19-2cf6-4505-814c-97a1b96ed6b3" />

## Tech Stack
* **Frontend:** Angular 17+ (Standalone Components)
* **Backend:** .NET 10 Web API
* **Testing:** Playwright

## Prerequisites
Before you begin, ensure you have the following installed on your machine:
* [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
* [Node.js](https://nodejs.org/) (v18 or higher recommended)

## How to Run Locally

You will need two terminal windows open to run this application—one for the backend API and one for the frontend UI.

### 1. Start the Backend (.NET API)
Open your first terminal, navigate to the backend folder, and start the server:

```bash
cd backend/TodoApp.Api
dotnet build
dotnet run
```
*The API will run on `http://localhost:5022`.*

### 2. Start the Frontend (Angular)
Open your second terminal, navigate to the frontend folder, install the dependencies, and start the development server:

```bash
cd frontend
npm install
ng serve
```
*The application will open at `http://localhost:4200`.*

## Running End-to-End Tests

This project includes a Playwright test suite that automatically verifies the core functionality of the application across the stack. 

With **both** the frontend and backend running, open a third terminal in the frontend directory and run:

```bash
npx playwright test --headed
```

---
**Author:** 
Majid Khalid
