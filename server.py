from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.responses import FileResponse, Response
from fastapi.staticfiles import StaticFiles
import uvicorn
import database as db

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Handle startup and shutdown events cleanly"""
    await db.init_db()
    yield

app = FastAPI(title="Spdz Local POS", lifespan=lifespan)

# Mount static directory for CSS and JS files
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def render_panel():
    """Serve the main Mupra-style WebUI directly"""
    return FileResponse("templates/index.html")

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    """Prevent 404 Not Found log for browser favicon requests"""
    return Response(status_code=204)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
