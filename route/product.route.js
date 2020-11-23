const Router = require('express').Router();
const AWS = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();
const { v4: uuidv4 } = require('uuid');

AWS.config.update({
    accessKeyId:process.env.accessKeyId,
    secretAccessKey:process.env.secretAccessKey,
    region:process.env.region});
const docClient = new AWS.DynamoDB.DocumentClient();
//get
Router.get('/getAll',  (req, res) => {
    var params = {
        TableName: "Products",
    };
    docClient.scan(params, onScan);
    function onScan(err, data) {
        if (err) {
            return res.status(400).send({ message: err });
        } else {
            if(data!=null){
                console.log(data);
                return res.render('index',{data: data.Items});
            }
        }
    }
});
Router.get('/getDetail/:productID', (req, res) => {
    var params = {
        TableName: "Products",
        Key: {
            "productID": req.params.productID,
        }
    };
    docClient.get(params, (err, data) => {
        if (err) {
            return res.status(400).send({ message: err });
        } else {
            return res.render("detail",{data:data.Item});
        }
    });
});
//post
Router.get('/addNew',(req,res)=>{
    return res.render('addNew');
})
Router.post('/addNew',(req, res) => {
    const ID = uuidv4();
    const product = {
        TableName: "Products",
        Item: {
           
            "productID": ID,
            "productName": req.body.productName,
            "donVi": req.body.donVi,
            "price": req.body.price,
            "detail": req.body.detail
        }
    };
    docClient.put(product, (err, data) => {
        if (err) {
            return res.status(400).send({ message: err });
        } else {
            return res.redirect('getAll');
        }
    });
});

module.exports = Router;