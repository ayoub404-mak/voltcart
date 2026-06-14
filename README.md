<div align="center">
  <h1><img src="https://gocart-gs.vercel.app/favicon.ico" width="20" height="20" alt="VoltCart Favicon">
   VoltCart</h1>
  <p>
    An open-source multi-vendor e-commerce platform built with Next.js and Tailwind CSS.
  </p>
  <p>
    <a href="https://github.com/GreatStackDev/goCart/blob/main/LICENSE.md"><img src="https://img.shields.io/github/license/GreatStackDev/goCart?style=for-the-badge" alt="License"></a>
    <a href="https://github.com/GreatStackDev/goCart/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightindigo.svg?style=for-the-badge" alt="PRs Welcome"></a>
    <a href="https://github.com/GreatStackDev/goCart/issues"><img src="https://img.shields.io/github/issues/GreatStackDev/goCart?style=for-the-badge" alt="GitHub issues"></a>
  </p>
</div>

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

---

## Features

- **Multi-Vendor Architecture:** Allows multiple vendors to register, manage their own products, and sell on a single platform.
- **Customer-Facing Storefront:** A beautiful and responsive user interface for customers to browse and purchase products.
- **Vendor Dashboards:** Dedicated dashboards for vendors to manage products, view sales analytics, and track orders.
- **Admin Panel:** A comprehensive dashboard for platform administrators to oversee vendors, products, and commissions.
## Archeticture

### 🏗️ Cloud Architecture & DevSecOps Pipeline

```mermaid
flowchart TD
    %% Styling
    classDef aws fill:#FF9900,stroke:#333,stroke-width:2px,color:#000,font-weight:bold
    classDef external fill:#232F3E,stroke:#333,stroke-width:2px,color:#fff,font-weight:bold
    classDef cicd fill:#2088FF,stroke:#333,stroke-width:2px,color:#fff,font-weight:bold
    classDef db fill:#336791,stroke:#333,stroke-width:2px,color:#fff,font-weight:bold
    classDef user fill:#28a745,stroke:#333,stroke-width:2px,color:#fff,font-weight:bold

    %% External Services
    subgraph External Services
        Clerk[Clerk Auth]:::external
        Stripe[Stripe Payments]:::external
        ImageKit[ImageKit CDN]:::external
        Inngest[Inngest Background Jobs]:::external
    end

    %% CI/CD Pipeline
    subgraph CI/CD Pipeline [GitHub Actions DevSecOps]
        GH[👤 Developer Push to `main`]:::cicd
        Sonar[SonarCloud SAST Scan]:::cicd
        Trivy[Trivy Container Vulnerability Scan]:::cicd
        Build[🐳 Build Multi-Stage Docker Image]:::cicd
        Push[📦 Push to Amazon ECR]:::cicd
        Deploy[🚀 Force New ECS Deployment]:::cicd
        
        GH --> Sonar --> Trivy --> Build --> Push --> Deploy
    end

    %% AWS Infrastructure
    subgraph AWS Cloud [AWS Infrastructure (eu-west-3)]
        ECR[(Amazon ECR\nPrivate Docker Registry)]:::aws
        WAF[🛡️ AWS WAF\nSQLi/XSS Protection & Rate Limiting]:::aws
        ALB[Application Load Balancer]:::aws
        ECS[⚙️ ECS Express Mode\nNext.js Standalone Container]:::aws
        SM[🔐 AWS Secrets Manager\n14+ Encrypted Env Variables]:::aws
        CW[📊 CloudWatch Metrics]:::aws
        SNS[📧 SNS Email Alerts]:::aws
        
        ECR -.->|Pulls Latest Image| ECS
        WAF -->|Filters Malicious Traffic| ALB
        ALB -->|Routes HTTPS Traffic| ECS
        SM -.->|Injects Secrets at Runtime| ECS
        ECS -->|Streams Logs & Metrics| CW
        CW -->|CPU/Memory > 80%| SNS
    end

    %% Database
    subgraph Database
        Neon[(Neon PostgreSQL\nServerless Database)]:::db
    end

    %% Client
    Client([🌐 End User\nBrowser/Mobile]):::user

    %% Runtime Connections
    Client -->|1. HTTPS Request| WAF
    ECS <-->|2. Prisma ORM Queries| Neon
    ECS <-->|3. Auth Verification| Clerk
    ECS <-->|4. Payment Intents| Stripe
    ECS <-->|5. Image Optimization| ImageKit
    ECS <-->|6. Async Events| Inngest

    %% Deployment Connections
    Push -.->|Stores Artifact| ECR
    Deploy -.->|Triggers Rolling Update| ECS
```

## 🛠️ Tech Stack <a name="-tech-stack"></a>

- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **UI Components:** Lucide React for icons
- **State Management:** Redux Toolkit

## 🚀 Getting Started <a name="-getting-started"></a>

First, install the dependencies. We recommend using `npm` for this project.

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/(public)/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Outfit](https://vercel.com/font), a new font family for Vercel.

---

## 🤝 Contributing <a name="-contributing"></a>

We welcome contributions! Please see our [CONTRIBUTING.md](./CONTRIBUTING.md) for more details on how to get started.

---

## 📜 License <a name="-license"></a>

This project is licensed under the MIT License. See the [LICENSE.md](./LICENSE.md) file for details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
