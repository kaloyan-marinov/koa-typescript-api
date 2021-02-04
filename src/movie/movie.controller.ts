import * as Koa from "koa";
import * as Router from "koa-router";

const routerOpts: Router.IRouterOptions = {
  prefix: "/movies",
};

const router: Router = new Router(routerOpts);

router.get("/", async (ctx: Koa.Context) => {
  ctx.body = { message: "get all movies" };
});

router.get("/:movieId", async (ctx: Koa.Context) => {
  ctx.body = { message: `get the movie with an ID of ${ctx.params.movieId}` };
});

router.post("/", async (ctx: Koa.Context) => {
  ctx.body = { message: "create a new movie" };
});

router.delete("/:movieId", async (ctx: Koa.Context) => {
  ctx.body = {
    message: `delete the movie with an ID of ${ctx.params.movieId}`,
  };
});

router.patch("/:movieId", async (ctx: Koa.Context) => {
  ctx.body = {
    message: `update the movie with an ID of ${ctx.params.movieId}`,
  };
});

export default router;
