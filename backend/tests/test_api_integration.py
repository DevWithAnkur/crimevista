import os
import unittest
import datetime

# Set DATABASE_URL to in-memory SQLite before importing app
os.environ["DATABASE_URL"] = "sqlite:///:memory:"

from fastapi.testclient import TestClient
import sys
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BACKEND_DIR))

from app.main import app
from app.db.session import Base, engine, SessionLocal
from app.models.incident import Incident

class TestApiIntegration(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Create all tables in the in-memory SQLite DB
        Base.metadata.create_all(bind=engine)
        
        # Populate initial test incident
        db = SessionLocal()
        try:
            if db.query(Incident).count() == 0:
                inc = Incident(
                    case_number="FIR-2026-TEST01",
                    crime_type="Vehicle Theft",
                    date_time=datetime.datetime.now(),
                    district="Bengaluru Urban",
                    police_station="Koramangala PS",
                    location_name="100ft Road",
                    severity="High",
                    status="Under Investigation"
                )
                db.add(inc)
                db.commit()
        finally:
            db.close()

        cls.client = TestClient(app)

    def test_root_endpoint(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("message", data)
        self.assertIn("CrimeVista", data["message"])

    def test_health_check(self):
        response = self.client.get("/api/v1/health")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("status", data)
        self.assertEqual(data["status"], "ok")

    def test_dashboard_summary(self):
        response = self.client.get("/api/v1/dashboard/summary")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("total_incidents", data)
        self.assertIn("recent_trends", data)

    def test_incidents_list(self):
        response = self.client.get("/api/v1/incidents?limit=5")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("items", data)
        self.assertIn("count", data)
        self.assertGreaterEqual(data["count"], 1)

    def test_analytics_hotspots(self):
        response = self.client.get("/api/v1/analytics/hotspots")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("hotspots", data)

    def test_analytics_risk(self):
        response = self.client.get("/api/v1/analytics/risk")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("items", data)
        self.assertGreaterEqual(len(data["items"]), 1)

    def test_analytics_anomalies(self):
        response = self.client.get("/api/v1/analytics/anomalies")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("anomalies", data)
        self.assertIn("count", data)

    def test_analytics_network(self):
        response = self.client.get("/api/v1/analytics/network/CASE-2026-BLR-101")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("nodes", data)
        self.assertIn("edges", data)

    def test_analytics_analyze_incident(self):
        payload = {
            "District_Name": "Bengaluru Urban",
            "crime_type": "Vehicle Theft",
            "VICTIM COUNT": 3,
            "Accused Count": 2
        }
        response = self.client.post("/api/v1/analytics/analyze", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("risk_category", data)
        self.assertIn("hotspot_score", data)
        self.assertIn("explanation_text", data)

    def test_geo_districts(self):
        response = self.client.get("/api/v1/geo/districts")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("items", data)

    def test_geo_police_stations(self):
        response = self.client.get("/api/v1/geo/police-stations")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("items", data)

if __name__ == "__main__":
    unittest.main()
