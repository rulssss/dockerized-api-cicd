# 🚀 CI/CD with AWS ECS (Staging + Production + Rollback)

## 📌 Description

This project implements a complete **CI/CD pipeline** using:

* GitHub Actions (CI + CD)
* AWS ECS (Fargate)
* Amazon ECR (container registry)
* Application Load Balancer (ALB)

The goal is to simulate a real-world environment with:

* Environment separation (`staging` and `production`)
* Manual approval for production deployments
* Version promotion between environments
* Functional and tested rollback
* Cost control

---

## 🧠 Architecture

```text
GitHub → CI → CD → ECR → ECS (Fargate)
                           ├── staging (/staging)
                           └── production (/)
```

* **Staging**: testing environment
* **Production**: stable environment
* **ALB**: routes traffic based on path

---

## 🔄 CI/CD Flow

1. Code is pushed or merged into `main`
2. CI runs validations
3. CD:

   * builds Docker image
   * pushes image to ECR with unique tag (SHA)
   * registers a new task definition
   * deploys automatically to `staging`
4. Application is tested in `/staging`
5. Manual approval in GitHub
6. Deployment to production

---

## 🚀 Version Promotion

Version promotion ensures that:

```text
Production uses EXACTLY the same version validated in Staging
```

Each deployment creates a new task definition revision:

```text
dockerized-api-task:1
dockerized-api-task:2
dockerized-api-task:3
...
```

---

## 🔁 Rollback (Tested)

If a deployment fails in production, it is possible to revert to a previous version without rebuilding the image.

### Steps

1. Go to AWS ECS → Cluster → Service (production)
2. Click **Update service**
3. Select a previous task definition revision
4. Confirm deployment

### Result

* ECS performs a **rolling update**
* The stable version is restored
* No rebuild or image push is required

---

## 🧪 Environments

| Environment | Path     | Purpose      |
| ----------- | -------- | ------------ |
| Staging     | /staging | Testing      |
| Production  | /        | Live traffic |

---

## ⚙️ Technologies Used

* GitHub Actions
* AWS ECS (Fargate)
* Amazon ECR
* Application Load Balancer
* Docker

---

## 💰 Cost Control

* Services configured with **1 minimal task**
* Staging can be turned off (`desired tasks = 0`)
* Optimized CPU and memory usage

---

## 📦 Versioning

Docker images are versioned using the commit SHA:

```text
dockerized-api:<commit-sha>
```

This ensures full traceability between code and deployments.

---

## 🔐 Security

* AWS credentials managed via GitHub Secrets
* IAM roles for ECS task execution
* Environment separation

---

## ✅ Final Outcome

A complete CI/CD pipeline with:

* Functional CI
* Automated CD
* Staging / Production separation
* Manual approval workflow
* Version promotion
* Tested rollback

---

## 👨‍💻 Author

Project developed as a hands-on CI/CD implementation with real-world production practices.
