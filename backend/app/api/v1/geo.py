from typing import Optional, List
from fastapi import APIRouter, Depends, Query
from sqlalchemy import func
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.incident import Incident

router = APIRouter()

@router.get("/geo/districts")
def get_districts(db: Session = Depends(get_db)):
    """
    Returns a list of all distinct districts and their incident counts.
    """
    results = db.query(Incident.district, func.count(Incident.id)).filter(
        Incident.district.isnot(None),
        Incident.district != ""
    ).group_by(Incident.district).order_by(func.count(Incident.id).desc()).all()
    
    if not results:
        # Fallback districts if DB is empty
        default_districts = [
            "Bengaluru Urban", "Mysuru", "Belagavi", "Ballari", "Dharwad",
            "Dakshina Kannada", "Shivamogga", "Tumakuru", "Udupi", "Kalaburagi"
        ]
        return {"items": [{"name": d, "incident_count": 0} for d in default_districts]}
        
    return {"items": [{"name": d, "incident_count": c} for d, c in results]}

@router.get("/geo/police-stations")
def get_police_stations(
    district: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """
    Returns a list of all distinct police stations, optionally filtered by district.
    """
    query = db.query(Incident.police_station, Incident.district, func.count(Incident.id)).filter(
        Incident.police_station.isnot(None),
        Incident.police_station != ""
    )
    if district:
        query = query.filter(Incident.district.ilike(f"%{district}%"))
        
    results = query.group_by(Incident.police_station, Incident.district).order_by(func.count(Incident.id).desc()).all()
    
    if not results:
        default_stations = [
            {"name": "Koramangala PS", "district": "Bengaluru Urban", "incident_count": 0},
            {"name": "Mysuru City PS", "district": "Mysuru", "incident_count": 0},
            {"name": "Hubli East PS", "district": "Dharwad", "incident_count": 0},
            {"name": "Ballari PS", "district": "Ballari", "incident_count": 0},
            {"name": "Yeshwanthpur PS", "district": "Bengaluru Urban", "incident_count": 0}
        ]
        return {"items": default_stations}
        
    return {"items": [{"name": ps, "district": dist, "incident_count": c} for ps, dist, c in results]}
