# TastyHub

TastyHub is a web application for managing and sharing recipes. Users can create, view, update, and delete recipes through a user-friendly interface. 

## Setup and Run

### Prerequisites
- Node.js: Ensure Node.js is installed on your machine. You can download it from [Node.js website](https://nodejs.org/).
- Angular CLI: Install Angular CLI globally using npm: `npm install -g @angular/cli`. 
### Installation
1. Clone the repository: `git clone https://github.com/chiarazetaa/tasty-hub.git`
2. Open terminal and ensure you are using Node.js version 20: `node --version` (If not, install or switch to Node.js version 20)
3. Navigate to the frontend directory: `cd tasty-hub/frontend`
4. Install frontend dependencies: `npm install`
5. Open another terminal and ensure you are using Angular 16: `ng version` (If not, install or switch to Angular 16)
6. Navigate to the backend directory: `cd tasty-hub/backend`
7. Install backend dependencies: `npm install`

### Run the Application
1. Start the backend server: Navigate to the backend directory and run `npm start`.
2. Start the frontend server: Navigate to the frontend directory and run `npm start`.
3. Open your web browser and go to [http://localhost:4200/](http://localhost:4200/).

## Architecture
TastyHub follows a client-server architecture:

### Client (frontend/)
The client-side of the application is an Angular 16 application located in the "frontend" folder. It consists of components for displaying recipes, adding, updating, and deleting recipes, as well as for managing ingredients.

### Server (backend/)
The server-side of the application is a Node.js application located in the "backend" folder. It uses Fastify as the web framework and MongoDB as the database. The server provides RESTful API endpoints for performing CRUD operations on recipes and ingredients.

## Features
- Create new recipes with names, descriptions, and instructions.
- View a list of existing recipes with pagination support.
- Update existing recipes by editing their details.
- Delete recipes to remove them from the database.
- Add, update or delete ingredients of an existing recipe.

## Technologies Used
- Angular 16: A JavaScript framework for building web applications.
- Node.js: A JavaScript runtime for server-side development. (Version 20)
- Fastify: A web framework for Node.js known for its speed and low overhead.
- MongoDB: A NoSQL database used for storing recipe and ingredient data.

## Automated Tests
Automated tests for both the frontend and backend components can be added in the "tests" directory of their respective folders. These tests can cover unit tests for individual components, integration tests for API endpoints, and end-to-end tests for user flows.

## Contact Information
Chiara Zuffi
- Email: chiara.zuffi19@gmail.com
- GitHub: https://github.com/chiarazetaa
