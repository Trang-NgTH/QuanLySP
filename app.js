const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json({ extended: true }))
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
const productRoute = require('./route/product.route');
app.use(productRoute);
app.listen(3000,()=>{
    console.log('server listen port 3000');
})