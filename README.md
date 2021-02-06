To have Nodemon start our server listening on port 3000, issue:

```
$ npm start
```

To make requests to the server, open another terminal window and issue in that window:

```
$ curl localhost:3000/movies/d087533d-0ec5-4099-a735-ca7c243bad43
{
    "data":
        {"movie":
            {
                "name": "Home Alone",
                "releaseYear": 1990,
                "rating": 8,
                "id": "d087533d-0ec5-4099-a735-ca7c243bad43"
            }
        }
}

$ curl -v \
    localhost:3000/movies
{
    "data":
        {"movie":
            [
                {
                    "id": "d087533d-0ec5-4099-a735-ca7c243bad43",
                    "name": "Home Alone",
                    "releaseYear": 1990,
                    "rating": 8,
                    "id": "d087533d-0ec5-4099-a735-ca7c243bad43"
                }
            ]
        }
}

$ curl -v \
    -H "Content-Type: application/json" \
    -X POST \
    -d '{"name": "Home Alone", "releaseYear": 1990, "rating": 8}' \
    localhost:3000/movies
{
    "data":
        {"movie":
            {
                "name": "Home Alone",
                "releaseYear": 1990,
                "rating": 8,
                "id": "d087533d-0ec5-4099-a735-ca7c243bad43"
            }
        }
}

$ curl -X DELETE localhost:3000/movies/17
{"message":"delete the movie with an ID of 17"}

$ curl -v -X PATCH -H 'Content-Type: application/json' -d '{"name": "1test"}' localhost:3000/movies/d087533d-0ec5-4099-a735-ca7c243bad43
{
    "data":
        {
            "movie":
                {
                    "id": "d087533d-0ec5-4099-a735-ca7c243bad43",
                    "name": "1test",
                    "releaseYear": 1990,
                    "rating": 8
                }
        }
}
```

The tutorial instructions had to be augmented by the suggestion made in https://andrew.hawker.io/dailies/2020/02/25/postgres-uninitialized-error/

```
$ curl -v \
    -H "Content-Type: application/json" \
    -X POST \
    -d '{"name": "Home Alone", "releaseYear": 1990, "rating": 8}' \
    localhost:3000/movies

{
    "data":
        {"movie":
            {
                "name": "Home Alone",
                "releaseYear": 1990,
                "rating": 8,
                "id": "d087533d-0ec5-4099-a735-ca7c243bad43"
            }
        }
}

$ curl -v \
    localhost:3000/movies

{
    "data":
        {"movies":
            [
                {
                    "id": "d087533d-0ec5-4099-a735-ca7c243bad43",
                    "name": "Home Alone",
                    "releaseYear": 1990,
                    "rating": 8,
                    "id": "d087533d-0ec5-4099-a735-ca7c243bad43"
                }
            ]
        }
}

$ curl localhost:3000/movies/d087533d-0ec5-4099-a735-ca7c243bad43

{
    "data":
        {"movie":
            {
                "name": "Home Alone",
                "releaseYear": 1990,
                "rating": 8,
                "id": "d087533d-0ec5-4099-a735-ca7c243bad43"
            }
        }
}

$ curl -v -X PATCH -H 'Content-Type: application/json' -d '{"name": "Home Alone 2", "releaseYear": 1992}' localhost:3000/movies/d087533d-0ec5-4099-a735-ca7c243bad43

{
    "data":
        {
            "movie":
                {
                    "id": "d087533d-0ec5-4099-a735-ca7c243bad43",
                    "name": "Home Alone 2",
                    "releaseYear": 1992,
                    "rating": 8
                }
        }
}

$ curl -X DELETE localhost:3000/movies/d087533d-0ec5-4099-a735-ca7c243bad43
```
