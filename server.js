const express = require('express');
const app = express();
const bodyparser = require('body-parser');

const cors = require('cors');

var corsOption = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOption));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req,res) => {
    res.json({message: "Welcome to express Js"});
});

// Database Connection
const db = require('./models');

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to database');
    })
    .catch(err => {
        console.log('Failed connect to database', err);
        process.exit();
    });


require("./routes/api/user.route.js")(app);
require("./routes/api/hotel.route")(app);
require("./routes/api/auth.route")(app);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('server running at PORT ' + PORT)
});