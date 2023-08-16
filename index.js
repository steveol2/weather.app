import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {


    
    res.render("index.ejs");
  });
  


app.post('/weather', async (req, res) => {
  try {
    const apiKey = '7e30987153a4bc1f82a6aca544d0471b';
    const city = req.body.city; // Get the city name from the query parameters

    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);

    const result = response.data;
    console.log(result);

    const today = new Date();
    const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    };
    const kindofDay = today.toLocaleDateString('en-ng', options);
    
    res.render("index.ejs", { result, kindofDay});
  } catch (error) {
          console.error("Failed to make request:", error.message);
          res.render("index.ejs", {
            error: error.message,
          });
        }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


//   7e30987153a4bc1f82a6aca544d0471b

