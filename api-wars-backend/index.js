const app = require("./src/app");
const port = process.env?.PORT ?? 80808;

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
