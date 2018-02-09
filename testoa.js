var express = require('express');
var https = require('https');

var cid='3MVG954MqIw6FnnOiROzzBgT6sk1ulhTajBvkl.K3rDmt.ritWl4ct_HaA4cYy2d6r55OFAdMO4z4RzD7c5cM';
var cs='3092217095089747695';
var cb='http://localhost:3000/auth';

var urlauth='https://login.salesforce.com/services/oauth2/authorize';
var urltoken='https://login.salesforce.com/services/oauth2/token';
var urlsauth='https://test.salesforce.com/services/oauth2/authorize';
var urlstoken='https://test.salesforce.com/services/oauth2/token';


var app = express();
app.listen(3000);

app.get('/auth', function(req,resp) {
  var refresh_token=req.query.refresh_token;
  var code=req.query.code;
  console.log(code);
  console.log(refresh_token);

  resp.send('callback...');

  if (code!=undefined)  {
    console.log('code received, get token');
    doToken(urlstoken, code);
  }

  if (refresh_token) {
    console.log('refresh_token received');
    console.log(refresh_token);
  }

});

var axios = require('axios');

function doLogin(baseurl)
{
  var url=baseurl;
  url+='?response_type=code';
  url+='&client_id='+cid;
  url+='&redirect_uri='+cb;

  axios.get(url)
    .then(response => {
      if (response.status==200) {
        console.log(response.request.res.responseUrl);
//              console.log(response.request);
      } else {
        console.log(response);
        console.log(response.data.url);
        console.log(response.data.explanation);
      }
    })
    .catch(error => {
      console.log(error);
    });

}

function doToken(baseurl, code)
{
  var url=baseurl;
  url+='?grant_type=authorization_code';
  url+='&client_id='+cid;
  url+='&client_secret='+cs;
  url+='&code='+code;
  url+='&redirect_uri='+cb;

  axios.get(url)
    .then(response => {
      // console.log(response);
      console.log('access_token'+response.data.access_token);
      console.log('refresh_token'+response.data.refresh_token);
      console.log('instance_url'+response.data.instance_url);
      console.log('issued_at'+response.data.issued_at);
    })
    .catch(error => {
      console.log(error);
    });

}

doLogin(urlsauth);
