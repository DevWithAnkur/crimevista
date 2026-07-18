# CrimeVista Implementation Plan & Engineering Roadmap

This document reflects the current status of CrimeVista as of 2026-07-19 and sets the next practical milestones for stabilization, feature expansion, and product hardening.

---

## 1. Current status

CrimeVista is now in a working local-demo state with the core stack connected end to end:

- Backend: FastAPI services are running and serving analytics endpoints.
- Database: the app can use a local SQLite fallback or the intended PostgreSQL/PostGIS-backed setup.
- Frontend: the React/Vite dashboard is built successfully and can be served locally.
- AI/ML: the analytics layer is producing explainable outputs for risk, anomalies, and incident analysis.

### Verified evidence

- Backend integration tests: 11/11 passing through Python’s unittest runner.
- Frontend build: Vite production build completed successfully.
- Live backend analytics endpoints: risk and incident analysis responses were returned successfully during verification.

---

## 2. What is already implemented

### Backend

- FastAPI app entrypoint and router registration.
- Endpoints for health, dashboard summary, incidents, analytics, geo lookups, and relationship/network analysis.
- Database models for incidents, persons, and relationships.
- AI/ML-driven analysis hooks for risk scoring, anomaly detection, and explainable incident insights.

### Frontend

- Main dashboard layout and route-based UI shell.
- Dashboard cards, filters, AI intelligence panel, heatmap panel, and case/incident views.
- Frontend API client that calls the backend analytics endpoints.

### Data layer

- Seeded incident and relationship data for local demo use.
- Support for PostgreSQL/PostGIS and a local SQLite fallback during development.

---

## 3. Immediate priorities

### Priority 1 — Stabilize the experience

These are the most important improvements before adding larger features.

1. Improve loading and empty states
   - Show skeletons and graceful fallbacks while data is loading.
   - Avoid blank UI sections when the API is slow or unavailable.

2. Harden backend error handling
   - Return consistent error responses for invalid requests.
   - Add better logging and request validation.

3. Improve environment consistency
   - Keep the repo-level .env flow reliable for local development and future deployment.
   - Standardize the frontend/backend URL configuration.

4. Add better API documentation and sample payloads
   - Keep the API easier to explore and demo.

---

## 4. Next implementation roadmap

### Phase A — Data quality and analytics depth

Goal: make the outputs more realistic and useful.

1. Expand seeded demo data
   - Add more districts, police stations, incident types, and network relationships.
   - Create a richer dataset so analytics results look less synthetic.

2. Improve analytics logic
   - Make hotspot scoring more nuanced.
   - Improve risk classification using richer historical context.
   - Add severity trend and district trend summaries.

3. Add richer API responses
   - Incident detail endpoint.
   - District trend endpoint.
   - Repeat offender summary endpoint.
   - Alert or priority recommendation endpoint.

### Phase B — Frontend enhancement

Goal: turn the dashboard into a more operational experience.

1. Add deeper drill-down views
   - Open a case from the incident table.
   - Show district-level trend details.
   - Show hotspot details and supporting incidents.

2. Improve filtering and search
   - Date range filter.
   - District + crime-type + severity filters.
   - Police station and case number search.

3. Improve map and graph experiences
   - Click a hotspot to reveal related incidents.
   - Expand network graphs into a full investigation UI.

4. Add better visual storytelling
   - Trend charts.
   - Risk score timeline.
   - “Why this alert was flagged” explanations.

### Phase C — Product features

Goal: add a stronger real-world utility layer.

1. Predictive patrol recommendation
   - Recommend where officers should be deployed based on hotspot severity and recent incidents.

2. Alerting and recommendation engine
   - Surface new anomalies and suggest actions.
   - Provide a short recommendation panel for investigators.

3. Case workflow support
   - Link an analytic insight to one or more active cases.
   - Track case status, assigned officer, and follow-up notes.

4. Role-based views
   - Analyst view.
   - Officer view.
   - Admin/command-center view.

### Phase D — Production hardening

Goal: make the app demo-ready and deployment-ready.

1. Container and deployment setup
   - Ensure frontend, backend, and DB can be launched consistently via Docker.

2. CI/CD basics
   - Add automated build and test checks for every change.

3. Security and governance basics
   - Add authentication and role checks.
   - Harden environment variables and secrets handling.

4. Documentation and demo preparation
   - Prepare a clean walkthrough for hackathon or stakeholder demos.

---

## 5. Recommended sprint order

### Sprint 1 — Stabilization

- Improve loading states and empty states.
- Improve API error handling.
- Fix any remaining UI inconsistencies.

### Sprint 2 — Analytics quality

- Expand seeded data.
- Improve risk and anomaly output quality.
- Add richer analytics API responses.

### Sprint 3 — Investigation experience

- Add drill-down views.
- Improve filters/search.
- Enhance hotspot and network interactions.

### Sprint 4 — Operational features

- Add patrol recommendation and alerting.
- Add case workflow support.

---

## 6. Suggested demo narrative

The project story should stay simple and compelling:

1. Problem
   - Crime data is fragmented and reactive.

2. Solution
   - CrimeVista brings FIR data, hotspots, relationships, and AI insights into one workspace.

3. Evidence
   - The dashboard shows hotspots, anomalies, and explainable risk signals.

4. Value
   - Investigators can act faster on hotspots and repeat patterns instead of relying on disconnected reporting.

---

## 7. Run and verify locally

### Start backend

```bash
cd /Users/md.kamranalam/Programming/hackathon/crimevista
source .venv/bin/activate
uvicorn backend.app.main:app --host 127.0.0.1 --port 8000
```

### Start frontend

```bash
cd /Users/md.kamranalam/Programming/hackathon/crimevista/frontend
npm run dev -- --host 127.0.0.1 --port 8080
```

### Run backend tests

```bash
cd /Users/md.kamranalam/Programming/hackathon/crimevista
source .venv/bin/activate
python -m unittest discover -s backend/tests -v
```

### Build frontend

```bash
cd /Users/md.kamranalam/Programming/hackathon/crimevista/frontend
npm run build
```

---

## 8. Best next feature to build

The highest-impact next feature is a predictive patrol recommendation module.

Why this one first:

- It has clear value for real operations.
- It is easy to explain in a demo.
- It connects analytics directly to action.
