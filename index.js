import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", { weather: null, error: null });
});

app.get("/weather", async (req, res) => {
    const city = req.query.city;
    const apiKey ="fe8e56588aeecd9a44b86c5dcc9aa2c0";

    const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    let weather = null;
    let error = null;

    try {
        const response = await axios.get(APIUrl);
        if (response.status === 200) {
            weather = response.data;
            console.log("Weather data:", weather);
        } else {
            error = "Couldn't fetch weather data.";
            console.log("API response status:", response.status);
        }
    } catch (err) {
        error = "Couldn't Find This City";
        console.error("Error fetching weather data:", err);
    }

    res.render("index.ejs", { weather, error });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
