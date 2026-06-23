# 🛒 GoCart - Multi-Vendor E-Commerce Platform

> A production-grade, cloud-native multi-vendor e-commerce platform built with Next.js 15 and deployed on AWS with a fully automated DevSecOps pipeline.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![Security](https://img.shields.io/badge/security-WAF%20%2B%20Trivy-blue)]()
[![AWS](https://img.shields.io/badge/cloud-AWS-orange?logo=amazonaws)]()
[![Terraform](https://img.shields.io/badge/IaC-Terraform-7B42BC?logo=terraform)]()
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()

![GoCart Preview](https://img.shields.io/badge/Live-Demo-success)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Security](#-security)
- [Monitoring](#-monitoring)
- [Testing](#-testing)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**GoCart** is a modern, scalable, and secure multi-vendor e-commerce platform designed to handle real-world traffic while maintaining optimal performance. It combines cutting-edge web technologies with enterprise-grade cloud infrastructure, delivering a complete DevSecOps solution.

### 🎯 Key Highlights

- ⚡ **Zero-Downtime Deployments** via automated CI/CD pipeline
- 🛡️ **Multi-Layer Security** (WAF, Trivy, SonarCloud, Secrets Manager)
- 📈 **Auto-Scaling Infrastructure** that adapts to traffic spikes
- 🔄 **Automated Database Migrations** on every deployment
- 💰 **Cost-Optimized** with AWS Budgets and FinOps practices
- 🧪 **Comprehensive Testing** (Unit, Integration, Performance, Security)

---

## ✨ Features

### 🛍️ E-Commerce Capabilities

- 🏪 Multi-vendor marketplace with seller dashboards
- 🛒 Shopping cart with Redux state management
- 💳 Secure payment processing via Stripe
- 🔐 Authentication & authorization via Clerk
- 🖼️ Optimized product images via ImageKit CDN
- 📧 Background jobs for emails & notifications via Inngest
- 🔍 Product search and filtering
- 📦 Order management and tracking

### 🏗️ Technical Capabilities

- 🐳 Docker multi-stage builds (1.2 GB → 150 MB)
- 🚀 Next.js 15 App Router with SSR/SSG hybrid rendering
- 🗄️ Serverless PostgreSQL with Neon
- 🔄 Type-safe database queries with Prisma 7
- ⚙️ Infrastructure as Code with Terraform
- 🛡️ AWS WAF protection against SQLi, XSS, and DDoS
- 📊 Real-time monitoring with CloudWatch + SNS alerts
- 💸 Cost governance with AWS Budgets

---

## 🛠️ Tech Stack

### Frontend & Backend

| Technology | Purpose |
|------------|---------|
| ![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js) | React framework with SSR/SSG |
| ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react) | UI library |
| ![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss) | Utility-first CSS |
| ![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux) | State management |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript) | Type safety |

### Database & ORM

| Technology | Purpose |
|------------|---------|
| ![Neon](https://img.shields.io/badge/Neon-PostgreSQL-336791?logo=postgresql) | Serverless PostgreSQL |
| ![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma) | Type-safe ORM |

### Third-Party Services

| Technology | Purpose |
|------------|---------|
| ![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF) | Authentication & user management |
| ![Stripe](https://img.shields.io/badge/Stripe-Payments-008CDD?logo=stripe) | Payment processing |
| ![ImageKit](https://img.shields.io/badge/ImageKit-Media-FF4081) | Image optimization & CDN |
| ![Inngest](https://img.shields.io/badge/Inngest-Jobs-10B981) | Background job processing |

### Infrastructure & DevOps

| Technology | Purpose |
|------------|---------|
| ![AWS](https://img.shields.io/badge/AWS-ECS%20Express-FF9900?logo=amazonaws) | Container orchestration |
| ![Docker](https://img.shields.io/badge/Docker-24.0-2496ED?logo=docker) | Containerization |
| ![Terraform](https://img.shields.io/badge/Terraform-1.5-7B42BC?logo=terraform) | Infrastructure as Code |
| ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?logo=githubactions) | CI/CD pipeline |
| ![Trivy](https://img.shields.io/badge/Trivy-Scan-0097A0) | Container vulnerability scanning |
| ![SonarCloud](https://img.shields.io/badge/SonarCloud-Quality-4E9BCD) | Code quality analysis |

---

## 🏛️ Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        Browser[🌐 Browser]
    end

    subgraph "Security Layer"
        WAF[🛡️ AWS WAF<br/>SQLi/XSS/DDoS Protection]
    end

    subgraph "Application Layer"
        ALB[⚖️ Application Load Balancer]
        ECS1[📦 ECS Task 1<br/>Next.js Container]
        ECS2[📦 ECS Task 2<br/>Next.js Container]
        ECSEC[🔄 ECS Express<br/>Auto-Scaling]
    end

    subgraph "Data Layer"
        Neon[🐘 Neon PostgreSQL<br/>Serverless]
        Secrets[🔒 AWS Secrets Manager<br/>14+ API Keys]
        ECR[📦 AWS ECR<br/>Docker Registry]
    end

    subgraph "Monitoring Layer"
        CW[📊 CloudWatch<br/>Metrics & Logs]
        SNS[📧 SNS<br/>Email Alerts]
        Budget[💰 AWS Budgets<br/>Cost Control]
    end

    subgraph "CI/CD Pipeline"
        GH[🔄 GitHub Actions]
        Trivy[🔍 Trivy Scan]
        Sonar[📈 SonarCloud]
    end

    Browser --> WAF
    WAF --> ALB
    ALB --> ECS1
    ALB --> ECS2
    ECSEC --> ECS1
    ECSEC --> ECS2
    ECS1 --> Neon
    ECS2 --> Neon
    ECS1 --> Secrets
    ECS2 --> Secrets
    GH --> Trivy
    GH --> Sonar
    GH --> ECR
    GH --> ECSEC
    ECS1 --> CW
    ECS2 --> CW
    CW --> SNS
    CW --> Budget
```

### Architecture Highlights

- **Multi-layer security**: WAF → ALB → ECS → Database
- **Auto-scaling**: CPU-based scaling (70% threshold)
- **Zero-downtime deployments**: Rolling updates via ECS
- **Automated migrations**: Prisma runs on container startup
- **Secrets injection**: AWS Secrets Manager → ECS environment variables

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- PostgreSQL (local or Neon)
- AWS CLI configured
- Accounts: Clerk, Stripe, ImageKit, Inngest, SonarCloud

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/gocart.git
   cd gocart
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file at the root:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/gocart"
   DIRECT_URL="postgresql://user:password@localhost:5432/gocart"

   # Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
   CLERK_SECRET_KEY="sk_test_..."
   CLERK_WEBHOOK_SECRET="whsec_..."

   # Payments
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."

   # Media
   IMAGEKIT_PUBLIC_KEY="public_..."
   IMAGEKIT_PRIVATE_KEY="private_..."
   IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/..."

   # Background Jobs
   INNGEST_EVENT_KEY="..."
   INNGEST_SIGNING_KEY="..."

   # App
   NEXT_PUBLIC_CURRENCY_SYMBOL="€"
   ADMIN_EMAIL="admin@gocart.com"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

---

## ☁️ Deployment

### AWS Infrastructure Setup

1. **Configure AWS credentials**
   ```bash
   aws configure
   ```

2. **Initialize Terraform**
   ```bash
   cd infrastructure/terraform
   terraform init
   ```

3. **Deploy infrastructure**
   ```bash
   terraform apply
   ```

   This creates:
   - ✅ VPC with public subnets
   - ✅ ECS Express cluster
   - ✅ ECR repository
   - ✅ Secrets Manager with 14+ secrets
   - ✅ IAM roles (Task Execution + Infrastructure)
   - ✅ WAF with SQLi/XSS/Rate Limiting rules
   - ✅ CloudWatch alarms + SNS alerts
   - ✅ AWS Budgets for cost control

4. **Get the live URL**
   ```bash
   terraform output gocart_ingress_paths
   ```

### Manual Deployment (if needed)

```bash
# Build Docker image
docker build -t gocart:latest .

# Push to ECR
aws ecr get-login-password --region eu-west-3 | docker login --username AWS --password-stdin 149425764443.dkr.ecr.eu-west-3.amazonaws.com
docker tag gocart:latest 149425764443.dkr.ecr.eu-west-3.amazonaws.com/gocart-dev:latest
docker push 149425764443.dkr.ecr.eu-west-3.amazonaws.com/gocart-dev:latest

# Trigger ECS deployment
aws ecs update-service --cluster default --service gocart-dev-v3 --force-new-deployment --region eu-west-3
```

---

## 🔄 CI/CD Pipeline

The project uses a **3-stage GitHub Actions pipeline** that runs on every push to `main`:

### Stage 1: Build & Test
- ✅ Install dependencies
- ✅ Run ESLint
- ✅ Build Next.js app
- ✅ Run unit tests
- ✅ Run integration tests
- ✅ Run performance tests
- ✅ Run security tests
- ✅ SonarCloud code analysis

### Stage 2: Build Docker & Scan
- ✅ Build multi-stage Docker image
- ✅ Trivy vulnerability scan (blocks on CRITICAL)
- ✅ Push to AWS ECR

### Stage 3: Deploy to ECS
- ✅ Update ECS service with new image
- ✅ Zero-downtime rolling deployment
- ✅ Automated Prisma migrations on startup

```yaml
# .github/workflows/ci-cd.yml (simplified)
name: GoCart CI/CD Pipeline

on:
  push:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - run: npm test
      - uses: SonarSource/sonarqube-scan-action@v5
        continue-on-error: true

  build-and-scan:
    needs: build-and-test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: docker build -t gocart:${{ github.sha }} .
      - uses: aquasecurity/trivy-action@master
        with:
          image-ref: gocart:${{ github.sha }}
          exit-code: '1'
          severity: 'CRITICAL'
      - run: docker push ...

  deploy-ecs:
    needs: build-and-scan
    runs-on: ubuntu-latest
    steps:
      - run: aws ecs update-service --force-new-deployment
```

---

## 🛡️ Security

### Multi-Layer Security Approach

#### 1. Code Level
- **SonarCloud**: Static Application Security Testing (SAST)
- **ESLint**: Code quality and security rules
- **TypeScript**: Type-safe code prevents runtime errors

#### 2. Container Level
- **Trivy**: Scans Docker images for OS and dependency vulnerabilities
- **Multi-stage build**: Minimizes attack surface (150 MB image)
- **Non-root user**: Container runs as `nextjs` user (UID 1001)

#### 3. Infrastructure Level
- **AWS WAF**: Blocks SQL injection, XSS, and malicious bots
- **Rate Limiting**: 2000 requests/5min/IP prevents DDoS
- **Secrets Manager**: API keys encrypted with AWS KMS
- **IAM Roles**: Least-privilege access for ECS tasks

#### 4. Application Level
- **Clerk**: Enterprise-grade authentication with 2FA
- **Stripe**: PCI-DSS compliant payment processing
- **HTTPS**: Enforced via AWS Certificate Manager
- **CORS**: Configured to allow only trusted origins

### Security Testing

Run security tests locally:
```bash
node --test tests/security.test.js
```

Tests include:
- SQL injection attempt blocking
- XSS attempt blocking
- Sensitive variable exposure check
- Security headers verification

---

## 📊 Monitoring

### CloudWatch Alarms

| Metric | Threshold | Action |
|--------|-----------|--------|
| CPU Utilization | > 80% for 10 min | Email alert via SNS |
| Memory Utilization | > 80% for 10 min | Email alert via SNS |
| ECS Task Count | < 1 | Email alert via SNS |

### AWS Budgets

- **Monthly budget**: $20
- **Alert thresholds**: 50%, 80%, 100%
- **Notification**: Email to admin

### Logs

View application logs:
```bash
aws logs tail /aws/ecs/default/gocart-dev-v3-879b --since 10m --region eu-west-3
```

---

## 🧪 Testing

The project includes **4 types of tests** using Node.js built-in test runner (zero dependencies):

### Unit Tests
```bash
npm run test
```
Tests individual functions and Redux slices in isolation.

### Integration Tests
```bash
npm run test:integration
```
Tests API routes and database connections.

### Performance Tests
```bash
npm run test:performance
```
Tests response times and concurrent request handling.

### Security Tests
```bash
npm run test:security
```
Tests WAF blocking, secret exposure, and Docker vulnerabilities.

### Run All Tests
```bash
npm run test:all
```

---

## 📁 Project Structure

```
gocart/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   ├── (dashboard)/              # Seller dashboard
│   ├── (marketplace)/            # Public marketplace
│   ├── api/                      # API routes
│   ├── layout.jsx                # Root layout
│   └── globals.css               # Global styles
├── components/                   # React components
├── lib/                          # Utility functions
├── prisma/                       # Database schema & migrations
│   └── schema.prisma
├── store/                        # Redux slices
├── tests/                        # Test files
│   ├── unit/
│   ├── integration.test.js
│   ├── performance.test.js
│   └── security.test.js
├── infrastructure/
│   └── terraform/                # IaC configuration
│       ├── main.tf
│       ├── ecs.tf
│       ├── iam.tf
│       ├── waf.tf
│       ├── monitoring.tf
│       └── variables.tf
├── .github/
│   └── workflows/
│       └── ci-cd.yml             # CI/CD pipeline
├── Dockerfile                    # Multi-stage Docker build
├── entrypoint.sh                 # Prisma migration script
├── package.json
└── README.md
```

---

## 📸 Screenshots

### Homepage
<img width="952" height="476" alt="home" src="https://github.com/user-attachments/assets/fdbacd91-deee-4c50-a2cf-ff80954c9932" />

### Product Listing
<img width="947" height="412" alt="produits" src="https://github.com/user-attachments/assets/1088ecb8-24b3-4bba-b87a-a24c5f993da0" />

### Shopping Cart
<img width="944" height="383" alt="pan" src="https://github.com/user-attachments/assets/39b222f2-97f5-498d-8fa2-39b557c94750" />

### Seller Dashboard
<img width="950" height="313" alt="TBven" src="https://github.com/user-attachments/assets/175a2be0-937f-4323-98be-f7b8cca988aa" />


---

<div align="center">

**Built with ❤️ using Next.js, AWS, and DevSecOps best practices**

[⬆ Back to Top](#-gocart---multi-vendor-e-commerce-platform)

</div>
