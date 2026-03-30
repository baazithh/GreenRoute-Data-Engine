import duckdb
import random
from faker import Faker

fake = Faker()

def init_db(con):
    con.execute('''
        CREATE TABLE IF NOT EXISTS vehicles (
            id VARCHAR PRIMARY KEY,
            name VARCHAR,
            lat DOUBLE,
            lng DOUBLE,
            speed DOUBLE,
            fuel_efficiency DOUBLE,
            total_co2 DOUBLE,
            status VARCHAR
        )
    ''')
    
    # Check if empty
    res = con.execute("SELECT count(*) FROM vehicles").fetchone()[0]
    if res == 0:
        print("Initializing 500 vehicles...")
        # center around Seattle roughly: 47.6062, -122.3321
        center_lat = 47.6062
        center_lng = -122.3321
        vehicles_data = []
        for _ in range(500):
            vid = fake.uuid4()
            vname = f"Truck-{fake.bothify(text='??-###').upper()}"
            lat = center_lat + random.uniform(-0.15, 0.15)
            lng = center_lng + random.uniform(-0.15, 0.15)
            # speed in mph
            speed = random.uniform(30.0, 75.0)
            # Emission factor (EF) - e.g., kg CO2 per mile
            ef = random.uniform(0.5, 1.5) 
            vehicles_data.append((vid, vname, lat, lng, speed, ef, 0.0, 'ACTIVE'))
            
        con.executemany('''
            INSERT INTO vehicles 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', vehicles_data)

def simulate_step(con):
    # E = D * EF. 
    # Distance D over 1 second = speed (mph) / 3600 (miles per second)
    # We add a bit of random walk to lat/lng based on speed
    con.execute('''
        UPDATE vehicles
        SET 
            lat = lat + (random() - 0.5) * 0.0002 * (speed / 30.0),
            lng = lng + (random() - 0.5) * 0.0002 * (speed / 30.0),
            total_co2 = total_co2 + ((speed / 3600.0) * fuel_efficiency),
            speed = CASE WHEN random() > 0.9 THEN random() * 45 + 30 ELSE speed END
    ''')
