const app = require("./app");

app.listen(8080, () => {
    console.log("App listening on port 8080");
});

// const app = require("./app");

// const PORT = parseInt(process.env.PORT ?? "8000", 10);

// app.listen(PORT, () =>
//   console.log(`Server is running on port ${PORT} with env ${app.get("env")}`)
// );