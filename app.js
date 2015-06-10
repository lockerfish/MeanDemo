var express = require("express");
var app = express();
var api = express.Router();
var web = express.Router();
var prodController = require("./controllers/products");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/products");

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use("/", web);
web.route("/products").get(prodController.renderProducts);
web.route("/products").post(prodController.saveNewProduct);
web.route("/products/new").get(prodController.renderNewProduct);
web.route("/products/update/:productId").post(prodController.saveEditProduct);
web.route("/products/delete/:productId").get(prodController.deleteRenderedProduct);
web.route("/products/:productId").get(prodController.renderProduct);
web.route("/products/:productId/edit").get(prodController.renderEditProduct);
web.route("/products/:productId/delete").get(prodController.renderDeleteProduct);

app.use("/api", api);

api.route("/products").get(prodController.getProducts);
api.route("/product/:productId").get(prodController.getProduct);
api.route("/addProduct").post(prodController.addProduct);
api.route("/updateProduct/:productId").put(prodController.updateProduct);
api.route("/deleteProduct/:productId").get(prodController.deleteProduct);

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log("server is listening at: %s on port %s", host, port);
});