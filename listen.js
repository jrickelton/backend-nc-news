const app = require("./app");
const { PORT = 9090 } = process.env.NODE_ENV;

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
