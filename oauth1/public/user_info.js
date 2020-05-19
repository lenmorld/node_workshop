
console.log(user_creds)

const show_user_timeline_url = 'https://api.twitter.com/1.1/statuses/user_timeline.json'

const placeholder = 'https://jsonplaceholder.typicode.com/todos/1'

fetch(show_user_timeline_url)
  .then(response => response.json())
  .then(json => console.log(json))