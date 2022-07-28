const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
  res.sendFile(__dirname+ "/index.html");
})
app.post("/", function(req, res){
  const query = req.body.cityName
  const apiKey = "6b0a6c891966bf500403299ffa4b4140"
  const unit = "metric"
  const url1 = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
  https.get(url1, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const description = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<h1>The temperature in "+query+" is "+temp+" degree celcius</h1>")
      res.write("<p>The weather condition in "+query+" is "+description+" now</p>")
      res.write("<img src="+imageURL+">")
      res.send()
    })
  })
})
app.listen(3000, function(){
  console.log("Server is running on port 3000");
})
