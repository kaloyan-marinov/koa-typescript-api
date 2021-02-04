import app from "./app/app";

/*
`process.env` will always be comprised of strings,
so we typecast the PORT to a number
*/

const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT);
