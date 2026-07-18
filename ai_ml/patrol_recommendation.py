import numpy as np
from sklearn.cluster import DBSCAN

def generate_patrol_recommendations(incidents):
    """
    Takes a list of dictionaries (each representing an incident) 
    and returns a list of actionable patrol zone recommendations.
    
    Expected keys in incident dict:
    - latitude (float)
    - longitude (float)
    - severity (str)
    - district (str)
    """
    if not incidents or len(incidents) < 3:
        return []
    
    # Calculate weights based on severity
    severity_weights = {'Critical': 3.0, 'High': 3.0, 'Heinous': 3.0, 'Medium': 2.0, 'Low': 1.0}
    
    coords = []
    weights = []
    valid_incidents = []
    
    for inc in incidents:
        if inc.get('latitude') is not None and inc.get('longitude') is not None:
            coords.append([inc['latitude'], inc['longitude']])
            w = severity_weights.get(str(inc.get('severity')).capitalize(), 2.0)
            weights.append(w)
            valid_incidents.append(inc)
            
    if len(coords) < 3:
        return []
        
    coords = np.array(coords)
    coords_radians = np.radians(coords)
    
    # Haversine metric clustering for patrol zones (smaller radius: e.g. 0.4 km)
    # 0.4 km / Earth radius
    eps_radians = 0.4 / 6371.0088
    # min_samples 3 because we want localized patrols
    dbscan = DBSCAN(eps=eps_radians, min_samples=3, metric='haversine')
    labels = dbscan.fit_predict(coords_radians)
    
    clusters = {}
    for idx, label in enumerate(labels):
        if label == -1:
            continue
        if label not in clusters:
            clusters[label] = {
                "points": [],
                "weights": [],
                "district": valid_incidents[idx].get("district", "Unknown"),
                "crime_types": []
            }
        clusters[label]["points"].append(coords[idx])
        clusters[label]["weights"].append(weights[idx])
        ctype = valid_incidents[idx].get("crime_type")
        if ctype:
            clusters[label]["crime_types"].append(ctype)
        
    recommendations = []
    for cid, data in clusters.items():
        points = np.array(data["points"])
        center_lat = round(float(np.mean(points[:, 0])), 5)
        center_lon = round(float(np.mean(points[:, 1])), 5)
        incident_count = len(points)
        total_weight = sum(data["weights"])
        
        # Most common crime type
        crime_types = data["crime_types"]
        common_crime = max(set(crime_types), key=crime_types.count) if crime_types else "Various Crimes"
        
        # Determine priority based on weight density
        if total_weight >= 12:
            priority = "Critical"
        elif total_weight >= 7:
            priority = "High"
        else:
            priority = "Medium"
            
        recommendations.append({
            "zone_id": f"Z-{cid + 100}",
            "center_latitude": center_lat,
            "center_longitude": center_lon,
            "district": data["district"],
            "incident_count": incident_count,
            "priority_score": total_weight,
            "priority": priority,
            "rationale": f"Density cluster of {incident_count} incidents. Primary activity: {common_crime}. Suggest increased visibility."
        })
        
    # Sort by priority score
    recommendations.sort(key=lambda x: x["priority_score"], reverse=True)
    return recommendations
