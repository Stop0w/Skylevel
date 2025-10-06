Agent to Use: containerize-application.md

Prompt:

Objective:
Your task is to create a complete, multi-container Docker environment for the VerifyAI project. This will allow us to run the entire full-stack application (frontend, backend, and database) in an isolated and consistent environment with a single command.

Execution Plan:

Analyze the Project: Review the 🖥️.frontend/package.json and ⚙️.backend/requirements.txt files to understand all dependencies for both services.

Create a Backend Dockerfile: In the ⚙️.backend/ directory, create a Dockerfile that sets up a Python environment, installs all necessary packages, and runs the FastAPI server.

Create a Frontend Dockerfile: In the 🖥️.frontend/ directory, create a Dockerfile that sets up a Node.js environment, installs all npm packages, and runs the Vite development server.

Create a docker-compose.yml File: In the project's root directory, create a docker-compose.yml file that defines and links all the necessary services:

frontend: The React application.

backend: The Python FastAPI application.

db: A PostgreSQL database service.

Ensure all services are configured to communicate with each other on the Docker network and that the necessary environment variables (for database connections, etc.) are correctly passed to each service.

Final Output:
Provide the complete contents for all three files (backend/Dockerfile, frontend/Dockerfile, docker-compose.yml) and the single command (docker-compose up) needed to launch the entire application stack.