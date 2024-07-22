const app = require("./app/app");

// API server listing
const API_PORT = app.get("API_PORT");

// If go main page api ... show info
app.listen(API_PORT, () => {
  console.log(`----> API server ready on port ${API_PORT}`);
  console.log(
    `PETS API url can be tested in 'http://localhost:${API_PORT}/api/v1/pets'`
  );
});
