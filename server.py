from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import uvicorn
import database as db

app = FastAPI(title="Spdz Local POS")

# Mount static directory and templates
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.on_event("startup")
async def startup_event():
    """Run startup tasks"""
    await db.init_db()

@app.get("/", response_class=HTMLResponse)
async def render_panel(request: Request):
    """Serve the main Mupra-style WebUI"""
    return templates.TemplateResponse("index.html", {"request": request})

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
