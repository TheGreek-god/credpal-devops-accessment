# CredPal DevOps Assessment – Node.js Application

## Overview

This repository contains a **production-ready Node.js application** with a full DevOps pipeline and infrastructure setup. The application is containerized, deployable via **Docker Compose** locally and **AWS ECS Fargate** in production, with CI/CD automation and security best practices applied.

The application exposes the following endpoints on **port 3000**:

- `GET /health` – Basic health check
- `GET /status` – Returns uptime and timestamp
- `POST /process` – Accepts a JSON payload and returns a processing confirmation

---

## Table of Contents

1. [Running Locally](#running-locally)  
2. [Accessing the Application](#accessing-the-application)  
3. [Deployment](#deployment)  
4. [Infrastructure](#infrastructure)  
5. [Security & Observability Decisions](#security--observability-decisions)  
6. [CI/CD Pipeline](#cicd-pipeline)  
7. [Endpoints](#endpoints)  

---

## Running Locally

1. Clone the repository:

```bash
git clone <repo-url>
cd credpal-devops-assessment
```

## Running Locally

1. Copy the environment template:

```bash
cp .env.example .env
```
2. Edit .env with local secrets if needed (e.g., DB_PASSWORD).

3. Build and start the services with Docker Compose:

```bash
docker-compose up --build
```

4. The Node.js application will be available at: http://localhost:3000


## Accessing the Application

### Local development

```text
GET  http://localhost:3000/health
GET  http://localhost:3000/status
POST http://localhost:3000/process
```

### Production deployment:
```text
Frontend by an Application Load Balancer (ALB) with HTTPS

Example: https://your-domain-name/
```

## Deployment

The application is deployed to **AWS ECS Fargate** using Terraform. Deployment steps:

### Build and push Docker image

```bash
docker build -t ghcr.io/<github-org>/<repo>:latest -f docker/Dockerfile .
docker push ghcr.io/<github-org>/<repo>:latest
```

### Provision infrastructure using Terraform

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

## Infrastructure

- **VPC** with public subnets and security groups
- **Application Load Balancer (HTTPS)** via AWS ACM
- **ECS Fargate Cluster** running the Node.js application
- **PostgreSQL database** for local development
- **Health checks** integrated with ALB
- All infrastructure is **provisioned via Terraform**


## CI/CD Pipeline

- Implemented via **GitHub Actions**

### Triggers
- Push to `main`
- Pull request targeting `main`

### Pipeline steps
1. Install dependencies and run tests
2. Build Docker image
3. Push image to **GitHub Container Registry (GHCR)**
4. Deploy to ECS (with optional manual approval for production)

## Endpoints

| Method | Endpoint     | Description                       |
|--------|-------------|-----------------------------------|
| GET    | /health     | Returns app health status          |
| GET    | /status     | Returns uptime and timestamp      |
| POST   | /process    | Processes a payload and responds  |

## Notes

- Local development uses **Docker Compose** for app + database
- Production deployment uses **ECS Fargate** with rolling updates
- **Zero downtime deployments** guaranteed via ALB health checks
- **Secrets are never committed** to GitHub
