from fastapi import FastAPI
import duckdb
import asyncio
from simulator import init_db, simulate_step
from fastapi.middleware.cors import CORSMiddleware
import time

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect to DuckDB instance
con = duckdb.connect(database='greenroute.duckdb', read_only=False)
init_db(con)

async def simulation_loop():
    while True:
        simulate_step(con)
        await asyncio.sleep(1)

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(simulation_loop())

@app.get("/api/vehicles")
def get_vehicles():
    df = con.execute("SELECT id, name, lat, lng, speed, total_co2, status FROM vehicles").fetchdf()
    return df.to_dict(orient="records")

@app.get("/api/stats")
def get_stats():
    res = con.execute("SELECT sum(total_co2) as total_emissions, avg(speed) as avg_speed, count(*) as active_vehicles FROM vehicles").fetchone()
    return {
        "total_emissions": res[0] or 0.0,
        "avg_speed": res[1] or 0.0,
        "active_vehicles": res[2] or 0
    }
