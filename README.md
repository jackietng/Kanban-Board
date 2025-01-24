# Kanban Board Application

## Table of Contents
1. [Description](#description)
2. [Features](#features)
3. [Live Demo](#livedemo)
4. [Installation](#installation)
5. [Usage](#usage)
13. [Technologies Used](#technologies-used)
14. [License](#license)
15. [Contact](#contact)

## Description

This Kanban Task Management App is a secure and efficient solution for organizing and tracking tasks using a Kanban board interface. It features JWT authentication for secure access and provides a user-friendly interface for managing tasks and users.

## Features

- User authentication using JSON Web Tokens (JWT)
- Secure access to personal Kanban boards
- Task (ticket) creation, retrieval, updating, and deletion
- User state management including expiry of JWT due to inactivity
- Swimlane-based Kanban board visualization
- Protected routes for authenticated users
- Detailed ticket cards with status indicators and assignee information
- Create and edit ticket forms with real-time updates
- Error handling and loading states for improved user experience

## Live Demo
This a live demo of this application can be accessed at [https://kanban-board-1m0w.onrender.com/login](https://kanban-board-1m0w.onrender.com/login)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/jackietng/Kanban-Board.git/
   ```

2. Navigate to the project directory:
   ```
   cd kanban-app
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   API_BASE_URL=your_api_base_url
   ```

5. Run the application:
   ```
   npm start
   ```

## Usage

1. Open your web browser and navigate to the application URL.
2. Log in with your credentials on the Login page.
3. Once authenticated, you'll see the Kanban board with your tasks organized in swimlanes.
4. Use the "New Ticket" button to create new tasks.
5. Edit or delete existing tickets by clicking on the respective options on each ticket card.
6. Use the search bar, status filter, and sort options to organize and find specific tickets.
7. Navigate between different pages using the navbar.

## Technologies Used

- Frontend: React.js with TypeScript
- Routing: React Router
- API Communication: Fetch API
- Authentication: JSON Web Tokens (JWT)
- State Management: React Hooks (useState, useEffect, useRef)
- Styling: Custom CSS with responsive design

## Licence 

This project is licensed under the MIT License. 

## Contact

Jacqueline Nguyen - [jn1thythy56@gmail.com](mailto:jn1thythy56@gmail.com?subject=[GitHub]%20Dev%20Connect)