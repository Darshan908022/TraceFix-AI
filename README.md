# 🛠️ TraceFix AI — Agentless API Observability & Automated Remediation Platform

> **PEC Hacks 4.0 | ODYSSEY Submission**  
> An automated SRE & DevOps platform that ingests backend API logs, analyzes stack traces using Gemini AI, and generates deploy-ready GitHub Pull Requests to fix root causes in seconds.

---

## 📌 Problem Statement

Modern microservice architectures generate thousands of stack traces daily. When critical API failures occur, SRE and DevOps engineers spend valuable time manually parsing logs, tracking down affected files, assessing downtime risks, and writing patch PRs. 

**TraceFix AI** automates this entire lifecycle—moving from raw error logs to a structured AI diagnosis and an automated GitHub PR in just one click.

---

## ✨ Key Features

* **⚡ Agentless API Log Ingestion:** Ingests raw stack traces and structured API logs via a lightweight FastAPI REST endpoint.
* **🧠 Gemini AI Diagnostic Engine:** 
  * Identifies exact **Root Cause**.
  * Pinpoints **Affected Files**.
  * Recommends a **Suggested Code/Config Fix**.
  * Calculates a **Severity Score** ($0-100$) and **Estimated Downtime Cost**.
* **🚀 Automated GitHub Remediation:** Dynamically creates a patch branch and opens a Pull Request on your target repository via `PyGithub`.
* **💻 Interactive SRE Dashboard:** Clean, responsive React UI built with Vite for real-time log analysis and 1-click PR triggers.

---

## 📐 System Architecture

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                          React / Vite Dashboard                         │
│                           (http://localhost:5173)                       │
└────────────────────┬───────────────────────────────▲────────────────────┘
                     │                               │
       1. POST Raw Logs                              │ 2. Return AI Analysis
          (/analyze-log)                             │    (JSON Payload)
                     │                               │
                     ▼                               │
┌────────────────────────────────────────────────────┴────────────────────┐
│                           FastAPI Backend                               │
│                           (http://localhost:8000)                       │
└──────────────┬─────────────────────────────────────────────┬────────────┘
               │                                             │
               │ 3. Send Prompt                              │ 4. Trigger PR
               ▼                                             ▼
    ┌──────────────────────┐                     ┌──────────────────────┐
    │   Google Gemini API  │                     │   GitHub REST API    │
    │ (gemini-flash-latest)│                     │     (PyGithub)       │
    └──────────────────────┘                     └──────────┬───────────┘
                                                            │
                                                            ▼
                                                 ┌──────────────────────┐
                                                 │   GitHub Repository  │
                                                 │    Automated PR      │
                                                 └──────────────────────┘