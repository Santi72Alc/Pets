const { sequelize } = require("./db.init");

module.exports = sequelize;

/* 
async function TestConnection() {
  try {
    await sequelize.authenticate();
    console.log("Conneted!!");
  } catch (err) {
    console.log(err);
  }
}

TestConnection();
*/
