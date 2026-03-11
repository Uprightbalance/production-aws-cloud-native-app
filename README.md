# Cloud-Native CI/CD Platform on AWS (Terraform + EKS + GitOps)

## Overview

This project implements a **cloud-native CI/CD platform** for a containerized web application deployed on **Amazon EKS** using **GitOps principles with ArgoCD**.

The platform provisions infrastructure using **Terraform modules**, deploys workloads with **Kubernetes**, and automates application delivery across **DEV → STAGING → PROD environments**.

The application used for demonstration is a **Dry Cleaning Web Application** consisting of:

* Frontend service
* Backend API
* PostgreSQL database

The system follows **DevOps best practices** including:

* Infrastructure as Code (Terraform)
* GitOps deployments (ArgoCD)
* Multi-environment promotion workflow
* IAM least privilege policies
* Secure secrets management
* Containerized microservices

---

# Architecture

High level architecture:

```
Developer
   │
   │ Push code
   ▼
GitHub
   │
   │ GitHub Actions
   ▼
Docker Build
   │
   ▼
Container Registry
   │
   ▼
ArgoCD (GitOps)
   │
   ▼
Amazon EKS Cluster
   │
   ├── DEV Namespace
   ├── STAGING Namespace
   └── PROD Namespace
```

Infrastructure is provisioned using **Terraform** with **remote state stored in AWS**.

---

# Technologies Used

* AWS
* Terraform
* Amazon EKS
* Docker
* Kubernetes
* ArgoCD
* GitHub Actions
* Helm
* eksctl
* kubectl
* Amazon RDS (PostgreSQL)
* DynamoDB (Terraform state locking)
* Amazon S3 (Terraform state storage)

---

# Repository Structure

```
 terraform
    ├── environments
    │   ├── Dev
    │   │   ├── backend.tf
    │   │   ├── main.tf
    │   │   └── output.tf
    │   ├── prod
    │   │   ├── backend.tf
    │   │   ├── main.tf
    │   │   └── output.tf
    │   └── staging
    │       ├── backend.tf
    │       ├── main.tf
    │       └── output.tf
    ├── global
    │   ├── github_oidc.tf
    │   ├── outputs.tf
    │   └── provider.tf
    └── modules
        ├── eks
        │   ├── alb-controller.tf
        │   ├── alb-irsa.tf
        │   ├── alb-policy.tf
        │   ├── alb-service-account.tf
        │   ├── cluster.tf
        │   ├── iam.tf
        │   ├── iam_policy.json
        │   ├── main.tf
        │   ├── nodegroup.tf
        │   ├── oidc.tf
        │   ├── outputs.tf
        │   ├── provider.tf
        │   └── variables.tf
        ├── github_oidc
        │   ├── main.tf
        │   ├── outputs.tf
        │   └── variables.tf
        ├── rds
        │   ├── main.tf
        │   ├── outputs.tf
        │   └── variables.tf
        └── vpc
            ├── eip.tf
            ├── igw.tf
            ├── nat.tf
            ├── output.tf
            ├── rt.tf
            ├── subnets.tf
            ├── variables.tf
            └── vpc.tf
```

# Infrastructure Components

## Networking (VPC Module)

The VPC module provisions:

* VPC
* Public Subnets
* Private Subnets
* Internet Gateway
* NAT Gateway
* Elastic IP
* Route Tables

This network supports both **public ingress** and **private cluster workloads**.

---

# EKS Module

The EKS module provisions:

* EKS Cluster
* Node Groups
* OIDC provider
* IAM roles for service accounts (IRSA)
* ALB Controller IAM policies
* Kubernetes service accounts
* Cluster networking

The cluster is configured to run **three isolated environments using namespaces**.

---

# Database

Amazon RDS PostgreSQL instance is provisioned using Terraform.

It serves as the primary datastore for the backend service.

---

# Terraform State Management

Terraform state is stored remotely for collaboration and safety.

Backend configuration:

* **S3 Bucket** – Stores state files
* **DynamoDB Table** – State locking

Benefits:

* Prevents concurrent terraform runs
* Enables team collaboration
* Ensures safe infrastructure updates

---

# Environments

The platform supports **three deployment environments**.

| Environment | Namespace | Purpose                   |
| ----------- | --------- | ------------------------- |
| DEV         | dev       | Development testing       |
| STAGING     | staging   | Pre-production validation |
| PROD        | prod      | Production environment    |

Each namespace contains:

* Frontend deployment
* Backend deployment
* Kubernetes secrets
* Services
* Ingress resources

---

# GitOps Deployment (ArgoCD)

ArgoCD monitors a separate GitOps repository:

https://github.com/Uprightbalance/gitops-repo.git

Whenever changes are pushed to the GitOps repo:

1. ArgoCD detects the change
2. Syncs manifests automatically
3. Deploys the application to EKS

This ensures:

* Fully declarative deployments
* Auditability
* Rollbacks via Git history

---

# Docker Images

Dockerfiles were created for both services:

* Frontend
* Backend

Images are built during CI and pushed to the container registry.

---

# Image Promotion Pipeline

A separate repository manages **image promotion between environments**:

https://github.com/Uprightbalance/backend-frontend--DEV_TAG-IMAGE-promote-to-staging-prod-env.git

Promotion flow:

```
DEV → STAGING → PROD
```

This ensures:

* Controlled releases
* Tested artifacts reach production
* Deployment traceability

---

# Security

Security best practices implemented:

* IAM **least privilege policies**
* IRSA (IAM Roles for Service Accounts)
* Kubernetes secrets for sensitive data
* GitHub OIDC authentication
* Private subnets for worker nodes

---

# Tools Installed

The following CLI tools were used:

* `kubectl`
* `eksctl`
* `helm`
* `terraform`

---


```
terraform apply
```
