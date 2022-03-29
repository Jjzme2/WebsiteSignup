const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
const PORT = 3000;
const mailchimp = require("@mailchimp/mailchimp_marketing");




// get
app.get("/", function(req, res){
res.sendFile(__dirname + "/");
});

app.get("/signup", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.get("/index", function(req, res){
  res.sendFile(__dirname + "/");
});

// Post
app.post("/index", function(req, res){
  res.redirect(__dirname + "/");
})

app.post("/signup", function(req, res){
res.redirect(__dirname + "/signup.html");
});

app.post("/failure", function(req, res){
  res.redirect(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  const firstName = req.body.userFirst;
  const lastName = req.body.userLast;
  const bday = req.body.userBday.userBday;
  const address = req.body.userAddress;
  const phone = req.body.userPhone;
  const email = req.body.userEmail;
  const userName = req.body.userName;
  const data = {
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  }

  const jsonData = JSON.stringify(data);

const url = "https://us14.api.mailchimp.com/3.0/lists/ab163affe3";

const options = {
  method: "POST",
  auth: "Jjzme2:66f4ddbebe840cf67da700ca14f14d74-us14"
}

// "curl --request GET \
// --url 'https://us14.api.mailchimp.com/3.0/' \
// --user 'anystring:TOKEN"
  const request = https.request(url, options, function(response){
    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));

    })
  })
  request.write(jsonData);
  request.end();
});


app.listen(process.env.PORT || 3000, function(req, res){
  console.log("Server is running on port " + PORT)
});


mailchimp.setConfig({
  apiKey: "66f4ddbebe840cf67da700ca14f14d74",
  server: "us14",
});

async function run() {
  const response = await mailchimp.ping.get();
  console.log(response);
}

run();

// API: 66f4ddbebe840cf67da700ca14f14d74-us14
// Audience ID: ab163affe3
