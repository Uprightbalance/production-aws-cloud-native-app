# Cloud-Native CI/CD Platform on AWS (Terraform + EKS + GitOps)

## Overview

This repository provisions the **cloud-native platform foundation** for deploying and operating a containerized application on **Amazon EKS** using **GitOps principles**.

It provides the infrastructure required to support a multi-environment delivery workflow across:

- **DEV**
- **STAGING**
- **PROD**

The demonstration workload is a **Dry Cleaning Web Application** consisting of:

- **Frontend service**
- **Backend API**
- **PostgreSQL database**

This platform was designed to reflect practical **DevOps / Platform Engineering** patterns, including:

- Infrastructure as Code with Terraform
- Kubernetes on Amazon EKS
- GitOps deployment integration with ArgoCD
- Immutable image promotion across environments
- IAM least privilege and IRSA
- Remote Terraform state management
- Multi-environment namespace-based deployment strategy

---

## Platform Scope

This repository is responsible for provisioning the **foundational cloud infrastructure** required by the platform, including:

- VPC and networking
- Amazon EKS cluster
- IAM roles and OIDC integrations
- RDS PostgreSQL database
- Terraform remote state backend

> **Note:** Runtime workload deployment, observability, logging, tracing, and backup operations are managed in a separate GitOps repository.

---

## High-Level Architecture

```
Developer
   │
   │ Push code
   ▼
GitHub
   │
   │ GitHub Actions
   ▼
Build & Test
   │
   ▼
Container Registry
   │
   ▼
GitOps Repository Update
   │
   ▼
ArgoCD
   │
   ▼
Amazon EKS Cluster
   │
   ├── DEV Namespace
   ├── STAGING Namespace
   └── PROD Namespace
```
---
# Project Goals

This project was built to demonstrate how a modern cloud-native delivery platform can be designed for:

* repeatable infrastructure provisioning
* deployment traceability
* environment consistency
* release safety
* cost-aware architecture decisions
* operational readiness

The goal was not just to deploy an application, but to build a platform that reflects how real-world engineering teams structure infrastructure and delivery workflows.
---
# Technologies Used

## Cloud & Infrastructure
* AWS
* Terraform
* IAM / OIDC / IRSA
* Amazon EKS
* Amazon RDS (PostgreSQL)
* DynamoDB (Terraform state locking)
* Amazon S3 (Terraform state storage)

## Container & Kubernetes
* Docker
* Kubernetes
* Helm
* eksctl
* kubectl

## CI/CD & GitOps
* ArgoCD
* GitHub Actions

---
# Supporting Platform Components
* AWS Load Balancer Controller
* GitHub OIDC Authentication

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

## 1. Networking (VPC Module)

The VPC module provisions:

* VPC
* Public Subnets
* Private Subnets
* Internet Gateway
* NAT Gateway
* Elastic IP
* Route Tables

## Purpose

This network design supports:

* public ingress traffic
* private Kubernetes workloads
* secure internal communication between platform components
---
## 2. Amazon EKS Cluster

The EKS module provisions:

* EKS cluster
* Managed node groups
* OIDC provider
* IAM Roles for Service Accounts (IRSA)
* AWS Load Balancer Controller integration
* Cluster IAM roles and policies

## Purpose

The EKS cluster acts as the runtime environment for all application workloads across:

* DEV
* STAGING
* PROD
---
## 3. Database Layer

Amazon RDS PostgreSQL is provisioned using Terraform and serves as the primary datastore for the backend API.

## Why RDS was used

A managed database service was chosen instead of self-hosting PostgreSQL inside Kubernetes to reduce operational complexity and better align with production-grade cloud architecture.

## Benefits

* managed backups
* simplified maintenance
* improved durability
* stronger production realism
---
## 4. Terraform Remote State Management

Terraform state is stored remotely using:

* Amazon S3 – state file storage
* Amazon DynamoDB – state locking

## Why this matters

This enables:

* safer collaboration
* durable state storage
* protection against concurrent terraform apply operations
* more reliable infrastructure lifecycle management
---
# Environments

The platform supports **three deployment environments**.

| Environment | Namespace | Purpose                   |
| ----------- | --------- | ------------------------- |
| DEV         | dev       | Development testing       |
| STAGING     | staging   | Pre-production validation |
| PROD        | prod      | Production environment    |

Each environment is deployed into its own Kubernetes namespace and managed declaratively via GitOps.

Each namespace contains:

* Frontend deployment
* Backend deployment
* Kubernetes secrets
* Services
* Ingress resources

---
# CI/CD & Delivery Workflow

## Delivery Flow
```
Developer Push
   ↓
GitHub Actions
   ↓
Build & Push Docker Image
   ↓
Update GitOps Manifests
   ↓
ArgoCD Sync
   ↓
Deploy to EKS Namespace
```
This workflow separates build concerns from deployment concerns, improving traceability and reducing release risk.
---

# Repository Relationships

This platform works together with two additional repositories:

## 1. GitOps Repository

Responsible for:

