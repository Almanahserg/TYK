const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = config.get('port') || 5000;
const URI = config.get('mongoUri') || "";

app.use(express.json({ extended: true }));

app.use('/api/auth', require("./routes/auth.routes"));
app.use('/api/links', require("./routes/link.routes"));
app.use('/t', require("./routes/redirect.routes"));

if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.join(__dirname, "client", "build")));
    app.get("*", (request, response) => {
        response.sendFile(__dirname, "client", "build", "index.html")
    })
}

async function start() {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log("server", PORT))
    }catch (e){
        console.error(e.message)
        app.exit('Server error')
    }
}

start();

