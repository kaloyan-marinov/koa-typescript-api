import * as Koa from "koa";
import * as HttpStatus from "http-status-codes";
import * as bodyParser from "koa-bodyparser";

import movieController from "../movie/movie.controller";

const app: Koa = new Koa();

/* Generic error handling middleware. */
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error) {
    ctx.status =
      error.statusCode ||
      error.status ||
      HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
    error.status = ctx.status;
    ctx.body = { error };
    ctx.app.emit("error", error, ctx);
  }
});

/* Add a middleware that enables the application to read the request body. */
app.use(bodyParser());

/* Add a routes middleware to the application. */
app.use(movieController.routes());
/*
Add another middleware that will ensure
correct responses are given for disallowed or non-implemented methods.
*/
app.use(movieController.allowedMethods());

/* Application error logging */
app.on("error", console.error);

/*
exporting the app ... serves two purposes:

    1. It keeps our application modular,
       and does not tie our app definition to the running of the server.
    2. It allows us to more easily test the application.

*/
export default app;