* Kubernetes workload manifests
* ArgoCD applications
* monitoring
* logging
* tracing
* backup and restore operations

Repository:
https://github.com/Uprightbalance/gitops-repo.git

## 2. Image Promotion Repository

Responsible for:

* immutable image promotion
* DEV → STAGING → PROD release progression
* controlled artifact promotion

Repository:
https://github.com/Uprightbalance/backend-frontend--DEV_TAG-IMAGE-promote-to-staging-prod-env.git

---
# Architecture Decisions & Trade-offs

This project intentionally includes architecture trade-offs to reflect practical platform engineering decision-making.

## 1. Single EKS Cluster with Namespace-Based Environments

This platform uses one Amazon EKS cluster with separate namespaces for:

* dev
* staging
* prod

## Why this design was chosen

This approach was selected to:

* reduce AWS infrastructure cost
* simplify cluster administration
* avoid duplicating shared platform services
* accelerate environment provisioning

## Benefits
* lower cost than running three separate clusters
* easier operational management for a small team or learning platform
* shared services such as ArgoCD and ingress controller can be reused

## Trade-offs
* lower isolation compared to separate clusters
* shared control plane across all environments
* broader blast radius for cluster-wide issues

## Production Recommendation

A more production-hardened design would typically use:

* one cluster for non-production (DEV/STAGING)
* one dedicated cluster for PROD

This project intentionally uses a single-cluster model to balance:

* cost
* simplicity
* learning value
* operational realism

## 2. GitOps Instead of Direct kubectl Deployments

Deployments are managed using ArgoCD rather than directly applying manifests from CI pipelines.

## Why this design was chosen

This improves:

* deployment traceability
* rollback safety
* declarative consistency

## Benefits
* Git becomes the source of truth
* cluster drift is reduced
* deployments are auditable and reproducible

## 3. Managed PostgreSQL on RDS Instead of Running DB in Kubernetes

The database was intentionally provisioned as Amazon RDS PostgreSQL.

## Why this design was chosen

This reduces operational burden and aligns better with production-grade cloud design.

## Benefits

* managed backups
* easier maintenance
* improved durability
* less operational complexity inside Kubernetes

---
# Security Design

## Security controls implemented include:

* IAM least privilege policies
* GitHub OIDC authentication
* IAM Roles for Service Accounts (IRSA)
* private subnets for worker nodes
* Kubernetes secret usage for application configuration
* environment separation through namespaces

## Security Objective

The goal is to reduce long-lived credentials and improve workload identity separation between AWS and Kubernetes.

---
# Operational Readiness

This platform was designed not only to provision infrastructure, but also to support realistic operations.

Key operational considerations include:

* environment separation
* rollback capability
* image promotion discipline
* troubleshooting workflows
* backup and restore planning
* declarative recovery through GitOps

# Troubleshooting Scenarios & Incident Handling

## Scenario 1: Backend Pod CrashLoopBackOff

### Example Cause
* incorrect environment variable
* invalid database connection string
* application startup failure

### Symptoms
* backend pod repeatedly restarts
* frontend loads but API calls fail
* deployment never becomes ready

### Troubleshooting Approach

Inspect container logs:
```bash
kubectl logs <backend-pod-name> -n dev
```

Describe the pod to inspect events:
```bash
kubectl describe pod <backend-pod-name> -n dev
```

Validate deployment environment variables and secret references:
```bash
kubectl describe deployment backend -n dev
kubectl get secret -n dev
```
### What this validates
* Kubernetes troubleshooting workflow
* log-based debugging
* GitOps-based configuration correction

## Scenario 2: Service Port Misconfiguration

### Example Cause
service targetPort does not match container port

### Symptoms
* pods appear healthy
* service-to-pod traffic fails
* ingress may return connection errors

### Troubleshooting Approach

Inspect the service definition:
```bash
kubectl get svc -n dev
kubectl describe svc backend -n dev
```

Check the deployment container port configuration:
```bash
kubectl describe deployment backend -n dev
```

Verify endpoints are being created correctly:
```bash
kubectl get endpoints -n dev
```

### What this validates
* service networking troubleshooting
* Kubernetes service debugging



## Scenario 3: Database Connectivity Failure

### Example Cause
* wrong credentials
* invalid hostname
* missing security group rule
* blocked network path to RDS

### Symptoms
* backend starts but returns 500 errors
* logs show DB connection failure

### Troubleshooting Approach

Inspect backend logs for database-related errors:

```bash
kubectl logs <backend-pod-name> -n dev
```

Describe the backend deployment to confirm environment variable injection:
```bash
kubectl describe deployment backend -n dev
```

Check whether the Kubernetes secret exists and is referenced correctly:
```bash
kubectl get secret -n dev
kubectl describe secret <db-secret-name> -n dev
```

verify the backend pod can resolve and reach the database hostname:
```bash
kubectl exec -it <backend-pod-name> -n dev -- sh
nslookup <rds-endpoint>
```

#### Also verify:

