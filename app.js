const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const port = 3000;

const app = express();

app.use("/public", express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
  });

app.post("/", function(req,res){
    var email = req.body.email;
    var fName = req.body.FullName;

    var data = {
      members: [
        {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: fName
          }
        }
      ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us20.api.mailchimp.com/3.0/lists/f93767ebbd";

    const options = {
      method: "POST",
      auth: "shailevi:98c45805575af4f7d7bcd389c377746d-us20"
    }

    const request = https.request(url, options, function(response){
      response.on("data", function(data){
        console.log(JSON.parse(data));
      })
    })

    request.write(jsonData);
    request.end();
});

  app.listen(port, () => {
    console.log('Server is running on port 3000')
  });


  //MailChempAPI key
  //98c45805575af4f7d7bcd389c377746d-us20

  //mailChemp Audince ID
  //f93767ebbd