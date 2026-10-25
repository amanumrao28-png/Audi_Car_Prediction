
import { useState } from "react";
import "./App.css";

const initialForm = {
  model: "A3",
  year: "2019",
  transmission: "Automatic",
  mileage: "20000",
  fuelType: "Petrol",
  engineSize: "2.0",
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [price, setPrice] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setPrice(null);
    setError("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            year: Number(form.year),
            mileage: Number(form.mileage),
            engineSize: Number(form.engineSize),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data.detail === "string"
            ? data.detail
            : "Invalid car details"
        );
      }

      setPrice(data.predicted_price);
    } catch (err) {
      setError(
        err.message || "Backend se connect nahi ho paya."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="card">
        <h1>Audi Price Predictor</h1>
        <p className="subtitle">
          Enter your car details to estimate its price.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="model">Audi Model</label>
          <select
            id="model"
            name="model"
            value={form.model}
            onChange={handleChange}
          >
            {[
              "A1", "A3", "A4", "A5", "A6", "A7",
              "Q2", "Q3", "Q5", "Q7", "TT", "S4", "SQ5"
            ].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <label htmlFor="year">Manufacturing Year</label>
          <input
            id="year"
            name="year"
            type="number"
            min="2015"
            max="2020"
            value={form.year}
            onChange={handleChange}
            required
          />

          <label htmlFor="transmission">Transmission</label>
          <select
            id="transmission"
            name="transmission"
            value={form.transmission}
            onChange={handleChange}
          >
            {["Manual", "Automatic", "Semi-Auto"].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <label htmlFor="mileage">Mileage</label>
          <input
            id="mileage"
            name="mileage"
            type="number"
            min="0"
            max="119999"
            value={form.mileage}
            onChange={handleChange}
            required
          />

          <label htmlFor="fuelType">Fuel Type</label>
          <select
            id="fuelType"
            name="fuelType"
            value={form.fuelType}
            onChange={handleChange}
          >
            {["Petrol", "Diesel", "Hybrid"].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <label htmlFor="engineSize">Engine Size (litres)</label>
          <input
            id="engineSize"
            name="engineSize"
            type="number"
            min="1.1"
            max="2.4"
            step="0.1"
            value={form.engineSize}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Predicting..." : "Predict Price"}
          </button>
        </form>

        {price !== null && (
          <div className="result">
            <p>Estimated Audi Price</p>
            <h2>£{price.toLocaleString("en-GB")}</h2>
          </div>
        )}

        {error && <p className="error">{error}</p>}
      </section>
    </main>
  );
}

export default App;
