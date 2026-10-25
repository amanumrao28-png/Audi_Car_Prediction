from pathlib import Path
import json
import xgboost as xgb

BASE_DIR = Path(__file__).resolve().parent

model = xgb.XGBRegressor()
model.load_model(BASE_DIR / "audi_model.json")

with open(BASE_DIR / "feature_columns.json", "r") as f:
    feature_columns = json.load(f)

print("Model loaded successfully!")
print("Model type:", type(model))
print("Feature count:", len(feature_columns))
print("Features:", feature_columns)