* database hostname is correct
* database port is correct
* username / password values match expected credentials
* subnet and routing path between EKS and RDS are valid

### What this validates
* secrets troubleshooting
* application dependency debugging
* VPC / security group reasoning

## Scenario 4: ArgoCD OutOfSync / Degraded State

### Example Cause
* invalid manifest
* broken image reference
* misconfigured Kubernetes resource

### Symptoms
* deployment does not reflect Git state
* ArgoCD shows degraded or failed sync

### Troubleshooting Approach

Check application sync and health status in ArgoCD UI.

From the cluster, inspect the workload resources directly:
```bash
kubectl get all -n dev
kubectl get deployment,svc,ingress -n dev
```


Describe the affected deployment or resource:
```bash
kubectl describe deployment backend -n dev
kubectl describe ingress backend-ingress -n dev
```


Inspect pod events for scheduling or image pull issues:
```bash
kubectl get pods -n dev
kubectl describe pod <pod-name> -n dev
```

#### Common issues to verify:

* YAML syntax errors
* wrong image tag or image path
* invalid resource references
* missing secret / config dependency
* incorrect namespace in manifest
* health check / readiness probe failures

If the issue is manifest-related, fix the configuration in Git and allow ArgoCD to resync.

If needed, rollback by reverting the last known-good commit in the GitOps repository.

### What this validates
* GitOps deployment debugging
* declarative recovery workflow
* safe rollback through Git history
* manifest validation and sync troubleshooting

## Scenario 5: Ingress / Load Balancer Routing Failure

### Example Cause
* incorrect ingress annotation
* invalid health check path
* service mismatch

### Symptoms
* ALB exists but application is unreachable
* target groups remain unhealthy

### Troubleshooting Approach

Inspect ingress resources:
```bash
kubectl get ingress -A
kubectl describe ingress <ingress-name> -n dev
```

Check whether the ingress points to the correct backend service and port:
```bash
kubectl describe svc backend -n dev
```

Verify that pods behind the service are healthy:
```bash
kubectl get pods -n dev
kubectl describe deployment backend -n dev
```

Inspect AWS Load Balancer Controller logs:
```bash
kubectl logs -n kube-system deployment/aws-load-balancer-controller
```

---
# Backup & Recovery Strategy

This platform includes recovery planning for both infrastructure state and runtime workloads.

## 1. Terraform State Recovery

Terraform state is protected using:

* Amazon S3
* DynamoDB locking

### Recovery Value

This helps protect against:

* local workstation loss
* concurrent state corruption
* unsafe infrastructure changes

## 2. Database Recovery

The PostgreSQL database is hosted on Amazon RDS.

### Recovery Considerations
* automated backups can be enabled
* manual snapshots should be taken before risky changes
* database recovery is critical for failed migrations or data corruption scenarios

## 3. GitOps-Based Workload Recovery

Since Kubernetes manifests are stored in Git, workloads can be redeployed declaratively.

### Recovery Value

This supports recovery of:

* deployments
* services
* ingress resources
* namespace application state

### Key Principle

Git serves as the source of truth for deployed workload state.

---
# CLI Tools Used

The following CLI tools were used while building and operating the platform:

* terraform
* kubectl
* eksctl
* helm

---
# Future Improvements

Potential next enhancements include:

* dedicated production EKS cluster
* Horizontal Pod Autoscaler (HPA)
* Cluster Autoscaler or Karpenter
* policy enforcement with Kyverno or OPA Gatekeeper
* canary or blue-green deployments
* TLS automation with cert-manager
* stronger production environment isolation

---
# Key Takeaways

This project demonstrates how to design and provision a cloud-native deployment platform on AWS using:

* Terraform for infrastructure provisioning
* EKS for container orchestration
* GitOps for deployment management
* immutable artifact promotion for release consistency
* namespace-based environment separation for cost-aware multi-environment delivery

It was built not just to deploy an application, but to reflect real-world DevOps and platform engineering practices around:

* architecture decisions
* deployment safety
* operational troubleshooting
* reproducibility
* recovery readiness

```md
## Related Repositories

This project is split into **three repositories** to separate platform provisioning, runtime deployment state, and artifact promotion.

- **Platform Repository**  
  Provisions the AWS infrastructure foundation using Terraform, including VPC, EKS, IAM, and RDS.
https://github.com/Uprightbalance/production-aws-cloud-native-app.git

- **GitOps Repository**  
  Manages Kubernetes workloads and operational components declaratively through ArgoCD, including monitoring, logging, tracing, and backup tooling.
https://github.com/Uprightbalance/gitops-repo.git

- **Image Promotion Repository**  
  Controls image tag promotion across **DEV → STAGING → PROD**, ensuring the same tested artifact is promoted safely across environments.
https://github.com/Uprightbalance/backend-frontend--DEV_TAG-IMAGE-promote-to-staging-prod-env.git

### Why this structure was used

This separation improves:

- maintainability
- deployment traceability
- release safety
- operational clarity
- alignment with real-world DevOps / Platform Engineering practices
```

