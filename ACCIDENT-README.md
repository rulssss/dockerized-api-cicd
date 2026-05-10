````markdown
# 🚨 Incident Simulation & Recovery Exercises

This section documents controlled incident simulations performed on the AWS ECS environment in order to practice:

- Incident detection
- Troubleshooting
- Root cause analysis
- Recovery procedures
- Observability validation

The exercises were designed to simulate real-world operational failures using ECS, ALB, CloudWatch, IAM, and DynamoDB.

---

# 🧪 Incident 1 — ECS Service Unavailable

## 📌 Scenario

The ECS service desired task count was intentionally set to:

```text
desired tasks = 0
````

This simulated a complete service outage.

---

## 🔍 Symptoms

* Application returned HTTP 503
* ALB had no healthy targets
* CloudWatch 5XX alarms triggered

---

## 🧠 Root Cause

No ECS tasks were running behind the Application Load Balancer.

Without healthy targets:

* requests could not be routed
* ALB returned `503 Service Unavailable`

---

## 🛠️ Resolution

Recovery steps:

1. Open ECS Service
2. Restore desired task count from `0 → 1`
3. Wait for healthy task startup
4. Validate application recovery

---

## 📊 Detection

Detected using:

```text
CloudWatch Alarm:
HTTPCode_Target_5XX_Count
```

---

## 🎯 Key Learnings

* Difference between infrastructure outage and application failure
* ALB behavior without healthy targets
* ECS recovery workflow
* Basic incident response process

---

# 🧪 Incident 2 — DynamoDB Permission Failure

## 📌 Scenario

DynamoDB permissions were intentionally removed from the ECS task role.

The infrastructure remained healthy, but the application could no longer access DynamoDB.

---

## 🔍 Symptoms

* API requests failed
* ECS tasks remained healthy
* ALB remained healthy
* Application logs showed errors

---

## 🧠 Root Cause

The ECS task role lacked required permissions:

```text
dynamodb:Scan
dynamodb:GetItem
dynamodb:PutItem
```

This caused:

```text
AccessDeniedException
```

during database operations.

---

## 🛠️ Resolution

Recovery steps:

1. Restore required IAM permissions
2. Force new ECS deployment
3. Validate successful DynamoDB access

---

## 📊 Detection

Detected using:

* CloudWatch 5XX alarms
* CloudWatch application logs

---

## 🎯 Key Learnings

* Healthy infrastructure does not guarantee healthy applications
* Importance of application logs
* IAM troubleshooting
* Dependency failure investigation
* Root cause analysis using logs

---

# 🧪 Incident 3 — High CPU Utilization

## 📌 Scenario

A temporary CPU-intensive endpoint was deployed and repeatedly requested to simulate resource pressure.

This generated elevated CPU utilization inside the ECS task.

---

## 🔍 Symptoms

* Increased response latency
* CPU utilization spike visible in CloudWatch
* ECS tasks remained healthy

---

## 🧠 Root Cause

Sustained CPU-intensive operations caused temporary resource saturation.

This represented a performance degradation scenario rather than a complete outage.

---

## 🛠️ Resolution

Recovery steps:

1. Stop stress-testing requests
2. Monitor CPU normalization
3. Remove temporary stress endpoint

---

## 📊 Detection

Detected using:

```text
CloudWatch ECS Metrics:
CPUUtilization
```

---

## 🎯 Key Learnings

* Difference between outages and degradation
* Resource monitoring and observability
* CPU metrics behavior in CloudWatch
* Performance troubleshooting
* Capacity awareness

---

# 🧠 Overall Operational Learnings

These exercises reinforced real-world operational practices:

* Monitoring and observability
* Incident response workflows
* Root cause analysis
* ECS troubleshooting
* IAM debugging
* Application vs infrastructure failures
* Recovery validation
* Performance monitoring

---

# ✅ Final Outcome

The environment successfully demonstrated the ability to:

* Detect failures quickly
* Investigate incidents using metrics and logs
* Recover services safely
* Analyze root causes
* Validate monitoring and observability systems

This project simulates practical DevOps/SRE operational scenarios using AWS cloud-native services.

```
```
