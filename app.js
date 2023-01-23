const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const https = require('https')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

app.post('/', (req, res) => {
  const fName = req.body.firstName;
  const lName = req.body.lastName;
  const email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fName,
          LNAME: lName,
        }
      }
    ]
  }

  const jsonData = JSON.stringify(data);
  const url = "https://us9.api.mailchimp.com/3.0/lists/e3ad7d749e";

  const options = {
    method: "POST",
    auth: 'sumit:56b440574666aa74f5a9ac883bce05ef-us9',

  }
  const request = https.request(url, options, function (response) {

    if(response.statusCode===200){
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
      res.sendFile(__dirname + "/failure.html");
    }


    response.on("data", function (data) {
      console.log(JSON.parse(data));
    })
  })

  // request.write(jsonData);
  request.end();

});

// for failure page
app.post("/failure", (req,res) => {
  res.redirect('/');
})


app.listen(process.env.PORT||3000, () => {
  console.log(`Example app listening on port ${port}`)
});

//api key-- 56b440574666aa74f5a9ac883bce05ef-us9
// e3ad7d749e.