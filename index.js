// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { type } = require('express/lib/response');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function(req,res) {
  let now = new Date(); res.json({"unix": now.valueOf(), utc: now.toUTCString()})
})

//////////////////////////////////////////////
app.get('/api/:dateParam', (req,res,next)=>{
  let par = req.params.dateParam;
  let date = new Date(par)

  if(isNaN(date.getTime())){
    date = new Date(Number(par));
    if(isNaN(date.getTime())){    res.json({"error": "invalid date"}); next(); return
    }
  }  
    res.json({"unix": date.valueOf(), utc: date.toUTCString()})
    next()

}
)



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
