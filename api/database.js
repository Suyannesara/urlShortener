const mongoose = require("mongoose");

//Connect mongo to a database
function connectToDb() {
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  //connection info of mongoose
  const db = mongoose.connection;
  db.on("error", (error) => console.error(error));
  db.once("open", () => console.log("Sucessfully connected"));
}

module.exports = connectToDb;
