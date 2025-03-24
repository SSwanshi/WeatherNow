import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", { weather: null, error: null });
});

app.get("/weather", async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
        return res.render("index.ejs", { weather: null, error: "API key not found. Please configure the .env file." });
    }

    const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    let weather = null;
    let error = null;

    try {
        const response = await axios.get(APIUrl);
        if (response.status === 200) {
            weather = response.data;
        } else {
            error = "Couldn't fetch weather data.";
        }
    } catch (err) {
        error = "Couldn't Find This City";
        console.error("Error fetching weather data:", err);
    }

    res.render("index.ejs", { weather, error });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
