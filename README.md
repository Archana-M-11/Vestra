# Vestra — AI-Powered Fashion Marketplace

Vestra is a multi-vendor fashion marketplace that connects customers with independent fashion vendors through a unified shopping platform. It features **Vee**, an AI assistant that provides personalized styling recommendations, real-time product information, and vendor business insights.

The platform combines modern e-commerce functionality with **Retrieval-Augmented Generation (RAG)** and **function calling** to deliver context-aware assistance grounded in relevant knowledge and live application data.

**Project Status:** In Development

---

## Table of Contents

- [Architecture](#architecture)
- [Features](#features)
- [AI Assistant — Vee](#ai-assistant--vee)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)

---

## Architecture

![Vestra System Architecture](files/Architecture.png)

Vestra follows a modular architecture with separate frontend and backend applications. PostgreSQL provides persistent data storage, while pgvector supports semantic retrieval for AI-powered features.

The AI layer combines knowledge retrieval with authorized backend tools to support customer shopping experiences and vendor workflows.

---

## Features

### Marketplace

- **Multi-Vendor Catalog:** Browse products from independent fashion vendors.
- **Product Management:** Manage product listings, inventory, search, filtering, and pagination.
- **Shopping Cart:** Manage selected products before checkout.
- **Order Management:** Support order placement, tracking, and purchase history.
- **Payment Integration:** Stripe Checkout integration planned for test-mode payment flows.
- **Role-Based Access Control:** Separate permissions and experiences for customers, vendors, and administrators.

### AI-Powered Capabilities

- **Personalized Recommendations:** Assist customers with outfit ideas and product discovery.
- **Contextual Knowledge Retrieval:** Retrieve relevant information from product descriptions, FAQs, fashion guides, and platform policies.
- **Live Product Insights:** Access current prices and stock information through backend tools.
- **Vendor Assistance:** Support product description generation and business performance queries.
- **Persistent Conversations:** Retain chat history across sessions, with options to start a new conversation or clear existing history.

---

## AI Assistant — Vee

Vee is Vestra's AI assistant, built around a shared AI engine with role-specific behavior and access permissions.

### Customer Assistant — Vee the Stylist

- Personalized fashion and outfit recommendations.
- Product discovery based on customer preferences.
- Real-time product price and availability checks.
- Shopping assistance and authorized cart operations.
- Answers to shipping, returns, and platform policy questions.

### Vendor Assistant — Vee the Copilot

- Sales and product performance insights.
- AI-assisted product description generation.
- Vendor guidance and platform policy assistance.
- Vendor-specific business queries using authorized backend tools.

### AI Implementation

Vee combines two complementary techniques:

- **Retrieval-Augmented Generation (RAG):** Retrieves relevant information from a knowledge base to provide context-aware responses.
- **Function Calling:** Invokes defined backend tools to retrieve current application data and perform permitted operations.

Backend authorization and validation govern access to protected resources and actions.

---

## Technology Stack

| Component | Technology |
|---|---|
| Frontend | React, JavaScript |
| UI & Styling | Bootstrap |
| Build Tool | Vite |
| Backend | Python, FastAPI |
| Database | PostgreSQL |
| ORM | SQLAlchemy 2.0 |
| Database Migrations | Alembic |
| Vector Search | pgvector |
| Data Validation | Pydantic |
| Authentication | JWT, password hashing |
| AI Integration | LLM APIs, embeddings, RAG, function calling |
| Payments | Stripe Checkout (test mode) |
| Testing | Pytest, HTTPX |

---

## Project Structure

```text
vestra/
├── vestra-backend/
├── vestra-frontend/
├── files/
│   └── Architecture.png
├── .env.example
├── .gitignore
└── README.md
```

The repository contains separate application modules for the frontend and backend. Architecture diagrams and technical documentation are maintained in the `docs/` directory.

---

## Getting Started

### Prerequisites

- Python 3.11 or another compatible version.
- Node.js and npm.
- PostgreSQL with the pgvector extension.
- Git.
- API credentials for the selected AI provider.
- Stripe test-mode credentials when implementing the payment integration.

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/vestra.git
cd vestra
```

Replace `YOUR_USERNAME` with the repository owner's GitHub username.

### 2. Configure the Backend

Navigate to `vestra-backend/` and follow its setup instructions.

Create and activate a Python virtual environment, install the project dependencies, and configure the required environment variables.

### 3. Configure the Database

Create a PostgreSQL database, enable the pgvector extension, configure the database connection, and apply the available Alembic migrations.

### 4. Configure the Frontend

Navigate to `vestra-frontend/`, install the npm dependencies, and configure the frontend environment variables.

### 5. Start the Applications

Follow the backend and frontend startup instructions provided in their respective directories.

> Detailed installation and execution instructions will be documented as the application modules are implemented.

---

## Environment Configuration

Create a local environment configuration using `.env.example` as a reference.

Depending on the implemented features, the application may require configuration for:

- Database connectivity.
- Authentication and application secrets.
- AI provider and embedding model credentials.
- Frontend API base URL.
- Stripe test-mode credentials.

Keep actual credentials in local environment files and ensure they are excluded from version control.


---

**Vestra** — Discover your style. Empower your store. Shop smarter.