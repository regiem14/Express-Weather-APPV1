const express = require('express');
const https = require('https');

const app = express();
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/",function(req,res){
    // console.log(req.body.cityName);
    // console.log("Post request received");

        const query = req.body.cityName;
        const api = "d4eb94c06d62aae20fac757d3f9e1814"
        const units = "metric";
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + api;
        
        https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const icon = weatherData.weather[0].icon;
        console.log(icon);
        const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;

        res.write("<header><div><h1 class='header'>WEATHER APP VERSION</h1></div></header>")
        res.setHeader("Content-type", "text/html")
        res.write("<img src=" + imageURL + ">");
        res.write("<h1>The temperature in " + query + " is " + temp + " degree Celsius</h1>");
        res.write("<p>The weather is currently " + weatherDescription + " </p>")
        res.send();
        });
    });
});

// app.use(express.static('public'));


app.listen(3000, function(){
    console.log('Server is running on port 3000');
});

    
// const query = "Bulacan";
// //    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=d4eb94c06d62aae20fac757d3f9e1814";
   
//    const api = "d4eb94c06d62aae20fac757d3f9e1814"
//       const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric" + "&appid=" + api;
// //    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + api;
   
//    const units = "metric";

//     // const url = 'https://api.openweathermap.org/data/2.5/weather?q=Manila&units=metric&appid=d4eb94c06d62aae20fac757d3f9e1814'
//     https.get(url,function(response){
//     // https.get('https://api.openweathermap.org/data/2.5/weather?q=Manila&units&-0b6e46111ffdc3897973553330aae1d')
//     console.log(response.statusCode);
//     response.on("data", function(data){
//         // console.log(data);
//         const weatherData = JSON.parse(data);
//         const icon = weatherData.weather[0].icon;
//         console.log(icon);
//         const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
//         // const imageURL = `https://openweathermap.org/img/wn/${icon}@2X.png;` 
//         // console.log(weatherData);

// /*        const object = {
//             name: 'Regie',
//             favoriteGame: 'League of Legends',
//             habit: 'Drawing'
//         }

//         console.log(JSON.stringify(object));
//         console.log(typeof JSON);*/
        
//         const temp = weatherData.main.temp;
//         const weatherDescription = weatherData.weather[0].description;
//         // console.log(weatherDescription);
//         // console.log(temp);
//         res.write("<img src=" + imageURL + ">");
//         res.write("<h1>The temperature in " + query + " is " + temp + " degree Celsius</h1>");
//         res.write("<p>The weather is currently " + weatherDescription + " </p>")
//         res.send();

//     })
//     });

//     // res.send('Server is up and running')