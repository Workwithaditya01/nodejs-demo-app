# Node.js Demo App — CI/CD with GitHub Actions & Docker

A simple Node.js and Express web application built to practice a complete CI/CD workflow using **GitHub Actions, Docker, Docker Hub, ESLint, and Jest**.

The project contains a web interface, REST API endpoints, automated tests, code linting, and an automated Docker image build-and-push pipeline.

![Main image](https://github.com/Workwithaditya01/nodejs-demo-app/blob/6ba4537e3dcf2e7fe7936a1588d877dce6522c89/Images/Update%20frontend%20image.png)

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Application](#application)
- [Running the Application Locally](#running-the-application-locally)
- [Testing the Application](#testing-the-application)
- [Docker](#docker)
- [GitHub Actions CI/CD](#github-actions-cicd)
- [GitHub Actions Secrets and Variables](#github-actions-secrets-and-variables)
- [CI/CD Security](#cicd-security)
- [Local Development Workflow](#local-development-workflow)
- [What I Learned](#what-i-learned)
- [Future Improvements](#future-improvements)
- [Project Goal](#project-goal)

---

## Project Overview

This project demonstrates how a developer can take a Node.js application from source code to a containerized application using an automated CI/CD pipeline.

### Workflow

```text
Developer
    │
    ▼
Git Push
    │
    ▼
GitHub Repository
    │
    ▼
GitHub Actions
    │
    ├── Lint
    │
    ├── Test
    │
    └── Docker Build & Push
            │
            ▼
        Docker Hub
```

---

## Features

- Node.js and Express web application
- Responsive DevOps-themed frontend
- REST API endpoints
- API calculator
- Application health check
- ESLint code quality checks
- Jest automated testing
- Supertest API testing
- Docker containerization
- Docker Hub image publishing
- GitHub Actions CI/CD
- Docker build cache using GitHub Actions
- Graceful application shutdown using `SIGTERM`

---

## Technologies Used

| Technology          | Purpose                      |
| ------------------- | ---------------------------- |
| Node.js             | JavaScript runtime           |
| Express.js          | Web framework                |
| HTML/CSS/JavaScript | Frontend                     |
| Jest                | Automated testing            |
| Supertest           | API testing                  |
| ESLint              | Code quality                 |
| Docker              | Application containerization |
| Docker Hub          | Container image registry     |
| GitHub Actions      | CI/CD automation             |
| Git                 | Version control              |
| GitHub              | Source code hosting          |

---

## Project Structure

```text
nodejs-demo-app/
│
├── .github/
│   └── workflows/
│       └── main.yml
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── index.js
├── index.test.js
├── package.json
├── package-lock.json
├── eslint.config.js
├── Dockerfile
├── .dockerignore
└── README.md
```

---

## Application

The application uses Express.js to serve the frontend and provide REST API endpoints.

### Available Endpoints

#### Home

```text
GET /
```

Returns the web application.

#### API

```text
GET /api
```

Example response:

```json
{
  "message": "Hello from nodejs-demo-app!",
  "version": "1.0.0"
}
```

#### Health Check

```text
GET /health
```

Example response:

```json
{
  "status": "ok",
  "service": "nodejs-demo-app"
}
```

This endpoint can be used by monitoring systems, load balancers, or container orchestration platforms to check whether the application is running.

#### Addition API

```text
GET /add/:a/:b
```

Example request:

```text
GET /add/10/20
```

Response:

```json
{
  "result": 30
}
```

Invalid input returns HTTP `400`.

Example request:

```text
GET /add/abc/20
```

Response:

```json
{
  "error": "Both parameters must be numbers"
}
```

---

## Running the Application Locally

### 1. Clone the repository

```bash
git clone https://github.com/Workwithaditya01/nodejs-demo-app.git
```

Move into the project:

```bash
cd nodejs-demo-app
```

### 2. Install dependencies

```bash
npm ci
```

### 3. Run ESLint

```bash
npm run lint
```

ESLint checks the JavaScript source code for common errors and code-quality problems.

### 4. Run automated tests

```bash
npm test
```

The project uses:

- Jest
- Supertest

The tests verify:

- Homepage response
- `/api`
- `/health`
- `/add/:a/:b`
- Invalid calculator input

### 5. Start the application

```bash
npm start
```

The server starts on `http://localhost:3000`. Open it in your browser to view the application.

---

## Testing the Application

After starting the server, the following endpoints can be tested.

| Endpoint   | URL                                  |
| ---------- | ------------------------------------ |
| Homepage   | `http://localhost:3000`              |
| API        | `http://localhost:3000/api`          |
| Health     | `http://localhost:3000/health`       |
| Calculator | `http://localhost:3000/add/10/20`    |

Expected calculator result:

```json
{
  "result": 30
}
```

---

## Docker

The application is containerized using Docker.

### Dockerfile

The Docker image uses `node:20-alpine`. Application dependencies are installed inside the container, and the application runs on port `3000`.

### Build the Docker image

```bash
docker build -t nodejs-demo-app .
```

### Run the Docker container

```bash
docker run -p 3000:3000 nodejs-demo-app
```

Now open `http://localhost:3000`. The application should work exactly like the local Node.js version.

### Docker Hub Image

The application image is published to Docker Hub:

```text
adityasondekar/nodejs-demo-app
```

The CI/CD pipeline publishes the `latest` tag and a Git commit SHA–based tag.

Example:

```text
adityasondekar/nodejs-demo-app:latest
```

---

## GitHub Actions CI/CD

The project uses GitHub Actions to automatically validate and containerize the application whenever code is pushed to the `main` branch.

### Pipeline

```text
Push to main
     │
     ▼
Checkout Code
     │
     ├───────────────┐
     ▼               ▼
   Lint             Test
     │               │
     └───────┬───────┘
             │
             ▼
       Docker Login
             │
             ▼
       Docker Build
             │
             ▼
       Docker Push
             │
             ▼
         Docker Hub
```

### CI/CD Jobs

#### 1. Lint

GitHub Actions installs the Node.js dependencies and runs:

```bash
npm run lint
```

This ensures that the source code passes ESLint checks.

#### 2. Test

The test job installs dependencies and runs:

```bash
npm test
```

This verifies that the application's API endpoints behave as expected.

#### 3. Build and Push

The Docker job runs only after both linting and testing succeed. It:

1. Checks out the source code
2. Sets up Docker Buildx
3. Logs into Docker Hub
4. Generates Docker image metadata
5. Builds the Docker image
6. Pushes the image to Docker Hub

The dependency is defined using:

```yaml
needs:
  - lint
  - test
```

Therefore:

```text
Lint ───────┐
            ├──► Docker Build & Push
Test ───────┘
```

Docker images are only published when the quality checks pass.

---

## GitHub Actions Secrets and Variables

The workflow uses GitHub repository configuration for Docker Hub authentication.

### Repository Variable

| Name                 | Purpose                    |
| -------------------- | -------------------------- |
| `DOCKERHUB_USERNAME` | Stores the Docker Hub username |

Accessed in the workflow with:

```yaml
${{ vars.DOCKERHUB_USERNAME }}
```

### Repository Secret

| Name              | Purpose                        |
| ----------------- | ------------------------------ |
| `DOCKERHUB_TOKEN` | Stores the Docker Hub access token |

Accessed in the workflow with:

```yaml
${{ secrets.DOCKERHUB_TOKEN }}
```

The Docker Hub token is stored as a GitHub Secret rather than being written directly into the workflow.

---

## CI/CD Security

Sensitive credentials should never be hardcoded inside:

- Source code
- Dockerfiles
- GitHub Actions workflows
- README files

Instead, GitHub Actions Secrets are used for sensitive authentication information.

---

## Local Development Workflow

The complete local development workflow is:

```bash
npm ci
npm run lint
npm test
npm start
```

Then verify the application at `http://localhost:3000`.

Docker can then be tested with:

```bash
docker build -t nodejs-demo-app .
docker run -p 3000:3000 nodejs-demo-app
```

---

## What I Learned

Through this project, I practiced several important DevOps concepts.

### 1. CI/CD

Learned how GitHub Actions can automatically execute:

```text
Code → Lint → Test → Build → Deploy/Publish
```

### 2. Automated Testing

Learned how Jest and Supertest can be used to test Express APIs automatically.

### 3. Code Quality

Used ESLint to identify potential JavaScript problems before the application is built and published.

### 4. Docker

Learned how to:

- Create a Dockerfile
- Build an image
- Run a container
- Map container ports
- Optimize the Docker build using `.dockerignore`
- Publish images to Docker Hub

### 5. GitHub Actions

Practiced:

- Workflow YAML
- Jobs
- Steps
- `needs`
- Actions
- Repository variables
- Repository secrets
- Docker authentication
- Docker image tagging
- Docker image publishing

### 6. CI/CD Dependencies

One important concept learned was that Docker image publishing should happen only after the application passes quality checks.

```text
Lint ──┐
       ├──► Build & Push
Test ──┘
```

This prevents a failing application from being automatically published as a production-ready image.

---

## Future Improvements

- Deploy the Docker container to AWS
- Add Kubernetes deployment
- Add Docker Compose
- Add application logging
- Add Prometheus metrics
- Add Grafana monitoring
- Add vulnerability scanning
- Add deployment to an EC2 instance
- Add separate development and production environments
- Add automated deployment after Docker image publishing

---

## Project Goal

The main goal of this project was to understand how a simple application can be integrated into a practical DevOps workflow:

```text
Application Development
        ↓
Version Control
        ↓
Code Quality
        ↓
Automated Testing
        ↓
Containerization
        ↓
CI/CD
        ↓
Container Registry
```

This project combines software development and DevOps practices into one complete hands-on workflow.