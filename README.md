To have Nodemon start our server listening on port 3000, issue:

```
$ npm start
```

To make requests to the server, open another terminal window and issue in that window:

```
$ curl localhost:3000/movies/17
{"message":"get the movie with an ID of 17"}

$ curl localhost:3000/movies
{"message":"get all movies"}

$ curl -X POST localhost:3000/movies
{"message":"create a new movie"}

$ curl -X DELETE localhost:3000/movies/17
{"message":"delete the movie with an ID of 17"}

$ curl -X PATCH localhost:3000/movies/17
{"message":"update the movie with an ID of 17"}
```
