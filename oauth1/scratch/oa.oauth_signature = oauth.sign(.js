oa.oauth_signature = oauth.sign(
	oa.oauth_signature_method,
	method,
	baseurl,
	params,
	consumer_secret_or_private_key, // eslint-disable-line camelcase
	token_secret // eslint-disable-line camelcase
 )

 "HMAC-SHA1"
 "POST"
 "https://api.twitter.com/oauth/request_token"
 {
	oauth_callback:"http://localhost:3001/callback"
	oauth_consumer_key:"8ZWnKZhuS6PGbGhizrGFVOy54"
	oauth_nonce:"e69af874800a4cc4b265289bb2638a79"
	oauth_signature_method:"HMAC-SHA1"
	oauth_timestamp:"1589683527"
	oauth_version:"1.0"
 }
 "WhDUjBtypCVfhEUt5T5Wp9T875JfEqjcFfGKKKc5S05MJScg0v"
 <NULL on step 1>


 oa

 {
	oauth_callback:"http://localhost:3001/callback"
	oauth_consumer_key:"8ZWnKZhuS6PGbGhizrGFVOy54"
	oauth_nonce:"e69af874800a4cc4b265289bb2638a79"
	oauth_signature:"7vo63ait8verQOLMEwwei+ZqMYo="
	oauth_signature_method:"HMAC-SHA1"
	oauth_timestamp:"1589683527"
	oauth_version:"1.0"
 }


 self.request.setHeader('Authorization', 'OAuth ' + self.concatParams(oa, ',', '"'))

 Authorization: "OAuth oauth_callback="http%3A%2F%2Flocalhost%3A3001%2Fcallback",oauth_consumer_key="8ZWnKZhuS6PGbGhizrGFVOy54",oauth_nonce="e69af874800a4cc4b265289bb2638a79",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1589683527",oauth_version="1.0",oauth_signature="7vo63ait8verQOLMEwwei%2BZqMYo%3D""

 params

 0:"oauth_callback"
1:"oauth_consumer_key"
2:"oauth_nonce"
3:"oauth_signature_method"
4:"oauth_timestamp"
5:"oauth_version"
6:"oauth_signature"

params.map(function (i) {
	return i + '=' + wrap + oauth.rfc3986(oa[i]) + wrap
 }).join(sep)

 wrap = `"`
 sep = `,`

"oauth_callback="http%3A%2F%2Flocalhost%3A3001%2Fcallback",oauth_consumer_key="8ZWnKZhuS6PGbGhizrGFVOy54",oauth_nonce="e69af874800a4cc4b265289bb2638a79",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1589683527",oauth_version="1.0",oauth_signature="7vo63ait8verQOLMEwwei%2BZqMYo%3D""


new request.Request(params)

callback:function (e, r, body) { … }
method:"POST"
oauth: {
	callback:"http://localhost:3001/callback"
consumer_key:"8ZWnKZhuS6PGbGhizrGFVOy54"
consumer_secret:"WhDUjBtypCVfhEUt5T5Wp9T875JfEqjcFfGKKKc5S05MJScg0v"
}
callback:"http://localhost:3001/callback"
consumer_key:"8ZWnKZhuS6PGbGhizrGFVOy54"
consumer_secret:"WhDUjBtypCVfhEUt5T5Wp9T875JfEqjcFfGKKKc5S05MJScg0v"
url:"https://api.twitter.com/oauth/request_token"