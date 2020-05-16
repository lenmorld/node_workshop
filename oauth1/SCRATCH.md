curl -X POST --header 'Authorization: OAuth oauth_nonce="EClwHajN0pX1XQIBPjiisw==", oauth_callback="http%3A%2F%2Flocalhost%3A3001%2Fcallback",
oauth_signature_method="HMAC-SHA1",
oauth_timestamp="1589627790217",
oauth_consumer_key="8ZWnKZhuS6PGbGhizrGFVOy54",
oauth_signature="S8MGqVJpdArKGAvh3+OEukPLJjA=",
oauth_version="1.0"' -v https://api.twitter.com/oauth/request_token

get nonce:
const crypto = require('crypto');
let nonce = crypto.randomBytes(16).toString('base64');

oauth_sign.hmacsign('POST', 'https://api.twitter.com/oauth/request_token',
{ oauth_callback: 'http://localhost:3001/callback',
oauth_consumer_key: '8ZWnKZhuS6PGbGhizrGFVOy54',
oauth_nonce: 'EClwHajN0pX1XQIBPjiisw==',
oauth_signature: 'HMAC-SHA1',
oauth_timestamp: '1589627790217',
oauth_version: '1.0' },
"WhDUjBtypCVfhEUt5T5Wp9T875JfEqjcFfGKKKc5S05MJScg0v" )

======
API key:
8ZWnKZhuS6PGbGhizrGFVOy54

API secret key:
WhDUjBtypCVfhEUt5T5Wp9T875JfEqjcFfGKKKc5S05MJScg0v

curl --request POST \

--url 'https://api.twitter.com/1.1/statuses/update.json?status=Hello%20world' \

--header 'authorization: OAuth oauth_consumer_key="CONSUMER_API_KEY", oauth_nonce="OAUTH_NONCE", oauth_signature="OAUTH_SIGNATURE", oauth_signature_method="HMAC-SHA1", oauth_timestamp="OAUTH_TIMESTAMP", oauth_token="ACCESS_TOKEN", oauth_version="1.0"' \

Authorization Header: OAuth oauth_nonce="K7ny27JTpKVsTgdyLdDfmQQWVLERj2zAK5BslRsqyw", oauth_callback="http%3A%2F%2Fmyapp.com%3A3005%2Ftwitter%2Fprocess_callback", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1300228849", oauth_consumer_key="OqEqJeafRSF11jBMStrZz", oauth_signature="Pc%2BMLdv028fxCErFyi8KXFM%2BddU%3D", oauth_version="1.0"

===

OAuth oauth_nonce="K7ny27JTpKVsTgdyLdDfmQQWVLERj2zAK5BslRsqyw", oauth_callback="http%3A%2F%2Flocalhost%3A3001%2Fcallback", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1300228849", oauth_consumer_key="OqEqJeafRSF11jBMStrZz", oauth_signature="Pc%2BMLdv028fxCErFyi8KXFM%2BddU%3D", oauth_version="1.0"
