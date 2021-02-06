import * as Koa from "koa";
import * as Router from "koa-router";
import { getRepository, Repository } from "typeorm";
import movieEntity from "./movie.entity";
import * as HttpStatus from "http-status-codes";

const routerOpts: Router.IRouterOptions = {
  prefix: "/movies",
};

const router: Router = new Router(routerOpts);

router.get("/", async (ctx: Koa.Context) => {
  const movieRepo: Repository<movieEntity> = getRepository(movieEntity);

  const movies = await movieRepo.find();

  ctx.body = {
    data: { movies },
  };
});

router.get("/:movieId", async (ctx: Koa.Context) => {
  const movieRepo: Repository<movieEntity> = getRepository(movieEntity);

  const movie = await movieRepo.findOne(ctx.params.movieId);

  /*
  If the movie doesn't exist, then throw a 404.
  This will be handled by our custom error middleware.
  */
  if (!movie) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  ctx.body = {
    data: { movie },
  };
});

router.post("/", async (ctx: Koa.Context) => {
  const movieRepo: Repository<movieEntity> = getRepository(movieEntity);

  const { id, name, releaseYear, rating } = ctx.request.body;
  const movie: movieEntity = movieRepo.create({
    id,
    name,
    releaseYear,
    rating,
  });

  await movieRepo.save(movie);

  ctx.status = HttpStatus.CREATED;
  ctx.body = {
    data: { movie },
  };
});

router.delete("/:movieId", async (ctx: Koa.Context) => {
  const movieRepo: Repository<movieEntity> = getRepository(movieEntity);

  const movie = await movieRepo.findOne(ctx.params.movieId);

  /*
  If the movie doesn't exist, then throw a 404.
  This will be handled by our custom error middleware.
  */
  if (!movie) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  await movieRepo.delete(movie);

  ctx.status = HttpStatus.NO_CONTENT;
});

router.patch("/:movieId", async (ctx: Koa.Context) => {
  const movieRepo: Repository<movieEntity> = getRepository(movieEntity);

  const movie: movieEntity = await movieRepo.findOne(ctx.params.movieId);

  /*
  If the movie doesn't exist, then throw a 404.
  This will be handled by our custom error middleware.
  */
  if (!movie) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  /*
  Merge the existing movie with the new data.
  This allows for really simple partial (PATCH).
  */
  const updatedMovie = await movieRepo.merge(movie, ctx.request.body);

  await movieRepo.save(updatedMovie);

  ctx.body = {
    data: { movie: updatedMovie },
  };
});

export default router;
