
import App from "./App";
const app = new App();
const port = process.env.PORT || 8008;

app.express().listen(port, () => {
    console.log(`server is listening on ${port}`);
});
