const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });

const mongoose = require('mongoose')
const app = require("./app");

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}
).then(con => {
    // console.log(con.connections.collections);
    console.log("DB connected sir!!!");
})

const port = process.env.PORT;

const server = app.listen(port, () => {
    console.log("Server is running...");
})
