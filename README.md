1. Open a terminal window and issue:

   ```
   $ docker-compose up
   ```

   _NOTE_: The tutorial's version of the `docker-compose.yml` file had to be augmented by the suggestion made in https://andrew.hawker.io/dailies/2020/02/25/postgres-uninitialized-error/

2. To have Nodemon start our server listening on port 3000, open a second terminal window and issue:

   ```
   $ npm start
   ```

3. To make requests to the server, open a third terminal window and issue in that window:

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

   $ export MOVIE_ID=<the-id-returned-as-part-of-the-response>

   $ curl -v localhost:3000/movies

   {
       "data":
           {"movies":
               [
                   {
                       "id": "${MOVIE_ID}",
                       "name": "Home Alone",
                       "releaseYear": 1990,
                       "rating": 8,
                   }
               ]
           }
   }

   $ curl -v localhost:3000/movies/${MOVIE_ID}

   {
       "data":
           {"movie":
               {
                   "name": "Home Alone",
                   "releaseYear": 1990,
                   "rating": 8,
                   "id": "${MOVIE_ID}"
               }
           }
   }

   $ curl -v \
       -X PATCH \
       -H 'Content-Type: application/json' \
       -d '{"name": "Home Alone 2", "releaseYear": 1992}' \
       localhost:3000/movies/${MOVIE_ID}

   {
       "data":
           {
               "movie":
                   {
                       "id": "${MOVIE_ID}",
                       "name": "Home Alone 2",
                       "releaseYear": 1992,
                       "rating": 8
                   }
           }
   }

   $ curl \
       -X DELETE \
       localhost:3000/movies/${MOVIE_ID}
   ```
