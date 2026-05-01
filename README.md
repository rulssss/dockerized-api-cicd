# 🚀 CI/CD with AWS ECS (Staging + Production + Rollback + Observability + Security)

## 📌 Description

This project implements a complete **CI/CD pipeline** using:

* GitHub Actions (CI + CD)
* AWS ECS (Fargate)
* Amazon ECR (container registry)
* Application Load Balancer (ALB)
* CloudWatch (logs, metrics, alarms)
* Amazon SNS (notifications)

The goal is to simulate a real-world environment with:

* Environment separation (`staging` and `production`)
* Manual approval for production deployments
* Version promotion between environments
* Functional and tested rollback
* Basic observability (logs, metrics, alerts)
* Applied security best practices
* Cost control

---

## 🧠 Architecture

```text
GitHub → CI → CD → ECR → ECS (Fargate)
                           ├── staging (/staging)
                           └── production (/)

Users → ALB → Target Groups → ECS Services → DynamoDB
                     ↓
               CloudWatch
        (Logs + Metrics + Alarms)
```

* **Staging**: testing environment
* **Production**: stable environment
* **ALB**: routes traffic based on path
* **CloudWatch**: centralized observability

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

## 📊 Observability

Basic observability was implemented using **CloudWatch**:

### 🔹 Logs

* Centralized logging via CloudWatch Logs
* Logs streamed from ECS containers using `awslogs` driver
* Log group: `/ecs/dockerized-api`

---

### 🔹 Metrics

Metrics collected from:

#### ALB (Application Load Balancer)

* `TargetResponseTime` (latency)
* `HTTPCode_Target_5XX_Count` (application errors)
* `RequestCount`

#### ECS (Fargate)

* `CPUUtilization`
* `MemoryUtilization`

---

### 🔹 Dashboard

A CloudWatch dashboard was created to visualize:

```text
✔ Latency
✔ Errors (5XX)
✔ CPU usage
✔ Memory usage
```

---

### 🔔 Alerts (Alarms)

Three alarms were configured:

#### 1. Application Errors

```text
Metric: HTTPCode_Target_5XX_Count
Condition: > 0
Evaluation: 2 / 2 (2 minutes)
```

#### 2. CPU Usage

```text
Metric: CPUUtilization
Condition: > 80%
Evaluation: 5 / 5 (5 minutes)
```

#### 3. Memory Usage

```text
Metric: MemoryUtilization
Condition: > 80%
Evaluation: 5 / 5 (5 minutes)
```

---

### 📩 Notifications

* Alerts are sent via **Amazon SNS (email)**

---

### 🎯 Success Criteria

```text
Ability to detect failures in less than 5 minutes
```

---

## 🔐 Security

Security was implemented following real-world best practices.

### 🔍 Key Improvements

#### 1. IAM Least Privilege

* Replaced overly permissive policies with a custom IAM policy
* Allowed only required DynamoDB actions:

```text
dynamodb:Scan
dynamodb:GetItem
dynamodb:PutItem
```

* Restricted access to a single table resource

---

#### 2. Secrets Management

* No secrets stored in source code
* No `.env` files committed
* GitHub Secrets used for CI/CD
* Runtime configuration handled via ECS environment variables

---

#### 3. Container Image Security

* Enabled **ECR image scanning on push**
* Verified vulnerability reports after image builds

---

### ✅ Security Best Practices Achieved

```text
✔ Least privilege enforced
✔ No wildcard (*) permissions
✔ Zero secrets in code
✔ Secure runtime configuration
✔ Vulnerability scanning enabled
```

---

## ⚙️ Technologies Used

* GitHub Actions
* AWS ECS (Fargate)
* Amazon ECR
* Application Load Balancer
* CloudWatch (Logs, Metrics, Alarms)
* Amazon SNS
* Docker

---

## 💰 Cost Control

* Services configured with **1 minimal task**
* Staging can be turned off (`desired tasks = 0`)
* Short log retention
* Minimal dashboards and alarms
* Optimized CPU and memory usage

---

## 📦 Versioning

Docker images are versioned using the commit SHA:

```text
dockerized-api:<commit-sha>
```

---

## 🔐 Security Summary

The system meets the defined security criteria:

```text
✔ No hardcoded secrets
✔ Minimal IAM permissions
✔ Secure container images
```

---

## ✅ Final Outcome

A complete cloud-native system with:

* Functional CI/CD pipeline
* Environment separation (staging & production)
* Manual approval workflow
* Version promotion
* Tested rollback
* Observability (logs, metrics, alarms)
* Security best practices applied

---

## 👨‍💻 Author

Project developed as a hands-on CI/CD, observability, and security implementation with real-world production practices.
