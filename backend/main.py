
from pathlib import Path
import pandas as pd

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

BASE_DIR = Path(__file__).resolve().parent

app = FastAPI(title="Audi Price Prediction API")
import json
import xgboost as xgb

model = xgb.XGBRegressor()
model.load_model(BASE_DIR / "audi_model.json")

with open(BASE_DIR / "feature_columns.json", "r") as f:
    feature_columns = json.load(f)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CarDetails(BaseModel):
    model: str
    year: int = Field(ge=2015, le=2020)
    transmission: str
    mileage: float = Field(ge=0, lt=120000)
    fuelType: str
    engineSize: float = Field(gt=1.0, lt=2.5)


@app.get("/")
def home():
    return {"message": "Audi Price Prediction API is running"}


@app.post("/predict")
def predict(car: CarDetails):
    try:
        # Raw details from React
        raw_data = pd.DataFrame([{
            "model": car.model,
            "year": car.year,
            "transmission": car.transmission,
            "mileage": car.mileage,
            "fuelType": car.fuelType,
            "engineSize": car.engineSize,
        }])

        # Match the pandas one-hot encoding used during training
        input_encoded = pd.get_dummies(
            raw_data,
            columns=["model", "transmission", "fuelType"],
            dtype=int
        )

        # Restore the exact training feature columns and their order
        input_encoded = input_encoded.reindex(
            columns=feature_columns,
            fill_value=0
        )

        prediction = float(model.predict(input_encoded)[0])

        return {
            "predicted_price": round(prediction, 2),
            "currency": "GBP"
        }

    except Exception as exc:
        raise HTTPException(status_code=400, detail=str(exc))
