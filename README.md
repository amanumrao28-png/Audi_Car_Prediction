
# 🚗 Audi Price Predictor

An ML-powered web application that predicts the estimated price of a used Audi car based on its specifications using a trained XGBoost Regression model.

## ✨ Features

- 🚘 Predict used Audi car prices.
- 🤖 XGBoost Regression model for price prediction.
- ⚛️ React frontend with Vite.
- ⚡ FastAPI backend for model inference.
- 📊 Pandas-based data processing and feature encoding.
- 🔗 REST API integration between frontend and backend.
- 💷 Displays estimated prices in GBP (£).

## 🛠️ Tech Stack

**Frontend**
- React
- Vite
- JavaScript
- CSS

**Backend**
- Python
- FastAPI
- Uvicorn
- Pandas
- Pydantic

**Machine Learning**
- XGBoost
- Scikit-learn
- One-Hot Encoding

## 📁 Project Structure

```text
Audi_Price_Predictor/
├── backend/
│   ├── audi_model.json
│   ├── feature_columns.json
│   ├── main.py
│   ├── requirements.txt
│   └── test_model.py
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd Audi_Price_Predictor
```

Replace the placeholder with your actual GitHub repository URL.

### 2. Set Up the Backend

```bash
cd backend
python -m venv venv
```

Activate the virtual environment on Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
python -m pip install -r requirements.txt
```

### 3. Run the Backend

Make sure `audi_model.json` and `feature_columns.json` are present inside the backend folder.

```bash
uvicorn main:app --reload
```

Backend URL:

http://127.0.0.1:8000

Interactive API documentation:

http://127.0.0.1:8000/docs

### 4. Set Up the Frontend

Open another terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

Open the URL shown in the terminal, usually:

http://localhost:5173

## 🔮 How It Works

1. The user enters Audi car specifications in the React application.
2. React sends the details to the FastAPI `/predict` endpoint.
3. FastAPI validates the input using Pydantic.
4. Pandas converts the input into a DataFrame and applies one-hot encoding.
5. The encoded input is aligned with the saved training feature columns.
6. The trained XGBoost model predicts the estimated car price.
7. The result is returned to React and displayed in GBP (£).

## 🔌 API Reference

### Health Check

**Endpoint:** `GET /`

Example response:

```json
{
  "message": "Audi Price Prediction API is running"
}
```

### Predict Car Price

**Endpoint:** `POST /predict`

Example request:

```json
{
  "model": "A3",
  "year": 2019,
  "transmission": "Automatic",
  "mileage": 20000,
  "fuelType": "Petrol",
  "engineSize": 2.0
}
```

Example response structure:

```json
{
  "predicted_price": 15000.0,
  "currency": "GBP"
}
```

*The price shown is illustrative, not an actual model prediction.*

## 🧠 Model Information

- `audi_model.json`: Stores the trained XGBoost model in its native JSON format.
- `feature_columns.json`: Stores the ordered feature names required by the model.

The application loads the existing trained model for predictions without retraining it when the backend starts.

## 🚀 Future Improvements

- Improve feature preprocessing and validation.
- Handle all required model features, including tax and MPG.
- Add model evaluation metrics.
- Improve responsive UI and user experience.
- Deploy the application to the cloud.

## 👨‍💻 Author

**Aman Umrao**

Full-Stack Developer | AI/ML Enthusiast

---

⭐ If you find this project useful, consider giving it a star!
